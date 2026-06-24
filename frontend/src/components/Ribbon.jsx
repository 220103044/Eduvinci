import React from "react";

export default function Ribbon({ words = [] }) {
  const repeated = [...words, ...words, ...words, ...words];
  return (
    <div className="ribbon" aria-hidden="true">
      <div className="ribbon-track">
        {repeated.map((w, i) => (
          <span key={i} className="flex items-center gap-16">
            {w}
            <span className="text-[#C75B39] text-base">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
