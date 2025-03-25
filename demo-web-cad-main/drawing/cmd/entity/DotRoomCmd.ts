/* eslint-disable @typescript-eslint/no-unused-vars */
import { ACTION_ENTITY, ACTION_MODIFY, TYPE_ROOM } from "../../config";
import { DrawingUtil } from "../../util/DrawingUtil";
import { ViewerIns } from "../../viewer";
import { EntityCmd } from "../EntityCmd";

export class DotRoomCmd extends EntityCmd {
	private polylinePoints = [];
	private pointIndexs = [];
	private tmpPoint = null;
	private isClosedPolyline = false;
	private closePointIndex = -1;
	private roomType?: string;
	private segmentTexts = [];
	private vertexPoints = [];
	private tempTextId = null;
	private textStyleId = ViewerIns.getIns().visViewer.createTextStyle(`textStyle_${Date.now()}`);
	textSize = 1.5;

	constructor(cmdName: string, entityId?, geometryDataId?, roomType?) {
		super(cmdName, entityId, geometryDataId);
		this.roomType = roomType;
	}

	override onMouseDown = (ev: MouseEvent, point: any, pointWorld: any) => {
		if (this.modeEntity == ACTION_ENTITY.CREATE) {
			this.initForCreate(point);
			if (this.polylinePoints.length > 2 && this.isClosedPolyline) {
				this.endCmd(true);
			}
			if (this.polylinePoints.length > 2) {
				if (DrawingUtil.compareTwoPoints(this.polylinePoints[0], this.polylinePoints[this.polylinePoints.length - 1])) {
					this.polylinePoints.pop();
					this.polylinePoints.push([...this.polylinePoints[0]]);
					this.isClosedPolyline = true;
					this.closePointIndex = this.polylinePoints.length - 1;
					this.geometryData.setPoints(this.getPolylineData());
					let points = [];
					this.polylinePoints.forEach(item => {
						points = points.concat(item);
					});
					DrawingUtil.createFilledPolygon(this.entity, this.roomType, points);
					this.addText();

					this.endCmd(true);
					DrawingUtil.removeAllEnt(this.segmentTexts, this.entity);
					DrawingUtil.removeAllEnt(this.vertexPoints, this.entity);
					this.removeTempText();
				}
			}
		} else if (this.modeEntity == ACTION_ENTITY.MODIFY) {
			//this.initForModify(point);
		}
	};

	override modify(): void {}

	private addTextTemp(startPt: any, endPt: any) {
		if (!this.polylinePoints || this.polylinePoints.length < 2) return;

		const length = Math.sqrt(Math.pow(endPt[0] - startPt[0], 2) + Math.pow(endPt[1] - startPt[1], 2)).toFixed(1);

		const centerX = (startPt[0] + endPt[0]) / 2;
		const centerY = (startPt[1] + endPt[1]) / 2;
		const textPosition = [centerX, centerY, 0];

		const textId = this.entity.appendText(textPosition, `${length}m`);
		this.segmentTexts.push(textId);
		const textEntity = textId.openAsText();
		textEntity.setTextSize(this.textSize);
		textId.openObject().setColor(255, 255, 255);

		DrawingUtil.setTextStyle(textEntity, this.textStyleId);
	}

	initForCreate(point) {
		if (!this.geometryDataId && !this.geometryData) {
			this.polylinePoints.push(point);
			this.polylinePoints.push(point);
			this.geometryDataId = this.entity.appendPolyline(this.getPolylineData());
			this.geometryData = this.geometryDataId.openAsPolyline();
		} else {
			this.polylinePoints[this.polylinePoints.length - 1] = point;
			this.polylinePoints.push(point);
			if (this.polylinePoints.length > 1) {
				const startPt = this.polylinePoints[this.polylinePoints.length - 3];
				const endPt = this.polylinePoints[this.polylinePoints.length - 2];
				this.addTextTemp(startPt, endPt);
			}
		}
		this.addVertexPoint(point);
	}

	private addVertexPoint(point: any) {
		const pointId = this.entity.appendPointCloud(point);
		this.vertexPoints.push(pointId);
		const pointTmp = pointId.openAsPointCloud();
		pointTmp.setPointSize(10);
		pointId.openObject().setColor(255, 0, 0);
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
			this.removeTempText();
			this.addTempText(this.polylinePoints[this.polylinePoints.length - 2], arr);
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

	private removeTempText() {
		if (this.tempTextId) {
			this.entity.removeGeometryData(this.tempTextId);
			this.tempTextId = null;
		}
	}

	private addTempText(startPoint: any, endPoint: any) {
		const distance = Math.sqrt(Math.pow(endPoint[0] - startPoint[0], 2) + Math.pow(endPoint[1] - startPoint[1], 2));
		const midPoint = [(startPoint[0] + endPoint[0]) / 2, (startPoint[1] + endPoint[1]) / 2, 0];
		this.tempTextId = this.entity.appendText(midPoint, `${distance.toFixed(1)}m`);
		const textEntity = this.tempTextId.openAsText();
		textEntity.setTextSize(this.textSize);
		this.tempTextId.openObject().setColor(255, 255, 255);
		DrawingUtil.setTextStyle(textEntity, this.textStyleId);
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
					this.entity.removeGeometryData(this.geometryDataId);
					DrawingUtil.removeAllEnt(this.segmentTexts, this.entity);
					DrawingUtil.removeAllEnt(this.vertexPoints, this.entity);
					this.removeTempText();
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
				if (this.polylinePoints.length > 2) {
					this.polylinePoints.pop();

					this.polylinePoints.push([...this.polylinePoints[0]]);
					this.isClosedPolyline = true;
					this.closePointIndex = this.polylinePoints.length - 1;
					this.geometryData.setPoints(this.getPolylineData());
					let points = [];
					this.polylinePoints.forEach(item => {
						points = points.concat(item);
					});
					DrawingUtil.createFilledPolygon(this.entity, this.roomType, points);
					this.addText();
				}
				this.endCmd(true);
				DrawingUtil.removeAllEnt(this.segmentTexts, this.entity);
				DrawingUtil.removeAllEnt(this.vertexPoints, this.entity);
				this.removeTempText();
				break;
		}
	};

	private addText() {
		const textSize = 1.5;
		const textPosition = this.entity.getExtents().center();

		let textColor: { r: any; g: any; b: any };
		switch (this.roomType) {
			case TYPE_ROOM.JStyleRoom:
			case TYPE_ROOM.BatchRoom:
			case TYPE_ROOM.Toilet:
				textColor = { r: 255, g: 255, b: 255 };
				break;
			default:
				textColor = { r: 0, g: 0, b: 0 };
				break;
		}

		const textId = this.entity.appendText(textPosition, this.roomType);
		const textEntity = textId.openAsText();
		textId.openObject().setColor(textColor.r, textColor.g, textColor.b);
		textEntity.setTextSize(textSize);
		DrawingUtil.setTextStyle(textEntity, this.textStyleId);

		let points = [];
		this.polylinePoints.forEach(item => {
			points = points.concat(item);
		});

		const areaTextPosition = [textPosition[0], textPosition[1] - 2, 0];
		const area = DrawingUtil.calculateArea(points);
		const areaTextId = this.entity.appendText(areaTextPosition, `${area.toFixed(1)}m²`);
		areaTextId.openObject().setColor(textColor.r, textColor.g, textColor.b);
		const areaTextEntity = areaTextId.openAsText();
		areaTextEntity.setTextSize(textSize);
		DrawingUtil.setTextStyle(areaTextEntity, this.textStyleId);
	}

	protected geometryDataForType() {
		return (this.geometryData = this.geometryDataId.openAsPolyline());
	}

	initOverlayData(): void {
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
