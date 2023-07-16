"use client"
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.features}>
        <h2 className={styles.title}>Seja bem-vindo a sua plataforma de montagem de lista de compras</h2>
        <p className={styles.text}>Nesta plataforma é possível que você monte a lista de compras de forma rápida e fácil</p>
        <button onClick={() => router.push("/register")} className={styles.button}>Comece por aqui</button>
      </div>
    </div>
  );
}
