import { useEffect, useState } from 'react'
import { useModal } from './funciones/useModal'
import SideBar from './SideBar'
import Cookies from 'js-cookie'
import Head from 'next/head'
import css from 'styles/layout.module.css'
export default function Layout ({ children }) {
  const [name, setName] = useState()
  const [isOpen, openModal, closeModal] = useModal(false)
  useEffect(() => {
    const local = localStorage.getItem('nombre')
    if (local) {
      Cookies.set('inicio', true)
    }
    setName(local)
  }, [])
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
          <h1>ASIeR {name && `x ${name}`}</h1>
          <SideBar isOpen={isOpen} closeModal={closeModal} />
        </header>
        <div className={css.container}>{children}</div>
      </div>
    </>
  )
}
