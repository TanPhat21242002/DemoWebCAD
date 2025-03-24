/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
import { RectangleCmd } from "./RectangleCmd";
import { ViewerIns } from "../../viewer";
import { ACTION_ENTITY, TYPE_ROOM } from "../../config";
import { DrawingUtil } from "../../util/DrawingUtil";

export class DragRoomCmd extends RectangleCmd {
	private polygon = null;
	private roomType?: string;
	private width: number;
	private height: number;
	private textStyleId = ViewerIns.getIns().visViewer.createTextStyle(`textStyle_${Date.now()}`);
	textSize = 1;

	constructor(cmdName: string, entityId?, geometryDataId?, roomType?) {
		super(cmdName, entityId, geometryDataId);
		this.roomType = roomType;
	}

	override add() {
		this.modeEntity = ACTION_ENTITY.CREATE;
		const model = ViewerIns.getIns().visViewer.getActiveModel();
		this.entityId = model.appendEntity("Polyline");
		this.entity = this.entityId.openObject();
		this.entity.setColor(255, 255, 255);
	}

	override onMouseDown = (ev: MouseEvent, point: any) => {
		if (!this.geometryDataId && !this.geometryData) {
			this.geometryDataId = this.entity.appendPolygon(point.concat(point).concat(point).concat(point).concat(point));
			this.geometryData = this.geometryDataId.openAsPolygon();
			this.startPoint = point;
			this.endPoint = point;
		} else {
			this.modifySize(point);
			const polylineData = DrawingUtil.getRectangleData(this.startPoint, this.endPoint);
			let points = [];
			polylineData.forEach(item => {
				points = points.concat(item);
			});
			if (points.length >= 6) {
				points.push(points[0], points[1], points[2]);
			}
			this.polygon = DrawingUtil.createFilledPolygon(this.entity, this.roomType, points);

			this.addText();
			DrawingUtil.createWall(this.entity, points);
			this.createDim();
			this.endCmd(true);
		}
		ViewerIns.getIns().visViewer.update();
	};

	override modify() {
		this.modeEntity = ACTION_ENTITY.MODIFY;
		this.entity = this.entityId.openObject();
		this.createOverlayEntity();
		this.initOverlayData();
	}

	override onMouseMove = (ev: MouseEvent, point: any) => {
		if (!this.geometryDataId && !this.geometryData) {
			return;
		}

		this.modifySize(point);
		if (this.polygon) {
			this.updateFilledPolygon();
		}
	};

	private createDim() {
		const minPt = this.entity.getExtents().min();
		const maxPt = this.entity.getExtents().max();

		const startPt = [minPt[0], maxPt[1], 0];
		const endPt = [maxPt[0], minPt[1], 0];
		const [p1, p2, p3, p4] = DrawingUtil.getRectangleData(startPt, endPt);
		const offset = 10;
		const distance = 8;

		this.createDimLine([p1[0] - distance, p1[1], 0], [p1[0] - offset, p1[1], 0], [p2[0] - offset, p2[1], 0], [p2[0] - distance, p2[1], 0]);
		this.createDimLine([p3[0] + distance, p3[1], 0], [p3[0] + offset, p3[1], 0], [p4[0] + offset, p4[1], 0], [p4[0] + distance, p4[1], 0]);
		this.createDimLine([p1[0], p1[1] + distance, 0], [p1[0], p1[1] + offset, 0], [p4[0], p4[1] + offset, 0], [p4[0], p4[1] + distance, 0]);
		this.createDimLine([p2[0], p2[1] - distance, 0], [p2[0], p2[1] - offset, 0], [p3[0], p3[1] - offset, 0], [p3[0], p3[1] - distance, 0]);

		const textHeight = `${this.height.toFixed(1)}m`;
		const textWidth = `${this.width.toFixed(1)}m`;

		this.createDimText([p1[0] - offset - 1, (p1[1] + p2[1]) / 2 - this.textSize, 0], textHeight, Math.PI / 2);
		this.createDimText([p3[0] + offset - this.textSize, (p1[1] + p2[1]) / 2 - this.textSize, 0], textHeight, Math.PI / 2);
		this.createDimText([(p1[0] + p4[0]) / 2 - this.textSize, p1[1] + offset + this.textSize, 0], textWidth, 0);
		this.createDimText([(p2[0] + p3[0]) / 2 - this.textSize, p2[1] - offset + this.textSize, 0], textWidth, 0);
	}

	initOverlayData(): void {
		const arrPoints = DrawingUtil.getAllPointCloudPolyline(this.geometryData);
		const centers = DrawingUtil.getCenterPointCloudEntity(this.entity);
		if (centers.length > 0) {
			arrPoints.push(centers[0]);
		}
		super.drawOverlayEntity(arrPoints);
	}

	private createDimText = (pos: number[], text: string, angle: number) => {
		const textId = this.entityId.openObject().appendText(pos, text);
		const textEnt = textId.openAsText();
		textId.openObject().setColor(255, 255, 255);
		textEnt.setTextSize(this.textSize);
		textEnt.setRotation(angle);
		DrawingUtil.setTextStyle(textEnt, this.textStyleId);
	};

	private createDimLine = (start: number[], vertex1: number[], vertex2: number[], end: number[]) => {
		const dimEnt = this.entityId.openObject();
		dimEnt.setColor(255, 255, 255);

		dimEnt.appendPolyline([start[0], start[1], start[2], vertex1[0], vertex1[1], vertex1[2], vertex2[0], vertex2[1], vertex2[2], end[0], end[1], end[2]]);
	};

	private updateFilledPolygon() {
		const polylineData = DrawingUtil.getRectangleData(this.startPoint, this.endPoint);
		let data = [];
		polylineData.forEach(item => {
			data = data.concat(item);
		});
		this.polygon.setPoints(data);
	}

	private addText() {
		const textSize = 1.5;
		const textLength = this.roomType ? this.roomType.length : 0;
		const centerX = (this.startPoint[0] + this.endPoint[0]) / 2 - textLength;
		const centerY = (this.startPoint[1] + this.endPoint[1]) / 2;
		const textPosition = [centerX, centerY, 0];
		const [p1, p2, p3, p4] = DrawingUtil.getRectangleData(this.startPoint, this.endPoint);

		this.width = Math.abs(p4[0] - p1[0]);
		this.height = Math.abs(p2[1] - p1[1]);

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

		const areaTextPosition = [centerX, centerY - 2, 0];
		const areaTextId = this.entity.appendText(areaTextPosition, `${(this.height * this.width).toFixed(1)}m²`);
		areaTextId.openObject().setColor(textColor.r, textColor.g, textColor.b);
		const areaTextEntity = areaTextId.openAsText();
		areaTextEntity.setTextSize(textSize);
		DrawingUtil.setTextStyle(areaTextEntity, this.textStyleId);
	}
}
