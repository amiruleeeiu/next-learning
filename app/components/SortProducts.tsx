"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortProducts() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateSorting(sortField: string, sortOrder: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sortField);
    params.set("order", sortOrder);
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => updateSorting("title", "asc")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Sort by Title (A-Z)
      </button>
      <button
        onClick={() => updateSorting("title", "desc")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Sort by Title (Z-A)
      </button>
      <button
        onClick={() => updateSorting("id", "asc")}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Sort by ID (Asc)
      </button>
      <button
        onClick={() => updateSorting("id", "desc")}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Sort by ID (Desc)
      </button>
    </div>
  );
}
