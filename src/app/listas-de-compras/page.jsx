"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import LoginAlert from "@/components/LoginAlert";

import Buylists from "@/components/Buylists";
import CreateBuylistForm from "@/components/CreateBuylistForm";
import styles from "@/app/styles/pages/UserBuylists.module.css";

const UserBuylist = () => {
  const session = useSession();
  const [addMode, setAddMode] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  if (session.status === "unauthenticated") {
    return <LoginAlert className={styles.loginAlert} />;
  }

  const handleAddClick = () => {
    setAddMode(true);
  };

  const handleGoBack = () => {
    setAddMode(false);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div className={styles.container}>
      {addMode ? (
        <CreateBuylistForm
          className={styles.createBuylistForm}
          goBack={handleGoBack}
        />
      ) : (
        <button className={styles.button} onClick={handleAddClick}>
          Adicionar lista de compras
        </button>
      )}

      <ul className={styles.list}>
        {session.status === "authenticated" && (
          <li className={styles.listItem}>
            <Buylists key={refreshKey} session={session} />
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserBuylist;
