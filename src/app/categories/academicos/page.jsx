"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductView from "@/components/ProductView";

export const metadata = {
  title: "Produtos - Academicos",
  description: "Categoria Acadêmicos",
};

const Academic = () => {
  const [products, setProducts] = useState([]);

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
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <li>
              <ProductView product={product} />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Academic;
