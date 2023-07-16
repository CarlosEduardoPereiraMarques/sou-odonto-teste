import React, { useEffect, useState } from "react";
import Image from "next/image";
import EditProductInList from "./EditProductInList";

const ProductData = ({ buylistProduct, isBuylistCreator }) => {
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const deleteProduct = async () => {
    try {
      const res = await fetch("/api/buylist-products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listId: buylistProduct._id,
        }),
      });
      if (res.status === 201) {
        router.refresh();
      } else {
        setError("Erro ao excluir produto");
      }
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  const getProductData = async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProductData(data);
      } else {
        setError("Erro ao obter informações do produto");
      }
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };
  useEffect(() => {
    if (buylistProduct) {
      getProductData(buylistProduct.product_id);
    }
  }, [buylistProduct]);


  const handleToggleEditing = () => {
    setIsEditing(!isEditing);
  };

  if (!buylistProduct || !productData) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>Dados do Produto:</h2>
      <Image
        width={200}
        height={200}
        src={productData.img}
        alt={productData.name}
      />
      <p>Nome: {productData.name}</p>
      <p>Marca: {productData.manufacturer}</p>
      <p>Quantidade: {buylistProduct.amount}</p>
      <p>Obrigatório: {buylistProduct.obligatory_item ? "Sim" : "Não"}</p>
      {isBuylistCreator && (
        <div>
          {isEditing ? (
            <div>
              <EditProductInList
                onUpdate={handleToggleEditing}
                onClose={handleToggleEditing}
                buylist={buylistProduct}
              />
              <button onClick={() => setShowConfirmation(true)}>
                Excluir item da lista?
              </button>
              {showConfirmation && (
                <div>
                  <button onClick={deleteProduct}>Sim</button>
                  <button onClick={() => setShowConfirmation(false)}>
                    Não
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <button onClick={handleToggleEditing}>Editar</button>
              <button onClick={() => setShowConfirmation(true)}>
                Excluir item da lista?
              </button>
              {showConfirmation && (
                <div>
                  <button onClick={deleteProduct}>Sim</button>
                  <button onClick={() => setShowConfirmation(false)}>
                    Não
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductData;