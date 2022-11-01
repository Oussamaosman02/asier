import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import verificar from "../components/funciones/verificar";
import Cookies from "js-cookie";
import css from "styles/all.module.css";

export default function Home() {
  const inpnombre = useRef();
  const inpcontra = useRef();
  const rut = useRouter();

  function handleSubmit() {
    const name = inpnombre.current.value;
    const pass = inpcontra.current.value;
    const si = verificar(pass);
    if (name && si) {
      localStorage.setItem("nombre", name);
      Cookies.set("inicio", true);
      rut.push("/app");
    } else if (!name) {
      alert("No has indicado tu nombre");
    } else if (!si) {
      alert("No es esa la contraseña");
    }
  }
  return (
    <div className={css.container}>
      <h2>La web/app de ASIR</h2>
      <hr />
      <Link href="/demo">
        <button className={css.but}>Demo</button>
      </Link>
      <form
        className={css.container}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h3>Log In</h3>
        <div className={css.container}>
          <h4>Nombre</h4>
          <input ref={inpnombre} type="text" placeholder="nombre" />
        </div>
        <div className={css.container}>
          <h4>Contraseña</h4>
          <input ref={inpcontra} type="password" placeholder="contraseña" />
        </div>
        <button className={css.but} formAction="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}
