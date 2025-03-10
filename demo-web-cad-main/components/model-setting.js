import { useEffect, useState } from "react";
import "./model-setting.css";
import { ViewerIns } from "../drawing/viewer";
import { CmdFactory } from "../drawing/cmd/CmdFactory";

export default function ModelSetting({ modelData, onChangeModel }) {
	const [isRender, setIsRender] = useState(false);
	const [modelName, setModelName] = useState(null);
	let nameModel = modelName;

	useEffect(() => {
		setIsRender(true);
	}, []);

	useEffect(() => {
		if (modelData && modelData["models"] && modelData["models"].length > 0) {
			const defaultModel = modelData["models"][0].name.toLowerCase();
			setModelName(defaultModel);
			// eslint-disable-next-line react-hooks/exhaustive-deps
			nameModel = null;
			onSettingChange(null, defaultModel);
		}
	}, [modelData]);

	const onSettingChange = (ev, name) => {
		if (CmdFactory.getIns().isEmptyCmd() == false) {
			return;
		}

		onChangeModel(false);
		const currentModel = modelData["models"]?.find(item => item.name.toLowerCase() === nameModel?.toLowerCase());
		ViewerIns.getIns().removeGridView();
		ViewerIns.getIns().visViewer.saveVsfx(async data => {
			let buffer = new Uint8Array(data);
			if (currentModel) {
				currentModel["buffer"] = buffer;
			}
			setModelName(name);

			const model = modelData["models"]?.find(item => item.name.toLowerCase() === name?.toLowerCase());
			if (model["buffer"] == null) {
				const folderId = modelData.folderId;
				const fileName = model.database;

				let request = new XMLHttpRequest();
				request.responseType = "blob";
				request.open("GET", `https://file-oda-converter.tgl-cloud.com/GetFileConverter?folderId=${folderId}&fileName=${fileName}`, true);
				request.onreadystatechange = async () => {
					if (request.readyState === 4) {
						try {
							let temp = new Uint8Array(await request.response.arrayBuffer());
							ViewerIns.getIns().parseFileBuffer(temp);
							ViewerIns.getIns().createGridView();
							model["buffer"] = temp;
							onChangeModel(true);
						} catch (error) {
							console.log(error);
						}
					}
				};
				request.send();
			} else {
				ViewerIns.getIns().parseFileBuffer(model["buffer"]);
				ViewerIns.getIns().createGridView();
				onChangeModel(true);
			}
		});
	};

	if (isRender) {
		return (
			<div className="model-setting m-2">
				{!modelData && (
					<div className="flex model-setting-item" key={"modelIndex"}>
						<input
							onChange={ev => onSettingChange(ev, "model")}
							disabled={modelData == null || modelData["models"].length == 1}
							name="select-model"
							type="radio"
							id={"modelIndex"}
							className="peer hidden w-full"
							checked={modelData == null || modelName?.toLowerCase() == "model"}
						/>
						<label
							htmlFor={"modelIndex"}
							className="select-none cursor-pointer border-[1px] border-gray-200 text-xs
                                                                py-2 px-2 text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 
                                                                peer-checked:border-gray-200 w-full text-center	"
						>
							Model
						</label>
					</div>
				)}
				{modelData &&
					modelData["models"]?.map((item, index) => {
						const modelIndex = "model-" + index;
						return (
							<div className="flex model-setting-item" key={modelIndex}>
								<input
									onChange={ev => onSettingChange(ev, item.name.toLowerCase())}
									name="select-model"
									type="radio"
									id={modelIndex}
									className="peer hidden w-full"
									checked={modelName?.toLowerCase() == item.name.toLowerCase()}
								/>
								<label
									htmlFor={modelIndex}
									className="select-none cursor-pointer border-[1px] border-gray-200 text-xs
                                                                py-2 px-2 text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 
                                                                peer-checked:border-gray-200 w-full text-center	"
								>
									{item.name}
								</label>
							</div>
						);
					})}
			</div>
		);
	} else {
		return <></>;
	}
}
