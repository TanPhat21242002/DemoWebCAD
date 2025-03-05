import "./action-control.css";

export default function ActionControl({ onClickActionView }) {
	return (
		<div className="action-panel">
			<div id="pan_btn" className="action-item" onClick={() => onClickActionView("Pan")}>
				<span className="material-icons">open_with</span>
				<div className="action-item-text">Pan</div>
			</div>
			<div id="orbit_btn" className="action-item" onClick={() => onClickActionView("Orbit")}>
				<span className="material-icons">cached</span>
				<div className="action-item-text">Orbit</div>
			</div>
			<div id="zoom_btn" className="action-item" onClick={() => onClickActionView("Zoom")}>
				<span className="material-icons">zoom_in</span>
				<div className="action-item-text">Zoom</div>
			</div>
		</div>
	);
}
