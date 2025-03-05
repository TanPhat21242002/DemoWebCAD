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

			this.lineUnit = DrawingConfig.LINE_UNIT_ARR[index];
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
		} catch (error) {}
		try {
			if (this.entityPointId != null) {
				this.modelGrid.removeEntity(this.entityPointId);
			}
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
		this.entityGrid.setColor(120, 120, 120);
		this.geometryGridDataId = this.entityGrid.appendGrid([0, 0, 0], [this.lineUnit, 0, 0], [0, this.lineUnit, 0], this.lineNum, this.lineNum, 0);
		this.updateGridView();

		var transparencyDef = new (ViewerIns.getIns().visLib.OdTvTransparencyDef)();
		transparencyDef.setValue(0.8);
		this.entityGrid.setTransparency(transparencyDef, ViewerIns.getIns().visLib.GeometryTypes.kAll);

		this.entityPointId = this.modelGrid.appendEntity(ENTITY_NAME.OVERLAY_ENTITY);
		this.entityPoint = this.entityPointId.openObject();
		this.entityPoint.setColor(125, 255, 0);

		let pointCenterId = this.entityGrid.appendPointCloud([0, 0, 0]);
		let pointCenterTmp = pointCenterId.openAsPointCloud();
		pointCenterTmp.setPointSize(10);
		pointCenterTmp.delete();
		const pointCCCC = pointCenterId.openObject();
		let color = new (ViewerIns.getIns().visLib.OdTvColorDef)(255, 0, 0);
		pointCCCC.setColor(color, ViewerIns.getIns().visLib.GeometryTypes.kAll);
		var transparencyDefc = new (ViewerIns.getIns().visLib.OdTvTransparencyDef)();
		transparencyDefc.setValue(0.2);
		pointCCCC.setTransparency(transparencyDefc);

		let selectDef = new (ViewerIns.getIns().visLib.OdTvSelectabilityDef)();
		selectDef.setEdges(false);
		this.entityGrid.setSelectability(selectDef);
	}

	onMouseDown(ev, point) {
		this.deleteSnapPoint();
	}

	onMouseUp(ev, point) {
		this.deleteSnapPoint();
	}

	deleteSnapPoint() {
		try {
			if (this.pointId != null) {
				this.entityPoint.removeGeometryData(this.pointId);
				this.pointId = null;
			}
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
		} catch (error) {}
	}

	haveSnapPoint() {
		return this.haveSnap;
	}

	getSnapPoint() {
		return [this.snapX, this.snapY, this.snapZ];
	}
}
