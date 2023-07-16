import React, { useState } from "react";
import styles from "@/app/styles/components/InputForms.module.css";

const PasswordInput = ({ onChange }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    onChange(inputValue);

    if (inputValue.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres");
    } else if (!/\d/.test(inputValue)) {
      setError("A senha deve conter pelo menos um número");
    } else if (!/[!@#$%^&*]/.test(inputValue)) {
      setError("A senha deve conter pelo menos um caractere especial");
    } else {
      setError("");
    }
  };

  const inputClasses = error
    ? `${styles.input} ${styles.errorInput}`
    : styles.input;

  return (
    <div>
      <input
        type="password"
        value={value}
        onChange={handleInputChange}
        placeholder="Senha"
        className={inputClasses}
      />
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default PasswordInput;
