import React from "react";
import styles from "@/app/styles/footer.module.css";
import Image from "next/image";
import Link from "next/link";


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Versão para Teste - Carlos Marques 2023 &copy; </p>
      <Link href="https://github.com/CarlosEduardoPereiraMarques/sou-odonto-teste/">
        <Image
          src="github-mark-white.svg"
          alt="github-mark"
          width={40}
          height={40}
          title="Clique para acessar o meu github"
        />
      </Link>
    </footer>
  );
};

export default Footer;
