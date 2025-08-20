// src/components/SearchBar.jsx
import React, { useEffect, useRef, useState } from "react";

export default function SearchBar({ onSearch, defaultValue = "" }) {
  const [q, setQ] = useState(defaultValue || "");
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const submit = (e) => {
    e?.preventDefault();
    const v = q.trim();
    if (!v) return;
    onSearch(v);
  };

  return (
    <form className="search-bar" onSubmit={submit} role="search" aria-label="Search resources">
      <input
        ref={ref}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="search-input"
        placeholder="Search topics: react, algorithms, node, databases..."
        aria-label="Search input"
      />
      <button type="submit" className="search-btn">Search</button>
    </form>
  );
}
