import React, { useEffect, useState } from "react";
import Image from "next/image";
import EditProductInList from "./EditProductInList";
import styles from "@/app/styles/components/ProductData.module.css";
import Link from "next/link";

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
    <div className={styles.productData}>
      <h2>Dados do Produto:</h2>
      <Link href={`/product/${productData.id}`}>
        <Image
          width={200}
          height={200}
          src={productData.img}
          alt={productData.name}
        />
      </Link>
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
              <button
                className={styles.deleteButton}
                onClick={() => setShowConfirmation(true)}
              >
                Excluir item da lista?
              </button>
              {showConfirmation && (
                <div>
                  <button className={styles.button} onClick={deleteProduct}>
                    Sim
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => setShowConfirmation(false)}
                  >
                    Não
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <button onClick={handleToggleEditing} className={styles.button}>
                Editar
              </button>
              <button
                onClick={() => setShowConfirmation(true)}
                className={styles.deleteButton}
              >
                Excluir item da lista?
              </button>
              {showConfirmation && (
                <div>
                  <button
                    onClick={deleteProduct}
                    className={styles.deleteButton}
                  >
                    Sim
                  </button>
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className={styles.button}
                  >
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
