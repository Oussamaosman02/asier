import Link from 'next/link'
import { Fragment } from 'react'
import css from 'styles/comp.module.css'

export default function handleEvento (dat, tipo) {
  function numero (algo) {
    if (algo > 1) {
      return `${algo} comentarios`
    } else if (algo > 0 && algo < 2) {
      return '1 comentario'
    } else {
      return 'No hay comentarios'
    }
  }
  const descripcion = dat.descripcion.split('.  ')
  if (dat.tipo === tipo) {
    return (
      <Link key={dat.id} href={`/app/tarea/${dat.id}`}>
        <a className={css.maxexa}>
          <li className={css.exa}>
            <h4>{dat.titulo}</h4>
            <p>
              {descripcion.map((desc, i) => {
                return (
                  <Fragment key={desc + '' + i + dat.id + '' + dat.titulo}>
                    {desc}
                    <br />
                  </Fragment>
                )
              })}
            </p>
            <h5>{numero(dat.coments.length)}</h5>
            <h6>{new Date(dat.fecha).toLocaleDateString()}</h6>
          </li>
        </a>
      </Link>
    )
  } else if (!tipo) {
    return (
      <Link key={dat.id} href={`/app/tarea/${dat.id}`}>
        <a className={css.maxexa}>
          <li className={css.exa}>
            <h4>{dat.titulo}</h4>
            <p>
              {descripcion.map((desc, i) => {
                return (
                  <Fragment key={desc + '' + i + dat.id + '' + dat.titulo}>
                    {desc}
                    <br />
                  </Fragment>
                )
              })}
            </p>
            <h5>{numero(dat.coments.length)}</h5>
            <h6>{new Date(dat.fecha).toLocaleDateString()}</h6>
          </li>
        </a>
      </Link>
    )
  }
}
