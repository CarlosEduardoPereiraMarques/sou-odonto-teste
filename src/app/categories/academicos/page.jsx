"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductView from "@/components/ProductView";
import styles from "@/app/styles/pages/ItemsView.module.css";

const Academic = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/products/academicos");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          throw new Error("Não foi possível obter os dados dos produtos");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className={styles.message}>Carregando...</div>;
  }

  if (products.length === 0) {
    return <div className={styles.message}>Nenhum resultado encontrado</div>;
  }

  return (
    <div className={styles.container}>
      {products.map((product) => (
        <ProductView key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Academic;
