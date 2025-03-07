"use client";
import { useEffect, useRef, useState } from "react";
import LoadingView from "../components/loading-view";
import { ViewerIns } from "../drawing/viewer";
import { CmdFactory } from "../drawing/cmd/CmdFactory";
import CadSetting from "../components/cad-setting";
import PropertiesInfor from "../components/properties-infor";
import { DrawingUtil } from "../drawing/util/DrawingUtil";
import ViewPosition from "../components/view-position";
import SidePanel from "../components/side-panel";

export default function Home() {
	const canvasRef = useRef();
	const [showLoading, setShowLoading] = useState(true);
	const [, setShowAction] = useState(false);
	const [, setViewerRender] = useState(false);
	const [propertiesInfor, setPropertiesInfor] = useState({});

	const onClickActionCmd = command => {
		alert("Command executed: " + command);
	};

	function renderViewer() {
		ViewerIns.getIns().visViewer.update();
		requestAnimationFrame(renderViewer);
	}

	useEffect(() => {
		async function initClientViewer() {
			let canvas = canvasRef.current;
			await ViewerIns.initViewer(canvas);
			setShowLoading(false);
			setShowAction(true);
			renderViewer();
			initAllEvent();
			setViewerRender(true);
		}
		initClientViewer();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function initAllEvent() {
		CmdFactory.getIns().onCmdBegin = onCmdBegin;
		CmdFactory.getIns().onCmdCancel = onCmdCancel;
		CmdFactory.getIns().onCmdEnd = onCmdEnd;
		CmdFactory.getIns().onCmdData = onCmdData;
	}

	const onCmdData = data => {
		const properties = DrawingUtil.getPropertiesOfSelectionSet(data);
		setPropertiesInfor(properties);
	};

	const onCmdBegin = () => {
		setShowAction(false);
	};

	const onCmdCancel = () => {};

	const onCmdEnd = () => {
		setShowAction(true);
	};

	const onClickViewPosition = positionType => {
		ViewerIns.getIns().setPositonView(positionType);
	};

	return (
		<div className="h-screen">
			<canvas ref={canvasRef} id="view" className="w-full h-full" />
			<LoadingView isShow={showLoading} />
			<CadSetting />
			<PropertiesInfor properties={propertiesInfor} />
			<ViewPosition onClickViewPosition={onClickViewPosition} isShow={!showLoading} />
			<SidePanel onClickActionCmd={onClickActionCmd} isShow={true} />
		</div>
	);
}
