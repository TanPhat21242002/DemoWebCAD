import { CMD_NAME } from "../drawing/config";
import "./action-cmd.css";

export default function ActionCmd({ onClickActionCmd, onClickActionFile, isShow }) {
	return (
		<div className="action-cmd" style={{ display: isShow ? "" : "none" }}>
			<div className="action-item-cmd" onClick={() => onClickActionFile("UPLOAD")}>
				<span className="material-icons">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
						<path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
					</svg>
				</span>
				<div className="action-item-text">Upload</div>
			</div>
			<hr className="solid" />
			<div className="action-item-cmd" onClick={() => onClickActionCmd(CMD_NAME.PAN)}>
				<span className="material-icons">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
						<path d="M480-80 310-250l57-57 73 73v-166h80v165l72-73 58 58L480-80ZM250-310 80-480l169-169 57 57-72 72h166v80H235l73 72-58 58Zm460 0-57-57 73-73H560v-80h165l-73-72 58-58 170 170-170 170ZM440-560v-166l-73 73-57-57 170-170 170 170-57 57-73-73v166h-80Z" />
					</svg>
				</span>
				<div className="action-item-text">Pan</div>
			</div>
			<hr className="solid" />
			<div className="action-item-cmd" onClick={() => onClickActionCmd(CMD_NAME.ORBIT)}>
				<span className="material-icons">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
						<path d="M240-100q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 22-6.5 42.5T354-159v-27q30 13 62 19.5t64 6.5q134 0 227-93t93-227h80q0 83-31.5 156T763-197q-54 54-127 85.5T480-80q-45 0-88-9.5T309-118q-16 9-33.5 13.5T240-100Zm0-80q25 0 42.5-17.5T300-240q0-25-17.5-42.5T240-300q-25 0-42.5 17.5T180-240q0 25 17.5 42.5T240-180Zm240-160q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 58-41 99t-99 41ZM80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q45 0 88 9.5t83 28.5q16-9 33.5-13.5T720-860q58 0 99 41t41 99q0 58-41 99t-99 41q-58 0-99-41t-41-99q0-22 6.5-42.5T606-801v27q-30-13-62-19.5t-64-6.5q-134 0-227 93t-93 227H80Zm640-180q25 0 42.5-17.5T780-720q0-25-17.5-42.5T720-780q-25 0-42.5 17.5T660-720q0 25 17.5 42.5T720-660ZM240-240Zm480-480Z" />
					</svg>
				</span>
				<div className="action-item-text">Orbit</div>
			</div>
			<hr className="solid" />
			<div className="action-item-cmd" onClick={() => onClickActionCmd(CMD_NAME.CIRCLE)}>
				<span className="material-icons">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
						<path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
					</svg>
				</span>
				<div className="action-item-text">Circle</div>
			</div>
			<hr className="solid" />
			<div className="action-item-cmd" onClick={() => onClickActionCmd(CMD_NAME.RECTANGLE)}>
				<span className="material-icons">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
						<path d="M80-160v-640h800v640H80Zm80-80h640v-480H160v480Zm0 0v-480 480Z" />
					</svg>
				</span>
				<div className="action-item-text">Rectangle</div>
			</div>
			<hr className="solid" />
			<div className="action-item-cmd" onClick={() => onClickActionCmd(CMD_NAME.POLYLINE)}>
				<span className="material-icons text-black">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
						<path d="m140-220-60-60 300-300 160 160 284-320 56 56-340 384-160-160-240 240Z" />
					</svg>
				</span>
				<div className="action-item-text">Polyline</div>
			</div>
			<hr className="solid" />
			<div className="action-item-cmd" onClick={() => onClickActionCmd(CMD_NAME.ARC)}>
				<span className="material-icons">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
						<path d="M720-160q0-116-44-218T556-556q-76-76-178-120t-218-44v-80q132 0 248.5 50.5T612-612q87 87 137.5 203.5T800-160h-80Z" />
					</svg>
				</span>
				<div className="action-item-text">Arc</div>
			</div>
			<hr className="solid" />
			<div className="action-item-cmd" onClick={() => onClickActionCmd(CMD_NAME.ELLIPSE)}>
				<span className="material-icons">
					<svg
						style={{ transform: "scaleY(0.8)" }}
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#000000"
					>
						<path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
					</svg>
				</span>
				<div className="action-item-text">Ellipse</div>
			</div>
			<hr className="solid" />
			<div className="action-item-cmd" onClick={() => onClickActionCmd(CMD_NAME.BOX)}>
				<span className="material-icons">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
						<path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-80 92L160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11Zm200-528 77-44-237-137-78 45 238 136Zm-160 93 78-45-237-137-78 45 237 137Z" />
					</svg>
				</span>
				<div className="action-item-text">Box</div>
			</div>
			{/* <hr className="solid" />
            <div className="action-item-cmd" onClick={() => onClickActionCmd(CMD_NAME.TEXT)}>
                <span className="material-icons" >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                        <path d="m131-252 165-440h79l165 440h-76l-39-112H247l-40 112h-76Zm139-176h131l-64-182h-4l-63 182Zm395 186q-51 0-81-27.5T554-342q0-44 34.5-72.5T677-443q23 0 45 4t38 11v-12q0-29-20.5-47T685-505q-23 0-42 9.5T610-468l-47-35q24-29 54.5-43t68.5-14q69 0 103 32.5t34 97.5v178h-63v-37h-4q-14 23-38 35t-53 12Zm12-54q35 0 59.5-24t24.5-56q-14-8-33.5-12.5T689-393q-32 0-50 14t-18 37q0 20 16 33t40 13Z" />
                    </svg>
                </span>
                <div className="action-item-text">
                    Text
                </div>
            </div> */}
			<hr className="solid" />
			<div className="action-item-cmd" onClick={() => onClickActionFile("DOWNLOAD")}>
				<span className="material-icons">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
						<path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
					</svg>
				</span>
				<div className="action-item-text">Download</div>
			</div>
		</div>
	);
}
