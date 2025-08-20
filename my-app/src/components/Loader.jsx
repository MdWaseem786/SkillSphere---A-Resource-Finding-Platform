// src/components/Loader.jsx
import React from "react";

export default function Loader() {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="spinner" aria-hidden />
      <div>Loading resources…</div>
    </div>
  );
}
