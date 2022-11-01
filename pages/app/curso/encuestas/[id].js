import { getEncId } from "components/funciones/getAlgo";
import { useRouter } from "next/router";
import React from "react";
import css from "styles/all.module.css";

export default function EncuestasL({ datos }) {
  const rut = useRouter();
  const { titulo, descripcion, votos, id } = datos;
  const votol = votos;
  async function handleVote(vot) {
    const nombre = localStorage.getItem("nombre");
    const obj = {
      titulo,
      descripcion,
      votos: votol,
    };
    const existe = vot.votos.find((el) => el === nombre);
    if (!existe && nombre) {
      alert("ya has votado!");
      vot.votos.push(nombre);
      const res = await fetch(`/api/mongo/encuesta/up/${id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      rut.reload();
    } else if (existe) {
      alert("ya has votado esta opción");
    } else if (!nombre) {
      alert("No has actualizado tu nombre, no se quien eres");
    }
  }
  return (
    <div key={id} className={css.container}>
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
      <hr />
      {votol.map((vot) => {
        return (
          <li className={css.container} key={id + "" + vot.nombre}>
            <h4>{vot.nombre}</h4>
            <h5>{vot.votos.length}</h5>
            <button
              className={css.but}
              onClick={(e) => {
                e.preventDefault();
                handleVote(vot);
              }}
            >
              Votar
            </button>
          </li>
        );
      })}
    </div>
  );
}

export async function getServerSideProps({ query }) {
  return await getEncId(query);
}
