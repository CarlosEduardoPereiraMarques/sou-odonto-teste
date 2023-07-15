"use client"
import React, { useState } from 'react';

const QuantityCounter = ({ initialValue }) => {
  const [quantity, setQuantity] = useState(initialValue || 0);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{quantity}</span>
      <button onClick={increment}>+</button>
    </div>
  );
};

export default QuantityCounter;
