import React, { useEffect, useState } from 'react';

const Buylist = ({ listId }) => {

    const [buylist, setBuylist] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getBuylist = async () => {
    try {
      const res = await fetch(`/api/buylists/${listId}`);

      if (!res.ok) {
        throw new Error('Não foi possível obter a lista de compras');
      }
      setBuylist(await res.json());
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBuylist();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>{buylist[0].name} - {buylist[0].description} -FAZER O RESTANTE DA PÁGINA [PEGAR OS PRODUTOS]</div>
  );
};

export default Buylist;
