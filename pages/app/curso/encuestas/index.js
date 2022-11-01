import { getEncuesta } from "components/funciones/getAlgo";
import Link from "next/link";
import React from "react";

export default function EncuestasL({ datos }) {
  const data = datos;
  return (
    <div>
      <h1>Encuestas</h1>
      {data.map((dat) => {
        return (
          <div key={dat.id}>
            <h3>{dat.titulo}</h3>
            <p>{dat.descripcion}</p>
            <Link href={`/app/curso/encuestas/${dat.id}`}>
              <button>Ir a votar</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps() {
  return await getEncuesta();
}
