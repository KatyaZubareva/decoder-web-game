import React from "react";

export function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-700 font-semibold transition ${className}`}
    >
      {children}
    </button>
  );
}
