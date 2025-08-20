// src/components/Bookmarks.jsx
import React from "react";

export default function Bookmarks({ bookmarks, onToggle }) {
  if (!bookmarks || bookmarks.length === 0) {
    return <div className="empty">You haven't saved any resources yet. Search and save the ones you like.</div>;
  }

  return (
    <div>
      <h2 className="section-title">Your Bookmarks</h2>
      <div className="resource-list">
        {bookmarks.map((b) => (
          <div className="resource-item" key={b.id}>
            <div className="resource-head">
              <h3 className="resource-title">{b.name}</h3>
              <button className="bookmark-btn active" onClick={() => onToggle(b)}>★ Saved</button>
            </div>
            <p className="resource-desc">{b.description ?? ""}</p>
            <div className="resource-meta">
              <a className="visit" href={b.url} target="_blank" rel="noopener noreferrer">Open Resource ↗</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
