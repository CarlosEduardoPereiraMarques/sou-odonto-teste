import React, { useState } from "react";
import EditListForm from "./EditListForm";
import { useRouter } from "next/navigation";

const AddBuylist = ({ setAddMode, user_email }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const AddListData = async (data) => {
    console.log(data)
    try {
      const res = await fetch(`/api/buylists/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: user_email,
          name: data.name,
          description: data.description,
        }),
      });

      if (!res.ok) {
        throw new Error("Não foi possível adicionar a lista de compras");
      }
      window.location.reload();
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const handleGoBack = () => {
    setAddMode(false);
  };

  return (
    <div>
      <EditListForm onSubmit={AddListData} goBack={handleGoBack} />
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default AddBuylist;
