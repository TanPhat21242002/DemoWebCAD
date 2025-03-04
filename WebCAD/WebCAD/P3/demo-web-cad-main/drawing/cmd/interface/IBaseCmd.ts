export interface IBaseCmd {
	cmdName: string;

	beginCmd(): any;

	cancelCmd(alsoFinishCmd: boolean): any;

	endCmd(isFinishCmd: boolean): any;
}
