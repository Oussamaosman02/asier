import React, { useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const inpnombre = useRef();
  const inpcontra = useRef();
  const rut = useRouter();

  function handleSubmit() {
    const name = inpnombre.current.value;
    const pass = inpcontra.current.value;

    if (name) {
      localStorage.setItem("nombre", name);
      rut.push("/demo");
    }
  }
  return (
    <>
      <Head>
        <title>ASIeR Ejemplo</title>
      </Head>
      <h1>ASIeR</h1>
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
        <h3>LogIn</h3>
        <div>
          <h4>Nombre</h4>
          <input ref={inpnombre} type="text" placeholder="nombre" />
        </div>
        <div>
          <h4>Contraseña</h4>
          <input ref={inpcontra} type="password" placeholder="contraseña" />
        </div>
        <button>Entrar</button>
      </form>
    </>
  );
}
