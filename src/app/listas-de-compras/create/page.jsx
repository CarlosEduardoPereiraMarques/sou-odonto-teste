"use client";
import React, { useState } from "react";
import Link from "next/link";
import style from "@/app/styles/meus-dados.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginAlert from "@/components/LoginAlert";

const UserBuylist = () => {
  const [error, setError] = useState(null);
  const router = useRouter();
  const session = useSession();
  if (session.status === "unauthenticated") {
    return <LoginAlert />;
  }
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
      res.status === 201 && router.push("/listas-de-compras/");
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };
  return (
    <div>
      <div className={style.breadcrumb}>
        <Link href="/register">Home</Link>
        <span className={style.divider}>/</span>
        <Link href="/listas-de-compras" className={style.divider}>
          Listas de Compras
        </Link>
        <span className={style.divider}>/</span>
        <span className={style.active}>Criar Lista</span>
      </div>
      <h1>Criar Lista de Compras</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nome da Lista" />
        <input type="text" name="description" placeholder="Descrição" />
        <button>Criar</button>
      </form>
    </div>
  );
};

export default UserBuylist;
