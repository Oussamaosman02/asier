import Link from 'next/link'
import css from 'styles/side.module.css'
export default function SideBar ({ isOpen, closeModal }) {
  function closeAlgo (e) {
    e.preventDefault()
    e.stopPropagation()
    setTimeout(closeModal, 750)
  }
  let clases = []
  isOpen ? (clases = [css.modal, css.isopen]) : (clases = [css.modal])
  return (
    <div
      className={clases.join(' ')} onClick={
         closeModal
      }
    >
      <nav className={css.modalContainer} onClick={e => e.stopPropagation()}>
        <h1>ASIeR</h1>
        <hr />
        <button
          className={css.modalClose} onClick={
           closeModal
          }
        >
          X
        </button>
        <ul>
          <li onClick={e => closeAlgo(e)}>
            <Link href='/'><a>Home</a></Link>
          </li>
          <li onClick={e => closeAlgo(e)}>
            <Link href='/app'><a>App</a></Link>
          </li>
          <li onClick={e => closeAlgo(e)}>
            <Link href='/app/admin'><a>Admin</a></Link>
          </li>
          <li onClick={e => closeAlgo(e)}>
            <Link href='/app/curso/avisos'><a>Avisos</a></Link>
          </li>
          <li onClick={e => closeAlgo(e)}>
            <Link href='/app/curso/calendario'><a>Calendario</a></Link>
          </li>
          <li onClick={e => closeAlgo(e)}>
            <Link href='/app/curso/examenes'><a>Exámenes</a></Link>
          </li>
          <li onClick={e => closeAlgo(e)}>
            <Link href='/app/curso/tareas'><a>Tareas</a></Link>
          </li>
          <li onClick={e => closeAlgo(e)}>
            <Link href='/app/control/create/one/administrator'><a>Control</a></Link>
          </li>
          <li onClick={e => closeAlgo(e)}>
            <Link href='/app/curso/encuestas'><a>Encuesta</a></Link>
          </li>
          <li onClick={e => closeAlgo(e)}>
            <Link href='/demo'><a>Demo</a></Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
