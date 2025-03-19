/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useRef, useState } from "react";
import LoadingView from "../components/loading-view";
import { ViewerIns } from "../drawing/viewer";
import { CmdFactory } from "../drawing/cmd/CmdFactory";
import CadSetting from "../components/cad-setting";
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
	const [currentFloor, setCurrentFloor] = useState("1F");

	const onClickActionCmd = (cmd, roomType, entityId, geometryDataId) => {
		CmdFactory.getIns().createCmd(cmd, roomType, entityId, geometryDataId);
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
			setViewerRender(true);
			initAllEvent();
		}
		initClientViewer();
	}, []);

	function initAllEvent() {
		CmdFactory.getIns().onCmdBegin = onCmdBegin;
		CmdFactory.getIns().onCmdCancel = onCmdCancel;
		CmdFactory.getIns().onCmdEnd = onCmdEnd;
	}

	const onCmdBegin = () => {
		setShowAction(false);
	};

	const onCmdCancel = () => {};

	const onCmdEnd = () => {
		setShowAction(true);
	};

	const handleFloorChange = floor => {
		setCurrentFloor(floor);
	};

	return (
		<div className={`h-screen ${showModal ? "disable-ui" : ""}`}>
			<div className="w-full h-full overflow-auto relative">
				<canvas ref={canvasRef} id="view" className="w-full h-full min-w-[2000px] min-h-[2000px]" />
			</div>
			<LoadingView isShow={showLoading} />
			<CadSetting disable={disableUI} />
			<SidePanel onClickActionCmd={onClickActionCmd} isShow={true} disable={disableUI} />
			<Modal isOpen={showModal} onSelect={handleSelect} />
			<FloorButtons currentFloor={currentFloor} onFloorChange={handleFloorChange} />
		</div>
	);
}
