import { useEffect, useState } from "react";
import { CADSetting } from "../drawing/setting";
import "./cad-setting.css";

export default function CadSetting() {
	const [isRender, setIsRender] = useState(false);

	useEffect(() => {
		setIsRender(true);
	}, []);

	const onSettingChange = (ev, index) => {
		switch (index) {
			case 0:
				CADSetting.getIns().setShowGrid(ev.target.checked);
				break;
			case 1:
				CADSetting.getIns().setGridSnap(ev.target.checked);
				break;
			case 2:
				CADSetting.getIns().setObjectSnap(ev.target.checked);
				break;
		}
	};

	if (isRender) {
		return (
			<div className="cad-setting m-2">
				<div className="flex cad-setting-item">
					<input
						type="checkbox"
						id="show-grid"
						className="peer hidden"
						onChange={ev => onSettingChange(ev, 0)}
						defaultChecked={CADSetting.getIns().settingData["showGrid"]}
					/>
					<label
						htmlFor="show-grid"
						className="select-none cursor-pointer rounded-lg border-[1px] border-gray-200 text-xs
                        py-2 px-2 text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200 "
					>
						SHOW GRID
					</label>
				</div>
				<div className="flex cad-setting-item">
					<input
						type="checkbox"
						id="grid-snap"
						className="peer hidden"
						onChange={ev => onSettingChange(ev, 1)}
						defaultChecked={CADSetting.getIns().settingData["gridSnap"]}
					/>
					<label
						htmlFor="grid-snap"
						className="select-none cursor-pointer rounded-lg border-[1px] border-gray-200 text-xs
                        py-2 px-2 text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200 "
					>
						GRID SNAP
					</label>
				</div>
				<div className="flex cad-setting-item">
					<input
						type="checkbox"
						id="object-snap"
						className="peer hidden"
						onChange={ev => onSettingChange(ev, 2)}
						defaultChecked={CADSetting.getIns().settingData["objectSnap"]}
					/>
					<label
						htmlFor="object-snap"
						className="select-none cursor-pointer rounded-lg border-[1px] border-gray-200 text-xs
                        py-2 px-2 text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200 "
					>
						OBJECT SNAP
					</label>
				</div>
			</div>
		);
	} else {
		return <></>;
	}
}
