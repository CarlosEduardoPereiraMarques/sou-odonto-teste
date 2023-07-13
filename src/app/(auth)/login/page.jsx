"use client"
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const [error, setError] = useState(null);
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
  
    try {
      const res = await fetch("/api/users/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password
        }),
      });
     res.status === 201 //&& router.push("/login?success=Account has been created");
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const session = useSession();
  console.log(session);

  return (
    <div>
      <h1>Acessar</h1>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Senha" />
        <button onClick={()=> signIn()}>Acessar</button>
      </form>
    </div>
  );
};

export default Login;
