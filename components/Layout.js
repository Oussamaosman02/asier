import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useModal } from "./funciones/useModal";
import SideBar from "./SideBar";
import css from "styles/layout.module.css";
import Inicio from "../pages";
export default function Layout({ title, children }) {
  const [name, setName] = useState();
  const [isOpen, openModal, closeModal] = useModal(false);
  useEffect(() => {
    const local = localStorage.getItem("nombre");
    setName(local);
  }, []);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={css.all}>
        <header>
          <button onClick={openModal}>x</button>
          <h1>ASIeR {name && `x ${name}`}</h1>
          <SideBar isOpen={isOpen} closeModal={closeModal} />
        </header>
        <div className={css.container}>{children}</div>
      </div>
    </>
  );
}
