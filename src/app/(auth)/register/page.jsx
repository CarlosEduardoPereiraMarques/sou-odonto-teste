"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [error, setError] = useState(null);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const cpf = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;

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
      res.status === 201 &&
        router.push("/login?success=Account has been created");
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Registre-se</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nome completo" />
        <input type="text" name="cpf" placeholder="CPF" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Senha" />
        <input
          type="password"
          name="paswordConfirm"
          placeholder="Confirme sua senha"
        />
        <button>Registrar</button>
      </form>
      <Link href="/login"> Acesse com uma conta existente </Link>
    </div>
  );
};

export default Register;
