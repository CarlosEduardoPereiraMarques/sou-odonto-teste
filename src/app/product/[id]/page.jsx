import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

async function getProductData(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    if (!response.ok) {
      throw new Error('Não foi possível obter os dados do produto');
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getBuylists() {
  
}

const ProductPage = () => {
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buylists, setBuylists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getProductData(id);
      setProduct(data);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  const formatPrice = (price) => {
    const priceString = String(price);
    if (priceString.includes(',')) {
      return priceString;
    } else {
      return `${priceString},00`;
    }
  };

  return (
    <div>
      <h1>{product[0].name}</h1>
      <p>R${formatPrice(product[0].price)}</p>
      <p>Fabricante: {product[0].manufacturer}</p>
      <Image src={`${product[0].img}`} alt="Imagem do Produto" width="300px" height="300px" />
      <ul>
        {buylists.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductPage;
