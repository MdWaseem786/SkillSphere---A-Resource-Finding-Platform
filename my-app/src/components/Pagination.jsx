// src/components/Pagination.jsx
import React from "react";

export default function Pagination({ page, totalPages, setPage }) {
  if (!totalPages || totalPages < 2) return null;

  const span = 1; // number of pages to show around current
  const pages = [];

  // smart range: always show 1 .. total, but collapse with ellipsis if large
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div className="pagination">
      <button
        className="pg-btn"
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous page"
      >
        ← Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`pg-num ${p === page ? "active" : ""}`}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </button>
      ))}

      <button
        className="pg-btn"
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        Next →
      </button>
    </div>
  );
}
