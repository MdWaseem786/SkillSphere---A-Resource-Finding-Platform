// src/components/ResourceItem.jsx
import React from "react";

export default function ResourceItem({ resource, onToggleBookmark, bookmarked }) {
  const { name, description, url, tags = [] } = resource;

  return (
    <article className="resource-item" aria-labelledby={`r-${resource.id}`}>
      <div className="resource-head">
        <h3 id={`r-${resource.id}`} className="resource-title">{name}</h3>
        <button
          className={`bookmark-btn ${bookmarked ? "active" : ""}`}
          onClick={() => onToggleBookmark(resource)}
          aria-pressed={!!bookmarked}
          title={bookmarked ? "Remove bookmark" : "Save bookmark"}
        >
          {bookmarked ? "★ Saved" : "☆ Save"}
        </button>
      </div>

      <p className="resource-desc">{description ? description : "No description available."}</p>

      <div className="resource-meta">
        <div className="tags">
          {tags.slice(0, 4).map((t, i) => (
            <span key={i} className="tag">#{t}</span>
          ))}
        </div>
        <a className="visit" href={url} target="_blank" rel="noopener noreferrer">Open Resource ↗</a>
      </div>
    </article>
  );
}
