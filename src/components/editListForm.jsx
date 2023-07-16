import React, { useState } from "react";


const EditListForm = ({ onSubmit, goBack }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome da lista"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição da lista"
      />
      <button>Salvar</button>
      <button onClick={goBack}>Voltar</button>
    </form>
  );
};

export default EditListForm;
