import React, { useState } from "react";
import QuantityCounter from "./QuantityCounter";

const EditProductInList = ({ product, onUpdate, onClose, buylist }) => {
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
        console.log("Produto atualizado com sucesso");
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
    <div>
      <h3>Editar Produto</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Quantidade:</label>
          <QuantityCounter
            initialValue={buylist.amount}
            value={quantity}
            onChange={handleQuantityChange}
            disabled={!editingEnabled}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isRequired}
              onChange={(e) => setIsRequired(e.target.checked)}
              disabled={!editingEnabled}
            />
            Obrigatório
          </label>
        </div>
        {editingEnabled ? (
          <button>Atualizar</button>
        ) : (
          <button onClick={handleEditToggle}>Editar</button>
        )}
        <button onClick={onClose}>Fechar</button>
      </form>
    </div>
  );
};

export default EditProductInList;
