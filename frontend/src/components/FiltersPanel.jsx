import React from "react";

export default function FiltersPanel({ filters, setFilters, horizontal }) {
  // General update function for all fields
  const update = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  // Age filter handler
  const filterByAge = (value) => {
    setFilters(prev => ({ ...prev, age: value }));
  };

  return (
    <div
      className={`${
        horizontal ? "flex flex-wrap gap-4 mb-4" : "grid grid-cols-3 gap-4"
      } bg-white p-4 rounded shadow`}
    >
      {/* Reset Filters Button */}
      <button
        className="text-2xl min-w-10 bg-gray-100 px-2 rounded"
        onClick={() => setFilters({})}
        title="Reset Filters"
      >
        ⟲
      </button>

      {/* Customer Region */}
      <select
        className="border p-2 bg-gray-100"
        value={filters.region || ""}
        onChange={(e) => update("region", e.target.value)}
      >
        <option value="">Customer Regions</option>
        <option value="North">North</option>
        <option value="South">South</option>
        <option value="East">East</option>
        <option value="West">West</option>
      </select>

      {/* Gender */}
      <select
        className="border p-2 bg-gray-50"
        value={filters.gender || ""}
        onChange={(e) => update("gender", e.target.value)}
      >
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      {/* Age Ranges */}
      <select
        className="border p-2 bg-gray-50"
        value={filters.age || ""}
        onChange={(e) => filterByAge(e.target.value)}
      >
        <option value="">Age Range</option>
        <option value="18-25">18-25</option>
        <option value="26-35">26-35</option>
        <option value="36-45">36-45</option>
        <option value="46+">46+</option>
      </select>

      {/* Product Category */}
      <select
        className="border p-2 bg-gray-50"
        value={filters.category || ""}
        onChange={(e) => update("category", e.target.value)}
      >
        <option value="">Product Category</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Furniture">Furniture</option>
      </select>

      {/* Tags */}
      <select
        id="tags"
        value={filters.tags || ""}
        onChange={(e) => update("tags", e.target.value)}
        className="border p-2 bg-gray-50"
        name="tags"
      >
        <option value="">Tags</option>
        <option value="beauty">beauty</option>
        <option value="casual">casual</option>
        <option value="cotton">cotton</option>
        <option value="fashion">fashion</option>
        <option value="gadgets">gadgets</option>
        <option value="makeup">makeup</option>
        <option value="organic">organic</option>
        <option value="skincare">skincare</option>
      </select>

      {/* Payment Method */}
      <select
        className="border p-2 bg-gray-50"
        value={filters.payment || ""}
        onChange={(e) => update("payment", e.target.value)}
      >
        <option value="">All Payment Methods</option>
        <option value="UPI">UPI</option>
        <option value="Cash">Cash</option>
        <option value="Credit Card">Credit Card</option>
      </select>
    </div>
  );
}
