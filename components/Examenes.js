import React, { Fragment } from 'react'
import css from 'styles/all.module.css'

export default function Examenes ({ datos, espec }) {
  const data = datos.filter(ele => ele.fecha > new Date().getTime())
  const datoss = data.sort(function (a, b) {
    if (a.fecha > b.fecha) {
      return 1
    }
    if (a.fecha < b.fecha) {
      return -1
    }
    return 0
  })

  function handle (dat) {
    const descripcion = dat.descripcion.split('\n')
    if (dat.tipo === espec) {
      return (
        <li className={css.container} key={dat.id}>
          <h4>{dat.titulo}</h4>
          <p>
            {descripcion.map((desc, i) => {
              return (
                <Fragment key={desc + '' + i + '' + dat.id}>
                  {desc}
                  <br />
                </Fragment>
              )
            })}
          </p>
          <h6>{new Date(dat.fecha).toLocaleDateString()}</h6>
        </li>
      )
    }
  }
  return <div className={css.container}>{datoss.map(dat => handle(dat))}</div>
}
