"use client";
import { useEffect, useRef, useState } from "react";
import ActionCmd from "../components/action-cmd";
import ActionControl from "../components/action-control";
import LoadingView from "../components/loading-view";
import { ViewerIns } from "../drawing/viewer";
import { CMD_NAME } from "../drawing/config";
import { CmdFactory } from "../drawing/cmd/CmdFactory";
import CadSetting from "../components/cad-setting";
import ModelSetting from "../components/model-setting";
import DisplayCad from "../components/display-cad";
import PropertiesInfor from "../components/properties-infor";
import { DrawingUtil } from "../drawing/util/DrawingUtil";
import ViewPosition from "../components/view-position";

export default function Home() {
	const canvasRef = useRef();
	const [showLoading, setShowLoading] = useState(true);
	const [showAction, setShowAction] = useState(false);
	const [viewerRender, setViewerRender] = useState(false);
	const [propertiesInfor, setPropertiesInfor] = useState({});
	const [modelData, setModelData] = useState(null);

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

	const onClickActionFile = action => {
		switch (action) {
			case "UPLOAD":
				uploadFileDwg();
				break;
			case "DOWNLOAD":
				downloadFileDwg();
				break;
		}
	};

	function uploadFileDwg() {
		var input = document.createElement("input");
		input.type = "file";
		input.accept = ".dwg,.rfa,.ifc";
		input.onchange = e => {
			var file = e.target.files[0];
			if (!file.name.endsWith(".dwg") && !file.name.endsWith(".rfa") && !file.name.endsWith(".ifc")) {
				return;
			}

			let form = new FormData();
			form.append("file", file);
			let request = new XMLHttpRequest();
			request.responseType = "text";

			request.open("POST", "https://file-oda-converter.tgl-cloud.com/FileConverterUpload/", true);

			setShowLoading(true);
			request.onreadystatechange = async () => {
				if (request.readyState === 4) {
					setShowLoading(false);
					try {
						let temp = await request.responseText;
						let dataModel = JSON.parse(temp);
						setModelData(dataModel["metaInfor"]);
					} catch (error) {
						console.log(error);
					}
				}
			};
			request.send(form);
		};
		input.click();
	}

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

	const onClickActionCmd = (cmd, entityId, geometryDataId) => {
		CmdFactory.getIns().createCmd(cmd, entityId, geometryDataId);
	};

	const onClickActionView = action => {
		// ViewerIns.getIns().viewer.setActiveDragger(action);
	};

	const onChangeModel = finishChanged => {
		if (finishChanged) {
			setShowLoading(false);
		} else {
			setShowLoading(true);
		}
	};

	const onClickViewPosition = positionType => {
		ViewerIns.getIns().setPositonView(positionType);
	};

	return (
		<div className="h-screen">
			<canvas ref={canvasRef} id="view" className="w-full h-full" />
			{/* <ActionControl onClickActionView={onClickActionView} /> */}
			<ActionCmd onClickActionCmd={onClickActionCmd} onClickActionFile={onClickActionFile} isShow={showAction} />
			<LoadingView isShow={showLoading} />
			<DisplayCad viewerRender={viewerRender} />
			<CadSetting />
			<ModelSetting modelData={modelData} onChangeModel={onChangeModel} />
			<PropertiesInfor properties={propertiesInfor} />
			<ViewPosition onClickViewPosition={onClickViewPosition} isShow={!showLoading} />
		</div>
	);
}
