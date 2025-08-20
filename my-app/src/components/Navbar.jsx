// src/components/Navbar.jsx
import React from "react";
import LogoMonogram from "./LogoMoonQuill"; // or LogoMoonQuill.jsx / LogoShield.jsx

export default function Navbar({ view, setView, totalBookmarks, onHome }) {
  return (
    <header className="nav">
      <div className="nav-left" onClick={onHome} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
        <LogoMonogram />
        <div className="brand">
          <div className="brand-title">SkillSphere</div>
          <div className="brand-sub">Smart Learning Resource Explorer</div>
        </div>
      </div>

      <nav className="nav-right" role="navigation" aria-label="Main">
        <button className={`nav-btn ${view === "explore" ? "active" : ""}`} onClick={() => setView("explore")}>Explore</button>
        <button className={`nav-btn ${view === "bookmarks" ? "active" : ""}`} onClick={() => setView("bookmarks")}>
          Bookmarks <span className="bookmark-count" style={{marginLeft:6}}>{totalBookmarks}</span>
        </button>
      </nav>
    </header>
  );
}
