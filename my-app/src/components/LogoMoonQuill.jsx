import React from "react";

export default function LogoMoonQuill({ size = 44 }) {
  return (
    <div
      style={{ width: size, height: size, display: "inline-block" }}
      aria-hidden
    >
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="SkillSphere logo"
      >
        <title>SkillSphere</title>
        {/* background circle */}
        <circle cx="32" cy="32" r="30" fill="#0b0b0f" />
        {/* crescent: large pale circle overlapping with background */}
        <g transform="translate(0,0)">
          <circle cx="38" cy="26" r="16" fill="currentColor" />
          <circle cx="44" cy="24" r="14" fill="#0b0b0f" />
        </g>
        {/* quill (simple) */}
        <path
          d="M18 46c6-4 18-14 28-20"
          stroke="var(--accent-2)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M20 44c6-2 12-8 24-16"
          stroke="var(--accent-1)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <style jsx>{`
        svg {
          display: block;
        }
      `}</style>
    </div>
  );
}
