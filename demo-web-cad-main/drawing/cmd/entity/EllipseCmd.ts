import { ACTION_ENTITY, ACTION_MODIFY } from "../../config";
import { DrawingUtil } from "../../util/DrawingUtil";
import { ViewerIns } from "../../viewer";
import { EntityCmd } from "../EntityCmd";

export class EllipseCmd extends EntityCmd {
	private centerPoint = null;
	private majorPoint = null;
	private minorPoint = null;
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
			this.centerPoint = point;
			this.indexPoint = 1;
			//TEMP ASSIGN FOR != NULL
			this.geometryDataId = 1;
			this.geometryData = 1;
			this.baseDownPoint = point;
		} else if (this.indexPoint == 1) {
			this.indexPoint = 2;
			this.majorPoint = point;
			const center = DrawingUtil.getCenterOfTwoPoint(this.centerPoint, point);
			this.centerPoint = center;

			this.geometryDataId = this.entity.appendEllipse(this.centerPoint, this.majorPoint, this.getMinorPoint(point));
			this.geometryData = this.geometryDataId.openAsEllipse();
			this.baseDownPoint = center;
			this.modifySize(point);
		} else if (this.indexPoint == 2) {
			this.indexPoint = 3;
			this.minorPoint = this.getMinorPoint(point);
			this.modifySize(point);
			this.endCmd(true);
		}
	}

	getMinorPoint(point) {
		let point3d = ViewerIns.getIns().createPoint3DFromArray(this.centerPoint);
		const pointTmp = ViewerIns.getIns().createPoint3DFromArray(point);
		const distanceTo = point3d.distanceTo(pointTmp);

		const vector01 = ViewerIns.getIns().createVector3DFromArray(this.centerPoint);
		const vector02 = ViewerIns.getIns().createVector3DFromArray(this.majorPoint);
		let vector = vector02.sub(vector01);
		vector = vector.rotateBy(Math.PI / 2, ViewerIns.getIns().createVector3DFromArray([0, 0, 1]));
		vector.setLength(distanceTo);

		point3d = point3d.translate(vector);
		return point3d.toArray();
	}

	getMajorPoint(point) {
		let point3d = ViewerIns.getIns().createPoint3DFromArray(this.centerPoint);
		const pointTmp = ViewerIns.getIns().createPoint3DFromArray(point);
		const distanceTo = point3d.distanceTo(pointTmp);

		const vector01 = ViewerIns.getIns().createVector3DFromArray(this.centerPoint);
		const vector02 = ViewerIns.getIns().createVector3DFromArray(this.minorPoint);
		let vector = vector02.sub(vector01);
		vector = vector.rotateBy(Math.PI / 2, ViewerIns.getIns().createVector3DFromArray([0, 0, 1]));
		vector.setLength(distanceTo);

		point3d = point3d.translate(vector);
		return point3d.toArray();
	}

	initForModify(point) {
		if (this.modeModify == ACTION_MODIFY.NONE) {
			this.centerPoint = this.geometryData.getCenter();
			this.majorPoint = this.geometryData.getMajor();
			this.minorPoint = this.geometryData.getMinor();
			this.indexPoint = 0;
			this.baseDownPoint = this.centerPoint;

			const index = this.getIndexOverlayPointDown(point);
			if (index >= 0) {
				const element = this.pointOverlays[index];
				if (element.type == "center") {
					this.modeModify = ACTION_MODIFY.MOVE;
				} else {
					this.modeModify = ACTION_MODIFY.EDIT;
					if (element.type.includes("major")) {
						this.indexPoint = 2;
					} else if (element.type.includes("minor")) {
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
				this.geometryData.setMinor(this.getMinorPoint(arr));
			}
		} else if (this.modeEntity == ACTION_ENTITY.MODIFY) {
			if (this.indexPoint == 1) {
				this.geometryData.setCenter(arr);
			} else if (this.indexPoint == 2) {
				this.geometryData.setMajor(this.getMajorPoint(arr));
			} else if (this.indexPoint == 3) {
				this.geometryData.setMinor(this.getMinorPoint(arr));
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

		const point01 = ViewerIns.getIns().createPoint3DFromArray(this.centerPoint).translate(translateVector).toArray();
		const point02 = ViewerIns.getIns().createPoint3DFromArray(this.majorPoint).translate(translateVector).toArray();
		const point03 = ViewerIns.getIns().createPoint3DFromArray(this.minorPoint).translate(translateVector).toArray();

		this.geometryData.set(point01, point02, point03);

		if (this.modeEntity == ACTION_ENTITY.MODIFY) {
			this.createConnectedLine(this.baseDownPoint, arr);
		}
	}

	protected geometryDataForType() {
		return this.geometryDataId.openAsEllipse();
	}

	initOverlayData(): void {
		const arrPoints = DrawingUtil.getAllPointCloudEllipse(this.geometryData);
		super.drawOverlayEntity(arrPoints);
	}

	override add(): void {
		this.modeEntity = ACTION_ENTITY.CREATE;
		const model = ViewerIns.getIns().visViewer.getActiveModel();
		this.entityId = model.appendEntity("AcDbEllipse");
		this.entity = this.entityId.openObject();
		this.entity.setColor(255, 255, 255);
	}
}
