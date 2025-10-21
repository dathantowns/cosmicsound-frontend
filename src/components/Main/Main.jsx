import React from "react";
import "./Main.css";
import starsBg from "../../assets/stars-bg.mp4";
import AboutCard from "../AboutCard/AboutCard.jsx";

const Main = () => {
  return (
    <main className="main">
      <video autoPlay loop muted className="main__video">
        <source src={starsBg} type="video/mp4" />
      </video>
      <h1 className="main__title">COSMIC SOUND STUDIOS</h1>
      <h2 className="main__subtitle">Infinite sound. One studio.</h2>
      <button className="main__book-btn">BOOK NOW</button>
      <span className="main__scroll-down">▼</span>
      <section className="main__section" id="about">
        <AboutCard
          title="State-of-the-Art Equipment"
          description="Experience top-tier recording gear and software for unparalleled sound quality."
        />
      </section>
    </main>
  );
};

export default Main;
