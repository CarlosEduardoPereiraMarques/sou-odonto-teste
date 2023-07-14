"use client";
import React from "react";
import SearchResults from "@/components/searchResults";

const SearchTerm = ({ params }) => {
  return (
    <div>
      <SearchResults searchTerm={params.searchTerm} />
    </div>
  );
};

export default SearchTerm;
