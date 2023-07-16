import React, { useState } from "react";
import styles from "@/app/styles/inputForm.module.css";

const InputCPF = ({ onChange }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const formatarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, "");

    if (cpf.length <= 3) {
      return cpf;
    } else if (cpf.length <= 6) {
      return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
    } else if (cpf.length <= 9) {
      return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
    } else {
      return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
        6,
        9
      )}-${cpf.slice(9, 11)}`;
    }
  };

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, "");

    if (cpf.length !== 11 || /^(\d)\1*$/.test(cpf)) {
      return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let primeiroDigito = 11 - (soma % 11);
    if (primeiroDigito === 10 || primeiroDigito === 11) {
      primeiroDigito = 0;
    }
    if (primeiroDigito !== parseInt(cpf.charAt(9))) {
      return false;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let segundoDigito = 11 - (soma % 11);
    if (segundoDigito === 10 || segundoDigito === 11) {
      segundoDigito = 0;
    }
    if (segundoDigito !== parseInt(cpf.charAt(10))) {
      return false;
    }

    return true;
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatarCPF(inputValue);
    setValue(formattedValue);
    onChange(formattedValue);

    if (inputValue && !validarCPF(inputValue)) {
      setError("CPF inválido");
    } else {
      setError("");
    }
  };

  const handleInputBlur = async () => {
    if (!validarCPF(value)) {
      setError("CPF inválido");
    } else {
      try {
        const res = await fetch(`/api/users/${value.replace(/[^\d]/g, "")}`);
        const data = await res.json();
        if (Array.isArray(data) && data.length !== 0) {
          setError("CPF já cadastrado");
        } else {
          setError("");
        }
      } catch (err) {
        console.log(err);
        setError("Erro ao verificar CPF");
      }
    }
  };

  const inputClasses = error ? `${styles.input} ${styles.error}` : styles.input;

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        placeholder="CPF"
        className={inputClasses}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default InputCPF;
