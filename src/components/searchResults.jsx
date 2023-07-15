import React, { useEffect, useState } from "react";
import ProductView from "./ProductView";
import Link from "next/link";

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
    return <div>Carregando...</div>;
  }

  if (results.length === 0) {
    return <div>Nenhum resultado encontrado</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {results.map((result) => (
        <Link href={`/product/${result.id}`} key={result.id}>
          <ProductView product={result} />
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
