import React, { useState } from "react";
import styles from "@/app/styles/components/QuantityCounter.module.css";

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
    <div className={styles.container}>
      <button
        type="button"
        onClick={decrement}
        className={styles.button}
        disabled={quantity === 0}
      >
        -
      </button>
      <span className={styles.quantity}>{quantity}</span>
      <button type="button" onClick={increment} className={styles.button}>
        +
      </button>
    </div>
  );
};

export default QuantityCounter;
