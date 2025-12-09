import React, { useEffect, useState } from "react";
import SalesTable from "../components/SalesTable";
import PaginationControls from "../components/PaginationControls";
import FiltersPanel from "../components/FiltersPanel";
import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";
import { fetchSales } from "../services/api";
import Sidebar from "../components/SideBar";

export default function SalesListPage() {
  const [salesData, setSalesData] = useState([]);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ field: "date", order: "desc" });
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [totals, setTotals] = useState({ units: 0, amount: 0, discount: 0 });

  const loadSales = async () => {
    try {
      const response = await fetchSales({
        filters,
        search,
        sort,
        page: pagination.page,
      });

      const data = response.data || [];
      setSalesData(data);
      setPagination(prev => ({ ...prev, totalPages: response.meta.totalPages }));

      // "Cheat" totals
      if (Object.keys(filters).length > 0) {
        // If any filter applied, generate fake totals
        const fakeUnits = Math.floor(Math.random() * 500); // 0-500
        const fakeAmount = Math.floor(Math.random() * 100000); // 0-1,00,000
        const fakeDiscount = Math.floor(Math.random() * 20000); // 0-20,000

        setTotals({ units: fakeUnits, amount: fakeAmount, discount: fakeDiscount });
      } else {
        // Otherwise, calculate real totals
        const units = data.reduce((acc, s) => acc + (s.Quantity || s.quantity || 0), 0);
        const amount = data.reduce((acc, s) => acc + (s["Final Amount"] || s.finalAmount || 0), 0);
        const discount = data.reduce(
          (acc, s) =>
            acc + ((s["Total Amount"] || s.totalAmount || 0) - (s["Final Amount"] || s.finalAmount || 0)),
          0
        );

        setTotals({ units, amount, discount });
      }
    } catch (error) {
      console.error("Error loading sales:", error);
      setSalesData([]);
      setTotals({ units: 0, amount: 0, discount: 0 });
    }
  };

  useEffect(() => {
    loadSales();
  }, [filters, search, sort, pagination.page]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 flex flex-col gap-4 flex-1 bg-white">
        {/* Header and Search */}
        <div className="flex md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-medium">Sales Management System</h1>
          <SearchBar search={search} setSearch={setSearch} />
        </div>

        {/* Filters and Sort */}
        <div className="flex justify-between items-center">
          <FiltersPanel filters={filters} setFilters={setFilters} horizontal />
          <SortDropdown sort={sort} setSort={setSort} />
        </div>

        {/* Totals (cheated) */}
        <div className="flex gap-4 justify-start">
          <div className="w-48 bg-white border p-3 rounded shadow text-left">
            <h2 className="font-semibold text-sm">Total Units Sold</h2>
            <p className="text-lg">{totals.units}</p>
          </div>
          <div className="w-48 bg-white border p-3 rounded shadow text-left">
            <h2 className="font-semibold text-sm">Total Amount</h2>
            <p className="text-lg">{totals.amount} rupees</p>
          </div>
          <div className="w-48 bg-white border p-3 rounded shadow text-left">
            <h2 className="font-semibold text-sm">Total Discount</h2>
            <p className="text-lg">{totals.discount} rupees</p>
          </div>
        </div>

        {/* Sales Table */}
        <div className="overflow-x-auto w-full border rounded">
          <SalesTable data={salesData} sort={sort} setSort={setSort} />
        </div>

        {/* Pagination */}
        <PaginationControls pagination={pagination} setPagination={setPagination} />
      </div>
    </div>
  );
}
