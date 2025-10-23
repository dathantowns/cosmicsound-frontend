import React, { useState, useEffect, useRef } from "react";
import "./Main.css";
import starsBg from "../../assets/stars-bg.mp4";
import AboutCard from "../AboutCard/AboutCard.jsx";
import SongCard from "../SongCard/SongCard.jsx";

const Main = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const aboutSectionRef = useRef(null);
  const previewSectionRef = useRef(null);
  const lastScrollY = useRef(0);
  const currentProgress = useRef(0);
  const previewProgress = useRef(0);

  // Load Calendly script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;

      // Handle About Section Animation
      if (aboutSectionRef.current) {
        const rect = aboutSectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate when center of grid reaches 70% from top of viewport
        const gridCenter = rect.top + rect.height / 2;
        const targetPosition = windowHeight * 0.7; // 70% from top

        // Calculate progress based on how far the grid center is from target
        // When grid center is above target (negative), progress increases
        const distanceFromTarget = gridCenter - targetPosition;
        const animationRange = 200; // Start animation 200px before target

        let calculatedProgress;
        if (distanceFromTarget > animationRange) {
          // Grid center is way below target - no animation yet
          calculatedProgress = 0;
        } else if (distanceFromTarget <= 0) {
          // Grid center has reached or passed target - full animation
          calculatedProgress = 1;
        } else {
          // Grid center is approaching target - partial animation
          calculatedProgress = 1 - distanceFromTarget / animationRange;
        }

        // When scrolling down, only allow progress to increase or stay same
        // When scrolling up, allow natural progress decrease
        if (scrollingDown) {
          currentProgress.current = Math.max(
            currentProgress.current,
            calculatedProgress
          );
        } else {
          currentProgress.current = calculatedProgress;
        }

        const finalProgress = currentProgress.current;

        // Apply transforms to about cards based on scroll progress and grid position
        const cards = aboutSectionRef.current.querySelectorAll(".about-card");
        cards.forEach((card, index) => {
          // Grid positions (3x2):
          // [0] [1] [2]
          // [3] [4] [5]

          let startX = 0;
          let startY = 0;

          switch (index) {
            case 0: // Top-left corner
              startX = -300;
              startY = -200;
              break;
            case 1: // Top-middle
              startX = 0;
              startY = -300;
              break;
            case 2: // Top-right corner
              startX = 300;
              startY = -200;
              break;
            case 3: // Bottom-left corner
              startX = -300;
              startY = 200;
              break;
            case 4: // Bottom-middle
              startX = 0;
              startY = 300;
              break;
            case 5: // Bottom-right corner
              startX = 300;
              startY = 200;
              break;
          }

          const currentOffsetX = startX * (1 - finalProgress);
          const currentOffsetY = startY * (1 - finalProgress);

          card.style.transform = `translate(${currentOffsetX}px, ${currentOffsetY}px)`;
          card.style.opacity = finalProgress.toString();
        });
      }

      // Handle Preview Section Animation
      if (previewSectionRef.current) {
        const rect = previewSectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate when center of grid reaches 70% from top of viewport
        const gridCenter = rect.top + rect.height / 2;
        const targetPosition = windowHeight * 0.7; // 70% from top

        // Calculate progress based on how far the grid center is from target
        const distanceFromTarget = gridCenter - targetPosition;
        const animationRange = 200; // Start animation 200px before target

        let calculatedPreviewProgress;
        if (distanceFromTarget > animationRange) {
          // Grid center is way below target - no animation yet
          calculatedPreviewProgress = 0;
        } else if (distanceFromTarget <= 0) {
          // Grid center has reached or passed target - full animation
          calculatedPreviewProgress = 1;
        } else {
          // Grid center is approaching target - partial animation
          calculatedPreviewProgress = 1 - distanceFromTarget / animationRange;
        }

        // When scrolling down, only allow progress to increase or stay same
        // When scrolling up, allow natural progress decrease
        if (scrollingDown) {
          previewProgress.current = Math.max(
            previewProgress.current,
            calculatedPreviewProgress
          );
        } else {
          previewProgress.current = calculatedPreviewProgress;
        }

        const finalPreviewProgress = previewProgress.current;

        // Apply transforms to preview cards - top row from left, bottom row from right
        const songCards =
          previewSectionRef.current.querySelectorAll(".song-card");
        songCards.forEach((card, index) => {
          // Assuming 2x3 grid layout for song cards:
          // [0] [1] [2]  <- Top row (from left)
          // [3] [4] [5]  <- Bottom row (from right)

          let startX = 0;

          if (index < 3) {
            // Top row - slide in from left
            startX = -400;
          } else {
            // Bottom row - slide in from right
            startX = 400;
          }

          const currentOffsetX = startX * (1 - finalPreviewProgress);

          card.style.transform = `translateX(${currentOffsetX}px)`;
          card.style.opacity = finalPreviewProgress.toString();
        });
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCardClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const handleBookNowClick = () => {
    const bookingSection = document.getElementById("book-now");
    if (bookingSection) {
      bookingSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <main className="main">
      <video autoPlay loop muted className="main__video">
        <source src={starsBg} type="video/mp4" />
      </video>
      <section className="main__home" id="home">
        <h1 className="main__title">COSMIC SOUND STUDIOS</h1>
        <h2 className="main__subtitle">Infinite sound. One studio.</h2>
        <button className="main__book-btn" onClick={handleBookNowClick}>
          BOOK NOW
        </button>
        <span className="main__scroll-down">▼</span>
      </section>
      <section className="main__section_about" id="about" ref={aboutSectionRef}>
        <AboutCard
          title="Mixing"
          description="Professional mixing services to bring your tracks to life."
          onClick={() => handleCardClick(0)}
          isExpanded={expandedCard === 0}
          onBookNow={handleBookNowClick}
        />
        <AboutCard
          title="Mastering"
          description="Professional mastering services to perfect your sound."
          onClick={() => handleCardClick(1)}
          isExpanded={expandedCard === 1}
          onBookNow={handleBookNowClick}
        />
        <AboutCard
          title="Production"
          description="Construction, arrangement, and sound design to bring your sound to life."
          onClick={() => handleCardClick(2)}
          isExpanded={expandedCard === 2}
          onBookNow={handleBookNowClick}
        />
        <AboutCard
          title="Music Composition"
          description="Composition of musical pieces of various genres and styles."
          onClick={() => handleCardClick(3)}
          isExpanded={expandedCard === 3}
          onBookNow={handleBookNowClick}
        />
        <AboutCard
          title="Film Scoring"
          description="Professional scoring services for films, commercials, and media projects."
          onClick={() => handleCardClick(4)}
          isExpanded={expandedCard === 4}
          onBookNow={handleBookNowClick}
        />
        <AboutCard
          title="Video Editing"
          description="Professional visual composition and video editing services."
          onClick={() => handleCardClick(5)}
          isExpanded={expandedCard === 5}
          onBookNow={handleBookNowClick}
        />
      </section>
      <section
        className="main__section_preview"
        id="preview"
        ref={previewSectionRef}
      >
        <SongCard embedCode='<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/5LykuOPY5cTO2AVXEFsCku?utm_source=generator&theme=0" width="100%" height="325" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>' />
        <SongCard embedCode='<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/4KT9RIb5p4Z1xcKO06BZu6?utm_source=generator&theme=0" width="100%" height="325" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>' />
        <SongCard embedCode='<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/0BpHo22AJlMsH8FGjqhTU7?utm_source=generator&theme=0" width="100%" height="325" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>' />
        <SongCard embedCode='<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/5MAk5k15FknndlyrZRGEq8?utm_source=generator&theme=0" width="100%" height="325" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>' />
        <SongCard embedCode='<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/6uWykPRpBNMMIpN2mczIMB?utm_source=generator&theme=0" width="100%" height="325" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>' />
        <a
          href="https://linktr.ee/PHYNYXMUSIC"
          target="_blank"
          rel="noopener noreferrer"
          className="main__section_preview-linktree"
        >
          MORE MUSIC
        </a>
      </section>
      <section className="main__section_bio" id="bio">
        <h2 className="main__section_bio-title">ABOUT THE ARTIST</h2>
        <p className="main__section_bio-description">
          PHYNYX is a multifaceted music producer, composer, and audio engineer
          known for his innovative sound design and genre-blending compositions.
          With a passion for pushing musical boundaries, PHYNYX has crafted a
          unique sonic identity that resonates with audiences worldwide. His
          expertise spans across mixing, mastering, film scoring, and video
          editing, making him a sought-after collaborator in the music and media
          industries. PHYNYX's dedication to his craft is evident in every
          project he undertakes, delivering high-quality audio experiences that
          captivate and inspire.
        </p>
      </section>
      <section className="main__section_booking" id="book-now">
        <h2 className="main__section_booking-title">BOOK A SESSION</h2>
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/djy21"
          style={{ minWidth: "320px", height: "500px" }}
        ></div>
      </section>
    </main>
  );
};

export default Main;
