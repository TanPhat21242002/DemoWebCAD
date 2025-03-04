import { ViewerIns } from "./viewer";

export class CADSetting {
	private static KET_SETTING = "cad-setting";
	private static instance = null;
	public settingData = {};

	private constructor() {}

	public static getIns(): CADSetting {
		if (this.instance == null) {
			this.instance = new CADSetting();
			const cadSetting = localStorage.getItem(CADSetting.KET_SETTING);
			if (cadSetting == null) {
				this.instance.settingData["showGrid"] = true;
				this.instance.settingData["gridSnap"] = true;
				this.instance.settingData["objectSnap"] = true;
			} else {
				this.instance.settingData = JSON.parse(cadSetting);
			}
		}
		return this.instance;
	}

	public isShowGrid() {
		return this.settingData["showGrid"];
	}

	public isGridSnap() {
		return this.settingData["gridSnap"];
	}

	public isObjectSnap() {
		return this.settingData["objectSnap"];
	}

	public setShowGrid(bValue) {
		if (bValue) {
			this.settingData["showGrid"] = bValue;
			ViewerIns.getIns().createGridView();
		} else {
			ViewerIns.getIns().removeGridView();
			this.settingData["showGrid"] = bValue;
		}
		localStorage.setItem(CADSetting.KET_SETTING, JSON.stringify(this.settingData));
	}

	public setGridSnap(bValue) {
		this.settingData["gridSnap"] = bValue;
		localStorage.setItem(CADSetting.KET_SETTING, JSON.stringify(this.settingData));
	}

	public setObjectSnap(bValue) {
		this.settingData["objectSnap"] = bValue;
		localStorage.setItem(CADSetting.KET_SETTING, JSON.stringify(this.settingData));
	}
}
