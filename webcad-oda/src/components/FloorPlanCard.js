import React from "react";
import { FaEdit } from "react-icons/fa";

const FloorPlanCard = ({ name, details, imageUrl, onClick, onEdit }) => {
  return (
    <div className="floor-plan-card">
      <h3>Plan</h3>
      <div className="image-container">
        <img src={imageUrl} alt={name} className="floor-image" onClick={onClick} />
        <button className="edit-btn" onClick={onEdit}>
          <FaEdit />
        </button>
      </div>
      <p className="plan-details">{details}</p>
    </div>
  );
};

export default FloorPlanCard;
