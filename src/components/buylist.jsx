import { useEffect, useState } from 'react';
import CopyURL from '@/components/CopyURL';
import EditBuylist from './EditBuylist';
import ProductData from './ProductData';

const Buylist = ({ listId, isBuylistCreator }) => {

  const [buylist, setBuylist] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buylistProducts, setBuylistProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const buylistRes = await fetch(`/api/buylists/${listId}`);        
        const buylistData = await buylistRes.json();
        setBuylist(buylistData[0]);

        const productsRes = await fetch(`/api/buylist-products/${listId}`);
        const productsData = await productsRes.json();
        setBuylistProducts(productsData)        
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();

  }, [listId]);

  const deleteList = async () => {
    try {
      const res = await fetch(`/api/buylists/${params.listId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          list_id: params.listId,
        }),
      });
      if (res.status === 201) {
        router.push("/listas-de-compras");
      } else {
        setError("Erro ao excluir lista de compras");
      }
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  if(loading) {
    return <p>Carregando...</p>;
  }

  if(error) {
    return <p>Ocorreu um erro: {error.message}</p>
  }
  return (
    <div>
      <h1>{buylist.name}</h1>
      
      <p>{buylist.description}</p>
      <CopyURL url={window.location.href} />
      
      <h2>Produtos:</h2>
      
      {buylistProducts.map(product => (
        <li key={product._id}>
          <ProductData buylistProduct={product} isBuylistCreator={isBuylistCreator} />
        </li>
      ))}
      
      {isBuylistCreator && (
        editMode ? (
          <EditBuylist listId={listId} setEditMode={setEditMode} />
        ) : (
          <button onClick={handleEditClick}>Editar Dados da Lista</button>
        )
      )}
      <button onClick={() => setShowConfirmation(true)}>Excluir Lista</button>
      {showConfirmation && (
        <div>
          <button onClick={deleteList}>Sim</button>
          <button onClick={() => setShowConfirmation(false)}>Não</button>
        </div>
      )}
      
    </div>
  );
}

export default Buylist;