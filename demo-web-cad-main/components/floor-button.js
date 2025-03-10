import React from "react";
import "./floor-button.css";

const FloorButtons = ({ currentFloor, onFloorChange }) => {
	return (
		<div className="floor-buttons">
			{["1F", "2F", "3F"].map(floor => (
				<button key={floor} className={`floor-button ${currentFloor === floor ? "active" : ""}`} onClick={() => onFloorChange(floor)}>
					{floor}
				</button>
			))}
		</div>
	);
};

export default FloorButtons;
