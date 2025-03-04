import React, { useState } from 'react';
import FloorPlanCard from './FloorPlanCard';
const HomeList = () => {
  const resultCount= useState(1);

  const handleCardClick = (name) => {
    alert(`Bạn đã chọn: ${name}`);
  };

  return (
    <main className="home-list">
      <div className="home-list-header">
        <h1>Home List</h1>
        <button className="create-plan-btn">+ Create a new plan</button>
      </div>
      <div className="search-container">
        <input type="text" placeholder="Search by plan name" className="search-bar" />
        <span className="result-count">Results: {resultCount} subject</span>
      </div>
      <div className="floor-plans">
        <FloorPlanCard
          name="Plan A"
          details="2 floors / 3 rooms / South, Width: 9.55 m / Depth: 11.83 m, Total floor area: 118 m²"
          imageUrl="/img/pngwing.com.png"
          onClick={() => handleCardClick("Plan A")}
        />
      </div>
    </main>
  );
};

export default HomeList;
