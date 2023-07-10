import React from 'react'
import Link from 'next/link'
import style from '@/app/styles/navbar.module.css'
import Image from 'next/image';

const links = [{
    id: 1,
    title: "Acadêmicos",
    url: "/categories/academicos",
  }, {
    id: 2,
    title: "Dentistica",
    url: "/categories/dentistica",
  }, {
    id: 3,
    title: "Descartáveis",
    url: "/categories/descartaveis",
  }, {
    id: 4,
    title: "Endodontia",
    url: "/categories/endodontia",
  },{
    id: 5,
    title: "Listas de Compras",
    url: "/account/listas-de-compras",
  }
];

const userData = {
    id: 1,
    title: "Meus Dados",
    url: "/account/meus-dados",
}

const Navbar = () => {
  return (
    <header className={style.navbar}>
      <div className={`${style.column} ${style.logoColumn}`}>
        <Link href="/">
          <Image src="/imgs/SouOdontoMarketPlace.png" width={250} height={70} alt="Sou Odonto Logo" />
        </Link>
      </div>
      <div className={`${style.column} ${style.searchColumn}`}>
        <div>
          <input type="text" name="SearchField" id="searchField" className={style.search} placeholder='Pesquisar um Produto'/>
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
            <div>
              <Link href="/login">Faça o login</Link>
            </div>
            <hr className={style.divider} />
            <div>
              <Link href="/register">Crie sua conta</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;