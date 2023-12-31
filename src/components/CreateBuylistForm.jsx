import React, { useState } from "react";
import { useSession } from "next-auth/react";
import styles from "@/app/styles/components/CreateBuylistForm.module.css";

const CreateBuylistForm = ({ goBack }) => {
  const [error, setError] = useState(null);
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
    }
  };

  const handleGoBack = () => {
    goBack();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        name="name"
        placeholder="Nome da Lista"
        className={styles.input}
      />
      <input
        type="text"
        name="description"
        placeholder="Descrição"
        className={styles.input}
      />
      <button className={styles.button}>Criar</button>
      <button className={styles.button} type="button" onClick={handleGoBack}>
        Voltar
      </button>
    </form>
  );
};

export default CreateBuylistForm;
