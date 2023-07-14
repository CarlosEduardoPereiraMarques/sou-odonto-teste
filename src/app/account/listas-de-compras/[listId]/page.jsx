"use client"
import { useSession } from 'next-auth/react';
import React from 'react'

const page = () => {

  const postProduct = async (e) => {
    try {
      const res = await fetch("/api/buylist-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: '',
          buylist_id: '',
          product_id: 3,
          amount: 20,
          obligatory_item: true
        }),
      });
      res.status === 201 
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };
  return (
    <div>pagina da lista
      <button onClick={postProduct}><h1>Adicionar produto</h1></button>
    </div>
  )
}

export default page