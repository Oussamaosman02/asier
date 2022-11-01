import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import verificar from "../components/funciones/verificar";
import Cookies from "js-cookie";

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
    <>
      <h2>La web/app de ASIR</h2>
      <hr />
      <Link href="/demo">
        <button>Demo</button>
      </Link>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h3>Log In</h3>
        <div>
          <h4>Nombre</h4>
          <input ref={inpnombre} type="text" placeholder="nombre" />
        </div>
        <div>
          <h4>Contraseña</h4>
          <input ref={inpcontra} type="password" placeholder="contraseña" />
        </div>
        <button formAction="submit">Entrar</button>
      </form>
    </>
  );
}
