import React, { useState } from 'react';
import EditListForm from './editListForm';
import { useRouter } from 'next/navigation';

const EditBuyList = ({ listId }) => {
  const [error, setError] = useState(null);
  
  const editListData = async (data) => {
    const router = useRouter()
    try {
      const res = await fetch(`/api/buylists/${listId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          list_name: data.name,
          list_description: data.description,
        }),
      });
  
      if (!res.ok) {
        throw new Error('Não foi possível editar a lista de compras');
    }
    router.refresh()
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };
  
  return (
    <div>
      <EditListForm onSubmit={editListData} />
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default EditBuyList;
