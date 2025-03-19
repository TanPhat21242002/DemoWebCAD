/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
import { RectangleCmd } from "./RectangleCmd";
import { ViewerIns } from "../../viewer";
import { ACTION_ENTITY, TYPE_ROOM } from "../../config";

export class HatchCmd extends RectangleCmd {
	private polygonId = null;
	private polygon = null;
	private roomType?: string;

	constructor(cmdName: string, entityId?: string, geometryDataId?: string, roomType?: string) {
		super(cmdName, entityId, geometryDataId);
		this.roomType = roomType;
	}

	override add() {
		this.modeEntity = ACTION_ENTITY.CREATE;
		const model = ViewerIns.getIns().visViewer.getActiveModel();
		this.entityId = model.appendEntity("Polyline");
		this.entity = this.entityId.openObject();
		//this.entity.setLineWeight(1);
		this.entity.setColor(102, 102, 102);
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
		}
		ViewerIns.getIns().visViewer.update();
	};

	override onMouseMove = (ev: MouseEvent, point: any) => {
		if (!this.geometryDataId && !this.geometryData) {
			return;
		}

		this.modifySize(point);
		if (this.polygon) {
			this.updateFilledPolygon();
		}
	};

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

			const transparencyDef = new (ViewerIns.getIns().visLib.OdTvTransparencyDef)();
			transparencyDef.setValue(0.2);
			this.polygonId.openObject().setTransparency(transparencyDef);
		}
	}

	private updateFilledPolygon() {
		const polylineData = this.getRectangleData();
		let data = [];
		polylineData.forEach(item => {
			data = data.concat(item);
		});
		this.polygon.setPoints(data);
	}

	private addText() {
		const textLength = this.roomType ? this.roomType.length : 0;
		const centerX = (this.startPoint[0] + this.endPoint[0]) / 2 - textLength;
		const centerY = (this.startPoint[1] + this.endPoint[1]) / 2;
		const textPosition = [centerX, centerY, 0];
		const textSize = 1.5;

		let textColor = { r: 0, g: 0, b: 0 };
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

		this.entity.setColor(textColor.r, textColor.g, textColor.b);

		const textId = this.entity.appendText(textPosition, this.roomType);
		const textEntity = textId.openAsText();
		textEntity.setTextSize(textSize);

		const areaTextPosition = [centerX, centerY - 2, 0];
		const areaTextId = this.entity.appendText(areaTextPosition, "35.2m²");
		const areaTextEntity = areaTextId.openAsText();
		areaTextEntity.setTextSize(textSize);

		try {
			const textStyleId = ViewerIns.getIns().visViewer.createTextStyle(`textStyle_${Date.now()}`);
			const textStyle = textStyleId.openObject();

			if (textStyle) {
				textStyle.setFileName("NotoSansJP.ttf");
				textStyle.setFont("NotoSansJP.ttf", 0, 0, false, false);
				textEntity.setTextStyle(textStyleId);
				areaTextEntity.setTextStyle(textStyleId);
			}
		} catch (error) {
			console.error("Error when creating or opening text style:", error);
		}
	}
}
