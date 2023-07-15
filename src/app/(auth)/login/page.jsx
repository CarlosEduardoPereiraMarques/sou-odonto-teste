"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const session = useSession();
  const router = useRouter();
  const [error, setError] = useState(null);  
  const searchParams = useSearchParams();
  if (session.status === "authenticated") {
    router.push("/");
  }
  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      setError(error); 
    }
  }, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    signIn("credentials", { email, password });
  };

  return (
    <div>
      <h1>Acessar</h1>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Senha" />
        {error && <p>{error}</p>}
        <button onClick={() => signIn("credentials")}>Acessar</button>
      </form>
    </div>
  );
};

export default Login;
