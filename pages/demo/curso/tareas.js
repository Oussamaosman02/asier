import getProps from 'components/funciones/demo/getprops'
import handleEvento from 'components/funciones/demo/handle'
import React from 'react'
import css from 'styles/all.module.css'

export default function TareasPDemo ({ datos }) {
  const data = datos
  const datoss = data.sort(function (a, b) {
    if (a.fecha > b.fecha) {
      return 1
    }
    if (a.fecha < b.fecha) {
      return -1
    }
    return 0
  })

  return (
    <div className={css.container}>
      {datoss.map(dat => handleEvento(dat, 'tarea'))}
    </div>
  )
}

export async function getServerSideProps () {
  return await getProps()
}
