import { AppConfig, CMD_NAME } from "./config";
import { GridView } from "./viewer/GridView";
import { CmdFactory } from "./cmd/CmdFactory";
import { Viewer } from "@inweb/viewer-visualize";

export const VIEWER_EVENT = {
	MOUSE_DOWN: "mousedown",
	MOUSE_UP: "mouseup",
	MOUSE_MOVE: "mousemove",
	KEY_PRESS: "keypress",
	ZOOM_CHANGED: "zoom",
	CONTEXT_MENU: "contextmenu",
	WHEEL: "wheel",
};

export class ViewerIns {
	private static instance: ViewerIns = null;
	public viewer: any;
	public visLib: any;
	public visViewer: any;
	public canvas: any;

	public gridView: GridView = null;
	private events = {};

	public viewPosition = [];

	private constructor() {}

	public static getIns(): ViewerIns {
		if (this.instance == null) {
			throw new Error("Please call initViewer first ...");
		}
		return this.instance;
	}

	public static async initViewer(canvas) {
		if (this.instance != null) {
			return;
		}

		const vv = await new Viewer(null, {
			visualizeJsUrl: AppConfig.VISUALIZEJS_URL,
		}).initialize(canvas);

		this.instance = new ViewerIns();
		this.instance.viewer = vv;
		this.instance.visLib = vv.visLib();
		this.instance.visViewer = vv.visViewer();
		this.instance.canvas = canvas;

		this.instance.visViewer.createLocalDatabase();

		this.instance.gridView = new GridView(canvas);
		this.instance.initAllEvents();

		{
			const res = await this.instance.downloadFile("./font/bigfont.shx");
			this.instance.visViewer.addEmbeddedFile("bigfont.shx", new Uint8Array(res));
		}

		{
			const res = await this.instance.downloadFile("./font/MSGothic.ttf");
			this.instance.visViewer.addEmbeddedFile("MSGothic.ttf", new Uint8Array(res));
		}

		{
			const res = await this.instance.downloadFile("./font/simplex.shx");
			this.instance.visViewer.addEmbeddedFile("simplex.shx", new Uint8Array(res));
		}

		{
			const res = await this.instance.downloadFile("./font/txt.shx");
			this.instance.visViewer.addEmbeddedFile("txt.shx", new Uint8Array(res));
		}

		{
			const res = await this.instance.downloadFile("./font/NotoSansJP.ttf");
			this.instance.visViewer.addEmbeddedFile("NotoSansJP.ttf", new Uint8Array(res));
		}

		this.instance.gridView.enableCanSnap(true);
		this.instance.createGridView();

		this.instance.setViewerDefault();
		this.instance.visViewer.zoomAt(250, canvas.width / 2, canvas.height / 2);
	}

	public createGridView() {
		this.gridView.createGridView();
	}

	public removeGridView() {
		this.gridView.removeGridView();
	}

	public initAllEvents() {
		this.viewer.addEventListener(VIEWER_EVENT.MOUSE_DOWN, ev => {
			const contextMenu = document.getElementById("context-menu");
			if (contextMenu && contextMenu.style.display === "block") {
				return;
			}

			if (ev.button === 2) {
				const selectionSet = this.visViewer.activeView.selectPoint(
					[ev.offsetX * window.devicePixelRatio, ev.offsetY * window.devicePixelRatio],
					this.visViewer.getActiveModel(),
				);

				if (selectionSet.numItems() === 1) {
					console.log();
					const mouseX = ev.clientX;
					const mouseY = ev.clientY;
					this.showContextMenu(mouseX, mouseY);
					return;
				}
				this.startPan(ev);
				return;
			}

			this.visViewer.setEnableAutoSelect(false);
			const x = ev.offsetX * window.devicePixelRatio;
			const y = ev.offsetY * window.devicePixelRatio;
			let pointOxy = this.pointOnOxyPlane(ev);
			const pointWorld = this.pointWorldFromMouseEv(ev);
			this.gridView.onMouseUp();
			if (this.gridView.haveSnapPoint()) {
				pointOxy = this.gridView.getSnapPoint();
			}

			if (
				!CmdFactory.getIns().isEmptyCmd() &&
				CmdFactory.getIns().currentCmd.cmdName == CMD_NAME.SELECT &&
				CmdFactory.getIns().currentCmd.fisrtPointXY != null
			) {
				this.fireSubcribeEvent(VIEWER_EVENT.MOUSE_DOWN, ev, pointOxy, pointWorld);

				const firstPoint = CmdFactory.getIns().currentCmd.fisrtPointXY;
				const seccondPoint = CmdFactory.getIns().currentCmd.seccondPointXY;
				const selectionSet = this.visViewer.activeView.selectCrossing(firstPoint.concat(seccondPoint), this.visViewer.getActiveModel());
				if (selectionSet.numItems() >= 1) {
					CmdFactory.getIns().currentCmd.setSelectionSet(selectionSet);
				}
				CmdFactory.getIns().currentCmd.resetSelectCmd();
			} else {
				const selectionSet = this.visViewer.activeView.selectPoint([x, y], this.visViewer.getActiveModel());
				if (selectionSet.numItems() >= 1) {
					if (CmdFactory.getIns().isEmptyCmd()) {
						CmdFactory.getIns().createCmd(CMD_NAME.SELECT);
						CmdFactory.getIns().currentCmd.setSelectionSet(selectionSet);
					} else if (CmdFactory.getIns().currentCmd.cmdName == CMD_NAME.SELECT) {
						CmdFactory.getIns().currentCmd.setSelectionSet(selectionSet);
						this.fireSubcribeEvent(VIEWER_EVENT.MOUSE_DOWN, ev, pointOxy, pointWorld);
					} else {
						this.fireSubcribeEvent(VIEWER_EVENT.MOUSE_DOWN, ev, pointOxy, pointWorld);
					}
				} else {
					if (CmdFactory.getIns().isEmptyCmd()) {
						CmdFactory.getIns().createCmd(CMD_NAME.SELECT);
					}
					this.fireSubcribeEvent(VIEWER_EVENT.MOUSE_DOWN, ev, pointOxy, pointWorld);
				}
			}

			if (
				!CmdFactory.getIns().isEmptyCmd() &&
				CmdFactory.getIns().currentCmd.cmdName == CMD_NAME.SELECT &&
				CmdFactory.getIns().currentCmd.getSlectionSet() != null
			) {
				this.visViewer.unselect();
				this.visViewer.setSelected(CmdFactory.getIns().currentCmd.getSlectionSet());
			}
		});

		this.viewer.addEventListener(VIEWER_EVENT.MOUSE_UP, ev => {
			if (ev.button === 2) {
				this.stopPan();
				return;
			}

			let pointOxy = this.pointOnOxyPlane(ev);
			const pointWorld = this.pointWorldFromMouseEv(ev);
			this.gridView.onMouseUp();
			if (this.gridView.haveSnapPoint()) {
				pointOxy = this.gridView.getSnapPoint();
			}
			this.fireSubcribeEvent(VIEWER_EVENT.MOUSE_UP, ev, pointOxy, pointWorld);
		});

		this.viewer.addEventListener(VIEWER_EVENT.MOUSE_MOVE, ev => {
			let pointOxy = this.pointOnOxyPlane(ev);
			const pointWorld = this.pointWorldFromMouseEv(ev);
			this.gridView.onMouseMove(ev, pointOxy);
			if (this.gridView.haveSnapPoint()) {
				pointOxy = this.gridView.getSnapPoint();
			}
			this.fireSubcribeEvent(VIEWER_EVENT.MOUSE_MOVE, ev, pointOxy, pointWorld);
		});

		this.viewer.addEventListener(VIEWER_EVENT.ZOOM_CHANGED, ev => {
			this.fireSubcribeEvent(VIEWER_EVENT.ZOOM_CHANGED, ev, ev.data);
		});

		this.viewer.addEventListener(VIEWER_EVENT.CONTEXT_MENU, ev => {
			ev.preventDefault();
		});

		this.viewer.addEventListener(VIEWER_EVENT.WHEEL, ev => {
			this.handleMouseWheel(ev);
		});

		document.onkeydown = ev => {
			this.fireSubcribeEvent(VIEWER_EVENT.KEY_PRESS, ev, ev.keyCode);
			if (ev.key === "Escape") {
				this.hideContextMenu();
			}
		};
	}

	private showContextMenu(x: number, y: number) {
		if (!CmdFactory.getIns().currentCmd) return;

		let contextMenu = document.getElementById("context-menu");

		if (!contextMenu) {
			contextMenu = document.createElement("div");
			contextMenu.id = "context-menu";
			contextMenu.style.position = "absolute";
			contextMenu.style.background = "#333";
			contextMenu.style.color = "#fff";
			contextMenu.style.padding = "10px";
			contextMenu.style.borderRadius = "5px";
			contextMenu.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.5)";
			contextMenu.style.zIndex = "1000";
			document.body.appendChild(contextMenu);
		}

		const selectedObjects = CmdFactory.getIns().currentCmd.getSlectionSet();
		if (!selectedObjects || selectedObjects.numItems() === 0) {
			return;
		}
		contextMenu.innerHTML = `
		<style>
			.context-menu-item {
				cursor: pointer;
				padding: 5px;
				display: flex;
				align-items: center;
			}
			.context-menu-item:hover {
				background-color: #555;
			}
		</style>
		<div class="context-menu-item" id="top">
			<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
				<path d="M160-760v-80h640v80H160Zm280 640v-408L336-424l-56-56 200-200 200 200-56 56-104-104v408h-80Z"/>
			</svg>
			<span style="margin-left: 5px;">Top</span>
		</div>
		<div class="context-menu-item" id="back-ward">
			<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
				<path d="M160-120v-80h640v80H160Zm320-160L280-480l56-56 104 104v-408h80v408l104-104 56 56-200 200Z"/></svg>
			<span style="margin-left: 5px;">Backward</span>
		</div>
		<div class="context-menu-item" id="add-point">
			<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
				<path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
			<span style="margin-left: 5px;">Add point</span>
		</div>
		<div class="context-menu-item" id="add-wall">
			<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
				<path d="M640-121v-120H520v-80h120v-120h80v120h120v80H720v120h-80ZM160-240v-80h283q-3 21-2.5 40t3.5 40H160Zm0-160v-80h386q-23 16-41.5 36T472-400H160Zm0-160v-80h600v80H160Zm0-160v-80h600v80H160Z"/></svg>
			<span style="margin-left: 5px;">Add Wall</span>
		</div>
		<div class="context-menu-item" id="delete-wall">
			<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
				<path d="m576-80-56-56 104-104-104-104 56-56 104 104 104-104 56 56-104 104 104 104-56 56-104-104L576-80ZM120-320v-80h280v80H120Zm0-160v-80h440v80H120Zm0-160v-80h440v80H120Z"/></svg>
			<span style="margin-left: 5px;">Delete Wall</span>
		</div>
		<div class="context-menu-item" id="remove">
			<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
				<path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
			<span style="margin-left: 5px;">Remove</span>
		</div>
		`;

		contextMenu.style.left = `${x}px`;
		contextMenu.style.top = `${y}px`;
		contextMenu.style.display = "block";

		document.addEventListener("click", this.hideContextMenu);
	}

	private hideContextMenu() {
		const menu = document.getElementById("context-menu");
		if (menu) {
			menu.style.display = "none";
		}
		document.removeEventListener("click", this.hideContextMenu);
	}

	private handleMouseWheel(ev: WheelEvent) {
		ev.preventDefault();
		const minZoom = 50;
		const maxZoom = 1500;
		const viewWidth = this.visViewer.activeView.viewFieldWidth;

		if ((ev.deltaY > 0 && viewWidth <= minZoom) || (ev.deltaY < 0 && viewWidth >= maxZoom)) {
			if (this.viewer.options.enableZoomWheel) {
				this.viewer.options.enableZoomWheel = false;
			}
			return;
		}

		if (!this.viewer.options.enableZoomWheel) {
			this.viewer.options.enableZoomWheel = true;
		}
	}

	private startPan(ev) {
		let startX = ev.clientX;
		let startY = ev.clientY;
		let isPanning = true;

		this.canvas.style.curor = "grabbing";

		const onMouseMove = moveEvent => {
			if (!isPanning) return;

			const dx = moveEvent.clientX - startX;
			const dy = moveEvent.clientY - startY;

			this.visViewer.pan(dx, dy);

			startX = moveEvent.clientX;
			startY = moveEvent.clientY;
		};

		const onMouseUp = () => {
			isPanning = false;
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
			this.canvas.style.cursor = "default";
		};

		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);
	}

	private stopPan() {
		this.canvas.style.cursor = "default";
	}

	public deleteSelected() {
		try {
			const model = this.visViewer.getActiveModel();
			const selectionSet = this.visViewer.getSelected();
			const interators = selectionSet.getIterator();
			for (; !interators.done(); interators.step()) {
				const entityId = interators.getEntity();
				model.removeEntity(entityId);
			}
			// eslint-disable-next-line no-empty, @typescript-eslint/no-unused-vars
		} catch (error) {}
	}

	public subcribeEvent(type, event) {
		if (!this.events[type]) {
			this.events[type] = [];
		}
		this.events[type].push(event);
	}

	public unsubcribeEvent(type, event) {
		if (!this.events[type]) {
			this.events[type] = [];
		}
		this.events[type] = this.events[type].filter(evv => evv !== event);
	}

	public fireSubcribeEvent(type, ev, value01, value02?) {
		if (!this.events[type]) {
			return;
		}

		this.events[type].forEach(fn => {
			fn(ev, value01, value02);
		});
	}

	public createPoint3DFromArray(point3) {
		return new this.visLib.Point3d.createFromArray(point3);
	}

	public createVector3DFromArray(vector3) {
		return new this.visLib.Vector3d.createFromArray(vector3);
	}

	public pointWorldFromMouseEv(ev) {
		const x = ev.offsetX * window.devicePixelRatio;
		const y = ev.offsetY * window.devicePixelRatio;
		return this.visViewer.screenToWorld(x, y);
	}

	public pointOnOxyPlane(ev) {
		const x = ev.offsetX * window.devicePixelRatio;
		const y = ev.offsetY * window.devicePixelRatio;
		const point = this.visViewer.screenToWorld(x, y);
		const vector3 = this.visViewer.activeView.eyeToWorldMatrix.getCsZAxis();
		const xx = point[0] - (vector3[0] * point[2]) / vector3[2];
		const yy = point[1] - (vector3[1] * point[2]) / vector3[2];
		const zz = 0;
		return [xx, yy, zz];
	}

	public getTypeOfEntity(entity) {
		const tmpInterators = entity.getGeometryDataIterator();
		for (; !tmpInterators.done(); tmpInterators.step()) {
			const geometryDataId = tmpInterators.getGeometryData();
			if (geometryDataId.getTypeEnum() == this.visLib.OdTvGeometryDataType.kSubEntity) {
				return [1000, null];
			} else {
				return [geometryDataId.getTypeEnum(), geometryDataId];
			}
		}

		return [1000, null];
	}

	public setViewerDefault() {
		this.viewPosition = [
			this.visLib.DefaultViewPosition.k3DViewFront,
			this.visLib.DefaultViewPosition.k3DViewTop,
			this.visLib.DefaultViewPosition.k3DViewBottom,
			this.visLib.DefaultViewPosition.k3DViewBack,
			this.visLib.DefaultViewPosition.k3DViewNW,
			this.visLib.DefaultViewPosition.k3DViewNE,
			this.visLib.DefaultViewPosition.k3DViewLeft,
			this.visLib.DefaultViewPosition.k3DViewFront,
			this.visLib.DefaultViewPosition.k3DViewSW,
			this.visLib.DefaultViewPosition.k3DViewSE,
		];

		this.visViewer.activeView.renderMode = this.visLib.RenderMode.GouraudShadedWithWireframe;
		this.visViewer.setBackgroundColor([33, 41, 48]);
		this.visViewer.lineSmoothing = true;
		this.visViewer.vertexSnapping = true;
		this.visViewer.edgeSnapping = false;
		this.visViewer.setEnableAnimation(false);
		this.visViewer.setDefaultViewPositionWithAnimation(this.visLib.DefaultViewPosition.k3DViewTop);
		this.visViewer.setEnableAutoSelect(false);
	}

	async downloadFile(url) {
		const responce = await fetch(url, { method: "GET" });
		const arrayBuffer = await responce.arrayBuffer();
		return arrayBuffer;
	}
}
