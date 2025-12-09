import React from "react";

export default function PaginationControls({ pagination, setPagination }) {
  const { page, totalPages } = pagination;

  const goPrev = () => {
    if (page > 1) setPagination(prev => ({ ...prev, page: page - 1 }));
  };

  const goNext = () => {
    if (page < totalPages) setPagination(prev => ({ ...prev, page: page + 1 }));
  };

  return (
    <div className="flex gap-2 justify-center mt-4">
      <button onClick={goPrev} disabled={page === 1} className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50">
        Previous
      </button>
      <span className="px-2 py-1">{page} / {totalPages}</span>
      <button onClick={goNext} disabled={page === totalPages} className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50">
        Next
      </button>
    </div>
  );
}
