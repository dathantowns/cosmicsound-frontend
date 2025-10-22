import React from "react";
import "./SongCard.css";

export default function SongCard({ embedCode }) {
  return (
    <div className="song-card">
      <div
        className="song-card__embed"
        dangerouslySetInnerHTML={{ __html: embedCode }}
      />
    </div>
  );
}
