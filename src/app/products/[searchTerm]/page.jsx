"use client";
import React from "react";
import SearchResults from "@/components/SearchResults";
import { usePathname } from 'next/navigation';

const SearchTerm = () => {
  const pathname = usePathname();
  const searchTerm = pathname.split('/').pop();
  return (
    <div>
      <SearchResults searchTerm={searchTerm} />
    </div>
  );
};

export default SearchTerm;
