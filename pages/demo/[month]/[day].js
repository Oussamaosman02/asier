import Link from "next/link";
import React, { Fragment } from "react";
import css from "styles/dia.module.css";
export default function Dia({ data, datos }) {
  const datoss = datos;
  const datas = data;
  const year = new Date().getFullYear();
  const monthName = new Intl.DateTimeFormat("es", { month: "long" }).format(
    new Date(year, datas.month - 1)
  );
  const tiempoMas = 86399000;
  const fechaActual =
    new Date(year, datas.month - 1, data.day).getTime() + tiempoMas;

  function handler(fecha, titulo, descripcion) {
    return (
      <div className={css.cosa} key={fecha + "" + titulo + "" + descripcion}>
        <h4>{titulo}</h4>
        <p>
          {descripcion.split("\n").map((desc, i) => {
            return (
              <div key={desc + "" + i + "" + titulo}>
                {desc}
                <br />
              </div>
            );
          })}
        </p>
        <h6 className={css.fecha}>{new Date(fecha).toLocaleDateString()}</h6>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <h1>
        {datas.day} de {monthName} del {datas.month > 12 ? year + 1 : year}
      </h1>
      <br />
      <h2>Eventos</h2>
      <div>
        {datoss.map(({ fecha, titulo, descripcion }) => {
          return fecha === fechaActual
            ? handler(fecha, titulo, descripcion)
            : "";
        })}
      </div>
      <Link href="/demo">
        <button>Volver</button>
      </Link>
    </div>
  );
}
export async function getServerSideProps(context) {
  const { query } = context;
  const ruta = process.env.DATA_URL;
  //const ruta ="http://localhost:3000"
  const res = await fetch(`${ruta}/api/fake`);
  const data = query;
  const datos = await res.json();
  return {
    props: {
      data,
      datos,
    },
  };
}
