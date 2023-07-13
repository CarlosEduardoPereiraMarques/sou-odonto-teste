import React from "react";
import Image from "next/image";

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
      Endodontics
      <ul>
        {products.map((product) => (
          <li key={product.id}>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dentistry;
