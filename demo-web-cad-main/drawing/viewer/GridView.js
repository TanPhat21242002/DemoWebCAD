/* eslint-disable @typescript-eslint/no-unused-vars */
import { DrawingConfig, ENTITY_NAME } from "../config";
import { CADSetting } from "../setting";
import { ViewerIns } from "../viewer";

export class GridView {
	modelGrid = null;
	canvas = null;

	entityGridId = null;
	entityGrid = null;
	geometryGridDataId = null;

	entityPointId = null;
	entityPoint = null;

	pointId = null;
	canSnap = false;
	haveSnap = false;
	snapX = 0;
	snapY = 0;
	snapZ = 0;

	lineNum = 1000;
	lineUnit = 10;

	constructor(canvas) {
		this.modelGrid = ViewerIns.getIns().visViewer.getOverlayModel();
		this.canvas = canvas;
	}

	updateGridView() {
		if (!CADSetting.getIns().isShowGrid()) {
			return;
		}

		if (this.geometryGridDataId == null) {
			return;
		}

		try {
			const xx = this.canvas.width * window.devicePixelRatio;
			const yy = this.canvas.height * window.devicePixelRatio;
			const ev = {
				offsetX: 0,
				offsetY: 0,
			};

			const point01 = ViewerIns.getIns().pointOnOxyPlane(ev);
			ev.offsetX = xx;
			ev.offsetY = 0;
			const point02 = ViewerIns.getIns().pointOnOxyPlane(ev);
			ev.offsetX = xx;
			ev.offsetY = yy;
			const point03 = ViewerIns.getIns().pointOnOxyPlane(ev);
			ev.offsetX = 0;
			ev.offsetY = yy;
			const point04 = ViewerIns.getIns().pointOnOxyPlane(ev);
			ev.offsetX = xx / 2;
			ev.offsetY = yy / 2;
			const center = ViewerIns.getIns().pointOnOxyPlane(ev);

			let unitx = Math.max(point01[0] - center[0], point02[0] - center[0], point03[0] - center[0], point04[0] - center[0]);
			let unity = Math.max(point01[1] - center[1], point02[1] - center[1], point03[1] - center[1], point04[1] - center[1]);
			const viewSize = Math.round(Math.max(unitx, unity)) * 2;
			let index = DrawingConfig.LINE_UNIT_ARR.findIndex(item => viewSize / item < 50);
			if (index < 0) {
				index = DrawingConfig.LINE_UNIT_ARR.length - 1;
			}

			this.lineUnit = DrawingConfig.LINE_UNIT_ARR[index] / 5;
			this.lineNum = Math.round(viewSize / this.lineUnit);
			if (!this.lineNum || !this.lineUnit) {
				return;
			}
			if (this.lineNum > DrawingConfig.MAX_LINE_NUM) {
				this.lineNum = DrawingConfig.MAX_LINE_NUM;
			}

			center[0] = center[0] - viewSize / 2;
			center[1] = center[1] - viewSize / 2;
			center[0] = Math.round(center[0] / this.lineUnit) * this.lineUnit;
			center[1] = Math.round(center[1] / this.lineUnit) * this.lineUnit;

			const gridData = this.geometryGridDataId.openAsGrid();
			gridData.set(
				center,
				[center[0] + this.lineUnit, center[1], center[2]],
				[center[0], center[1] + this.lineUnit, center[2]],
				this.lineNum,
				this.lineNum,
				0,
			);
		} catch (error) {
			console.log(error);
		}
	}

	removeGridView() {
		if (!CADSetting.getIns().isShowGrid()) {
			return;
		}

		this.modelGrid = ViewerIns.getIns().visViewer.getOverlayModel();
		try {
			if (this.entityGridId != null) {
				this.modelGrid.removeEntity(this.entityGridId);
			}
			// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
		} catch (error) {}
		try {
			if (this.entityPointId != null) {
				this.modelGrid.removeEntity(this.entityPointId);
			}
			// eslint-disable-next-line no-empty
		} catch (error) {}

		this.entityGridId = null;
		this.entityPointId = null;
		this.geometryGridDataId = null;
	}

	enableCanSnap(isSnap) {
		this.canSnap = isSnap;
	}

	createGridView() {
		if (!CADSetting.getIns().isShowGrid()) {
			return;
		}

		if (this.entityGridId != null && this.entityPointId != null) {
			return;
		}

		this.modelGrid = ViewerIns.getIns().visViewer.getOverlayModel();

		this.entityGridId = this.modelGrid.appendEntity(ENTITY_NAME.OVERLAY_ENTITY);
		this.entityGrid = this.entityGridId.openObject();
		this.entityGrid.setColor(180, 180, 180);
		this.geometryGridDataId = this.entityGrid.appendGrid([0, 0, 0], [this.lineUnit, 0, 0], [0, this.lineUnit, 0], this.lineNum * 5, this.lineNum * 5, 0);

		const bigGridEntityId = this.modelGrid.appendEntity(ENTITY_NAME.OVERLAY_ENTITY);
		const bigGrid = bigGridEntityId.openObject();
		bigGrid.setColor(100, 100, 100);
		bigGrid.setLineWeight(2);

		bigGrid.appendGrid([0, 0, 0], [this.lineUnit * 5, 0, 0], [0, this.lineUnit * 5, 0], this.lineNum, this.lineNum, 0);

		var transparencyDef = new (ViewerIns.getIns().visLib.OdTvTransparencyDef)();
		transparencyDef.setValue(0.8);
		this.entityGrid.setTransparency(transparencyDef, ViewerIns.getIns().visLib.GeometryTypes.kAll);

		this.entityPointId = this.modelGrid.appendEntity(ENTITY_NAME.OVERLAY_ENTITY);
		this.entityPoint = this.entityPointId.openObject();
		this.entityPoint.setColor(125, 255, 0);

		let selectDef = new (ViewerIns.getIns().visLib.OdTvSelectabilityDef)();
		selectDef.setEdges(false);
		this.entityGrid.setSelectability(selectDef);
	}

	onMouseDown() {
		this.deleteSnapPoint();
	}

	onMouseUp() {
		this.deleteSnapPoint();
	}

	deleteSnapPoint() {
		try {
			if (this.pointId != null) {
				this.entityPoint.removeGeometryData(this.pointId);
				this.pointId = null;
			}
			// eslint-disable-next-line no-empty
		} catch (error) {}
	}

	onMouseMove(ev, point) {
		try {
			this.haveSnap = false;
			if (this.canSnap == false) {
				return;
			}

			if (!CADSetting.getIns().isGridSnap() && !CADSetting.getIns().isObjectSnap()) {
				return;
			}

			if (this.entityPointId == null) {
				this.entityPointId = this.modelGrid.appendEntity(ENTITY_NAME.OVERLAY_ENTITY);
				this.entityPoint = this.entityPointId.openObject();
				this.entityPoint.setColor(125, 255, 0);
			}

			if (CADSetting.getIns().isShowGrid() && CADSetting.getIns().isGridSnap()) {
				let wX = point[0];
				let wY = point[1];
				let wZ = point[2];
				if (
					Math.abs(wX - this.lineUnit * Math.round(wX / this.lineUnit)) <= this.lineUnit / 10 &&
					Math.abs(wY - this.lineUnit * Math.round(wY / this.lineUnit)) <= this.lineUnit / 10
				) {
					wX = this.lineUnit * Math.round(wX / this.lineUnit);
					wY = this.lineUnit * Math.round(wY / this.lineUnit);
					wZ = Math.round(wZ);

					if (this.pointId == null) {
						this.pointId = this.entityPoint.appendPointCloud([wX, wY, wZ]);

						let pointTmp = this.pointId.openAsPointCloud();
						pointTmp.setPointSize(10);
						pointTmp.delete();
					} else {
						let pointTmp = this.pointId.openAsPointCloud();
						pointTmp.setParam([wX, wY, 0]);
					}
					this.haveSnap = true;
					this.snapX = wX;
					this.snapY = wY;
					this.snapZ = wZ;
				} else {
					this.deleteSnapPoint();
					this.haveSnap = false;
					this.snapX = 0;
					this.snapY = 0;
					this.snapZ = 0;
				}
			}

			if (this.haveSnap) {
				return;
			}

			if (CADSetting.getIns().isObjectSnap() && ViewerIns.getIns().checkEmptySelection()) {
				const x = ev.offsetX * window.devicePixelRatio;
				const y = ev.offsetY * window.devicePixelRatio;
				let pointArr = ViewerIns.getIns().visViewer.getSnapPoint(x, y, 5);
				if (pointArr != null) {
					if (this.pointId == null) {
						this.pointId = this.entityPoint.appendPointCloud([pointArr[0], pointArr[1], pointArr[2]]);

						let pointTmp = this.pointId.openAsPointCloud();
						pointTmp.setPointSize(10);
						pointTmp.delete();
					} else {
						let pointTmp = this.pointId.openAsPointCloud();
						pointTmp.setParam([pointArr[0], pointArr[1], pointArr[2]]);
					}
					this.haveSnap = true;
					this.snapX = pointArr[0];
					this.snapY = pointArr[1];
					this.snapZ = pointArr[2];
				} else {
					this.deleteSnapPoint();
					this.haveSnap = false;
					this.snapX = 0;
					this.snapY = 0;
					this.snapZ = 0;
				}
			}
			// eslint-disable-next-line no-empty
		} catch (error) {}
	}

	haveSnapPoint() {
		return this.haveSnap;
	}

	getSnapPoint() {
		return [this.snapX, this.snapY, this.snapZ];
	}
}
