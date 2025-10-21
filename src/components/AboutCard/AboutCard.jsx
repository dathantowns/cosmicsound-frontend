import "./AboutCard.css";

export default function AboutCard({ title, description }) {
  return (
    <div className="about-card">
      <h3 className="about-card__title">{title}</h3>
      <p className="about-card__description">{description}</p>
    </div>
  );
}
