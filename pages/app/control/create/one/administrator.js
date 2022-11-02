import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import css from 'styles/all.module.css'

export default function Administrator () {
  const rut = useRouter()
  const usuario = useRef()
  const key = useRef()
  async function handleSubmit () {
    const user = usuario.current.value
    const clave = key.current.value
    const obj = { user, key: clave }
    if (clave && user) {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      const prob = await res.json()
      if (prob.problema) {
        alert(prob.problema)
      } else if (prob.exit) {
        Cookies.set('admin', true)
        rut.push('/app')
      }
    } else if (!user) {
      alert('debes indicar un usuario')
    } else if (!clave) {
      alert('Debes indicar una clave')
    }
  }
  return (
    <div className={css.container}>
      <h2>Usuario</h2>
      <input ref={usuario} type='text' placeholder='usuario' />
      <br />
      <h2>Clave</h2>
      <input ref={key} type='password' placeholder='clave' />
      <br />
      <button
        className={css.but}
        onClick={e => {
          e.preventDefault()
          handleSubmit()
        }}
        formAction='submit'
      >
        Entrar
      </button>
    </div>
  )
}
