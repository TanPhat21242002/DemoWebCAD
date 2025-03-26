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
		if (cmd === "DOWNLOAD") {
			downloadFileDwg();
		} else if (cmd === "STAIR_TYPE") {
			CmdFactory.getIns().createCmd("STAIR", roomType, entityId, geometryDataId);
		} else {
			CmdFactory.getIns().createCmd(cmd, roomType, entityId, geometryDataId);
		}
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

	function downloadFileDwg() {
		setShowLoading(true);
		ViewerIns.getIns().removeGridView();
		ViewerIns.getIns().visViewer.saveVsfx(async data => {
			ViewerIns.getIns().createGridView();
			let blob = new Blob([data], { type: "application/octet-stream" });
			const file = new File([blob], "file.vsfx");

			let form = new FormData();
			form.append("file", file);
			let request = new XMLHttpRequest();
			request.responseType = "blob";
			request.open("POST", "https://file-oda-converter.tgl-cloud.com/FileConverterDownload/", true);
			request.onreadystatechange = () => {
				setShowLoading(false);
				if (request.readyState === 4) {
					let blob = new Blob([request.response], { type: "application/octet-stream" });
					let url = window.URL.createObjectURL(blob);

					let a = document.createElement("a");
					document.body.appendChild(a);
					a.style = "display: none";
					a.href = url;
					a.download = "vinacad-web.dwg";
					a.click();
					window.URL.revokeObjectURL(url);
				}
			};
			request.send(form);
		});
	}

	return (
		<div className={`h-screen ${showModal ? "disable-ui" : ""}`}>
			<div className="w-full h-full overflow-hidden no-scrollbar relative">
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
