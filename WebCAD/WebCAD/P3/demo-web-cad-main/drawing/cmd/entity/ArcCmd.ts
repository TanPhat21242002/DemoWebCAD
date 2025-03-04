import { ACTION_ENTITY, ACTION_MODIFY } from "../../config";
import { DrawingUtil } from "../../util/DrawingUtil";
import { ViewerIns } from "../../viewer";
import { EntityCmd } from "../EntityCmd";

export class ArcCmd extends EntityCmd {
	private startPoint = null;
	private midPoint = null;
	private endPoint = null;
	private indexPoint = 0;

	override onMouseDown = (ev: MouseEvent, point: any) => {
		if (this.modeEntity == ACTION_ENTITY.CREATE) {
			this.initForCreate(point);
		} else if (this.modeEntity == ACTION_ENTITY.MODIFY) {
			this.initForModify(point);
		}
	};

	initForCreate(point) {
		if (this.indexPoint == 0 && !this.geometryDataId && !this.geometryData) {
			this.createOverlayEntity();
			this.startPoint = point;
			this.indexPoint = 1;
			this.baseDownPoint = point;
			//TEMP ASSIGN FOR != NULL
			this.geometryDataId = 1;
			this.geometryData = 1;
		} else if (this.indexPoint == 1) {
			this.indexPoint = 2;
			this.midPoint = point;

			this.geometryDataId = this.entity.appendCircleArc(this.startPoint, this.midPoint, [point[0] + 2, point[1], point[2]]);
			this.geometryData = this.geometryDataId.openAsCircleArc();
			this.baseDownPoint = point;
			this.modifySize(point);
		} else if (this.indexPoint == 2) {
			this.indexPoint = 3;
			this.endPoint = point;
			this.modifySize(point);
			this.endCmd(true);
		}
	}

	initForModify(point) {
		if (this.modeModify == ACTION_MODIFY.NONE) {
			this.startPoint = this.geometryData.getStart();
			this.midPoint = this.geometryData.getMiddle();
			this.endPoint = this.geometryData.getEnd();
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
					} else if (DrawingUtil.compareTwoPoints(this.midPoint, this.baseDownPoint)) {
						this.indexPoint = 2;
					} else if (DrawingUtil.compareTwoPoints(this.endPoint, this.baseDownPoint)) {
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

	override modifySize(arr: any) {
		if (this.modeEntity == ACTION_ENTITY.CREATE) {
			if (this.indexPoint == 2) {
				this.geometryData.setEnd(arr);
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

		const vector01 = ViewerIns.getIns().createVector3DFromArray(findItem.point);
		const vector02 = ViewerIns.getIns().createVector3DFromArray(arr);
		const translateVector = vector02.sub(vector01);

		const point01 = ViewerIns.getIns().createPoint3DFromArray(this.startPoint).translate(translateVector).toArray();
		const point02 = ViewerIns.getIns().createPoint3DFromArray(this.midPoint).translate(translateVector).toArray();
		const point03 = ViewerIns.getIns().createPoint3DFromArray(this.endPoint).translate(translateVector).toArray();

		this.geometryData.set(point01, point02, point03);

		if (this.modeEntity == ACTION_ENTITY.MODIFY) {
			this.createConnectedLine(this.baseDownPoint, arr);
		}
	}

	protected geometryDataForType() {
		return this.geometryDataId.openAsCircleArc();
	}

	protected initOverlayData(): void {
		const arrPoints = DrawingUtil.getAllPointCloudCicleArc(this.geometryData);
		const centers = DrawingUtil.getCenterPointCloudEntity(this.entity);
		if (centers.length > 0) {
			arrPoints.push(centers[0]);
		}
		super.drawOverlayEntity(arrPoints);
	}

	override add(): void {
		this.modeEntity = ACTION_ENTITY.CREATE;
		const model = ViewerIns.getIns().visViewer.getActiveModel();
		this.entityId = model.appendEntity("AcDbArc");
		this.entity = this.entityId.openObject();
		this.entity.setColor(255, 255, 255);
	}
}
