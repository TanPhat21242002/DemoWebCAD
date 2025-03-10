import React from "react";
import "./modal.css";

export default function Modal({ isOpen, onSelect }) {
	if (!isOpen) return null;

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<h3 className="modal-title">モードの選択</h3>
				<p className="modal-description">作図する建物種類を選択してください</p>
				<div className="modal-options">
					<div className="modal-option" onClick={() => onSelect("house")}>
						<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#444">
							<path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
						</svg>
						<span>戸建て</span>
					</div>
					<div className="modal-option" onClick={() => onSelect("apartment")}>
						<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#444">
							<path d="M120-120v-560h160v-160h400v320h160v400H520v-160h-80v160H120Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z" />
						</svg>
						<span>マンション</span>
					</div>
				</div>
			</div>
		</div>
	);
}
