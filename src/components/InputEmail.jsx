import React, { useState } from "react";
import styles from "@/app/styles/inputForm.module.css";

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

  const inputClasses = error ? `${styles.input} ${styles.error}` : styles.input;

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
      {error && <div className={styles.error}>Email inválido</div>}
    </div>
  );
};

export default EmailInput;
