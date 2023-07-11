"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import style from "@/app/styles/navbar.module.css";
import Image from "next/image";

const links = [
  {
    id: 1,
    title: "Acadêmicos",
    url: "/categories/academicos",
  },
  {
    id: 2,
    title: "Dentistica",
    url: "/categories/dentistica",
  },
  {
    id: 3,
    title: "Descartáveis",
    url: "/categories/descartaveis",
  },
  {
    id: 4,
    title: "Endodontia",
    url: "/categories/endodontia",
  },
  {
    id: 5,
    title: "Listas de Compras",
    url: "/account/listas-de-compras",
  },
];

const userData = {
  id: 1,
  title: "Meus Dados",
  url: "/account/meus-dados",
};

const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [logoImage, setLogoImage] = useState("/imgs/SouOdontoSymbol.png");
  const [logoSize, setLogoSize] = useState({ width: 250, height: 70 });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth >= 1050) {
      setLogoImage("/imgs/SouOdontoMarketplace.png");
      setLogoSize({ width: 300, height: 85 });
    } else {
      setLogoImage("/imgs/SouOdontoSymbol.png");
      setLogoSize({ width: 250, height: 70 });
    }
  }, [windowWidth]);

  return (
    <header className={style.navbar}>
      <div className={`${style.column} ${style.logoColumn}`}>
        <Link href="/">
          <div className={style.logoImg}>
            {windowWidth >= 1050 ? (
              <Image
                src={logoImage}
                alt="Sou Odonto Logo"
                width={300}
                height={85}
              />
            ) : (
              <Image
                src={logoImage}
                alt="Sou Odonto Logo"
                width={250}
                height={70}
              />
            )}
          </div>
        </Link>
      </div>

      <div className={`${style.column} ${style.searchColumn}`}>
        <div>
          <input
            type="text"
            name="SearchField"
            id="searchField"
            className={style.search}
            placeholder="Pesquisar um Produto"
          />
        </div>
        <div className={style.categories}>
          <ul>
            {links.map((link) => (
              <li key={link.id}>
                <Link href={link.url}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`${style.column} ${style.userColumn}`}>
        <div className={style.userInfo}>
          <div className={style.userInfoText}>
            <div className={style.userInfoLogin}>
              <Link href="/login">Faça o login</Link>
            </div>
            <hr className={style.divider} />
            <div className={style.userInfoRegister}>
              <Link href="/register">Crie sua conta</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
