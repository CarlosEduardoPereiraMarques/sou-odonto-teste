import React, { useState } from "react";
import EditListForm from "./EditListForm";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/components/EditBuylist.module.css";

const EditBuylist = ({ listId, setEditMode }) => {
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const router = useRouter();

  const EditListData = async (data) => {
    try {
      const res = await fetch(`/api/buylists/${listId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          list_name: data.name,
          list_description: data.description,
        }),
      });

      if (!res.ok) {
        throw new Error("Não foi possível editar a lista de compras");
      }
      window.location.reload();
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };
  const handleGoBack = () => {
    setEditMode(false);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div className={styles.container}>
      <EditListForm onSubmit={EditListData} goBack={handleGoBack} />
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default EditBuylist;
