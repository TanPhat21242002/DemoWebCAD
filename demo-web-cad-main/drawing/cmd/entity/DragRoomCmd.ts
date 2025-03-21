/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
import { RectangleCmd } from "./RectangleCmd";
import { ViewerIns } from "../../viewer";
import { ACTION_ENTITY, TYPE_ROOM } from "../../config";
import { DrawingUtil } from "../../util/DrawingUtil";

export class DragRoomCmd extends RectangleCmd {
	private polygonId = null;
	private polygon = null;
	private roomType?: string;
	private width: number;
	private height: number;

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
			this.createFilledPolygon();
			this.addText();
			this.endCmd(true);
			this.createWall();
			this.createDim();
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
		if (!this.geometryData) return;

		const [p1, p2, p3, p4] = this.getRectangleData();
		const offset = 10;
		const distance = 8;

		const createDimLine = (start: number[], vertex1: number[], vertex2: number[], end: number[]) => {
			const dimEnt = this.entityId.openObject();
			dimEnt.setColor(255, 255, 255);

			dimEnt.appendPolyline([
				start[0],
				start[1],
				start[2],
				vertex1[0],
				vertex1[1],
				vertex1[2],
				vertex2[0],
				vertex2[1],
				vertex2[2],
				end[0],
				end[1],
				end[2],
			]);
		};

		createDimLine([p1[0] - distance, p1[1], 0], [p1[0] - offset, p1[1], 0], [p2[0] - offset, p2[1], 0], [p2[0] - distance, p2[1], 0]);
		createDimLine([p3[0] + distance, p3[1], 0], [p3[0] + offset, p3[1], 0], [p4[0] + offset, p4[1], 0], [p4[0] + distance, p4[1], 0]);
		createDimLine([p1[0], p1[1] + distance, 0], [p1[0], p1[1] + offset, 0], [p4[0], p4[1] + offset, 0], [p4[0], p4[1] + distance, 0]);
		createDimLine([p2[0], p2[1] - distance, 0], [p2[0], p2[1] - offset, 0], [p3[0], p3[1] - offset, 0], [p3[0], p3[1] - distance, 0]);

		const createDimText = (pos: number[], text: string, angle: number, textSize: number, textStyleId: any) => {
			const textId = this.entityId.openObject().appendText(pos, text);
			const textEnt = textId.openAsText();
			textId.openObject().setColor(255, 255, 255);
			textEnt.setTextSize(textSize);
			textEnt.setRotation(angle);
			this.setTextStyle(textEnt, textStyleId);
		};

		const textSize = 1;
		const textStyleId = ViewerIns.getIns().visViewer.createTextStyle(`textStyle_${Date.now()}`);
		const textHeight = `${this.height.toFixed(1)}m`;
		const textWidth = `${this.width.toFixed(1)}m`;

		createDimText([p1[0] - offset - 1, (p1[1] + p2[1]) / 2 - textSize, 0], textHeight, Math.PI / 2, textSize, textStyleId);
		createDimText([p3[0] + offset - textSize, (p1[1] + p2[1]) / 2 - textSize, 0], textHeight, Math.PI / 2, textSize, textStyleId);
		createDimText([(p1[0] + p4[0]) / 2 - textSize, p1[1] + offset + textSize, 0], textWidth, 0, textSize, textStyleId);
		createDimText([(p2[0] + p3[0]) / 2 - textSize, p2[1] - offset + textSize, 0], textWidth, 0, textSize, textStyleId);
	}

	private createWall() {
		if (!this.geometryData) return;

		const polylineData = this.getRectangleData();
		let data: number[] = [];

		polylineData.forEach(item => {
			data = data.concat(item);
		});
		if (data.length >= 6) {
			data.push(data[0], data[1], data[2]);
		}

		// const model = ViewerIns.getIns().visViewer.getActiveModel();
		// const entId = model.appendEntity("wall");
		// const ent = entId.openObject();
		// ent.setLineWeight(10);
		// ent.setColor(102, 102, 102);
		// ent.appendPolyline(data);

		const entId = this.entity.appendPolyline(data);
		const weightDef = new (ViewerIns.getIns().visLib.OdTvLineWeightDef)();
		weightDef.setValue(10);

		entId.openObject().setLineWeight(weightDef);
		entId.openObject().setColor(102, 102, 102);
	}

	private createFilledPolygon() {
		if (this.polygonId == null) {
			const polylineData = this.getRectangleData();
			let data = [];
			polylineData.forEach(item => {
				data = data.concat(item);
			});

			this.polygonId = this.entity.appendPolygon(data);
			this.polygon = this.polygonId.openAsPolygon();
			this.polygon.setFilled(true);

			let color: any;
			switch (this.roomType) {
				case TYPE_ROOM.WStyleRoom:
					color = new (ViewerIns.getIns().visLib.OdTvColorDef)(255, 246, 221);
					break;
				case TYPE_ROOM.JStyleRoom:
					color = new (ViewerIns.getIns().visLib.OdTvColorDef)(0, 0, 0);
					break;
				case TYPE_ROOM.Entrance:
					color = new (ViewerIns.getIns().visLib.OdTvColorDef)(226, 226, 226);
					break;
				case TYPE_ROOM.LDK:
					color = new (ViewerIns.getIns().visLib.OdTvColorDef)(255, 246, 221);
					break;
				case TYPE_ROOM.BatchRoom:
					color = new (ViewerIns.getIns().visLib.OdTvColorDef)(0, 0, 0);
					break;
				case TYPE_ROOM.Toilet:
					color = new (ViewerIns.getIns().visLib.OdTvColorDef)(0, 0, 0);
					break;
				case TYPE_ROOM.Corridor:
					color = new (ViewerIns.getIns().visLib.OdTvColorDef)(255, 227, 158);
					break;
				default:
					color = new (ViewerIns.getIns().visLib.OdTvColorDef)(254, 0, 0);
					break;
			}
			this.polygonId.openObject().setColor(color, ViewerIns.getIns().visLib.GeometryTypes.kAll);

			// const transparencyDef = new (ViewerIns.getIns().visLib.OdTvTransparencyDef)();
			// transparencyDef.setValue(0.2);
			// this.polygonId.openObject().setTransparency(transparencyDef);
		}
	}

	initOverlayData(): void {
		const arrPoints = DrawingUtil.getAllPointCloudPolyline(this.geometryData);
		const centers = DrawingUtil.getCenterPointCloudEntity(this.entity);
		if (centers.length > 0) {
			arrPoints.push(centers[0]);
		}
		super.drawOverlayEntity(arrPoints);
	}

	private updateFilledPolygon() {
		const polylineData = this.getRectangleData();
		let data = [];
		polylineData.forEach(item => {
			data = data.concat(item);
		});
		this.polygon.setPoints(data);
	}

	private setTextStyle(textEntity: any, textStyleId: any) {
		try {
			const textStyle = textStyleId.openObject();
			if (textStyle) {
				textStyle.setFileName("NotoSansJP.ttf");
				textStyle.setFont("NotoSansJP.ttf", false, false, 0, 0);
				textEntity.setTextStyle(textStyleId);
			}
		} catch (error) {
			console.error("Error when creating or opening text style:", error);
		}
	}

	private addText() {
		const textSize = 1.5;
		const textLength = this.roomType ? this.roomType.length : 0;
		const centerX = (this.startPoint[0] + this.endPoint[0]) / 2 - textLength;
		const centerY = (this.startPoint[1] + this.endPoint[1]) / 2;
		const textPosition = [centerX, centerY, 0];
		const [p1, p2, p3, p4] = this.getRectangleData();

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

		const textStyleId = ViewerIns.getIns().visViewer.createTextStyle(`textStyle_${Date.now()}`);
		this.setTextStyle(textEntity, textStyleId);

		const areaTextPosition = [centerX, centerY - 2, 0];
		const areaTextId = this.entity.appendText(areaTextPosition, `${(this.height * this.width).toFixed(1)}m²`);
		areaTextId.openObject().setColor(textColor.r, textColor.g, textColor.b);
		const areaTextEntity = areaTextId.openAsText();
		areaTextEntity.setTextSize(textSize);
		this.setTextStyle(areaTextEntity, textStyleId);
	}
}
