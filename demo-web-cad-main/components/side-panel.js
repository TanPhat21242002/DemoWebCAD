"use client";

import { useState, useEffect } from "react";
import "./side-panel.css";
import { CMD_NAME } from "../drawing/config";
import { CmdFactory } from "../drawing/cmd/CmdFactory";

export default function SidePanel({ onClickActionCmd, isShow }) {
	const [showRoomPanel, setShowRoomPanel] = useState(false);
	const [activeButton, setActiveButton] = useState("drag");
	const [pressedRoomOption, setPressedRoomOption] = useState(null);
	const [isRectangleCmdActive, setIsRectangleCmdActive] = useState(false);

	const handleRoomClick = () => {
		setShowRoomPanel(!showRoomPanel);
	};

	const handleButtonClick = buttonType => {
		setActiveButton(buttonType);
	};

	const handleRoomOptionClick = optionName => {
		if (CmdFactory.getIns().isSelectCmdActive) {
			const currentCmd = CmdFactory.getIns().currentCmd;
			if (currentCmd) {
				currentCmd.cancelCmd(true);
				for (let index = 0; index < currentCmd.selectionCmd.length; index++) {
					const cmd = currentCmd.selectionCmd[index];
					cmd.cancelCmd(true);
				}
				if (currentCmd.onCmdData != null) {
					currentCmd.onCmdData(null);
				}
			}
		}

		onClickActionCmd(CMD_NAME.RECTANGLE);
		setPressedRoomOption(optionName);
		setIsRectangleCmdActive(true);
	};

	useEffect(() => {
		if (isRectangleCmdActive) {
			const handleCmdEnd = () => {
				setPressedRoomOption(null);
				setIsRectangleCmdActive(false);
			};
			CmdFactory.getIns().onCmdEnd = handleCmdEnd;
			return () => {
				CmdFactory.getIns().onCmdEnd = null;
			};
		}
	}, [isRectangleCmdActive]);

	const roomOptions = [
		{ name: "Bedroom", disabled: false },
		{ name: "Washitu", disabled: false },
		{ name: "Entrance", disabled: false },
		{ name: "Porch", disabled: false },
		{ name: "Garage", disabled: false },
		{ name: "Living", disabled: false },
		{ name: "Dining", disabled: false },
		{ name: "Kitchen", disabled: false },
		{ name: "LD", disabled: false },
		{ name: "LDK", disabled: false },
		{ name: "Bath", disabled: false },
		{ name: "Toilet", disabled: false },
		{ name: "Restroom", disabled: false },
		{ name: "Hallway", disabled: false },
		{ name: "Balcony", disabled: true },
		{ name: "Tokonoma", disabled: false },
		{ name: "Hiroen", disabled: false },
		{ name: "Stairwell", disabled: true },
		{ name: "Storage", disabled: false },
		{ name: "Doma", disabled: false },
	];

	return (
		<div className="side-panel" style={{ display: isShow ? "" : "none" }}>
			<div className="side-item" onClick={() => onClickActionCmd("DRAFT")}>
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
					<path d="M560-80v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-300L683-80H560Zm300-263-37-37 37 37ZM620-140h38l121-122-18-19-19-18-122 121v38ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v120h-80v-80H520v-200H240v640h240v80H240Zm280-400Zm241 199-19-18 37 37-18-19Z" />
				</svg>
				<span>Draft</span>
			</div>
			<div className="side-item" onClick={() => onClickActionCmd("SITE")}>
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
					<path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
				</svg>
				<span>Site</span>
			</div>
			<div className={`side-item ${showRoomPanel ? "active" : ""}`} onClick={handleRoomClick}>
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
					<path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
				</svg>
				<span>Room</span>
			</div>
			<div className="side-item" onClick={() => onClickActionCmd("STAIR")}>
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
					<path d="M80-200v-80h240v-240h240v-240h320v80H640v240H400v240H80Z" />
				</svg>
				<span>Stair</span>
			</div>
			<div className="side-item locked">
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
					<path d="M160-120v-170l527-526q12-12 27-18t30-6q16 0 30.5 6t25.5 18l56 56q12 11 18 25.5t6 30.5q0 15-6 30t-18 27L330-120H160Zm80-80h56l393-392-28-29-29-28-392 393v56Zm560-503-57-57 57 57Zm-139 82-29-28 57 57-28-29ZM560-120q74 0 137-37t63-103q0-36-19-62t-51-45l-59 59q23 10 36 22t13 26q0 23-36.5 41.5T560-200q-17 0-28.5 11.5T520-160q0 17 11.5 28.5T560-120ZM183-426l60-60q-20-8-31.5-16.5T200-520q0-12 18-24t76-37q88-38 117-69t29-70q0-55-44-87.5T280-840q-45 0-80.5 16T145-785q-11 13-9 29t15 26q13 11 29 9t27-13q14-14 31-20t42-6q41 0 60.5 12t19.5 28q0 14-17.5 25.5T262-654q-80 35-111 63.5T120-520q0 32 17 54.5t46 39.5Z" />
				</svg>
				<span>Draw</span>
			</div>
			<div className="side-item locked">
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
					<path d="M320-240h60v-80h80v-60h-80v-80h-60v80h-80v60h80v80Zm200-30h200v-60H520v60Zm0-100h200v-60H520v60Zm44-152 56-56 56 56 42-42-56-58 56-56-42-42-56 56-56-56-42 42 56 56-56 58 42 42Zm-314-70h200v-60H250v60Zm-50 472q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
				</svg>
				<span>Calculation</span>
			</div>

			{showRoomPanel && (
				<div className="sub-panel">
					<h3>Room</h3>
					<div className="room-actions">
						<button className={`action-btn ${activeButton === "drag" ? "pressed" : ""}`} onClick={() => handleButtonClick("drag")}>
							<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
								<path d="M120-280v-400h720v160h-80v-80H200v240h360v80H120Zm80-80v-240 240Zm664 200L720-303v123h-80v-260h260v80H776l144 144-56 56Z" />
							</svg>
							Drag Input
						</button>
						<button className={`action-btn ${activeButton === "dot" ? "pressed" : ""}`} onClick={() => handleButtonClick("dot")}>
							<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
								<path d="M480-480Zm0 280q-116 0-198-82t-82-198q0-116 82-198t198-82q116 0 198 82t82 198q0 116-82 198t-198 82Zm0-80q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Z" />
							</svg>
							Dot Input
						</button>
					</div>
					<div className="room-options">
						{roomOptions.map(option => (
							<div
								key={option.name}
								className={`room-option ${option.disabled ? "disabled" : ""} ${pressedRoomOption === option.name ? "pressed" : ""}`}
								onClick={() => handleRoomOptionClick(option.name)}
							>
								{option.name}
							</div>
						))}
					</div>
					<div className="continue-input">
						<input type="checkbox" id="continue" />
						<label htmlFor="continue">Continue Input</label>
					</div>
					<h3>Structure</h3>
					<div className="structure-options">
						<button className="structure-option">Pillar</button>
						<button className="structure-option locked">Beam</button>
						<button className="structure-option">Wall</button>
					</div>
				</div>
			)}
		</div>
	);
}
