import getProps from 'components/funciones/getprops'
import { useEffect, useState } from 'react'
import base64ToUint8Array from 'components/funciones/base64'
import Calendario from 'components/Calendario'
import Examenes from 'components/Examenes'
import css from 'styles/all.module.css'

export default function Index ({ datos }) {
  const [isSubscribed, setIsSubscribed] = useState(false)
  // para saber si el sw está en el navegador
  const [registration, setRegistration] = useState(null)

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator
    ) {
      // solo funciona en el navegador
      navigator.serviceWorker.ready.then(reg => {
        reg.pushManager.getSubscription().then(sub => {
          if (
            sub
          ) {
            setIsSubscribed(true)
          }
        })
        setRegistration(reg)
      })
    }
  }, [])

  async function subscribeButtonOnClick () {
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(
        process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY
      )
    })
    const res = await fetch('/api/mongo/add-e', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sub)
    })
    await res.json()
    setIsSubscribed(true)
  }

  return (
    <div className={css.container}>
      {!registration && isSubscribed
        ? (
            ''
          )
        : (
          <button
            className={css.but} onClick={(e) => {
              e.preventDefault()
              subscribeButtonOnClick()
            }}
          >
            Quiero recibir Notificaciones
          </button>
          )}
      <br />
      <Calendario datos={datos} />
      <br />
      <h2>Examenes</h2>
      <Examenes espec='examen' datos={datos} />
      <h2>Tareas</h2>
      <Examenes espec='tarea' datos={datos} />
      <h2>Otros avisos</h2>
      <Examenes espec='otro' datos={datos} />
    </div>
  )
}
export async function getServerSideProps () {
  return await getProps()
}
