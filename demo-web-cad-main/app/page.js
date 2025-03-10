/* eslint-disable react-hooks/exhaustive-deps */
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
import Modal from "../components/modal";
import FloorButtons from "../components/floor-button";

export default function Home() {
	const canvasRef = useRef();
	const [showLoading, setShowLoading] = useState(true);
	const [showModal, setShowModal] = useState(true);
	const [disableUI, setDisableUI] = useState(true);
	const [, setShowAction] = useState(false);
	const [, setViewerRender] = useState(false);
	const [propertiesInfor, setPropertiesInfor] = useState({});
	const [currentFloor, setCurrentFloor] = useState("1F");

	const onClickActionCmd = command => {
		if (disableUI) return;
		alert("Command executed: " + command);
	};

	const handleSelect = selection => {
		console.log("User selected:", selection);
		setShowModal(false);
		setDisableUI(false);
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
		if (disableUI) return;
		ViewerIns.getIns().setPositonView(positionType);
	};

	const handleFloorChange = floor => {
		setCurrentFloor(floor);
	};

	return (
		<div className={`h-screen ${showModal ? "disable-ui" : ""}`}>
			<canvas ref={canvasRef} id="view" className="w-full h-full" />
			<LoadingView isShow={showLoading} />
			<CadSetting disable={disableUI} />
			<PropertiesInfor properties={propertiesInfor} />
			<ViewPosition onClickViewPosition={onClickViewPosition} isShow={!showLoading} disable={disableUI} />
			<SidePanel onClickActionCmd={onClickActionCmd} isShow={true} disable={disableUI} />
			<Modal isOpen={showModal} onSelect={handleSelect} />
			<FloorButtons currentFloor={currentFloor} onFloorChange={handleFloorChange} />
		</div>
	);
}
