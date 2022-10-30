import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Calendario from "components/Calendario";
import Examenes from "components/Examenes";

const base64ToUint8Array = (base64) => {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(b64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export default function Index({ datos }) {
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
export async function getServerSideProps(context) {
  const ruta = process.env.DATA_URL;
  //const ruta ="http://localhost:3000"
  const res = await fetch(`${ruta}/api/fake`);
  const datos = await res.json();
  return {
    props: {
      datos,
    },
  };
}
