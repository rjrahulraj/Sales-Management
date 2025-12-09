import React from "react";

export default function SortDropdown({ sort, setSort }) {
  const options = [
    { label: "Date Desc", value: "date_desc" },
    { label: "Date Asc", value: "date_asc" },
    { label: "Quantity Desc", value: "quantity_desc" },
    { label: "Quantity Asc", value: "quantity_asc" },
    { label: "Customer Asc", value: "customer_asc" },
    { label: "Customer Desc", value: "customer_desc" },
  ];

  const handleChange = (e) => {
    const [field, order] = e.target.value.split("_");
    setSort({ field, order });
  };

  return (

    <div>
      <select
        className="border p-2 rounded bg-gray-50"
        value={`${sort.field}_${sort.order}`}
        onChange={handleChange}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>

  );
}
