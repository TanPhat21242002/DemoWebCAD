export class PLineView {
	constructor(viewer, visLib, visViewer, canvas) {
		this.viewer = viewer;
		this.visLib = visLib;
		this.visViewer = visViewer;
		this.canvas = canvas;
	}

	createGridView() {
		const model = this.visViewer.createModel("Model");
		const entity = model.appendEntity("Entity");
		const entityPtr = entity.openObject();
		entityPtr.setColor(255, 0, 0);

		const lineNum = 50;
		const lineUnit = 10;
		for (let i = 0; i <= lineNum; i++) {
			//VERTICAL
			const vLineData = [i * lineUnit, 0, 0, i * lineUnit, lineNum * lineUnit, 0];
			entityPtr.appendPolyline(vLineData);

			//HORIZONTAL
			const hLineData = [0, i * lineUnit, 0, lineNum * lineUnit, i * lineUnit, 0];
			entityPtr.appendPolyline(hLineData);
		}

		entityPtr.delete();
	}

	// zoomToCenter() {
	//     // this.visViewer.zoomExtents([0, 0, 0], [100, 100, 0]);
	//     // this.visViewer.zoomExtents();
	//     // this.visViewer.regenAll();
	//     this.visViewer.zoomAt(0.1, this.canvas.clientWidth / 2, this.canvas.clientHeight / 2);
	//     this.visViewer.update();
	// }
}
