import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import css from 'styles/admin.module.css'

export default function Encuestas () {
  const [enc, setEnc] = useState([])
  const tit = useRef()
  const desc = useRef()
  const forma = useRef()
  const num = useRef()
  const rut = useRouter()
  async function handleSubmit (e) {
    e.preventDefault()
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

    rut.push('/app/curso/encuestas')
  }
  return (
    <div className={css.container}>
      <div className={css.encu}>
        <input ref={num} type='number' placeholder='Número de opciones' />
        <button
          className={css.but}
          onClick={e => {
            e.preventDefault()
            const numeros = num.current.valueAsNumber
            if (numeros > 0) {
              setEnc([...Array(numeros).keys()])
            } else {
              alert('Selecciona algun número')
            }
          }}
        >
          Añadir Opciones
        </button>
      </div>
      <h2>Encuestas</h2>
      <form
        ref={forma}
        className={css.forma}
        onSubmit={e => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <h3>Título</h3>
        <input ref={tit} type='text' placeholder='titulo' />
        <h4>descripción</h4>
        <textarea ref={desc} placeholder='Descripción breve' />
        <hr />
        <h5>Opciones</h5>
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
        onClick={(e) =>
          handleSubmit(e)}
      >
        Crear
      </button>
    </div>
  )
}
