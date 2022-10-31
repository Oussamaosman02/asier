import Link from "next/link";
import { Fragment } from "react";

export default function handleEvento(dat, tipo) {
  const descripcion = dat.descripcion.split(".  ");
  if (dat.tipo === tipo) {
    return (
      <Link key={dat.id} href={`/app/tarea/${dat.id}`}>
        <li>
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
          <h5>Hay {dat.coments.length} comentarios</h5>
          <h6>{new Date(dat.fecha).toLocaleDateString()}</h6>
        </li>
      </Link>
    );
  } else if (!tipo) {
    return (
      <Link key={dat.id} href={`/app/tarea/${dat.id}`}>
        <li>
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
          <h5>Hay {dat.coments.length} comentarios</h5>
          <h6>{new Date(dat.fecha).toLocaleDateString()}</h6>
        </li>
      </Link>
    );
  }
}
