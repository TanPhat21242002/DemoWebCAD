import { CMD_NAME } from "../config";
import { RectangleCmd } from "./entity/RectangleCmd";
import { EntityCmd } from "./EntityCmd";
import { ICmdEvent } from "./interface/ICmdEvent";
import { SelectCmd } from "./SelectCmd";
import { HatchCmd } from "./entity/HatchCmd";

export class CmdFactory implements ICmdEvent {
	private static instance = null;
	public currentCmd = null;
	public isSelectCmdActive = false;

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

	public createCmd(cmdName: string, entityId?: undefined, geometryDataId?: undefined) {
		if (this.currentCmd != null) {
			return;
		}

		switch (cmdName) {
			case CMD_NAME.OTHER:
				this.currentCmd = new EntityCmd(cmdName, entityId, geometryDataId);
				break;
			case CMD_NAME.RECTANGLE:
				this.currentCmd = new RectangleCmd(cmdName, entityId, geometryDataId);
				break;
			case CMD_NAME.SELECT:
				this.currentCmd = new SelectCmd(cmdName, entityId, geometryDataId);
				this.isSelectCmdActive = true;
				break;
			case CMD_NAME.HATCH:
				this.currentCmd = new HatchCmd(cmdName, entityId, geometryDataId);
				break;
		}

		if (this.currentCmd) {
			this.currentCmd.onCmdBegin = () => {
				this.onCmdBegin?.();
			};

			this.currentCmd.onCmdCancel = () => {
				this.onCmdCancel?.();
			};

			this.currentCmd.onCmdData = data => {
				this.onCmdData?.(data);
			};

			this.currentCmd.onCmdEnd = () => {
				this.currentCmd = null;
				if (cmdName === CMD_NAME.SELECT) {
					this.isSelectCmdActive = false;
				}
				this.onCmdEnd?.();
			};

			try {
				this.currentCmd.beginCmd();
			} catch {
				this.currentCmd.cancelCmd(true);
			}
		}
	}

	subcribeEvents(): void {
		throw new Error("Method not implemented.");
	}
	unsubcribeEvents(): void {
		throw new Error("Method not implemented.");
	}
}
