"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import InputCPF from "@/components/InputCPF";
import InputEmail from "@/components/InputEmail";
import InputPassword from "@/components/InputPassword";
import styles from "@/app/styles/pages/Register.module.css";

const Register = () => {
  const [error, setError] = useState(null);
  const [cpfValue, setCPFValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const cpf = cpfValue.replace(/[^\d]/g, "");
    const email = emailValue;
    const password = passwordValue;
    const confirmPassword = e.target[4].value;

    if (!cpf) {
      setError("CPF inválido");
      return;
    }

    if (!email) {
      setError("E-mail inválido");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          cpf,
          email,
          password,
        }),
      });
      if (res.status === 201) {
        router.push("/login?success=Account has been created");
      } else {
        setError("Erro ao criar conta");
      }
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  const handleCPFChange = (cpf) => {
    setCPFValue(cpf);
  };

  const handleEmailChange = (email) => {
    setEmailValue(email);
  };

  const handlePasswordChange = (password) => {
    setPasswordValue(password);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Faça o seu Cadastro</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Nome completo"
          className={styles.input}
        />
        <InputCPF onChange={handleCPFChange} />
        <InputEmail onChange={handleEmailChange} />
        <InputPassword onChange={handlePasswordChange} />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirme sua senha"
          className={styles.input}
        />
        {error && <div className={styles.errorMessage}>{error}</div>}
        <button className={styles.button}>Registrar</button>
      </form>
      <Link href="/login" className={styles.link}>
        Acesse com uma conta existente
      </Link>
    </div>
  );
};

export default Register;
