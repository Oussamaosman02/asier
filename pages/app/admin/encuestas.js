import { map } from "next-pwa/cache";
import React, { useRef, useState } from "react";

export default function Encuestas() {
  const [enc, setEnc] = useState([]);
  const tit = useRef();
  const desc = useRef();
  const forma = useRef();
  const [messi, setMessi] = useState([]);
  const num = useRef();
  const encuesta = {
    titulo: "Hola",
    descripcion: "Esta es una descripción corta",
    votos: [
      {
        nombre: "opción uno",
        votos: ["manu"],
      },
      {
        nombre: "opción dos",
      },
    ],
  };
  async function handleSubmit() {
    let algo = [];
    const numer = num.current.valueAsNumber;
    const iterar = [...Array(numer + 2).keys()];
    const from = forma.current;
    iterar.map((num) => {
      algo.push(from[num].value);
    });
    const obj = {};
    obj.titulo = algo[0];
    obj.descripcion = algo[1];
    obj.votos = [];
    algo.reverse().map((alg, i) => {
      if (i < numer) {
        obj.votos.push({ nombre: alg, votos: [] });
      }
    });
    console.log(obj);
    const res = await fetch("/api/mongo/encuesta", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(obj),
    });
  }
  return (
    <div>
      <input ref={num} type="number" />
      <button
        onClick={(e) => {
          e.preventDefault();
          const numeros = num.current.valueAsNumber;
          setEnc([...Array(numeros).keys()]);
        }}
      >
        Añadir Opciones
      </button>
      <h1>Encuestas</h1>
      <h2>Título</h2>
      <form
        ref={forma}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input ref={tit} type="text" placeholder="titulo" />
        <h3>descripción</h3>
        <textarea ref={desc} placeholder="Descripción breve" />
        <hr />
        <h4>Opciones</h4>

        <hr />

        {enc.map((en, i) => {
          return (
            <input
              key={en + "" + i}
              type="text"
              placeholder={`Opcion ${i + 1}`}
            />
          );
        })}
      </form>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        Submit
      </button>
    </div>
  );
}
