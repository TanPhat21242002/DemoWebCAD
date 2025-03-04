import "./view-position.css";
import { useEffect, useRef, useState } from "react";

export default function ViewPosition({ onClickViewPosition, isShow }) {
	const canvasRef = useRef();
	const [indexPosition, setIndexPosition] = useState(1);

	function drawTextAlongArc(context, str, centerX, centerY, radius, angle) {
		let len = str.length;
		let s = null;
		context.save();
		context.translate(centerX, centerY);
		context.rotate((-1 * angle) / 2);
		context.rotate((-1 * (angle / len)) / 2);
		for (var n = 0; n < len; n++) {
			context.rotate(angle / len);
			context.save();
			context.translate(0, -1 * radius);
			s = str[n];
			context.fillText(s, 0, 0);
			context.restore();
		}
		context.restore();
	}

	function drawLinePart(context, radius01, radius02, centerX, centerY) {
		let angle = Math.PI / 8;

		for (let i = 1; i <= 8; i++) {
			angle = angle - Math.PI / 4;

			let startX = centerX + radius01 * Math.cos(angle);
			let startY = centerY + radius01 * Math.sin(angle);
			let endX = centerX + radius02 * Math.cos(angle);
			let endY = centerY + radius02 * Math.sin(angle);

			context.beginPath();
			context.moveTo(startX, startY);
			context.lineTo(endX, endY);
			context.stroke();
		}
	}

	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.width = 200;
		canvas.height = 200;

		const context = canvas.getContext("2d");
		context.lineWidth = 0.5;
		context.strokeStyle = "gray";
		context.fillStyle = "white";

		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		let radius01 = 60;

		context.beginPath();
		context.arc(centerX, centerY, radius01, 0, 2 * Math.PI, false);
		context.fill();
		context.stroke();

		const radius02 = 30;
		context.beginPath();
		context.arc(centerX, centerY, radius02, 0, 2 * Math.PI, false);
		context.fill();
		context.stroke();

		context.beginPath();
		context.moveTo(centerX - radius02, centerY);
		context.lineTo(centerX + radius02, centerY);
		context.stroke();

		drawLinePart(context, radius01, radius02, centerX, centerY);
	}, []);

	return (
		<div className="view-position" style={{ display: isShow ? "" : "none" }}>
			<canvas ref={canvasRef} id="canvas-position" className="w-full h-full" />
			<label
				className="label-front"
				style={{ color: indexPosition === 0 ? "red" : "black" }}
				onClick={() => {
					setIndexPosition(0);
					onClickViewPosition(0);
				}}
			>
				FRONT
			</label>
			<label
				className="label-top"
				style={{ color: indexPosition === 1 ? "red" : "black" }}
				onClick={() => {
					setIndexPosition(1);
					onClickViewPosition(1);
				}}
			>
				TOP
			</label>
			<label
				className="label-bottom"
				style={{ color: indexPosition === 2 ? "red" : "black" }}
				onClick={() => {
					setIndexPosition(2);
					onClickViewPosition(2);
				}}
			>
				BOTTOM
			</label>
			<label
				className="label-back"
				style={{ color: indexPosition === 3 ? "red" : "black" }}
				onClick={() => {
					setIndexPosition(3);
					onClickViewPosition(3);
				}}
			>
				BACK
			</label>
			<label
				className="label-nw"
				style={{ color: indexPosition === 4 ? "red" : "black" }}
				onClick={() => {
					setIndexPosition(4);
					onClickViewPosition(4);
				}}
			>
				NW
			</label>
			<label
				className="label-ne"
				style={{ color: indexPosition === 5 ? "red" : "black" }}
				onClick={() => {
					setIndexPosition(5);
					onClickViewPosition(5);
				}}
			>
				NE
			</label>
			<label
				className="label-left"
				style={{ color: indexPosition === 6 ? "red" : "black" }}
				onClick={() => {
					setIndexPosition(6);
					onClickViewPosition(6);
				}}
			>
				LEFT
			</label>
			<label
				className="label-right"
				style={{ color: indexPosition === 7 ? "red" : "black" }}
				onClick={() => {
					setIndexPosition(7);
					onClickViewPosition(7);
				}}
			>
				RIGHT
			</label>
			<label
				className="label-sw"
				style={{ color: indexPosition === 8 ? "red" : "black" }}
				onClick={() => {
					setIndexPosition(8);
					onClickViewPosition(8);
				}}
			>
				SW
			</label>
			<label
				className="label-se"
				style={{ color: indexPosition === 9 ? "red" : "black" }}
				onClick={() => {
					setIndexPosition(9);
					onClickViewPosition(9);
				}}
			>
				SE
			</label>
		</div>
	);
}
