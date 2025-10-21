import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <span className="header_logo">CSS</span>
      <nav className="header_nav">
        <a href="#about" className="nav_link">
          About
        </a>
        <a href="#preview" className="nav_link">
          Preview
        </a>
        <a href="#book-now" className="nav_link">
          Book Now
        </a>
      </nav>
    </header>
  );
};

export default Header;
