"use client";
import React from "react";
import SearchResults from "@/components/searchResults";
import { useSearchParams } from "next/navigation";

const SearchTerm = ({ params }) => {
  return (
    <div>
      <SearchResults searchTerm={params.searchTerm} />
    </div>
  );
};

export default SearchTerm;
