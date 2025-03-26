"use client";
import { useState, useEffect } from "react";
import "./stair-panel.css";
import { CmdFactory } from "../drawing/cmd/CmdFactory";

const STAIR_TYPES = {
	LShapedUpRight: "L-Shaped Up-Right",
	LShapedDownRight: "L-Shaped Down-Right",
	LShapedDownLeft: "L-Shaped Down-Left",
	StraightUp: "Straight Up",
	StraightDown: "Straight Down",
	UShapedRight: "U-Shaped Right",
	UShapedLeft: "U-Shaped Left",
	Spiral: "Spiral",
};

export default function StairPanel({ onClickActionCmd, isShow, onClose }) {
	const [pressedStairOption, setPressedStairOption] = useState(null);
	const [isStairCmdActive, setIsStairCmdActive] = useState(false);

	const handleStairOptionClick = optionName => {
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

		if (Object.values(STAIR_TYPES).includes(optionName)) {
			onClickActionCmd("STAIR_TYPE", optionName);
			setIsStairCmdActive(true);
		}
		setPressedStairOption(optionName);
	};

	useEffect(() => {
		if (isStairCmdActive) {
			const handleCmdEnd = () => {
				setPressedStairOption(null);
				setIsStairCmdActive(false);
			};
			CmdFactory.getIns().onCmdEnd = handleCmdEnd;
			return () => {
				CmdFactory.getIns().onCmdEnd = null;
			};
		}
	}, [isStairCmdActive]);

	const stairOptions = [
		{ name: STAIR_TYPES.LShapedUpRight, disabled: false },
		{ name: STAIR_TYPES.LShapedDownRight, disabled: false },
		{ name: STAIR_TYPES.LShapedDownLeft, disabled: false },
		{ name: STAIR_TYPES.StraightUp, disabled: false },
		{ name: STAIR_TYPES.StraightDown, disabled: false },
		{ name: STAIR_TYPES.UShapedRight, disabled: false },
		{ name: STAIR_TYPES.UShapedLeft, disabled: false },
		{ name: STAIR_TYPES.Spiral, disabled: false },
	];

	return (
		<div className="stair-panel" style={{ display: isShow ? "" : "none" }}>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<h3>Stair</h3>
				<button
					onClick={onClose}
					style={{
						background: "none",
						border: "none",
						color: "white",
						fontSize: "16px",
						cursor: "pointer",
					}}
				>
					✕
				</button>
			</div>
			<div className="stair-options">
				{stairOptions.map(option => (
					<div
						key={option.name}
						className={`stair-option ${option.disabled ? "disabled" : ""} ${pressedStairOption === option.name ? "pressed" : ""}`}
						onClick={() => handleStairOptionClick(option.name)}
					>
						{option.name}
					</div>
				))}
			</div>
		</div>
	);
}
