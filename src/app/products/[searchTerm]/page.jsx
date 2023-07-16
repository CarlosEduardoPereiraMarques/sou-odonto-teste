"use client";
import React from "react";
import SearchResults from "@/components/SearchResults";
import { usePathname } from "next/navigation";
import styles from "@/app/styles/pages/SearchResults.module.css";

const SearchTerm = () => {
  const pathname = usePathname();
  const searchTerm = pathname.split("/").pop();
  return (
    <div className={styles.container}>
      <SearchResults searchTerm={searchTerm} />
    </div>
  );
};

export default SearchTerm;
