"use client"
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import style from "@/app/styles/pages/MeusDados.module.css";
import LoginAlert from "@/components/LoginAlert";
import Buylists from "@/components/Buylists";
import CreateBuylistForm from "@/components/CreateBuylistForm";

export const metadata = {
  title: "Lista de Compras",
  description: "Lista de Compras",
};


const UserBuylist = () => {
  const session = useSession();
  const [addMode, setAddMode] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  if (session.status === "unauthenticated") {
    return <LoginAlert />;
  }

  const handleAddClick = () => {
    setAddMode(true);
  };

  const handleGoBack = () => {
    setAddMode(false);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div>
      <div className={style.breadcrumb}>
        <Link href="/register">Home</Link>
        <span className={style.divider}>/</span>
        <span className={style.active}>Listas de Compras</span>
      </div>
      {addMode ? (
        <CreateBuylistForm goBack={handleGoBack} />
      ) : (
        <button onClick={handleAddClick}>Adicionar lista de compras</button>
      )}

      <ul>
        {session.status === "authenticated" && <Buylists key={refreshKey} session={session} />}
      </ul>
    </div>
  );
};

export default UserBuylist;