"use client"
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import ToggleList from "@/components/ToggleList";
import QuantityCounter from "@/components/QuantityCounter";
import AddBuylist from "@/components/AddBuylist";

async function getProductData(id) {
  try {
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) {
      throw new Error("Não foi possível obter os dados do produto");
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getBuylists(userEmail) {
  try {
    const response = await fetch(`/api/user/buylist/${userEmail}`);
    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
};

const ProductPage = () => {
  const session = useSession();
  const router = useRouter()
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isRequired, setIsRequired] = useState(false);
  const [buylists, setBuylists] = useState([]);
  const [error, setError] = useState(null);
  const [addBuylist, setAddBuylist] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getProductData(id);
      setProduct(data);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (session.status === "authenticated") {
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
          console.log(error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchBuylists();
    }
  }, [session]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  const formatPrice = (price) => {
    let priceString = String(price);

    if (priceString.includes(",")) {
      return priceString;
    }

    if (priceString.includes(".")) {
      priceString = priceString.replace(".", ",");
      const decimalPart = priceString.split(",")[1];

      if (decimalPart.length === 2) {
        return priceString;
      }

      if (decimalPart.length === 1) {
        return priceString + "0";
      }
      return priceString + "00";
    }
    return priceString + ",00";
  };

  const handleCheckboxChange = (event) => {
    setIsRequired(event.target.checked);
  };

  const handleItemClick = async (item) => {
    if (item === true) {
      setAddBuylist(true);
    } else {
      await addProduct(item);
    }
  };

  const addProduct = async (item) => {
    try {
      const res = await fetch("/api/buylist-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: item.user_id,
          buylist_id: item._id,
          product_id: product.id,
          amount: selectedQuantity,
          obligatory_item: isRequired,
        }),
      });
      if (res.ok) {
        setSuccessMessage("Item adicionado com sucesso!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        throw new Error("Não foi possível adicionar a lista de compras");
      }
      setError(null);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };
  return (
    <div>
      <h1>{product.name}</h1>
      <p>R${formatPrice(product.price)}</p>
      <p>Fabricante: {product.manufacturer}</p>
      <Image src={`${product.img}`} alt="Imagem do Produto" width={300} height={79} />
      <QuantityCounter
        value={selectedQuantity}
        onChange={setSelectedQuantity}
        initialValue={1}
      />
      <Checkbox
        label="Item obrigatório"
        checked={isRequired}
        onChange={handleCheckboxChange}
      /> {session.status === "authenticated" ? (
        <>
          <ToggleList buylists={buylists} onItemClick={handleItemClick} />
          {addBuylist && <AddBuylist setAddMode={setAddBuylist} user_email={session.data.user.email} />}
          {successMessage && <div>{successMessage}</div>}
          {error && <div>{error}</div>}
        </>
      ) : (
        <button onClick={() => router.push("/login")}>Faça o login para adicionar a uma lista de compras</button>
      )}
    </div>
  );
};

export default ProductPage;