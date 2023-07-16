import React, { useState } from "react";
import styles from "@/app/styles/components/InputForms.module.css";

const EmailInput = ({ value, onChange }) => {
  const [error, setError] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const email = e.target.value;
    const isValid = validateEmail(email);
    onChange(email, isValid);
    setError(!isValid);
  };

  const inputClasses = error
    ? `${styles.input} ${styles.errorInput}`
    : styles.input;

  return (
    <div>
      <input
        type="email"
        name="email"
        placeholder="Digite seu email"
        value={value}
        onChange={handleInputChange}
        className={inputClasses}
      />
      {error && <div className={styles.errorMessage}>Email inválido</div>}
    </div>
  );
};

export default EmailInput;
