/* eslint-disable @typescript-eslint/no-unused-vars */
import { ACTION_ENTITY, ACTION_MODIFY } from "../../config";
import { DrawingUtil } from "../../util/DrawingUtil";
import { ViewerIns } from "../../viewer";
import { EntityCmd } from "../EntityCmd";
import { PolylineCmd } from "./PolylineCmd";

export class RectangleCmd extends PolylineCmd {
	protected startPoint = null;
	protected endPoint = null;

	override onMouseDown = (ev: MouseEvent, point: any, pointWorld: any) => {
		if (this.modeEntity == ACTION_ENTITY.CREATE) {
			if (!this.geometryDataId && !this.geometryData) {
				this.geometryDataId = this.entity.appendPolyline(point.concat(point).concat(point).concat(point).concat(point));
				this.geometryData = this.geometryDataId.openAsPolyline();
				this.startPoint = point;
				this.endPoint = point;
			} else {
				this.modifySize(point);
				this.endCmd(true);
			}
		} else if (this.modeEntity == ACTION_ENTITY.MODIFY) {
			if (this.modeModify == ACTION_MODIFY.NONE) {
				super.initForModify(point);
				const index = this.getIndexOverlayPointDown(point);
				if (index >= 0) {
					const element = this.pointOverlays[index];
					this.baseDownPoint = element.point;
					if (element.type == "center") {
						this.modeModify = ACTION_MODIFY.MOVE;
						this.startPoint = this.pointOverlays[1].point;
						this.endPoint = this.pointOverlays[3].point;
					} else {
						this.modeModify = ACTION_MODIFY.EDIT;
						if (index <= 2) {
							this.endPoint = element.point;
							this.startPoint = this.pointOverlays[index + 2].point;
						} else {
							this.endPoint = element.point;
							this.startPoint = this.pointOverlays[index - 2].point;
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
	};

	override modifySize(arr: any): void {
		if (this.modeEntity == ACTION_ENTITY.CREATE) {
			this.endPoint = arr;
			const rectangleData = this.getRectangleData();
			this.geometryData.setPoints(rectangleData[0].concat(rectangleData[1]).concat(rectangleData[2]).concat(rectangleData[3]).concat(rectangleData[0]));
		} else if (this.modeEntity == ACTION_ENTITY.MODIFY) {
			super.modifySize(arr);
		}
	}

	override modifyPosition(arr: any): void {
		const findItem = this.pointOverlays.find(item => {
			return item.type == "center";
		});

		if (!findItem) {
			return;
		}

		const vector01 = ViewerIns.getIns().createVector3DFromArray(findItem);
		const vector02 = ViewerIns.getIns().createVector3DFromArray(arr);

		const translateVector = vector02.sub(vector01);
		const rectangleData = this.getRectangleData();
		rectangleData[0] = ViewerIns.getIns().createPoint3DFromArray(rectangleData[0]).translate(translateVector).toArray();
		rectangleData[1] = ViewerIns.getIns().createPoint3DFromArray(rectangleData[1]).translate(translateVector).toArray();
		rectangleData[2] = ViewerIns.getIns().createPoint3DFromArray(rectangleData[2]).translate(translateVector).toArray();
		rectangleData[3] = ViewerIns.getIns().createPoint3DFromArray(rectangleData[3]).translate(translateVector).toArray();

		this.geometryData.setPoints(rectangleData[0].concat(rectangleData[1]).concat(rectangleData[2]).concat(rectangleData[3]).concat(rectangleData[0]));

		if (this.modeEntity == ACTION_ENTITY.MODIFY) {
			this.createConnectedLine(this.baseDownPoint, arr);
		}
	}

	getRectangleData() {
		if (this.startPoint && this.endPoint) {
			return [
				[this.startPoint[0], this.startPoint[1], this.startPoint[2]],
				[this.startPoint[0], this.endPoint[1], this.endPoint[2]],
				[this.endPoint[0], this.endPoint[1], this.endPoint[2]],
				[this.endPoint[0], this.startPoint[1], this.startPoint[2]],
			];
		}
	}

	protected geometryDataForType() {
		return (this.geometryData = this.geometryDataId.openAsPolyline());
	}

	protected initOverlayData(): void {
		const arrPoints = DrawingUtil.getAllPointCloudRec(this.geometryData);
		super.drawOverlayEntity(arrPoints);
	}

	override add(): void {
		this.modeEntity = ACTION_ENTITY.CREATE;
		const model = ViewerIns.getIns().visViewer.getActiveModel();
		this.entityId = model.appendEntity("AcDb2dPolyline");
		this.entity = this.entityId.openObject();
		this.entity.setColor(255, 255, 255);
	}
}
