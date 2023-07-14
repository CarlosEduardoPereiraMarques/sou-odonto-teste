"use client";
import React from "react";
import Link from "next/link";
import style from "@/app/styles/meus-dados.module.css";
import { useSession } from "next-auth/react";
import LoginAlert from "@/components/loginAlert";
import { useRouter } from "next/navigation";
import BuyLists from "@/components/buylists";

const UserBuylist = () => {
  const router = useRouter();
  const session = useSession();
  if (session.status === "unauthenticated") {
    return <LoginAlert />;
  }

  const redirectToCreate = () => {
    router.push("/listas-de-compras/create");
  };
  return (
    <div>
      <div className={style.breadcrumb}>
        <Link href="/register">Home</Link>
        <span className={style.divider}>/</span>
        <span className={style.active}>Listas de Compras</span>
      </div>
      <button onClick={redirectToCreate}>Adicionar lista de compras</button>
      <ul>
        {session.status === "authenticated" && <BuyLists session={session} />}
      </ul>
    </div>
  );
};

export default UserBuylist;
