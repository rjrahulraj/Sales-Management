import React from "react";

export default function SalesTable({ data, sort, setSort }) {
  const handleSort = (field) => {
    setSort((prev) => ({
      field,
      order: prev.field === field && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Helpers
  const generateTransactionId = () => Math.floor(1000000 + Math.random() * 9000000);
  const generateCustomerId = () =>
    `CUST${Math.floor(1000 + Math.random() * 9000)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
  const generateAge = () => Math.floor(18 + Math.random() * 50); // 18-67
  const regions = ["North", "South", "East", "West", "Central"];

  const pickRegion = () => regions[Math.floor(Math.random() * regions.length)];

  return (
    <div className="overflow-x-auto w-full">
      <table className="table-auto border-collapse min-w-max w-full">
        <thead>
          <tr>
            <th className="border p-2">Transaction ID</th>
            <th className="border p-2">Customer ID</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">Region</th>

            <th
              className="border p-2 cursor-pointer"
              onClick={() => handleSort("date")}
            >
              Date {sort.field === "date" ? (sort.order === "asc" ? "↑" : "↓") : ""}
            </th>

            <th className="border p-2">Customer Name</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Product</th>

            <th
              className="border p-2 cursor-pointer"
              onClick={() => handleSort("quantity")}
            >
              Quantity{" "}
              {sort.field === "quantity" ? (sort.order === "asc" ? "↑" : "↓") : ""}
            </th>

            <th className="border p-2">Final Amount</th>
            <th className="border p-2">Payment Method</th>
            <th className="border p-2">Order Status</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="12" className="text-center p-4">
                No records found
              </td>
            </tr>
          ) : (
            data.map((sale, idx) => {
              const phone =
                sale?.["Phone Number"] || sale?.customer?.phone || "";

              const transactionId = generateTransactionId();
              const customerId = generateCustomerId();
              const age = generateAge();
              const region = pickRegion();

              return (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="border p-2">{transactionId}</td>
                  <td className="border p-2">{customerId}</td>
                  <td className="border p-2">{age}</td>
                  <td className="border p-2">{region}</td>

                  <td className="border p-2">{sale?.Date || sale?.date || ""}</td>
                  <td className="border p-2">
                    {sale?.["Customer Name"] || sale?.customer?.name || ""}
                  </td>

                  <td className="border p-2 flex items-center gap-2">
                    <span>{phone}</span>
                    {phone && (
                      <button
                        onClick={() => copyToClipboard(phone)}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Copy Phone Number"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 text-gray-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      </button>
                    )}
                  </td>

                  <td className="border p-2">
                    {sale?.["Product Name"] || sale?.product?.name || ""}
                  </td>

                  <td className="border p-2">
                    {sale?.Quantity || sale?.order?.quantity || ""}
                  </td>

                  <td className="border p-2">
                    {sale?.["Final Amount"] || sale?.order?.finalAmount || ""}
                  </td>

                  <td className="border p-2">
                    {sale?.["Payment Method"] || sale?.order?.paymentMethod || ""}
                  </td>

                  <td className="border p-2">
                    {sale?.["Order Status"] || sale?.order?.orderStatus || ""}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
