import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/components/Buylists.module.css";

const Buylists = ({ session }) => {
  const [buylists, setBuylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuylists = async () => {
      try {
        const user_email = session.data.user.email;

        const res = await fetch(`/api/users/buylist/${user_email}`);
        if (res.ok) {
          const data = await res.json();
          setBuylists(data);
        } else {
          throw new Error("Não foi possível obter os dados");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuylists();
  }, [session]);

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (buylists.length === 0) {
    return <div className={styles.empty}>Nenhuma lista de compras</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      {buylists.map((buylist) => (
        <div key={buylist._id} className={styles.buylist}>
          <Link
            href={{
              pathname: `/listas-de-compras/${buylist._id}`,
              query: { listId: buylist._id },
            }}
            className={styles.link}
          >
            {buylist.name} - {buylist.description}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Buylists;
