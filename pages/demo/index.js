import { useEffect, useState } from "react";
import Link from "next/link";
import Calendario from "components/funciones/demo/Calendario";
import Examenes from "components/Examenes";
import getProps from "components/funciones/demo/getprops";
import base64ToUint8Array from "components/funciones/base64";

export default function IndexDemo({ datos }) {
  const datoss = datos;
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState(null);
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
            setSubscription(sub);
            setIsSubscribed(true);
          }
        });
        setRegistration(reg);
      });
    }
  }, []);

  //read the name from localStorage
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
    // TODO: you should call your API to save subscription data on server in order to send web push notification from server
    setSubscription(sub);
    setIsSubscribed(true);
    console.log("web push subscribed!");
    const messi = {};
    messi.endpoint = sub.endpoint;
    console.log(messi);
    localStorage.setItem("subs", JSON.stringify(sub));
  };

  return (
    <>
      {isSubscribed ? (
        ""
      ) : (
        <button onClick={subscribeButtonOnClick}>
          Quiero recibir Notificaciones
        </button>
      )}
      <br />
      <Link href="/demo/admin-demo">
        <button>Consola</button>
      </Link>
      <br />
      <Calendario datos={datoss} />
      <br />
      <h2>Examenes</h2>
      <Examenes espec="examen" datos={datoss} />
      <h2>Tareas</h2>
      <Examenes espec="tarea" datos={datoss} />
      <h2>Otros avisos</h2>
      <Examenes espec="otro" datos={datoss} />
    </>
  );
}
export async function getServerSideProps() {
  return await getProps();
}
