export interface IEntityEvent {
	//ALWAY REMEMBER USING ARROW FUNCTION IN IMPLEMENT CLASS
	onMouseDown(ev: MouseEvent, pointxy: any, point3d: any): void;

	onMouseMove(ev: MouseEvent, pointOxy: any, pointWorld: any): void;

	onMouseUp(ev: MouseEvent, pointOxy: any, pointWorld: any): void;

	onKeyPress(ev: KeyboardEvent, keyCode: number): void;

	onZoomChanged(ev: any, data: any): void;
}
