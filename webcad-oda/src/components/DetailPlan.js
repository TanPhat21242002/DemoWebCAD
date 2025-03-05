import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BsArrowLeft, BsDownload, BsShare, BsFiles } from "react-icons/bs"; 

const DetailPlan = () => {
  const { planName } = useParams(); 
  const navigate = useNavigate(); 

  const plans = {
    "Plan A": {
      imageUrl: "/img/pngwing.com.png",
    },
    "Plan B": {
      imageUrl: "/img/planB.png",
    },
  };

  const planData = plans[planName] || { imageUrl: "/img/default.png" };

  return (
    <div className="detail-container">
      <button className="back-btn" onClick={() => navigate("/")}>
        <BsArrowLeft /> Return to plan list
      </button>

      <div className="plan-header">
        <h1>{planName}</h1>
        <FaEdit className="edit-icon" />
      </div>

      <div className="action-bar">
        <button className="action-btn">WebCADEdit</button>
        <button className="action-btn">
          <BsDownload /> Download images
        </button>
        <button className="action-btn">
          <BsDownload /> Download PDF
        </button>
        <button className="action-btn">
          <BsFiles /> Plan Copy
        </button>
        <button className="action-btn">
          <BsShare /> Plan sharing
        </button>
        <button className="delete-btn">
          <FaTrash /> Delete a plan
        </button>
      </div>

      <div className="floor-plan">
        <h2>Floor Plan</h2>
        <img src={planData.imageUrl} alt="Floor Plan" className="floor-image" />
      </div>
    </div>
  );
};

export default DetailPlan;
