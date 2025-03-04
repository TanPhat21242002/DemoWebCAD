import React from 'react';

const FloorPlanCard = ({ name, details, imageUrl, onClick }) => {
  return (
    <div className="floor-plan-card">
      <img 
        src={imageUrl} 
        alt={name} 
        className="floor-plan-image" 
        onClick={onClick} 
        style={{ cursor: 'pointer' }} 
      />
      <h2>{name}</h2>
      <p>{details}</p>
    </div>
  );
};

export default FloorPlanCard;
