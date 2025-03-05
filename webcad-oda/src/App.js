import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomeList from './components/HomeList';
import Footer from './components/Footer';
import DetailPlan from './components/DetailPlan';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
        <Route path="/" element={<HomeList />} />
        <Route path="/detail/:planName" element={<DetailPlan />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;