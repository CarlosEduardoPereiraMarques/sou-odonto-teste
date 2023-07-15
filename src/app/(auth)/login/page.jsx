"use client"
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export const metadata = {
  title: "Login",
  description: "Faça seu Login",
};


const Login = () => {
  const session = useSession();
  const router = useRouter();
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      setError(error);
    }

    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [searchParams, session]);

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
        <button>Acessar</button>
      </form>
      <Link href="/register">Não tem uma conta? Cadastre-se</Link>
    </div>
  );
};

export default Login;
