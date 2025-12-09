import React from "react";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="relative w-5/12">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle
            cx="11"
            cy="11"
            r="7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="16"
            y1="16"
            x2="21"
            y2="21"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <input
        type="text"
        placeholder="Name, Phone no.."
        value={search}                     // controlled input
        onChange={(e) => setSearch(e.target.value)}  // update state
        className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
