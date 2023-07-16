import React from "react";
import styles from "@/app/styles/components/LoginAlert.module.css";

const LoginAlert = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Acesso não autorizado!</h1>
      <p className={styles.message}>
        Conteúdo disponível apenas para usuários logados
      </p>
    </div>
  );
};

export default LoginAlert;
