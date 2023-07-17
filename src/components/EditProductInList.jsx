import React, { useState } from "react";
import QuantityCounter from "./QuantityCounter";
import styles from "@/app/styles/components/EditProductInList.module.css";

const EditProductInList = ({ onUpdate, onClose, buylist }) => {
  const [quantity, setQuantity] = useState(buylist.amount);
  const [isRequired, setIsRequired] = useState(buylist.obligatory_item);
  const [editingEnabled, setEditingEnabled] = useState(true);
  const [error, setError] = useState(null);

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/buylist-products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          list_id: buylist._id,
          amount: quantity,
          obligatory_item: isRequired,
        }),
      });
      if (res.ok) {
        onUpdate();
        window.location.reload();
      } else {
        setError("Erro ao atualizar o produto");
      }
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  const handleEditToggle = () => {
    setEditingEnabled(!editingEnabled);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Editar Produto</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label className={styles.label}>Quantidade:</label>
          <QuantityCounter
            initialValue={buylist.amount}
            value={quantity}
            onChange={handleQuantityChange}
            disabled={!editingEnabled}
          />
        </div>
        <div className={styles.buttonGroup}>
          <label className={styles.label}>
            <span className={styles.labelCheck}>Obrigatório</span>
            <input
              type="checkbox"
              checked={isRequired}
              onChange={(e) => setIsRequired(e.target.checked)}
              disabled={!editingEnabled}
              className={styles.checkbox}
            />
          </label>
        </div>
        {editingEnabled ? (
          <button className={styles.button}>Atualizar</button>
        ) : (
          <button onClick={handleEditToggle} className={styles.button}>
            Editar
          </button>
        )}
        <button onClick={onClose} className={styles.button}>
          Fechar
        </button>
      </form>
    </div>
  );
};

export default EditProductInList;
