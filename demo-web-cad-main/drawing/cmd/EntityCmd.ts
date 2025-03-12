/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IEntityAction } from "./interface/IEntityAction";
import { IBaseCmd } from "./interface/IBaseCmd";
import { IEntityProp } from "./interface/IEntityProp";
import { VIEWER_EVENT, ViewerIns } from "../viewer";
import { IEntityEvent } from "./interface/IEntityEvent";
import { DrawingUtil } from "../util/DrawingUtil";
import { ACTION_ENTITY, ACTION_MODIFY, DrawingConfig, ENTITY_NAME } from "../config";
import { ICmdEvent } from "./interface/ICmdEvent";

export class EntityCmd implements IBaseCmd, IEntityAction, IEntityProp, IEntityEvent, ICmdEvent {
	cmdName: string = null;
	entityId: any;
	entity: any;

	overlayEntityId: any;
	overlayEntity: any;

	cloneEntityId: any;
	cloneEntity: any;

	public geometryDataId = null;
	public geometryData = null;

	public modeEntity = ACTION_ENTITY.NONE;
	public modeModify = ACTION_MODIFY.NONE;

	public baseDownPoint = null;
	public baseUpPoint = null;

	public pointOverlays = [];
	public connectedLine = null;
	public connectedLineId = null;

	constructor(cmdName: string, entityId?, geometryDataId?) {
		this.cmdName = cmdName;

		if (!entityId) {
			this.add();
		} else {
			this.entityId = entityId;
			this.geometryDataId = geometryDataId;
			this.geometryData = this.geometryDataForType();
			this.modify();
		}
	}
	onZoomChanged(ev: any, data: any): void {
		throw new Error("Method not implemented.");
	}

	createConnectedLine(pointS: any, pointE: any) {
		if (this.connectedLine == null) {
			this.connectedLineId = this.overlayEntity.appendPolyline(pointS.concat(pointE));
			this.connectedLine = this.connectedLineId.openAsPolyline();

			const lineType = this.connectedLineId.openObject().getLinetype();
			lineType.setPredefinedLinetype(ViewerIns.getIns().visLib.LinetypePredefined.kLongDash2ShortDash);
			this.connectedLineId.openObject().setLinetype(lineType);
		} else {
			this.connectedLine.setPoints(pointS.concat(pointE));
		}
	}

	createCloneEntity() {
		const model = ViewerIns.getIns().visViewer.getOverlayModel();
		this.cloneEntityId = model.appendEntity(ENTITY_NAME.CLONE_ENTITY);
		this.cloneEntity = this.cloneEntityId.openObject();
		this.entity.copyTo(this.cloneEntityId);
	}

	createOverlayEntity() {
		const model = ViewerIns.getIns().visViewer.getOverlayModel();
		this.overlayEntityId = model.appendEntity(ENTITY_NAME.OVERLAY_ENTITY);
		this.overlayEntity = this.overlayEntityId.openObject();
		this.overlayEntity.setColor(6, 98, 196);
	}

	modifySize(_arr: any, _pointWorld: any) {
		throw new Error("Method not implemented.");
	}

	modifyPosition(arr: any, _pointWorld: any) {
		this.move(arr);
	}

	onCmdBegin: () => any;
	onCmdCancel: () => any;
	onCmdData: (data: any) => any;
	onCmdEnd: () => any;

	add() {
		this.modeEntity = ACTION_ENTITY.CREATE;
		const model = ViewerIns.getIns().visViewer.getActiveModel();
		this.entityId = model.appendEntity(ENTITY_NAME.MAIN_ENTITY);
		this.entity = this.entityId.openObject();
		this.entity.setColor(255, 255, 255);
	}

	modify() {
		this.modeEntity = ACTION_ENTITY.MODIFY;
		this.entity = this.entityId.openObject();
		this.createCloneEntity();
		this.createOverlayEntity();
		this.initOverlayData();
	}

	remove() {
		const model = ViewerIns.getIns().visViewer.getActiveModel();
		model.removeEntity(this.entityId);
	}

	move(point: any) {
		const findItem = this.pointOverlays.find(item => {
			return item.type == "center";
		});

		if (!findItem) {
			return;
		}

		const center = findItem.point;
		const translate = [point[0] - center[0], point[1] - center[1], point[2] - center[2]];
		this.entity.translate(translate[0], translate[1], translate[2]);
		findItem.point = point;
		this.createConnectedLine(this.baseDownPoint, point);
	}

	subcribeEvents() {
		ViewerIns.getIns().subcribeEvent(VIEWER_EVENT.MOUSE_DOWN, this.onMouseDown);
		ViewerIns.getIns().subcribeEvent(VIEWER_EVENT.MOUSE_UP, this.onMouseUp);
		ViewerIns.getIns().subcribeEvent(VIEWER_EVENT.MOUSE_MOVE, this.onMouseMove);
		ViewerIns.getIns().subcribeEvent(VIEWER_EVENT.KEY_PRESS, this.onKeyPress);
	}

	beginCmd() {
		this.subcribeEvents();
		if (this.onCmdBegin != null) {
			this.onCmdBegin();
		}
	}

	cancelCmd(alsoFinishCmd: boolean) {
		if (this.modeEntity == ACTION_ENTITY.CREATE) {
			this.remove();
		} else if (this.modeEntity == ACTION_ENTITY.MODIFY) {
			this.entity.clearGeometriesData();
			this.cloneEntity.copyTo(this.entityId);
			const model = ViewerIns.getIns().visViewer.getOverlayModel();
			model.removeEntity(this.cloneEntityId);
			model.removeEntity(this.overlayEntityId);
		}

		if (this.onCmdCancel != null) {
			this.onCmdCancel();
		}

		if (alsoFinishCmd) {
			this.endCmd(true);
		}
	}

	protected resetTmpData() {
		this.modeEntity = ACTION_ENTITY.NONE;
		this.modeModify = ACTION_MODIFY.NONE;
		this.baseDownPoint = null;
		this.baseUpPoint = null;
		this.pointOverlays = [];
		this.connectedLine = null;
		this.connectedLineId = null;
	}

	unsubcribeEvents() {
		ViewerIns.getIns().unsubcribeEvent(VIEWER_EVENT.MOUSE_DOWN, this.onMouseDown);
		ViewerIns.getIns().unsubcribeEvent(VIEWER_EVENT.MOUSE_UP, this.onMouseUp);
		ViewerIns.getIns().unsubcribeEvent(VIEWER_EVENT.MOUSE_MOVE, this.onMouseMove);
		ViewerIns.getIns().unsubcribeEvent(VIEWER_EVENT.KEY_PRESS, this.onKeyPress);
		ViewerIns.getIns().unsubcribeEvent(VIEWER_EVENT.ZOOM_CHANGED, this.onZoomChanged);
	}

	endCmd(isFinishCmd: boolean) {
		if (isFinishCmd == true) {
			ViewerIns.getIns().visViewer.unselect();
			this.unsubcribeEvents();

			try {
				const model = ViewerIns.getIns().visViewer.getOverlayModel();
				model.removeEntity(this.cloneEntityId);
			} catch {}

			try {
				const model = ViewerIns.getIns().visViewer.getOverlayModel();
				model.removeEntity(this.overlayEntityId);
			} catch {}

			this.cloneEntity = null;
			this.overlayEntity = null;

			if (this.onCmdEnd != null) {
				this.onCmdEnd();
			}
		} else {
			try {
				this.resetTmpData();
				const model = ViewerIns.getIns().visViewer.getActiveModel();
				model.removeEntity(this.overlayEntityId);
				model.removeEntity(this.cloneEntityId);
			} catch {}
			this.modify();
		}
	}

	onMouseDown = (ev: MouseEvent, pointOxy: any, _pointWorld: any) => {
		if (!this.constructor.name.toUpperCase().localeCompare("EntityCmd")) {
			return;
		}

		if (this.modeEntity == ACTION_ENTITY.CREATE) {
		} else if (this.modeEntity == ACTION_ENTITY.MODIFY) {
			if (this.modeModify == ACTION_MODIFY.NONE) {
				const index = this.getIndexOverlayPointDown(pointOxy);
				if (index >= 0) {
					const element = this.pointOverlays[index];
					this.baseDownPoint = element.point;
					if (element.type == "center") {
						this.modeModify = ACTION_MODIFY.MOVE;
					} else {
						this.modeModify = ACTION_MODIFY.EDIT;
					}
				}
			} else if (this.modeModify == ACTION_MODIFY.MOVE) {
				this.endCmd(false);
			} else if (this.modeModify == ACTION_MODIFY.EDIT) {
				this.endCmd(false);
			}
		}
	};

	onMouseMove = (ev: MouseEvent, pointOxy: any, pointWorld: any) => {
		if (!this.geometryDataId && !this.geometryData) {
			return;
		}

		if (this.modeEntity == ACTION_ENTITY.CREATE || this.modeModify == ACTION_MODIFY.EDIT) {
			this.modifySize(pointOxy, pointWorld);
			return;
		}

		if (this.modeEntity == ACTION_ENTITY.MODIFY && this.modeModify == ACTION_MODIFY.MOVE) {
			this.modifyPosition(pointOxy, pointWorld);
			return;
		}
	};

	onMouseUp = (ev: MouseEvent, pointOxy: any, _pointWorld: any) => {
		this.baseUpPoint = pointOxy;

		if (!this.constructor.name.toUpperCase().localeCompare("EntityCmd")) {
			return;
		}
	};

	onKeyPress = (ev: KeyboardEvent, keyCode: number) => {
		alert(keyCode);
		switch (keyCode) {
			//ESC
			case 27:
				this.cancelCmd(true);
				break;
			//DELETE
			case 46:
				this.remove();
				this.endCmd(true);
				break;
			//ENTER
			case 13:
				this.endCmd(true);
				break;
		}
	};

	protected geometryDataForType() {
		return this.geometryDataId.openObject();
	}

	protected initOverlayData() {
		const arrPoints = DrawingUtil.getCenterPointCloudEntity(this.entity);
		this.drawOverlayEntity(arrPoints);
	}

	drawOverlayEntity(arrPoints) {
		arrPoints.forEach(element => {
			const polygonData = DrawingUtil.getSquareFromCenter(element.point, DrawingConfig.SIZE_OVERLAY(0));
			const polygonId = this.overlayEntity.appendPolygon(polygonData);
			polygonId.openAsPolygon().setFilled(true);

			if (element.type == "center") {
				const polygon = polygonId.openObject();
				const color = new (ViewerIns.getIns().visLib.OdTvColorDef)(255, 0, 0);
				polygon.setColor(color, ViewerIns.getIns().visLib.GeometryTypes.kAll);
			}

			element["polygonId"] = polygonId;
			this.pointOverlays.push(element);
		});
	}

	getIndexOverlayPointDown(downPoint: any) {
		for (let index = 0; index < this.pointOverlays.length; index++) {
			const polygonData = this.pointOverlays[index].polygonId.openAsPolygon().getPoints();
			if (DrawingUtil.checkPointInPolygonData(downPoint, polygonData)) {
				return index;
			}
		}
		return -1;
	}
}
