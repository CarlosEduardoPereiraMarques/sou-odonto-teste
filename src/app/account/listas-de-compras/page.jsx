"use client";
import React from "react";
import Link from "next/link";
import style from "@/app/styles/meus-dados.module.css";
import { useSession } from "next-auth/react";
import LoginAlert from "@/components/loginAlert";

const links = [
  {
    id: 1,
    title: "Meus dados",
    url: "/account/meus-dados",
  },
  {
    id: 2,
    title: "Listas de Compras",
    url: "/account/listas-de-compras",
  },
];

const UserBuylist = () => {
  const session = useSession();
  if (session.status === "unauthenticated") {
    return <LoginAlert />;
  }
  return (
    <div>
      <div className={style.breadcrumb}>
        <Link href="/register">Home</Link>
        <span className={style.divider}>/</span>
        <Link href="/accounts/meus-dados">Minha conta</Link>
        <span className={style.divider}>/</span>
        <span className={style.active}>Meus dados</span>
      </div>
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <Link href={link.url}>{link.title}</Link>
          </li>
        ))}
      </ul>
      <button type="button">Adicionar lista de compras</button>
      <ul>
        <li>1.Aqui vão as listas</li>
      </ul>
    </div>
  );
};

export default UserBuylist;
