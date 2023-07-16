"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import styles from "@/app/styles/components/Navbar.module.css";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

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
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showError, setShowError] = useState(false);

  const searchTerm = (event) => {
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
  };

  const logout = async () => {
    await signOut();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.searchForm}>
        <form onSubmit={searchTerm}>
          <input
            type="text"
            name="SearchField"
            id="searchField"
            className={`${styles.searchInput} ${
              showError ? styles.searchInputError : ""
            }`}
            placeholder="Pesquisar um Produto"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <button className={styles.searchButton}>Procurar</button>
        </form>
      </div>
      <div className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        <ul>
          {links.map((link) => (
            <li key={link.id}>
              <Link href={link.url} style={{ color: "#FFFFFF" }}>
                {link.title}
              </Link>
            </li>
          ))}
          {session.status === "authenticated" && (
            <li>
              <Link href="/listas-de-compras" style={{ color: "#FFFFFF" }}>
                Lista de Compras
              </Link>
            </li>
          )}
          {session.status === "unauthenticated" ? (
            <>
              <li>
                <Link href="/login" style={{ color: "#FFFFFF" }}>
                  Faça o login
                </Link>
              </li>
              <li>
                <Link href="/register" style={{ color: "#FFFFFF" }}>
                  Crie sua conta
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link href="" onClick={logout}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className={styles.mobileMenu} onClick={toggleMenu}>
        <div className={`${styles.bar} ${isOpen ? styles.open : ""}`} />
        <div className={`${styles.bar} ${isOpen ? styles.open : ""}`} />
        <div className={`${styles.bar} ${isOpen ? styles.open : ""}`} />
      </div>
    </nav>
  );
};

export default Navbar;
