import { ViewerIns } from "./viewer";

export class AppConfig {
	public static readonly VISUALIZEJS_URL: string = "./libs/25.8/Visualize.js";
}

export class DrawingConfig {
	public static readonly ESP_NUMBER: number = 0.01;
	private static readonly OVERLAY_SIZE = 1;
	public static readonly LINE_UNIT_ARR = [1, 5, 10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000];
	public static readonly MAX_LINE_NUM = 5000;

	public static SIZE_OVERLAY = fieldWidth => {
		if (fieldWidth == 0) {
			fieldWidth = ViewerIns.getIns().visViewer.activeView.viewFieldWidth;
		}
		return DrawingConfig.OVERLAY_SIZE * (fieldWidth / 250);
	};
}

export const ENTITY_NAME = {
	MAIN_ENTITY: "MAIN_ENTITY",
	CLONE_ENTITY: "CLONE_ENTITY",
	OVERLAY_ENTITY: "OVERLAY_ENTITY",
};

export const CMD_NAME = {
	CIRCLE: "CIRCLE",
	RECTANGLE: "RECTANGLE",
	POLYLINE: "POLYLINE",
	OTHER: "OTHER",
	SELECT: "SELECT",
	ARC: "ARC",
	ELLIPSE: "ELLIPSE",
	PAN: "PAN",
	TEXT: "TEXT",
	ORBIT: "ORBIT",
	BOX: "BOX",
	HATCH: "HATCH",
};

export const ACTION_ENTITY = {
	NONE: 0,
	CREATE: 1,
	MODIFY: 2,
};

export const ACTION_MODIFY = {
	NONE: 0,
	MOVE: 1,
	EDIT: 2,
};
