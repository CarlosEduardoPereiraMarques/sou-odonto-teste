import Link from "next/link";
import React from "react";


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
    <div>
        {product.name} - R${formatPrice(product.price)}
    </div>
  );
};

export default ProductView;
