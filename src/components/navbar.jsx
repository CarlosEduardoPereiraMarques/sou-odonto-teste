"use client";
import React, { useState } from "react";
import Link from "next/link";
import style from "@/app/styles/navbar.module.css";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";


const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Acadêmicos",
    url: "/categories/academicos",
  },
  {
    id: 3,
    title: "Dentistica",
    url: "/categories/dentistica",
  },
  {
    id: 4,
    title: "Descartáveis",
    url: "/categories/descartaveis",
  },
  {
    id: 5,
    title: "Endodontia",
    url: "/categories/endodontia",
  },
];

const Navbar = () => {
  const session = useSession();
  const router = useRouter();
  const [showError, setShowError] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  async function searchTerm(event) {
    event.preventDefault();
    const searchTerm = event.target[0].value;
    if (searchTerm === "") {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 1500);
    } else {
      try {
        router.push(`/products/${searchTerm}`);
        setSearchInput("");
      } catch (error) {
        console.log(error);
      }
    }
  }

  const logout = () => {
    signOut();
    router.push("/");
  };

  return (
    <header className={style.navbar}>
      <div className={`${style.column} ${style.searchColumn}`}>
        <div className={style.searchForm}>
          <form onSubmit={searchTerm}>
            <input
              type="text"
              name="SearchField"
              id="searchField"
              className={`${style.searchInput} ${
                showError ? style.searchInputError : ""
              }`}
              placeholder="Pesquisar um Produto"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <button className={style.searchButton}>Procurar</button>
          </form>
        </div>
        <div className={style.categories}>
          <ul>
            {links.map((link) => (
              <li key={link.id}>
                <Link href={link.url}>{link.title}</Link>
              </li>
            ))}
            {session.status !== "authenticated" ? (
              <li></li>
            ) : (
              <li>
                <Link href="/listas-de-compras"> Lista de Compras </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className={`${style.column} ${style.userColumn}`}>
        <div className={style.userInfo}>
          {session.status === "unauthenticated" ? (
            <div className={style.userInfoText}>
              <div className={style.userInfoLogin}>
                <Link href="/login">Faça o login</Link>
              </div>
              <hr className={style.divider} />
              <div className={style.userInfoRegister}>
                <Link href="/register">Crie sua conta</Link>
              </div>
            </div>
          ) : (
            <div className={style.userInfoText}>
              <button onClick={logout} className={style.logoutButton}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
