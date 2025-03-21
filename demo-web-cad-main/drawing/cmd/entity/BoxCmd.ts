/* eslint-disable @typescript-eslint/no-unused-vars */
import { ACTION_ENTITY, ACTION_MODIFY } from "../../config";
import { DrawingUtil } from "../../util/DrawingUtil";
import { ViewerIns } from "../../viewer";
import { EntityCmd } from "../EntityCmd";

export class BoxCmd extends EntityCmd {
	private startPoint = null;
	private seccondPoint = null;
	private heightPoint = null;
	private indexPoint = 0;

	override onMouseDown = (ev: MouseEvent, point: any, pointWorld: any) => {
		if (this.modeEntity == ACTION_ENTITY.CREATE) {
			this.initForCreate(point, pointWorld);
		} else if (this.modeEntity == ACTION_ENTITY.MODIFY) {
			this.initForModify(point, pointWorld);
		}
	};

	initForCreate(point, pointWorld) {
		if (this.indexPoint == 0 && !this.geometryDataId && !this.geometryData) {
			this.createOverlayEntity();
			this.startPoint = point;
			this.indexPoint = 1;
			this.baseDownPoint = point;

			this.geometryDataId = this.entity.appendBox(this.startPoint, 0, 0, 0, [0, 0, 1], [1, 0, 0]);
			this.geometryData = this.geometryDataId.openAsBox();
		} else if (this.indexPoint == 1) {
			this.indexPoint = 2;
			this.seccondPoint = point;

			this.baseDownPoint = point;
			this.modifySize(point, pointWorld);
		} else if (this.indexPoint == 2) {
			this.indexPoint = 3;
			this.heightPoint = point;
			this.modifySize(point, pointWorld);
			this.endCmd(true);
		}
	}

	initForModify(point, pointWorld) {
		if (this.modeModify == ACTION_MODIFY.NONE) {
			this.indexPoint = 0;

			const index = this.getIndexOverlayPointDown(point);
			if (index >= 0) {
				const element = this.pointOverlays[index];
				this.baseDownPoint = element.point;
				if (element.type == "center") {
					this.modeModify = ACTION_MODIFY.MOVE;
				} else {
					this.modeModify = ACTION_MODIFY.EDIT;
					if (DrawingUtil.compareTwoPoints(this.startPoint, this.baseDownPoint)) {
						this.indexPoint = 1;
					} else if (DrawingUtil.compareTwoPoints(this.seccondPoint, this.baseDownPoint)) {
						this.indexPoint = 2;
					} else if (DrawingUtil.compareTwoPoints(this.heightPoint, this.baseDownPoint)) {
						this.indexPoint = 3;
					}
				}
			}
		} else if (this.modeModify == ACTION_MODIFY.MOVE) {
			this.modifyPosition(point);
			this.endCmd(false);
		} else if (this.modeModify == ACTION_MODIFY.EDIT) {
			this.modifySize(point);
			this.endCmd(false);
		}
	}

	override modifySize(arr: any, pointWorld?: any) {
		if (this.modeEntity == ACTION_ENTITY.CREATE) {
			if (this.indexPoint == 1) {
				const center = DrawingUtil.getCenterOfTwoPoint(this.startPoint, arr);
				this.geometryData.setCenterPoint(center);
				this.geometryData.setWidth(Math.abs(arr[1] - this.startPoint[1]));
				this.geometryData.setLength(Math.abs(arr[0] - this.startPoint[0]));
				this.geometryData.setHeight(0);
			} else if (this.indexPoint == 2) {
				const center = this.geometryData.getCenterPoint();
				center[2] = pointWorld[2] / 2;
				this.geometryData.setCenterPoint(center);
				this.geometryData.setHeight(pointWorld[2]);
				this.geometryData.setBaseNormal([0, 0, pointWorld[2] > 0 ? 1 : -1]);
			}
		} else if (this.modeEntity == ACTION_ENTITY.MODIFY) {
			if (this.indexPoint == 1) {
				this.geometryData.setStart(arr);
			} else if (this.indexPoint == 2) {
				this.geometryData.setMiddle(arr);
			} else if (this.indexPoint == 3) {
				this.geometryData.setEnd(arr);
			}
		}

		this.createConnectedLine(this.baseDownPoint, arr);
	}

	override modifyPosition(arr: any) {
		const findItem = this.pointOverlays.find(item => {
			return item.type == "center";
		});

		if (!findItem) {
			return;
		}

		const height = this.geometryData.getHeight();
		arr[2] = height / 2;
		this.geometryData.setCenterPoint(arr);

		if (this.modeEntity == ACTION_ENTITY.MODIFY) {
			arr[2] = 0;
			this.createConnectedLine(this.baseDownPoint, arr);
		}
	}

	protected geometryDataForType() {
		return this.geometryDataId.openAsBox();
	}

	initOverlayData(): void {
		const arrPoints = DrawingUtil.getAllPointCloudBox(this.geometryData);
		super.drawOverlayEntity(arrPoints);
	}

	override add(): void {
		this.modeEntity = ACTION_ENTITY.CREATE;
		const model = ViewerIns.getIns().visViewer.getActiveModel();
		this.entityId = model.appendEntity("AcDb3dBox");
		this.entity = this.entityId.openObject();
		this.entity.setColor(255, 255, 255);
	}
}
