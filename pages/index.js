import React, { useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import css from 'styles/indice.module.css'

export default function Home () {
  const inpnombre = useRef()
  const inpcontra = useRef()
  const rut = useRouter()

  async function handleSubmit () {
    const name = inpnombre.current.value
    const pass = inpcontra.current.value
    if (name && pass) {
      await fetch('/api/auth/name', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ name, pass })
      }).then((res) => {
        res.status === 401 ? console.error('hay un problema') : rut.push('/app')
      })
    } else if (!name) {
      alert('No has indicado tu nombre')
    } else if (!pass) {
      alert('Pon una contraseña')
    }
  }
  return (
    <div className={css.container}>
      <h2>La <span>web</span>/<span>app</span> de ASIR</h2>
      <hr />
      <Link href='/demo'>
        <button className={css.but}>Demo</button>
      </Link>
      <form
        className={css.form}
        onSubmit={e => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <h3>Log In</h3>
        <div className={css.disp}>
          <h4>Nombre</h4>
          <input ref={inpnombre} type='text' placeholder='nombre' />
        </div>
        <div className={css.disp}>
          <h4>Contraseña</h4>
          <input ref={inpcontra} type='password' placeholder='contraseña' />
        </div>
        <button className={css.but}>
          Entrar
        </button>
      </form>
    </div>
  )
}
