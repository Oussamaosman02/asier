import React from "react";

export default function IdnDemo({ datos }) {
  const { fecha, titulo, descripcion, coments } = datos;
  return (
    <div>
      <h1>{titulo}</h1>
      <h2>{new Date(fecha).toLocaleDateString()}</h2>
      <p>{descripcion}</p>
      <hr />
      <ul>
        {coments.map((com) => {
          return (
            <li key={com.id}>
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
  const ruta = process.env.DATA_URL;
  const res = await fetch(`${ruta}/api/fake`);
  const respu = await res.json();
  const datos = respu.find((ele) => ele.idn === JSON.parse(query.idn));
  return {
    props: {
      datos,
    },
  };
}
