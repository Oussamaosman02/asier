import Link from "next/link";
import React from "react";
import css from "styles/side.module.css";
export default function SideBar({ isOpen, closeModal }) {
  function closeAlgo(e) {
    e.preventDefault();
    e.stopPropagation();
    setTimeout(closeModal, 750);
  }
  return (
    <article className={css.modal} onClick={closeModal}>
      {isOpen ? <span /> : ""}
      <div className={css.modalContainer} onClick={(e) => e.stopPropagation()}>
        <h1>ASIeR</h1>
        <hr />
        <button className={css.modalClose} onClick={closeModal}>
          X
        </button>
        <ul>
          <li onClick={(e) => closeAlgo(e)}>
            <Link href="/">Home</Link>
          </li>
          <li onClick={(e) => closeAlgo(e)}>
            <Link href="/demo">Demo</Link>
          </li>
          <li onClick={(e) => closeAlgo(e)}>
            <Link href="/demo/admin-demo">Admin</Link>
          </li>
          <li onClick={(e) => closeAlgo(e)}>
            <Link href="/demo/curso/avisos">Avisos</Link>
          </li>
          <li onClick={(e) => closeAlgo(e)}>
            <Link href="/demo/curso/calendario">Calendario</Link>
          </li>
          <li onClick={(e) => closeAlgo(e)}>
            <Link href="/demo/curso/examenes">Exámenes</Link>
          </li>
          <li onClick={(e) => closeAlgo(e)}>
            <Link href="/demo/curso/tareas">Tareas</Link>
          </li>
        </ul>
      </div>
    </article>
  );
}
