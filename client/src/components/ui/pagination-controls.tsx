"use client"; // Required — uses hooks (useRouter, useSearchParams)
import React from "react";
import { Button } from "./button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  limit: number; // Items per page (e.g. 10)
  page: number; // Current page number
  total: number; // Total number of items
  totalPages: number; // Total number of pages
}

export default function PaginationControls({
  meta,
}: {
  meta: PaginationControlsProps;
}) {
  const { limit: pageSize, page: currentPage, total, totalPages } = meta;

  const searchParams = useSearchParams();
  const router = useRouter();

  //   now we write a function to navigate the other page
  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString()); // Copy existing params
    params.set("page", page.toString());  // Update ?page=
    router.push(`?${params.toString()}`); // Trigger navigation
  };

  const start = pageSize * (currentPage - 1) + 1; // e.g. 10 * (2-1) = 10
  const end = Math.min(pageSize * currentPage, total); // e.g. min(20, 17) = 17
  // Shows: "Showing 10 to 17 of 17 results"
 
  return (
    <div className="flex items-center justify-between px-2 py-4 border-t mt-4">
      <div className="text-sm text-muted-foreground">
        Showing {start} to {end} of {total} results
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateToPage(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateToPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
