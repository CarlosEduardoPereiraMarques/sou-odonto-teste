"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Buylist from '@/components/Buylist';


export default function Page({ params }) {
  const [buylistProducts, setBuylistProducts] = useState([]);
  const [buylistCreator, setBuylistCreator] = useState(false);
  const [error, setError] = useState();
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (session.status === 'loading') {
        return;
      }

      const response = await fetch("/api/buylist-products/" + params.listId);
      const data = await response.json();
      setBuylistProducts(data);
      const userEmail = await getUserEmail(data[0].user_id);
      isBuylistCreator(userEmail);
    };

    fetchData();
  }, [session]);

  const getUserEmail = async (id) => {
    try {
      const response = await fetch("/api/users/user-id/" + id);
      const data = await response.json();
      return data.email;
    } catch (error) {
      console.error("Error getting user ID:", error);
    }
  };

  const isBuylistCreator = (userEmail) => {
    setBuylistCreator(userEmail === session.data.user.email)
  };

  if (session.status === 'loading') {
    return <div>Carregando...</div>; 
  }
  return (
    <>
      {buylistCreator ? (
        <>
          <Buylist listId={params.listId} isBuylistCreator={buylistCreator} />
        </>
      ) : (
        <Buylist listId={params.listId} isBuylistCreator={buylistCreator} />
      )}
    </>
  );
}