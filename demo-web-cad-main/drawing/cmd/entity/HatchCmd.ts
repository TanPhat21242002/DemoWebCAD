/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */

import { RectangleCmd } from "./RectangleCmd";
import { ViewerIns } from "../../viewer";
import { ACTION_ENTITY, ACTION_MODIFY, CMD_NAME, ENTITY_NAME } from "../../config";
import { DrawingUtil } from "../../util/DrawingUtil";

export class HatchCmd extends RectangleCmd {
	override onMouseDown = (ev: MouseEvent, point: any) => {};

	onMouseMove = (ev: MouseEvent, point: any) => {};

	override modifyPosition(arr: any): void {}

	override add() {}
}
