import { ACTION_ENTITY, ACTION_MODIFY, DrawingConfig } from "../../config";
import { DrawingUtil } from "../../util/DrawingUtil";
import { ViewerIns } from "../../viewer";
import { EntityCmd } from "../EntityCmd";

export class CircleCmd extends EntityCmd {
	override onMouseDown = (ev: MouseEvent, point: any) => {
		if (this.modeEntity == ACTION_ENTITY.CREATE) {
			if (!this.geometryDataId && !this.geometryData) {
				this.createOverlayEntity();
				this.geometryDataId = this.entity.appendCircleWithNormal(point, 0, [0, 0, 1]);
				this.geometryData = this.geometryDataId.openAsCircle();
			} else {
				this.modifySize(point);
				this.endCmd(true);
			}
		} else if (this.modeEntity == ACTION_ENTITY.MODIFY) {
			if (this.modeModify == ACTION_MODIFY.NONE) {
				const index = this.getIndexOverlayPointDown(point);
				if (index >= 0) {
					const element = this.pointOverlays[index];
					this.baseDownPoint = element.point;
					if (element.type == "center") {
						this.modeModify = ACTION_MODIFY.MOVE;
					} else {
						this.modeModify = ACTION_MODIFY.EDIT;
					}
				}
			} else if (this.modeModify == ACTION_MODIFY.MOVE) {
				this.modifyPosition(point);
				this.endCmd(false);
			} else if (this.modeModify == ACTION_MODIFY.EDIT) {
				this.modifySize(point);
				this.endCmd(false);
			}
		}
	};

	override modifySize(arr: any) {
		const center3d = ViewerIns.getIns().createPoint3DFromArray(this.geometryData.getCenter());
		const point3d = ViewerIns.getIns().createPoint3DFromArray(arr);
		const cicleRadius = center3d.distanceTo(point3d);
		this.geometryData.setRadius(cicleRadius);

		this.createConnectedLine(this.geometryData.getCenter(), arr);
	}

	override modifyPosition(arr: any) {
		this.geometryData.setCenter(arr);

		if (this.modeEntity == ACTION_ENTITY.MODIFY) {
			this.createConnectedLine(this.baseDownPoint, arr);
		}
	}

	protected geometryDataForType() {
		return this.geometryDataId.openAsCircle();
	}

	protected initOverlayData() {
		const arrPoints = DrawingUtil.getAllPointCloudCircle(this.geometryData);
		super.drawOverlayEntity(arrPoints);
	}

	override add(): void {
		this.modeEntity = ACTION_ENTITY.CREATE;
		const model = ViewerIns.getIns().visViewer.getActiveModel();
		this.entityId = model.appendEntity("AcDbCircle");
		this.entity = this.entityId.openObject();
		this.entity.setColor(255, 255, 255);
	}
}
