import Link from 'next/link'
import css from 'styles/side.module.css'
export default function SideBar ({ isOpen, closeModal, admin }) {
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
        <h2>ASIeR</h2>
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
            <Link href='/app'><a>App</a></Link>
          </li>
          {(admin !== undefined)
            ? (
              <li onClick={e => closeAlgo(e)}>
                <Link href='/app/admin'><a>Admin</a></Link>
              </li>)
            : null}
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
            <Link href='/app/curso/encuestas'><a>Encuestas</a></Link>
          </li>
          <li onClick={e => closeAlgo(e)}>
            <Link href='/index.pdf'><a>Docs</a></Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
