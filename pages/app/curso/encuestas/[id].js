import { getEncId } from 'components/funciones/getAlgo'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import css from 'styles/comp.module.css'

export default function EncuestasL ({ datos }) {
  const rut = useRouter()
  const { titulo, descripcion, votos, id } = datos
  const votol = votos
  async function handleVote (vot) {
    const nombre = Cookies.get('nombre')
    const obj = {
      titulo,
      descripcion,
      votos: votol
    }
    const existe = vot.votos.find(el => el === nombre)
    if (!existe && nombre) {
      alert('¡Has votado correctamente!')
      vot.votos.push(nombre)
      await fetch(`/api/mongo/encuesta/up/${id}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      rut.reload()
    } else if (existe) {
      alert('¡¡¡Solo se puede votar UNA VEZ!!!')
    } else if (!nombre) {
      alert('No sé quién eres...')
    }
  }
  return (
    <div key={id} className={css.enc}>
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
      <hr />
      {votol.map(vot => {
        return (
          <li className={css.exa} key={id + '' + vot.nombre}>
            <h4>{vot.nombre}</h4>
            <h5>Número de votos: {vot.votos.length}</h5>
            <button
              className={css.but}
              onClick={e => {
                e.preventDefault()
                handleVote(vot)
              }}
            >
              Votar!
            </button>
          </li>
        )
      })}
    </div>
  )
}

export async function getServerSideProps ({ query }) {
  return await getEncId(query)
}
