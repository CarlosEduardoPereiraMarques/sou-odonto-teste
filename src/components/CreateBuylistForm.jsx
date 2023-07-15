import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CreateBuylistForm = ({ goBack }) => {
    const [error, setError] = useState(null);
    const router = useRouter();
    const session = useSession();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const name = e.target[0].value;
      const description = e.target[1].value;
  
      try {
        const res = await fetch("/api/buylists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            user_email: session.data.user.email,
          }),
        });
        goBack();
      } catch (err) {
        setError(err);
        console.log(err);
      }
    };
  
    const handleGoBack = () => {
      goBack();
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nome da Lista" />
        <input type="text" name="description" placeholder="Descrição" />
        <button>Criar</button>
        <button type="button" onClick={handleGoBack}>
          Voltar
        </button>
      </form>
    );
  };
  
  export default CreateBuylistForm;