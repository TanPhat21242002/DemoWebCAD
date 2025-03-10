/* eslint-disable no-empty */
import { ViewerIns } from "../viewer";

export class DrawingUtil {
	public static getAllPointCloudCircle(geometryData) {
		const arr = [];
		const point3Center = geometryData.getCenter();
		const radius = geometryData.getRadius();
		const points = [];
		points.push([point3Center[0] - radius, point3Center[1], point3Center[2]]);
		points.push([point3Center[0] + radius, point3Center[1], point3Center[2]]);
		points.push([point3Center[0], point3Center[1] + radius, point3Center[2]]);
		points.push([point3Center[0], point3Center[1] - radius, point3Center[2]]);

		arr.push({
			type: "center",
			point: point3Center,
		});

		for (let i = 0; i < 4; i++) {
			arr.push({
				type: "point0" + (i + 1),
				point: points[i],
			});
		}
		return arr;
	}

	public static getCenterOfTwoPoint(point1, point2) {
		const x = point1[0] + point2[0];
		const y = point1[1] + point2[1];
		const z = point1[2] + point2[2];
		return [x / 2, y / 2, z / 2];
	}

	public static getAllPointCloudRec(geometryData) {
		const arr = [];
		const rectangleData = geometryData.getPoints();
		const center = this.getCenterOfTwoPoint(rectangleData[0], rectangleData[2]);
		const mid = [];
		mid.push(this.getCenterOfTwoPoint(rectangleData[0], rectangleData[1]));
		mid.push(this.getCenterOfTwoPoint(rectangleData[1], rectangleData[2]));
		mid.push(this.getCenterOfTwoPoint(rectangleData[2], rectangleData[3]));
		mid.push(this.getCenterOfTwoPoint(rectangleData[3], rectangleData[0]));

		arr.push({
			type: "center",
			point: center,
		});

		for (let i = 0; i < 4; i++) {
			arr.push({
				type: "point0" + (i + 1),
				point: rectangleData[i],
			});
		}

		for (let i = 0; i < 4; i++) {
			arr.push({
				type: "mid0" + (i + 1),
				point: mid[i],
			});
		}

		return arr;
	}

	public static getCenterPointCloudEntity(entity) {
		const extents = entity.getExtents();
		if (extents.isValidExtents()) {
			return [
				{
					type: "center",
					point: extents.center(),
				},
			];
		}
		return [];
	}

	public static getSquareFromCenter(point, size) {
		return [
			point[0] - size,
			point[1] + size,
			point[2],
			point[0] + size,
			point[1] + size,
			point[2],
			point[0] + size,
			point[1] - size,
			point[2],
			point[0] - size,
			point[1] - size,
			point[2],
		];
	}

	public static getAllPointCloudPolyline(polyline) {
		const arr = [];
		const points = polyline.getPoints();

		for (let i = 0; i < points.length; i++) {
			arr.push({
				type: "point0" + (i + 1),
				point: points[i],
			});
		}

		const mid = [];
		for (let i = 0; i < points.length - 1; i++) {
			mid.push(this.getCenterOfTwoPoint(points[i], points[i + 1]));
		}

		for (let i = 0; i < mid.length; i++) {
			arr.push({
				type: "mid0" + (i + 1),
				point: mid[i],
			});
		}

		return arr;
	}

	public static getAllPointCloudCicleArc(geometryData) {
		const arr = [];
		const start = geometryData.getStart();
		const middle = geometryData.getMiddle();
		const end = geometryData.getEnd();

		arr.push({
			type: "start",
			point: start,
		});

		arr.push({
			type: "middle",
			point: middle,
		});

		arr.push({
			type: "end",
			point: end,
		});

		return arr;
	}

	public static getAllPointCloudBox(geometryData) {
		const arr = [];
		const center = geometryData.getCenterPoint();
		center[2] = 0;

		arr.push({
			type: "center",
			point: center,
		});

		return arr;
	}

	public static getAllPointCloudEllipse(geometryData) {
		const arr = [];
		const point3Center = geometryData.getCenter();
		const point3Major01 = geometryData.getMajor();
		const point3Minor01 = geometryData.getMinor();
		const point3Major02 = [2 * point3Center[0] - point3Major01[0], 2 * point3Center[1] - point3Major01[1], 2 * point3Center[2] - point3Major01[2]];
		const point3Minor02 = [2 * point3Center[0] - point3Minor01[0], 2 * point3Center[1] - point3Minor01[1], 2 * point3Center[2] - point3Minor01[2]];

		// let points = [];
		// points.push([point3Center[0] - radius, point3Center[1], point3Center[2]]);
		// points.push([point3Center[0] + radius, point3Center[1], point3Center[2]]);
		// points.push([point3Center[0], point3Center[1] + radius, point3Center[2]]);
		// points.push([point3Center[0], point3Center[1] - radius, point3Center[2]]);

		arr.push({
			type: "center",
			point: point3Center,
		});

		arr.push({
			type: "major01",
			point: point3Major01,
		});
		arr.push({
			type: "major02",
			point: point3Major02,
		});

		arr.push({
			type: "minor01",
			point: point3Minor01,
		});

		arr.push({
			type: "minor01",
			point: point3Minor02,
		});
		return arr;
	}

	public static compareTwoPoints(point01, point02) {
		const point3d01 = ViewerIns.getIns().createPoint3DFromArray(point01);
		const point3d02 = ViewerIns.getIns().createPoint3DFromArray(point02);
		const distanceTo = point3d01.distanceTo(point3d02);
		return distanceTo < 0.2;
	}

	public static checkPointInPolygonData(point, polygonData) {
		const x = point[0],
			y = point[1];
		let inside = false;

		for (let i = 0, j = polygonData.length - 1; i < polygonData.length; j = i++) {
			const xi = polygonData[i][0],
				yi = polygonData[i][1];
			const xj = polygonData[j][0],
				yj = polygonData[j][1];

			const intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
			if (intersect) {
				inside = !inside;
			}
		}

		return inside;
	}

	public static getPropertiesOfSelectionSet(selectionSet) {
		let properties: any = {};
		if (selectionSet == null) {
			return properties;
		}

		const interators = selectionSet.getIterator();
		for (; !interators.done(); interators.step()) {
			try {
				let name, handle, extents, transparency, lineType, lineTypeScale, layer, lineWeight, color, material;
				const entityId = interators.getEntity();
				if (entityId.getType() == 2) {
					const entity = entityId.openObjectAsInsert();
					const block = entityId.openObjectAsInsert().getBlock().openObject();
					handle = entity.getHandle();
					name = block.getName();
					extents = block.getExtents(ViewerIns.getIns().visLib.ExtentsType.kGeom);
					transparency = "";
					lineType = "";
					lineTypeScale = "";
					layer = "UNDENTIFIED";
					lineWeight = "";
					color = entity.getColor().getColor() + "";
					material = "UNDENTIFIED";
				} else {
					const entity = entityId.openObject();
					handle = entity.getDatabaseHandle();
					name = entity.getName();
					extents = entity.getExtents();
					transparency = entity.getTransparency(ViewerIns.getIns().visLib.GeometryTypes.kAll).getValue() + "";
					//  lineType = entity.getLinetype(ViewerIns.getIns().visLib.GeometryTypes.kAll).getLinetype().openObject().getName();
					lineType = entity.getLinetype(ViewerIns.getIns().visLib.GeometryTypes.kAll).getType();
					lineTypeScale = entity.getLinetypeScale(ViewerIns.getIns().visLib.GeometryTypes.kAll) + "";
					// const layer = entity.getLayer().openObject().getName();
					layer = "UNDENTIFIED";
					lineWeight = entity.getLineWeight(ViewerIns.getIns().visLib.GeometryTypes.kAll).getValue() + "";
					color = entity.getColor(ViewerIns.getIns().visLib.GeometryTypes.kAll).getColor() + "";
					// const material = entity.getMaterial().getMaterial().openObject().getName() + "";
					// const material = entity.getMaterial().getMaterial().openObject().getName() + "";
					material = "UNDENTIFIED";
				}

				if (Object.keys(properties).length === 0) {
					properties = {
						dbHandle: {
							name: "Handle",
							value: handle + "",
						},
						name: {
							name: "Name",
							value: name + "",
						},
						X: {
							name: "X",
							value: extents.center()[0] + "",
						},
						Y: {
							name: "Y",
							value: extents.center()[1] + "",
						},
						Z: {
							name: "Z",
							value: extents.center()[2] + "",
						},
						transparency: {
							name: "Transparency",
							value: transparency + "",
						},
						lineType: {
							name: "Line Type",
							value: lineType + "",
						},
						lineTypeScale: {
							name: "Line Type Scale",
							value: lineTypeScale + "",
						},
						layer: {
							name: "Layer",
							value: layer + "",
						},
						lineWeight: {
							name: "Line Weight",
							value: lineWeight + "",
						},
						color: {
							name: "Color",
							value: color + "",
						},
						material: {
							name: "Material",
							value: material + "",
						},
					};
				} else {
					if (properties.dbHandle?.value !== handle + "") {
						delete properties.dbHandle;
					}
					if (properties.name?.value !== name + "") {
						delete properties.name;
					}
					if (properties.X?.value !== extents.center()[0] + "") {
						delete properties.X;
						delete properties.Y;
						delete properties.Z;
					}
					if (properties.Y?.value !== extents.center()[1] + "") {
						delete properties.X;
						delete properties.Y;
						delete properties.Z;
					}
					if (properties.Z?.value !== extents.center()[2] + "") {
						delete properties.X;
						delete properties.Y;
						delete properties.Z;
					}
					if (properties.transparency?.value !== transparency + "") {
						delete properties.transparency;
					}
					if (properties.lineType?.value !== lineType + "") {
						delete properties.lineType;
					}
					if (properties.lineTypeScale?.value !== lineTypeScale + "") {
						delete properties.lineTypeScale;
					}
					if (properties.lineWeight?.value !== lineWeight + "") {
						delete properties.lineWeight;
					}
					if (properties.color?.value !== color + "") {
						delete properties.color;
					}
					if (properties.material?.value !== material + "") {
						delete properties.material;
					}
				}
			} catch {}
		}
		return properties;
	}
}
