import { getIdn } from "components/funciones/getAlgo";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import css from "styles/all.module.css";

export default function Idn({ datos }) {
  const rut = useRouter();
  const [name, setName] = useState();
  const comentario = useRef();
  const { fecha, fechaString, titulo, descripcion, coments, id } = datos;
  useEffect(() => {
    setName(localStorage.getItem("nombre"));
  }, []);
  async function publicar() {
    const texto = comentario.current.value.replace("\n", ".  ");
    const obj = {};
    obj.fecha = fecha;
    obj.fechaString = fechaString;
    obj.titulo = titulo;
    obj.descripcion = descripcion;
    obj.coments = coments;
    const nuevo = {};
    nuevo.name = name;
    nuevo.body = texto;
    if (name && texto) {
      obj.coments.push(nuevo);
      const res = await fetch(`/api/mongo/coment/${id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      rut.reload();
    } else {
      console.error("error");
    }
  }
  return (
    <div className={css.container}>
      <h1>{titulo}</h1>
      <h2>{new Date(fecha).toLocaleDateString()}</h2>
      <p>{descripcion}</p>
      <hr />
      <form
        className={css.container}
        onSubmit={(e) => {
          e.preventDefault();
          publicar();
        }}
      >
        <h4>Añadir comentario</h4>
        <textarea ref={comentario} placeholder="tu comentario va aquí" />
        <button
          className={css.but}
          onClick={(e) => {
            e.preventDefault();
            publicar();
          }}
        >
          Publicar
        </button>
      </form>
      <hr />
      <ul className={css.container}>
        {coments.map((com) => {
          return (
            <li key={com.name + "" + com.body}>
              <h4>{com.name}</h4>
              <p>{com.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  return await getIdn(query);
}
