export interface IEntityAction {
	add(): any;

	modify(): any;

	modifySize(arr: any, pointWorld: any): any;

	modifyPosition(arr: any, pointWorld: any): any;

	remove(): any;

	move(point): any;

	createCloneEntity(): any;

	createOverlayEntity(): any;

	getIndexOverlayPointDown(downPoint: any): any;

	createConnectedLine(pointS: any, pointE: any): any;
}
