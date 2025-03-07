import { CMD_NAME } from "../config";
import { ArcCmd } from "./entity/ArcCmd";
import { BoxCmd } from "./entity/BoxCmd";
import { CircleCmd } from "./entity/CircleCmd";
import { EllipseCmd } from "./entity/EllipseCmd";
import { PolylineCmd } from "./entity/PolylineCmd";
import { RectangleCmd } from "./entity/RectangleCmd";
import { EntityCmd } from "./EntityCmd";
import { ICmdEvent } from "./interface/ICmdEvent";
import { OrbitCmd } from "./OrbitCmd";
import { PanCmd } from "./PanCmd";
import { SelectCmd } from "./SelectCmd";

export class CmdFactory implements ICmdEvent {
	private static instance = null;
	public currentCmd = null;

	private constructor() {}

	public static getIns(): CmdFactory {
		if (this.instance == null) {
			this.instance = new CmdFactory();
		}
		return this.instance;
	}

	public isEmptyCmd() {
		return this.currentCmd == null;
	}

	onCmdBegin: () => any;
	onCmdCancel: () => any;
	onCmdData: (data: any) => any;
	onCmdEnd: () => any;

	public createCmd(cmdName, entityId?, geometryDataId?) {
		if (this.currentCmd != null) {
			return;
		}

		switch (cmdName) {
			case CMD_NAME.CIRCLE:
				this.currentCmd = new CircleCmd(cmdName, entityId, geometryDataId);
				break;
			case CMD_NAME.RECTANGLE:
				this.currentCmd = new RectangleCmd(cmdName, entityId, geometryDataId);
				break;
			case CMD_NAME.POLYLINE:
				this.currentCmd = new PolylineCmd(cmdName, entityId, geometryDataId);
				break;
			case CMD_NAME.OTHER:
				this.currentCmd = new EntityCmd(cmdName, entityId, geometryDataId);
				break;
			case CMD_NAME.SELECT:
				this.currentCmd = new SelectCmd(cmdName, entityId, geometryDataId);
				break;
			case CMD_NAME.ARC:
				this.currentCmd = new ArcCmd(cmdName, entityId, geometryDataId);
				break;
			case CMD_NAME.ELLIPSE:
				this.currentCmd = new EllipseCmd(cmdName, entityId, geometryDataId);
				break;
			case CMD_NAME.PAN:
				this.currentCmd = new PanCmd(cmdName);
				break;
			case CMD_NAME.ORBIT:
				this.currentCmd = new OrbitCmd(cmdName);
				break;
			case CMD_NAME.BOX:
				this.currentCmd = new BoxCmd(cmdName);
				break;
		}

		this.currentCmd.onCmdBegin = () => {
			if (this.onCmdBegin != null) {
				this.onCmdBegin();
			}
		};

		this.currentCmd.onCmdCancel = () => {
			if (this.onCmdCancel != null) {
				this.onCmdCancel();
			}
		};

		this.currentCmd.onCmdData = data => {
			if (this.onCmdData != null) {
				this.onCmdData(data);
			}
		};

		this.currentCmd.onCmdEnd = () => {
			this.currentCmd = null;
			if (this.onCmdEnd != null) {
				this.onCmdEnd();
			}
		};

		try {
			this.currentCmd.beginCmd();
		} catch {
			this.currentCmd.cancelCmd(true);
		}
	}

	subcribeEvents(): void {
		throw new Error("Method not implemented.");
	}
	unsubcribeEvents(): void {
		throw new Error("Method not implemented.");
	}
}
