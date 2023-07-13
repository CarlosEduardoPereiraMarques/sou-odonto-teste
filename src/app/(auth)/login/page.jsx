"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

const Login = () => {
  const session = useSession();
  const router = useRouter();
  if (session.status === "authenticated") {
    router.push("/");
  }
  const [error, setError] = useState(null);
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    signIn("credentials", { email, password })
    
  };

  return (
    <div>
      <h1>Acessar</h1>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Senha" />
        <button onClick={()=> signIn("credentials")}>Acessar</button>
      </form>
    </div>
  );
};

export default Login;
