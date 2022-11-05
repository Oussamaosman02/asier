import Link from 'next/link'
import { Fragment } from 'react'
import css from 'styles/comp.module.css'

export default function handleEvento (dat, tipo) {
  const descripcion = dat.descripcion.split('\n')
  if (dat.tipo === tipo) {
    return (
      <Link key={dat.id} href={`/demo/tarea/${dat.id}`}>
        <a className={css.maxexa}>
          <li className={css.exa}>
            <h4>{dat.titulo}</h4>
            <p>
              {descripcion.map((desc, i) => {
                return (
                  <Fragment key={desc + '' + i + '' + dat.titulo}>
                    {desc}
                    <br />
                  </Fragment>
                )
              })}
            </p>
            <h5>Hay {dat.coments.length} comentarios</h5>
            <h6>{new Date(dat.fecha).toLocaleDateString()}</h6>
          </li>
        </a>
      </Link>
    )
  } else if (!tipo) {
    return (
      <Link key={dat.id} href={`/demo/tarea/${dat.id}`}>
        <a className={css.maxexa}>
          <li className={css.exa}>
            <h4>{dat.titulo}</h4>
            <p>
              {descripcion.map((desc, i) => {
                return (
                  <Fragment key={desc + '' + i + '' + dat.titulo}>
                    {desc}
                    <br />
                  </Fragment>
                )
              })}
            </p>
            <h5>Hay {dat.coments.length} comentarios</h5>
            <h6>{new Date(dat.fecha).toLocaleDateString()}</h6>
          </li>
        </a>
      </Link>
    )
  }
}
