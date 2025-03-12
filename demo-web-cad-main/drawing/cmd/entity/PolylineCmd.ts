/* eslint-disable @typescript-eslint/no-unused-vars */
import { ACTION_ENTITY, ACTION_MODIFY, DrawingConfig } from "../../config";
import { DrawingUtil } from "../../util/DrawingUtil";
import { ViewerIns } from "../../viewer";
import { EntityCmd } from "../EntityCmd";

export class PolylineCmd extends EntityCmd {
	private polylinePoints = [];
	private pointIndexs = [];
	private tmpPoint = null;
	private isClosedPolyline = false;
	private closePointIndex = -1;

	override onMouseDown = (ev: MouseEvent, point: any, pointWorld: any) => {
		if (this.modeEntity == ACTION_ENTITY.CREATE) {
			this.initForCreate(point);
			if (this.polylinePoints.length > 2 && this.isClosedPolyline) {
				this.endCmd(true);
			}
		} else if (this.modeEntity == ACTION_ENTITY.MODIFY) {
			this.initForModify(point);
		}
	};

	initForCreate(point) {
		if (!this.geometryDataId && !this.geometryData) {
			this.polylinePoints.push(point);
			this.polylinePoints.push(point);
			this.geometryDataId = this.entity.appendPolyline(this.getPolylineData());
			this.geometryData = this.geometryDataId.openAsPolyline();
		} else {
			this.polylinePoints[this.polylinePoints.length - 1] = point;
			this.polylinePoints.push(point);
		}
	}

	initForModify(point) {
		this.pointIndexs = [];
		if (this.modeModify == ACTION_MODIFY.NONE) {
			this.polylinePoints = this.getPolylinePoints();
			const index = this.getIndexOverlayPointDown(point);
			if (index >= 0) {
				const element = this.pointOverlays[index];
				this.baseDownPoint = element.point;
				if (element.type == "center") {
					this.modeModify = ACTION_MODIFY.MOVE;
					this.tmpPoint = this.baseDownPoint;
				} else {
					this.modeModify = ACTION_MODIFY.EDIT;
					const iii = this.polylinePoints.findIndex(point => DrawingUtil.compareTwoPoints(point, this.baseDownPoint));
					if (iii >= 0) {
						this.pointIndexs.push(iii);
					} else {
						for (let i = 0; i < this.polylinePoints.length - 1; i++) {
							const center = DrawingUtil.getCenterOfTwoPoint(this.polylinePoints[i], this.polylinePoints[i + 1]);
							if (DrawingUtil.compareTwoPoints(center, this.baseDownPoint)) {
								this.pointIndexs.push(i);
								this.pointIndexs.push(i + 1);
								break;
							}
						}
					}
					this.tmpPoint = this.baseDownPoint;
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

	override modifyPosition(arr: any): void {
		const vector01 = ViewerIns.getIns().createVector3DFromArray(this.tmpPoint);
		const vector02 = ViewerIns.getIns().createVector3DFromArray(arr);
		const translateVector = vector02.sub(vector01);

		const points = [];
		this.polylinePoints.forEach(element => {
			let point = ViewerIns.getIns().createPoint3DFromArray(element);
			point = point.translate(translateVector);
			points.push(point.toArray());
		});
		this.polylinePoints = points;
		this.geometryData.setPoints(this.getPolylineData());
		this.tmpPoint = arr;

		if (this.modeEntity == ACTION_ENTITY.MODIFY) {
			this.createConnectedLine(this.baseDownPoint, arr);
		}
	}

	override modifySize(arr: any): void {
		if (this.modeEntity == ACTION_ENTITY.CREATE) {
			this.polylinePoints[this.polylinePoints.length - 1] = arr;
			this.geometryData.setPoints(this.getPolylineData());
		} else if (this.modeEntity == ACTION_ENTITY.MODIFY) {
			if (this.pointIndexs.length == 1) {
				this.polylinePoints[this.pointIndexs[0]] = arr;
				if (this.isClosedPolyline) {
					if (this.closePointIndex == this.polylinePoints.length - 1 && this.pointIndexs[0] == 0) {
						this.polylinePoints[this.closePointIndex] = arr;
					} else if (this.pointIndexs[0] == this.closePointIndex) {
						this.polylinePoints[(this.closePointIndex + 1) % this.polylinePoints.length] = arr;
					}
				}
				this.geometryData.setPoints(this.getPolylineData());
			} else if (this.pointIndexs.length > 1) {
				const index00 = this.pointIndexs[0];
				const index01 = this.pointIndexs[1];

				const vector01 = ViewerIns.getIns().createVector3DFromArray(this.tmpPoint);
				const vector02 = ViewerIns.getIns().createVector3DFromArray(arr);
				const translateVector = vector02.sub(vector01);
				let point01 = ViewerIns.getIns().createPoint3DFromArray(this.polylinePoints[index00]);
				let point02 = ViewerIns.getIns().createPoint3DFromArray(this.polylinePoints[index01]);
				point01 = point01.translate(translateVector);
				point02 = point02.translate(translateVector);

				this.polylinePoints[index00] = point01.toArray();
				this.polylinePoints[index01] = point02.toArray();

				if (this.isClosedPolyline && index01 == this.closePointIndex) {
					if (this.closePointIndex == this.polylinePoints.length - 1) {
						let point = ViewerIns.getIns().createPoint3DFromArray(this.polylinePoints[0]);
						point = point.translate(translateVector);
						this.polylinePoints[0] = point.toArray();
					} else {
						let point = ViewerIns.getIns().createPoint3DFromArray(this.polylinePoints[this.closePointIndex + 1]);
						point = point.translate(translateVector);
						this.polylinePoints[0] = point.toArray();
					}
				}

				if (this.isClosedPolyline && index00 == 0 && this.closePointIndex == this.polylinePoints.length - 1) {
					let point = ViewerIns.getIns().createPoint3DFromArray(this.polylinePoints[this.closePointIndex]);
					point = point.translate(translateVector);
					this.polylinePoints[this.polylinePoints.length - 1] = point.toArray();
				}

				this.geometryData.setPoints(this.getPolylineData());
				this.tmpPoint = arr;
			}
		}

		if (this.modeEntity == ACTION_ENTITY.MODIFY) {
			this.createConnectedLine(this.baseDownPoint, arr);
		}
	}

	getPolylineData() {
		let arr = [];
		for (let i = 0; i < this.polylinePoints.length; i++) {
			arr = arr.concat(this.polylinePoints[i]);
		}
		return arr;
	}

	getPolylinePoints() {
		const points = this.geometryData.getPoints();
		if (points.length >= 3) {
			if (DrawingUtil.compareTwoPoints(points[0], points[points.length - 1])) {
				this.isClosedPolyline = true;
				this.closePointIndex = points.length - 1;
				return points;
			}

			for (let i = 0; i < points.length - 1; i++) {
				const point01 = points[i];
				const point02 = points[i + 1];
				if (DrawingUtil.compareTwoPoints(point01, point02)) {
					this.isClosedPolyline = true;
					this.closePointIndex = i;
					break;
				}
			}
		}
		return points;
	}

	override onKeyPress = (ev: KeyboardEvent, keyCode: number) => {
		alert(keyCode);
		switch (keyCode) {
			//ESC
			case 27:
				if (this.modeEntity == ACTION_ENTITY.CREATE) {
					if (this.polylinePoints.length <= 2) {
						this.remove();
						this.endCmd(true);
					} else {
						this.polylinePoints.splice(-1);
						this.geometryData.setPoints(this.getPolylineData());
					}
					this.endCmd(true);
				} else {
					this.cancelCmd(true);
				}
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
		return (this.geometryData = this.geometryDataId.openAsPolyline());
	}

	protected initOverlayData(): void {
		const arrPoints = DrawingUtil.getAllPointCloudPolyline(this.geometryData);
		const centers = DrawingUtil.getCenterPointCloudEntity(this.entity);
		if (centers.length > 0) {
			arrPoints.push(centers[0]);
		}
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
