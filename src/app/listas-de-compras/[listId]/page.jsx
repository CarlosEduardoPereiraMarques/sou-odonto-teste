"use client";
import Buylist from "@/components/Buylist";
import EditBuylist from "@/components/EditBuylist";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SingleProduct = ({ params }) => {
  const session = useSession();
  const route = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState(null);

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
      res.status === 201;
      route.push("/listas-de-compras");
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const getBuylistProducts = async () => {
    try {
      const res = await fetch(`/api/buylist-products/${params.listId}`);
      const data = await res.json();
      return data;
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  if (session.status === "authenticated") {
    return (
      <div>
        <div>
          <Buylist listId={params.listId} />
          {editMode ? (
            <EditBuylist listId={params.listId} />
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
          )}
          <ul></ul>
        </div>
      </div>
    );
  }
};

export default SingleProduct;
