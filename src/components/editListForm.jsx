import React, { useState } from "react";
import styles from "@/app/styles/components/EditListForm.module.css";

const EditListForm = ({ onSubmit, goBack, className }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description });
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${className}`}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome da lista"
        className={styles.input}
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição da lista"
        className={styles.input}
      />
      <button className={styles.button}>Salvar</button>
      <button className={styles.button} onClick={goBack}>
        Voltar
      </button>
    </form>
  );
};

export default EditListForm;
