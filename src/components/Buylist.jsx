import { useEffect, useState } from "react";
import CopyURL from "@/components/CopyURL";
import EditBuylist from "./EditBuyList";
import ProductData from "./ProductData";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/components/Buylist.module.css";

const Buylist = ({ listId, isBuylistCreator }) => {
  const router = useRouter();

  const [buylist, setBuylist] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buylistProducts, setBuylistProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const buylistRes = await fetch(`/api/buylists/${listId}`);
        const buylistData = await buylistRes.json();
        setBuylist(buylistData[0]);

        const productsRes = await fetch(`/api/buylist-products/${listId}`);
        const productsData = await productsRes.json();
        setBuylistProducts(productsData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [listId]);

  const deleteList = async () => {
    try {
      const res = await fetch(`/api/buylists/${listId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          list_id: listId,
        }),
      });
      if (res.status === 201) {
        router.push("/listas-de-compras");
      }
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    console.log(error);
    return <p>Não foi possível excluir a lista</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.buylistData}>
        <h1 className={styles.title}>{buylist.name}</h1>
        <div>
        <h3 className={styles.subtitle}>Descrição:</h3>
        <p className={`${styles.description} ${styles.descriptionWithMargin}`}>{buylist.description}</p>

        </div>
        <CopyURL url={window.location.href} />

        {isBuylistCreator && (
          <>
            {editMode ? (
              <>
                <EditBuylist listId={listId} setEditMode={setEditMode} />
                <button
                  onClick={() => setShowConfirmation(true)}
                  className={styles.deleteButton}
                >
                  Excluir Lista
                </button>
                {showConfirmation && (
                  <div className={styles.confirmationButtons}>
                    <button
                      onClick={deleteList}
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
              </>
            ) : (
              <button onClick={handleEditClick} className={styles.button}>
                Editar Dados da Lista
              </button>
            )}
          </>
        )}
      </div>

      <h2 className={styles.productName}>Produtos:</h2>

      {buylistProducts.map((product) => (
        <li key={product._id} className={styles.listItem}>
          <ProductData
            buylistProduct={product}
            isBuylistCreator={isBuylistCreator}
          />
        </li>
      ))}
    </div>
  );
};

export default Buylist;
