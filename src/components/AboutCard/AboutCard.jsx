import "./AboutCard.css";

export default function AboutCard({
  title,
  description,
  onClick,
  isExpanded,
  onBookNow,
}) {
  const handleBookClick = (e) => {
    e.stopPropagation(); // Prevent card click from triggering
    if (onBookNow) {
      onBookNow();
    }
  };

  return (
    <div
      className={`about-card ${isExpanded ? "about-card--expanded" : ""}`}
      onClick={onClick}
    >
      {isExpanded && <button className="about-card__close-button">X</button>}
      <h3 className="about-card__title">{title}</h3>
      {isExpanded && <p className="about-card__description">{description}</p>}
      {isExpanded && (
        <button className="about-card__btn" onClick={handleBookClick}>
          BOOK NOW
        </button>
      )}
    </div>
  );
}
