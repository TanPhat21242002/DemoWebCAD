/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
import { RectangleCmd } from "./RectangleCmd";
import { ViewerIns } from "../../viewer";
import { ACTION_ENTITY } from "../../config";

export class HatchCmd extends RectangleCmd {
	private polygonId = null;
	private polygon = null;
	private textId = null;

	override add() {
		this.modeEntity = ACTION_ENTITY.CREATE;
		const model = ViewerIns.getIns().visViewer.getActiveModel();
		this.entityId = model.appendEntity("Polyline");
		this.entity = this.entityId.openObject();
		this.entity.setLineWeight(2);
		this.entity.setColor(254, 0, 0);
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

			const color = new (ViewerIns.getIns().visLib.OdTvColorDef)(254, 251, 241);
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
		const centerX = (this.startPoint[0] + this.endPoint[0]) / 2;
		const centerY = (this.startPoint[1] + this.endPoint[1]) / 2;
		const textPosition = [centerX, centerY, 0];

		this.textId = this.entity.appendText(textPosition, "Text");
		const textEntity = this.textId.openAsText();
		textEntity.setTextSize(2);

		const textStyle = ViewerIns.getIns().visViewer.createTextStyle("custom_style");
		const textStylePtr = textStyle.openObject();
		textStylePtr.setFont("arial.ttf", false, false, 0, 0);

		textEntity.setTextStyle(textStyle);

		textStylePtr.delete();
		textEntity.delete();
	}
}
