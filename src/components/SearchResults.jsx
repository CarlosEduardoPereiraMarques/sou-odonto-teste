import React, { useEffect, useState } from "react";
import ProductView from "./ProductView";
import styles from "@/app/styles/components/SearchResults.module.css";

async function getData(id) {
  const searchResult = await fetch(`/api/search/${id}`);
  const results = await searchResult.json();

  if (!searchResult.ok) {
    throw new Error("Não foi possível obter os dados");
  }

  return results;
}

const SearchResults = ({ searchTerm }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getData(searchTerm);
        setResults(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm]);

  if (loading) {
    return <div className={styles.message}>Carregando...</div>;
  }

  if (results.length === 0) {
    return <div className={styles.message}>Nenhum resultado encontrado</div>;
  }

  if (error) {
    return (
      <div className={`${styles.message} ${styles.error}`}>
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {results.map((result) => (
        <ProductView key={result.id} product={result} />
      ))}
    </div>
  );
};

export default SearchResults;
