import React, { Fragment } from "react";

export default function TareasP({ datos }) {
  const data = datos;
  const datoss = data.sort(function (a, b) {
    if (a.fecha > b.fecha) {
      return 1;
    }
    if (a.fecha < b.fecha) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

  function handle(dat) {
    const descripcion = dat.descripcion.split("\n");
    if (dat.tipo === "tarea") {
      return (
        <li key={dat.fecha + "" + dat.titulo}>
          <h4>{dat.titulo}</h4>
          <p>
            {descripcion.map((desc, i) => {
              return (
                <Fragment key={desc + "" + i + "" + dat.titulo}>
                  {desc}
                  <br />
                </Fragment>
              );
            })}
          </p>
          <h6>{new Date(dat.fecha).toLocaleDateString()}</h6>
        </li>
      );
    }
  }
  return <div>{datoss.map((dat) => handle(dat))}</div>;
}

export async function getServerSideProps() {
  const ruta = process.env.DATA_URL;
  const res = await fetch(`${ruta}/api/fake`);
  const datos = await res.json();
  return {
    props: {
      datos,
    },
  };
}
