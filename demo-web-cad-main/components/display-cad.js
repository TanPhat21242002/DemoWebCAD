import { useEffect, useState } from "react";
import { VIEWER_EVENT, ViewerIns } from "../drawing/viewer";
import "./display-cad.css";

export default function DisplayCad({ viewerRender }) {
	const [point, setPoint] = useState(null);

	useEffect(() => {
		if (viewerRender) {
			ViewerIns.getIns().subcribeEvent(VIEWER_EVENT.MOUSE_MOVE, onMouseMove);
		}
	}, [viewerRender]);

	const onMouseMove = (ev, point, pointWorld) => {
		setPoint(pointWorld);
	};

	function roundWith6Decimal(number) {
		return Math.round(number * 1000000) / 1000000;
	}

	return (
		<div className="absolute left-0 bottom-0 p-4 text-xs text-white select-none pointer-events-none w-full">
			{/* Upload (.dwg): view .dwg file on web.<br></br>
        Download (.dwg): get .dwg file from current drawing on web.<br></br>
        Press ESC: cancel command, preview or revert editting.<br></br>
        Press ENTER: finish current command.<br></br> */}
			<span className="text-sm !!important mb-16 !!important">
				{point == null ? "" : "[" + roundWith6Decimal(point[0]) + ", " + roundWith6Decimal(point[1]) + ", " + roundWith6Decimal(point[2]) + "]"}
			</span>
			<br></br>
			<br></br>
			<span className="opacity-20 cad-version">VinaCAD Web Demo version 1.2.1. (support file .dwg only)</span>
			<br></br>
		</div>
	);
}
