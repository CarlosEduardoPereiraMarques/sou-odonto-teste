import React from "react";
import styles from "@/app/styles/components/ProductView.module.css";

const ProductView = ({ product }) => {
  const formatPrice = (price) => {
    let priceString = String(price);

    if (priceString.includes(",")) {
      return priceString;
    }

    if (priceString.includes(".")) {
      priceString = priceString.replace(".", ",");
      const decimalPart = priceString.split(",")[1];

      if (decimalPart.length === 2) {
        return priceString;
      }

      if (decimalPart.length === 1) {
        return priceString + "0";
      }
      return priceString + "00";
    }
    return priceString + ",00";
  };

  return (
    <div className={styles.card}>
      <div>
        <h2>{product.name}</h2>
        <img
          src={`${product.img}`}
          alt="Imagem do Produto"
          style={{ width: "5rem", height: "5rem" }}
        />
        <p className="price">R${formatPrice(product.price)}</p>
        <p>{product.manufacturer}</p>
      </div>
      <button>
        <a href={`/product/${product.id}`}>Ver detalhes</a>
      </button>
    </div>
  );
};

export default ProductView;
