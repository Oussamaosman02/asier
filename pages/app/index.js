import { useEffect, useState } from "react";
import Calendario from "components/Calendario";
import Examenes from "components/Examenes";
import getProps from "components/funciones/getprops";
import base64ToUint8Array from "components/funciones/base64";
import css from "styles/all.module.css";

export default function Index({ datos }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [registration, setRegistration] = useState(null);
  const [name, setName] = useState();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.workbox !== undefined
    ) {
      // run only in browser
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((sub) => {
          if (
            sub &&
            !(
              sub.expirationTime &&
              Date.now() > sub.expirationTime - 5 * 60 * 1000
            )
          ) {
            setIsSubscribed(true);
          }
        });
        setRegistration(reg);
      });
    }
  }, []);

  // read the name from localStorage
  useEffect(() => {
    setName(localStorage.getItem("nombre"));
  }, [name]);

  const subscribeButtonOnClick = async (e) => {
    e.preventDefault();
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(
        process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY
      ),
    });
    setIsSubscribed(true);
    const res = await fetch("/api/mongo/add-e", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(sub),
    });
    await res.json();
  };

  return (
    <div className={css.container}>
      {isSubscribed ? (
        ""
      ) : (
        <button className={css.but} onClick={subscribeButtonOnClick}>
          Quiero recibir Notificaciones
        </button>
      )}
      <br />
      <Calendario datos={datos} />
      <br />
      <h2>Examenes</h2>
      <Examenes espec="examen" datos={datos} />
      <h2>Tareas</h2>
      <Examenes espec="tarea" datos={datos} />
      <h2>Otros avisos</h2>
      <Examenes espec="otro" datos={datos} />
    </div>
  );
}
export async function getServerSideProps(context) {
  return await getProps();
}
