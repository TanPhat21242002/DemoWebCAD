/* eslint-disable @typescript-eslint/no-unused-vars */
import { ACTION_ENTITY, ACTION_MODIFY } from "../../config";
import { ViewerIns } from "../../viewer";
import { EntityCmd } from "../EntityCmd";

export class TextCmd extends EntityCmd {
	private startPoint = null;
	private heightPoint = null;
	private anglePoint = null;
	private indexPoint = 0;

	private inputElement = null;
	private inputFocusInterval = null;

	private firstPoint = null;
	override onMouseDown = (ev: MouseEvent, point: any) => {
		if (this.modeEntity == ACTION_ENTITY.CREATE) {
			this.initForCreate(point);
		} else {
			this.initForModify(point);
		}
	};

	initForCreate(point) {
		if (this.indexPoint == 0 && !this.geometryDataId && !this.geometryData) {
			this.createOverlayEntity();
			this.startPoint = point;
			this.indexPoint = 1;
			this.baseDownPoint = point;

			this.geometryDataId = this.entity.appendText(this.startPoint, "Abc");
			this.geometryData = this.geometryDataId.openAsText();
			this.geometryData.setNormal([0, 0, 1]);
		} else if (this.indexPoint == 1) {
			this.indexPoint = 2;
			this.heightPoint = point;

			const point3d01 = ViewerIns.getIns().createPoint3DFromArray(this.startPoint);
			const point3d02 = ViewerIns.getIns().createPoint3DFromArray(this.heightPoint);
			const distanceTo = point3d01.distanceTo(point3d02);
			this.geometryData.setTextSize(distanceTo);
		} else if (this.indexPoint == 2) {
			this.indexPoint = 3;
			this.anglePoint = point;

			const vector01 = ViewerIns.getIns().createVector3DFromArray(this.startPoint);
			const vector02 = ViewerIns.getIns().createVector3DFromArray(point);
			let vectorAngle01 = vector02.sub(vector01);

			let vectorAngle02 = ViewerIns.getIns().createVector3DFromArray([1, 0, 0]);
			vectorAngle01 = vectorAngle01.normalize();
			vectorAngle02 = vectorAngle02.normalize();
			const dotProduct = vectorAngle01.dotProduct(vectorAngle02);
			const crossProduct = vectorAngle01.crossProduct(vectorAngle02);

			let angle = Math.atan2(crossProduct.length(), dotProduct);
			if (crossProduct.z > 0) {
				angle = Math.PI * 2 - angle;
			}
			this.geometryData.setRotation(angle);
			this.createOrModifyInput();
		}
	}

	createOrModifyInput() {
		if (this.inputElement == null) {
			this.inputElement = document.createElement("span");
			this.inputElement.id = "input-cad-text";
			this.inputElement.setAttribute("contentEditable", true);
			this.inputElement.setAttribute("spellcheck", false);
			this.inputElement.setAttribute("onfocus", "document.execCommand('selectAll',false,null)");
			document.body.appendChild(this.inputElement);

			addEventListener("input", this.inputTextChange);
			this.inputFocusInterval = setInterval(() => {
				this.focusTextInterval(this.inputElement);
			}, 10);

			if (this.modeEntity == ACTION_ENTITY.MODIFY) {
				this.inputElement.innerText = this.geometryData.getString();
			} else {
				this.inputElement.innerText = "Abc";
			}

			const transparencyDef = new (ViewerIns.getIns().visLib.OdTvTransparencyDef)();
			transparencyDef.setValue(0.7);
			this.entity.setTransparency(transparencyDef, ViewerIns.getIns().visLib.GeometryTypes.kAll);

			this.unsubcribeEvents();
			this.subcribeEvents();
		}

		const pointSr01 = ViewerIns.getIns().visViewer.activeView.transformPoints(
			ViewerIns.getIns().visLib.CoordSys.World,
			ViewerIns.getIns().visLib.CoordSys.Screen,
			this.startPoint,
		);
		const pointSr02 = ViewerIns.getIns().visViewer.activeView.transformPoints(
			ViewerIns.getIns().visLib.CoordSys.World,
			ViewerIns.getIns().visLib.CoordSys.Screen,
			this.heightPoint,
		);
		let distanceTo = Math.sqrt(Math.pow(pointSr02[0] - pointSr01[0], 2) + Math.pow(pointSr02[1] - pointSr01[1], 2));
		distanceTo = distanceTo / window.devicePixelRatio;

		// let vector01 = ViewerIns.getIns().createVector3DFromArray(this.startPoint);
		// let vector02 = ViewerIns.getIns().createVector3DFromArray(this.anglePoint);
		// let vectorAngle = vector02.sub(vector01);
		// const angle = vectorAngle.angleTo(ViewerIns.getIns().createVector3DFromArray([1, 0, 0]));

		const screenPoint = ViewerIns.getIns().visViewer.activeView.transformPoints(
			ViewerIns.getIns().visLib.CoordSys.World,
			ViewerIns.getIns().visLib.CoordSys.Screen,
			this.startPoint,
		);
		screenPoint[0] = screenPoint[0] / window.devicePixelRatio;
		screenPoint[1] = screenPoint[1] / window.devicePixelRatio;

		const offSet = distanceTo + (this.inputElement.clientHeight - distanceTo) / 4;
		// this.inputElement.style.cssText = `position: absolute; top: ${screenPoint[1] - offSet }px; left: ${screenPoint[0]}px;
		// width: 200px; background: transparent; transform-origin: bottom left; transform: rotate(${-angle}rad); font-size: ${distanceTo}px;`;
		this.inputElement.style.cssText = `position: absolute; top: ${screenPoint[1] - offSet}px; left: ${screenPoint[0]}px; 
            background: transparent; font-size: ${distanceTo}px; outline: none; display: block; outline: 0;
`;
	}

	focusTextInterval = input => {
		if (document.activeElement == input) {
			this.createOrModifyInput();
			return;
		}
		input.focus();
	};

	inputTextChange = ev => {};

	initForModify(point) {
		if (this.modeModify == ACTION_MODIFY.NONE) {
			const index = this.getIndexOverlayPointDown(point);
			if (index >= 0) {
				const element = this.pointOverlays[index];
				if (element.type == "center") {
					if (this.firstPoint == null) {
						this.firstPoint = point;
						setTimeout(() => {
							this.firstPoint = null;
							if (this.inputElement == null) {
								this.baseDownPoint = element.point;
								this.modeModify = ACTION_MODIFY.MOVE;
							}
						}, 200);
					} else {
						this.baseDownPoint = element.point;
						this.startPoint = this.geometryData.getPosition();
						const height = this.geometryData.getTextSize();
						const tmpPoint = [...this.startPoint];
						tmpPoint[1] = tmpPoint[1] + height;
						this.heightPoint = tmpPoint;
						// const hPoint = ViewerIns.getIns().createPoint3DFromArray(tmpPoint);
						// this.heightPoint = hPoint.rotateByBasePoint(this.geometryData.getRotation(), ViewerIns.getIns().createVector3DFromArray([1, 0, 0]), this.startPoint);
						this.createOrModifyInput();
					}
				} else {
					this.baseDownPoint = element.point;
					const findItem = this.pointOverlays.find(item => {
						return item.type == "min";
					});
					this.baseDownPoint = findItem.point;
					this.modeModify = ACTION_MODIFY.EDIT;
					if (element.type == "min") {
						this.indexPoint = 2;
					} else if (element.type == "max") {
						this.indexPoint = 3;
					}
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

	override modifySize(arr: any): void {
		if (this.modeEntity == ACTION_ENTITY.CREATE) {
			if (this.indexPoint == 1) {
				const point3d01 = ViewerIns.getIns().createPoint3DFromArray(this.startPoint);
				const point3d02 = ViewerIns.getIns().createPoint3DFromArray(arr);
				const distanceTo = point3d01.distanceTo(point3d02);
				this.geometryData.setTextSize(distanceTo);
			} else if (this.indexPoint == 2) {
				const vector01 = ViewerIns.getIns().createVector3DFromArray(this.startPoint);
				const vector02 = ViewerIns.getIns().createVector3DFromArray(arr);
				let vectorAngle01 = vector02.sub(vector01);

				let vectorAngle02 = ViewerIns.getIns().createVector3DFromArray([1, 0, 0]);
				vectorAngle01 = vectorAngle01.normalize();
				vectorAngle02 = vectorAngle02.normalize();
				const dotProduct = vectorAngle01.dotProduct(vectorAngle02);
				const crossProduct = vectorAngle01.crossProduct(vectorAngle02);

				let angle = Math.atan2(crossProduct.length(), dotProduct);
				if (crossProduct.z > 0) {
					angle = Math.PI * 2 - angle;
				}
				this.geometryData.setRotation(angle);

				this.geometryData.setNormal([0, 0, 1]);
				this.geometryData.setRotation(angle);
			}
		} else if (this.modeEntity == ACTION_ENTITY.MODIFY) {
			if (this.indexPoint == 2) {
				const point3d01 = ViewerIns.getIns().createPoint3DFromArray(this.baseDownPoint);
				const point3d02 = ViewerIns.getIns().createPoint3DFromArray(arr);
				const distanceTo = point3d01.distanceTo(point3d02);
				this.geometryData.setTextSize(distanceTo);
			} else if (this.indexPoint == 3) {
				const vector01 = ViewerIns.getIns().createVector3DFromArray(this.baseDownPoint);
				const vector02 = ViewerIns.getIns().createVector3DFromArray(arr);
				let vectorAngle01 = vector02.sub(vector01);

				let vectorAngle02 = ViewerIns.getIns().createVector3DFromArray([1, 0, 0]);
				vectorAngle01 = vectorAngle01.normalize();
				vectorAngle02 = vectorAngle02.normalize();
				const dotProduct = vectorAngle01.dotProduct(vectorAngle02);
				const crossProduct = vectorAngle01.crossProduct(vectorAngle02);

				let angle = Math.atan2(crossProduct.length(), dotProduct);
				if (crossProduct.z > 0) {
					angle = Math.PI * 2 - angle;
				}
				this.geometryData.setRotation(angle);

				this.geometryData.setNormal([0, 0, 1]);
				this.geometryData.setRotation(angle);
			}
		}

		if (this.modeEntity == ACTION_ENTITY.CREATE) {
			if (this.indexPoint == 3) {
				this.createConnectedLine(this.baseDownPoint, this.baseDownPoint);
			} else {
				this.createConnectedLine(this.baseDownPoint, arr);
			}
		} else {
			this.createConnectedLine(this.baseDownPoint, arr);
		}
	}

	override modifyPosition(arr: any): void {
		super.move(arr);

		const vector01 = ViewerIns.getIns().createVector3DFromArray(this.baseDownPoint);
		const vector02 = ViewerIns.getIns().createVector3DFromArray(arr);
		const translateVector = vector02.sub(vector01);

		const point3 = this.geometryData.getPosition();
		let point3d = ViewerIns.getIns().createPoint3DFromArray(point3);
		point3d = point3d.translate(translateVector);
		this.geometryData.setPosition(point3d.toArray());

		if (this.modeEntity == ACTION_ENTITY.MODIFY) {
			this.createConnectedLine(this.baseDownPoint, arr);
		}
	}

	protected geometryDataForType() {
		return this.geometryDataId.openAsText();
	}

	initOverlayData() {
		const arrPoints = [];
		const extents = this.entity.getExtents();
		if (extents.isValidExtents()) {
			arrPoints.push({
				type: "center",
				point: extents.center(),
			});
			arrPoints.push({
				type: "min",
				point: extents.min(),
			});
			arrPoints.push({
				type: "max",
				point: extents.max(),
			});
		}
		super.drawOverlayEntity(arrPoints);
	}

	onKeyPress = (ev: KeyboardEvent, keyCode: number) => {
		if (keyCode == 13) {
			const textValue = document.getElementById("input-cad-text").innerText;
			this.geometryData.setString(textValue);

			const transparencyDef = new (ViewerIns.getIns().visLib.OdTvTransparencyDef)();
			transparencyDef.setValue(0);
			this.entity.setTransparency(transparencyDef, ViewerIns.getIns().visLib.GeometryTypes.kAll);

			this.removeInputText();
			this.endCmd(true);
		} else if (keyCode == 27) {
			this.removeInputText();
			super.endCmd(true);
		}
	};

	removeInputText() {
		if (this.inputFocusInterval) {
			clearInterval(this.inputFocusInterval);
		}
		if (this.inputElement) {
			document.body.removeChild(document.getElementById("input-cad-text"));
		}
	}

	override add(): void {
		this.modeEntity = ACTION_ENTITY.CREATE;
		const model = ViewerIns.getIns().visViewer.getActiveModel();
		this.entityId = model.appendEntity("AcDbText");
		this.entity = this.entityId.openObject();
		this.entity.setColor(255, 255, 255);
	}
}
