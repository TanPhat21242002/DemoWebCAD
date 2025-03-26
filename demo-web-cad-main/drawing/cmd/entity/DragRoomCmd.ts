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
