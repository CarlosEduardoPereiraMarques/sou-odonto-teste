import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const BuyLists = ({ session }) => {
  const router = useRouter();
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
    return <div>Carregando...</div>;
  }

  if (buylists.length === 0) {
    return <div>Nenhuma lista de compras</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {buylists.map((buylist) => (
        <div key={buylist._id}>
          <Link
            href={{
              pathname: `/listas-de-compras/${buylist._id}`,
              query: { listId: buylist._id },
            }}
          >
            {buylist.name} - {buylist.description}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BuyLists;
