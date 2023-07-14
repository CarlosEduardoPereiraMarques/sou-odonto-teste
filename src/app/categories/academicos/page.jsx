import React from "react";
import Image from "next/image";
import Link from "next/link";

async function getProductData() {
  let ProductData;
  try {
    ProductData = await fetch("http://localhost:3000/api/products/academicos");
    return await ProductData.json();
  } catch (error) {
    console.log(error);
  }
}

const Academic = async () => {
  const products = await getProductData();
  return (
    <div>
      Endodontics
      <ul>
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}><li >
          {product.name}
          {product.price.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
          {product.manufacturer}
          <Image
            src={product.img}
            alt={`Imagem do produto ${product.name}`}
            width={100}
            height={100}
          />
        </li></Link>
        ))}
      </ul>
    </div>
  );
};

export default Academic;
