import "./AboutCard.css";

export default function AboutCard({ title, description, onClick, isExpanded }) {
  const handleClick = () => {
    console.log("BOOKING...", title);
  };

  return (
    <div
      className={`about-card ${isExpanded ? "about-card--expanded" : ""}`}
      onClick={onClick}
    >
      <h3 className="about-card__title">{title}</h3>
      {isExpanded && <p className="about-card__description">{description}</p>}
      {isExpanded && (
        <button className="about-card__btn" onClick={handleClick}>
          BOOK NOW
        </button>
      )}
    </div>
  );
}
