"use client"
import Buylist from "@/components/Buylist";
import EditBuylist from "@/components/EditBuylist";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import ProductData from "@/components/ProductData";

const SingleBuylist = ({ params }) => {
  const session = useSession();
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [buylistProducts, setBuylistProducts] = useState([]);

  const deleteList = async () => {
    try {
      const res = await fetch(`/api/buylists/${params.listId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          list_id: params.listId,
        }),
      });
      if (res.status === 201) {
        router.push("/listas-de-compras");
      } else {
        setError("Erro ao excluir lista de compras");
      }
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/buylist-products/${params.listId}`);
        if (res.ok) {
          const data = await res.json();
          setBuylistProducts(data);
          setIsLoading(false);
        } else {
          setError("Erro ao obter produtos da lista de compras");
        }
      } catch (err) {
        setError(err.message);
        console.log(err);
      }
    };
    
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Carregando...</div>; 
  }
  console.log(buylistProducts)
  
  if (session.status === "authenticated") {
    return (
      <div>
        <div>
          <Buylist listId={params.listId} />
          {editMode ? (
            <EditBuylist listId={params.listId} setEditMode={setEditMode} />
          ) : (
            <button onClick={handleEditClick}>Editar Dados da Lista</button>
          )}
        </div>
        <div>
          <button onClick={() => setShowConfirmation(true)}>
            Excluir Lista
          </button>
          {showConfirmation && (
            <div>
              <button onClick={deleteList}>Sim</button>
              <button onClick={() => setShowConfirmation(false)}>Não</button>
            </div>
          )} {
            buylistProducts.map((buylistProduct) => (
              <li key={buylistProduct.id}><ProductData buylistProduct={buylistProduct} /></li>
            ))
          }
        </div>
      </div>
    );
  }
};

export default SingleBuylist;
