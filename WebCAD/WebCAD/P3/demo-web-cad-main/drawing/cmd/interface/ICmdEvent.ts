export interface ICmdEvent {
	onCmdBegin: () => any;

	onCmdCancel: () => any;

	onCmdData: (data: any) => any;

	onCmdEnd: () => any;

	subcribeEvents(): void;

	unsubcribeEvents(): void;
}
