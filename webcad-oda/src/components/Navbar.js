import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="logo-text">myhome-cloud</span>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/">Home List</Link></li>
        <li><span className="separator">/</span></li>
        <li><Link to="/easy-building">Easy Home Building</Link></li>
        <li><span className="separator">/</span></li>
        <li><Link to="/everyones-home">Everyone's Home</Link></li>
        <li><span className="separator">/</span></li>
        <li><Link to="/everyones-rendering">Everyone's Rendering</Link></li>
      </ul>
      <hr />
    </nav>
  );
};

export default Navbar;