import React, { useState } from "react";
import "./Main.css";
import starsBg from "../../assets/stars-bg.mp4";
import AboutCard from "../AboutCard/AboutCard.jsx";
import SongCard from "../SongCard/SongCard.jsx";

const Main = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <main className="main">
      <video autoPlay loop muted className="main__video">
        <source src={starsBg} type="video/mp4" />
      </video>
      <h1 className="main__title">COSMIC SOUND STUDIOS</h1>
      <h2 className="main__subtitle">Infinite sound. One studio.</h2>
      <button className="main__book-btn">BOOK NOW</button>
      <span className="main__scroll-down">▼</span>
      <section className="main__section_about" id="about">
        <AboutCard
          title="Mixing"
          description="Professional mixing services to bring your tracks to life."
          onClick={() => handleCardClick(0)}
          isExpanded={expandedCard === 0}
        />
        <AboutCard
          title="Mastering"
          description="Professional mastering services to perfect your sound."
          onClick={() => handleCardClick(1)}
          isExpanded={expandedCard === 1}
        />
        <AboutCard
          title="Production"
          description="Construction, arrangement, and sound design to bring your sound to life."
          onClick={() => handleCardClick(2)}
          isExpanded={expandedCard === 2}
        />
        <AboutCard
          title="Music Composition"
          description="Composition of musical pieces of various genres and styles."
          onClick={() => handleCardClick(3)}
          isExpanded={expandedCard === 3}
        />
        <AboutCard
          title="Film Scoring"
          description="Professional scoring services for films, commercials, and media projects."
          onClick={() => handleCardClick(4)}
          isExpanded={expandedCard === 4}
        />
        <AboutCard
          title="Video Editing"
          description="Professional visual composition and video editing services."
          onClick={() => handleCardClick(5)}
          isExpanded={expandedCard === 5}
        />
      </section>
      <section className="main__section_preview" id="preview">
        <SongCard embedCode='<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/5LykuOPY5cTO2AVXEFsCku?utm_source=generator&theme=0" width="100%" height="325" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>' />
        <SongCard embedCode='<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/4KT9RIb5p4Z1xcKO06BZu6?utm_source=generator&theme=0" width="100%" height="325" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>' />
        <SongCard embedCode='<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/0BpHo22AJlMsH8FGjqhTU7?utm_source=generator&theme=0" width="100%" height="325" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>' />
        <SongCard embedCode='<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/5MAk5k15FknndlyrZRGEq8?utm_source=generator&theme=0" width="100%" height="325" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>' />
        <SongCard embedCode='<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/6uWykPRpBNMMIpN2mczIMB?utm_source=generator&theme=0" width="100%" height="325" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>' />
        <div className="main__section_preview-linktree">Link here</div>
      </section>
    </main>
  );
};

export default Main;
