import { AppConfig, CMD_NAME } from "./config";
import { GridView } from "./viewer/GridView";
import { CmdFactory } from "./cmd/CmdFactory";
import { Viewer } from "@inweb/viewer-visualize";
import { EntityCmd } from "./cmd/EntityCmd";

export const VIEWER_EVENT = {
	MOUSE_DOWN: "mousedown",
	MOUSE_UP: "mouseup",
	MOUSE_MOVE: "mousemove",
	KEY_PRESS: "keypress",
	ZOOM_CHANGED: "zoom",
	CONTEXT_MENU: "contextmenu",
};

export class ViewerIns {
	private static instance: ViewerIns = null;
	public viewer: any;
	public visLib: any;
	public visViewer: any;
	public canvas: any;

	public gridView: GridView = null;
	private events = {};
	private clipboard = null;

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

		this.instance.gridView.enableCanSnap(true);
		this.instance.createGridView();

		this.instance.setViewerDefault();
		this.instance.visViewer.zoomAt(300, canvas.width / 2, canvas.height / 2);
	}

	public createGridView() {
		this.gridView.createGridView();
	}

	public removeGridView() {
		this.gridView.removeGridView();
	}

	public initAllEvents() {
		this.viewer.addEventListener(VIEWER_EVENT.MOUSE_DOWN, ev => {
			if (ev.button === 2) {
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
				// this.visViewer.activeView.highlight(CmdFactory.getIns().currentCmd.getSlectionSet().getIterator(), true);
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

		document.onkeydown = ev => {
			this.fireSubcribeEvent(VIEWER_EVENT.KEY_PRESS, ev, ev.keyCode);

			if (ev.ctrlKey && ev.key === "c") {
				this.copySelected();
			}

			if (ev.ctrlKey && ev.key === "v") {
				this.pasteClipboard();
			}
		};
	}

	private copySelected() {
		const selectionSet = this.visViewer.getSelected();
		if (selectionSet.numItems() > 0) {
			this.clipboard = selectionSet;
		}
	}

	private pasteClipboard() {
		if (this.clipboard) {
			const iterator = this.clipboard.getIterator();
			while (!iterator.done()) {
				const entity = iterator.getEntity();
				EntityCmd.pasteEntity(entity, this.visViewer.activeView.viewPosition);
				iterator.step();
			}
			this.visViewer.setSelected(this.clipboard);
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
