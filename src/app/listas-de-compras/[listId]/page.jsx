"use client"
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Buylist from '@/components/Buylist';

export const metadata = {
  title: "Lista de compras",
  description: "Lista de compras",
};


export default function Page({ params }) {
  const [buylistCreator, setBuylistCreator] = useState(false);
  const [error, setError] = useState();
  const session = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (session.status === 'loading') {
        return;
      }
      try {
        const response = await fetch("/api/buylist-products/" + params.listId);
        const data = await response.json();
        if (data.length !== 0) {
          const userEmail = await getUserEmail(data[0].user_id);
          isBuylistCreator(userEmail);
        }
      } catch (error) {
        setError(error)
      }

      const isBuylistCreator = (userEmail) => {
        setBuylistCreator(userEmail === session.data.user.email)
      };

    };

    fetchData();
  }, [session, params.listId]);

  const getUserEmail = async (id) => {
    try {
      const response = await fetch("/api/users/user-id/" + id);
      const data = await response.json();
      return data.email;
    } catch (error) {
      console.error("Error getting user ID:", error);
    }
  };

  if (session.status === 'loading') {
    return <div>Carregando...</div>; 
  }
  return (
    <>
      {buylistCreator ? (
        <Buylist listId={params.listId} isBuylistCreator={buylistCreator} />
      ) : (
        <Buylist listId={params.listId} isBuylistCreator={buylistCreator} />
      )}
    </>
  );
}