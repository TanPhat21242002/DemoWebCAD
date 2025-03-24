/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
import { ACTION_ENTITY, ACTION_MODIFY, CMD_NAME, ENTITY_NAME } from "../config";
import { DrawingUtil } from "../util/DrawingUtil";
import { ViewerIns } from "../viewer";
import { EntityCmd } from "./EntityCmd";
import { DotRoomCmd } from "./entity/DotRoomCmd";
import { DragRoomCmd } from "./entity/DragRoomCmd";
import { RectangleCmd } from "./entity/RectangleCmd";

export class SelectCmd extends RectangleCmd {
	private polygonId = null;
	private polygon = null;

	public selectionSet = null;
	private selectionCmd = [];
	private indexCmdModify = -1;
	public fisrtPointXY = null;
	public seccondPointXY = null;

	constructor(cmdName: string, entityId?, geometryDataId?) {
		super(cmdName, entityId, geometryDataId);
	}

	override add() {
		this.modeEntity = ACTION_ENTITY.CREATE;
		const model = ViewerIns.getIns().visViewer.getOverlayModel();
		this.entityId = model.appendEntity(ENTITY_NAME.OVERLAY_ENTITY);
		this.entity = this.entityId.openObject();
		this.entity.setColor(255, 255, 255);
	}

	public resetSelectCmd() {
		this.entity.clearGeometriesData();

		this.fisrtPointXY = null;
		this.seccondPointXY = null;

		this.polygonId = null;
		this.polygon = null;

		this.geometryData = null;
		this.geometryDataId = null;
		if (this.entityId == null) {
			try {
				const model = ViewerIns.getIns().visViewer.getOverlayModel();
				model.removeEntity(this.entityId);
			} catch (error) {}
			this.add();
		}
	}

	override onKeyPress = (ev: KeyboardEvent, keyCode: number) => {
		switch (keyCode) {
			//ESC
			case 27:
				if (this.geometryData != null && this.geometryDataId != null) {
					this.resetSelectCmd();
				} else {
					this.cancelCmd(true);
					for (let index = 0; index < this.selectionCmd.length; index++) {
						const cmd = this.selectionCmd[index];
						cmd.cancelCmd(true);
					}
					if (this.onCmdData != null) {
						this.onCmdData(null);
					}
				}
				break;
			//DELETE
			case 46:
				ViewerIns.getIns().deleteSelected();
				for (let index = 0; index < this.selectionCmd.length; index++) {
					const cmd = this.selectionCmd[index];
					cmd.remove();
					cmd.endCmd(true);
				}
				this.endCmd(true);
				break;
			//ENTER
			// case 13:
			//     this.endCmd(true);
			//     break;
		}
	};

	override onMouseDown = (ev: MouseEvent, point: any) => {
		if (!this.geometryDataId && !this.geometryData) {
			if (this.indexCmdModify >= 0) {
				this.resetSelectCmd();
				this.selectionCmd[this.indexCmdModify].onMouseDown(ev, point);
				this.indexCmdModify = -1;
				return;
			} else {
				this.indexCmdModify = this.getIndexCmdModify(point);
				if (this.indexCmdModify >= 0) {
					this.resetSelectCmd();
					this.selectionCmd[this.indexCmdModify].onMouseDown(ev, point);
					return;
				}
			}
		}

		const x = ev.offsetX * window.devicePixelRatio;
		const y = ev.offsetY * window.devicePixelRatio;

		if (this.modeEntity == ACTION_ENTITY.CREATE) {
			if (!this.geometryDataId && !this.geometryData) {
				this.geometryDataId = this.entity.appendPolyline(point.concat(point).concat(point).concat(point).concat(point));
				this.geometryData = this.geometryDataId.openAsPolyline();
				this.startPoint = point;
				this.endPoint = point;
				this.fisrtPointXY = [x, y];
			} else {
				this.modifySize(point);
				this.entity.clearGeometriesData();
				this.geometryDataId = null;
				this.geometryData = null;
				this.seccondPointXY = [x, y];
			}
		}
	};

	onMouseMove = (ev: MouseEvent, point: any) => {
		if (this.indexCmdModify >= 0) {
			this.selectionCmd[this.indexCmdModify].onMouseMove(ev, point);
			return;
		}

		if (!this.geometryDataId && !this.geometryData) {
			return;
		}

		if (this.polygonId == null && this.polygon == null) {
			const polylineData = DrawingUtil.getRectangleData(this.startPoint, this.endPoint);
			let data = [];
			polylineData.forEach(item => {
				data = data.concat(item);
			});

			this.polygonId = this.entity.appendPolygon(data);
			this.polygon = this.polygonId.openAsPolygon();
			this.polygon.setFilled(true);
			const color = new (ViewerIns.getIns().visLib.OdTvColorDef)(6, 98, 196);
			this.polygonId.openObject().setColor(color, ViewerIns.getIns().visLib.GeometryTypes.kAll);

			const transparencyDef = new (ViewerIns.getIns().visLib.OdTvTransparencyDef)();
			transparencyDef.setValue(0.7);
			this.polygonId.openObject().setTransparency(transparencyDef);
		}

		if (this.modeEntity == ACTION_ENTITY.CREATE || this.modeModify == ACTION_MODIFY.EDIT) {
			this.modifySize(point);
			const polylineData = DrawingUtil.getRectangleData(this.startPoint, this.endPoint);
			let data = [];
			polylineData.forEach(item => {
				data = data.concat(item);
			});
			this.polygon.setPoints(data);
			return;
		}

		if (this.modeEntity == ACTION_ENTITY.MODIFY && this.modeModify == ACTION_MODIFY.MOVE) {
			this.modifyPosition(point);
			const polylineData = DrawingUtil.getRectangleData(this.startPoint, this.endPoint);
			let data = [];
			polylineData.forEach(item => {
				data = data.concat(item);
			});
			this.polygon.setPoints(data);
			return;
		}
	};

	public getSlectionSet() {
		return this.selectionSet;
	}

	private getIndexCmdModify(point) {
		for (let index = 0; index < this.selectionCmd.length; index++) {
			const cmd = this.selectionCmd[index];
			const iiii = cmd.getIndexOverlayPointDown(point);
			if (iiii >= 0) {
				return index;
			}
		}
		return -1;
	}

	public setSelectionSet(selection) {
		const selectionSetTmp = new (ViewerIns.getIns().visLib.OdTvSelectionSet)();

		if (this.selectionSet == null) {
			this.selectionSet = new (ViewerIns.getIns().visLib.OdTvSelectionSet)();
			this.selectionSet.add(selection);
			selectionSetTmp.add(selection);
		} else {
			const interators = selection.getIterator();
			for (; !interators.done(); interators.step()) {
				const entityId = interators.getEntity();
				if (!this.selectionSet.isMember(entityId)) {
					selectionSetTmp.appendEntity(entityId);
				}
			}
			this.selectionSet.add(selectionSetTmp);
		}

		if (this.onCmdData != null) {
			this.onCmdData(this.selectionSet);
		}
		//console.log("SELECTION ADDED: ", selectionSetTmp);
		let cmd = null;
		const interators = selectionSetTmp.getIterator();
		for (; !interators.done(); interators.step()) {
			const entityId = interators.getEntity();
			const entity = entityId.openObject();

			try {
				const arr = ViewerIns.getIns().getTypeOfEntity(entity);
				switch (arr[0]) {
					case ViewerIns.getIns().visLib.OdTvGeometryDataType.kPolyline:
						cmd = new DotRoomCmd(CMD_NAME.POLYLINE, entityId, arr[1]);
						break;
					case ViewerIns.getIns().visLib.OdTvGeometryDataType.kPolygon:
						cmd = new DragRoomCmd(CMD_NAME.DRAGROOM, entityId, arr[1]);
						break;
					default:
						cmd = new EntityCmd(CMD_NAME.OTHER, entityId, arr[1]);
						break;
				}

				cmd.beginCmd();
				cmd.unsubcribeEvents();
				this.selectionCmd.push(cmd);
			} catch (error) {}
		}
	}
}
