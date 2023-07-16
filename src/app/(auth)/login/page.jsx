"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import styles from "@/app/styles/pages/Login.module.css";

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
    const error = searchParams.get("error");
    if (error) {
      setError(error);
    }

    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [searchParams, session, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    signIn("credentials", { email, password });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          type="email"
          name="userEmail"
          placeholder="Email"
          className={styles.input}
          required
        />
        <input
          type="password"
          name="userPassword"
          placeholder="Senha"
          className={styles.input}
          required
        />
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button className={styles.button}>Acessar</button>
      </form>
      <Link href="/register" className={styles.link}>
        Não tem uma conta? Cadastre-se
      </Link>
    </div>
  );
};

export default Login;
