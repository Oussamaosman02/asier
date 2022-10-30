import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useModal } from "./funciones/useModal";
import SideBar from "./SideBar";
import css from "styles/layout.module.css";
export default function Layout({ title, children }) {
  const [name, setName] = useState();
  useEffect(() => {
    setName(localStorage.getItem("nombre"));
  }, [name]);
  const [isOpen, openModal, closeModal] = useModal(false);
  useEffect(() => {
    closeModal;
  }, [closeModal]);
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
