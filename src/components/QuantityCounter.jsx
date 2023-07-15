"use client";
import React, { useState } from "react";

const QuantityCounter = ({ initialValue, onChange }) => {
  const [quantity, setQuantity] = useState(initialValue || 0);

  const increment = () => {
    setQuantity(quantity + 1);
    onChange(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
    onChange(quantity - 1);
  };

  return (
    <div>
      <button type="button" onClick={decrement}>
        -
      </button>
      <span>{quantity}</span>
      <button type="button" onClick={increment}>
        +
      </button>
    </div>
  );
};

export default QuantityCounter;
