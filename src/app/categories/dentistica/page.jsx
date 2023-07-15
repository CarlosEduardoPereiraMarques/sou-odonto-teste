import React from "react";
import Image from "next/image";
import Link from "next/link";
import ProductView from "@/components/ProductView";

async function getProductData() {
  let ProductData;
  try {
    ProductData = await fetch("http://localhost:3000/api/products/dentistica");
    return await ProductData.json();
  } catch (error) {
    console.log(error);
  }
}

const Dentistry = async () => {
  const products = await getProductData();
  return (
    <div>
      <ul>
      {products.map((product) => (
        <Link href={`/product/${product.id}`} key={product.id}>
          <li>
            <ProductView product={product}/>
          </li>
        </Link>
        ))}
      </ul>
    </div>
  );
};

export default Dentistry;
