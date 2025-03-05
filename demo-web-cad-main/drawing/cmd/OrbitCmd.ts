import { VIEWER_EVENT, ViewerIns } from "../viewer";
import { IBaseCmd } from "./interface/IBaseCmd";
import { ICmdEvent } from "./interface/ICmdEvent";

export class OrbitCmd implements IBaseCmd, ICmdEvent {
	cmdName: string;

	constructor(cmdName: string) {
		this.cmdName = cmdName;
	}

	onCmdData: (data: any) => any;
	onCmdBegin: () => any;
	onCmdCancel: () => any;
	onCmdEnd: () => any;

	subcribeEvents(): void {
		ViewerIns.getIns().subcribeEvent(VIEWER_EVENT.KEY_PRESS, this.onKeyPress);
	}
	unsubcribeEvents(): void {
		ViewerIns.getIns().unsubcribeEvent(VIEWER_EVENT.KEY_PRESS, this.onKeyPress);
	}

	onKeyPress = (ev: KeyboardEvent, keyCode: number) => {
		switch (keyCode) {
			//ESC
			case 27:
				this.cancelCmd(true);
				break;
		}
	};

	beginCmd() {
		ViewerIns.getIns().viewer.setActiveDragger("Orbit");
		this.subcribeEvents();
		if (this.onCmdBegin != null) {
			this.onCmdBegin();
		}
	}

	cancelCmd(alsoFinishCmd: boolean) {
		if (this.onCmdCancel != null) {
			this.onCmdCancel();
		}
		if (alsoFinishCmd) {
			this.endCmd(true);
		}
	}

	endCmd(isFinishCmd: boolean) {
		if (isFinishCmd) {
			this.unsubcribeEvents();
			if (this.onCmdEnd != null) {
				this.onCmdEnd();
			}
			ViewerIns.getIns().viewer.setActiveDragger("");
		}
	}
}
