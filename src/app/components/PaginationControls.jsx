import React from "react";
import Link from "next/link";

const PaginationControls = ({
  page,
  totalPages,
  query,
  language,
  stars,
  created,
}) => {
  const buildLink = (newPage) => {
    const params = new URLSearchParams({
      q: query,
      language,
      stars,
      created,
      page: String(newPage),
    });
    return `/?${params.toString()}`;
  };

  return (
    <div className="flex justify-center gap-4 py-4">
      <Link
        href={buildLink(page - 1)}
        className={`px-4 py-2 bg-blue-500 text-white rounded ${
          page === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-disabled={page === 1}
      >
        Previous
      </Link>
      <span className="self-center">
        Page {page} of {totalPages}
      </span>
      <Link
        href={buildLink(page + 1)}
        className={`px-4 py-2 bg-blue-500 text-white rounded ${
          page === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-disabled={page === totalPages}
      >
        Next
      </Link>
    </div>
  );
};

export default PaginationControls;
