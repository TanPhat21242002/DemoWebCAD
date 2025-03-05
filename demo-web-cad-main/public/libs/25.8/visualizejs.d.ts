///////////////////////////////////////////////////////////////////////////////
// Copyright (C) 2002-2022, Open Design Alliance (the "Alliance").
// All rights reserved.
//
// This software and its documentation and related materials are owned by
// the Alliance. The software may only be incorporated into application
// programs owned by members of the Alliance, subject to a signed
// Membership Agreement and Supplemental Software License Agreement with the
// Alliance. The structure and organization of this software are the valuable
// trade secrets of the Alliance and its suppliers. The software is also
// protected by copyright law and international treaty provisions. Application
// programs incorporating this software must include the following statement
// with their copyright notices:
//
//   This application incorporates Open Design Alliance software pursuant to a
//   license agreement with Open Design Alliance.
//   Open Design Alliance Copyright (C) 2002-2022 by Open Design Alliance.
//   All rights reserved.
//
// By use of this software, its documentation or related materials, you
// acknowledge and accept the above terms.
///////////////////////////////////////////////////////////////////////////////

declare namespace VisualizeJS {
	type OdTvScale = [sx: number, sy: number, sz: number];

	type Point2 = [x: number, y: number];

	type Point3 = [x: number, y: number, z: number];

	type Vector2 = [x: number, y: number];

	type Vector3 = [x: number, y: number, z: number];

	type OdGsDCPoint = [x: number, y: number];

	type Rect = [xmin: number, ymin: number, xmax: number, ymax: number];

	/**
	 * This structure defines request record fields.
	 **/
	class RequestRecord {
		begin: string;
		end: string;
		delete(): void;
	}

	/**
	 * This class represents points (locations) in 3D space.
	 **/
	class Point3d {
		static createFromArray(p: Point3): Point3d;
		static kOrigin: Point3;
		constructor();
		x: number;
		y: number;
		z: number;
		/**
		 * Sets this point to the product of xfm * point, and returns a reference to this point.
		 **/
		setToProduct(m: Matrix3d, p: Point3d): Point3d;
		/**
		 * Sets this point to the result of the matrix multiplication of xfm * this point.
		 **/
		transformBy(m: Matrix3d): Point3d;
		/**
		 * Sets this point to point + vect, and returns a reference to this point.
		 **/
		setToSum(p: Point3d, v: Vector3d): Point3d;
		/**
		 * Returns the distance from this point to the specified point.
		 **/
		distanceTo(p: Point3d): number;
		/**
		 * Returns this point as a vector.
		 **/
		asVector(): Vector3d;
		/**
		 * Rotates this point about the specified basePoint and axis of rotation by the specified angle.
		 **/
		rotateBy(angle: number, vect: Vector3d): Point3d;
		rotateByBasePoint(angle: number, vect: Vector3d, basePoint: Point3d): Point3d;
		/**
		 * Scales this point by the scale factor about the basepoint.
		 **/
		scaleBy(factor: number, basePoint: Point3d): Point3d;
		/**
		 * Sets the parameters for this point according to the arguments
		 **/
		set(x: number, y: number, z: number): Point3d;
		add(v: Point3d): Point3d;
		sub(v: Point3d): Point3d;
		translate(v: Vector3d): Point3d;
		toArray(): any;
		delete(): void;
	}

	/**
	 * This class represents vectors in 3D space.
	 **/
	class Vector3d {
		static createFromArray(vector: Vector3): Vector3d;
		static kIdentity: Vector3;
		static kXAxis: Vector3;
		static kYAxis: Vector3;
		static kZAxis: Vector3;
		constructor();
		x: number;
		y: number;
		z: number;
		/**
		 * Sets this vector to vector1 + vector1, and returns a reference to this vector.
		 **/
		setToSum(v1: Vector3d, v2: Vector3d): Vector3d;
		/**
		 * Mirrors the entity about the plane passing through the
		 **/
		mirror(): Vector3d;
		/**
		 * Mirrors the entity about the plane passing through the
		 **/
		mirror(normalToPlane: Vector3d): Vector3d;
		/**
		 * Negates this vector (-x, -y, -z), and returns a reference to this vector.
		 **/
		negate(): Vector3d;
		/**
		 * Sets the length of this vector.
		 **/
		setLength(length: number): void;
		/**
		 * Returns the length of this vector.
		 **/
		length(): number;
		/**
		 * Returns the square of the length of this vector.
		 **/
		lengthSqrd(): number;
		/**
		 * Rotates this vector the specified angle
		 **/
		rotateBy(angle: number, vect: Vector3d): Vector3d;
		/**
		 * Applies the 3D transformation matrix to this vector.
		 **/
		transformBy(m: Matrix3d): Vector3d;
		/**
		 * Returns the dot product of this vector and the specified vector.
		 **/
		dotProduct(v: Vector3d): number;
		/**
		 * Returns the cross product of this vector and the specified vector.
		 **/
		crossProduct(v: Vector3d): Vector3d;
		/**
		 * Sets this vector to the specified arguments,
		 **/
		set(x: number, y: number, z: number): Vector3d;
		/**
		 * Returns this vector as a point.
		 **/
		asPoint(): Point3d;
		/**
		 * Sets this vector to the product matrix * vect and returns
		 **/
		setToProduct(v: Vector3d, scale: number): Vector3d;
		add(v: Vector3d): Vector3d;
		sub(v: Vector3d): Vector3d;
		/**
		 * Returns the unit vector codirectional with this vector.
		 **/
		normal(): Vector3d;
		/**
		 * Returns the angle to the specified vector.
		 **/
		angleTo(v: Vector3d): number;
		/**
		 * Returns the angle to the specified vector.
		 **/
		angleToWithRef(v: Vector3d, ref: Vector3d): number;
		/**
		 * Sets this vector to the unit vector codirectional with this vector,
		 **/
		normalize(): Vector3d;
		/**
		 * Returns true if and only if vect is identical to this vector,
		 **/
		isEqualTo(v: Vector3d): boolean;
		toArray(): any;
		delete(): void;
	}

	class OdTvExtendedView {
		roll(rollAngle: number): any;
		rollWithCenter(rollAngle: number, center: Point3): any;
		orbit(xOrbit: number, yOrbit: number): any;
		orbitWithCenter(xOrbit: number, yOrbit: number, center: Point3): any;
		zoomIn(): any;
		zoomOut(): any;
		setAnimationEnabled(enable: boolean): any;
		setAnimationDuration(duration: number): any;
		getAnimationEnabled(): any;
		getAnimationDuration(): any;
		resetAnimation(): any;
		setZoomScale(zoomScale: number): any;
		setView(position: Point3, target: Point3, upVector: Vector3, fieldWidth: number, fieldHeight: number, isPerspective: boolean): any;
		delete(): void;
	}

	/**
	 * This class represents infinite planes in 3D space.
	 **/
	class OdTvPlane {
		static kXYPlane: OdTvPlane;
		/**
		 * Default constructor for the OdGePlane class. Constructs an infinite plane coincident with the XY plane.
		 **/
		constructor();
		/**
		 * Sets the parameters for this plane according to the arguments.
		 **/
		set(point: Point3, normal: Vector3): OdTvPlane;
		/**
		 * Sets the parameters for this plane according to the arguments.
		 **/
		set3ptr(uPnt: Point3, origin: Point3, vPnt: Point3): OdTvPlane;
		/**
		 * Sets the parameters for this plane according to the arguments.
		 **/
		set4double(a: number, b: number, c: number, d: number): OdTvPlane;
		/**
		 * Sets the parameters for this plane according to the arguments.
		 **/
		setUV(origin: Point3, uAxis: Point3, vAxis: Point3): OdTvPlane;
		normal(): any;
		getOrigin(): Point3;
		getUAxis(): Point3;
		getVAxis(): Point3;
		delete(): void;
	}

	/**
	 * This class represents 3D bounding boxes as minimum and maximum 3d points.
	 **/
	class Extents3d {
		/**
		 * Default constructor for the OdGeExtents3d class.
		 **/
		constructor();
		/**
		 * Returns the minimum point of this OdGeExtents3d object.
		 **/
		min(): Point3;
		/**
		 * Returns the maximum point of this OdGeExtents3d object.
		 **/
		max(): Point3;
		/**
		 * Returns a center point of this OdGeExtents3d object.
		 **/
		center(): Point3;
		/**
		 * Sets the minimum and maximum points for this OdGeExtents3d object to
		 **/
		comparingSet(pt1: Point3, pt2: Point3): void;
		/**
		 * Sets the minimum and maximum points for this OdGeExtents3d object.
		 **/
		set(min: Point3, max: Point3): void;
		/**
		 * Updates the extents of this OdGeExtents3d object with the specified point.
		 **/
		addPoint(point: Point3): Extents3d;
		/**
		 * Updates the extents of this OdGeExtents3d object with the specified array of points.
		 **/
		addExt(extents: Extents3d): Extents3d;
		/**
		 * Checks whether this OdGeExtents3d object contains valid extents.
		 **/
		isValidExtents(): boolean;
		/**
		 * Applies the 3D transformation matrix to the extents.
		 **/
		transformBy(xfm: Matrix3d): void;
		/**
		 * Updates the extents of this OdGeExtents3d object by the specified vector.
		 **/
		expandBy(vect: Vector3): void;
		delete(): void;
	}

	class DeviceInteractivityOptions {
		/**
		 * Empty constructor for interactivity options.
		 **/
		constructor();
		/**
		 * Empty constructor for interactivity options.
		 **/
		constructor(arg0: number, arg1: number);
		/**
		 * Sets a new value of the flag, which determines whether it is need to disable materials in interactivity mode.
		 **/
		setDisableMaterials(bValue: boolean): void;
		/**
		 * Sets a new value of the flag, which determines whether it is need to disable visual style overrides in interactivity mode.
		 **/
		setDisableVisualStyleOverrides(bValue: boolean): void;
		/**
		 * Sets a new value of the flag, which determines whether it is need to disable fill patterns in interactivity mode.
		 **/
		setDisableFillPatterns(bValue: boolean): void;
		/**
		 * Sets a new value for the frame rate.
		 **/
		setFFRFpsValue(frameRateInHz: number): void;
		/**
		 * Retrieves the current value of the flag, which determines whether it is need to disable materials in interactivity mode.
		 **/
		getDisableMaterials(): boolean;
		/**
		 * Retrieves the current value of the flag, which determines whether it is need to disable visual style overrides in interactivity mode.
		 **/
		getDisableVisualStyleOverrides(): boolean;
		/**
		 * Retrieves the current value of the flag, which determines whether it is need to disable fill patterns in interactivity mode.
		 **/
		getDisableFillPatterns(): boolean;
		/**
		 * Retrieves the current value of the frame rate.
		 **/
		getFFRFpsValue(): number;
		/**
		 * Check if objects are equal.
		 **/
		isEqual(options: DeviceInteractivityOptions): boolean;
		delete(): void;
	}

	/**
	 * The base interface class for working with Visualize SDK mapper definition objects.
	 **/
	class OdTvMapperDef {
		/**
		 * Creates a new mapper definition object with default parameters.
		 **/
		constructor();
		/**
		 * Retrieves the current type of the automatic transformation for the mapper definition object.
		 **/
		autoTransform(): AutoTransform;
		/**
		 * Retrieves the current type of the mapper definition object.
		 **/
		getType(): MapperType;
		/**
		 * Retrieves the current projection type of the mapper definition object.
		 **/
		projection(): Projection;
		/**
		 * Sets new rotation angles for the mapper definition object.
		 **/
		rotate(x: number, y: number, z: number): void;
		/**
		 * Sets new scale factors for the mapper definition object.
		 **/
		scale(x: number, y: number, z: number): void;
		/**
		 * Sets a new automatic transformation type for the mapper definition object.
		 **/
		setAutoTransform(autoTransform: AutoTransform): void;
		/**
		 * Sets the mapper object as the default.
		 **/
		setDefault(): void;
		/**
		 * Sets a new projection type for the mapper definition object.
		 **/
		setProjection(projection: Projection): void;
		/**
		 * Applies a new transformation matrix for the mapper definition object.
		 **/
		setTransform(tm: Matrix3d): void;
		/**
		 * Retrieves the current transformation matrix for the mapper definition object.
		 **/
		transform(): Matrix3d;
		/**
		 * Sets new translation parameters for the mapper definition object.
		 **/
		translate(x: number, y: number, z: number): void;
		delete(): void;
	}

	/**
	 * The base interface class for working with Visualize SDK hatch pattern line definition objects.
	 **/
	class OdTvHatchPatternLineDef {
		/**
		 * Creates a new hatch pattern line definition object with default parameters.
		 **/
		constructor();
		/**
		 * Retrieves the current line angle of the hatch pattern line definition object.
		 **/
		lineAngle(): number;
		/**
		 * Sets a new line angle value for the hatch pattern line definition object.
		 **/
		setLineAngle(dAngle: number): void;
		/**
		 * Retrieves the current base point of the hatch pattern line definition object.
		 **/
		basePoint(): VectorOdTvPoint2d;
		/**
		 * Sets a new base point for the hatch pattern line definition object.
		 **/
		setBasePoint(pt: VectorOdTvPoint2d): void;
		/**
		 * Retrieves the current offset vector of the hatch pattern line definition object.
		 **/
		patternOffset(): Vector2;
		/**
		 * Sets a new offset vector for the hatch pattern line definition object.
		 **/
		setPatternOffset(offset: Vector2): void;
		/**
		 * Retrieves the current dash array of the hatch pattern line definition object.
		 **/
		dashes(): OdArrayDouble;
		/**
		 * Sets a new dash array for the hatch pattern line definition object.
		 **/
		setDashes(dash: OdArrayDouble): void;
		delete(): void;
	}

	/**
	 * The base interface class for working with Visualize SDK hatch pattern definition objects.
	 **/
	class OdTvHatchPatternDef {
		constructor();
		/**
		 * Retrieves the current hatch pattern line object of the hatch pattern definition object.
		 **/
		patternLines(): Array<undefined>;
		/**
		 * Sets a new hatch pattern line object for the hatch pattern definition object.
		 **/
		setPatternLines(hatchPattern: Array<undefined>): void;
		/**
		 * Retrieves the current deviation value of the hatch pattern definition object.
		 **/
		deviation(): number;
		/**
		 * Sets a new deviation value for the hatch pattern definition object.
		 **/
		setDeviation(d: number): void;
		/**
		 * Retrieves the current pattern scale value of the hatch pattern definition object.
		 **/
		patternScale(): number;
		/**
		 * Sets a new pattern scale value for the hatch pattern definition object.
		 **/
		setPatternScale(dScale: number): void;
		/**
		 * Retrieves the current pattern color of the hatch pattern definition object.
		 **/
		getPatternColor(): OdTvColorDef;
		/**
		 * Sets a new pattern color for the hatch pattern definition object.
		 **/
		setPatternColor(color: OdTvColorDef): void;
		/**
		 * Sets a new pattern color for the hatch pattern definition object.
		 **/
		setPatternColor(r: number, g: number, b: number): void;
		/**
		 * Retrieves the current pattern lineweight value of the hatch pattern definition object.
		 **/
		getPatternLineWeight(): OdTvLineWeightDef;
		/**
		 * Sets a new pattern lineweight value for the hatch pattern definition object.
		 **/
		setPatternLineWeight(lineweight: OdTvLineWeightDef): void;
		/**
		 * Obtains the custom pattern transparency value (default is 255).
		 **/
		getPatternTransparency(): OdTvTransparencyDef;
		/**
		 * Sets the custom pattern transparency value.
		 **/
		setPatternTransparency(transparency: OdTvTransparencyDef): void;
		/**
		 * Sets the custom pattern transparency value.
		 **/
		setPatternTransparency(dTransparency: number): void;
		/**
		 * Sets the "is draft" flag of the hatch pattern.
		 **/
		setDraft(bValue: boolean): void;
		/**
		 * Gets the "is draft" flag of the hatch pattern.
		 **/
		isDraft(): boolean;
		/**
		 * Sets the "is external" flag of the hatch pattern.
		 **/
		setExternal(bValue: boolean): void;
		/**
		 * Gets the "is external" flag of the hatch pattern.
		 **/
		isExternal(): boolean;
		/**
		 * Sets the flag that forces the initial position of the pattern to the center of the shell.
		 **/
		setAlignedToCenter(bValue: boolean): void;
		/**
		 * Gets the flag that forces the initial position of the pattern to the center of the shell.
		 **/
		isAlignedToCenter(): boolean;
		/**
		 * Sets the flag that forces the pattern to be skipped when rendering, regardless of its content.
		 **/
		setEmpty(bValue: boolean): void;
		/**
		 * Gets the flag that forces the pattern to be skipped when rendering, regardless of its content.
		 **/
		isEmpty(): boolean;
		/**
		 * Sets the flag that forces use of a solid fill instead of a pattern while rendering.
		 **/
		setSolid(bValue: boolean): void;
		/**
		 * Gets the flag that forces use of a solid fill instead of pattern while rendering.
		 **/
		isSolid(): boolean;
		/**
		 * Sets the flag that disables a solid background fill on the same face while rendering, so only the pattern and edges are drawn.
		 **/
		setDisabledBackgroundFill(bValue: boolean): void;
		/**
		 * Gets the flag that disables a solid background fill on the same face while rendering, so only the pattern and edges are drawn.
		 **/
		isDisabledBackgroundFill(): boolean;
		/**
		 * Check is given hatch pattern object is equal to this hatch pattern object.
		 **/
		isEqual(hpDef: OdTvHatchPatternDef): boolean;
		/**
		 * Retrieves the next hatch pattern in the chain.
		 **/
		next(): OdTvHatchPatternDef;
		/**
		 * Specifies the next hatch pattern in the chain.
		 **/
		setNext(pDef: OdTvHatchPatternDef): void;
		delete(): void;
	}

	class View {
		constructor();
		active: boolean;
		renderMode: RenderMode;
		visualStyle: OdTvVisualStyleId;
		viewPosition: Point3;
		viewTarget: Point3;
		upVector: Vector3;
		viewXVector: Vector3;
		viewYVector: Vector3;
		viewZVector: Vector3;
		viewFieldWidth: number;
		viewFieldHeight: number;
		perspective: boolean;
		viewingMatrix: Matrix3d;
		projectionMatrix: Matrix3d;
		eyeToWorldMatrix: Matrix3d;
		worldToDeviceMatrix: Matrix3d;
		vportRect: Rect;
		borderWidth: number;
		borderColor: any;
		sceneExtents: Extents3d;
		name: string;
		lensLength: number;
		/**
		 * Returns the current value of the 'screenToWorld' property as an
		 **/
		screenToWorld(): Matrix3d;
		/**
		 * Returns a matrix translation between specified coordinate systems.
		 **/
		getTransform(from: CoordSys, to: CoordSys): Matrix3d;
		/**
		 * Transforms vectors between specified coordinate systems. Vector coordinates are
		 **/
		transformVectors(from: CoordSys, to: CoordSys, vcts: any): any;
		/**
		 * Transforms points between specified coordinate systems. Point coordinates
		 **/
		transformPoints(from: CoordSys, to: CoordSys, pts: any): any;
		select(dcPoints: any, opt: OdTvSelectionOptions, model: TvModel): OdTvSelectionSet;
		selectCrossing(dcPoints: any, model: TvModel): OdTvSelectionSet;
		selectWindow(dcPoints: any, model: TvModel): OdTvSelectionSet;
		selectFence(dcPoints: any, model: TvModel): OdTvSelectionSet;
		selectWPoly(dcPoints: any, model: TvModel): OdTvSelectionSet;
		selectCPoly(dcPoints: any, model: TvModel): OdTvSelectionSet;
		selectPoint(dcPoints: any, model: TvModel): OdTvSelectionSet;
		highlight(itr: OdTvSelectionSetIterator, bDoIt: boolean): void;
		/**
		 * Highlights a given item path and highlight style.
		 **/
		highlight(id: OdTvEntityId, path: OdTvSubItemPath, bDoIt: boolean, highLightStyleId: number): void;
		highlightAll(set: OdTvSelectionSet, bDoIt: boolean): void;
		/**
		 * Sets options for an active view.
		 **/
		setView(position: Point3, target: Point3, upVector: Vector3, fieldWidth: number, fieldHeight: number, isParallel: boolean): void;
		set2dMode(bVal: boolean): void;
		get2dMode(): boolean;
		setBackground(backgroundId: OdTvGsViewBackgroundId): void;
		getBackground(): OdTvGsViewBackgroundId;
		pointInView(screenPoint: VectorOdTvPoint2d): boolean;
		setViewport(lowerLeft: VectorOdTvPoint2d, upperRight: VectorOdTvPoint2d): OdTvResult;
		getViewport(): any;
		setBorderVisibility(bVisible: boolean): void;
		getBorderVisibility(): boolean;
		isEnableFrontClip(): boolean;
		getFrontClip(): number;
		setFrontClip(bEnable: boolean, frontClip: number): void;
		isEnableBackClip(): boolean;
		getBackClip(): number;
		setBackClip(bEnable: boolean, backClip: number): void;
		setAmbientLightColor(color: OdTvColorDef): void;
		getAmbientLightColor(): OdTvColorDef;
		/**
		 * Add sibling view (the current view will copy own parameters to the added view)
		 **/
		addSibling(view: View): void;
		/**
		 * Returns the view which controls the parameters of the current view
		 **/
		getSiblingOwner(): View;
		dolly(x: number, y: number, z: number): void;
		viewDcCorners(): any;
		addModel(sceneModelId: TvModel): boolean;
		eraseModel(sceneModelId: TvModel): boolean;
		eraseAllModels(): OdTvResult;
		numModels(): number;
		modelAt(modelIndex: number): TvModel;
		/**
		 * Add cutting plane to the view.
		 **/
		addCuttingPlane(plane: OdTvPlane): OdTvResult;
		/**
		 * Return the plane object associated with the given cutting plane
		 **/
		getCuttingPlane(idPlane: number): OdTvPlane;
		/**
		 * Update the plane object associated with the given cutting plane
		 **/
		updateCuttingPlane(idPlane: number, plane: OdTvPlane): OdTvResult;
		/**
		 * Updates the plane object associated with the given cutting plane.
		 **/
		updateCuttingPlaneWithWithInvalidate(idPlane: number, plane: OdTvPlane, bCallDeviceInvalidate: boolean): void;
		/**
		 * Returns the number of cutting planes
		 **/
		numCuttingPlanes(): number;
		/**
		 * Remove the cutting plane with the given idPlane
		 **/
		removeCuttingPlane(idPlane: number): OdTvResult;
		/**
		 * Remove all cutting planes
		 **/
		removeCuttingPlanes(): OdTvResult;
		/**
		 * Set filling parameters of the cutting planes.
		 **/
		setEnableCuttingPlaneFill(bEnable: boolean, r: number, g: number, b: number): OdTvResult;
		/**
		 * Returns the filling parameters of the cutting planes.
		 **/
		getCuttingPlaneFillEnabled(): boolean;
		/**
		 * Set filling pattern parameters of the cutting planes.
		 **/
		setCuttingPlaneFillPatternEnabled(bEnable: boolean, style: CuttingPlaneFillStyle, r: number, g: number, b: number): OdTvResult;
		/**
		 * Returns the filling parameters of the cutting planes pattern.
		 **/
		getCuttingPlaneFillPatternEnabled(): boolean;
		/**
		 * Starts the view interactivity mode.
		 **/
		beginInteractivity(frameRateInHz: number): void;
		/**
		 * Starts the view interactivity mode.
		 **/
		beginInteractivity(): void;
		/**
		 * Retrieves whether the view is currently in interactive mode.
		 **/
		isInInteractivity(): boolean;
		/**
		 * Retrieves the current frame rate value (FPS) for the view interactivity mode.
		 **/
		getInteractivityFrameRate(): number;
		/**
		 * Stops the view interactivity mode.
		 **/
		endInteractivity(): void;
		/**
		 * Retrieves the current intensity of the defalt light.
		 **/
		defaultLightingIntensity(): number;
		/**
		 * Sets a new default light intensity for the view object.
		 **/
		setDefaultLightingIntensity(dIntensity: number): OdTvResult;
		/**
		 * Retrieves the current default light color of the view object.
		 **/
		defaultLightingColor(): OdTvColorDef;
		/**
		 * Sets a new default light color for the view object.
		 **/
		setDefaultLightingColor(color: OdTvColorDef): OdTvResult;
		/**
		 * Enables default lighting for the view object.
		 **/
		enableDefaultLighting(bEnable: boolean, lightType: DefaultLightingType): OdTvResult;
		/**
		 * Retrieves the current value of the default lighting flag. If the flag is equal to true, the default lighting is enabled; otherwise it is disabled.
		 **/
		defaultLightingEnabled(): boolean;
		/**
		 * Retrieves the default lighting type for the view object.
		 **/
		defaultLightingType(): DefaultLightingType;
		/**
		 * Returns the user defined default light direction
		 **/
		userDefinedLightDirection(): Vector3;
		/**
		 * Sets the user defined default light direction
		 **/
		setUserDefinedLightDirection(lightDirection: Vector3): OdTvResult;
		/**
		 * Runs the collision detection 'all with all' procedure inside the view object.
		 **/
		collideAllWithAll(
			modelId: TvModel,
			collidedWho: OdTvCollidedResult,
			collidedWithWhom: OdTvCollidedResult,
			level: SelectionLevel,
			bIntersectionOnly: boolean,
			tolerance: number,
		): any;
		/**
		 * Runs the collision detection 'all with all' procedure inside the view object.
		 **/
		collideAllWithAll(modelId: TvModel, result: OdTvCollidedPairResult, options: OdTvCollisionOptions): any;
		/**
		 * Runs the collision detection 'a few with all' procedure inside the view object.
		 **/
		collideFewWithAll(
			inputSet: OdTvSelectionSet,
			modelId: TvModel,
			collidedFromInput: OdTvCollidedResult,
			level: SelectionLevel,
			bIntersectionOnly: boolean,
			tolerance: number,
		): any;
		/**
		 * Runs the collision detection 'a few with all' or 'a few with themself' procedure inside the view object.
		 **/
		collideFewWithAll(inputSet: OdTvSelectionSet, modelId: TvModel, result: OdTvCollidedPairResult, options: OdTvCollisionOptions): any;
		/**
		 * Runs the collision detection 'a few with a few' procedure inside the view object.
		 **/
		collideFewWithFew(
			inputSet: OdTvSelectionSet,
			collisionWithSet: OdTvSelectionSet,
			collidedFromInput: OdTvCollidedResult,
			level: SelectionLevel,
			bIntersectionOnly: boolean,
			tolerance: number,
		): any;
		/**
		 * Runs the collision detection 'a few with a few' procedure inside the view object.
		 **/
		collideFewWithFew(inputSet: OdTvSelectionSet, collisionWithSet: OdTvSelectionSet, result: OdTvCollidedPairResult, options: OdTvCollisionOptions): any;
		/**
		 * Allows to overrule a screen-space ambient occlusion (SSAO) in current View.
		 **/
		setSSAOEnabled(bEnable: boolean): void;
		/**
		 * Returns the overrule flag for a screen-space ambient occlusion in current View.
		 **/
		getSSAOEnabled(): boolean;
		/**
		 * Specifies whether a view should adjust lens length to match all parameters in the setView() method.
		 **/
		setAdjustLensLength(bAdjust: boolean): void;
		/**
		 * Checks whether view should adjust lens length to match all parameters the setView() method.
		 **/
		getAdjustLensLength(): boolean;
		/**
		 * Retrieves focal length of this View object.
		 **/
		focalLength(): number;
		/**
		 * Checks whether a view intersects with the specified extents.
		 **/
		isExtentsInView(extents: Extents3d): boolean;
		/**
		 * Sets the flag that determines whether the data on hidden layers in this view object
		 **/
		setTakeIntoAccountDataAtHidenLayersInExtents(bTakeIntoAccount: boolean): void;
		/**
		 * Retrieves the current value of the flag that determines whether the data on hidden layers in this view object
		 **/
		getTakeIntoAccountDataAtHidenLayersInExtents(): boolean;
		/**
		 * Set a new lineweight mode to the view object.
		 **/
		setLineWeightMode(lwMode: OdTvGsViewLineWeightMode): void;
		/**
		 * Retrieves the current lineweight mode value for the view object.
		 **/
		getLineWeightMode(): OdTvGsViewLineWeightMode;
		/**
		 * Set a new lineweight scale value to the view object.
		 **/
		setLineWeightScale(dScale: number): void;
		/**
		 * Retrieves the current lineweight scale value for the view object.
		 **/
		getLineWeightScale(): number;
		/**
		 * Sets a new array of lineweights for the view object.
		 **/
		setLineWeightEnum(lineweights: any, altLineWeights: any): void;
		transformScreenToWorld(x: number, y: number): Point3;
		transformWorldToScreen(x: number, y: number, z: number): Point3;
		/**
		 * Sets the normal 3D clipping for this View object.
		 **/
		setNormal3DClipping(normalBundary: OdTvNormalClipBoundary): void;
		/**
		 * Sets the inverted 3D clipping for this View object.
		 **/
		setInverted3DClipping(invertedBundary: OdTvInvertedClipBoundary): void;
		/**
		 * Sets the extended 3D clipping for this View object.
		 **/
		setExtended3DClipping(extendedBundary: OdTvExtendedClipBoundary): void;
		/**
		 * Sets the complex 3D clipping for this View object.
		 **/
		setComplex3DClipping(complexBundary: OdTvComplexClipBoundary): void;
		/**
		 * Sets the planar 3D clipping for this View object.
		 **/
		setPlanar3DClipping(planarBundary: OdTvPlanarClipBoundary): void;
		/**
		 * Returns the current 3D clipping boundary for this View object.
		 **/
		get3DClipping(): any;
		/**
		 * Removes the 3D clipping from this View object.
		 **/
		remove3DClipping(): void;
		/**
		 * Sets the hatch scale for the section of the 3D clipping.
		 **/
		setHatchScaleFor3DClippingSection(dScale: number): void;
		/**
		 * Returns the hatch scale for the section of the 3D clipping.
		 **/
		getHatchScaleFor3DClippingSection(): number;
		/**
		 * Scales the camera to completely include a specified WCS box inside the view frustum.
		 **/
		zoomExtents(minPt: Point3, maxPt: Point3): void;
		/**
		 * Scales the camera to completely include a specified WCS box inside the view frustum.
		 **/
		zoomExtents(minPt: Point3, maxPt: Point3, bCacheIfNonSetup: boolean): void;
		/**
		 * Defines a polygonal clip region for the view object.
		 **/
		setClipRegion2d(numContours: number, numVertices: any, vertices2d: any): void;
		/**
		 * Defines a polygonal clip region for the view object.
		 **/
		setClipRegion(numContours: number, numVertices: any, vertices: any): void;
		/**
		 * Retrieves the current polygonal clip region for the view.
		 **/
		getClipRegion2d(): any;
		/**
		 * Retrieves the current polygonal clip region for the view.
		 **/
		getClipRegion(): any;
		/**
		 * Checks whether view has polygonal clip region in world coordinates.
		 **/
		hasWCSClipRegion(): boolean;
		/**
		 * Removes the current polygonal clip region from the view.
		 **/
		removeClipRegion(): void;
		/**
		 * Inherites clip region from specified view.
		 **/
		inheritClipRegionFrom(viewId: View): void;
		/**
		 * Retrieves clip region owner.
		 **/
		clipRegionOwner(): View;
		/**
		 * Retrieves clip region inheritantes.
		 **/
		clipRegionInheritantes(): any;
		/**
		 * Retrieves the current database handle associated with the object.
		 **/
		getDatabaseHandle(): string;
		/**
		 * Get native database handle
		 **/
		getNativeDatabaseHandle(): string;
		delete(): void;
	}

	class Viewer {
		/**
		 * Currenly recreates singleton viewer object and returns it (Module.Viewer.create() method).
		 **/
		static create(): Viewer;
		/**
		 * Destroys a singleton viewer.
		 **/
		static destroy(): void;
		/**
		 * Iterates through all available devices and resizes them.
		 **/
		static resize(rc: OdGsDCRect): void;
		activeView: View;
		enableAntiaiasing: boolean;
		lineSmoothing: boolean;
		vertexSnapping: boolean;
		edgeSnapping: boolean;
		shadows: boolean;
		groundShadow: boolean;
		fxaaAntiAliasing3d: boolean;
		fxaaAntiAliasing2d: boolean;
		fxaaQuality: number;
		memoryLimit: number;
		/**
		 * Creates a block with the specified name.
		 **/
		createBlock(name: string): OdTvBlockId;
		/**
		 * Remove a the specified block object from the database.
		 **/
		removeBlock(id: OdTvBlockId): void;
		/**
		 * Returns an active viewport index.
		 **/
		activeViewportId(): number;
		/**
		 * Returns this view's options.
		 **/
		getViewString(): string;
		/**
		 * Returns view options.
		 **/
		getViewData(): any;
		/**
		 * Returns a volume of the view.
		 **/
		getVolume(): Extents3d;
		/**
		 * Zooms view before sizing the frame.
		 **/
		zoomWindow(xMin: number, yMin: number, xMax: number, yMax: number): void;
		/**
		 * Zooms field of view with a given 'factor' at the specified center in screen coordinates.
		 **/
		zoomAt(factor: number, scrx: number, scry: number): void;
		/**
		 * Moves view and zooms view's field to fit model extents.
		 **/
		zoomExtents(): void;
		/**
		 * Moves view and zooms view's field to fit model extents.
		 **/
		zoomExtents(force: boolean): void;
		/**
		 * Scales the camera to completely include a specified WCS box inside the view frustum.
		 **/
		zoomExtents(minPt: Point3, maxPt: Point3): void;
		/**
		 * Clear current zoom extents cache
		 **/
		clearViewExtentsCache(): void;
		/**
		 * Moves camera parallel to view plane on specified vector in screen coordinates.
		 **/
		pan(scrdx: number, scrdy: number): void;
		/**
		 * Rotates camera by specified angle in radians around corresponding view CS axes.
		 **/
		orbit(xAng: number, yAng: number, zAng: number): void;
		/**
		 * Updates the GL frame buffer after view and/or geometry changes.
		 **/
		update(): void;
		/**
		 * Updates the GL frame buffer after view and/or geometry changes.
		 **/
		update(maxRegenTime: number): void;
		/**
		 * Iterates through all available devices and resizes them.
		 **/
		resize(xmin: number, xmax: number, ymin: number, ymax: number): void;
		/**
		 * Writes current database to the vsfx format.
		 **/
		saveVsfxWrapper(writeBlock: any): any;
		/**
		 * Internal implementation used by APIs of the Viewer.parseStreamVSFX() function.
		 **/
		parseVsfx(arrayBuffer: Uint8Array): DatabaseStreamStatus;
		/**
		 * Attach all call back for work in partial mode
		 **/
		attachPartialResolver(objectHandler: any): void;
		/**
		 * Internal implementation used by APIs of the Viewer.parseStreamVSFX() function.
		 **/
		parseVsfxInPartialMode(requestId: number, arrayBuffer: Uint8Array): boolean;
		/**
		 * Internal implementation used by APIs of the Viewer.parseStream() function.
		 **/
		parseStream(arrayBuffer: Uint8Array): number;
		/**
		 * Internal implementation used by APIs of the Viewer.parseFile() function.
		 **/
		parseFile(arrayBuffer: Uint8Array): any;
		/**
		 * Internal implementation used by APIs of the Viewer.appendFile() function.
		 **/
		appendFile(arrayBuffer: Uint8Array): any;
		/**
		 * Adds a file to client file system.
		 **/
		addEmbeddedFile(name: string, arrayBuffer: Uint8Array): any;
		/**
		 * Selects an active viewport by the specified screen point.
		 **/
		selectVport(x: number, y: number): View;
		/**
		 * Checks whether the animation is currently running for the active extended view.
		 **/
		isRunningAnimation(): boolean;
		/**
		 * Sets default view position.
		 **/
		setDefaultViewPosition(pos: DefaultViewPosition): void;
		/**
		 * Sets default view position and starts animation to show the view change.
		 **/
		setDefaultViewPositionWithAnimation(pos: DefaultViewPosition): void;
		/**
		 * Mouse up event handler.
		 **/
		onMouseUp(x: number, y: number): void;
		/**
		 * Mouse down event handler.
		 **/
		onMouseDown(x: number, y: number): void;
		/**
		 * Mouse move event handler.
		 **/
		onMouseMove(x: number, y: number): void;
		/**
		 * Mouse double click
		 **/
		onMouseDoubleClick(x: number, y: number): void;
		/**
		 * Checks whether the text input is in process.
		 **/
		isInputText(): boolean;
		/**
		 * Input text to edit item.
		 **/
		inputText(text: string, textSize: number): void;
		/**
		 * Cancels current action.
		 **/
		cancelAction(): void;
		/**
		 * Sets current action.
		 **/
		startAction(name: string): void;
		/**
		 * Returns name of the current action.
		 **/
		getCurrentActionName(): string;
		/**
		 * Set transport, for sending commands to client.
		 **/
		setTransport(func: any): void;
		/**
		 * Returns an array of viewports.
		 **/
		viewports(): any;
		/**
		 * Returns a background color as [R,G,B] or [R,G,B,A].
		 **/
		getBackgroundColor(): any;
		/**
		 * Sets a background color.
		 **/
		setBackgroundColor(rgba: any): void;
		/**
		 * Returns an iterator to iterate through existing models in the database.
		 **/
		getModelIterator(): OdTvModelsIterator;
		/**
		 * Searches for a model with the specified name.
		 **/
		getModelByName(name: string): TvModel;
		/**
		 * Creates a model with the specified name.
		 **/
		createModel(name: string): TvModel;
		/**
		 * Returns an iterator to iterate through existing layers in the database.
		 **/
		getLayersIterator(): OdTvLayersIterator;
		/**
		 * Searches for a layer with the specified name.
		 **/
		findLayer(name: string): OdTvLayerId;
		/**
		 * Creates a layer with the specified name.
		 **/
		createLayer(name: string): OdTvLayerId;
		/**
		 * Returns an iterator to iterate through existing materials in the database.
		 **/
		getMaterialsIterator(): OdTvMaterialsIterator;
		/**
		 * Searches for a material with the specified name.
		 **/
		findMaterial(name: string): OdTvMaterialId;
		/**
		 * Creates a material with the specified name.
		 **/
		createMaterial(name: string): OdTvMaterialId;
		/**
		 * Returns an iterator to iterate through existing visual styles in the database.
		 **/
		getVisualStylesIterator(): OdTvVisualStylesIterator;
		/**
		 * Searches for a visual style with the specified name.
		 **/
		findVisualStyle(name: string): OdTvVisualStyleId;
		/**
		 * Creates a visual style with the specified name.
		 **/
		createVisualStyle(name: string): OdTvVisualStyleId;
		/**
		 * Creates a block with the specified name.
		 **/
		createTextStyle(name: string): OdTvTextStyleId;
		/**
		 * Searches for a text style with the specified name.
		 **/
		findTextStyle(name: string): OdTvTextStyleId;
		/**
		 * Returns an iterator to iterate through existing text styles in the database.
		 **/
		getTextStylesIterator(): OdTvTextStylesIterator;
		/**
		 * Returns an iterator to iterate through existing graphics system devices in the database.
		 **/
		getDevicesIterator(): OdTvGsDevicesIterator;
		/**
		 * Returns an active graphics system device.
		 **/
		getActiveDevice(): OdTvGsDevice;
		/**
		 * Registers a custom big font for the file.
		 **/
		addBigFontWithIndex(fontFileName: string, code: OdCodePageForBigFont): void;
		/**
		 * Returns an iterator to iterate through existing raster images in the database.
		 **/
		getRasterImagesIterator(): OdTvRasterImagesIterator;
		/**
		 * Creates a raster image with the specified name and path to an image file.
		 **/
		createRasterImage(name: string, pathToFile: string): OdTvRasterImageId;
		/**
		 * Searches for a raster image with the specified name.
		 **/
		findRasterImage(name: string): OdTvRasterImageId;
		/**
		 * Returns a smart pointer to an iterator object to get sequential access to animation container objects in the database.
		 **/
		getAnimationContainersIterator(): OdTvAnimationContainersIterator;
		/**
		 * Searches for a Animation container object with the specified name.
		 **/
		findAnimationContainer(name: string): OdTvAnimationContainerId;
		/**
		 * Creates a new Animation container object.
		 **/
		createAnimationContainer(name: string): OdTvAnimationContainerId;
		/**
		 * Remove an animation container object with the given ID.
		 **/
		removeAnimationContainer(id: OdTvAnimationContainerId): void;
		/**
		 * Returns a smart pointer to an iterator to get sequential access to Animation action objects in the database.
		 **/
		getAnimationActionsIterator(): OdTvAnimationActionsIterator;
		/**
		 * Searches for a Animation action object with the specified name.
		 **/
		findAnimationAction(name: string): OdTvAnimationActionId;
		/**
		 * Creates a new Animation action object.
		 **/
		createAnimationAction(name: string): OdTvAnimationActionId;
		/**
		 * Removes an Animation action object with the given ID.
		 **/
		removeAnimationAction(id: OdTvAnimationActionId): void;
		/**
		 * Returns an iterator to iterate through existing blocks in the database.
		 **/
		getBlockIterator(): OdTvBlocksIterator;
		/**
		 * Creates a block with the specified name.
		 **/
		createBlock(name: string): OdTvBlockId;
		/**
		 * Searches for a block with the specified name.
		 **/
		findBlock(name: string): OdTvBlockId;
		/**
		 * Returns an iterator to iterate through existing linetypes in the database.
		 **/
		getLinetypeIterator(): OdTvLinetypesIterator;
		/**
		 * Creates a local database and fills it with default values.
		 **/
		createLocalDatabase(): void;
		clear(): void;
		/**
		 * Regenerates all views.
		 **/
		regenAll(): void;
		/**
		 * Regenerates an active view.
		 **/
		regenActiveView(): void;
		/**
		 * Regenerates only those graphic objects that are visible in the device window.
		 **/
		regenVisible(): void;
		/**
		 * Returns the array of visual styles for the current database.
		 **/
		getVisualStyles(): any;
		/**
		 * Returns the name of the active visual style.
		 **/
		getActiveVisualStyle(): string;
		/**
		 * Sets the active visual style by name.
		 **/
		setActiveVisualStyle(name: string): void;
		/**
		 * Converts the specified screen point to a world coordinates system (WCS) point.
		 **/
		screenToWorld(x: number, y: number): Point3;
		/**
		 * Converts the specified point from the eye coordinate system to a world coordinates system (WCS) point.
		 **/
		toEyeToWorld(x: number, y: number, z: number): Point3;
		/**
		 * Performs selection for active model and view. Automatically detects selection mode.
		 **/
		select(xMin: number, yMin: number, xMax: number, yMax: number): void;
		/**
		 * Unselects selected objects. Unselected objects are unhighlighted.
		 **/
		unselect(): void;
		/**
		 * Returns an array of handles of server-side database objects that corresponding to
		 **/
		getSelected(): OdTvSelectionSet;
		/**
		 * Sets the selection that identifies selected objects.
		 **/
		setSelected(set: OdTvSelectionSet): void;
		/**
		 * Specifies whether to enable automatical selection. Automatical
		 **/
		setEnableAutoSelect(tVal: boolean): void;
		/**
		 * Indicates whether automatical selection is enabled. Automatical
		 **/
		getEnableAutoSelect(): boolean;
		/**
		 * Sets a visual style for selected entities.
		 **/
		setVisualStyleForSelected(vsId: OdTvVisualStyleId): void;
		/**
		 * Isolates selected objects.
		 **/
		isolateSelectedObjects(): void;
		/**
		 * Isolates selected objects.
		 **/
		isolateSelectedObjects(bPerSession: boolean): void;
		/**
		 * Hides selected objects.
		 **/
		hideSelectedObjects(): void;
		/**
		 * Hides selected objects.
		 **/
		hideSelectedObjects(bPerSession: boolean): void;
		/**
		 * Unisolates all objects.
		 **/
		unisolateSelectedObjects(): void;
		/**
		 * Unisolates all objects.
		 **/
		unisolateSelectedObjects(bPerSession: boolean): void;
		/**
		 * Returns active model.
		 **/
		getActiveModel(): TvModel;
		/**
		 * Zooms camera to entity extents.
		 **/
		zoomToEntity(id: OdTvEntityId): void;
		/**
		 * Zooms camera to sum extents.
		 **/
		zoomToObjects(set: OdTvSelectionSet): void;
		explode(index: number): void;
		/**
		 * Gets a service model that stores markup geometry.
		 **/
		getMarkupModel(): TvModel;
		/**
		 * Gets a markup controller.
		 **/
		getMarkupController(): OdMarkupController;
		/**
		 * Adds or updates partial view indexes for models of the database.
		 **/
		addPartialViewIndexes(bUpdateExisting: boolean, bExtendedMode: boolean): void;
		/**
		 * Checks that the database has partial indexes.
		 **/
		hasPartialViewIndexes(bCheckExtents: boolean): boolean;
		/**
		 * Gets extents box of an active view.
		 **/
		getActiveExtents(): Extents3d;
		/**
		 * Gets an active extended view.
		 **/
		getActiveTvExtendedView(): OdTvExtendedView;
		/**
		 * Gets an overlay model that is rendered on top of the main scene directly.
		 **/
		getOverlayModel(): TvModel;
		/**
		 * Starts animation in a current view.
		 **/
		startAnimation(): void;
		/**
		 * Checks whether the animation for non-interactive view changes is enabled.
		 **/
		getEnableAnimation(): boolean;
		/**
		 * Enables or disables the animation of non-interactive view changes.
		 **/
		setEnableAnimation(val: boolean): void;
		/**
		 * Retrieves the current value of the FPS show flag that determines whether the FPS information is displayed while rendering.
		 **/
		getEnableFPS(): boolean;
		/**
		 * Sets a new value of the FPS show flag that determines whether the FPS information is displayed while rendering.
		 **/
		setEnableFPS(val: boolean): void;
		/**
		 * Checks whether the WCS axis triad is switched on.
		 **/
		getEnableWCS(): boolean;
		/**
		 * Switches on or off the WCS (the axis triad).
		 **/
		setEnableWCS(val: boolean): void;
		/**
		 * Selects the specified entity and highlights it.
		 **/
		setSelectedEntity(entity: OdTvEntityId): void;
		/**
		 * Gets units for vsf files obtained by importing dwg/dxf.
		 **/
		getUnit(): string;
		/**
		 * Returns an iterator to iterate through existing CDA (Common Data Access) tree storages in the database.
		 **/
		getCDATreeIterator(): OdTvCDATreeStoragesIterator;
		getSnapPoint(screenX: number, screenY: number, hitRadius: number): any;
		getExperimentalFunctionalityFlag(name: string): boolean;
		setExperimentalFunctionalityFlag(name: string, value: boolean): void;
		/**
		 * Searches device for a view by its name.
		 **/
		getViewByName(name: string): any;
		getResolveHandleFromCdaNode(node: OdTvCDATreeNodePtr): string;
		/**
		 * Returns a smart pointer to an iterator object to get sequential access to highlight style objects in the database.
		 **/
		getHighlightStylesIterator(): OdTvHighlightStylesIterator;
		/**
		 * Searches for a highlight style object with a specified name in the database.
		 **/
		findHighlightStyle(name: string): OdTvHighlightStyleId;
		/**
		 * Creates a highlight style object as a default highlight style object and returns the appropriate ID.
		 **/
		createHighlightStyle(name: string): OdTvHighlightStyleId;
		/**
		 * Removes a highlight style object with the specified identifier from the database.
		 **/
		removeHighlightStyle(id: OdTvHighlightStyleId): void;
		/**
		 * Creates a view background object and returns the appropriate ID.
		 **/
		createBackground(name: string, bgType: BackgroundTypes): OdTvGsViewBackgroundId;
		/**
		 * Removes a view background object with the specified identifier from the database.
		 **/
		removeBackground(id: OdTvGsViewBackgroundId): void;
		/**
		 * Removes all view backgrounds objects from the database.
		 **/
		clearBackgrounds(): void;
		/**
		 * Searches for a view background object with a specified name in the database.
		 **/
		findBackground(name: string): OdTvGsViewBackgroundId;
		/**
		 * Returns a smart pointer to an iterator object to get sequential access to view background objects in the database.
		 **/
		getBackgroundsIterator(): OdTvGsViewBackgroundsIterator;
		onRequestResponseComplete(requestID: number): void;
		getHeapInformation(): HeapInformation;
		/**
		 * Returns the OdTvEntityId that matches the original database handle.
		 **/
		getEntityByOriginalHandle(originalDatabaseHandle: string): OdTvEntityId;
		getEntitySetByOriginalHandles(handles: any): OdTvSelectionSet;
		/**
		 * Calculates coefficient for converting 'From' units to 'To' units.
		 **/
		getUnitsConversionCoef(unitsFrom: Units, unitsTo: Units): number;
		/**
		 * Calculates coefficient for converting 'From' units to 'To' units.
		 **/
		getUnitsConversionCoefWithUserDefined(unitsFrom: Units, unitsTo: Units, userDefCoefToMeters_uFrom: number, userDefCoefToMeters_uTo: number): number;
		/**
		 * Returns the OdTvEntityId that matches the original database handle.
		 **/
		findEntity(originalDatabaseHandle: string): OdTvEntityId;
		/**
		 * Sets a visual style object as a preferable for appropriate type.
		 **/
		setPreferableVisualStyle(type: PreferableVisualStylesType, visStyleId: OdTvVisualStyleId): void;
		/**
		 * Retrieves the visual style object for appropriate preferable visual style type.
		 **/
		getPreferableVisualStyle(type: PreferableVisualStylesType): OdTvVisualStyleId;
		/**
		 * Checks that the visual style is preferable.
		 **/
		isPreferableVisualStyle(visStyleId: OdTvVisualStyleId): any;
		/**
		 * Searches for an entity or subentity using an entity handle.
		 **/
		findEntityOrSubEntityByHandle(handle: string): any;
		/**
		 * Searches for an entity using an entity handle.
		 **/
		findEntityByHandle(handle: string): OdTvEntityId;
		delete(): void;
	}

	/**
	 * This class represents a rotation quaternion in 3D space.
	 **/
	class Quaternion {
		/**
		 * Default constructor for the OdGeQuaternion class.
		 **/
		constructor();
		x: number;
		y: number;
		z: number;
		w: number;
		/**
		 * Set components for the quaternion and returns a reference to it.
		 **/
		setCoords(ww: number, xx: number, yy: number, zz: number): Quaternion;
		/**
		 * Set components for the quaternion and returns a reference to it.
		 **/
		setMatrix(matrix: Matrix3d): Quaternion;
		/**
		 * Calculates 3D rotation matrix that represents this quaternion.
		 **/
		getMatrix(): Matrix3d;
		/**
		 * Rotates specified 3D point using this quaternion.
		 **/
		rotatePoint(sourcePoint: Point3): Point3;
		/**
		 * Rotates specified 3D point using this quaternion.
		 **/
		rotateVector(vector: Vector3): Point3;
		mult(scale: number): any;
		scale(scale: number): any;
		add(quat: Quaternion): any;
		sub(quat: Quaternion): any;
		/**
		 * Returns the norm of this quaternion.
		 **/
		norm(): number;
		/**
		 * Sets this quaternion to the unit quaternion and returns a reference to this quaternion
		 **/
		normalize(): Quaternion;
		/**
		 * Returns the dot product of this quaternion and the specified quaternion.
		 **/
		dotProduct(quat: Quaternion): number;
		/**
		 * Performs spherical linear interpolation, introduced by Ken Shoemake in the context of quaternion interpolation.
		 **/
		slerp(q: Quaternion, t: number, bUseShortestPath: boolean): Quaternion;
		delete(): void;
	}

	/**
	 * This class represents tolerances for vectors or points coincidence.
	 **/
	class OdGeTol {
		/**
		 * Constructor for the OdGeTol class.
		 **/
		constructor(arg0: number);
		/**
		 * Constructor for the OdGeTol class.
		 **/
		constructor(arg0: number, arg1: number);
		/**
		 * Returns the equalPoint tolerance.
		 **/
		equalPoint(): number;
		/**
		 * Returns the equalVector tolerance.
		 **/
		equalVector(): number;
		/**
		 * Sets the equalPoint tolerance to a specified value.
		 **/
		setEqualPoint(val: number): void;
		/**
		 * Sets the equalVector tolerance to a specified value.
		 **/
		setEqualVector(val: number): void;
		delete(): void;
	}

	/**
	 * This class represents 2D device coordinate rectangles.
	 **/
	class OdGsDCRect {
		/**
		 * Default constructor for the OdGsDCRect class.
		 **/
		constructor();
		/**
		 * Default constructor for the OdGsDCRect class.
		 **/
		constructor(arg0: OdGsDCPoint, arg1: OdGsDCPoint);
		/**
		 * Default constructor for the OdGsDCRect class.
		 **/
		constructor(arg0: number, arg1: number, arg2: number, arg3: number);
		min: any;
		max: any;
		/**
		 * Sets this rectangle object to the null rectangle.
		 **/
		set_null(): void;
		/**
		 * Checks whether this rectangle object is the null rectangle.
		 **/
		is_null(): boolean;
		/**
		 * Checks whether this rectangle object is inside the specified rectangle object.
		 **/
		within(dcRect: OdGsDCRect): boolean;
		/**
		 * Moves this rectangle in the provided direction.
		 **/
		offset(x: number, y: number): void;
		/**
		 * Makes a new rectangle as a result of intersection between this rectangle and the passed rectangle.
		 **/
		intersectWith(dcRect: OdGsDCRect, bValidate: boolean): void;
		/**
		 * Normalizes this rectangle by setting valid values to minimum and maximum points.
		 **/
		normalize(): void;
		/**
		 * Checks whether the specified rectangle object does not intersect this rectangle.
		 **/
		isDisjoint(r: OdGsDCRect): boolean;
		delete(): void;
	}

	/**
	 * This class represents 3D transformation matrices that define affine
	 **/
	class Matrix3d {
		/**
		 * Returns the matrix which maps the initial coordinate system defined by
		 **/
		static alignCoordSys(
			fromOrigin: Point3,
			fromXAxis: Vector3,
			fromYAxis: Vector3,
			fromZAxis: Vector3,
			toOrigin: Point3,
			toXAxis: Vector3,
			toYAxis: Vector3,
			toZAxis: Vector3,
		): Matrix3d;
		/**
		 * Returns the matrix that parallely projects entities onto the specified plane
		 **/
		static projection(projectionPlane: OdTvPlane, projectDir: Vector3): Matrix3d;
		/**
		 * Returns the matrix that rotates entities by an angle about an axis passing
		 **/
		static rotation(angle: number, axis: Vector3, center: Point3): Matrix3d;
		/**
		 * Default constructor for objects of the OdGeMatrix3d class.
		 **/
		constructor();
		/**
		 * Returns the determinant of this matrix.
		 **/
		det(): number;
		/**
		 * Returns the origin, X-axis, Y-axis and Z-axis of the coordinate system to
		 **/
		getCoordSystem(origin: Point3, xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): void;
		/**
		 * Returns the origin of the coordinate system to which this matrix maps the
		 **/
		getCsOrigin(): Point3;
		/**
		 * Returns the X-axis of the coordinate system to which this matrix maps the
		 **/
		getCsXAxis(): Vector3;
		/**
		 * Returns the Y-axis of the coordinate system to which this matrix maps the
		 **/
		getCsYAxis(): Vector3;
		/**
		 * Returns the Z-axis of the coordinate system to which this matrix maps the
		 **/
		getCsZAxis(): Vector3;
		/**
		 * Sets this matrix to its inversion.
		 **/
		invert(): Matrix3d;
		/**
		 * Returns true if and only if another matrix is identical to this one within
		 **/
		isEqualTo(matrix: Matrix3d, tol: OdGeTol): boolean;
		/**
		 * Indicates whether the matrix can be used for perspective projections.
		 **/
		isPerspective(tol: OdGeTol): boolean;
		/**
		 * Checks whether the column vectors of the linear part of this
		 **/
		isScaledOrtho(tol: OdGeTol): boolean;
		/**
		 * Checks whether this matrix is singular.
		 **/
		isSingular(tol: OdGeTol): boolean;
		/**
		 * Returns true if and only if the columns vectors of the linear part of this
		 **/
		isUniScaledOrtho(tol: OdGeTol): boolean;
		/**
		 * Returns the largest absolute value of the linear part of this matrix.
		 **/
		norm(): number;
		/**
		 * Sets this matrix to the product of this matrix and rightSide, and returns a
		 **/
		postMultBy(rightSide: Matrix3d): Matrix3d;
		/**
		 * Sets this matrix to the product of leftSide and this matrix, and returns a
		 **/
		preMultBy(leftSide: Matrix3d): Matrix3d;
		/**
		 * Returns the scale factor of this matrix.
		 **/
		scale(): number;
		/**
		 * Sets this matrix to the matrix which maps the WCS to the coordinate system
		 **/
		setCoordSystem(origin: Point3, xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): Matrix3d;
		/**
		 * Sets this matrix to the matrix which maps the initial coordinate system
		 **/
		setToAlignCoordSys(
			fromOrigin: Point3,
			fromXAxis: Vector3,
			fromYAxis: Vector3,
			fromZAxis: Vector3,
			toOrigin: Point3,
			toXAxis: Vector3,
			toYAxis: Vector3,
			toZAxis: Vector3,
		): Matrix3d;
		/**
		 * Sets this matrix to the identity matrix, and returns a reference to this
		 **/
		setToIdentity(): Matrix3d;
		/**
		 * Sets this matrix to the identity matrix, and returns a reference to this
		 **/
		setToIdentity(): Matrix3d;
		/**
		 * Sets this matrix to the product of matrix1 and matrix2, and returns a
		 **/
		setToProduct(matrix1: Matrix3d, matrix2: Matrix3d): Matrix3d;
		/**
		 * Sets this matrix to the matrix which is parallely projected onto the
		 **/
		setToProjection(projectionPlane: OdTvPlane, projectDir: Vector3): Matrix3d;
		/**
		 * Sets this matrix to the matrix which is rotated by a specified angle about
		 **/
		setToRotation(angle: number, axis: Vector3, center: Point3): Matrix3d;
		/**
		 * Sets any values within tol of 0 to 0.
		 **/
		validateZero(tol: OdGeTol): void;
		/**
		 * Sets this matrix to its transpose, and returns a reference to this matrix.
		 **/
		transposeIt(): Matrix3d;
		/**
		 * Returns the transpose of this matrix.
		 **/
		transpose(): Matrix3d;
		/**
		 * Sets the translation part of the matrix to the specified vector.
		 **/
		setTranslation(vect: Vector3): Matrix3d;
		/**
		 * Sets this matrix to the matrix which is scaled by a scale factor about the
		 **/
		setToScaling(scale: number, center: Point3): Matrix3d;
		set(row: number, col: number, value: number): any;
		/**
		 * Sets this matrix to the matrix which maps the WCS to the plane coordinate
		 **/
		setToWorldToPlane(normal: Vector3): Matrix3d;
		get(row: number, col: number): any;
		delete(): void;
	}

	/**
	 * The base interface class for the iterator of Visualize SDK entity objects.
	 **/
	class OdTvEntitiesIterator {
		/**
		 * Retrieves the entity that is currently referenced by the iterator object.
		 **/
		getEntity(): OdTvEntityId;
		/**
		 * Searches the entity defined through its identifier and moves the iterator to this entity if found.
		 **/
		seek(entityId: OdTvEntityId): boolean;
		/**
		 * Determines whether the traversal through the iterator was completed.
		 **/
		done(): boolean;
		/**
		 * Steps to the next value in the iterator object.
		 **/
		step(): boolean;
		delete(): void;
	}

	/**
	 * The base interface class for getting access to Visualize SDK model objects.
	 **/
	class TvModel {
		constructor();
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		/**
		 * Appends an entity object to the model and returns the identifier of the appended entity.
		 **/
		appendEntity(name: string): OdTvEntityId;
		/**
		 * Appends an insert entity object to the model and returns the identifier of the appended insert entity.
		 **/
		appendInsert(blockId: OdTvBlockId, name: string): OdTvEntityId;
		/**
		 * Appends a light object to the model and returns the identifier of the appended light object.
		 **/
		appendLight(name: string): OdTvEntityId;
		/**
		 * Appends a camera object to the model and returns the identifier of the appended camera object.
		 **/
		appendCamera(name: string): OdTvEntityId;
		/**
		 * Appends a camera object to the model and returns the identifier of the appended camera object.
		 **/
		appendCamera(name: string, bNeedSaveInFile: boolean): OdTvEntityId;
		/**
		 * Removes an entity object, specified by its identifier, from the model.
		 **/
		removeEntity(id: OdTvEntityId): void;
		/**
		 * Removes all entities that the model contains.
		 **/
		clearEntities(): void;
		/**
		 * Searches for an entity using an entity handle.
		 **/
		findEntity(handel: string): OdTvEntityId;
		/**
		 * Retrieves the current database handle associated with the object.
		 **/
		getDatabaseHandle(): string;
		/**
		 * Isolates a specified entity in the model.
		 **/
		isolate(id: OdTvEntityId, per_session: boolean): void;
		/**
		 * Isolates specified geometry (or a sub-entity) in the model.
		 **/
		isolateByGeometry(geometryId: OdTvGeometryDataId, per_session: boolean): void;
		/**
		 * Isolates objects in a selection set of the model.
		 **/
		isolateBySelectionSet(selectionSetPtr: OdTvSelectionSet, per_session: boolean): void;
		/**
		 * Hides a specified entity in the model.
		 **/
		hide(id: OdTvEntityId, per_session: boolean): void;
		/**
		 * Hides specified geometry (or a sub-entity) in descendants of the model.
		 **/
		hideByGeometry(geometryId: OdTvGeometryDataId, per_session: boolean): void;
		/**
		 * Hides objects in a selection set of descendants of the model.
		 **/
		hideBySelectionSet(selectionSetPtr: OdTvSelectionSet, per_session: boolean): void;
		/**
		 * Unisolates an entity in the model.
		 **/
		unIsolate(): void;
		/**
		 * Unisolates an entity in the model.
		 **/
		unIsolate(per_session: boolean): void;
		/**
		 * Retrieves the name of the model.
		 **/
		getName(): string;
		/**
		 * Sets the name of the model.
		 **/
		setName(name: string): void;
		/**
		 * Retrieves a smart pointer to the entities iterator.
		 **/
		getEntitiesIterator(): OdTvEntitiesIterator;
		/**
		 * Sets new extents for the model.
		 **/
		setExtents(ext: Extents3d): void;
		/**
		 * Retrieves the current extents of the specified type for the model.
		 **/
		getExtents(): Extents3d;
		/**
		 * Sets the selectability property value for the entity.
		 **/
		setSelectability(selectability: OdTvSelectabilityDef): void;
		/**
		 * Retrieves the current value of the selectability property for the entity.
		 **/
		getSelectability(): OdTvSelectabilityDef;
		/**
		 * Sets a new transformation matrix that can rotate, translate (move) and scale the whole model.
		 **/
		setModelingMatrix(matrix: Matrix3d, bFastMode: boolean): boolean;
		/**
		 * Applies fast transform to the entity.
		 **/
		setModelingMatrixToEntity(id: OdTvEntityId, transform: Matrix3d, bDoIt: boolean): boolean;
		/**
		 * Applies fast transform to the entity.
		 **/
		setModelingMatrixToEntities(entitiesSet: OdTvSelectionSet, transform: Matrix3d, bDoIt: boolean): boolean;
		/**
		 * Retrieves the current transformation matrix for the model.
		 **/
		getModelingMatrix(): any;
		/**
		 * Retrieves the current fast transformation matrix for the entity.
		 **/
		getModelingMatrixForEntity(id: OdTvEntityId): Matrix3d;
		/**
		 * Calculates and adds partial view indexes to the model.
		 **/
		addPartialViewIndex(bUpdateExisting: boolean, bExtendedMode: boolean): void;
		/**
		 * Extents model partial view indexes.
		 **/
		extendPartialViewIndex(id: OdTvEntityId): void;
		/**
		 * Returns true if the model has partial view index.
		 **/
		hasPartialViewIndex(bCheckExtents: boolean): boolean;
		/**
		 * Returns number of partially indexed items.
		 **/
		getPartialIndexedItemsCount(): number;
		/**
		 * Returns partial index extents.
		 **/
		getPartialIndexExtents(): Extents3d;
		/**
		 * Unhides a specified entity in the model.
		 **/
		unHide(entityId: OdTvEntityId, bApplyToChilds: boolean, bPerSession: boolean): OdTvResult;
		/**
		 * Unhides specified geometry (or a sub-entity) in descendants of the model.
		 **/
		unHideByGeometry(geometryId: OdTvGeometryDataId, bApplyToChilds: boolean, bPerSession: boolean): OdTvResult;
		/**
		 * Unhides objects in a selection set of descendants of the model.
		 **/
		unHideBySelectionSet(selectionSetPtr: OdTvSelectionSet, bApplyToChilds: boolean, bPerSession: boolean): OdTvResult;
		/**
		 * Sets the measuring units for this model.
		 **/
		setUnits(units: Units, userDefCoefToMeters: number): void;
		/**
		 * Returns the measuring units set for this model.
		 **/
		getUnits(): Units;
		/**
		 * Returns user defined coefficient to meters transform for this model.
		 **/
		getUnitsCoefToMeters(): number;
		/**
		 * Retrieves the units transformation matrix for the model. This matrix is present when the database drawing units is not equal to the model's units.
		 **/
		getUnitsMatrix(): Matrix3d;
		/**
		 * Inserts an entity object to the model after the 'prevEntityId' and returns the identifier of the inserted entity.
		 **/
		insertEntityAt(prevEntityId: OdTvEntityId, name: string): OdTvEntityId;
		/**
		 * Moves specified model object to the end of entities list.
		 **/
		moveToFront(entityId: OdTvEntityId): void;
		/**
		 * Moves specified model object to the beginning of entities list.
		 **/
		moveToBottom(entityId: OdTvEntityId): void;
		/**
		 * Moves specified model object after the 'prevEntityId' in entities list.
		 **/
		moveAfter(entityId: OdTvEntityId, prevEntityId: OdTvEntityId): void;
		/**
		 * Copies all model's data to a specified model (attributes, entities etc).
		 **/
		copyTo(targetModel: TvModel): void;
		/**
		 * Checks whether the entities in the model have visual styles set on them.
		 **/
		hasVisualStylesAtEntities(): any;
		/**
		 * Specifies whether this model's geometry should ignore the view's front and back clipping planes (if any) and viewport 3D clipping (if set).
		 **/
		setIgnore3DClipping(bIgnore: boolean): void;
		/**
		 * Checks whether view clipping override is enabled for this model object.
		 **/
		getIgnore3DClipping(): boolean;
		delete(): void;
	}

	/**
	 * The base interface class for a Visualize SDK entity identifier that allows access to an entity.
	 **/
	class OdTvEntityId {
		isNull(): boolean;
		/**
		 * Returns the type of an entity.
		 **/
		getType(): number;
		/**
		 * Returns the type of an entity.
		 **/
		getTypeEnum(): OdTvEntityType;
		/**
		 * Opens the entity determined with its identifier for a read or write operation.
		 **/
		openObject(): OdTvEntity;
		/**
		 * Opens the entity determined with its identifier as an <link OdTvInsert, OdTvInsert> object for a read or write operation.
		 **/
		openObjectAsInsert(): OdTvInsert;
		/**
		 * Opens the entity determined with its identifier as an <link OdTvLight, OdTvLight> object for a read or write operation.
		 **/
		openObjectAsLight(): OdTvLight;
		/**
		 * Opens the entity determined with its identifier as an <link OdTvCamera, OdTvCamera> object for a read or write operation.
		 **/
		openObjectAsCamera(): OdTvCamera;
		/**
		 * Retrieves the WCS extents of this entity (including models transformations)
		 **/
		getWCSExtents(): Extents3d;
		/**
		 * Returns the model in which this entity placed.
		 **/
		getOwnerModel(): TvModel;
		/**
		 * Returns the block in which this entity placed.
		 **/
		getOwnerBlockId(): OdTvBlockId;
		/**
		 * Returns the block in which this entity placed.
		 **/
		getOwnerBlock(): OdTvBlockPtr;
		delete(): void;
	}

	/**
	 * This is an abstract interface class for an insert (block reference) object.
	 **/
	class OdTvInsert {
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		/**
		 * Returns the ID of the block associated with this Insert.
		 **/
		getBlock(): OdTvBlockId;
		/**
		 * Sets the ID of the block associated with this Insert.
		 **/
		setBlock(blockId: OdTvBlockId): void;
		/**
		 * Returns the name of the insert.
		 **/
		getName(): string;
		/**
		 * Sets the name for the insert.
		 **/
		setName(sName: string): void;
		/**
		 * Appends an entity object and returns the appropriate ID.
		 **/
		appendSubEntity(name: string): OdTvEntityId;
		/**
		 * Returns the insertion point of this insert.
		 **/
		getPosition(): Point3;
		/**
		 * Sets the insertion point of this Insert.
		 **/
		setPosition(position: Point3): void;
		/**
		 * Sets the rotation angle to be applied to this Insert, in radians.
		 **/
		setRotation(angle: number): void;
		/**
		 * Returns the rotation angle applied to this Insert.
		 **/
		getRotation(): number;
		/**
		 * Returns the WCS normal to the plane of this Insert.
		 **/
		getNormal(): Vector3;
		/**
		 * Sets the WCS normal to the plane of this Insert.
		 **/
		setNormal(normal: Vector3): void;
		/**
		 * Returns the transformation matrix mapping a point in the MCS
		 **/
		getBlockTransform(): Matrix3d;
		/**
		 * Sets the transformation matrix mapping a point in the MCS
		 **/
		setBlockTransform(xfm: Matrix3d): void;
		/**
		 * Sets the color for this Insert
		 **/
		setColor(color: OdTvColorDef): void;
		/**
		 * Get the color of the Insert as rgb, inherited or index
		 **/
		getColor(): OdTvColorDef;
		/**
		 * Sets the content of the insert object selectable or non-selectable.
		 **/
		setContentsSelectable(bSelectable: boolean): void;
		/**
		 * Retrieves whether the content of the insert object is selectable or non-selectable.
		 **/
		getContentsSelectable(): boolean;
		/**
		 * Set the visibility property of the Insert
		 **/
		setVisibility(visible: boolean): void;
		/**
		 * Get the visibility property of the Insert
		 **/
		getVisibility(): boolean;
		/**
		 * Sets new extents to the insert object.
		 **/
		setExtents(ext: Extents3d): void;
		/**
		 * Retrieves the current extents of a specified type for the insert object.
		 **/
		getExtents(): any;
		/**
		 * Retrieves the current scale factors applied to the insert object.
		 **/
		getScaleFactors(): OdTvScale;
		/**
		 * Sets new scale factors to the insert object and applies them.
		 **/
		setScaleFactors(scale: OdTvScale): void;
		/**
		 * Retrieves the current database identifier associated with the object.
		 **/
		getHandle(): string;
		getNativeDatabaseHandle(): string;
		/**
		 * Sets a new layer for the insert object.
		 **/
		setLayer(layer: OdTvLayerId): void;
		/**
		 * Retrieves the current layer for the insert object.
		 **/
		getLayer(): OdTvLayerId;
		/**
		 * Retrieves a smart pointer to the entities iterator.
		 **/
		getSubEntitiesIterator(): OdTvEntitiesIterator;
		delete(): void;
	}

	/**
	 * The abstract interface class for a Visualize SDK light object.
	 **/
	class OdTvLight {
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		/**
		 * Sets a new name for the light object.
		 **/
		setName(name: string): void;
		/**
		 * Returns the name of the light.
		 **/
		getName(): string;
		/**
		 * Sets the light type of the light. Light type determines the way the lighting is illuminated.
		 **/
		setLightType(type: number): void;
		/**
		 * Returns the light type of the light.
		 **/
		getLightType(): number;
		/**
		 * Sets the light is on.
		 **/
		setOn(bValue: boolean): void;
		/**
		 * Returns true if light is on.
		 **/
		isOn(): boolean;
		/**
		 * Sets the color of the light.
		 **/
		setLightColor(color_val: any): void;
		/**
		 * Returns the color of the light.
		 **/
		getLightColor(): any;
		/**
		 * Sets the intensity for the light.
		 **/
		setIntensity(dIntensity: number): void;
		/**
		 * Returns intensity of the light.
		 **/
		getIntensity(): number;
		/**
		 * Sets a new position for the light object.
		 **/
		setPosition(pos: Point3): void;
		/**
		 * Retrieves the current light position.
		 **/
		getPosition(): Point3;
		/**
		 * Sets a new target for the light object.
		 **/
		setTargetLocation(newVal: Point3): void;
		/**
		 * Retrieves the current light target.
		 **/
		getTargetLocation(): Point3;
		/**
		 * Sets new hot-spot and fall-off angles for the light object.
		 **/
		setHotspotAndFalloff(dHotspot: number, dFalloff: number): void;
		/**
		 * Retrieves the current hot-spot angle for the light object.
		 **/
		getHotspotAngle(): number;
		/**
		 * Retrieves the current fall-off angle for the light object.
		 **/
		getFalloffAngle(): number;
		/**
		 * Sets a new light direction for the light object.
		 **/
		setLightDirection(lightvec: Vector3): void;
		/**
		 * Retrieves the current light direction of the light object.
		 **/
		getLightDirection(): Vector3;
		/**
		 * Sets a new glyph display type to the light object.
		 **/
		setGlyphDisplay(glyphType: GlyphDisplayType): void;
		/**
		 * Retrieves the current glyph display type of the light object.
		 **/
		getGlyphDisplay(): GlyphDisplayType;
		/**
		 * Sets new light attenuation parameters for the light object.
		 **/
		setLightAttenuation(params: OdTvLightAttenuation): void;
		/**
		 * Retrieves the current light attenuation parameters of the light object.
		 **/
		getLightAttenuation(): OdTvLightAttenuation;
		getHandle(): string;
		getNativeDatabaseHandle(): string;
		delete(): void;
	}

	/**
	 * The abstract class that provides an interface for the geometry data iterator object.
	 **/
	class OdTvGeometryDataIterator {
		/**
		 * Gets the geometry data currently referenced by the iterator.
		 **/
		getGeometryData(): OdTvGeometryDataId;
		/**
		 * Determines whether the traversal through the iterator was completed.
		 **/
		done(): boolean;
		/**
		 * Steps to the next value in the iterator object.
		 **/
		step(): boolean;
		/**
		 * Searches the entity defined through its identifier and moves the iterator to this entity if found.
		 **/
		seek(geometryDataId: OdTvGeometryDataId): boolean;
		delete(): void;
	}

	/**
	 * The abstract interface class for a Visualize SDK entity object.
	 **/
	class OdTvEntity {
		isNull(): boolean;
		/**
		 * Adds an image to the entity.
		 **/
		appendRasterImage(rId: OdTvRasterImageId, origin: Point3, u: Vector3, v: Vector3): OdTvGeometryDataId;
		/**
		 * Adds a simple line to the entity.
		 **/
		appendPolyline(arguments: any): OdTvGeometryDataId;
		/**
		 * Adds an unfilled circle to the entity.
		 **/
		appendCircle(firstPoint: Point3, secondPoint: Point3, thirdPoint: Point3): OdTvGeometryDataId;
		/**
		 * Adds an unfilled circle arc to the entity.
		 **/
		appendCircleArc(startPoint: Point3, middlePoint: Point3, endPoint: Point3): OdTvGeometryDataId;
		/**
		 * Adds a circle wedge to the entity.
		 **/
		appendCircleWedge(startPoint: Point3, middlePoint: Point3, endPoint: Point3): OdTvGeometryDataId;
		/**
		 * Adds an unfilled circle to the entity.
		 **/
		appendCircleWithNormal(center: Point3, radius: number, normal: Vector3): OdTvGeometryDataId;
		/**
		 * Adds an unfilled ellipse to the entity.
		 **/
		appendEllipse(centerPoint: Point3, majorPoint: Point3, minorPoint: Point3): OdTvGeometryDataId;
		/**
		 * Adds an unfilled elliptic arc to the entity.
		 **/
		appendEllipticArc(centerPoint: Point3, majorPoint: Point3, minorPoint: Point3, startAng: number, endAng: number): OdTvGeometryDataId;
		/**
		 * Adds an unfilled polygon to the entity.
		 **/
		appendPolygon(arguments: any): OdTvGeometryDataId;
		/**
		 * Adds a shell to the entity.
		 **/
		appendShell(points: any, faces: any): OdTvGeometryDataId;
		/**
		 * Adds a cylinder to the entity as a shell.
		 **/
		appendShellFromCylinder(point1: Point3, point2: Point3, radius: number): OdTvGeometryDataId;
		/**
		 * Adds a cylinder to the entity as a shell.
		 **/
		appendShellFromCylinder(points: any, radii: any, nDiv: number, capping: Capping): OdTvGeometryDataId;
		/**
		 * Adds a sphere to the entity as a shell.
		 **/
		appendShellFromSphere(center: Point3, radius: number, axis: Vector3, primeMeridian: Vector3): OdTvGeometryDataId;
		/**
		 * Adds a mesh to the entity.
		 **/
		appendMesh(nRows: number, nColumns: number, nVertices: number, vertices: any): OdTvGeometryDataId;
		/**
		 * Adds a sphere to the entity.
		 **/
		appendSphere(center: Point3, radius: number, axis: Vector3, primeMeridian: Vector3): OdTvGeometryDataId;
		/**
		 * Adds a cylinder to the entity.
		 **/
		appendCylinder(point1: Point3, point2: Point3, radius: number): OdTvGeometryDataId;
		/**
		 * Adds text to the entity.
		 **/
		appendText(ref_point: Point3, msg: string): OdTvGeometryDataId;
		/**
		 * Adds a NURBS to the entity.
		 **/
		appendNurbs(degree: number, controlPoints: any, weights: any, knots: any, start: number, end: number): OdTvGeometryDataId;
		/**
		 * Adds an infinite line to the entity.
		 **/
		appendInfiniteLine(first: Point3, second: Point3, ilt: InfiniteLineType): OdTvGeometryDataId;
		/**
		 * Adds a point cloud to the entity.
		 **/
		appendPointCloud(points: any): OdTvGeometryDataId;
		/**
		 * Adds a grid to the entity.
		 **/
		appendGrid(origin: Point3, firstPoint: Point3, secondPoint: Point3, firstCount: number, secondCount: number, type: GridDataType): OdTvGeometryDataId;
		/**
		 * Adds a plane colored area to the entity.
		 **/
		appendColoredShape(points: any, faces: any): OdTvGeometryDataId;
		/**
		 * Adds a subentity object and returns the appropriate ID.
		 **/
		appendSubEntity(name: string): OdTvGeometryDataId;
		/**
		 * Adds an insert object and returns the appropriate ID.
		 **/
		appendInsert(id_block: OdTvBlockId): OdTvGeometryDataId;
		/**
		 * Remove geometry data by the appropriate ID.
		 **/
		removeGeometryData(geomId: OdTvGeometryDataId): void;
		/**
		 * Clears geometries data.
		 **/
		clearGeometriesData(): void;
		/**
		 * Returns a smart pointer to an iterator object to get sequential access to the entity geometry data objects.
		 **/
		getGeometryDataIterator(): OdTvGeometryDataIterator;
		/**
		 * Rotates the entity around the X, Y and Z axes.
		 **/
		rotate(x: number, y: number, z: number): boolean;
		/**
		 * Rotates the entity around a specified arbitrary vector.
		 **/
		rotateAxis(aVector: Vector3, ang: number, center: Point3): boolean;
		/**
		 * Moves the entity geometry along the X, Y, Z axes.
		 **/
		translate(x: number, y: number, z: number): boolean;
		/**
		 * Scales the entity along the X, Y and Z axes using specified multipliers.
		 **/
		scale(x: number, y: number, z: number): boolean;
		/**
		 * Sets a new transformation matrix that can rotate, translate (move) and scale the entity.
		 **/
		setModelingMatrix(matrix: Matrix3d): boolean;
		/**
		 * Retrieves the current transformation matrix for the entity.
		 **/
		getModelingMatrix(): Matrix3d;
		/**
		 * Appends a new transformation matrix to the entity.
		 **/
		appendModelingMatrix(matrix: Matrix3d): boolean;
		/**
		 * Sets the name for the entity.
		 **/
		setName(sName: string): boolean;
		/**
		 * Retrieves the current name of the entity.
		 **/
		getName(): string;
		/**
		 * Marks the entity for one regeneration.
		 **/
		regen(): void;
		/**
		 * Sets the auto regeneration flag value.
		 **/
		setAutoRegen(bOn: boolean): void;
		/**
		 * Retrieves the current value of the auto regeneration flag.
		 **/
		getAutoRegen(): boolean;
		/**
		 * Sets the target display mode for the entity.
		 **/
		setTargetDisplayMode(targetMode: number): void;
		/**
		 * Sets the target display mode for the entity.
		 **/
		setTargetDisplayModeE(targetMode: TargetDisplayMode): void;
		/**
		 * Retrieves the current target display mode for the entity.
		 **/
		getTargetDisplayMode(): number;
		/**
		 * Retrieves the current target display mode for the entity.
		 **/
		getTargetDisplayModeE(): TargetDisplayMode;
		/**
		 * Sets new extents for the entity.
		 **/
		setExtents(ext: Extents3d): void;
		/**
		 * Retrieves the current extents of the specified type for the entity.
		 **/
		getExtents(): Extents3d;
		/**
		 * Searches for a sub-entity using its handler.
		 **/
		findSubEntity(handle: string): OdTvGeometryDataId;
		/**
		 * Retrieves the current database handle associated with the object.
		 **/
		getDatabaseHandle(): string;
		/**
		 * Get native database handle
		 **/
		getNativeDatabaseHandle(): string;
		/**
		 * Adds a box to the entity as a shell.
		 **/
		appendShellFromBox(centerPt: Point3, dLength: number, dWidth: number, dHeight: number, baseNormal: Vector3, lengthDir: Vector3): OdTvGeometryDataId;
		/**
		 * Adds a box to the entity.
		 **/
		appendBox(centerPt: Point3, dLength: number, dWidth: number, dHeight: number, baseNormal: Vector3, lengthDir: Vector3): OdTvGeometryDataId;
		/**
		 * Add view in which entity will be drawn
		 **/
		addViewDependency(viewId: View): void;
		/**
		 * Remove the view from the views in which the entity should be drawn
		 **/
		removeViewDependency(viewId: View): void;
		/**
		 * Remove any view dependencies which means that the entity will be drawn in all views
		 **/
		removeViewDependencies(): void;
		/**
		 * Checks that the entity is view dependent (means should be drawn in the specified views)
		 **/
		isViewDependent(): boolean;
		/**
		 * Returns the views in which this entity should be drawn
		 **/
		getViewDependencies(): Viewports;
		/**
		 * Copies all entity's data to a specified entity (attributes, geometries etc).
		 **/
		copyTo(targetEntityId: OdTvEntityId): void;
		/**
		 * Copies all entity's geometry to a specified entity
		 **/
		copyGeometryTo(targetEntityId: OdTvEntityId): void;
		setColor(r: number, g: number, b: number): void;
		/**
		 * Sets a new color for the entity or for the specified geometry type in the entity.
		 **/
		setColor(color: OdTvColorDef, geomType: GeometryTypes): void;
		/**
		 * Retrieves the current color of the entity or of the specified geometry type in the entity.
		 **/
		getColor(geomType: GeometryTypes): OdTvColorDef;
		setLineWeight(weight: number): void;
		/**
		 * Sets the lineweight value for the whole entity or the specified geometry type in the entity.
		 **/
		setLineWeight(lw: OdTvLineWeightDef, geomType: number): void;
		/**
		 * Retrieves the current lineweight of the entity or of the specified geometry type in the entity.
		 **/
		getLineWeight(geomType: GeometryTypes): OdTvLineWeightDef;
		/**
		 * Sets the linetype value for the whole entity or the the specified geometry type in the entity.
		 **/
		setLinetype(lt: OdTvLinetypeDef, geomType: GeometryTypes): void;
		/**
		 * Retrieves the current linetype of the entity or of the specified geometry type in the entity.
		 **/
		getLinetype(geomType: GeometryTypes): OdTvLinetypeDef;
		/**
		 * Retrieves the current linetype scale of the entity or of the specified geometry type in the entity.
		 **/
		getLinetypeScale(geomType: GeometryTypes): number;
		/**
		 * Sets the linetype scale value for the whole entity or the specified geometry type in the entity.
		 **/
		setLinetypeScale(linetypeScale: number, geomType: number): void;
		/**
		 * Sets a new layer object for the whole entity or the specified geometry type in the entity.
		 **/
		setLayer(layer: OdTvLayerId, geomType: GeometryTypes): void;
		/**
		 * Sets a new layer object for the whole entity or the specified geometry type in the entity.
		 **/
		setLayer(layer: OdTvLayerId): void;
		/**
		 * Retrieves the layer for the entity or for the specified geometry type in the entity.
		 **/
		getLayer(geomType: GeometryTypes): OdTvLayerId;
		/**
		 * Retrieves the layer for the entity or for the specified geometry type in the entity.
		 **/
		getLayer(): OdTvLayerId;
		/**
		 * Set the visibility property value for the whole entity or for the specified geometry type in the entity.
		 **/
		setVisibility(visible: OdTvVisibilityDef, geomType: GeometryTypes): void;
		/**
		 * Retrieves the visibility property value for the entity or for the specified geometry type in the entity.
		 **/
		getVisibility(geomType: GeometryTypes): OdTvVisibilityDef;
		/**
		 * Retrieves the visibility property value for the entity or for the specified geometry type in the entity.
		 **/
		getVisibility(): OdTvVisibilityDef;
		/**
		 * Sets a text style for all text objects that the entity contains.
		 **/
		setTextStyle(textStyle: OdTvTextStyleDef): void;
		/**
		 * Retrieves the text style of all text objects that the entity contains.
		 **/
		getTextStyle(): OdTvTextStyleDef;
		/**
		 * Sets the transparency property value for the entity or for the specified geometry type in the entity.
		 **/
		setTransparency(transparency: OdTvTransparencyDef, geomType: GeometryTypes): void;
		/**
		 * Retrieves the transparency property value for the entity or for the specified geometry type in the entity.
		 **/
		getTransparency(geomType: GeometryTypes): OdTvTransparencyDef;
		/**
		 * Sets the material for the entity.
		 **/
		setMaterial(material: OdTvMaterialDef): void;
		/**
		 * Retrieves the current material applied to the entity.
		 **/
		getMaterial(): OdTvMaterialDef;
		/**
		 * Sets a material mapper for the entity. The material mapper is used to map the materials.
		 **/
		setMaterialMapper(mapper: OdTvMapperDef): void;
		/**
		 * Retrieves the current material mapper definition that is applied to the entity.
		 **/
		getMaterialMapper(): OdTvMapperDef;
		/**
		 * Sets a new visual style for the entity. The visual style should be compatible with the visual style assigned to the view.
		 **/
		setVisualStyle(vsId: OdTvVisualStyleId): void;
		/**
		 * Retrieves the current visual style applied to the entity.
		 **/
		getVisualStyle(): OdTvVisualStyleId;
		/**
		 * Sets the selectability property value for the entity.
		 **/
		setSelectability(selectability: OdTvSelectabilityDef): void;
		/**
		 * Retrieves the current value of the selectability property for the entity.
		 **/
		getSelectability(): OdTvSelectabilityDef;
		/**
		 * Sets the sectionable property to the entity. This mean, that all geometry in this entity can be cut via cutting plane.
		 **/
		setSectionable(bVal: boolean): void;
		/**
		 * Returns the number of geometries in this entity
		 **/
		getNumGeometries(bRecursive: boolean, bIgnoreSubentityItself: boolean): number;
		/**
		 * Sets that it is need to show normals for all shell objects in this entity.
		 **/
		setShowShellNormals(bShow: boolean, normalsLength: number, normalsColor: OdTvRGBColorDef): void;
		/**
		 * Returns true if normals are visible for each shell inside the entity.
		 **/
		getShowShellNormals(): boolean;
		/**
		 * Sets that it is need to show sharp edges for all shell objects in this entity.
		 **/
		setShowShellSharpEdges(bShow: boolean, edgesWidth: number, edgesColor: OdTvRGBColorDef): void;
		/**
		 * Returns true if shell sharp edges are visible.
		 **/
		getShowShellSharpEdges(): boolean;
		/**
		 * Checks that entity content is suitable for section filling.
		 **/
		checkForSectionFilling(tolerance: OdGeTol): EntityFillingCheckResult;
		/**
		 * Checks that entity content is suitable for section filling.
		 **/
		checkForSectionFilling(): EntityFillingCheckResult;
		/**
		 * Repairs entity content for section filling.
		 **/
		fixForSectionFilling(res: EntityFillingCheckResult, tolerance: OdGeTol): void;
		/**
		 * Repairs entity content for section filling.
		 **/
		fixForSectionFilling(res: EntityFillingCheckResult): void;
		/**
		 * Removes a sub-entity and replaces it with its children's geometries.
		 **/
		removeSubEntity(geomId: OdTvGeometryDataId, bRemoveOnlyWithSingleChild: boolean): void;
		/**
		 * Specifies whether the entity geometry is excluded from view extents.
		 **/
		setExcludeFromViewExtents(bExclude: boolean): void;
		/**
		 * Checks whether the entity geometry is excluded from view extents.
		 **/
		getExcludeFromViewExtents(): boolean;
		/**
		 * Sets the flag which indicates that the visual style from the entity should be ignored.
		 **/
		setIgnoreVisualStyle(bIgnore: boolean, bMarkForRegen: boolean): void;
		/**
		 * Retrieves the current value of the flag which indicates that the visual style from the entity should be ignored.
		 **/
		getIgnoreVisualStyle(): boolean;
		/**
		 * Specifies whether the entity should calculate and visualize shell's isolines.
		 **/
		setCalculateIsolinesForShells(bSet: boolean, creaseAngle: number, bImmediateCalculation: boolean): void;
		/**
		 * Checks whether the entity should calculate and visualize shell's isolines.
		 **/
		getCalculateIsolinesForShells(): any;
		delete(): void;
	}

	/**
	 * The interface class for a geometry object identifier that allows access to the <link OdTvGeometryData, OdTvGeometryData> object.
	 **/
	class OdTvGeometryDataId {
		/**
		 * Returns the type of the geometry data.
		 **/
		getType(): number;
		/**
		 * Retrieves the current type of the geometry data.
		 **/
		getTypeEnum(): OdTvGeometryDataType;
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		/**
		 * Checks whether the link object specified with the identifier refers to a valid object or not.
		 **/
		isValid(): boolean;
		/**
		 * Returns the smart ptr to the OdTvEntityData object smart ptr.
		 **/
		openObject(): OdTvGeometryData;
		/**
		 * Returns the smart ptr to the 'OdTvPolylineData' object if the data has the appropriate type.
		 **/
		openAsPolyline(): OdTvPolylineData;
		/**
		 * Returns the smart ptr to the 'OdTvCircleData' object if the data has the appropriate type.
		 **/
		openAsCircle(): OdTvCircleData;
		/**
		 * Returns the smart ptr to the 'OdTvCircleArcData' object if the data has the appropriate type.
		 **/
		openAsCircleArc(): OdTvCircleArcData;
		/**
		 * Returns the smart ptr to the 'OdTvCircleWedgeData' object if the data has the appropriate type.
		 **/
		openAsCircleWedge(): OdTvCircleWedgeData;
		/**
		 * Returns the smart ptr to the 'OdTvEllipseData' object if the data has appropriate type
		 **/
		openAsEllipse(): OdTvEllipseData;
		/**
		 * Returns the smart ptr to the 'OdTvEllipticArcData' object if the data has the appropriate type.
		 **/
		openAsEllipticArc(): OdTvEllipticArcData;
		/**
		 * Returns the smart ptr to the 'OdTvPolygonData' object if the data has the appropriate type.
		 **/
		openAsPolygon(): OdTvPolygonData;
		/**
		 * Returns the smart ptr to the 'OdTvShellData' object if the data has the appropriate type.
		 **/
		openAsShell(): OdTvShellData;
		/**
		 * Returns the smart ptr to the 'OdTvMeshData' object if the data has the appropriate type.
		 **/
		openAsMesh(): OdTvMeshData;
		/**
		 * Returns the smart ptr to the 'OdTvSphereData' object if the data has the appropriate type.
		 **/
		openAsSphere(): OdTvSphereData;
		/**
		 * Returns the smart ptr to the 'OdTvCylinderData' object if the data has the appropriate type.
		 **/
		openAsCylinder(): OdTvCylinderData;
		/**
		 * Returns the smart ptr to the 'OdTvTextData' object if the data has the appropriate type.
		 **/
		openAsText(): OdTvTextData;
		/**
		 * Returns the smart ptr to the 'OdTvNurbsData' object if the data has the appropriate type.
		 **/
		openAsNurbs(): OdTvNurbsData;
		/**
		 * Returns the smart ptr to the 'OdTvInfiniteLineData' object if the data has the appropriate type.
		 **/
		openAsInfiniteLine(): OdTvInfiniteLineData;
		/**
		 * Returns the smart ptr to the 'OdTvRasterImageData' object if the data has the appropriate type.
		 **/
		openAsRasterImage(): OdTvRasterImageData;
		/**
		 * Returns the smart ptr to the 'OdTvpointCloudData' object if the data has the appropriate type.
		 **/
		openAsPointCloud(): OdTvPointCloudData;
		/**
		 * Returns the smart ptr to the 'OdTvColoredShape' object if the data has the appropriate type.
		 **/
		openAsColoredShape(): OdTvColoredShapeData;
		/**
		 * Returns the smart ptr to the 'OdTvInsertData' object if the data has the appropriate type.
		 **/
		openAsInsert(): OdTvInsertData;
		/**
		 * Returns the smart ptr to the 'OdTvEntity' object if the data has the appropriate type.
		 **/
		openAsSubEntity(): OdTvEntity;
		/**
		 * Returns the smart ptr to the 'OdTvBoxData' object if the data has the appropriate type.
		 **/
		openAsBox(): OdTvBoxData;
		/**
		 * Returns the smart ptr to the 'OdTvGrid' object if the data has the appropriate type.
		 **/
		openAsGrid(): OdTvGridData;
		delete(): void;
	}

	class OdTvBlockPtr {
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		appendEntity(name: string): OdTvEntityId;
		/**
		 * Appends a light entity object and returns the appropriate ID
		 **/
		appendLight(name: string): OdTvEntityId;
		/**
		 * Remove an entity object with the given ID
		 **/
		removeEntity(id: OdTvEntityId): void;
		/**
		 * Remove all entities
		 **/
		clearEntities(): void;
		/**
		 * Returns the iterator object for accessing objects that the block contains.
		 **/
		getEntitiesIterator(): OdTvEntitiesIterator;
		/**
		 * Returns the name of the model
		 **/
		getName(): string;
		/**
		 * Creates an insert entity object and appends it to the block.
		 **/
		appendInsert(blockId: OdTvBlockId, name: string): OdTvEntityId;
		/**
		 * Sets extents for the block.
		 **/
		setExtents(ext: Extents3d): OdTvResult;
		/**
		 * Retrieves the specified type of the block's extents.
		 **/
		getExtents(eType: ExtentsType): Extents3d;
		/**
		 * Finds an entity by name.
		 **/
		findEntity(h: string): OdTvEntityId;
		/**
		 * Retrieves the statistics for the block.
		 **/
		getStatistic(): OdTvGeometryStatistic;
		/**
		 * Calculates and adds partial view index to the block.
		 **/
		addPartialViewIndex(bUpdateExisting: boolean): OdTvResult;
		/**
		 * Extents model partial view indexes.
		 **/
		extendPartialViewIndex(id: OdTvEntityId): void;
		/**
		 * Returns true if the model has partial view index
		 **/
		hasPartialViewIndex(bCheckExtents: boolean): boolean;
		/**
		 * Sets the selectability property value for the block.
		 **/
		setSelectability(selectability: OdTvSelectabilityDef): OdTvResult;
		/**
		 * Retrieves the current selectability property value for the block.
		 **/
		getSelectability(): OdTvSelectabilityDef;
		/**
		 * Sets the contents selectable property value for the all inserts in block.
		 **/
		setInsertsContentsSelectable(bValue: boolean): OdTvResult;
		/**
		 * Retrieves the current database handle associated with the object.
		 **/
		getDatabaseHandle(): string;
		/**
		 * Get native database handle
		 **/
		getNativeDatabaseHandle(): string;
		delete(): void;
	}

	/**
	 * This class defines the interface for a block identifier object. The identifier allows access to an <link OdTvBlock, OdTvBlock> object.
	 **/
	class OdTvBlockId {
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		/**
		 * Returns the smart ptr to the OdTvModel object smart ptr
		 **/
		openObject(): OdTvBlockPtr;
		delete(): void;
	}

	/**
	 * This is an interface class for an OdTvTextData object.
	 **/
	class OdTvInsertData {
		isNull(): boolean;
		/**
		 * Returns the ID of the block associated with this Insert.
		 **/
		getBlock(): OdTvBlockId;
		/**
		 * Sets the ID of the block associated with this Insert.
		 **/
		setBlock(blockId: OdTvBlockId): void;
		delete(): void;
	}

	/**
	 * This is an interface class for an OdTvColoredShapeData object.
	 **/
	class OdTvColoredShapeData {
		isNull(): boolean;
		/**
		 * Set the geometry data of the plane colored area
		 **/
		set(verticesArray: any, faces: any): void;
		/**
		 * Sets the vertices colors of a plane's colored area.
		 **/
		setVertexColors(colors: any): void;
		/**
		 * Sets true if and only if the countour should be drawn
		 **/
		setDrawContour(bDraw: boolean): void;
		/**
		 * Get the geometry data of the plane colored area
		 **/
		get(): any;
		/**
		 * Get the vertices color of the plane colored area
		 **/
		getVertexColors(colors: any): void;
		/**
		 * Returns true if and only if the countour should be drawn
		 **/
		getDrawContour(): boolean;
		/**
		 * Sets edge visibility of a plane's colored area.
		 **/
		setEdgesVisibilities(visibilities: any): boolean;
		/**
		 * Returns the number of vertices in the plane colored area
		 **/
		getVerticesCount(): number;
		/**
		 * Retrieves the quantity of edges in a plane's colored area.
		 **/
		getEdgesCount(): number;
		/**
		 * Retrieves the quantity of faces in a plane's colored area.
		 **/
		getFacesCount(): number;
		/**
		 * Specifies whether this object should be involved in face processing as solid object representation.
		 **/
		setSolid(bSolid: boolean): void;
		/**
		 * Checks whether this object should be involved in face processing as solid object representation.
		 **/
		getSolid(): boolean;
		delete(): void;
	}

	/**
	 * This is an interface class for manipulating Visualize grid geometry data.
	 **/
	class OdTvGridData {
		isNull(): boolean;
		/**
		 * * Returns the Grid parameters
		 **/
		get(): any;
		/**
		 * Retrieves minor parameters of the grid.
		 **/
		getMinorGridParams(): any;
		/**
		 * Sets the Grid parameters
		 **/
		set(origin: Point3, firstPoint: Point3, secondPoint: Point3, firstCount: number, secondCount: number, type: number): void;
		/**
		 * Sets the origin point
		 **/
		setOrigin(origin: Point3): void;
		/**
		 * Returns the origin point
		 **/
		getOrigin(): Point3;
		/**
		 * Sets the first point
		 **/
		setFirstPoint(firstPoint: Point3): void;
		/**
		 * Returns the first point
		 **/
		getFirstPoint(): Point3;
		/**
		 * Sets the second point
		 **/
		setSecondPoint(secondPoint: Point3): void;
		/**
		 * Returns the second point
		 **/
		getSecondPoint(): Point3;
		/**
		 * Sets the count of units along first axis
		 **/
		setFirstCount(firstCount: number): void;
		/**
		 * Returns the count of units along first axis
		 **/
		getFirstCount(): number;
		/**
		 * Sets the count of units along second axis
		 **/
		setSecondCount(secondCount: number): void;
		/**
		 * Returns the count of units along second axis
		 **/
		getSecondCount(): number;
		/**
		 * Sets the type of Grid
		 **/
		setType(type: number): void;
		/**
		 * Returns the type of Grid
		 **/
		getType(): number;
		/**
		 * Sets the style of Grid
		 **/
		setStyle(type: GridDataStyle): void;
		/**
		 * Returns the style of Grid
		 **/
		getStyle(): number;
		/**
		 * Sets the crosses size
		 **/
		setCrossesSize(size: number): void;
		/**
		 * Returns the size of crosses
		 **/
		getCrossesSize(): number;
		/**
		 * Sets the parameters of the grid
		 **/
		setMinorGridParams(isEnable: boolean, minorColor: any, xDivide: number, yDivide: number): void;
		/**
		 * Sets the minimal area of the grid cell when it is still drawn (in thousandths of a percent)
		 **/
		setMinDrawCellArea(cellAreaRate: number): void;
		/**
		 * Returns the minimal area of the grid cell when it is still drawn (in thousandths of a percent)
		 **/
		getMinDrawCellArea(): number;
		delete(): void;
	}

	/**
	 * This is an interface class for an OdTvRasterImageData object.
	 **/
	class OdTvRasterImageData {
		isNull(): boolean;
		/**
		 * Sets the Object ID of the OdDbRasterImageDef object associated with this raster image entity (DXF 340).
		 **/
		setImageId(imageId: OdTvRasterImageId): void;
		/**
		 * Sets the orientation and origin of this raster image data.
		 **/
		setOrientation(origin: Point3, u: Vector3, v: Vector3): void;
		/**
		 * Sets the clip boundary for this raster image data.
		 **/
		setClipBoundary(clipPoints: any): void;
		/**
		 * Returns the clip boundary for this raster image data.
		 **/
		getClipBoundary(clipPoints: any): void;
		/**
		 * Returns the clipping state for this raster image data.
		 **/
		getClipped(): boolean;
		/**
		 * Sets the ClipInverted flag value for this raster image data.
		 **/
		setClipInverted(val: boolean): void;
		/**
		 * Returns the ClipInverted flag value for this raster image data.
		 **/
		getClipInverted(): boolean;
		/**
		 * Sets the brightness value for this raster image data.
		 **/
		setBrightness(brightness: number): void;
		/**
		 * Returns the brightness value for this raster image data.
		 **/
		getBrightness(): number;
		/**
		 * Sets the contrast value for this raster image data.
		 **/
		setContrast(contrast: number): void;
		/**
		 * Returns the contrast value for this raster image data.
		 **/
		getContrast(): number;
		/**
		 * Sets the fade value for this raster image data.
		 **/
		setFade(fade: number): void;
		/**
		 * Returns the fade value for this raster image data.
		 **/
		getFade(): number;
		/**
		 * Returns the size in pixels of this raster image data.
		 **/
		getImageSize(): Vector3;
		/**
		 * Sets the background color for this raster image data if it is monochrome.
		 **/
		setMonochromeBackgroundColor(backgroundColor: any): void;
		/**
		 * Returns the background color for this raster image data.
		 **/
		getMonochromeBackgroundColor(): any;
		delete(): void;
	}

	/**
	 * This is an interface class for an OdTvInfiniteLineData object.
	 **/
	class OdTvInfiniteLineData {
		isNull(): boolean;
		/**
		 * Retrieves the start and end points of the infinite line.
		 **/
		get(): any;
		/**
		 * Set the start and end points
		 **/
		set(startPoint: Point3, endPoint: Point3): void;
		/**
		 * Set the start point
		 **/
		setFirst(firstPoint: Point3): void;
		/**
		 * Set the second point
		 **/
		setSecond(secondPoint: Point3): void;
		/**
		 * Set type of line (ray or line)
		 **/
		setType(ilt: number): void;
		/**
		 * Get the start point
		 **/
		getFirst(): Point3;
		/**
		 * Get the second point
		 **/
		getSecond(): Point3;
		/**
		 * Get type of line (ray or xline)
		 **/
		getType(): number;
		delete(): void;
	}

	/**
	 * This is an interface class for an OdTvNurbsData object.
	 **/
	class OdTvNurbsData {
		isNull(): boolean;
		/**
		 * Set degree, control points, weights, knots, start and end parameters of the nurbs
		 **/
		set(degree: number, controlPoints: any, weights: any, knots: any, start: number, end: number): void;
		/**
		 * Replace control points of the nurbs starting with startPos
		 **/
		editControlPoints(startPos: number, controlPoints: any): void;
		/**
		 * Replace weights of the nurbs starting with startPos
		 **/
		editWeights(startPos: number, weights: any): void;
		/**
		 * Replace knots of the nurbs starting with startPos
		 **/
		editKnots(startPos: number, knots: any): void;
		/**
		 * Set the start and end parameters of the nurbs
		 **/
		setStartEnd(start: number, end: number): void;
		/**
		 * Get the degree of the nurbs
		 **/
		getDegree(): number;
		/**
		 * Get the control points of the nurbs
		 **/
		getControlPoints(): any;
		/**
		 * Get the weights of the nurbs
		 **/
		getWeights(): any;
		/**
		 * Get the knots of the nurbs
		 **/
		getKnots(): any;
		/**
		 * Set the thickness of the nurbs
		 **/
		setThickness(thickness: number, bFilled: boolean): void;
		delete(): void;
	}

	/**
	 * This is an interface class for an OdTvEllipseData object.
	 **/
	class OdTvEllipseData {
		isNull(): boolean;
		/**
		 * Retrieves the center, major and minor points of the ellipse.
		 **/
		get(): any;
		/**
		 * Set the three points on the circumference of the ellipse
		 **/
		set(centerPoint: Point3, majorPoint: Point3, minorPoint: Point3): void;
		/**
		 * Set the center point on the circumference of the ellipse
		 **/
		setCenter(centerPoint: Point3): void;
		/**
		 * Set the major point on the circumference of the ellipse
		 **/
		setMajor(majorPoint: Point3): void;
		/**
		 * Set the minor point on the circumference of the ellipse
		 **/
		setMinor(minorPoint: Point3): void;
		/**
		 * Returns the center point to the plane of the ellipse
		 **/
		getCenter(): Point3;
		/**
		 * Returns the major point to the plane of the ellipse
		 **/
		getMajor(): Point3;
		/**
		 * Returns the minor point to the plane of the ellipse
		 **/
		getMinor(): Point3;
		/**
		 * Set that ellipse should be filled-in (or not)
		 **/
		setFilled(bFilled: boolean): void;
		/**
		 * Returns the filled state of the ellipse
		 **/
		getFilled(): boolean;
		/**
		 * Set the thickness of the ellipse
		 **/
		setThickness(thickness: number): void;
		/**
		 * Returns the thickness of the ellipse
		 **/
		getThickness(): number;
		delete(): void;
	}

	/**
	 * This is an interface class for an OdTvCircleWedgeData object
	 **/
	class OdTvCircleWedgeData {
		isNull(): boolean;
		/**
		 * Retrieves three points of the circle wedge: start, middle and end points.
		 **/
		get(): any;
		/**
		 * Sets the three points on the circumference of the circle wedge.
		 **/
		set(startPoint: Point3, middlePoint: Point3, endPoint: Point3): void;
		/**
		 * Set the start point for this wedge
		 **/
		setStart(start: Point3): void;
		/**
		 * Set the meddle point for this wedge
		 **/
		setMiddle(middle: Point3): void;
		/**
		 * Set the end point for this wedge
		 **/
		setEnd(end: Point3): void;
		/**
		 * Get the start point of this wedge
		 **/
		getStart(): Point3;
		/**
		 * Get the middle point of this wedge
		 **/
		getMiddle(): Point3;
		/**
		 * Get the end point of this wedge
		 **/
		getEnd(): Point3;
		/**
		 * Set that wedge should be filled-in (or not)
		 **/
		setFilled(bFilled: boolean): void;
		/**
		 * Returns the filled state of the wedge
		 **/
		getFilled(): boolean;
		/**
		 * Set the thickness of the wedge
		 **/
		setThickness(thickness: number): void;
		/**
		 * Returns the thickness of the wedge
		 **/
		getThickness(): number;
		delete(): void;
	}

	/**
	 * This is an interface class for an OdTvCircleArcData object.
	 **/
	class OdTvCircleArcData {
		isNull(): boolean;
		/**
		 * Retrieves three points of the circle arc.
		 **/
		get(): any;
		/**
		 * Sets three points on the circumference of the circle arc.
		 **/
		set(startPoint: Point3, middlePoint: Point3, endPoint: Point3): void;
		/**
		 * Set the start point on the circumference of the circle arc
		 **/
		setStart(startPoint: Point3): void;
		/**
		 * Set the middle point on the circumference of the circle arc
		 **/
		setMiddle(middlePoint: Point3): void;
		/**
		 * Set the end point on the circumference of the circle arc
		 **/
		setEnd(endPoint: Point3): void;
		/**
		 * Returns the start point to the plane of the circle arc
		 **/
		getStart(): Point3;
		/**
		 * Returns the middle point to the plane of the circle arc
		 **/
		getMiddle(): Point3;
		/**
		 * Returns the end point to the plane of the circle arc
		 **/
		getEnd(): Point3;
		/**
		 * Set that circle should be filled-in (or not)
		 **/
		setFilled(bFilled: boolean): void;
		/**
		 * Returns the filled state of the circle
		 **/
		getFilled(): boolean;
		/**
		 * Set the thickness of the circle
		 **/
		setThickness(thickness: number): void;
		/**
		 * Returns the thickness of the circle
		 **/
		getThickness(): number;
		delete(): void;
	}

	/**
	 * This is an interface class for an OdTvCircleData object
	 **/
	class OdTvCircleData {
		isNull(): boolean;
		/**
		 * Sets three points on the circumference of the circle arc.
		 **/
		set(center: Point3, radius: number, normal: Vector3): void;
		/**
		 * Set the center point for this circle
		 **/
		setCenter(center: Point3): void;
		/**
		 * Set the normal vector for this circle
		 **/
		setNormal(normal: Vector3): void;
		/**
		 * Set the radius for this circle
		 **/
		setRadius(radius: number): void;
		/**
		 * Get the center point of this circle
		 **/
		getCenter(): Point3;
		/**
		 * Get the normal vector of this circle
		 **/
		getNormal(): Vector3;
		/**
		 * Get the radius of this circle
		 **/
		getRadius(): number;
		/**
		 * Set that circle should be filled-in (or not)
		 **/
		setFilled(bFilled: boolean): void;
		/**
		 * Returns the filled state of the circle
		 **/
		getFilled(): boolean;
		/**
		 * Set the thickness of the circle
		 **/
		setThickness(thickness: number): void;
		/**
		 * Returns the thickness of the circle
		 **/
		getThickness(): number;
		delete(): void;
	}

	/**
	 * This is an interface class for an OdTvPolylineData object.
	 **/
	class OdTvPolylineData {
		isNull(): boolean;
		/**
		 * Replace the points of this Polyline with the specified points
		 **/
		setPoints2(start: Point3, end: Point3): void;
		/**
		 * Replace the points of this Polyline with the specified points
		 **/
		setPoints(pointArray: any): void;
		/**
		 * Returns the number of points in this Polyline
		 **/
		getPointsCount(): number;
		/**
		 * Returns the points of this Polyline
		 **/
		getPoints(): any;
		/**
		 * Set the normal vector for this polyline
		 **/
		setNormal(normal: Vector3): void;
		/**
		 * Get the normal vector of this polyline
		 **/
		getNormal(): Vector3;
		/**
		 * Set the thickness of the polyline
		 **/
		setThickness(thickness: number, bFilled: boolean): void;
		delete(): void;
	}

	/**
	 * This is an interface class for manipulating Visualize geometry data.
	 **/
	class OdTvGeometryData {
		isNull(): boolean;
		/**
		 * Returns the type of the geometry data
		 **/
		getType(): number;
		/**
		 * Retrieves the current type of the geometry data.
		 **/
		getTypeEnum(): OdTvGeometryDataType;
		setColor(color: OdTvColorDef, type: GeometryTypes): boolean;
		/**
		 * Set the color of the geometry data
		 **/
		setColor(r: number, g: number, b: number): void;
		/**
		 * Get the color of the geometry data as rgb, inherited or index
		 **/
		getColor(): any;
		/**
		 * Sets the linetype scale of the geometry data.
		 **/
		setLinetypeScale(linetypeScale: number): void;
		/**
		 * Get the linetype scale of the geometry data
		 **/
		getLinetypeScale(): number;
		/**
		 * Join rotation matrix to this matrix that rotates geometry around the X, Y and Z axes.
		 **/
		rotate(x: number, y: number, z: number): void;
		/**
		 * Join rotation matrix to this matrix with rotation around an arbitrary vector by number of degrees
		 **/
		rotateAxis(aVector: Vector3, ang: number, center: Point3): void;
		/**
		 * Join translation matrix to this matrix that moves geometry along X, Y, Z axis
		 **/
		translate(x: number, y: number, z: number): void;
		/**
		 * Join scale matrix to this matrix that scales multiplier along X, Y, Z axis
		 **/
		scale(x: number, y: number, z: number): void;
		/**
		 * Set the transform matrix which can rotate, transform and scale the entity
		 **/
		setModelingMatrix(matrix: Matrix3d): void;
		/**
		 * Get the transform matrix which can rotate, transform and scale the entity
		 **/
		getModelingMatrix(): Matrix3d;
		/**
		 * Multiply existing transform matrix by new matrix
		 **/
		appendModelingMatrix(matrix: Matrix3d): void;
		/**
		 * Retrieves the parent entity of the geometry data
		 **/
		getParentEntity(): OdTvEntityId;
		/**
		 * Sets a new lineweight of the geometry data.
		 **/
		setLineWeight(lw: OdTvLineWeightDef): void;
		/**
		 * Retrieves the current lineweight of the geometry data.
		 **/
		getLineWeight(): OdTvLineWeightDef;
		/**
		 * Sets the linetype of the geometry data.
		 **/
		setLinetype(lt: OdTvLinetypeDef): void;
		/**
		 * Retrieves the current linetype of the geometry data
		 **/
		getLinetype(): OdTvLinetypeDef;
		/**
		 * Sets the layer of the geometry data.
		 **/
		setLayer(layer: OdTvLayerDef): void;
		/**
		 * Retrieves the current layer for the geometry data
		 **/
		getLayer(): OdTvLayerDef;
		/**
		 * Sets the visibility property of the geometry.
		 **/
		setVisibility(visible: OdTvVisibilityDef): void;
		/**
		 * Retrieves the current visibility property for the geometry data
		 **/
		getVisibility(): OdTvVisibilityDef;
		/**
		 * Sets the transparency property of the geometry.
		 **/
		setTransparency(transparency: OdTvTransparencyDef): void;
		/**
		 * Retrieves the current transparency property for the geometry data
		 **/
		getTransparency(): OdTvTransparencyDef;
		/**
		 * Retrieves the database that contains the geometry data
		 **/
		getDatabase(): OdTvDatabaseId;
		/**
		 * Sets the target display mode of the geometry.
		 **/
		setTargetDisplayMode(targetMode: TargetDisplayMode): void;
		/**
		 * Retrieves the current target display mode of the geometry
		 **/
		getTargetDisplayMode(): TargetDisplayMode;
		/**
		 * Copies the geometry data to a specified entity.
		 **/
		copyTo(targetEntityId: OdTvEntityId): OdTvGeometryDataId;
		/**
		 * Retrieves the geometry data represented as a polyline if the data has the appropriate type
		 **/
		getAsPolyline(): OdTvPolylineData;
		/**
		 * Retrieves the geometry data represented as a circle if the data has the appropriate type
		 **/
		getAsCircle(): OdTvCircleData;
		/**
		 * Retrieves the geometry data represented as a circle arc if the data has the appropriate type
		 **/
		getAsCircleArc(): OdTvCircleArcData;
		/**
		 * Retrieves the geometry data represented as a circle wedge if the data has the appropriate type
		 **/
		getAsCircleWedge(): OdTvCircleWedgeData;
		/**
		 * Retrieves the geometry data represented as an ellipse if the data has the appropriate type
		 **/
		getAsEllipse(): OdTvEllipseData;
		/**
		 * Retrieves the geometry data represented as an elliptical arc if the data has the appropriate type
		 **/
		getAsEllipticArc(): OdTvEllipticArcData;
		/**
		 * Retrieves the geometry data represented as a polygon if the data has the appropriate type
		 **/
		getAsPolygon(): OdTvPolygonData;
		/**
		 * Retrieves the geometry data represented as a shell if the data has the appropriate type
		 **/
		getAsShell(): OdTvShellData;
		/**
		 * Retrieves the geometry data represented as a mesh if the data has the appropriate type
		 **/
		getAsMesh(): OdTvMeshData;
		/**
		 * Retrieves the geometry data represented as a sphere if the data has the appropriate type
		 **/
		getAsSphere(): OdTvSphereData;
		/**
		 * Retrieves the geometry data represented as a cylinder if the data has the appropriate type
		 **/
		getAsCylinder(): OdTvCylinderData;
		/**
		 * Retrieves the geometry data represented as a box if the data has the appropriate type
		 **/
		getAsBox(): OdTvBoxData;
		/**
		 * Retrieves the geometry data represented as text if the data has the appropriate type
		 **/
		getAsText(): OdTvTextData;
		/**
		 * Retrieves the geometry data represented as a NURBS curve if the data has the appropriate type
		 **/
		getAsNurbs(): OdTvNurbsData;
		/**
		 * Retrieves the geometry data represented as an infinite line if the data has the appropriate type
		 **/
		getAsInfiniteLine(): OdTvInfiniteLineData;
		/**
		 * Retrieves the geometry data represented as a raster image if the data has the appropriate type
		 **/
		getAsRasterImage(): OdTvRasterImageData;
		/**
		 * Retrieves the geometry data represented as a point cloud if the data has the appropriate type
		 **/
		getAsPointCloud(): OdTvPointCloudData;
		/**
		 * Retrieves the geometry data represented as a grid if the data has the appropriate type
		 **/
		getAsGrid(): OdTvGridData;
		/**
		 * Retrieves the geometry data represented as a colored shape if the data has the appropriate type
		 **/
		getAsColoredShape(): OdTvColoredShapeData;
		/**
		 * Retrieves the geometry data represented as a Visualize sub-entity if the data has the appropriate type.
		 **/
		getAsSubEntity(mode: OpenMode): OdTvEntity;
		/**
		 * Retrieves the geometry data represented as an insert entity if the data has the appropriate type.
		 **/
		getAsInsert(): OdTvInsertData;
		/**
		 * Returns appropriate snap points of this geometry object.
		 **/
		getSnapPoints(snapMode: SnapMode, pickPoint: Point3, xWorldToEye: Matrix3d, transform: Matrix3d, focalLength: number, bWire: boolean): any;
		/**
		 * Returns appropriate snap points of this geometry object.
		 **/
		getSnapPoints(snapMode: SnapMode, pickPoint: Point3, xWorldToEye: Matrix3d, transform: Matrix3d): any;
		/**
		 * Returns appropriate snap points of this geometry object.
		 **/
		getSnapPoints(snapMode: SnapMode, pickPoint: Point3, xWorldToEye: Matrix3d): any;
		/**
		 * Checks whether the requested snap mode is supported by this geometry object.
		 **/
		getSupportSnapMode(snapMode: SnapMode, bWire: boolean): boolean;
		/**
		 * Retrieves the parent subentity of the geometry data.
		 **/
		getParentSubEntity(): OdTvGeometryDataId;
		/**
		 * Retrieves the top level parent entity of the geometry data.
		 **/
		getParentTopLevelEntity(): OdTvEntityId;
		delete(): void;
	}

	/**
	 * This is an interface class for an OdTvEllipticArcData object
	 **/
	class OdTvEllipticArcData {
		isNull(): boolean;
		/**
		 * Retrieves the center point, axis points of intersection with ellipse,
		 **/
		get(): any;
		/**
		 * Set center point, points of Intersection of axis with ellipse,
		 **/
		set(centerPoint: Point3, majorPoint: Point3, minorPoint: Point3, start: number, end: number): void;
		/**
		 * Set the center point for this elliptic arc
		 **/
		setCenter(center: Point3): void;
		/**
		 * Set the major point for this elliptic arc
		 **/
		setMajor(major: Point3): void;
		/**
		 * Set the minor point for this elliptic arc
		 **/
		setMinor(minor: Point3): void;
		/**
		 * Set the start angle for this elliptic arc
		 **/
		setStart(start: number): void;
		/**
		 * Set the end angle for this elliptic arc
		 **/
		setEnd(end: number): void;
		/**
		 * Get the center point of this elliptic arc
		 **/
		getCenter(): Point3;
		/**
		 * Get the major point of this elliptic arc
		 **/
		getMajor(): Point3;
		/**
		 * Get the minor point of this elliptic arc
		 **/
		getMinor(): Point3;
		/**
		 * Get the start angle of this elliptic arc
		 **/
		getStart(): number;
		/**
		 * Get the end angle of this elliptic arc
		 **/
		getEnd(): number;
		/**
		 * Set that elliptic arc should be filled-in (or not)
		 **/
		setFilled(bFilled: boolean): void;
		/**
		 * Returns the filled state of the elliptic arc
		 **/
		getFilled(): boolean;
		/**
		 * Set the thickness of the elliptic arc
		 **/
		setThickness(thickness: number): void;
		/**
		 * Returns the thickness of the elliptic arc
		 **/
		getThickness(): number;
		delete(): void;
	}

	/**
	 * This is an interface class for an OdTvPolygonData object.
	 **/
	class OdTvPolygonData {
		isNull(): boolean;
		/**
		 * Replace the points of this Polygon with the specified points
		 **/
		setPoints(pointArray: any): void;
		/**
		 * Returns the number of points in this polygon
		 **/
		getPointsCount(): number;
		/**
		 * Retrieves the points of this polygon.
		 **/
		getPoints(): any;
		/**
		 * Set that polygon should be filled-in (or not)
		 **/
		setFilled(bFilled: boolean): void;
		/**
		 * Returns the filled state of the polygon
		 **/
		getFilled(): boolean;
		/**
		 * Set that the polygon should use an inverse normal
		 **/
		setUseInverseNormal(bUse: boolean): void;
		/**
		 * Returns the fag about using of the inverse normal
		 **/
		getUseInverseNormal(): boolean;
		delete(): void;
	}

	/**
	 * This is an interface class for an OdTvShellData object.
	 **/
	class OdTvShellData {
		isNull(): boolean;
		/**
		 * Sets the geometry data of the shell.
		 **/
		setParam(vertices: any, faces: any): void;
		/**
		 * Set true if and only it is not need to take into account the lighting.
		 **/
		setDisableLighting(bDisable: boolean): void;
		/**
		 * Returns true if and only it is not need to take into account the lighting
		 **/
		getDisableLighting(): boolean;
		/**
		 * Returns the number of faces in the shell
		 **/
		getFacesCount(): number;
		/**
		 * Returns the number of edges in the shell
		 **/
		getEdgesCount(): number;
		/**
		 * Returns the number of vertices in the shell
		 **/
		getVerticesCount(): number;
		setFaceNormalsViaList(indFaces: any, vectors: any): void;
		setFaceNormalViaList(indFaces: any, vector: Vector3): void;
		/**
		 * Sets a normal vector for a range of shell faces.
		 **/
		setFaceNormalViaRange(indStart: number, nCount: number, vector: Vector3): void;
		setFaceNormalsViaRange(indStart: number, vectors: any): void;
		/**
		 * Retrieves normal vectors for a range of shell faces.
		 **/
		getFaceNormalsViaRange(indStart: number, nCount: number): any;
		/**
		 * Retrieves normal vectors for a list of shell faces.
		 **/
		getFaceNormalsViaList(indFaces: any): any;
		/**
		 * Retrieves a color definition object for a specified shell face.
		 **/
		getFaceNormal(ind: number): Vector3;
		/**
		 * Gets the geometry data of the shell.
		 **/
		getParam(): any;
		/**
		 * Sets the mode of back face culling. The default value is kInherited.
		 **/
		setBackFaceCulling(val: FaceCulling): void;
		/**
		 * Returns the mode of back face culling.
		 **/
		getBackFaceCulling(): FaceCulling;
		/**
		 * Sets a new value of the selectable property for the faces of the shell. The selectable property determines whether the faces of the shell can be selected.
		 **/
		setFacesSelectable(bSelectable: boolean): void;
		/**
		 * Retrieves current value of the selectable property for the faces of the shell.
		 **/
		getFacesSelectable(): boolean;
		/**
		 * Sets a new value of the selectable property for the edges of the shell.
		 **/
		setEdgesSelectable(bSelectable: boolean): void;
		/**
		 * Retrieves current value of the selectable property for the edges of the shell.
		 **/
		getEdgesSelectable(): boolean;
		/**
		 * Returns the number of triangles in the shell.
		 **/
		getTrianglesCount(): number;
		/**
		 * Replaces vertices of the shell starting with startPos.
		 **/
		editVerticesViaRange(startPos: number, verticesArray: any): void;
		/**
		 * Replaces the vertexes of the shell according to a vertex list. The list of vertexes is defined with a set of vertex position objects.
		 **/
		editVerticesViaList(indVertices: any, verticesArray: any): void;
		/**
		 * Replaces faces of the shell starting with startFace.
		 **/
		editFacesViaRange(startFace: number, faces: any): void;
		/**
		 * Replaces the faces of the shell according to a list of faces.
		 **/
		editFacesViaList(indFaces: any, faces: any): void;
		setVertexColorsViaListUseArray(indVertices: any, colors: any): void;
		setVertexColorsViaList(indVertices: any, color: OdTvRGBColorDef): void;
		setVertexColorsViaRange(indStart: number, nCount: number, color: OdTvRGBColorDef): void;
		setVertexColorsViaRangeUseArray(indStart: number, colors: any): void;
		/**
		 * Retrieves colors for a range of shell vertexes.
		 **/
		getVertexColorsViaRange(indStart: number, nCount: number): any;
		/**
		 * Retrieves colors for a range of shell vertexes.
		 **/
		getVertexColorsViaList(indVertices: any): any;
		/**
		 * Retrieves the color for a specified shell vertex.
		 **/
		getVertexColor(ind: number): OdTvRGBColorDef;
		/**
		 * Sets a new vertex orientation value for the shell.
		 **/
		setVertexOrientation(orientation: OrientationType): void;
		/**
		 * Retrieves the current vertex orientation of the shell.
		 **/
		getVertexOrientation(): OrientationType;
		setVertexNormalsViaList(indVertices: any, vectors: any): void;
		setVertexNormalViaList(indVertices: any, vector: Vector3): void;
		/**
		 * Sets normal vectors for a range of shell vertexes.
		 **/
		setVertexNormalViaRange(indStart: number, nCount: number, vector: Vector3): void;
		setVertexNormalsViaRange(indStart: number, vectors: any): void;
		/**
		 * Retrieves normal vectors for a range of shell vertexes.
		 **/
		getVertexNormalsViaRange(indStart: number, nCount: number): any;
		/**
		 * Retrieves normal vectors for a list of shell vertexes.
		 **/
		getVertexNormalsViaList(indVertices: any): any;
		/**
		 * Retrieves the normal vector for a specified shell vertex.
		 **/
		getVertexNormal(ind: number): Vector3;
		setVertexMappingCoordsViaList(indVertices: any, mappingCoords: any): void;
		setVertexMappingCoordViaList(indVertices: any, mappingCoord: VectorOdTvPoint2d): void;
		setVertexMappingCoordsViaRange(indStart: number, mappingCoords: any): void;
		/**
		 * Sets mapping coordinates for a range of shell vertexes.
		 **/
		setVertexMappingCoordViaRange(indStart: number, nCount: number, mappingCoord: VectorOdTvPoint2d): void;
		/**
		 * Retrieves mapping coordinates for a range of shell vertexes.
		 **/
		getVertexMappingCoordsViaRange(indStart: number, nCount: number): any;
		/**
		 * Retrieves mapping coordinates for a list of shell vertexes.
		 **/
		getVertexMappingCoordsViaList(indVert: any): any;
		/**
		 * Retrieves mapping coordinates for a specified shell vertex.
		 **/
		getVertexMappingCoord(ind: number): VectorOdTvPoint2d;
		setFaceColorsViaList(indFaces: any, color: OdTvColorDef): void;
		setFaceColorsViaRange(indStart: number, nCount: number, color: OdTvColorDef): void;
		/**
		 * Retrieves color definition objects for a range of shell faces.
		 **/
		getFaceColorsViaRange(indStart: number, nCount: number): any;
		/**
		 * Retrieves color definition objects for a list of shell faces.
		 **/
		getFaceColorsViaList(indFaces: any): any;
		/**
		 * Retrieves a color definition object for a specified face of the shell.
		 **/
		getFaceColor(ind: number): OdTvColorDef;
		setFaceVisibilitiesViaList(indFaces: any, visibility: OdTvVisibilityDef): void;
		setFaceVisibilitiesViaRange(indStart: number, nCount: number, visibility: OdTvVisibilityDef): void;
		/**
		 * Retrieves visibility data for a range of shell faces.
		 **/
		getFaceVisibilitiesViaRange(indStart: number, nCount: number): any;
		/**
		 * Retrieves visibility data for a list of shell faces.
		 **/
		getFaceVisibilitiesViaList(indFaces: any): any;
		/**
		 * Retrieves visibility data for a specified shell face.
		 **/
		getFaceVisibility(ind: number): OdTvVisibilityDef;
		setFaceLayersViaList(indFaces: any, layer: OdTvLayerDef): void;
		setFaceLayersViaRange(indStart: number, nCount: number, layer: OdTvLayerDef): void;
		/**
		 * Retrieves layer objects for a range of shell faces.
		 **/
		getFaceLayersViaRange(indStart: number, nCount: number): any;
		/**
		 * Retrieves layer objects for a list of shell faces.
		 **/
		getFaceLayersViaList(indFaces: any): any;
		/**
		 * Retrieves layer objects for a specified shell face.
		 **/
		getFaceLayer(ind: number): OdTvLayerDef;
		setFaceTransparencyViaList(indFaces: any, transparency: OdTvTransparencyDef): void;
		setFaceTransparencyViaRange(indStart: number, nCount: number, transparency: OdTvTransparencyDef): void;
		/**
		 * Retrieves transparency data for a range of shell faces.
		 **/
		getFaceTransparencyViaRange(indStart: number, nCount: number): any;
		/**
		 * Retrieves transparency data for a list of shell faces.
		 **/
		getFaceTransparencyViaList(indFaces: any): any;
		/**
		 * Retrieves transparency data for a specified face of the shell.
		 **/
		getFaceTransparency(ind: number): OdTvTransparencyDef;
		setFaceMaterialsViaList(indFaces: any, material: OdTvMaterialDef): void;
		setFaceMaterialsViaRange(indStart: number, nCount: number, material: OdTvMaterialDef): void;
		/**
		 * Retrieves material definition objects for a range of shell faces.
		 **/
		getFaceMaterialsViaRange(indStart: number, nCount: number): any;
		/**
		 * Retrieves material definition objects for a list of shell faces.
		 **/
		getFaceMaterialsViaList(indFaces: any): any;
		/**
		 * Retrieves material definition objects for a specified shell face.
		 **/
		getFaceMaterial(ind: number): OdTvMaterialDef;
		setFaceMappersViaList(indFaces: any, mapper: OdTvMapperDef): void;
		/**
		 * Sets mapper definition objects for a range of shell faces.
		 **/
		setFaceMappersViaRange(indStart: number, nCount: number, mapper: OdTvMapperDef): void;
		/**
		 * Sets a mapper definition object for all shell faces.
		 **/
		setFaceMapper(mapper: OdTvMapperDef): void;
		/**
		 * Retrieves mapper definition objects for a range of shell faces.
		 **/
		getFaceMappersViaRange(indStart: number, nCount: number): any;
		/**
		 * Retrieves mapper definition objects for a list of shell faces.
		 **/
		getFaceMappersViaList(indFaces: any): any;
		/**
		 * Retrieves a mapper definition object for a specified shell face.
		 **/
		getFaceMapper(ind: number): OdTvMapperDef;
		setEdgeColorsViaList(indEdges: any, color: OdTvColorDef): void;
		setEdgeColorsViaRange(indStart: number, nCount: number, color: OdTvColorDef): void;
		/**
		 * Retrieves color data for a list of shell edges.
		 **/
		getEdgeColorsViaList(indEdges: any): any;
		/**
		 * Retrieves color data for a range of shell edges.
		 **/
		getEdgeColorsViaRange(indStart: number, nCount: number): any;
		/**
		 * Retrieves color data object for a specified shell edge.
		 **/
		getEdgeColor(ind: number): OdTvColorDef;
		setEdgeVisibilitiesViaList(indEdges: any, visibility: OdTvVisibilityDef): void;
		setEdgeVisibilitiesViaRange(indStart: number, nCount: number, visibility: OdTvVisibilityDef): void;
		/**
		 * Retrieves visibility data for a list of shell edges.
		 **/
		getEdgeVisibilitiesViaList(indEdges: any): any;
		/**
		 * Retrieves visibility data for a range of shell edges.
		 **/
		getEdgeVisibilitiesViaRange(indStart: number, nCount: number): any;
		/**
		 * Retrieves visibility data object for a specified shell edge.
		 **/
		getEdgeVisibility(ind: number): OdTvVisibilityDef;
		setEdgeLinetypesViaList(indEdges: any, linetype: OdTvLinetypeDef): void;
		setEdgeLinetypesViaRange(indStart: number, nCount: number, linetype: OdTvLinetypeDef): void;
		/**
		 * Retrieves linetypes for a list of shell edges.
		 **/
		getEdgeLinetypesViaList(indEdges: any): any;
		/**
		 * Retrieves linetypes for a range of shell edges.
		 **/
		getEdgeLinetypesViaRange(indStart: number, nCount: number): any;
		/**
		 * Retrieves a linetype for a specified shell edge.
		 **/
		getEdgeLinetype(ind: number): OdTvLinetypeDef;
		setEdgeLayersViaList(indEdges: any, layer: OdTvLayerDef): void;
		setEdgeLayersViaRange(indStart: number, nCount: number, layer: OdTvLayerDef): void;
		/**
		 * Retrieves layer objects for a list of shell edges.
		 **/
		getEdgeLayersViaList(indEdges: any): any;
		/**
		 * Retrieves layer objects for a range of shell edges.
		 **/
		getEdgeLayersViaRange(indStart: number, nCount: number): any;
		/**
		 * Retrieves a layer object for a specified shell edge.
		 **/
		getEdgeLayer(ind: number): OdTvLayerDef;
		/**
		 * Sets a hatch pattern for the shell object.
		 **/
		setHatchPattern(def: OdTvHatchPatternDef): void;
		/**
		 * Retrieves a hatch pattern object for the shell object.
		 **/
		getHatchPattern(): OdTvHatchPatternDef;
		/**
		 * Sets that the shell should be filled in 2D rendering mode or visual styles
		 **/
		setNeedFillIn2D(bNeedFill: boolean): void;
		/**
		 * Retrieves a hatch pattern object for the shell object.
		 **/
		getNeedFillIn2D(): boolean;
		/**
		 * Marks edges as 'silhouette' edges.
		 **/
		setIndexesOfSilhouetteEdges(indEdges: any): void;
		/**
		 * Retrieves indexes of the edges which are marked as 'silhouettes'
		 **/
		getIndexesOfSilhouetteEdges(): any;
		/**
		 * Sets that it is need to show shell vertices for the shell object.
		 **/
		setShowVertices(bShow: boolean): void;
		/**
		 * Returns true if shell vertices are visible. Also returns a vertices size which is used for the vertices visualization.
		 **/
		getShowVertices(): boolean;
		/**
		 * Sets that only shell vertices should be visualized for this shell object.
		 **/
		setShowOnlyVertices(bShowOnly: boolean): void;
		/**
		 * Returns true if only shell vertices should be visualized for this shell object.
		 **/
		getShowOnlyVertices(): boolean;
		/**
		 * Sets overriding of the vertices color. If bOverride flag is true, color will be applied to the shell vertices. Otherwise, color from attributes will be applied.
		 **/
		setOverrideVerticesColor(bOverride: boolean, color: OdTvRGBColorDef): void;
		/**
		 * Get vertices color and override vertices color flag.
		 **/
		getOverrideVerticesColor(): OdTvRGBColorDef;
		/**
		 * Returns true if shell normals are visible. Also returns a normals size and color which is used for the normals visualization.
		 **/
		getShowNormals(): boolean;
		/**
		 * Returns true if shell sharp edges are visible.
		 **/
		getShowSharpEdges(): boolean;
		setShowVerticesSize(verticesSize: number): void;
		getShowVerticesSize(): number;
		getShowNormalsLenght(): number;
		getShowNormalsColor(): OdTvRGBColorDef;
		setShowNormals(show: boolean): void;
		setShowNormalsLenght(normalsLength: number): void;
		setShowNormalsColor(color: OdTvRGBColorDef): void;
		getShowSharpEdgesWidth(): number;
		getShowSharpEdgesColor(): OdTvRGBColorDef;
		setShowSharpEdges(show: boolean): void;
		setShowSharpEdgesWidth(width: number): void;
		setShowSharpEdgesColor(color: OdTvRGBColorDef): void;
		/**
		 * Specifies whether to use spatial tree for selection.
		 **/
		setUseSpatialTreeForSelection(bUseSpatialTreeForSelection: boolean, nVerticesLimit: number): OdTvResult;
		/**
		 * Checks whether spatial tree is used for selection. This method also receives the minimum count of vertices for which to use a spatial tree if spatial tree is used.
		 **/
		getUseSpatialTreeForSelection(): number;
		/**
		 * Specifies whether shell data should ignore face fill patterns even if they are specified.
		 **/
		setFaceFillPatternsDisabled(bDisable: boolean): void;
		/**
		 * Checks whether shell data should ignore face fill patterns even if they are specified.
		 **/
		isFaceFillPatternsDisabled(): boolean;
		/**
		 * Defines origin points of hatch pattern fills for the all shell faces.
		 **/
		setFaceFillOrigins(origins: Array<undefined>): boolean;
		/**
		 * Retrieves origin points of hatch pattern fills for the all shell faces.
		 **/
		getFaceFillOrigins(): Array<undefined>;
		/**
		 * Defines direction vectors of hatch pattern fills for the all shell faces.
		 **/
		setFaceFillDirections(directions: Array<undefined>): boolean;
		/**
		 * Retrieves direction vectors of hatch pattern fills for the all shell faces.
		 **/
		getFaceFillDirections(): Array<undefined>;
		delete(): void;
	}

	/**
	 * The abstract interface class that implements functionality for working with Visualize SDK text style objects.
	 **/
	class OdTvTextStyle {
		isNull(): boolean;
		/**
		 * Gets the typeface (font family) name of the TrueType font currently
		 **/
		getFontTypeface(): string;
		/**
		 * Gets the value of the bold property for the TrueType font associated with
		 **/
		getFontBold(): boolean;
		/**
		 * Gets the value of the italic property for the TrueType font associated with
		 **/
		getFontItalic(): boolean;
		/**
		 * Gets the Windows character set identifier for the TrueType font associated
		 **/
		getFontCharset(): number;
		/**
		 * Gets the Windows pitch and character family identifier for the TrueType font
		 **/
		getFontPitchAndFamily(): number;
		/**
		 * Associates a TrueType font with the current text style and sets its general
		 **/
		setFont(typeface: string, bold: boolean, italic: boolean, charset: number, pitchAndFamily: number): void;
		/**
		 * Returns the file name of the SHX font currently associated with the text
		 **/
		getFileName(): string;
		/**
		 * Associates the SHX font in the specified file with the text style.
		 **/
		setFileName(sUniFont: string): void;
		/**
		 * Returns the file name of the SHX Big Font currently associated with the text
		 **/
		getBigFontFileName(): string;
		/**
		 * Associates the SHX Big Font in the specified file with the text style.
		 **/
		setBigFontFileName(sBigFont: string): void;
		/**
		 * Returns the boolean value indicating the current mode of text data storing.
		 **/
		getShapeStatus(): boolean;
		/**
		 * Sets the mode of text data storing.
		 **/
		setShapeStatus(bShapeFile: boolean): void;
		/**
		 * Returns the boolean value indicating current text direction.
		 **/
		getBackwards(): boolean;
		/**
		 * Sets the text direction for the text style.
		 **/
		setBackwards(bBackwards: boolean): void;
		/**
		 * Returns the boolean value indicating if the text is flipped over or not.
		 **/
		getUpsideDown(): boolean;
		/**
		 * Sets the text upside position for the text style.
		 **/
		setUpsideDown(bUpsideDown: boolean): void;
		/**
		 * Returns the boolean value indicating the text orientation.
		 **/
		getVertical(): boolean;
		/**
		 * Sets the text orientation for the text style.
		 **/
		setVertical(bVertical: boolean): void;
		/**
		 * Returns the value of oblique angle of text characters in radians.
		 **/
		getObliquingAngle(): number;
		/**
		 * Sets the text obliquing angle for the text style.
		 **/
		setObliquingAngle(dAngle: number): void;
		/**
		 * Returns a value of a text width scale factor. Indicates the proportion of
		 **/
		widthFactor(): number;
		/**
		 * Sets the text width scale factor for the text style.
		 **/
		setWidthFactor(widthFactor: number): void;
		/**
		 * Returns the text size value.
		 **/
		textSize(): number;
		/**
		 * Sets the text size for the text style.
		 **/
		setTextSize(dSize: number): void;
		/**
		 * Returns the value of the text alignment mode for the text style.
		 **/
		getAlignmentMode(): number;
		/**
		 * Sets the alignment mode for the text style.
		 **/
		setAlignmentMode(alignMode: number): void;
		/**
		 * Sets the text underline attribute for the text style.
		 **/
		setUnderlined(bUnderlined: boolean): void;
		/**
		 * Returns the boolean value indicating if the text is underlined or not.
		 **/
		getUnderlined(): boolean;
		/**
		 * Sets the text overline attribute for the text style.
		 **/
		setOverlined(bOverlined: boolean): void;
		/**
		 * Returns the boolean value indicating if the text is overlined or not.
		 **/
		getOverlined(): boolean;
		/**
		 * Sets the text striking attribute for the text style.
		 **/
		setStriked(bStriked: boolean): void;
		/**
		 * Returns the boolean value indicating if the text is striked or not.
		 **/
		getStriked(): boolean;
		/**
		 * Sets the text style name.
		 **/
		setName(sName: string): void;
		/**
		 * Returns the text style name.
		 **/
		getName(): string;
		/**
		 * Sets the path to the folder with locally stored custom fonts.
		 **/
		setCustomFontFolder(strFolderPath: string): void;
		/**
		 * Returns the path to the folder with locally stored custom fonts.
		 **/
		getCustomFontFolder(): string;
		/**
		 * Retrieves the current database identifier associated with the object.
		 **/
		getHandle(): string;
		/**
		 * Get native database handle
		 **/
		getNativeDatabaseHandle(): string;
		/**
		 * Copies all text style's data to a specified text style.
		 **/
		copyTo(targetTextStyleId: OdTvTextStyleId): void;
		delete(): void;
	}

	/**
	 * The interface class for a text style object identifier that allows access to the <link OdTvTextStyleId, OdTvTextStyleId> object.
	 **/
	class OdTvTextStyleId {
		/**
		 * Returns the smart pointer to the OdTvTextStyle object.
		 **/
		openObject(): OdTvTextStyle;
		delete(): void;
	}

	/**
	 * This is an interface class for an OdTvTextData object.
	 **/
	class OdTvTextData {
		isNull(): boolean;
		/**
		 * Returns the position of this text (WCS).
		 **/
		getPosition(): Point3;
		/**
		 * Sets the position of this text (WCS).
		 **/
		setPosition(position: Point3): void;
		/**
		 * Returns the alignment point of this text (WCS).
		 **/
		getAlignmentPoint(): Point3;
		/**
		 * Sets the alignment point of this text (WCS).
		 **/
		setAlignmentPoint(alignment: Point3): void;
		/**
		 * Returns the normal vector to the plane of the text.
		 **/
		getNormal(): Vector3;
		/**
		 * Sets the normal vector to the plane of the text.
		 **/
		setNormal(normal: Vector3): void;
		/**
		 * Returns the rotation angle of this text.
		 **/
		getRotation(): number;
		/**
		 * Sets the rotation angle of this text around its position in the plane the text
		 **/
		setRotation(rotation: number): void;
		/**
		 * Returns the text string of this text data entity.
		 **/
		getString(): string;
		/**
		 * Sets a text string for this text data entity.
		 **/
		setString(msg: string): void;
		/**
		 * Returns the current alignment mode of the text for this text data entity.
		 **/
		getAlignmentMode(): number;
		/**
		 * Sets the alignment mode.
		 **/
		setAlignmentMode(alignMode: number): void;
		/**
		 * Returns the text size value of this text data entity. This value influences
		 **/
		getTextSize(): number;
		/**
		 * Sets the text size which is the cap height of the text font measured in units
		 **/
		setTextSize(dSize: number): void;
		/**
		 * Returns the width scale factor of the text boundary. This factor influences
		 **/
		getWidthFactor(): number;
		/**
		 * Returns an array consisting of bounding points of the text outline.
		 **/
		getBoundingPoints(): any;
		/**
		 * Returns the text style of this text data entity.
		 **/
		getTextStyle(): OdTvTextStyleId;
		/**
		 * Sets the text style for this text data entity.
		 **/
		setTextStyle(textStyle: OdTvTextStyleId): void;
		delete(): void;
	}

	/**
	 * This is an interface class for an OdTvCylinderData object.
	 **/
	class OdTvCylinderData {
		isNull(): boolean;
		/**
		 * Set params of the Cylinder
		 **/
		setParam(point1: Point3, point2: Point3, radius: number, caps: number): void;
		/**
		 * Retrieves params of the cylinder.
		 **/
		getParam(): any;
		/**
		 * Set the points for this Cylinder
		 **/
		setPoints(points_val: any): void;
		/**
		 * Set the radius for this Cylinder
		 **/
		setRadii(points: any): void;
		/**
		 * Set the capping for this Cylinder
		 **/
		setCaps(caps: number): void;
		/**
		 * Get the point1 of this Cylinder
		 **/
		getPoints(): any;
		/**
		 * Get the radius of this Cylinder
		 **/
		getRadii(): any;
		/**
		 * Gets the capping of this Cylinder.
		 **/
		getCaps(): number;
		delete(): void;
	}

	/**
	 * This is an interface class for an OdTvSphereData object.
	 **/
	class OdTvSphereData {
		isNull(): boolean;
		/**
		 * Set the center and radius of the sphere
		 **/
		setParam(center: Point3, radius: number, axis: Vector3, primeMeridian: Vector3): void;
		/**
		 * Set the radius of the sphere
		 **/
		setRadius(radius: number): void;
		/**
		 * Set the center of the sphere
		 **/
		setCenter(center: Point3): void;
		/**
		 * Set the basis of the sphere
		 **/
		setBasis(axis: Vector3, primeMeridian: Vector3): void;
		/**
		 * Get the radius of the sphere
		 **/
		getRadius(): number;
		/**
		 * Get the center of the sphere
		 **/
		getCenter(): Point3;
		/**
		 * Get the basis of the sphere
		 **/
		getBasisAxis(): Vector3;
		/**
		 * Get the basis of the sphere
		 **/
		getBasisPrimeMeridian(): Vector3;
		delete(): void;
	}

	/**
	 * This is an interface class for manipulating Visualize mesh data.
	 **/
	class OdTvMeshData {
		isNull(): boolean;
		/**
		 * Sets colors for a list of mesh edges.
		 **/
		setEdgeColorsViaList(nCount: number, indEdges: Array<number>, colors: Array<OdTvColorDef>): void;
		/**
		 * Sets a color for a specified range of mesh edges.
		 **/
		setEdgeColorsViaRange(indStart: number, nCount: number, color: OdTvColorDef): void;
		/**
		 * Sets layers for a list of mesh edges.
		 **/
		setEdgeLayersViaList(nCount: number, indEdges: Array<number>, layers: Array<OdTvLayerId>): void;
		/**
		 * Sets a layer for a specified range of mesh edges.
		 **/
		setEdgeLayersViaRange(indStart: number, nCount: number, layer: OdTvLayerId): void;
		/**
		 * Sets linetypes for a list of mesh edges.
		 **/
		setEdgeLinetypesViaList(nCount: number, indEdges: Array<number>, linetypes: Array<OdTvLinetypeDef>): void;
		/**
		 * Sets a linetype for a specified range of mesh edges.
		 **/
		setEdgeLinetypesViaRange(indStart: number, nCount: number, linetype: OdTvLinetypeDef): void;
		/**
		 * Sets a new value of the selectable property for the edges of the mesh. The selectable property determines whether the edges of the mesh can be selected.
		 **/
		setEdgesSelectable(bSelectable: boolean): void;
		/**
		 * Sets visibility parameters for a list of mesh edges.
		 **/
		setEdgeVisibilitiesViaList(nCount: number, indEdges: Array<number>, visibilities: Array<OdTvVisibilityDef>): void;
		/**
		 * Sets a visibilit for a specified range of mesh edges.
		 **/
		setEdgeVisibilitiesViaRange(indStart: number, nCount: number, visibility: OdTvVisibilityDef): void;
		/**
		 * Sets colors for a list of mesh faces.
		 **/
		setFaceColorsViaList(nCount: number, indFaces: Array<number>, colors: Array<OdTvColorDef>): void;
		/**
		 * Sets a color for a specified range of mesh faces.
		 **/
		setFaceColorsViaRange(indStart: number, nCount: number, color: OdTvColorDef): void;
		/**
		 * Sets layers for a list of mesh faces.
		 **/
		setFaceLayersViaList(nCount: number, indFaces: Array<number>, layers: Array<OdTvLayerId>): void;
		/**
		 * Sets layers for a specified range of mesh faces.
		 **/
		setFaceLayersViaRange(indStart: number, nCount: number, layers: Array<OdTvLayerId>): void;
		/**
		 * Sets a mapper for all mesh faces.
		 **/
		setFaceMapper(mapper: OdTvMapperDef): void;
		/**
		 * Sets mappers for a list of mesh faces.
		 **/
		setFaceMappersViaList(nCount: number, indFaces: Array<number>, mappers: Array<OdTvMapperDef>): void;
		/**
		 * Sets mappers for a specified range of mesh faces.
		 **/
		setFaceMappersViaRange(indStart: number, nCount: number, mappers: Array<OdTvMapperDef>): void;
		/**
		 * Sets materials for a list of mesh faces.
		 **/
		setFaceMaterialsViaList(nCount: number, indFaces: Array<number>, materials: Array<OdTvMaterialDef>): void;
		/**
		 * Sets materials for a specified range of mesh faces.
		 **/
		setFaceMaterialsViaRange(indStart: number, nCount: number, materials: Array<OdTvMaterialDef>): void;
		/**
		 * Sets normal vectors for a list of mesh faces.
		 **/
		setFaceNormalsViaList(nCount: number, indFaces: Array<number>, vectors: Array<Vector3>): void;
		/**
		 * Sets a normal vector for a specified range of mesh faces.
		 **/
		setFaceNormalsViaRange(indStart: number, nCount: number, vector: Vector3): void;
		/**
		 * Sets a new value of the selectable property for the faces of the mesh. The selectable property determines whether the faces of the mesh can be selected.
		 **/
		setFacesSelectable(bSelectable: boolean): void;
		/**
		 * Sets transparency parameters for a list of mesh faces.
		 **/
		setFaceTransparencyViaList(nCount: number, indFaces: Array<number>, transparencies: Array<OdTvTransparencyDef>): void;
		/**
		 * Sets transparency parameters for a specified range of mesh faces.
		 **/
		setFaceTransparencyViaRange(indStart: number, nCount: number, transparencies: Array<OdTvTransparencyDef>): void;
		/**
		 * Sets visibility parameters for a list of mesh faces.
		 **/
		setFaceVisibilitiesViaList(nCount: number, indFaces: Array<number>, visibilities: Array<OdTvVisibilityDef>): void;
		/**
		 * Sets visibility parameters for a specified range of mesh faces.
		 **/
		setFaceVisibilitiesViaRange(indStart: number, nCount: number, visibilities: Array<OdTvVisibilityDef>): void;
		/**
		 * Set the geometry data of the mesh
		 **/
		setParam(nRows: number, nColumns: number, nVertices: number, vertices: any): void;
		/**
		 * Sets colors for a list of mesh vertexes.
		 **/
		setVertexColorsViaList(nCount: number, indVertices: Array<number>, colors: Array<OdTvRGBColorDef>): void;
		/**
		 * Sets a color for a range of mesh vertexes.
		 **/
		setVertexColorsViaRange(indStart: number, nCount: number, color: OdTvRGBColorDef): void;
		/**
		 * Sets texture coordinates for a mesh vertex list.
		 **/
		setVertexMappingCoordsViaList(nCount: number, indVertices: Array<number>, mappingCoords: VectorOdTvPoint2d): void;
		/**
		 * Sets texture coordinates for a specified range of mesh vertexes.
		 **/
		setVertexMappingCoordsViaRange(indStart: number, nCount: number, mappingCoords: VectorOdTvPoint2d): void;
		/**
		 * Sets normal vectors for a list of mesh vertexes.
		 **/
		setVertexNormalsViaList(nCount: number, indVertices: Array<number>, vectors: Array<Vector3>): void;
		/**
		 * Sets normal vectors for a range of mesh vertexes.
		 **/
		setVertexNormalsViaRange(indStart: number, nCount: number, vector: Vector3): void;
		/**
		 * Sets a new vertex orientation value for the mesh.
		 **/
		setVertexOrientation(orientation: OrientationType): void;
		/**
		 * Replaces the vertexes of the mesh with a specified vertex list. The list of vertexes is defined with a set of vertex position objects.
		 **/
		editVerticesViaList(nVertices: number, indVertices: Array<OdTvVertexPos>, vertices: Array<Point3>): void;
		/**
		 * Replace vertices of the mesh starting with startPos
		 **/
		editVerticesViaRange(startRow: number, startColumn: number, nRows: number, nColumns: number, nVertices: number, vertices: any): void;
		/**
		 * Returns the number of columns in the mesh
		 **/
		getColumnsCount(): number;
		/**
		 * Retrieves the color for a specified mesh edge.
		 **/
		getEdgeColor(ind: number): OdTvColorDef;
		/**
		 * Retrieves colors for a specified range of mesh edges.
		 **/
		getEdgeColorsViaList(indEdges: Array<number>): Array<OdTvColorDef>;
		/**
		 * Retrieves colors for a specified range of mesh edges.
		 **/
		getEdgeColorsViaRange(indStart: number, nCount: number): Array<OdTvColorDef>;
		/**
		 * Retrieves the layer for a specified mesh edge.
		 **/
		getEdgeLayer(ind: number): OdTvLayerId;
		/**
		 * Retrieves layers for a specified range of mesh edges.
		 **/
		getEdgeLayersViaList(indEdges: Array<number>): Array<OdTvLayerId>;
		/**
		 * Retrieves layers for a specified range of mesh edges.
		 **/
		getEdgeLayersViaRange(indStart: number, nCount: number): Array<OdTvLayerId>;
		/**
		 * Retrieves the linetype for a specified mesh edge.
		 **/
		getEdgeLinetype(ind: number): OdTvLinetypeDef;
		/**
		 * Retrieves linetypes for a specified range of mesh edges.
		 **/
		getEdgeLinetypesViaList(indEdges: Array<number>): Array<OdTvLinetypeDef>;
		/**
		 * Retrieves linetypes for a specified range of mesh edges.
		 **/
		getEdgeLinetypesViaRange(indStart: number, nCount: number): Array<OdTvLinetypeDef>;
		/**
		 * Returns the number of edges in the mesh
		 **/
		getEdgesCount(): number;
		/**
		 * Retrieves current value of the selectable property for the edges of the mesh. Selectable property determines whether the edges of the mesh can be selected.
		 **/
		getEdgesSelectable(): boolean;
		/**
		 * Retrieves visibility parameters for a specified range of mesh edges.
		 **/
		getEdgeVisibilitiesViaList(indEdges: Array<number>): Array<OdTvVisibilityDef>;
		/**
		 * Retrieves visibility parameters for a specified range of mesh edges.
		 **/
		getEdgeVisibilitiesViaRange(indStart: number, nCount: number): Array<OdTvVisibilityDef>;
		/**
		 * Retrieves the visibility for a specified mesh edge.
		 **/
		getEdgeVisibility(ind: number): OdTvVisibilityDef;
		/**
		 * Retrieves the color for a specified mesh face.
		 **/
		getFaceColor(ind: number): OdTvColorDef;
		/**
		 * Retrieves colors for a specified range of mesh faces.
		 **/
		getFaceColorsViaList(indFaces: Array<number>): Array<OdTvColorDef>;
		/**
		 * Retrieves colors for a specified range of mesh faces.
		 **/
		getFaceColorsViaRange(indStart: number, nCount: number): Array<OdTvColorDef>;
		/**
		 * Retrieves the layer for a specified mesh face.
		 **/
		getFaceLayer(ind: number): OdTvLayerId;
		/**
		 * Retrieves layers for a specified range of mesh faces.
		 **/
		getFaceLayersViaList(indFaces: Array<number>): Array<OdTvLayerId>;
		/**
		 * Retrieves layers for a specified range of mesh faces.
		 **/
		getFaceLayersViaRange(indStart: number, nCount: number): Array<OdTvLayerId>;
		/**
		 * Retrieves the mapper for a specified mesh face.
		 **/
		getFaceMapper(ind: number): OdTvMapperDef;
		/**
		 * Retrieves mappers for a specified range of mesh faces.
		 **/
		getFaceMappersViaList(indFaces: Array<number>): Array<OdTvMapperDef>;
		/**
		 * Retrieves mappers for a specified range of mesh faces.
		 **/
		getFaceMappersViaRange(indStart: number, nCount: number): Array<OdTvMapperDef>;
		/**
		 * Retrieves the material for a specified mesh face.
		 **/
		getFaceMaterial(ind: number): OdTvMaterialDef;
		/**
		 * Retrieves materials for a specified range of mesh faces.
		 **/
		getFaceMaterialsViaList(indFaces: Array<number>): Array<OdTvMaterialDef>;
		/**
		 * Retrieves materials for a specified range of mesh faces.
		 **/
		getFaceMaterialsViaRange(indStart: number, nCount: number): Array<OdTvMaterialDef>;
		/**
		 * Retrieves the normal vector for a specified mesh face.
		 **/
		getFaceNormal(ind: number): Vector3;
		/**
		 * Retrieves normal vectors for a specified range of mesh faces.
		 **/
		getFaceNormalsViaList(indFaces: Array<number>): Array<Vector3>;
		/**
		 * Retrieves normal vectors for a specified range of mesh faces.
		 **/
		getFaceNormalsViaRange(indStart: number, nCount: number): Array<Vector3>;
		/**
		 * Returns the number of faces in the mesh
		 **/
		getFacesCount(): number;
		/**
		 * Retrieves current value of the selectable property for the faces of the mesh. Selectable property determines whether the faces of the mesh can be selected.
		 **/
		getFacesSelectable(): boolean;
		/**
		 * Retrieves the transparency for a specified mesh face.
		 **/
		getFaceTransparency(ind: number): OdTvTransparencyDef;
		/**
		 * Retrieves transparency parameters for a specified range of mesh faces.
		 **/
		getFaceTransparencyViaList(indFaces: Array<number>): Array<OdTvTransparencyDef>;
		/**
		 * Retrieves transparency parameters for a specified range of mesh faces.
		 **/
		getFaceTransparencyViaRange(indStart: number, nCount: number): Array<OdTvTransparencyDef>;
		/**
		 * Retrieves visibility parameters for a specified range of mesh faces.
		 **/
		getFaceVisibilitiesViaList(indFaces: Array<number>): Array<OdTvVisibilityDef>;
		/**
		 * Retrieves visibility parameters for a specified range of mesh faces.
		 **/
		getFaceVisibilitiesViaRange(indStart: number, nCount: number): Array<OdTvVisibilityDef>;
		/**
		 * Retrieves the visibility definition for a specified mesh face.
		 **/
		getFaceVisibility(ind: number): OdTvVisibilityDef;
		/**
		 * Retrieves the current mesh geometry parameters.
		 **/
		getParam(): any;
		/**
		 * Returns the rows of rows in the mesh
		 **/
		getRowsCount(): number;
		/**
		 * Retrieves the color for a specified mesh vertex.
		 **/
		getVertexColor(ind: number): OdTvRGBColorDef;
		/**
		 * Retrieves colors for a range of mesh vertexes.
		 **/
		getVertexColorsViaList(indVertices: Array<number>): Array<OdTvRGBColorDef>;
		/**
		 * Retrieves colors for a range of mesh vertexes.
		 **/
		getVertexColorsViaRange(indStart: number, nCount: number): Array<OdTvRGBColorDef>;
		/**
		 * Retrieves the texture coordinate for a specified mesh vertex.
		 **/
		getVertexMappingCoord(ind: number): VectorOdTvPoint2d;
		/**
		 * Retrieves texture coordinates for a specified range of mesh vertexes.
		 **/
		getVertexMappingCoordsViaList(indVert: Array<number>): VectorOdTvPoint2d;
		/**
		 * Retrieves texture coordinates for a specified range of mesh vertexes.
		 **/
		getVertexMappingCoordsViaRange(indStart: number, nCount: number): VectorOdTvPoint2d;
		/**
		 * Retrieves the normal vector for a specified mesh vertex.
		 **/
		getVertexNormal(ind: number): Vector3;
		/**
		 * Retrieves normal vectors for a list of mesh vertexes.
		 **/
		getVertexNormalsViaList(indVertices: Array<number>): Array<Vector3>;
		/**
		 * Retrieves normal vectors for a range of mesh vertexes.
		 **/
		getVertexNormalsViaRange(indStart: number, nCount: number): Array<Vector3>;
		/**
		 * Retrieves the current vertex orientation of the mesh.
		 **/
		getVertexOrientation(): OrientationType;
		/**
		 * Returns the number of vertices in the mesh
		 **/
		getVerticesCount(): number;
		/**
		 * Specifies whether to use spatial tree for selection.
		 **/
		setUseSpatialTreeForSelection(bUseSpatialTreeForSelection: boolean, nVerticesLimit: number): OdTvResult;
		/**
		 * Checks whether spatial tree is used for selection. This method also receives the minimum count of vertices for which to use a spatial tree if spatial tree is used.
		 **/
		getUseSpatialTreeForSelection(): number;
		delete(): void;
	}

	class OdTvRasterImage {
		isNull(): boolean;
		/**
		 * Return true if and only if this is the binary raster image. Otherwise it is a
		 **/
		isBinary(): boolean;
		/**
		 * Return the type of the raster image
		 **/
		getType(): number;
		/**
		 * Returns the XY pixel size of the image for this object.
		 **/
		getSize(): Vector3;
		/**
		 * Returns the alignment of the binary image data. In the case of source file based image this function returns 0 and appropriate error code
		 **/
		getAlignment(): number;
		/**
		 * Returns true if monochrome colors are inverted.
		 **/
		getInverted(): boolean;
		/**
		 * Sets the name of the source file containing the raster image. The raster image object starts to be the source file based
		 **/
		setSourceFileName(pathName: string): void;
		/**
		 * Returns the name of the source file containing the raster image. In the case of the binary raster image returns
		 **/
		getSourceFileName(): string;
		/**
		 * Loads the source image file for this object
		 **/
		load(): void;
		/**
		 * Unloads the image for this object.
		 **/
		unload(): void;
		/**
		 * Returns true if and only if the image file for this object is loaded.
		 **/
		isLoaded(): boolean;
		/**
		 * Retrieves the current database handle associated with the object.
		 **/
		getDatabaseHandle(): string;
		/**
		 * Get native database handle
		 **/
		getNativeDatabaseHandle(): string;
		delete(): void;
	}

	/**
	 * This is an interface class for an OdTvPointCloudData object.
	 **/
	class OdTvPointCloudData {
		isNull(): boolean;
		/**
		 * Set the array of points
		 **/
		setParam(controlPoints: any): void;
		/**
		 * Get the array of points
		 **/
		getParam(): any;
		/**
		 * Get the point size
		 **/
		getPointsCount(): number;
		/**
		 * Replace points of the point cloud starting with startPos
		 **/
		editPointsViaRange(startPos: number, points: any): void;
		/**
		 * Replace points defined by 'indPoints' of the point cloud
		 **/
		editPointsViaList(indPoints: any, points: any): void;
		/**
		 * Set the point size
		 **/
		setPointSize(pointSize: number): void;
		/**
		 * Get the point size
		 **/
		getPointSize(): number;
		/**
		 * Sets the colors for a list of points of the point cloud.
		 **/
		setPointColorsViaList(indPoints: any, colors: any): void;
		/**
		 * Sets a color for a range of points of the point cloud.
		 **/
		setPointColorsViaRange(indStart: number, nCount: number, color: any): void;
		/**
		 * Retrieves the color for a specified point of the point cloud.
		 **/
		getPointColor(ind: number): any;
		/**
		 * Sets the normal vectors for a list of points of the point cloud.
		 **/
		setPointNormalsViaList(indPoints: any, vectors: any): void;
		/**
		 * Sets a normal vector for a range of points of the point cloud.
		 **/
		setPointNormalsViaRange(indStart: number, vectors: any): void;
		/**
		 * Retrieves the normal vector for a specified point of the point cloud.
		 **/
		getPointNormal(ind: number): Vector3;
		/**
		 * Shows the normals for the point cloud.
		 **/
		setShowNormals(bShow: boolean, normalsLength: number, normalsColor: OdTvRGBColorDef): void;
		delete(): void;
	}

	/**
	 * The interface class for a raster image object identifier that allows access to the <link OdTvRasterImage, OdTvRasterImage> object.
	 **/
	class OdTvRasterImageId {
		/**
		 * Opens the raster image object determined with its identifier for a read or write operation.
		 **/
		openObject(): OdTvRasterImage;
		delete(): void;
	}

	class OdGiRasterImagePtr {
		delete(): void;
	}

	/**
	 * This class is an interface for the object that encapsulates GUI display windows.
	 **/
	class OdTvGsDevice {
		isNull(): boolean;
		/**
		 * Returns the gs device name
		 **/
		getGsDeviceName(): number;
		/**
		 * Sets the name for the device
		 **/
		setName(sName: string): void;
		/**
		 * Returns the name of the device
		 **/
		getName(): string;
		/**
		 * Returns true if this device is bitmap device
		 **/
		isBitmap(): boolean;
		/**
		 * Setup the device object if it was created as "non-setup". Otherwise will do nothing
		 **/
		setupGs(wnd_handle: number, wndRect: Rect, device: number, strVectorizerName: string): void;
		/**
		 * Setup the bitmap device object if it was created as "non-setup". Otherwise will do nothing
		 **/
		setupGsBitmap(x: number, y: number, device: number, strVectorizerName: string): void;
		/**
		 * Returns true if the gs part of the device is loaded
		 **/
		isGsLoaded(): boolean;
		/**
		 * Unload the gs (vectorizer) part for the device object
		 **/
		unloadGs(): void;
		/**
		 * Returns the smart pointer to the raster image object
		 **/
		getRasterImage(): OdGiRasterImagePtr;
		/**
		 * Marks for refresh the specified region of the GUI window of this Device object.
		 **/
		invalidate(screenRect: Rect): void;
		/**
		 * Returns true if and only if the GUI window for this Device object is showing the correct image.
		 **/
		isValid(): boolean;
		/**
		 * Updates the GUI window for this Device object.
		 **/
		update(): Rect;
		/**
		 * Notification function called whenever the size of the GUI window for this Device object has changed.
		 **/
		onSize(outputRect: Rect): void;
		/**
		 * Returns device surface output rectangle.
		 **/
		getSize(): Rect;
		/**
		 * Regen the contents of device according to regeneration mode
		 **/
		regen(regenMode: RegenMode): OdTvResult;
		/**
		 * Notification function called whenever the OS screen resolution and/or color depth have changed.
		 **/
		onDisplayChange(bitsPerPixel: number, xPixels: number, yPixels: number): void;
		/**
		 * Creates a new OdTvGsView object, and associates it with this Device object. Returns an Id to the newly created object.
		 **/
		createView(name: string, bNeedSaveInFile: boolean): View;
		/**
		 * Inserts the specified view object to the tail in this Device object.
		 **/
		addView(viewId: View): void;
		/**
		 * Inserts the specified view object to the specified position in this Device object.
		 **/
		insertView(viewIndex: number, viewId: View): void;
		/**
		 * Erases the specified View object (remove and erase)
		 **/
		eraseView(viewId: View): boolean;
		eraseViewByIndex(viewIndex: number): boolean;
		/**
		 * Removes the specified View object from the Device object
		 **/
		removeView(viewId: View): boolean;
		/**
		 * Erases all views associated with this Device object.
		 **/
		eraseAllViews(): void;
		/**
		 * Returns the number of views associated with this Device object.
		 **/
		numViews(): number;
		/**
		 * Returns the specified OdTvGsView object in which the specified point is inside.
		 **/
		viewAt(screenPoint: VectorOdTvPoint2d): View;
		/**
		 * Returns the specified OdTvGsView object associated with this Device object.
		 **/
		viewAtViewIndex(viewIndex: number): View;
		/**
		 * Returns the active OdTvGsView object associated with this Device object.
		 **/
		getActiveView(): View;
		/**
		 * Sets the Background Color of the GUI window of this Device object.
		 **/
		setBackgroundColor(backgroundColor: number): void;
		/**
		 * Returns the Background Color of the GUI window of this Device object.
		 **/
		getBackgroundColor(): number;
		/**
		 * Sets the logical palette to be used by this Device object.
		 **/
		setLogicalPalette(logicalPalette: any): void;
		/**
		 * Returns the logical palette used by this Device object.
		 **/
		getLogicalPalette(): any;
		/**
		 * Sets a boolean property of the device.
		 **/
		setOptionBool(opt: DeviceOptions, bVal: boolean): void;
		/**
		 * Sets an short integer property of the device.
		 **/
		setOptionInt16(opt: DeviceOptions, nVal: number): void;
		/**
		 * Sets an integer property of the device.
		 **/
		setOptionInt32(opt: DeviceOptions, nVal: number): void;
		/**
		 * Sets a double property of the device.
		 **/
		setOptionDouble(opt: DeviceOptions, dVal: number): void;
		/**
		 * Sets a double property of the device.
		 **/
		setOptionUInt32(opt: DeviceOptions, nVal: number): void;
		/**
		 * Gets a boolean property of the device.
		 **/
		getOptionBool(opt: DeviceOptions): boolean;
		/**
		 * Gets a short integer property of the device.
		 **/
		getOptionInt16(opt: DeviceOptions): number;
		/**
		 * Gets a integer property of the device.
		 **/
		getOptionInt32(opt: DeviceOptions): number;
		/**
		 * Gets a double property of the device.
		 **/
		getOptionDouble(opt: DeviceOptions): number;
		/**
		 * Gets a double property of the device.
		 **/
		getOptionUInt32(opt: DeviceOptions): number;
		/**
		 * Set On/off FPS displaying for the device
		 **/
		setShowFPS(bShow: boolean): boolean;
		/**
		 * Get On/off FPS displaying for the device
		 **/
		getShowFPS(): boolean;
		/**
		 * Set the lineweight display style configuration.
		 **/
		setLineWeightConfiguration(styleEntry: DeviceLineWeightStyle, uValue: number): boolean;
		/**
		 * Returns the lineweight display style configuration.
		 **/
		getLineWeightConfiguration(styleEntry: DeviceLineWeightStyle): number;
		/**
		 * Set the true if device should be active
		 **/
		setActive(bIsActive: boolean): boolean;
		/**
		 * Returns true if this device is active
		 **/
		getActive(): boolean;
		/**
		 * Switches the background partial viewing mode on or off for the device.
		 **/
		setBackgroundPartialView(bIsInBackground: boolean): void;
		/**
		 * Retrieves whether the background partial viewing mode is enabled or disabled.
		 **/
		getBackgroundPartialView(): boolean;
		/**
		 * Retrieves whether the background partial viewing mode is enabled for the device and the partial loading task is in progress.
		 **/
		getBackgroundPartialViewingInProgress(): boolean;
		/**
		 * Sets a new highlight style to the device.
		 **/
		setHighlightStyle(highlightStyleId: OdTvHighlightStyleId, bAutoRegen: boolean): void;
		/**
		 * Retrieves the current highlight style for the device.
		 **/
		getHighlightStyle(): OdTvHighlightStyleId;
		/**
		 * Sets an array of highlight styles to the device. Different objects can be highlighted with different styles from this array.
		 **/
		setHighlightStyles(styles: OdTvHighlightStyleIdJSArray, bAutoRegen: boolean): void;
		/**
		 * Retrieves the array of highlight styles for the device.
		 **/
		getHighlightStyles(): VectorOdTvHighlightStyleIdJSWrapper;
		/**
		 * Sets a flag which indicates that it is allowable to share an internal data between different devices if it is possible. Default value is true.
		 **/
		setAllowShareable(bAllow: boolean): void;
		/**
		 * Retrieves the current state of the flag which indicates that it is allowable to share an internal data between different devices if it is possible.
		 **/
		getAllowShareable(): boolean;
		/**
		 * Retrieves the current database handle associated with the object.
		 **/
		getDatabaseHandle(): string;
		/**
		 * Get native database handle
		 **/
		getNativeDatabaseHandle(): string;
		/**
		 * Allows to switch "non-setup" device to/from the bitmap mode
		 **/
		switchBitmapState(): void;
		/**
		 * Sets options for interactivity mode.
		 **/
		setInteractivityOptions(options: DeviceInteractivityOptions): void;
		/**
		 * Retrieves the options for an interactivity mode.
		 **/
		getInteractivityOptions(): DeviceInteractivityOptions;
		delete(): void;
	}

	/**
	 * This class represents a view solid background.
	 **/
	class OdTvGsViewSolidBackgroundPtr {
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		/**
		 * Sets a solid color to this background.
		 **/
		setColorSolid(color: OdTvColorDef): boolean;
		/**
		 * Retrieves the solid color of the background.
		 **/
		getColorSolid(): OdTvColorDef;
		/**
		 * Sets the name for the background.
		 **/
		setName(sName: string): boolean;
		/**
		 * Retrieves the name of the background.
		 **/
		getName(): string;
		/**
		 * Retrieves the current database handle associated with the object.
		 **/
		getDatabaseHandle(): string;
		/**
		 * Get native database handle
		 **/
		getNativeDatabaseHandle(): string;
		delete(): void;
	}

	/**
	 * This class represents a view gradient background.
	 **/
	class OdTvGsViewGradientBackgroundPtr {
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		/**
		 * Sets a top gradient color to this background.
		 **/
		setColorTop(color: OdTvColorDef): boolean;
		/**
		 * Retrieves the top gradient color of the background.
		 **/
		getColorTop(): OdTvColorDef;
		/**
		 * Sets a middle gradient color to this background.
		 **/
		setColorMiddle(color: OdTvColorDef): boolean;
		/**
		 * Retrieves the middle gradient color of the background.
		 **/
		getColorMiddle(): OdTvColorDef;
		/**
		 * Sets a bottom gradient color to this background.
		 **/
		setColorBottom(color: OdTvColorDef): boolean;
		/**
		 * Retrieves the bottom gradient color of the background.
		 **/
		getColorBottom(): OdTvColorDef;
		/**
		 * Sets the horizon value for the background.
		 **/
		setHorizon(dHorizon: number): boolean;
		/**
		 * Retrieves the horizon value of the background.
		 **/
		getHorizon(): number;
		/**
		 * Sets the height value for the background.
		 **/
		setHeight(dHeight: number): boolean;
		/**
		 * Retrieves the height value of the background.
		 **/
		getHeight(): number;
		/**
		 * Sets the rotation value for the background.
		 **/
		setRotation(dRotation: number): boolean;
		/**
		 * Retrieves the rotation value of the background.
		 **/
		getRotation(): number;
		/**
		 * Sets the name for the background.
		 **/
		setName(sName: string): boolean;
		/**
		 * Retrieves the name of the background.
		 **/
		getName(): string;
		/**
		 * Retrieves the current database handle associated with the object.
		 **/
		getDatabaseHandle(): string;
		/**
		 * Get native database handle
		 **/
		getNativeDatabaseHandle(): string;
		delete(): void;
	}

	/**
	 * This class represents a view image background.
	 **/
	class OdTvGsViewImageBackgroundPtr {
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		/**
		 * Sets the image file name to background.
		 **/
		setImageFilename(filename: string): boolean;
		/**
		 * Retrieves the image file name to background.
		 **/
		getImageFilename(): string;
		/**
		 * Sets the fit to screen flag value.
		 **/
		setFitToScreen(bFitToScreen: boolean): boolean;
		/**
		 * Retrieves the value of the fit to screen flag.
		 **/
		getFitToScreen(): boolean;
		/**
		 * Sets the maintain aspect ratio flag value.
		 **/
		setMaintainAspectRatio(bMaintainAspectRatio: boolean): boolean;
		/**
		 * Retrieves the value of the maintain aspect ratio flag.
		 **/
		getMaintainAspectRatio(): boolean;
		/**
		 * Sets the use tiling flag value.
		 **/
		setUseTiling(bUseTiling: boolean): boolean;
		/**
		 * Retrieves the value of the use tiling flag.
		 **/
		getUseTiling(): boolean;
		/**
		 * Sets the x offset value for the background.
		 **/
		setXOffset(dXOffset: number): void;
		/**
		 * Retrieves the x offset value of the background.
		 **/
		getXOffset(): number;
		/**
		 * Sets the y offset value for the background.
		 **/
		setYOffset(dYOffset: number): void;
		/**
		 * Retrieves the y offset value of the background.
		 **/
		getYOffset(): number;
		/**
		 * Sets the x scale value for the background.
		 **/
		setXScale(dXScale: number): void;
		/**
		 * Retrieves the x scale value of the background.
		 **/
		getXScale(): number;
		/**
		 * Sets the y scale value for the background.
		 **/
		setYScale(dYScale: number): void;
		/**
		 * Retrieves the y scale value of the background.
		 **/
		getYScale(): number;
		/**
		 * Sets the name for the background.
		 **/
		setName(sName: string): void;
		/**
		 * Retrieves the name of the background.
		 **/
		getName(): string;
		/**
		 * Retrieves the current database handle associated with the object.
		 **/
		getDatabaseHandle(): string;
		/**
		 * Get native database handle
		 **/
		getNativeDatabaseHandle(): string;
		delete(): void;
	}

	/**
	 * This class represents a view environment background.
	 **/
	class OdTvGsViewEnvironmentBackgroundPtr {
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		/**
		 * Specifies environment image file path to this background.
		 **/
		setEnvironmentImageFileName(sFileName: string): boolean;
		/**
		 * Retrieves environment image file path of this background.
		 **/
		getEnvironmentImageFileName(): string;
		/**
		 * Specifies longitude background rotation angle.
		 **/
		setLongitude(dLongitude: number): void;
		/**
		 * Retrieves longitude rotation angle in radians.
		 **/
		getLongitude(): number;
		/**
		 * Specifies latitude background rotation angle.
		 **/
		setLatitude(dLatitude: number): void;
		/**
		 * Retrieves latitude rotation angle in radians.
		 **/
		getLatitude(): number;
		setFovOverride(): any;
		/**
		 * Returns field of view angle override state.
		 **/
		getFovOverrideEnable(): boolean;
		/**
		 * Returns field of view override angle.
		 **/
		getFovOverrideAngle(): number;
		/**
		 * Sets the name for the background.
		 **/
		setName(sName: string): void;
		/**
		 * Retrieves the name of the background.
		 **/
		getName(): string;
		/**
		 * Retrieves the current database handle associated with the object.
		 **/
		getDatabaseHandle(): string;
		/**
		 * Get native database handle
		 **/
		getNativeDatabaseHandle(): string;
		delete(): void;
	}

	/**
	 * This is an interface class for access to any OdTvGsViewBackground.
	 **/
	class OdTvGsViewBackgroundId {
		/**
		 * Returns the type of a view background.
		 **/
		getType(): number;
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		/**
		 * Opens the view background determined with its identifier as an <link OdTvGsViewSolidBackground, OdTvGsViewSolidBackground> object for a read or write operation.
		 **/
		openAsSolidBackground(): OdTvGsViewSolidBackgroundPtr;
		/**
		 * Opens the view background determined with its identifier as an <link OdTvGsViewGradientBackground, OdTvGsViewGradientBackground> object for a read or write operation.
		 **/
		openAsGradientBackground(): OdTvGsViewGradientBackgroundPtr;
		/**
		 * Opens the view background determined with its identifier as an <link OdTvGsViewImageBackground, OdTvGsViewImageBackground> object for a read or write operation.
		 **/
		openAsImageBackground(): OdTvGsViewImageBackgroundPtr;
		/**
		 * Opens the view background determined with its identifier as an <link OdTvGsViewEnvironmentBackground, OdTvGsViewEnvironmentBackground> object for a read or write operation.
		 **/
		openAsEnvironmentBackground(): OdTvGsViewEnvironmentBackgroundPtr;
		delete(): void;
	}

	/**
	 * The interface class for a linetype object identifier that allows access to the <link OdTvLinetype, OdTvLinetype> object.
	 **/
	class OdTvLinetypeId {
		/**
		 * Returns the smart ptr to the OdTvLinetype object smart ptr
		 **/
		openObject(): OdTvLinetypePtr;
		delete(): void;
	}

	class OdTvLinetypeElementPtr {
		delete(): void;
	}

	class OdTvLinetypePtr {
		isNull(): boolean;
		/**
		 * Sets the line type elements for this line type
		 **/
		setElements(elements: Array<OdTvLinetypeElementPtr>): OdTvResult;
		/**
		 * Returns the line type elements array for this line type
		 **/
		getElements(): Array<OdTvLinetypeElementPtr>;
		/**
		 * Sets the name for the linetype object.
		 **/
		setName(sName: string): OdTvResult;
		/**
		 * Returns the name of the line type object.
		 **/
		getName(): string;
		/**
		 * Sets the description for the linetype record object. It can be a comment or series of underscores,
		 **/
		setDescription(sName: string): OdTvResult;
		/**
		 * Returns the description of the linetype. It is a comment or series
		 **/
		getDescription(): string;
		/**
		 * Sets the alignment scaling to fit for the linetype.
		 **/
		setScaledToFit(bScaleToFit: boolean): OdTvResult;
		/**
		 * Determines whether or not the alignment is scaled to fit and returns True if the
		 **/
		getScaledToFit(): boolean;
		/**
		 * Retrieves the current database handle associated with the object.
		 **/
		getDatabaseHandle(): string;
		/**
		 * Get native database handle
		 **/
		getNativeDatabaseHandle(): string;
		delete(): void;
	}

	/**
	 * The interface class for a layer object identifier that allows access to the <link OdTvLayer, OdTvLayer> object.
	 **/
	class OdTvLayerId {
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		/**
		 * Opens the layer determined with its identifier for a read or write operation.
		 **/
		openObject(): OdTvLayerPtr;
		delete(): void;
	}

	class OdTvLayerPtr {
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		/**
		 * Sets the visible status as a Boolean value. The initial value is true (Visible) by
		 **/
		setVisible(bVisible: boolean): OdTvResult;
		/**
		 * Determines whether the layer is visible (negative is invisible, positive
		 **/
		getVisible(): boolean;
		/**
		 * Sets the name for the layer.
		 **/
		setName(sName: string): OdTvResult;
		/**
		 * Returns the name of the layer.
		 **/
		getName(): string;
		/**
		 * Sets the color for the layer. This color is used when the
		 **/
		setColor(color: OdTvColorDef): OdTvResult;
		/**
		 * Returns the color for the layer. This color is used when
		 **/
		getColor(): OdTvColorDef;
		/**
		 * Sets the lineweight for the layer. This lineweight is used when the
		 **/
		setLineWeight(lw: OdTvLineWeightDef): OdTvResult;
		/**
		 * Returns the lineweight of the layer. This lineweight is used when
		 **/
		getLineWeight(): OdTvLineWeightDef;
		/**
		 * Sets the ID of the linetype. This method associates layer and linetype. This linetype is used when
		 **/
		setLinetype(linetypeDef: OdTvLinetypeDef): OdTvResult;
		/**
		 * Returns the ID of the linetype associated with the layer. This linetype is
		 **/
		getLinetype(): OdTvLinetypeDef;
		/**
		 * Sets the description for the layer as a String value up to 255 letters length.
		 **/
		setDescription(sDescription: string): OdTvResult;
		/**
		 * Returns the description for the layer.
		 **/
		getDescription(): string;
		/**
		 * Sets the transparency for the layer. This transparency is used when the
		 **/
		setTransparency(transparency: OdTvTransparencyDef): OdTvResult;
		/**
		 * Returns the transparency of the layer. This transparency is used when
		 **/
		getTransparency(): OdTvTransparencyDef;
		/**
		 * Set the material of the layer
		 **/
		setMaterial(material: OdTvMaterialDef): OdTvResult;
		/**
		 * Get the material of the layer
		 **/
		getMaterial(): OdTvMaterialDef;
		/**
		 * Sets the visibility status for the layer object.
		 **/
		setTotallyInvisible(bTotallyInvisible: boolean): OdTvResult;
		/**
		 * Checks whether the layer is totally invisible.
		 **/
		getTotallyInvisible(): boolean;
		/**
		 * Retrieves the current database handle associated with the object.
		 **/
		getDatabaseHandle(): string;
		/**
		 * Get native database handle
		 **/
		getNativeDatabaseHandle(): string;
		delete(): void;
	}

	/**
	 * The base interface class for working with Visualize SDK transparency definition objects.
	 **/
	class OdTvTransparencyDef {
		/**
		 * Creates a new transparency definition object with default parameters.
		 **/
		constructor();
		/**
		 * Creates a new transparency definition object with default parameters.
		 **/
		constructor(arg0: number);
		/**
		 * Retrieves the current type of the transparency definition object.
		 **/
		getType(): TransparencyType;
		/**
		 * Retrieves the current inherited transparency value of the transparency definition object.
		 **/
		getInheritedTransparency(): InheritedAttribute;
		/**
		 * Retrieves the current transparency value of the transparency definition object.
		 **/
		getValue(): number;
		/**
		 * Sets the transparency object as the default.
		 **/
		setDefault(): void;
		/**
		 * Sets a new inherited transparency for the linetype definition object.
		 **/
		setInherited(inhAttr: InheritedAttribute): void;
		/**
		 * Sets a new transparency value for the transparency definition object.
		 **/
		setValue(dPercentage: number): void;
		delete(): void;
	}

	class OdTvMaterialPtr {
		isNull(): boolean;
		/**
		 * Sets the name of this Material object.
		 **/
		setName(sName: string): OdTvResult;
		/**
		 * Gets the name of this Material object.
		 **/
		getName(): string;
		/**
		 * Sets the description of this Material object.
		 **/
		setDescription(sDescription: string): OdTvResult;
		/**
		 * Gets the description of this Material object.
		 **/
		getDescription(): string;
		/**
		 * Sets the ambient (shadow) color of this Material object.
		 **/
		setAmbient(ambientColor: OdTvMaterialColor): OdTvResult;
		/**
		 * Gets the ambient (shadow) color of this Material object.
		 **/
		getAmbient(): OdTvMaterialColor;
		/**
		 * Sets the diffuse (main) color of this Material object
		 **/
		setDiffuse(diffuseColor: OdTvMaterialColor, diffuseMap: OdTvMaterialMap): OdTvResult;
		/**
		 * Gets the diffuse (main) color of this Material object
		 **/
		getDiffuseColor(): OdTvMaterialColor;
		/**
		 * Retrieves the current diffuse (main) color of the material object.
		 **/
		getDiffuseMap(): OdTvMaterialMap;
		/**
		 * Sets the specular (reflection) color of this Material object.
		 **/
		setSpecular(specularColor: OdTvMaterialColor, dGlossFactor: number): OdTvResult;
		/**
		 * Gets the specular (reflection) color of this Material object.
		 **/
		getSpecularColor(): OdTvMaterialColor;
		getSpecularGlossFactor(): number;
		/**
		 * Sets the emission color of this Material object.
		 **/
		setEmission(emissionColor: OdTvMaterialColor): OdTvResult;
		/**
		 * Sets the emission color of this Material object.
		 **/
		setEmission(emissionColor: OdTvMaterialColor, emissionMap: OdTvMaterialMap): OdTvResult;
		/**
		 * Gets the emission color of this Material object.
		 **/
		getEmission(): OdTvMaterialColor;
		/**
		 * Gets the emission map of this Material object.
		 **/
		getEmissionMap(): OdTvMaterialMap;
		/**
		 * Sets the specular gloss of this Material object.
		 **/
		setSpecularGloss(dSpecularGloss: number): OdTvResult;
		/**
		 * Gets the specular gloss of this Material object.
		 **/
		getSpecularGloss(): number;
		/**
		 * Sets the opacity component of this Material object.
		 **/
		setOpacity(dOpacityPercentage: number): OdTvResult;
		/**
		 * Gets the opacity component of this Material object.
		 **/
		getOpacity(): number;
		/**
		 * Gets the opacity map component of this Material object.
		 **/
		getOpacityMap(): OdTvMaterialMap;
		/**
		 * Sets the bump component of this Material object.
		 **/
		setBump(bumpMap: OdTvMaterialMap): void;
		/**
		 * Returns the bump component of this Material object.
		 **/
		getBump(): OdTvMaterialMap;
		/**
		 * Sets the tint component of this Material object.
		 **/
		setTint(tintColor: OdTvMaterialColor, bEnable: boolean): void;
		/**
		 * Retrieves the tint color of this Material object.
		 **/
		getTintColor(): OdTvMaterialColor;
		/**
		 * Retrieves whether the tint component is enabled for this Material object.
		 **/
		getTintEnabled(): boolean;
		/**
		 * Sets a new secondary ambient (shadow) color for the material object.
		 **/
		setSecondaryAmbient(ambientColor: OdTvMaterialColor): void;
		/**
		 * Retrieves the current secondary ambient (shadow) color of the material object.
		 **/
		getSecondaryAmbient(): OdTvMaterialColor;
		/**
		 * Sets a new secondary diffuse color for the material object.
		 **/
		setSecondaryDiffuse(diffuseColor: OdTvMaterialColor): void;
		/**
		 * Retrieves the current secondary diffuse color of the material object.
		 **/
		getSecondaryDiffuse(): OdTvMaterialColor;
		/**
		 * Sets a new secondary specular (reflection) for the material object.
		 **/
		setSecondarySpecular(specularColor: OdTvMaterialColor): void;
		/**
		 * Retrieves the current secondary specular (reflection) of the material object.
		 **/
		getSecondarySpecular(): OdTvMaterialColor;
		/**
		 * Sets a new secondary opacity value for the material object.
		 **/
		setSecondaryOpacity(opacityPercentage: number): void;
		/**
		 * Retrieves the current secondary opacity value of the material object.
		 **/
		getSecondaryOpacity(): number;
		/**
		 * Enables or disables non-texture mode support for the material object.
		 **/
		setSupportNonTextureMode(bNonTextureMode: boolean): void;
		/**
		 * Retrieves whether non-texture mode support is enabled for the material object.
		 **/
		getSupportNonTextureMode(): boolean;
		/**
		 * Retrieves the current database identifier associated with the object.
		 **/
		getHandle(): string;
		/**
		 * Get native database handle
		 **/
		getNativeDatabaseHandle(): string;
		/**
		 * Sets the overriding rule for the specular highlighting
		 **/
		setUseVisualStyleSpecular(flag: MaterialVisualStyleSpecular, dMaxSpecularFactor: number): void;
		/**
		 * Returns the overriding rule for the specular highlighting
		 **/
		getUseVisualStyleSpecular(): any;
		/**
		 * Sets the reflectivity of this Material object.
		 **/
		setReflectivity(reflectivity: number, bEnable: boolean, type: MaterialReflectivityType, textureSourceFileName: string): void;
		/**
		 * Returns the reflectivity component of this Material object.
		 **/
		getReflectivity(): any;
		/**
		 * Sets the softness (blur amount) of the reflectivity texture.
		 **/
		setReflectivitySoftness(softness: number): void;
		/**
		 * Returns the softness (blur amount) of the reflectivity texture of this Material object.
		 **/
		getReflectivitySoftness(): number;
		/**
		 * Sets the luminance mode for the material object.
		 **/
		setLuminanceMode(mode: MaterialLuminanceMode): void;
		/**
		 * Retrieves the current luminance mode of the material object.
		 **/
		getLuminanceMode(): MaterialLuminanceMode;
		delete(): void;
	}

	/**
	 * The interface class for a material object identifier that allows access to the <link OdTvMaterial, OdTvMaterial> object.
	 **/
	class OdTvMaterialId {
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		/**
		 * Opens the material determined with its identifier for a read or write operation.
		 **/
		openObject(): OdTvMaterialPtr;
		delete(): void;
	}

	/**
	 * The base interface class for working with Visualize SDK color definition objects.
	 **/
	class OdTvColorDef {
		constructor(r: number, g: number, b: number);
		constructor(arg0: InheritedAttribute);
		constructor();
		/**
		 * Return color method type
		 **/
		getTypeEnum(): ColorType;
		/**
		 * Returns red, green and blue color components
		 **/
		getColor(): any;
		/**
		 * Returns the inherited color
		 **/
		getInheritedColor(): number;
		/**
		 * Returns the index color
		 **/
		getIndexedColor(): number;
		/**
		 * Set the RGB colors
		 **/
		setColor(r: number, g: number, b: number): void;
		/**
		 * Set the inherited color
		 **/
		setInheritedColor(lt: number): void;
		/**
		 * Set the index color
		 **/
		setIndexedColor(colorInd: number): void;
		/**
		 * Set the default color
		 **/
		setDefault(): void;
		delete(): void;
	}

	/**
	 * The base interface class for working with Visualize SDK RGB color definition objects.
	 **/
	class OdTvRGBColorDef {
		constructor(r: number, g: number, b: number);
		/**
		 * Returns red, green and blue color components
		 **/
		getColor(): any;
		/**
		 * Set the RGB colors
		 **/
		setColor(r: number, g: number, b: number): void;
		/**
		 * Returns the true if and only if the color is default
		 **/
		isDefault(): boolean;
		/**
		 * Set that the color is default
		 **/
		setDefault(): void;
		delete(): void;
	}

	/**
	 * The base class that implements the definition and handling of a full path to a Visualize SDK sub-item entity.
	 **/
	class OdTvSubItemPath {
		constructor();
		/**
		 * Retrieves the current array of entity identifiers of the sub-item full path object.
		 **/
		entitiesIds(): OdTvEntityIdArray;
		/**
		 * Retrieves the current array of geometry data identifiers of the sub-item full path object.
		 **/
		geometryDatasIds(): OdTvGeometryDataIdArray;
		/**
		 * Retrieves the current sub-geometry identifiers of the sub-item full path object.
		 **/
		subGeometryId(): OdTvSubGeometryId;
		/**
		 * Append entity to array of entity identifiers of the sub-item full path object.
		 **/
		pushBackEntity(entityId: OdTvEntityId): void;
		/**
		 * Append geometry to array of geometry identifiers of the sub-item full path object.
		 **/
		pushBackGeometryData(geometryDataId: OdTvGeometryDataId): void;
		/**
		 * Set current sub-geometry identifiers of the sub-item full path object.
		 **/
		setSubGeometry(subGeometryId: OdTvSubGeometryId): void;
		/**
		 * Remove entity from array of entity identifiers of the sub-item full path object.
		 **/
		removeEntity(entityId: OdTvEntityId): void;
		/**
		 * Remove geometry from array of geometry identifiers of the sub-item full path object.
		 **/
		removeGeometryData(geometryDataId: OdTvGeometryDataId): void;
		delete(): void;
	}

	/**
	 * The base interface class that implements functionality for working with identifiers of sub-geometry entities supported by ODA Visualize SDK.
	 **/
	class OdTvSubGeometryId {
		constructor();
		constructor(arg0: OdTvSubGeometryId);
		/**
		 * Retrieves the current sub-geometry type.
		 **/
		type(): SubGeometryType;
		/**
		 * Sets a new sub-geometry type of the identifier object.
		 **/
		setType(type: SubGeometryType): void;
		/**
		 * Retrieves the current indexes of the identifier object.
		 **/
		indexes(): Array<number>;
		/**
		 * Retrieves the current indexes map of the identifier object.
		 **/
		indexesMap(): Array<number>;
		/**
		 * Sets new indexes to the identifier object.
		 **/
		setIndexes(indexes: Array<number>): void;
		/**
		 * Adds a new index to the index array of the identifier object.
		 **/
		addIndex(index: number, bCheckDuplication: boolean): void;
		/**
		 * Adds a new index array to the index array of the identifier object.
		 **/
		addIndexes(indexes: Array<number>, bCheckDuplication: boolean): void;
		delete(): void;
	}

	/**
	 * The base interface class for working with Visualize SDK linetype definition objects.
	 **/
	class OdTvLinetypeDef {
		constructor();
		/**
		 * Return linetype method type
		 **/
		getType(): number;
		/**
		 * Return linetype
		 **/
		getLinetype(): OdTvLinetypeId;
		/**
		 * Return inherited linetype
		 **/
		getInheritedLinetype(): number;
		/**
		 * Return predefined linetype
		 **/
		getPredefinedLinetype(): number;
		/**
		 * Set the linetype
		 **/
		setLinetype(lt: OdTvLinetypeId): void;
		/**
		 * Set the inherited linetype
		 **/
		setInheritedLinetype(lt: InheritedAttribute): void;
		/**
		 * Set the predefined linetype
		 **/
		setPredefinedLinetype(lt: LinetypePredefined): void;
		/**
		 * Set the default for linetype
		 **/
		setDefault(): void;
		delete(): void;
	}

	/**
	 * The interface class for a visual style object identifier that allows access to the <link OdTvVisualStyle, OdTvVisualStyleId> object.
	 **/
	class OdTvVisualStyleId {
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		/**
		 * Opens the visual style determined by its identifier for a read or write operation.
		 **/
		openObject(): OdTvVisualStyle;
		delete(): void;
	}

	class OdTvVisualStyle {
		isNull(): boolean;
		/**
		 * Sets the description for the visual style.
		 **/
		setDescription(description: string): OdTvResult;
		/**
		 * Returns the description for the visual style as a string.
		 **/
		getDescription(): string;
		/**
		 * Sets the name for the visual style
		 **/
		setName(sName: string): OdTvResult;
		/**
		 * Returns the name for the visual style as a string.
		 **/
		getName(): string;
		/**
		 * Determines whether the visual style is default or not.
		 **/
		getDefault(): boolean;
		/**
		 * Copy options from the given visual style
		 **/
		copyFrom(vsId: OdTvVisualStyleId): OdTvResult;
		/**
		 * Sets an integer option of the visual style.
		 **/
		setOptionInt32(opt: VisualStyleOptions, nVal: number, op: VisualStyleOperations): OdTvResult;
		/**
		 * Sets a boolean option of the visual style.
		 **/
		setOptionBool(opt: VisualStyleOptions, bVal: boolean, op: VisualStyleOperations): OdTvResult;
		/**
		 * Sets a double option of the visual style.
		 **/
		setOptionDouble(opt: VisualStyleOptions, dVal: number, op: VisualStyleOperations): OdTvResult;
		/**
		 * Sets a color option of the visual style.
		 **/
		setOptionColor(opt: VisualStyleOptions, color: OdTvColorDef, op: VisualStyleOperations): OdTvResult;
		/**
		 * Gets an integer option of the visual style.
		 **/
		getOptionInt32(opt: VisualStyleOptions): number;
		getOptionInt32Operation(opt: VisualStyleOptions): VisualStyleOperations;
		/**
		 * Gets a boolean option of the visual style.
		 **/
		getOptionBool(opt: VisualStyleOptions): boolean;
		getOptionBoolOperation(opt: VisualStyleOptions): VisualStyleOperations;
		/**
		 * Gets a double option of the visual style.
		 **/
		getOptionDouble(opt: VisualStyleOptions): number;
		getOptionDoubleOperation(opt: VisualStyleOptions): VisualStyleOperations;
		/**
		 * Gets a color option of the visual style.
		 **/
		getOptionColor(opt: VisualStyleOptions): OdTvColorDef;
		getOptionColorOperation(opt: VisualStyleOptions): VisualStyleOperations;
		/**
		 * Retrieves the current database identifier associated with the object.
		 **/
		getHandle(): string;
		/**
		 * Get native database handle
		 **/
		getNativeDatabaseHandle(): string;
		/**
		 * Copies all visual style's data to a specified visual style.
		 **/
		copyTo(targetVisualStyleId: OdTvVisualStyleId): void;
		delete(): void;
	}

	/**
	 * The base interface class for color management of Visualize SDK material entities.
	 **/
	class OdTvMaterialColor {
		constructor();
		/**
		 * Sets the color method for this MaterialColor object.
		 **/
		setMethod(method: MaterialColorMethod): OdTvResult;
		/**
		 * Gets the color method for this MaterialColor object.
		 **/
		getMethod(): MaterialColorMethod;
		/**
		 * Sets the color factor for this MaterialColor object.
		 **/
		setFactor(dFactor: number): OdTvResult;
		/**
		 * Gets the color factor for this MaterialColor object.
		 **/
		getFactor(): number;
		/**
		 * Sets the color for this MaterialColor object.
		 **/
		setColor(color: OdTvColorDef): OdTvResult;
		/**
		 * Gets the color for this MaterialColor object.
		 **/
		getColor(): OdTvColorDef;
		delete(): void;
	}

	class OdTvModelsIterator {
		/**
		 * Retrieves the model that is currently referenced by the iterator object.
		 **/
		getModel(): TvModel;
		/**
		 * Determines whether the traversal through the iterator was completed.
		 **/
		done(): boolean;
		/**
		 * Steps to the next value in the iterator object.
		 **/
		step(): boolean;
		/**
		 * Searches the entity defined through its identifier and moves the iterator to this entity if found.
		 **/
		seek(modelId: TvModel): boolean;
		delete(): void;
	}

	class OdTvLayersIterator {
		/**
		 * Retrieves the layer that is currently referenced by the iterator object.
		 **/
		getLayer(): OdTvLayerId;
		/**
		 * Determines whether the traversal through the iterator was completed.
		 **/
		done(): boolean;
		/**
		 * Steps to the next value in the iterator object.
		 **/
		step(): boolean;
		/**
		 * Searches the entity defined through its identifier and moves the iterator to this entity if found.
		 **/
		seek(layerId: OdTvLayerId): boolean;
		delete(): void;
	}

	class OdTvMaterialsIterator {
		/**
		 * Retrieves the material object that is currently referenced by the iterator object.
		 **/
		getMaterial(): OdTvMaterialId;
		/**
		 * Determines whether the traversal through the iterator was completed.
		 **/
		done(): boolean;
		/**
		 * Steps to the next value in the iterator object.
		 **/
		step(): boolean;
		/**
		 * Searches the entity defined through its identifier and moves the iterator to this entity if found.
		 **/
		seek(materialId: OdTvMaterialId): boolean;
		delete(): void;
	}

	class OdTvVisualStylesIterator {
		/**
		 * Retrieves the visual style that is currently referenced by the iterator object.
		 **/
		getVisualStyle(): OdTvVisualStyleId;
		/**
		 * Determines whether the traversal through the iterator was completed.
		 **/
		done(): boolean;
		/**
		 * Steps to the next value in the iterator object.
		 **/
		step(): boolean;
		/**
		 * Searches the entity defined through its identifier and moves the iterator to this entity if found.
		 **/
		seek(visualStyleId: OdTvVisualStyleId): boolean;
		delete(): void;
	}

	class OdTvTextStylesIterator {
		/**
		 * Retrieves the text style that is currently referenced by the iterator object.
		 **/
		getTextStyle(): OdTvTextStyleId;
		/**
		 * Determines whether the traversal through the iterator was completed.
		 **/
		done(): boolean;
		/**
		 * Steps to the next value in the iterator object.
		 **/
		step(): boolean;
		/**
		 * Searches the entity defined through its identifier and moves the iterator to this entity if found.
		 **/
		seek(textStyleId: OdTvTextStyleId): boolean;
		delete(): void;
	}

	class OdTvBlocksIterator {
		/**
		 * Gets the block currently referenced by the iterator.
		 **/
		getBlock(): OdTvBlockId;
		/**
		 * Determines whether the traversal through the iterator was completed.
		 **/
		done(): boolean;
		/**
		 * Steps to the next value in the iterator object.
		 **/
		step(): boolean;
		/**
		 * Searches the entity defined through its identifier and moves the iterator to this entity if found.
		 **/
		seek(blockId: OdTvBlockId): boolean;
		delete(): void;
	}

	class OdTvRasterImagesIterator {
		/**
		 * Retrieves the raster image that is currently referenced by the iterator object.
		 **/
		getRasterImage(): OdTvRasterImageId;
		/**
		 * Determines whether the traversal through the iterator was completed.
		 **/
		done(): boolean;
		/**
		 * Steps to the next value in the iterator object.
		 **/
		step(): boolean;
		/**
		 * Searches the entity defined through its identifier and moves the iterator to this entity if found.
		 **/
		seek(imageId: OdTvRasterImageId): boolean;
		delete(): void;
	}

	class OdTvGsDevicesIterator {
		/**
		 * Retrieves the device that is currently referenced by the iterator object.
		 **/
		getDevice(): OdTvGsDevice;
		/**
		 * Determines whether the traversal through the iterator was completed.
		 **/
		done(): boolean;
		/**
		 * Steps to the next value in the iterator object.
		 **/
		step(): boolean;
		/**
		 * Searches the entity defined through its identifier and moves the iterator to this entity if found.
		 **/
		seek(deviceId: OdTvGsDeviceId): boolean;
		delete(): void;
	}

	class OdTvGsViewBackgroundsIterator {
		/**
		 * Retrieves the view background that is currently referenced by the iterator object.
		 **/
		getGsViewBackground(): OdTvGsViewBackgroundId;
		/**
		 * Determines whether the traversal through the iterator was completed.
		 **/
		done(): boolean;
		/**
		 * Steps to the next value in the iterator object.
		 **/
		step(): boolean;
		/**
		 * Searches the entity defined through its identifier and moves the iterator to this entity if found.
		 **/
		seek(viewBackgroundId: OdTvGsViewBackgroundId): boolean;
		delete(): void;
	}

	class OdTvLinetypesIterator {
		/**
		 * Retrieves the linetype that is currently referenced by the iterator object.
		 **/
		getLinetype(): OdTvLinetypeId;
		/**
		 * Determines whether the traversal through the iterator was completed.
		 **/
		done(): boolean;
		/**
		 * Steps to the next value in the iterator object.
		 **/
		step(): boolean;
		/**
		 * Searches the entity defined through its identifier and moves the iterator to this entity if found.
		 **/
		seek(linetypeId: OdTvLinetypeId): boolean;
		delete(): void;
	}

	/**
	 * The base class that implements the definition and handling of selection options for entities supported by Visualize SDK.
	 **/
	class OdTvSelectionOptions {
		constructor();
		/**
		 * Return the selection level
		 **/
		getLevel(): SelectionLevel;
		/**
		 * Set level
		 **/
		setLevel(level: SelectionLevel): void;
		/**
		 * Returns the selection mode
		 **/
		getMode(): SelectionMode;
		/**
		 * Set the selection mode
		 **/
		setMode(mode: SelectionMode): void;
		/**
		 * Returns the pick box size (valid only for 'kPoint' mode)
		 **/
		getPickBoxSize(): number;
		/**
		 * Set the pick box size (valid only for 'kPoint' mode)
		 **/
		setPickBoxSize(size: number): void;
		/**
		 * Set the default param
		 **/
		setDefault(): void;
		delete(): void;
	}

	/**
	 * The abstract interface class for the iterator of Visualize SDK selected objects.
	 **/
	class OdTvSelectionSetIterator {
		/**
		 * Retrieves the selected entity.
		 **/
		getEntity(): OdTvEntityId;
		/**
		 * Retrieves the currently selected sub-entity (this method is not implemented yet)
		 **/
		getSubEntity(): OdTvGeometryDataId;
		/**
		 * Retrieves the currently selected geometry data entity.
		 **/
		getGeometryData(): OdTvGeometryDataId;
		/**
		 * Determines whether the traversal through the iterator was completed.
		 **/
		done(): boolean;
		/**
		 * Steps to the next value in the iterator object.
		 **/
		step(): void;
		/**
		 * Returns the current full path to the selected item.
		 **/
		getPath(): OdTvSubItemPath;
		/**
		 * Retrieves selected faces for a selected shell or mesh entity.
		 **/
		getFaces(): Array<number>;
		/**
		 * Retrieves selected edges for a selected shell or mesh entity.
		 **/
		getEdges(): Array<number>;
		/**
		 * Retrieves selected vertices for a selected shell or mesh entity (this method is not implemented yet)
		 **/
		getVertices(): Array<number>;
		delete(): void;
	}

	/**
	 * The abstract interface class for managing a set of selected Visualize SDK objects.
	 **/
	class OdTvSelectionSet {
		constructor();
		isNull(): boolean;
		/**
		 * Retrieves the iterator for getting access to items that are contained in the selection set object.
		 **/
		getIterator(): OdTvSelectionSetIterator;
		/**
		 * Retrieves the quantity of items that are contained in the selection set.
		 **/
		numItems(): number;
		/**
		 * Appends a new entity item to the selection set.
		 **/
		appendEntity(id: OdTvEntityId): void;
		/**
		 * Retrieves whether a specified entity is contained in the selection set.
		 **/
		isMember(id: OdTvEntityId): boolean;
		/**
		 * Appends a new sub-entity item (a sub-entity, geometry or sub-geometry entity) with a specified full path.
		 **/
		appendSubEntity(entityId: OdTvEntityId, subItemPath: OdTvSubItemPath): void;
		/**
		 * Retrieves the current selection options for the selection set.
		 **/
		getOptions(): OdTvSelectionOptions;
		/**
		 * Appends a new entity item to the selection set.
		 **/
		removeEntity(id: OdTvEntityId): void;
		/**
		 * Merge selection set with add entity
		 **/
		add(set: OdTvSelectionSet): void;
		/**
		 * Merge selection set with remove if entity is exists
		 **/
		remove(set: OdTvSelectionSet): void;
		delete(): void;
	}

	/**
	 * This class represents collided pairs.
	 **/
	class OdTvCollidedPair {
		/**
		 * Constructs the instance of OdTvCollidedPair.
		 **/
		constructor();
		/**
		 * Initializes the instance of OdTvCollidedPair.
		 **/
		initialize(first: OdTvSubItemPath, second: OdTvSubItemPath, distance: number): void;
		/**
		 * Provides access to the first collided element.
		 **/
		first(): OdTvSubItemPath;
		/**
		 * Provides access to the second collided element.
		 **/
		second(): OdTvSubItemPath;
		/**
		 * Provides access to the collision distance.
		 **/
		distance(): number;
		delete(): void;
	}

	/**
	 * The abstract interface class for managing a set of collided Visualize SDK objects.
	 **/
	class OdTvCollidedResult {
		/**
		 * Creates a new collided objects set with specified selection level.
		 **/
		static createObject(level: SelectionLevel): OdTvCollidedResult;
		/**
		 * Retrieves the iterator for getting access to items that are contained in the collided result object.
		 **/
		getIterator(): OdTvSelectionSetIterator;
		/**
		 * Retrieves the quantity of items that are contained in the collided result.
		 **/
		numItems(): number;
		/**
		 * Retrieves the current selection level for the collided result.
		 **/
		getLevel(): SelectionLevel;
		/**
		 * Removes the entity item from the collided result (all subentity paths for this entity also will be removed).
		 **/
		removeEntity(id: OdTvEntityId): void;
		/**
		 * Removes the sub-entity item (a sub-entity, geometry or sub-geometry entity) with a specified full path from the collided result.
		 **/
		removeSubEntity(entityId: OdTvEntityId, subItemPath: OdTvSubItemPath): void;
		/**
		 * Append all members from incoming collided result to this collided results (results should have the same level - see getLevel method)
		 **/
		append(results: OdTvCollidedResult): void;
		delete(): void;
	}

	/**
	 * This class represents collision detection options.
	 **/
	class OdTvCollisionOptions {
		constructor();
		/**
		 * Retrieves the collision detection type.
		 **/
		type(): CollisionDetectionType;
		/**
		 * Specifies collision detection type.
		 **/
		setType(t: CollisionDetectionType): void;
		/**
		 * Retrieves the collision detection level.
		 **/
		level(): SelectionLevel;
		/**
		 * Specifies collision detection level.
		 **/
		setLevel(level: SelectionLevel): void;
		/**
		 * Retrieves the collision detection tolerance.
		 **/
		tolerance(): number;
		/**
		 * Specifies collision detection tolerance.
		 **/
		setTolerance(tol: number): void;
		/**
		 * Checks whether collision detection calculates collision distance.
		 **/
		calculateDistance(): boolean;
		/**
		 * Specifies whether collision detection should calculate collision distance.
		 **/
		setCalculateDistance(bCalc: boolean): void;
		delete(): void;
	}

	class OdTvBoxData {
		isNull(): boolean;
		/**
		 * Sets parameters of the box.
		 **/
		setParam(centerPt: Point3, dLength: number, dWidth: number, dHeight: number, baseNormal: Vector3, lengthDir: Vector3): OdTvResult;
		/**
		 * Retrieves parameters of the box.
		 **/
		getParam(): any;
		/**
		 * Sets the center point for this box.
		 **/
		setCenterPoint(point: Point3): OdTvResult;
		/**
		 * Retrieves the center point of this box.
		 **/
		getCenterPoint(): Point3;
		/**
		 * Sets the length for this box.
		 **/
		setLength(dLength: number): OdTvResult;
		/**
		 * Retrieves the length of this box.
		 **/
		getLength(): number;
		/**
		 * Sets the width for this box.
		 **/
		setWidth(dWidth: number): OdTvResult;
		/**
		 * Retrieves the width of this box.
		 **/
		getWidth(): number;
		/**
		 * Sets the height for this box.
		 **/
		setHeight(dHeight: number): OdTvResult;
		/**
		 * Retrieves the height of this box.
		 **/
		getHeight(): number;
		/**
		 * Sets the normal to base plane of this box.
		 **/
		setBaseNormal(baseNormal: Vector3): OdTvResult;
		/**
		 * Retrieves a normal vector to base plane of this box.
		 **/
		getBaseNormal(): Vector3;
		/**
		 * Sets the length direction for this box.
		 **/
		setLengthDirection(lengthDir: Vector3): OdTvResult;
		/**
		 * Retrieves the length direction data of this box.
		 **/
		getLengthDirection(): Vector3;
		delete(): void;
	}

	class OdMarkupController {
		save(name: string): boolean;
		load(name: string): boolean;
		getSaved(): VectorWString;
		sendSaveRequest(name: string): void;
		clear(): void;
		delete(): void;
	}

	/**
	 * A base interface class that provides the statistics for geometry entities.
	 **/
	class OdTvGeometryStatistic {
		/**
		 * Retrieves the quantity of objects with a specified type.
		 **/
		getCount(type: GeometryStatisticTypes): number;
		/**
		 * Retrieves the current size of objects.
		 **/
		getObjectsSize(): number;
		delete(): void;
	}

	/**
	 * The base interface class for working with Visualize SDK selectability definition objects.
	 **/
	class OdTvSelectabilityDef {
		/**
		 * Creates a new selectability definition object with default parameters.
		 **/
		constructor();
		constructor(impl: OdTvSelectabilityDef);
		/**
		 * Retrieves whether edges can be selected or not.
		 **/
		getEdges(): boolean;
		/**
		 * Sets the selectability for edges.
		 **/
		setEdges(bVal: boolean): void;
		/**
		 * Retrieves whether faces can be selected or not.
		 **/
		getFaces(): boolean;
		/**
		 * Sets the selectability for faces.
		 **/
		setFaces(bVal: boolean): void;
		/**
		 * Retrieves whether geometry entities can be selected or not.
		 **/
		getGeometries(): boolean;
		/**
		 * Sets the selectability for geometry entities.
		 **/
		setGeometries(bVal: boolean): void;
		/**
		 * Retrieves whether vertices can be selected or not.
		 **/
		getVertices(): boolean;
		/**
		 * Sets the selectability for vertices.
		 **/
		setVertices(bVal: boolean): void;
		/**
		 * Retrieves whether the current selectability value is used as the default.
		 **/
		getDefault(): boolean;
		/**
		 * Sets the current selectability value as the default.
		 **/
		setDefault(): void;
		delete(): void;
	}

	/**
	 * The base interface class for working with Visualize SDK visibility definition objects.
	 **/
	class OdTvVisibilityDef {
		constructor(bVisible: boolean);
		/**
		 * Retrieves the current type of the visibility definition object.
		 **/
		getType(): VisibilityType;
		/**
		 * Sets the visibility object as the default.
		 **/
		setDefault(): void;
		/**
		 * Sets the visibility flag of the visibility definition object to false.
		 **/
		setInvisible(): void;
		/**
		 * Sets the visibility flag of the visibility definition object to true.
		 **/
		setVisible(): void;
		delete(): void;
	}

	/**
	 * The base interface class for working with Visualize SDK lineweight definition objects.
	 **/
	class OdTvLineWeightDef {
		/**
		 * Creates a new lineWeight definition object with default parameters.
		 **/
		constructor();
		constructor(impl: OdTvLineWeightDef);
		/**
		 * Retrieves the current inherited lineweight of the lineweight definition object.
		 **/
		getInheritedLineWeight(): InheritedAttribute;
		/**
		 * Retrieves the current lineweight type of the lineweight definition object.
		 **/
		getType(): LineWeightType;
		/**
		 * Retrieves the current lineweight value of the lineweight definition object.
		 **/
		getValue(): number;
		/**
		 * Sets the lineweight object as the default.
		 **/
		setDefault(): void;
		/**
		 * Sets a new inherited lineweight for the lineweight definition object.
		 **/
		setInherited(inhAttr: InheritedAttribute): void;
		/**
		 * Sets a new lineweight value for the lineweight definition object.
		 **/
		setValue(value: number): void;
		delete(): void;
	}

	/**
	 * The interface class for a database object identifier that allows access to the <link OdTvDatabase, OdTvDatabase> object.
	 **/
	class OdTvDatabaseId {
		delete(): void;
	}

	/**
	 * The base interface class for working with Visualize SDK layer definition objects.
	 **/
	class OdTvLayerDef {
		constructor(layer: OdTvLayerId);
		/**
		 * Retrieves the current layer object associated with the layer definition object.
		 **/
		getLayer(): OdTvLayerId;
		/**
		 * Retrieves the current layer type of the layer definition object.
		 **/
		getType(): LayerType;
		/**
		 * Sets the layer definition object as the default.
		 **/
		setDefault(): void;
		/**
		 * Sets a new layer object for the layer definition object.
		 **/
		setLayer(layer: OdTvLayerId): void;
		delete(): void;
	}

	/**
	 * The base interface class for working with Visualize SDK text style definition objects.
	 **/
	class OdTvTextStyleDef {
		/**
		 * Creates a new textStyle definition object with default parameters.
		 **/
		constructor();
		constructor(wrapper: OdTvTextStyleDef);
		/**
		 * Retrieves the current text style object associated with the text style definition object.
		 **/
		getTextStyle(): OdTvTextStyleId;
		/**
		 * Retrieves the current type of the text style definition object.
		 **/
		getType(): TextStyleType;
		/**
		 * Sets the text style object as the default.
		 **/
		setDefault(): void;
		/**
		 * Sets a new text style object for the text style definition object.
		 **/
		setTextStyle(textStyle: OdTvTextStyleId): void;
		delete(): void;
	}

	/**
	 * The base interface class for working with Visualize SDK material definition objects.
	 **/
	class OdTvMaterialDef {
		static fromMaterialId(): any;
		static fromInheritedAttribute(): any;
		constructor();
		constructor(arg0: OdTvMaterialDef);
		/**
		 * Retrieves the current inherited material of the material definition object.
		 **/
		getInheritedMaterial(): InheritedAttribute;
		/**
		 * Retrieves the current material ID associated with the material definition object.
		 **/
		getMaterial(): OdTvMaterialId;
		/**
		 * Retrieves the current material type of the material definition object.
		 **/
		getType(): MaterialType;
		/**
		 * Sets the material object as the default.
		 **/
		setDefault(): void;
		/**
		 * Sets a new inherited material for the material definition object.
		 **/
		setInheritedMaterial(mat: InheritedAttribute): void;
		/**
		 * Sets a new material object for the material definition object.
		 **/
		setMaterial(material: OdTvMaterialId): void;
		delete(): void;
	}

	/**
	 * The base interface class for managing the light attenuation for Visualize SDK entities.
	 **/
	class OdTvLightAttenuation {
		constructor();
		/**
		 * Retrieves the current type of light attenuation.
		 **/
		getAttenuationType(): AttenuationType;
		/**
		 * Retrieves the current end limit of the light attenuation.
		 **/
		getEndLimit(): number;
		/**
		 * Retrieves the current start limit of the light attenuation.
		 **/
		getStartLimit(): number;
		/**
		 * Retrieves whether the light attenuation is switched on or off.
		 **/
		getUseLimits(): boolean;
		/**
		 * Sets a new attenuation type for the light attenuation object.
		 **/
		setAttenuationType(type: AttenuationType): void;
		/**
		 * Sets new limits for the light attenuation.
		 **/
		setLimits(startlim: number, endlim: number): void;
		/**
		 * Switches the light attenuation on or off.
		 **/
		setUseLimits(on: boolean): void;
		delete(): void;
	}

	/**
	 * The base interface class that implements handling a map of Visualize SDK material entities.
	 **/
	class OdTvMaterialMap {
		constructor();
		/**
		 * Retrieves current blend factor value for the material map object.
		 **/
		getBlendFactor(): number;
		/**
		 * Retrieves the current <link OdTvTextureMapper, material mapper> object for the material map object.
		 **/
		getMapper(): OdTvTextureMapper;
		/**
		 * Retrieves the current source filename for the material map object.
		 **/
		getSourceFileName(): string;
		/**
		 * Retrieves the current source raster image object for the material map object.
		 **/
		getSourceRasterImage(): OdTvRasterImageId;
		/**
		 * Retrieves the current source type for the material map.
		 **/
		getSourceType(): SourceType;
		/**
		 * Sets a new blend factor value for the material map object.
		 **/
		setBlendFactor(dBlendFactor: number): void;
		/**
		 * Sets a new <link OdTvTextureMapper, material mapper> object for the material map object.
		 **/
		setMapper(pMapper: OdTvTextureMapper): void;
		/**
		 * Sets a new source filename for the material map object.
		 **/
		setSourceFileName(sFilename: string): void;
		/**
		 * Sets a new raster image as a source of the material map object.
		 **/
		setSourceRasterImage(rasterImageId: OdTvRasterImageId): void;
		delete(): void;
	}

	/**
	 * The base interface class that implements mapping functionality for Visualize SDK textures.
	 **/
	class OdTvTextureMapper {
		constructor();
		/**
		 * Sets new texture offsets for the mapper object.
		 **/
		setOffset(u: number, v: number): void;
		/**
		 * Sets a new rotation angle. The method rotates the texture around the U-axis and V-axis.
		 **/
		setRotation(dAngle: number): void;
		/**
		 * Sets a new texture sample size.
		 **/
		setSampleSize(dWidth: number, dHeight: number): void;
		/**
		 * Applies a new transformation matrix to the texture mapper object.
		 **/
		setTransform(tm: Matrix3d): void;
		/**
		 * Sets a new type of X-axis tiling for the texture mapper object.
		 **/
		setUTiling(tiling: Tiling): void;
		/**
		 * Sets a new type of Y-axis tiling for the texture mapper object.
		 **/
		setVTiling(tiling: Tiling): void;
		/**
		 * Retrieves the current transformation matrix for the texture mapper object.
		 **/
		transform(): Matrix3d;
		/**
		 * Retrieves the current type of X-axis tiling for the texture mapper object.
		 **/
		uTiling(): Tiling;
		/**
		 * Retrieves the current type of Y-axis tiling for the texture mapper object.
		 **/
		vTiling(): Tiling;
		delete(): void;
	}

	/**
	 * Structure for storing vertex positions of the mesh.
	 **/
	class OdTvVertexPos {
		/**
		 * Creates a new vertex position object with default parameters.
		 **/
		constructor(arg0: number, arg1: number);
		/**
		 * Retrieves the current column count from the mesh.
		 **/
		getColumn(): number;
		/**
		 * Retrieves the current row count from the mesh.
		 **/
		getRow(): number;
		delete(): void;
	}

	/**
	 * The interface class for a database object identifier that allows access to the <link OdTvGsDevice, OdTvGsDevice> object.
	 **/
	class OdTvGsDeviceId {
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		/**
		 * Opens the device determined with its identifier for a read or write operation.
		 **/
		openObject(mode: OpenMode): OdTvGsDevice;
		delete(): void;
	}

	class OdTvCDATreePtr {
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		getDatabaseNode(): OdTvCDATreeNodePtr;
		delete(): void;
	}

	class OdTvCDATreeNodePtr {
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		/**
		 * Gets the name of the node object - element of the hierarchical tree.
		 **/
		getNodeName(): string;
		/**
		 * Gets child nodes.
		 **/
		getChildren(): OdRxModelTreeBaseNodePtrArray;
		/**
		 * Gets the parent nodes.
		 **/
		getParents(): OdRxModelTreeBaseNodeRawPtrArray;
		/**
		 * Gets the type of node - the object of the hierarchical tree.
		 **/
		getNodeType(): number;
		getTvEntityId(view: View): OdTvEntityId;
		/**
		 * Gets the unique identifier of the node - the object of the hierarchical tree.
		 **/
		getUniqueSourceID(): string;
		select(view: View): OdTvSelectionSet;
		/**
		 * Returns the tv sub entity id from this node.
		 **/
		getSubEntityId(): OdTvGeometryDataId;
		delete(): void;
	}

	/**
	 * The interface class for the iterator of <link OdTvCDATreeStorage, OdTvCDATreeStorage> objects.
	 **/
	class OdTvCDATreeStoragesIterator {
		/**
		 * Retrieves the CDA tree storage that is currently referenced by the iterator object.
		 **/
		getCDATreeStorage(): OdTvCDATreeStorage;
		/**
		 * Searches the CDA tree storage defined through its identifier and moves the iterator to this device if found.
		 **/
		seek(treeId: OdTvCDATreeStorage): boolean;
		done(): boolean;
		step(): void;
		delete(): void;
	}

	/**
	 * This class is an interface for the object that contains the CDA (Common Data Access) tree
	 **/
	class OdTvCDATreeStorage {
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		/**
		 * Returns the pointer to the underlaying CDA tree
		 **/
		getTree(): OdTvCDATreePtr;
		delete(): void;
	}

	class OdRxModelTreeBaseNodePtrArray {
		length(): number;
		get(index: number): OdTvCDATreeNodePtr;
		delete(): void;
	}

	class OdRxModelTreeBaseNodeRawPtrArray {
		length(): number;
		get(index: number): OdTvCDATreeNodePtr;
		delete(): void;
	}

	/**
	 * The abstract interface class for a Visualize SDK camera object.
	 **/
	class OdTvCamera {
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		/**
		 * Specifies the name for the camera.
		 **/
		setName(name: string): void;
		/**
		 * Retrieves the name of the camera.
		 **/
		getName(): string;
		/**
		 * Specifies camera orientation in space.
		 **/
		setupCameraByDirection(position: Point3, direction: Vector3, upVector: Vector3): void;
		/**
		 * Specifies camera orientation in space.
		 **/
		setupCamera(position: Point3, target: Point3, upVector: Vector3): void;
		/**
		 * Retrieves camera position.
		 **/
		position(): Point3;
		/**
		 * Specifies new camera position.
		 **/
		setPosition(position: Point3): void;
		/**
		 * Retrieves camera viewing direction.
		 **/
		direction(): Vector3;
		/**
		 * Retrieves camera up vector.
		 **/
		upVector(): Vector3;
		/**
		 * Specifies new camera up vector.
		 **/
		setUpVector(upVector: Vector3): void;
		/**
		 * Retrieves camera viewing target.
		 **/
		target(): Point3;
		/**
		 * Specifies new camera target.
		 **/
		setTarget(target: Point3): void;
		/**
		 * Specifies camera viewing parameters.
		 **/
		setViewParameters(fWidth: number, fHeight: number, bPrespective: boolean): void;
		/**
		 * Retrieves camera field width.
		 **/
		fieldWidth(): number;
		/**
		 * Retrieves camera filed height.
		 **/
		fieldHeight(): number;
		/**
		 * Checks whether the camera has a perspective projection type.
		 **/
		isPerspective(): boolean;
		/**
		 * Specifies camera near (front) clipping.
		 **/
		setNearClip(bClip: boolean, dNear: number): void;
		/**
		 * Specifies camera far (back) clipping.
		 **/
		setFarClip(bClip: boolean, dFar: number): void;
		/**
		 * Checks whether camera near (front) clipping is enabled.
		 **/
		isNearClippingEnabled(): boolean;
		/**
		 * Retrieves camera near (front) clipping distance.
		 **/
		nearClippingDistance(): number;
		/**
		 * Checks whether camera far (back) clipping is enabled.
		 **/
		isFarClippingEnabled(): boolean;
		/**
		 * Retrieves camera far (back) clipping distance.
		 **/
		farClippingDistance(): number;
		/**
		 * Specifies camera glyph size.
		 **/
		setGlyphSize(sz: number): void;
		/**
		 * Retrieves camera glyph size.
		 **/
		glyphSize(): number;
		/**
		 * Specifies whether the camera should display the glyph.
		 **/
		setDisplayGlyph(on: boolean): void;
		/**
		 * Checks whether the camera should display the glyph.
		 **/
		displayGlyph(): boolean;
		/**
		 * Specifies whether the camera should display target in addition to the glyph display.
		 **/
		setDisplayTarget(on: boolean): void;
		/**
		 * Checks whether the camera should display a target.
		 **/
		displayTarget(): boolean;
		/**
		 * Assigns the specified view to the camera. Assigned view use camera viewing options; also it handles all camera viewing options changes.
		 **/
		assignView(viewId: View): void;
		/**
		 * Checks whether the camera has assigned views.
		 **/
		hasAssignedViews(): boolean;
		/**
		 * Checks whether the specified view is assigned to this camera.
		 **/
		isViewAssigned(viewId: View): boolean;
		/**
		 * Unassigns specified view from camera.
		 **/
		unassignView(viewId: View): void;
		/**
		 * Retrieves camera position as OdTvGeometryDataId.
		 **/
		positionId(): OdTvGeometryDataId;
		/**
		 * Retrieves camera target as OdTvGeometryDataId.
		 **/
		targetId(): OdTvGeometryDataId;
		/**
		 * Retrieves camera up vector as OdTvGeometryDataId.
		 **/
		upId(): OdTvGeometryDataId;
		/**
		 * Retrieves camera fields (fieldWidth and fieldHeight) as OdTvGeometryDataId.
		 **/
		fieldsId(): OdTvGeometryDataId;
		/**
		 * Checks whether the camera will automatically adjust co-dependent parameters when one of them are changed or not.
		 **/
		isAutoAdjust(): boolean;
		/**
		 * Specifies, should camera automatically adjust co-dependent parameters when one of them are changed or not.
		 **/
		setAutoAdjust(bAdjust: boolean): void;
		/**
		 * Checks whether the camera will automatically adjust lens length to keep consistent target, position and field settings or not.
		 **/
		isAdjustLensLength(): boolean;
		/**
		 * Specifies, should camera automatically adjust lens length to keep consistent target, position and field settings or not.
		 **/
		setAdjustLensLength(bAdjust: boolean): void;
		/**
		 * Copies camera parameters from specified view.
		 **/
		setupCameraFromView(viewId: View): void;
		/**
		 * Retrieves camera lens length.
		 **/
		lensLength(): number;
		/**
		 * Specifies camera lens length.
		 **/
		setLensLength(l: number): void;
		/**
		 * Retrieves camera focal length.
		 **/
		focalLength(): number;
		/**
		 * Retrieves camera vertical viewing angle.
		 **/
		perspectiveVerticalViewAngle(): number;
		/**
		 * Retrieves camera horizontal viewing angle.
		 **/
		perspectiveHorizontalViewAngle(): number;
		/**
		 * Retrieves the current database handle associated with the object.
		 **/
		getDatabaseHandle(): string;
		/**
		 * Get native database handle
		 **/
		getNativeDatabaseHandle(): string;
		delete(): void;
	}

	/**
	 * This is an abstract class that represents the interface for an animation action object.
	 **/
	class OdTvAnimationAction {
		/**
		 * Specifies keypoint data in the action frame.
		 **/
		setKeypoint(nFrame: number, kd: Keydata, keyval: number, ipl: Interpolator): void;
		/**
		 * Checks that Keypoint exist in specified frame.
		 **/
		hasKeypoint(nFrame: number): boolean;
		/**
		 * Checks whether the keypoint has data of specified type.
		 **/
		keypointHasData(nFrame: number, kd: Keydata): any;
		/**
		 * Removes Keypoint from specified frame.
		 **/
		removeKeypoint(nFrame: number): void;
		/**
		 * Removes all Keypoints.
		 **/
		removeKeypoints(): void;
		/**
		 * Retrieves action Keypoints iterator.
		 **/
		getKeypointsIterator(): OdTvAnimationKeypointIterator;
		/**
		 * Retrieves frame data of specified type.
		 **/
		frameData(nFrame: number, kd: Keydata): any;
		/**
		 * Retrieves action frames number.
		 **/
		numFrames(): number;
		/**
		 * Specifies number of action frames.
		 **/
		setNumFrames(nFrames: number, bRescaleRange: boolean): void;
		/**
		 * Retrieves action speed.
		 **/
		FPS(): number;
		/**
		 * Specifies action speed.
		 **/
		setFPS(fps: number): void;
		/**
		 * Retrieves action active frame.
		 **/
		activeFrame(): number;
		/**
		 * Specifies action active frame.
		 **/
		setActiveFrame(nFrame: number): void;
		/**
		 * Sets a new name for the animation action.
		 **/
		setName(sName: string): void;
		/**
		 * Retrieves the current name of the animation action.
		 **/
		getName(): string;
		/**
		 * Checks whether the action should be saved in file or not.
		 **/
		getNeedSaveInFile(): boolean;
		/**
		 * Retrieves the current database handle associated with the object.
		 **/
		getDatabaseHandle(): string;
		/**
		 * Get native database handle
		 **/
		getNativeDatabaseHandle(): string;
		delete(): void;
	}

	class OdTvAnimationKeypointIterator {
		/**
		 * Retrieves keypoint frame.
		 **/
		frame(): number;
		/**
		 * Checks that keypoint has data of specified type.
		 **/
		hasData(kd: Keydata): any;
		/**
		 * Determines whether the traversal through the iterator was completed.
		 **/
		done(): boolean;
		/**
		 * Steps to the next value in the iterator object.
		 **/
		step(): boolean;
		delete(): void;
	}

	class OdTvActorBasis {
		/**
		 * Constructs actor basis with default origin (0.0.0) and default axis { (1,0.0), (0,1,0), (0,0,1) }.
		 **/
		constructor();
		/**
		 * Constructs actor basis with default origin (0.0.0) and default axis { (1,0.0), (0,1,0), (0,0,1) }.
		 **/
		constructor(arg0: Point3);
		/**
		 * Constructs actor basis with default origin (0.0.0) and default axis { (1,0.0), (0,1,0), (0,0,1) }.
		 **/
		constructor(arg0: Point3, arg1: Vector3, arg2: Vector3, arg3: Vector3);
		/**
		 * Specifies basis origin.
		 **/
		setOrigin(origin: Point3): void;
		/**
		 * Retrieves basis origin.
		 **/
		origin(): Point3;
		/**
		 * Specifies basis X axis.
		 **/
		setXAxis(xAxis: Vector3): void;
		/**
		 * Retrieves basis X axis.
		 **/
		xAxis(): Vector3;
		/**
		 * Specifies basis Y axis.
		 **/
		setYAxis(yAxis: Vector3): void;
		/**
		 * Retrieves basis Y axis.
		 **/
		yAxis(): Vector3;
		/**
		 * Specifies basis Z axis.
		 **/
		setZAxis(zAxis: Vector3): void;
		/**
		 * Retrieves basis Z axis.
		 **/
		zAxis(): Vector3;
		delete(): void;
	}

	/**
	 * This is an abstract class that represents the interface for an Animation container.
	 **/
	class OdTvAnimationContainer {
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		/**
		 * Adds the action of the specified actor to the container.
		 **/
		addAnimation(actor: OdTvSubItemPath, actionId: OdTvAnimationActionId, nRepeats: number, timeStart: number, customBasis: OdTvActorBasis): void;
		/**
		 * Adds the action of the specified actor to the container.
		 **/
		addAnimation(actor: OdTvSubItemPath, actionId: OdTvAnimationActionId, nRepeats: number, timeStart: number): void;
		/**
		 * Adds the action of the specified actor to the container.
		 **/
		addAnimation(
			actor: OdTvSubItemPath,
			actionId: OdTvAnimationActionId,
			nRepeats: number,
			timeStart: number,
			customBasis: OdTvActorBasis,
			bFastTransform: boolean,
		): void;
		/**
		 * Removes specified animation from container.
		 **/
		removeAnimation(pIterator: OdTvAnimationIterator): void;
		/**
		 * Removes all animations with specified actor.
		 **/
		removeAnimations(actor: OdTvSubItemPath): void;
		/**
		 * Removes all animations with specified actor.
		 **/
		removeAnimations(): void;
		/**
		 * Validate all animations in the animation container.
		 **/
		validateAnimations(): void;
		/**
		 * Retrieves animations iterator.
		 **/
		getAnimationIterator(): OdTvAnimationIterator;
		/**
		 * Specifies actual time for the animation container.
		 **/
		setCurrentTime(msec: number): void;
		/**
		 * Retrieves actual animation container time.
		 **/
		currentTime(): number;
		/**
		 * Retrieves animation container summary time.
		 **/
		totalTime(): any;
		/**
		 * Resets all animations of all actors in the animation container.
		 **/
		reset(): void;
		/**
		 * Sets a new name for the animation container.
		 **/
		setName(sName: string): void;
		/**
		 * Retrieves the current name of the animation container.
		 **/
		getName(): string;
		/**
		 * Checks whether the container should be saved in file or not.
		 **/
		getNeedSaveInFile(): boolean;
		/**
		 * Retrieves the current database handle associated with the object.
		 **/
		getDatabaseHandle(): string;
		/**
		 * Get native database handle
		 **/
		getNativeDatabaseHandle(): string;
		delete(): void;
	}

	/**
	 * This is an abstract class that represents the interface for an Animation iterator.
	 **/
	class OdTvAnimationIterator {
		/**
		 * Retrieves animation start time.
		 **/
		timeStart(): number;
		/**
		 * Retrieves animation action.
		 **/
		action(): OdTvAnimationActionId;
		/**
		 * Retrieves animation actor.
		 **/
		actor(): OdTvSubItemPath;
		/**
		 * Retrieves animation repeats count.
		 **/
		repeats(): number;
		/**
		 * Retrieves animation actor basis.
		 **/
		basis(): OdTvActorBasis;
		/**
		 * Determines whether the traversal through the iterator was completed.
		 **/
		done(): boolean;
		/**
		 * Steps to the next value in the iterator object.
		 **/
		step(): boolean;
		/**
		 * Checks whether animation should use Fast Entity transform.
		 **/
		isFastEntityTransform(): boolean;
		delete(): void;
	}

	/**
	 * The interface class for the iterator of <link OdTvAnimationContainer, OdTvAnimationContainer> objects.
	 **/
	class OdTvAnimationContainersIterator {
		/**
		 * Retrieves the animation container that is currently referenced by the iterator object.
		 **/
		getAnimationContainer(): OdTvAnimationContainerId;
		/**
		 * Searches the animation container defined through its identifier and moves the iterator to this animation container if found.
		 **/
		seek(containerId: OdTvAnimationContainerId): void;
		/**
		 * Determines whether the traversal through the iterator was completed.
		 **/
		done(): boolean;
		/**
		 * Steps to the next value in the iterator object.
		 **/
		step(): boolean;
		delete(): void;
	}

	/**
	 * The interface class for the iterator of <link OdTvAnimationAction, OdTvAnimationAction> objects.
	 **/
	class OdTvAnimationActionsIterator {
		/**
		 * Retrieves the animation action that is currently referenced by the iterator object.
		 **/
		getAnimationAction(): OdTvAnimationActionId;
		/**
		 * Searches the animation action defined through its identifier and moves the iterator to this animation action if found.
		 **/
		seek(actionId: OdTvAnimationActionId): void;
		/**
		 * Determines whether the traversal through the iterator was completed.
		 **/
		done(): boolean;
		/**
		 * Steps to the next value in the iterator object.
		 **/
		step(): boolean;
		delete(): void;
	}

	/**
	 * The interface class for a database object identifier that allows access to the <link OdTvAnimationContainer, OdTvAnimationContainer> object.
	 **/
	class OdTvAnimationContainerId {
		/**
		 * Determines whether the identifier object is null.
		 **/
		isNull(): boolean;
		/**
		 * Opens the Animation container determined with its identifier for a read or write operation.
		 **/
		openObject(): OdTvAnimationContainer;
		delete(): void;
	}

	/**
	 * The interface class for a database object identifier that allows access to the <link OdTvAnimationAction, OdTvAnimationAction> object.
	 **/
	class OdTvAnimationActionId {
		/**
		 * Determines whether the identifier object is null.
		 **/
		isNull(): boolean;
		/**
		 * Opens the animation action object determined with its identifier for a read or write operation.
		 **/
		openObject(): OdTvAnimationAction;
		delete(): void;
	}

	/**
	 * The interface class for a highlight style object identifier that allows access to the <link OdTvHighlightStyle, OdTvHighlightStyleId> object.
	 **/
	class OdTvHighlightStyleId {
		isNull(): boolean;
		/**
		 * Opens the highlight style determined with its identifier for a read or write operation.
		 **/
		openObject(): OdTvHighlightStyle;
		delete(): void;
	}

	class OdTvHighlightStyle {
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		/**
		 * Sets a new name for the highlight style object.
		 **/
		setName(sName: string): boolean;
		/**
		 * Retrieves the current highlight style name.
		 **/
		getName(): string;
		/**
		 * Retrieves whether the current highlight style is predefined.
		 **/
		isPredefined(): boolean;
		/**
		 * Copies options from a specified highlight style object.
		 **/
		copyFrom(highlightStyleId: OdTvHighlightStyleId): void;
		/**
		 * Sets a new faces color value for the specified highlight entries.
		 **/
		setFacesColor(entries: number, color: OdTvRGBColorDef): void;
		/**
		 * Retrieves the current color of the faces for the specified highlight entry.
		 **/
		getFacesColor(entry: Entry): OdTvRGBColorDef;
		/**
		 * Sets a new faces transparency value for the specified highlight entries.
		 **/
		setFacesTransparency(entries: number, transparency: number): void;
		/**
		 * Retrieves the current transparency of the faces for the specified highlight entry.
		 **/
		getFacesTransparency(entry: Entry): number;
		/**
		 * Sets a new faces visibility value for the specified highlight entries.
		 **/
		setFacesVisibility(entries: number, bVisible: boolean): void;
		/**
		 * Retrieves the current visibility of the faces for the specified highlight entry.
		 **/
		getFacesVisibility(entry: Entry): boolean;
		/**
		 * Sets a new faces stipple flag for the specified highlight entries.
		 **/
		setFacesStipple(entries: number, bStipple: boolean): void;
		/**
		 * Retrieves the current stipple flag of the faces for the specified highlight entry.
		 **/
		getFacesStipple(entry: Entry): boolean;
		/**
		 * Sets all faces parameters to the default state for the specified highlight entries.
		 **/
		setFacesParamToDefault(entries: number): void;
		/**
		 * Sets a new edges color value for the specified highlight entries.
		 **/
		setEdgesColor(entries: number, color: OdTvRGBColorDef): void;
		/**
		 * Retrieves the current color of the edges for the specified highlight entry.
		 **/
		getEdgesColor(entry: Entry): OdTvRGBColorDef;
		/**
		 * Sets a new edges transparency value for the specified highlight entries.
		 **/
		setEdgesTransparency(entries: number, transparency: number): void;
		/**
		 * Retrieves the current transparency of the edges for the specified highlight entry.
		 **/
		getEdgesTransparency(entry: Entry): number;
		/**
		 * Sets a new edges visibility value for the specified highlight entries.
		 **/
		setEdgesVisibility(entries: number, bVisible: boolean): void;
		/**
		 * Retrieves the current visibility of the edges for the specified highlight entry.
		 **/
		getEdgesVisibility(entry: Entry): boolean;
		/**
		 * Sets a new edges stipple flag for the specified highlight entries.
		 **/
		setEdgesStipple(entries: number, bStipple: boolean): void;
		/**
		 * Retrieves the current stipple flag of the edges for the specified highlight entry.
		 **/
		getEdgesStipple(entry: Entry): boolean;
		/**
		 * Sets a new edges lineweight value for the specified highlight entry.
		 **/
		setEdgesLineweight(entries: number, lineweight: number): void;
		/**
		 * Retrieves the current lineweight of the edges for the specified highlight entry.
		 **/
		getEdgesLineweight(entry: Entry): number;
		/**
		 * Sets a new edge draw mode value for the specified highlight entry.
		 **/
		setEdgesDrawMode(entries: number, mode: EdgesDrawMode): void;
		/**
		 * Retrieves the current edges draw mode for the specified highlight entry.
		 **/
		getEdgeDrawMode(entry: Entry): EdgesDrawMode;
		/**
		 * Sets all edges parameters to the default state for the specified highlight entries.
		 **/
		setEdgesParamToDefault(entries: number): void;
		/**
		 * Sets the flag which indicates whether the selected object should be rendered on top of depth in 3d mode.
		 **/
		setOnTopOfDepth(bSet: boolean): void;
		/**
		 * Retrieves the flag which indicates whether the selected object should be rendered on top of depth in 3d mode.
		 **/
		getOnTopOfDepth(): boolean;
		/**
		 * Sets all edges and faces parameters to the default state.
		 **/
		setByDefault(bUseFromPredefined: boolean): void;
		/**
		 * Retrieves the current database handle associated with the object.
		 **/
		getDatabaseHandle(): string;
		/**
		 * Get native database handle
		 **/
		getNativeDatabaseHandle(): string;
		delete(): void;
	}

	class OdTvHighlightStylesIterator {
		/**
		 * Retrieves the highlight style that is currently referenced by the iterator object.
		 **/
		getHighlightStyle(): OdTvHighlightStyleId;
		/**
		 * Searches the highlight style defined through its identifier and moves the iterator to this highlight style if found.
		 **/
		seek(highlightStyleId: OdTvHighlightStyleId): boolean;
		/**
		 * Determines whether the traversal through the iterator was completed.
		 **/
		done(): boolean;
		/**
		 * Steps to the next value in the iterator object.
		 **/
		step(): boolean;
		delete(): void;
	}

	class OdTvCameraWalker {
		constructor();
		/**
		 * Specifies a camera that will walk.
		 **/
		setCamera(cameraId: OdTvEntityId): void;
		/**
		 * Retrieves camera object.
		 **/
		camera(): OdTvEntityId;
		/**
		 * Translates the camera in a given direction.
		 **/
		move(moveVector: Vector3): void;
		/**
		 * Rotates the camera around the specified axis.
		 **/
		turn(axis: Vector3, angle: number): void;
		/**
		 * Translates the camera object forward in a viewing direction.
		 **/
		moveForward(moveDistance: number): void;
		/**
		 * Translates the camera object backward in a viewing direction.
		 **/
		moveBackward(moveDistance: number): void;
		/**
		 * Translates the camera object backward in a right vector direction.
		 **/
		moveLeft(moveDistance: number): void;
		/**
		 * Translates the camera object forward in a right vector direction.
		 **/
		moveRight(moveDistance: number): void;
		/**
		 * Translates the camera object forward in a up vector direction.
		 **/
		moveUp(moveDistance: number): void;
		/**
		 * Translates the camera object backward in a down vector direction.
		 **/
		moveDown(moveDistance: number): void;
		/**
		 * Turns camera left.
		 **/
		turnLeft(angle: number): void;
		/**
		 * Turns camera right.
		 **/
		turnRight(angle: number): void;
		/**
		 * Turns camera up.
		 **/
		turnUp(angle: number): void;
		/**
		 * Turns camera down.
		 **/
		turnDown(angle: number): void;
		delete(): void;
	}

	/**
	 * Traits class for section geometry customization.
	 **/
	class OdTvSectionGeometryTraits {
		constructor();
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		/**
		 * Retrieves section geometry traits true color as a reference to OdTvColorDef.
		 **/
		getColor(): OdTvColorDef;
		/**
		 * Retrieves lineweight for this section geometry traits.
		 **/
		getLineWeight(): OdTvLineWeightDef;
		/**
		 * Retrieves material identifier for this section geometry traits.
		 **/
		getMaterial(): OdTvMaterialDef;
		/**
		 * Retrieves transparency for this section geometry traits as reference to OdTvTransparencyDef.
		 **/
		getTransparency(): OdTvTransparencyDef;
		/**
		 * Retrieves the fill for this section geometry traits
		 **/
		getFill(): OdTvHatchPatternDef;
		/**
		 * Retrieves the flags that determine which traits were changed. It is a combination of Use OdTvSectionGeometryTraits::ChangedTraits flags.
		 **/
		getChangedTraits(): number;
		/**
		 * Sets true color for this section geometry traits.
		 **/
		setColor(color: OdTvColorDef): void;
		/**
		 * Sets the lineweight for this section geometry traits.
		 **/
		setLineWeight(lineWeight: OdTvLineWeightDef): void;
		/**
		 * Sets the material for this section geometry traits.
		 **/
		setMaterial(materialId: OdTvMaterialDef): void;
		/**
		 * Sets the transparency object for this section geometry traits.
		 **/
		setTransparency(transparency: OdTvTransparencyDef): void;
		/**
		 * Sets the fill for this section geometry traits.
		 **/
		setFill(fill: OdTvHatchPatternDef): void;
		/**
		 * Checks whether processing is enabled.
		 **/
		isProcessingEnabled(): boolean;
		/**
		 * Specifies whether processing is enabled.
		 **/
		setProcessingEnabled(bEnabled: boolean): void;
		delete(): void;
	}

	/**
	 * This template class is a specialization of the OdTvClippedGeometryOutput, which implements interface
	 **/
	class OdTvSectionGeometryOutput {
		constructor();
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		/**
		 * Checks whether processing of this geometry output is enabled.
		 **/
		isProcessingEnabled(): boolean;
		/**
		 * Enables or disables processing of this geometry output.
		 **/
		setProcessingEnabled(bSet: boolean): void;
		/**
		 * Checks whether clipping of non-sectionable geometry is enabled.
		 **/
		isNonSectionableGeometryClipping(): boolean;
		/**
		 * Enables or disables clipping of non-sectionable geometry.
		 **/
		setNonSectionableGeometryClipping(bSet: boolean): void;
		/**
		 * Retrieves traits override flags.
		 **/
		traitsOverrideFlags(): number;
		/**
		 * Setup traits overrides.
		 **/
		setTraitsOverrides(pData: OdTvSectionGeometryTraits): void;
		/**
		 * Retrieves traits overrides (for changing).
		 **/
		traitsOverrides(): OdTvSectionGeometryTraits;
		/**
		 * Checks whether closed sections output is enabled.
		 **/
		isClosedSectionsOutputEnabled(): boolean;
		/**
		 * Enables or disables closed sections output.
		 **/
		enableClosedSectionsOutput(bSet: boolean): void;
		/**
		 * Checks whether opened sections output is enabled.
		 **/
		isOpenedSectionsOutputEnabled(): boolean;
		/**
		 * Enables or disables opened sections output.
		 **/
		enableOpenedSectionsOutput(bSet: boolean): void;
		/**
		 * Checks whether output of closed sections as polyline primitives is enabled.
		 **/
		isOutputOfClosedSectionsAsPolylinesEnabled(): boolean;
		/**
		 * Enables or disables output of closed sections as polyline primitives.
		 **/
		enableOutputOfClosedSectionsAsPolylines(bSet: boolean): void;
		/**
		 * Checks whether sections generation tolerance override is enabled.
		 **/
		isSectionToleranceOverrideEnabled(): boolean;
		/**
		 * Returns sections generation tolerance override value.
		 **/
		sectionToleranceOverride(): number;
		/**
		 * Enables sections generation tolerance override and sets it's value.
		 **/
		setSectionToleranceOverride(tolOverride: number): void;
		/**
		 * Disables sections generation tolerance override.
		 **/
		resetSectionToleranceOverride(): void;
		delete(): void;
	}

	/**
	 * This class is an implementation of the cut geometry output for 3D clipping.
	 **/
	class OdTvCuttedGeometryOutput {
		constructor();
		/**
		 * Retrieves whether the link object identifier is NULL or not.
		 **/
		isNull(): boolean;
		/**
		 * Checks whether processing of this geometry output is enabled.
		 **/
		isProcessingEnabled(): boolean;
		/**
		 * Enables or disables processing of this geometry output.
		 **/
		setProcessingEnabled(bSet: boolean): void;
		/**
		 * Checks whether clipping of non-sectionable geometry is enabled.
		 **/
		isNonSectionableGeometryClipping(): boolean;
		/**
		 * Enables or disables clipping of non-sectionable geometry.
		 **/
		setNonSectionableGeometryClipping(bSet: boolean): void;
		/**
		 * Retrieves traits override flags.
		 **/
		traitsOverrideFlags(): number;
		/**
		 * Setup traits overrides.
		 **/
		setTraitsOverrides(pData: OdTvSectionGeometryTraits): void;
		/**
		 * Retrieves traits overrides (for changing).
		 **/
		traitsOverrides(): OdTvSectionGeometryTraits;
		delete(): void;
	}

	/**
	 * Class to pass normal clip boundary information.
	 **/
	class OdTvNormalClipBoundary {
		constructor();
		/**
		 * Returns type of the inherited boundary.
		 **/
		type(): OdTvClipBoundaryType;
		/**
		 * Returns inverted clipping boundary.
		 **/
		clipBoundary(): any;
		/**
		 * Setup inverted clipping boundary.
		 **/
		setClipBoundary(points: any): void;
		/**
		 * Returns the transform
		 **/
		transform(): Matrix3d;
		/**
		 * Sets a new transformation matrix for clipping boundary.
		 **/
		setTransform(transform: Matrix3d): void;
		delete(): void;
	}

	/**
	 * Class to pass inverted clip boundary information.
	 **/
	class OdTvInvertedClipBoundary {
		constructor();
		/**
		 * Returns type of the inherited boundary.
		 **/
		type(): OdTvClipBoundaryType;
		/**
		 * Returns inverted clipping boundary.
		 **/
		clipBoundary(): any;
		/**
		 * Setup inverted clipping boundary.
		 **/
		setClipBoundary(points: any): void;
		/**
		 * Returns the transform
		 **/
		transform(): Matrix3d;
		/**
		 * Sets a new transformation matrix for clipping boundary.
		 **/
		setTransform(transform: Matrix3d): void;
		delete(): void;
	}

	/**
	 * Class to pass extended clip boundary information.
	 **/
	class OdTvExtendedClipBoundary {
		constructor();
		/**
		 * Returns type of the inherited boundary.
		 **/
		type(): OdTvClipBoundaryType;
		/**
		 * Returns inverted clipping boundary.
		 **/
		clipBoundary(): any;
		/**
		 * Setup inverted clipping boundary.
		 **/
		setClipBoundary(points: any): void;
		/**
		 * Returns the transform
		 **/
		transform(): Matrix3d;
		/**
		 * Sets a new transformation matrix for clipping boundary.
		 **/
		setTransform(transform: Matrix3d): void;
		/**
		 * Returns extended clipping boundary contour vertices counts.
		 **/
		clipBoundaryCounts(): any;
		/**
		 * Setup extended boundary contour vertices counts.
		 **/
		setClipBoundaryCounts(counts: any): void;
		delete(): void;
	}

	/**
	 * Class to pass extended clip boundary information.
	 **/
	class OdTvComplexClipBoundary {
		constructor();
		/**
		 * Returns type of the inherited boundary.
		 **/
		type(): OdTvClipBoundaryType;
		/**
		 * Returns inverted clipping boundary.
		 **/
		clipBoundary(): any;
		/**
		 * Setup inverted clipping boundary.
		 **/
		setClipBoundary(points: any): void;
		/**
		 * Returns the transform
		 **/
		transform(): Matrix3d;
		/**
		 * Sets a new transformation matrix for clipping boundary.
		 **/
		setTransform(transform: Matrix3d): void;
		/**
		 * Returns extended clipping boundary contour vertices counts.
		 **/
		clipBoundaryCounts(): any;
		/**
		 * Setup extended boundary contour vertices counts.
		 **/
		setClipBoundaryCounts(counts: any): void;
		delete(): void;
	}

	class OdTvClipPlane {
		constructor();
		constructor(arg0: Point3, arg1: Vector3);
		setOrigin(): any;
		origin(): any;
		setNormal(): any;
		normal(): any;
		delete(): void;
	}

	/**
	 * Class to pass planar clip boundary information.
	 **/
	class OdTvPlanarClipBoundary {
		constructor();
		/**
		 * Returns type of the inherited boundary.
		 **/
		type(): OdTvClipBoundaryType;
		/**
		 * Returns array of clipping planes.
		 **/
		clipPlanes(): Array<undefined>;
		/**
		 * Setup array of clipping planes.
		 **/
		setClipPlanes(clipPlanes: Array<undefined>): void;
		/**
		 * Returns optional clipping section geometry output.
		 **/
		sectionGeometryOutput(): OdTvSectionGeometryOutput;
		/**
		 * Setup optional clipping section geometry output.
		 **/
		setSectionGeometryOutput(sectionOutput: OdTvSectionGeometryOutput): void;
		/**
		 * Returns optional cut geometry output.
		 **/
		cuttedGeometryOutput(): OdTvCuttedGeometryOutput;
		/**
		 * Setup optional cut geometry output.
		 **/
		setCuttedGeometryOutput(cuttedOutput: OdTvCuttedGeometryOutput): void;
		delete(): void;
	}

	type HeapInformation = {
		used: number;
		reserved: number;
	};

	class OdArrayInt {
		delete(): void;
	}

	class OdArrayDouble {
		delete(): void;
	}

	class OdArrayPoint3d {
		delete(): void;
	}

	class OdArrayPoint2d {
		delete(): void;
	}

	class OdArrayVector2d {
		delete(): void;
	}

	class OdArrayVector3d {
		delete(): void;
	}

	class OdTvHatchPatternLines {
		delete(): void;
	}

	class OdTvCollidedPairResult {
		delete(): void;
	}

	class OdTvCollidedPairResultObjAlloc {
		delete(): void;
	}

	class OdTvEntityIdArray {
		delete(): void;
	}

	class OdTvEntityIdArrayObjAlloc {
		delete(): void;
	}

	class OdTvGeometryDataIdArray {
		delete(): void;
	}

	class OdTvGeometryDataIdArrayObjAlloc {
		delete(): void;
	}

	class OdTvHighlightStyleIdJSArray {
		delete(): void;
	}

	class OdTvHighlightStyleIdArrayObjAlloc {
		delete(): void;
	}

	class OdTvClipPlaneArray {
		delete(): void;
	}

	class OdTvVisualStyleIdArray {
		delete(): void;
	}

	var getViewer: () => any;

	var ODRGBA: () => any;

	var ODRGB: () => any;

	class OdVectorInt {
		delete(): void;
	}

	class OdVectorDouble {
		delete(): void;
	}

	class OdVectorPoint3d {
		delete(): void;
	}

	class OdVectorPoint2d {
		delete(): void;
	}

	class OdVectorVector2d {
		delete(): void;
	}

	class OdVectorVector3d {
		delete(): void;
	}

	/**
	 * Rendering modes.
	 **/
	type RenderMode = { value: number };
	const RenderMode: {
		/**
		 * Standard display. Optimized for 2D.
		 **/
		Optimized2D: RenderMode;
		/**
		 * Standard display. Uses 3D pipeline.
		 **/
		Wireframe: RenderMode;
		/**
		 * Wireframe display. Hidden lines removed.
		 **/
		HiddenLine: RenderMode;
		/**
		 * Faceted display. One color per face.
		 **/
		FlatShaded: RenderMode;
		/**
		 * Smooth shaded display. Colors interpolated between vertices.
		 **/
		GouraudShaded: RenderMode;
		/**
		 * Faceted display with wireframe overlay.
		 **/
		FlatShadedWithWireframe: RenderMode;
		/**
		 * Smooth shaded display with wireframe overlay.
		 **/
		GouraudShadedWithWireframe: RenderMode;
	};

	/**
	 * Lighting types.
	 **/
	type DefaultLightingType = { value: number };
	const DefaultLightingType: {
		/**
		 * One light mode.
		 **/
		kOneLight: DefaultLightingType;
		/**
		 * Two lights mode.
		 **/
		kTwoLights: DefaultLightingType;
		/**
		 * Back light.
		 **/
		kBackLight: DefaultLightingType;
		/**
		 * User defined light.
		 **/
		kUserDefined: DefaultLightingType;
	};

	type CoordSys = { value: number };
	const CoordSys: {
		Screen: CoordSys;
		World: CoordSys;
		Eye: CoordSys;
	};

	/**
	 * Selection modes.
	 **/
	type SelectionMode = { value: number };
	const SelectionMode: {
		/**
		 * Selection is defined with two points that represent a rectangle. Only those objects are selected that are located entirely inside the selection area.
		 **/
		kWindow: SelectionMode;
		/**
		 * Selection is defined with two points that represent a rectangle. Only those objects are selected that are located either entirely inside the selection area or intersect it.
		 **/
		kCrossing: SelectionMode;
		/**
		 * Selection is defined with two or more points that represent a polyline. Only those objects are selected that intersect the selection polyline.
		 **/
		kFence: SelectionMode;
		/**
		 * Selection is defined with three or more points that represent a polygon. Only those objects are selected that are located entirely inside the selection polygon.
		 **/
		kWPoly: SelectionMode;
		/**
		 * Selection is defined with three or more points that represent a polygon. Only those objects are selected that are located entirely inside the selection polygon or intersect it.
		 **/
		kCPoly: SelectionMode;
		/**
		 * Same as kCrossing, but returns only a single selected object: the top object for 3D render modes or the first object for 2D render mode.
		 **/
		kPoint: SelectionMode;
	};

	/**
	 * Entity selection levels.
	 **/
	type SelectionLevel = { value: number };
	const SelectionLevel: {
		/**
		 * An entity selection level.
		 **/
		kEntity: SelectionLevel;
		/**
		 * A nested entity selection level.
		 **/
		kNestedEntity: SelectionLevel;
		/**
		 * A geometry selection level.
		 **/
		kGeometry: SelectionLevel;
		/**
		 * A sub-geometry selection level.
		 **/
		kSubGeometry: SelectionLevel;
	};

	/**
	 * Enumerates entity types.
	 **/
	type OdTvEntityType = { value: number };
	const OdTvEntityType: {
		/**
		 * An undefined type
		 **/
		kUndefined: OdTvEntityType;
		/**
		 * An entity type. Scene object.
		 **/
		kEntity: OdTvEntityType;
		/**
		 * An insert object. Traits object.
		 **/
		kInsert: OdTvEntityType;
		/**
		 * A light object.
		 **/
		kLight: OdTvEntityType;
		/**
		 * A camera object.
		 **/
		kCamera: OdTvEntityType;
	};

	/**
	 * Collision detection type.
	 **/
	type CollisionDetectionType = { value: number };
	const CollisionDetectionType: {
		/**
		 * Detects intersection and touching
		 **/
		kIntersection: CollisionDetectionType;
		/**
		 * Detects intersection, touching and "too close" objects.
		 **/
		kClearance: CollisionDetectionType;
	};

	type DefaultViewPosition = { value: number };
	const DefaultViewPosition: {
		k3DViewTop: DefaultViewPosition;
		k3DViewBottom: DefaultViewPosition;
		k3DViewLeft: DefaultViewPosition;
		k3DViewRight: DefaultViewPosition;
		k3DViewFront: DefaultViewPosition;
		k3DViewBack: DefaultViewPosition;
		k3DViewSW: DefaultViewPosition;
		k3DViewSE: DefaultViewPosition;
		k3DViewNE: DefaultViewPosition;
		k3DViewNW: DefaultViewPosition;
	};

	/**
	 * Enumerates different results of Visualize SDK operations.
	 **/
	type OdTvResult = { value: number };
	const OdTvResult: {
		/**
		 * An operation successfully finished.
		 **/
		tvOk: OdTvResult;
		/**
		 * A requested operation is for Visualize SDK internal use only.
		 **/
		tvInternal: OdTvResult;
		/**
		 * Not implemented yet.
		 **/
		tvNotImplementedYet: OdTvResult;
		/**
		 * Incorrect input data was provided.
		 **/
		tvInvalidInput: OdTvResult;
		/**
		 * A visualize object factory does not exist.
		 **/
		tvFactoryDoesntExist: OdTvResult;
		/**
		 * A needed object is missing.
		 **/
		tvMissingObject: OdTvResult;
		/**
		 * A retrieved object was erased.
		 **/
		tvErasedObject: OdTvResult;
		/**
		 * An object with the specified identifier has no internal data.
		 **/
		tvIdHasNoData: OdTvResult;
		/**
		 * An object with the specified identifier has incorrect data.
		 **/
		tvIdWrongData: OdTvResult;
		/**
		 * An object with the specified identifier has an incorrect data type.
		 **/
		tvIdWrongDataType: OdTvResult;
		/**
		 * A pointer to an object is NULL.
		 **/
		tvNullObjectPtr: OdTvResult;
		/**
		 * An object with the specified name already exists in the database.
		 **/
		tvAlreadyExistSameName: OdTvResult;
		/**
		 * Retrieved geometry data does not exist or was deleted.
		 **/
		tvGeometryDataDoesntExistOrBeenDeleted: OdTvResult;
		/**
		 * Retrieved geometry data has a different type than was expected.
		 **/
		tvGeometryDataHasAnotherType: OdTvResult;
		/**
		 * Incorrect device path information was provided.
		 **/
		tvWrongDevicePathData: OdTvResult;
		/**
		 * Device information loading failed.
		 **/
		tvDeviceLoadingFailed: OdTvResult;
		/**
		 * Device creation failed.
		 **/
		tvDeviceCreatingFailed: OdTvResult;
		/**
		 * A device has an incorrect type.
		 **/
		tvDeviceWrongType: OdTvResult;
		/**
		 * An invalid device bitmap state occurred.
		 **/
		tvDeviceWrongBitmapState: OdTvResult;
		/**
		 * An invalid device option was provided.
		 **/
		tvInvalidDeviceOption: OdTvResult;
		/**
		 * Device option information contains an error type.
		 **/
		tvDeviceOptionHasErrorType: OdTvResult;
		/**
		 * The device option is not supported.
		 **/
		tvDeviceOptionDoesntSupport: OdTvResult;
		/**
		 * Device is empty.
		 **/
		tvDevicesIsEmpty: OdTvResult;
		/**
		 * The view has a different device than was provided.
		 **/
		tvViewHasDifferentDevice: OdTvResult;
		/**
		 * The view index is out of range: the index value is greater than or equal to the view's array elements count.
		 **/
		tvViewIndexTooBig: OdTvResult;
		/**
		 * The view index is out of range: the index value is too small.
		 **/
		tvViewIndexTooSmall: OdTvResult;
		/**
		 * A model has an incorrect database.
		 **/
		tvModelHasErrorDatabase: OdTvResult;
		/**
		 * A method is not implemented yet.
		 **/
		tvMethodNotImplemented: OdTvResult;
		/**
		 * Geometry data does not have a parent object.
		 **/
		tvGeoDataHasNoParent: OdTvResult;
		/**
		 * An internal database can not be created.
		 **/
		tvCannotCreateInternalDatabase: OdTvResult;
		/**
		 * An internal device has not been created.
		 **/
		tvInternalDeviceDoesntCreated: OdTvResult;
		/**
		 * Text traits are missing.
		 **/
		tvMissedTextTraits: OdTvResult;
		/**
		 * An internal database has not been created.
		 **/
		tvInternalDatabaseDoesntCreated: OdTvResult;
		/**
		 * A polygon is not planar.
		 **/
		tvPolygonNotPlanar: OdTvResult;
		/**
		 * A polygon has less than three points.
		 **/
		tvPolygonHasLessThanThreePoints: OdTvResult;
		/**
		 * Internal database has no model container.
		 **/
		tvInternalDatabaseHasNoModelsContainer: OdTvResult;
		/**
		 * Internal database has no image container.
		 **/
		tvInternalDatabaseHasNoImagesContainer: OdTvResult;
		/**
		 * Internal database has no visual style container.
		 **/
		tvInternalDatabaseHasNoVisualStylesCont: OdTvResult;
		/**
		 * An internal iterator for objects is missing.
		 **/
		tvInternalIteratorMissing: OdTvResult;
		/**
		 * A linearly dependent circle argument.
		 **/
		tvLinearlyDependentCircleArg: OdTvResult;
		/**
		 * An object has an empty name.
		 **/
		tvEmptyName: OdTvResult;
		/**
		 * An object's name is invalid.
		 **/
		tvInvalidName: OdTvResult;
		/**
		 * An object has a forbidden name.
		 **/
		tvForbiddenName: OdTvResult;
		/**
		 * A block object references itself.
		 **/
		tvSelfReferencedBlock: OdTvResult;
		/**
		 * An object has an invalid color type.
		 **/
		tvInvalidColorType: OdTvResult;
		/**
		 * An object has an invalid linetype value.
		 **/
		tvInvalidLinetypeType: OdTvResult;
		/**
		 * A non-positive NURBS degree value was detected.
		 **/
		tvNonPositiveNurbsDegree: OdTvResult;
		/**
		 * A NURBS curve has invalid control points.
		 **/
		tvInvalidNurbsControlPoints: OdTvResult;
		/**
		 * A NURBS curve has invalid weights.
		 **/
		tvInvalidNurbsWeights: OdTvResult;
		/**
		 * A NURBS curve has invalid knots.
		 **/
		tvInvalidNurbsKnots: OdTvResult;
		/**
		 * A NURBS curve has invalid start and/or end parameter values.
		 **/
		tvInvalidNurbsStartEndParams: OdTvResult;
		/**
		 * An object has not been opened for writing before trying to write data to it.
		 **/
		tvNotOpenForWrite: OdTvResult;
		/**
		 * An object has an invalid lineweight type.
		 **/
		tvInvalidLineWeightType: OdTvResult;
		/**
		 * An error occurred while accessing an image file.
		 **/
		tvImageFileAccessErr: OdTvResult;
		/**
		 * An image was not loaded.
		 **/
		tvImageNotLoaded: OdTvResult;
		/**
		 * An object has an invalid layer type.
		 **/
		tvInvalidLayerType: OdTvResult;
		/**
		 * A raster image object does not exist or has been deleted from the database.
		 **/
		tvRasterImageObjectDoesntExistOrBeenDeleted: OdTvResult;
		/**
		 * Invalid input vertex data was provided.
		 **/
		tvInvalidVerticesInput: OdTvResult;
		/**
		 * Invalid input face data was provided.
		 **/
		tvInvalidFacesInput: OdTvResult;
		/**
		 * Invalid input shell vertex data was provided.
		 **/
		tvInvalidShellVerticesInput: OdTvResult;
		/**
		 * Invalid input shell face data was provided.
		 **/
		tvInvalidShellFacesInput: OdTvResult;
		/**
		 * Invalid input mesh vertex data was provided.
		 **/
		tvInvalidMeshVerticesInput: OdTvResult;
		/**
		 * Invalid input transparency type value.
		 **/
		tvInvalidTransparencyType: OdTvResult;
		/**
		 * The specified device was not set up.
		 **/
		tvNonSetupDevice: OdTvResult;
		/**
		 * A file path is empty.
		 **/
		tvEmptyFilePath: OdTvResult;
		/**
		 * A filer module is missing.
		 **/
		tvMissingFilerModule: OdTvResult;
		/**
		 * A filer is missing.
		 **/
		tvMissingFiler: OdTvResult;
		/**
		 * An invalid file path was provided.
		 **/
		tvInvalidFilePath: OdTvResult;
		/**
		 * The specified file can not be opened.
		 **/
		tvCannotOpenFile: OdTvResult;
		/**
		 * An error occurred while opening the specified file.
		 **/
		tvErrorDuringOpenFile: OdTvResult;
		/**
		 * An empty internal database for a filer was found.
		 **/
		tvFilerEmptyInternalDatabase: OdTvResult;
		/**
		 * The Visualize SDK device module is missing.
		 **/
		tvMissingVisualizeDeviceModule: OdTvResult;
		/**
		 * An incorrect raster image type was provided.
		 **/
		tvWrongRasterImageType: OdTvResult;
		/**
		 * An invalid file type was provided.
		 **/
		tvInvalidFileType: OdTvResult;
		/**
		 * A viewport object has more than one parent.
		 **/
		tvViewportObjectCanHaveOnlyOneParent: OdTvResult;
		/**
		 * No active view was found.
		 **/
		tvThereIsNoActiveView: OdTvResult;
		/**
		 * An invalid input clipping point was provided.
		 **/
		tvInvalidClippingPointInput: OdTvResult;
		/**
		 * An incorrect class for a handled object was provided.
		 **/
		tvWrongHandledObjectClass: OdTvResult;
		/**
		 * An incorrect parent for a handled object was provided.
		 **/
		tvWrongHandledObjectParent: OdTvResult;
		/**
		 * An incorrect type of a handled object was provided.
		 **/
		tvWrongHandledObjectType: OdTvResult;
		/**
		 * A duplicate handle was detected.
		 **/
		tvDuplicateHandle: OdTvResult;
		/**
		 * An incorrect sub-item path was provided.
		 **/
		tvWrongSubItemPath: OdTvResult;
		/**
		 * An invalid extents was provided.
		 **/
		tvInvalidExtents: OdTvResult;
		/**
		 * No requested extents were found.
		 **/
		tvNoRequestedExtents: OdTvResult;
		/**
		 * The operation is not allowed by the 2D view.
		 **/
		tvOperationIsNotAllowedBy2dView: OdTvResult;
		/**
		 * Invalid visual style operation.
		 **/
		tvInvalidVisualStyleOption: OdTvResult;
		/**
		 * The visual style operation returned an error.
		 **/
		tvVisualStyleOptionHasErrorType: OdTvResult;
		/**
		 * A forbidden visual style operation was requested.
		 **/
		tvForbiddenOperationDefVisualStyle: OdTvResult;
		/**
		 * Invalid input vectors for the box creation.
		 **/
		tvInvalidBoxVectors: OdTvResult;
		/**
		 * An error occurred while exporting the database to the specified file.
		 **/
		tvErrorDuringExport: OdTvResult;
		/**
		 * An export module is missing.
		 **/
		tvMissingExportModule: OdTvResult;
		/**
		 * An exporter is missing.
		 **/
		tvMissingExporter: OdTvResult;
		/**
		 * Internal database has no storage.
		 **/
		tvNonRevisionControlInternalDatabase: OdTvResult;
		/**
		 * Old file format read successfully.
		 **/
		tvOkOldFormatRead: OdTvResult;
		/**
		 * A special value for internal use.
		 **/
		tvDummyLastError: OdTvResult;
	};

	/**
	 * Coloring methods used by the <link OdTvMaterialColor::setMethod@Method, setMethod()> and <link OdTvMaterialColor::getMethod@OdTvResult*@const, getMethod()> methods.
	 **/
	type MaterialColorMethod = { value: number };
	const MaterialColorMethod: {
		/**
		 * Uses the current drawing color.
		 **/
		kInherit: MaterialColorMethod;
		/**
		 * Uses the color set with the <link OdTvMaterialColor::setColor@const_OdTvColorDef &, setColor()> method.
		 **/
		kOverride: MaterialColorMethod;
	};

	/**
	 * Grid styles.
	 **/
	type GridDataStyle = { value: number };
	const GridDataStyle: {
		/**
		 * A grid with crosses (currently only points are supported).
		 **/
		kCrosses: GridDataStyle;
		/**
		 * A grid with lines.
		 **/
		kLines: GridDataStyle;
	};

	type DatabaseStreamStatus = { value: number };
	const DatabaseStreamStatus: {
		AwaitingServiceData: DatabaseStreamStatus;
		ReadyServiceData: DatabaseStreamStatus;
		AwaitingObjectsData: DatabaseStreamStatus;
		Complete: DatabaseStreamStatus;
	};

	/**
	 * Grid types.
	 **/
	type GridDataType = { value: number };
	const GridDataType: {
		/**
		 * A quadratic grid.
		 **/
		kQuadratic: GridDataType;
		/**
		 * A radial grid.
		 **/
		kRadial: GridDataType;
	};

	/**
	 * Grid types.
	 **/
	type InfiniteLineType = { value: number };
	const InfiniteLineType: {
		kRay: InfiniteLineType;
		kLine: InfiniteLineType;
	};

	/**
	 * Defines the regeneration options for a device object.
	 **/
	type RegenMode = { value: number };
	const RegenMode: {
		/**
		 * Regenerate all.
		 **/
		kRegenAll: RegenMode;
		/**
		 * Regenerate only visible.
		 **/
		kRegenVisible: RegenMode;
	};

	/**
	 * Node options.
	 **/
	type DeviceOptions = { value: number };
	const DeviceOptions: {
		kAlternativeHlt: DeviceOptions;
		kAlternativeHltColor: DeviceOptions;
		kBadOption: DeviceOptions;
		kBlendingMode: DeviceOptions;
		kBlocksCache: DeviceOptions;
		kClearScreen: DeviceOptions;
		kCreateGLContext: DeviceOptions;
		kDiscardBackFaces: DeviceOptions;
		kDoubleBufferEnabled: DeviceOptions;
		kEnableMultithread: DeviceOptions;
		kEnableSoftwareHLR: DeviceOptions;
		kForcePartialUpdate: DeviceOptions;
		kGeometryShaderUsage: DeviceOptions;
		kMaxRegenThreads: DeviceOptions;
		kOptionCount: DeviceOptions;
		kRegenCoef: DeviceOptions;
		kUseCompositeMetafiles: DeviceOptions;
		kUseDynamicSubEntHlt: DeviceOptions;
		kUseLutPalette: DeviceOptions;
		kUseOverlayBuffers: DeviceOptions;
		kUseSceneGraph: DeviceOptions;
		kUseTTFCache: DeviceOptions;
		kUseVisualStyles: DeviceOptions;
		kAntiAliasLevel: DeviceOptions;
		kAntiAliasLevelExt: DeviceOptions;
		kDelaySceneGraphProc: DeviceOptions;
		kSSAOEnable: DeviceOptions;
		kSSAOLoops: DeviceOptions;
		kSSAORadius: DeviceOptions;
		kSSAOPower: DeviceOptions;
		kSSAOBlurRadius: DeviceOptions;
		kSSAODynamicRadius: DeviceOptions;
		kAAQuality: DeviceOptions;
		kAA2dEnable: DeviceOptions;
		kSMAAEnable: DeviceOptions;
		kLightSourcesLimit: DeviceOptions;
		kForceOffscreenSceneGraph: DeviceOptions;
		kDegradationLevel: DeviceOptions;
	};

	/**
	 * Lineweight styles.
	 **/
	type DeviceLineWeightStyle = { value: number };
	const DeviceLineWeightStyle: {
		/**
		 * Line cap style.
		 **/
		kLineCapStyle: DeviceLineWeightStyle;
		/**
		 * Line join style.
		 **/
		kLineJoinStyle: DeviceLineWeightStyle;
		/**
		 * Point lineweight style.
		 **/
		kPointLineWeight: DeviceLineWeightStyle;
	};

	/**
	 * Predefined linetypes.
	 **/
	type LinetypePredefined = { value: number };
	const LinetypePredefined: {
		/**
		 * Pattern of 0.5 Dash - 0.125 Space - Dot - 0.125 Space - Dot - 0.125 Space.
		 **/
		kDash2Dot: LinetypePredefined;
		/**
		 * Pattern of 0.5 Dash - 0.125 Space - Dot - 0.125 Space - Dot - 0.125 Space - Dot - 0.125 Space.
		 **/
		kDash3Dot: LinetypePredefined;
		/**
		 * Pattern of 0.5 Dash - 0.125 Space - Dot - 0.125 Space.
		 **/
		kDashDot: LinetypePredefined;
		/**
		 * Pattern of 0.5 Dash - 0.125 Space.
		 **/
		kDashed: LinetypePredefined;
		/**
		 * Pattern of Dot - 0.125 Space.
		 **/
		kDotted: LinetypePredefined;
		/**
		 * Pattern of 1.0 Dash - 0.125 Space.
		 **/
		kLongDash: LinetypePredefined;
		/**
		 * Pattern of 1.0 Dash - 0.125 Space - 0.25 Dash - 0.125 Space - 0.25 Dash - 0.125 Space.
		 **/
		kLongDash2ShortDash: LinetypePredefined;
		/**
		 * Pattern of 1.0 Dash - 0.125 Space - 0.25 Dash - 0.125 Space.
		 **/
		kLongDashShortDash: LinetypePredefined;
		/**
		 * Solid pattern.
		 **/
		kSolid: LinetypePredefined;
	};

	type InheritedAttribute = { value: number };
	const InheritedAttribute: {
		kByBlock: InheritedAttribute;
		kByLayer: InheritedAttribute;
	};

	type OpenMode = { value: number };
	const OpenMode: {
		kForRead: OpenMode;
		kForWrite: OpenMode;
		kNotOpen: OpenMode;
	};

	/**
	 * Types of text alignment.
	 **/
	type TextStyleAlignment = { value: number };
	const TextStyleAlignment: {
		/**
		 * Text is aligned to horizontally fill the space of the text object.
		 **/
		kAligned: TextStyleAlignment;
		/**
		 * Bottom and center text alignment.
		 **/
		kBottomCenter: TextStyleAlignment;
		/**
		 * Bottom and left text alignment.
		 **/
		kBottomLeft: TextStyleAlignment;
		/**
		 * Bottom and right text alignment.
		 **/
		kBottomRight: TextStyleAlignment;
		/**
		 * Center text alignment.
		 **/
		kCenter: TextStyleAlignment;
		/**
		 * Fit text alignment.
		 **/
		kFit: TextStyleAlignment;
		/**
		 * Left text alignment.
		 **/
		kLeft: TextStyleAlignment;
		/**
		 * Middle text alignment.
		 **/
		kMiddle: TextStyleAlignment;
		/**
		 * Middle and center text alignment.
		 **/
		kMiddleCenter: TextStyleAlignment;
		/**
		 * Middle and left text alignment.
		 **/
		kMiddleLeft: TextStyleAlignment;
		/**
		 * Middle and right text alignment.
		 **/
		kMiddleRight: TextStyleAlignment;
		/**
		 * Right text alignment.
		 **/
		kRight: TextStyleAlignment;
		/**
		 * Top and center text alignment.
		 **/
		kTopCenter: TextStyleAlignment;
		/**
		 * Top and left text alignment.
		 **/
		kTopLeft: TextStyleAlignment;
		/**
		 * Top and right text alignment.
		 **/
		kTopRight: TextStyleAlignment;
	};

	/**
	 * Node options.
	 **/
	type VisualStyleOptions = { value: number };
	const VisualStyleOptions: {
		kDisplayStyles: VisualStyleOptions;
		kEdgeColorValue: VisualStyleOptions;
		kEdgeCreaseAngle: VisualStyleOptions;
		kEdgeHaloGapAmount: VisualStyleOptions;
		kEdgeIntersectionColor: VisualStyleOptions;
		kEdgeIntersectionLinePattern: VisualStyleOptions;
		kEdgeJitterAmount: VisualStyleOptions;
		kEdgeModel: VisualStyleOptions;
		kEdgeModifiers: VisualStyleOptions;
		kEdgeObscuredColor: VisualStyleOptions;
		kEdgeObscuredLinePattern: VisualStyleOptions;
		kEdgeOpacityAmount: VisualStyleOptions;
		kEdgeOverhangAmount: VisualStyleOptions;
		kEdgeSilhouetteWidth: VisualStyleOptions;
		kEdgeStyles: VisualStyleOptions;
		kEdgeWidthAmount: VisualStyleOptions;
		kFaceColorMode: VisualStyleOptions;
		kFaceLightingModel: VisualStyleOptions;
		kFaceLightingQuality: VisualStyleOptions;
		kFaceModifiers: VisualStyleOptions;
		kFaceMonoColor: VisualStyleOptions;
		kFaceOpacityAmount: VisualStyleOptions;
		kFaceSpecularAmount: VisualStyleOptions;
		kPropertyCount: VisualStyleOptions;
		kUseDrawOrder: VisualStyleOptions;
		kDisplayShadow: VisualStyleOptions;
	};

	type FaceLightingModel = { value: number };
	const FaceLightingModel: {
		kInvisible: FaceLightingModel;
		kConstant: FaceLightingModel;
		kPhong: FaceLightingModel;
		kGooch: FaceLightingModel;
	};

	type FaceLightingQuality = { value: number };
	const FaceLightingQuality: {
		kNoLighting: FaceLightingQuality;
		kPerFaceLighting: FaceLightingQuality;
		kPerVertexLighting: FaceLightingQuality;
		kPerPixelLighting: FaceLightingQuality;
	};

	type FaceColorMode = { value: number };
	const FaceColorMode: {
		kNoColorMode: FaceColorMode;
		kObjectColor: FaceColorMode;
		kBackgroundColor: FaceColorMode;
		kMono: FaceColorMode;
		kTint: FaceColorMode;
		kDesaturate: FaceColorMode;
		kBackgroundTexture: FaceColorMode;
	};

	type FaceModifiers = { value: number };
	const FaceModifiers: {
		kNoFaceModifiers: FaceModifiers;
		kFaceOpacityFlag: FaceModifiers;
		kSpecularFlag: FaceModifiers;
	};

	type EdgeModel = { value: number };
	const EdgeModel: {
		kNoEdges: EdgeModel;
		kIsolines: EdgeModel;
		kFacetEdges: EdgeModel;
		kTriangulation: EdgeModel;
	};

	type EdgeStyles = { value: number };
	const EdgeStyles: {
		kNoEdgeStyle: EdgeStyles;
		kSilhouette: EdgeStyles;
		kObscured: EdgeStyles;
		kIntersection: EdgeStyles;
	};

	type EdgeModifiers = { value: number };
	const EdgeModifiers: {
		kNoEdgeModifiers: EdgeModifiers;
		kEdgeOverhang: EdgeModifiers;
		kEdgeJitter: EdgeModifiers;
		kEdgeWidth: EdgeModifiers;
		kEdgeColor: EdgeModifiers;
		kEdgeHaloGap: EdgeModifiers;
		kAlwaysOnTop: EdgeModifiers;
		kEdgeOpacity: EdgeModifiers;
	};

	type EdgeJitterAmount = { value: number };
	const EdgeJitterAmount: {
		kLow: EdgeJitterAmount;
		kMedium: EdgeJitterAmount;
		kHigh: EdgeJitterAmount;
	};

	type EdgeLinePattern = { value: number };
	const EdgeLinePattern: {
		kSolid: EdgeLinePattern;
		kDashedLine: EdgeLinePattern;
		kDotted: EdgeLinePattern;
		kShortDash: EdgeLinePattern;
		kMediumDash: EdgeLinePattern;
		kLongDash: EdgeLinePattern;
		kDoubleShortDash: EdgeLinePattern;
		kDoubleMediumDash: EdgeLinePattern;
		kDoubleLongDash: EdgeLinePattern;
		kMediumLongDash: EdgeLinePattern;
		kSparseDot: EdgeLinePattern;
	};

	type DisplayStyles = { value: number };
	const DisplayStyles: {
		kNoDisplayStyle: DisplayStyles;
		kBackgrounds: DisplayStyles;
		kMaterials: DisplayStyles;
		kTextures: DisplayStyles;
	};

	type VisualStyleOperations = { value: number };
	const VisualStyleOperations: {
		kInherit: VisualStyleOperations;
		kSet: VisualStyleOperations;
	};

	type ExtentsType = { value: number };
	const ExtentsType: {
		kExternal: ExtentsType;
		kGeom: ExtentsType;
		kPreferred: ExtentsType;
		kView: ExtentsType;
	};

	/**
	 * Statistics attribute types for geometry entities.
	 **/
	type GeometryStatisticTypes = { value: number };
	const GeometryStatisticTypes: {
		/**
		 * Quantity of boxes.
		 **/
		kBox: GeometryStatisticTypes;
		/**
		 * Quantity of circles.
		 **/
		kCircle: GeometryStatisticTypes;
		/**
		 * Quantity of circle wedges.
		 **/
		kCircleWedge: GeometryStatisticTypes;
		/**
		 * Quantity of circular arcs.
		 **/
		kCircularArc: GeometryStatisticTypes;
		/**
		 * Quantity of colored shapes.
		 **/
		kColoredShape: GeometryStatisticTypes;
		/**
		 * Quantity of cylinders.
		 **/
		kCylinder: GeometryStatisticTypes;
		/**
		 * Quantity of ellipses.
		 **/
		kEllipse: GeometryStatisticTypes;
		/**
		 * Quantity of elliptical arcs.
		 **/
		kEllipticArc: GeometryStatisticTypes;
		/**
		 * Quantity of entities.
		 **/
		kEntity: GeometryStatisticTypes;
		/**
		 * Quantity of faces (for shells, meshes, colored shapes).
		 **/
		kFace: GeometryStatisticTypes;
		/**
		 * Quantity of subinserts.
		 **/
		kGeomInsert: GeometryStatisticTypes;
		/**
		 * Quantity of grids.
		 **/
		kGrid: GeometryStatisticTypes;
		/**
		 * Quantity of infinite lines.
		 **/
		kInfiniteLine: GeometryStatisticTypes;
		/**
		 * Quantity of inserts.
		 **/
		kInsert: GeometryStatisticTypes;
		/**
		 * A special value for internal use.
		 **/
		kLast: GeometryStatisticTypes;
		/**
		 * Quantity of lights.
		 **/
		kLight: GeometryStatisticTypes;
		/**
		 * Quantity of meshes.
		 **/
		kMesh: GeometryStatisticTypes;
		/**
		 * Quantity of NURBS.
		 **/
		kNurbs: GeometryStatisticTypes;
		/**
		 * Quantity of point clouds.
		 **/
		kPointCloud: GeometryStatisticTypes;
		/**
		 * Quantity of points (for point clouds).
		 **/
		kPoints: GeometryStatisticTypes;
		/**
		 * Quantity of polygons.
		 **/
		kPolygon: GeometryStatisticTypes;
		/**
		 * Quantity of polylines.
		 **/
		kPolyline: GeometryStatisticTypes;
		/**
		 * Quantity of raster images.
		 **/
		kRasterImage: GeometryStatisticTypes;
		/**
		 * Quantity of shells.
		 **/
		kShell: GeometryStatisticTypes;
		/**
		 * Quantity of spheres.
		 **/
		kSphere: GeometryStatisticTypes;
		/**
		 * Quantity of subentities.
		 **/
		kSubEntity: GeometryStatisticTypes;
		/**
		 * Quantity of text.
		 **/
		kText: GeometryStatisticTypes;
	};

	/**
	 * Layer types supported by Visualize SDK.
	 **/
	type LayerType = { value: number };
	const LayerType: {
		/**
		 * Default layer.
		 **/
		kDefault: LayerType;
		/**
		 * A layer defined by its identifier.
		 **/
		kId: LayerType;
	};

	/**
	 * Lineweight types supported by Visualize SDK.
	 **/
	type LineWeightType = { value: number };
	const LineWeightType: {
		/**
		 * Default lineweight.
		 **/
		kDefault: LineWeightType;
		/**
		 * An inherited lineweight.
		 **/
		kInherited: LineWeightType;
		/**
		 * A lineweight specified with an appropriate value.
		 **/
		kValue: LineWeightType;
	};

	/**
	 * Types of text styles supported by Visualize SDK.
	 **/
	type TextStyleType = { value: number };
	const TextStyleType: {
		/**
		 * Default text style.
		 **/
		kDefault: TextStyleType;
		/**
		 * A text style is defined by its identifier.
		 **/
		kId: TextStyleType;
	};

	/**
	 * Types of materials supported by Visualize SDK.
	 **/
	type MaterialType = { value: number };
	const MaterialType: {
		/**
		 * Default material.
		 **/
		kDefault: MaterialType;
		/**
		 * A material defined by its identifier.
		 **/
		kId: MaterialType;
		/**
		 * An inherited material.
		 **/
		kInherited: MaterialType;
	};

	/**
	 * Types of mappers supported by Visualize SDK.
	 **/
	type MapperType = { value: number };
	const MapperType: {
		/**
		 * Default mapper.
		 **/
		kDefault: MapperType;
		/**
		 * A mapper defined with a specified value.
		 **/
		kValue: MapperType;
	};

	/**
	 * Projection types.
	 **/
	type Projection = { value: number };
	const Projection: {
		kBox: Projection;
		kCylinder: Projection;
		kPlanar: Projection;
		kSphere: Projection;
	};

	/**
	 * Automatic transformation modes.
	 **/
	type AutoTransform = { value: number };
	const AutoTransform: {
		/**
		 * Inherits automatic transform mode from the current material's mapper.
		 **/
		kInheritAutoTransform: AutoTransform;
		/**
		 * Multiplies the mapper transformation by the current block transformation.
		 **/
		kModel: AutoTransform;
		/**
		 * No automatic transformation.
		 **/
		kNone: AutoTransform;
		/**
		 * Adjusts the mapper transformation to align with and fit the current object.
		 **/
		kObject: AutoTransform;
	};

	/**
	 * Types of glyph display.
	 **/
	type GlyphDisplayType = { value: number };
	const GlyphDisplayType: {
		/**
		 * Auto display of glyph.
		 **/
		kGlyphDisplayAuto: GlyphDisplayType;
		/**
		 * Display of glyph is off.
		 **/
		kGlyphDisplayOff: GlyphDisplayType;
		/**
		 * Display of glyph is on.
		 **/
		kGlyphDisplayOn: GlyphDisplayType;
	};

	type SubGeometryType = { value: number };
	const SubGeometryType: {
		kEdgeSubGeometryType: SubGeometryType;
		kFaceSubGeometryType: SubGeometryType;
		kNullSubGeometryType: SubGeometryType;
		kVertexSubGeometryType: SubGeometryType;
	};

	/**
	 * Types of light attenuation.
	 **/
	type AttenuationType = { value: number };
	const AttenuationType: {
		/**
		 * Inverse linear light attenuation.
		 **/
		kInverseLinear: AttenuationType;
		/**
		 * Inverse square light attenuation.
		 **/
		kInverseSquare: AttenuationType;
		/**
		 * No light attenuation.
		 **/
		kNone: AttenuationType;
	};

	/**
	 * Light types.
	 **/
	type LightType = { value: number };
	const LightType: {
		/**
		 * A distant light.
		 **/
		kDistantLight: LightType;
		/**
		 * A point light.
		 **/
		kPointLight: LightType;
		/**
		 * A spot light.
		 **/
		kSpotLight: LightType;
	};

	/**
	 * Types of the material map source (file or raster image).
	 **/
	type SourceType = { value: number };
	const SourceType: {
		/**
		 * A file.
		 **/
		kFile: SourceType;
		/**
		 * A raster image.
		 **/
		kRaster: SourceType;
		/**
		 * An unknown source.
		 **/
		kUnknown: SourceType;
	};

	/**
	 * Mapper's tiling methods.
	 **/
	type Tiling = { value: number };
	const Tiling: {
		/**
		 * Clamps (stretches) a map inside the (0.0, 1.0) intervals at the image axes.
		 **/
		kClamp: Tiling;
		/**
		 * Crops a map outside of the (0.0, 1.0) intervals at the image axes.
		 **/
		kCrop: Tiling;
		/**
		 * Inherits tiling from the current material's mapper.
		 **/
		kInheritTiling: Tiling;
		/**
		 * Mirrors the material map at every integer boundary.
		 **/
		kMirror: Tiling;
		/**
		 * Repeats a map along the image axes.
		 **/
		kTile: Tiling;
	};

	/**
	 * Enum to register specific big fonts.
	 **/
	type OdCodePageForBigFont = { value: number };
	const OdCodePageForBigFont: {
		JAPANESE_CODEPAGE_INDEX: OdCodePageForBigFont;
		TRADITIONAL_CHINESE_CODEPAGE_INDEX: OdCodePageForBigFont;
		KOREAN_CODEPAGE_INDEX: OdCodePageForBigFont;
		SIMPLIFIED_CHINESE_CODEPAGE_INDEX: OdCodePageForBigFont;
	};

	/**
	 * Lineweight modes.
	 **/
	type OdTvGsViewLineWeightMode = { value: number };
	const OdTvGsViewLineWeightMode: {
		/**
		 * Device fixed mode.
		 **/
		kDeviceFixed: OdTvGsViewLineWeightMode;
		/**
		 * World fixed mode.
		 **/
		kWorldFixed: OdTvGsViewLineWeightMode;
		/**
		 * Indexed lineweight mode.
		 **/
		kIndexed: OdTvGsViewLineWeightMode;
	};

	/**
	 * Enumerates view background types.
	 **/
	type BackgroundTypes = { value: number };
	const BackgroundTypes: {
		/**
		 * A solid background.
		 **/
		kSolid: BackgroundTypes;
		/**
		 * A gradient background.
		 **/
		kGradient: BackgroundTypes;
		/**
		 * An image background.
		 **/
		kImage: BackgroundTypes;
		/**
		 * An environment background.
		 **/
		kEnvironment: BackgroundTypes;
	};

	/**
	 * Defines the types of preferable visual styles
	 **/
	type PreferableVisualStylesType = { value: number };
	const PreferableVisualStylesType: {
		/**
		 * Standard display.
		 **/
		kWireframe: PreferableVisualStylesType;
		/**
		 * Hidden lines display.
		 **/
		kHiddenLine: PreferableVisualStylesType;
		/**
		 * Shaded display.
		 **/
		kShaded: PreferableVisualStylesType;
		/**
		 * Shaded display with tessellation wireframe overlay.
		 **/
		kShadedWithTessellation: PreferableVisualStylesType;
		/**
		 * Shaded display with isolines overlay.
		 **/
		kShadedWithIsolines: PreferableVisualStylesType;
		/**
		 * Custom preferable visual style. By default 2D Wireframe.
		 **/
		kCustom: PreferableVisualStylesType;
	};

	/**
	 * Defines findEntityByHandle result type.
	 **/
	type FindEntityResult = { value: number };
	const FindEntityResult: {
		kResultNotFound: FindEntityResult;
		kResultEntityId: FindEntityResult;
		kResultGeomertyId: FindEntityResult;
	};

	type Units = { value: number };
	const Units: {
		kUserDefined: Units;
		kMeters: Units;
		kCentimeters: Units;
		kMillimeters: Units;
		kFeet: Units;
		kInches: Units;
		kYards: Units;
		kKilometers: Units;
		kMiles: Units;
		kMicrometers: Units;
		kMils: Units;
		kMicroInches: Units;
	};

	/**
	 * Cutting plane filling style.
	 **/
	type CuttingPlaneFillStyle = { value: number };
	const CuttingPlaneFillStyle: {
		/**
		 * Solid filling style
		 **/
		kSolid: CuttingPlaneFillStyle;
		/**
		 * Checkerboard filling style
		 **/
		kCheckerboard: CuttingPlaneFillStyle;
		/**
		 * Crosshatch filling style
		 **/
		kCrosshatch: CuttingPlaneFillStyle;
		/**
		 * Diamonds filling style
		 **/
		kDiamonds: CuttingPlaneFillStyle;
		/**
		 * Horizontal bars filling style
		 **/
		kHorizontalBars: CuttingPlaneFillStyle;
		/**
		 * Slant left filling style
		 **/
		kSlantLeft: CuttingPlaneFillStyle;
		/**
		 * Slant right filling style
		 **/
		kSlantRight: CuttingPlaneFillStyle;
		/**
		 * Square dots filling style
		 **/
		kSquareDots: CuttingPlaneFillStyle;
		/**
		 * Vertical bars filling style
		 **/
		kVerticalBars: CuttingPlaneFillStyle;
	};

	/**
	 * Target display modes of the geometry data.
	 **/
	type TargetDisplayMode = { value: number };
	const TargetDisplayMode: {
		/**
		 * All display modes.
		 **/
		kEveryWhere: TargetDisplayMode;
		/**
		 * Wireframe display mode.
		 **/
		kWireframe: TargetDisplayMode;
		/**
		 * Rendering display mode.
		 **/
		kRender: TargetDisplayMode;
		/**
		 * Everywhere except isolines (can be used only for geometry data, not for entities).
		 **/
		kEveryWhereExceptIsolines: TargetDisplayMode;
	};

	type EntityFillingCheckResult = { value: number };
	const EntityFillingCheckResult: {
		kPassed: EntityFillingCheckResult;
		kSharpEdges: EntityFillingCheckResult;
		kInvalidFaceOrientation: EntityFillingCheckResult;
		kUncertainShellQuality: EntityFillingCheckResult;
	};

	/**
	 * Types of geometry data.
	 **/
	type GeometryTypes = { value: number };
	const GeometryTypes: {
		/**
		 * All types of geometry data.
		 **/
		kAll: GeometryTypes;
		/**
		 * Edges data, i.e. lines connecting vertices of a polygon, shell, or mesh, or the border of an ellipse or a circle.
		 **/
		kEdges: GeometryTypes;
		/**
		 * Faces data, i.e. interior filled areas of polygons, shells, meshes, ellipses, and circles (surfaces).
		 **/
		kFaces: GeometryTypes;
		/**
		 * No geometry data.
		 **/
		kNone: GeometryTypes;
		/**
		 * Lines and polylines.
		 **/
		kPolylines: GeometryTypes;
		/**
		 * A color of the text.
		 **/
		kText: GeometryTypes;
		/**
		 * Data about vertices.
		 **/
		kVertices: GeometryTypes;
	};

	/**
	 * The object snap mode.
	 **/
	type SnapMode = { value: number };
	const SnapMode: {
		/**
		 * Endpoints
		 **/
		kEnd: SnapMode;
		/**
		 * Middle
		 **/
		kMiddle: SnapMode;
		/**
		 * Nearest
		 **/
		kNear: SnapMode;
		/**
		 * Center
		 **/
		kCenter: SnapMode;
		/**
		 * Vertex
		 **/
		kVertex: SnapMode;
	};

	/**
	 * Types of geometry.
	 **/
	type FaceCulling = { value: number };
	const FaceCulling: {
		/**
		 * Inherits from the device property ("Discard back faces").
		 **/
		kInherited: FaceCulling;
		/**
		 * Enable culling.
		 **/
		kOn: FaceCulling;
		/**
		 * Disable culling.
		 **/
		kOff: FaceCulling;
	};

	type OrientationType = { value: number };
	const OrientationType: {
		kNoOrientation: OrientationType;
		kCounterClockwise: OrientationType;
		kClockwise: OrientationType;
	};

	type OdTvGeometryDataType = { value: number };
	const OdTvGeometryDataType: {
		kUndefinied: OdTvGeometryDataType;
		kPolyline: OdTvGeometryDataType;
		kCircle: OdTvGeometryDataType;
		kCircleWedge: OdTvGeometryDataType;
		kCircularArc: OdTvGeometryDataType;
		kEllipse: OdTvGeometryDataType;
		kEllipticArc: OdTvGeometryDataType;
		kPolygon: OdTvGeometryDataType;
		kText: OdTvGeometryDataType;
		kShell: OdTvGeometryDataType;
		kSphere: OdTvGeometryDataType;
		kCylinder: OdTvGeometryDataType;
		kSubInsert: OdTvGeometryDataType;
		kSubEntity: OdTvGeometryDataType;
		kNurbs: OdTvGeometryDataType;
		kRasterImage: OdTvGeometryDataType;
		kInfiniteLine: OdTvGeometryDataType;
		kMesh: OdTvGeometryDataType;
		kPointCloud: OdTvGeometryDataType;
		kGrid: OdTvGeometryDataType;
		kColoredShape: OdTvGeometryDataType;
		kBox: OdTvGeometryDataType;
		kBrep: OdTvGeometryDataType;
		kRcsPointCloud: OdTvGeometryDataType;
		kProgressiveMesh: OdTvGeometryDataType;
	};

	/**
	 * Cylinder capping types.
	 **/
	type Capping = { value: number };
	const Capping: {
		/**
		 * Both capping.
		 **/
		kBoth: Capping;
		/**
		 * First capping.
		 **/
		kFirst: Capping;
		/**
		 * No capping.
		 **/
		kNone: Capping;
		/**
		 * Second capping.
		 **/
		kSecond: Capping;
	};

	/**
	 * Types of transparency supported by Visualize SDK.
	 **/
	type TransparencyType = { value: number };
	const TransparencyType: {
		/**
		 * Default transparency.
		 **/
		kDefault: TransparencyType;
		/**
		 * An inherited transparency.
		 **/
		kInherited: TransparencyType;
		/**
		 * A transparency is defined with a specified value.
		 **/
		kValue: TransparencyType;
	};

	/**
	 * Types of the using visual style specular factor
	 **/
	type MaterialVisualStyleSpecular = { value: number };
	const MaterialVisualStyleSpecular: {
		/**
		 * not using visual style specular factor (material factor is used instead instead)
		 **/
		kNone: MaterialVisualStyleSpecular;
		/**
		 * use incoming specular factor instead of material or visual style specular factors
		 **/
		kOverride: MaterialVisualStyleSpecular;
		/**
		 * use visual style specular factor
		 **/
		kUseVisualStyleSpecular: MaterialVisualStyleSpecular;
	};

	/**
	 * Contains declarations which define types of reflectivity.
	 **/
	type MaterialReflectivityType = { value: number };
	const MaterialReflectivityType: {
		/**
		 * Reflect scene objects (only for plane objects)
		 **/
		kReflectScene: MaterialReflectivityType;
		/**
		 * Reflect environment background
		 **/
		kReflectEnvironment: MaterialReflectivityType;
		/**
		 * Reflect custom texture
		 **/
		kReflectTexture: MaterialReflectivityType;
	};

	/**
	 * Specifies the luminance modes.
	 **/
	type MaterialLuminanceMode = { value: number };
	const MaterialLuminanceMode: {
		/**
		 * Compute luminance from self-illumination parameters
		 **/
		kSelfIllumination: MaterialLuminanceMode;
		/**
		 * Compute luminance using an emission material channel
		 **/
		kEmissionColor: MaterialLuminanceMode;
	};

	/**
	 * Color types.
	 **/
	type ColorType = { value: number };
	const ColorType: {
		/**
		 * Default color.
		 **/
		kDefault: ColorType;
		/**
		 * Color specified by the definition object.
		 **/
		kColor: ColorType;
		/**
		 * Inherited color.
		 **/
		kInherited: ColorType;
		/**
		 * Color defined with an index.
		 **/
		kIndexed: ColorType;
	};

	/**
	 * Visibility types supported by Visualize SDK.
	 **/
	type VisibilityType = { value: number };
	const VisibilityType: {
		/**
		 * Default visibility.
		 **/
		kDefault: VisibilityType;
		/**
		 * An invisible object.
		 **/
		kInvisible: VisibilityType;
		/**
		 * A visible object.
		 **/
		kVisible: VisibilityType;
	};

	/**
	 * Enumerates animation action keypoint data types.
	 **/
	type Keydata = { value: number };
	const Keydata: {
		/**
		 * Translation by X axis.
		 **/
		kTranslationX: Keydata;
		/**
		 * Translation by Y axis.
		 **/
		kTranslationY: Keydata;
		/**
		 * Translation by Z axis.
		 **/
		kTranslationZ: Keydata;
		/**
		 * Rotation by X axis.
		 **/
		kRotationX: Keydata;
		/**
		 * Rotation by Y axis.
		 **/
		kRotationY: Keydata;
		/**
		 * Rotation by Z axis.
		 **/
		kRotationZ: Keydata;
		/**
		 * Scaling by X axis.
		 **/
		kScaleX: Keydata;
		/**
		 * Scaling by Y axis.
		 **/
		kScaleY: Keydata;
		/**
		 * Scaling by Z axis.
		 **/
		kScaleZ: Keydata;
		/**
		 * Service type: number of actual data types.
		 **/
		kNumKeydata: Keydata;
	};

	/**
	 * Enumerates animation action keypoint data interpolation.
	 **/
	type Interpolator = { value: number };
	const Interpolator: {
		/**
		 * No interpolation: value is equal to the previous keypoint value.
		 **/
		kThreshold: Interpolator;
		/**
		 * Linear interpolation.
		 **/
		kLinear: Interpolator;
		/**
		 * Cubic spline interpolation.
		 **/
		kCubic: Interpolator;
	};

	/**
	 * Entries of the highlight style
	 **/
	type Entry = { value: number };
	const Entry: {
		k2D: Entry;
		k2DTop: Entry;
		k3D: Entry;
		k3DTop: Entry;
	};

	/**
	 * Edge's draw mode in the highlight style
	 **/
	type EdgesDrawMode = { value: number };
	const EdgesDrawMode: {
		kExist: EdgesDrawMode;
		kIsolines: EdgesDrawMode;
		kCountour: EdgesDrawMode;
	};

	/**
	 * Traits changed flags.
	 **/
	type SectionGeometryChangedTraits = { value: number };
	const SectionGeometryChangedTraits: {
		kColorChanged: SectionGeometryChangedTraits;
		kLineWeightChanged: SectionGeometryChangedTraits;
		kMaterialChanged: SectionGeometryChangedTraits;
		kTransparencyChanged: SectionGeometryChangedTraits;
		kFillChanged: SectionGeometryChangedTraits;
	};

	/**
	 * Represents clip boundary types.
	 **/
	type OdTvClipBoundaryType = { value: number };
	const OdTvClipBoundaryType: {
		/**
		 * Default clip boundary (not pass additional data, clip outside contour)
		 **/
		kNormal: OdTvClipBoundaryType;
		/**
		 * Inverted clip boundary (pass inverted clip array, clip inside contour)
		 **/
		kInverted: OdTvClipBoundaryType;
		/**
		 * Extended clip boundary (pass clipping contours, clip by sorted contours array)
		 **/
		kExtended: OdTvClipBoundaryType;
		/**
		 * Complex clip boundary (extended clip boundary which requires additional preprocessing)
		 **/
		kComplex: OdTvClipBoundaryType;
		/**
		 * Planar clip boundary (clipping by set of 3d planes with ability to output geometry sections)
		 **/
		kPlanar: OdTvClipBoundaryType;
	};

	type VectorString = Array<string>;

	type VectorWString = Array<string>;

	type VectorOdTvPoint2d = Array<VectorOdTvPoint2d>;

	type VectorRequestRecord = Array<RequestRecord>;

	type VectorOdTvHighlightStyleIdJSWrapper = Array<OdTvHighlightStyleId>;

	type Viewports = Array<View>;

	const postRun: Array<() => void>;
	let loadWasmError: (error?: Error) => void;
	let canvas: HTMLCanvasElement | any;
	let print: (text?: string) => void;
	let printErr: (text?: string) => void;
	let TOTAL_MEMORY: number;
	let ctx: any;
	const HEAP8: any;
	const openUrl: any;
	let noImageDecoding: any;
	const _FS: any;
	const HpTrc: { P2N: any; Usd: number };
}

type VisualizeJSLoadingEvent = { loaded: number; total: number };
type VisualizeJSOptions = {
	urlMemFile: string;
	TOTAL_MEMORY?: number;
	onprogress?: (event?: VisualizeJSLoadingEvent) => void;
	postRun?: Array<() => void>;
};
declare function getVisualizeLibInst(options: VisualizeJSOptions): typeof VisualizeJS;
