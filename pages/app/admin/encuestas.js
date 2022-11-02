import { useRef, useState } from 'react'
import css from 'styles/all.module.css'

export default function Encuestas () {
  const [enc, setEnc] = useState([])
  const tit = useRef()
  const desc = useRef()
  const forma = useRef()
  const num = useRef()

  async function handleSubmit () {
    const algo = []
    const numer = num.current.valueAsNumber
    const iterar = [...Array(numer + 2).keys()]
    // con iterar sacamos un array con dos valores
    // más que en el número, debido al título
    // y la descripción
    const form = forma.current
    iterar.map(num => algo.push(form[num].value)
    )
    const obj = {}
    obj.titulo = algo[0]
    obj.descripcion = algo[1]
    obj.votos = []
    // damos la vuelta al array para
    // solo obtener los valores de
    // los nuevos inputs, es decir,
    // las opciones
    algo.reverse().map((alg, i) => {
      if (i < numer) {
        return obj.votos.push({ nombre: alg, votos: [] })
      } else {
        return null
      }
    })
    await fetch('/api/mongo/encuesta', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
  }
  return (
    <div className={css.container}>
      <input ref={num} type='number' />
      <button
        className={css.but}
        onClick={e => {
          e.preventDefault()
          const numeros = num.current.valueAsNumber
          setEnc([...Array(numeros).keys()])
        }}
      >
        Añadir Opciones
      </button>
      <h1>Encuestas</h1>
      <form
        ref={forma}
        className={css.container}
        onSubmit={e => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <h2>Título</h2>
        <input ref={tit} type='text' placeholder='titulo' />
        <h3>descripción</h3>
        <textarea ref={desc} placeholder='Descripción breve' />
        <hr />
        <h4>Opciones</h4>

        <hr />

        {enc.map((en, i) => {
          return (
            <input
              key={en + '' + i}
              type='text'
              placeholder={`Opcion ${i + 1}`}
            />
          )
        })}
      </form>
      <button
        className={css.but}
        onClick={e => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        Crear
      </button>
    </div>
  )
}
