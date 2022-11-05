import { useModal } from './funciones/useModal'
import SideBar from './SideBar'
import Head from 'next/head'
import css from 'styles/layout.module.css'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Link from 'next/link'
export default function Layout ({ children }) {
  const [isOpen, openModal, closeModal] = useModal(false)
  const admin = Cookies.get('admin')
  const name = Cookies.get('nombre')
  const rut = useRouter()
  if (name && rut.pathname === '/') {
    rut.push('/app')
  } else if (name) {
    return (
      <>
        <Head>
          <title>ASIeR</title>
        </Head>
        <div className={css.all}>
          <header>
            <button className={css.butop} onClick={openModal}>
              x
            </button>
            <h1>ASIeR {name && (<><span>x</span> {name}</>)}</h1>
            <SideBar admin={admin} inicio={name} isOpen={isOpen} closeModal={closeModal} />
          </header>
          <div className={css.container}>{children}</div>
        </div>
      </>
    )
  } else if (!name && rut.pathname === '/') {
    return (
      <>
        <Head>
          <title>ASIeR</title>
        </Head>
        <div className={css.all}>
          <header>
            <h1>ASIeR</h1>
          </header>
          <div className={css.container}>{children}</div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Head>
          <title>ASIeR</title>
        </Head>
        <div className={css.nolog}>
          <h1>Debes identificarte</h1>
          <Link href='/'>
            <button>Log In</button>
          </Link>
        </div>
      </>
    )
  }
}
