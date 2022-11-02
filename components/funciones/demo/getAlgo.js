export async function getIdn (query) {
  const ruta = process.env.DATA_URL
  const res = await fetch(`${ruta}/api/fake`)
  const respu = await res.json()
  const datos = respu.find(ele => ele.idn === JSON.parse(query.idn))
  return {
    props: {
      datos
    }
  }
}
export async function getDay (query) {
  const ruta = process.env.DATA_URL
  const res = await fetch(`${ruta}/api/fake`)
  const respu = await res.json()

  const year = new Date().getFullYear()
  const tiempoMas = 86399000
  const fechaActual =
    new Date(year, query.month - 1, query.day).getTime() + tiempoMas

  // datos que devuelve
  const datos = respu.filter(fec => fec.fecha === fechaActual)
  const data = query

  console.log(datos)
  return {
    props: {
      data,
      datos
    }
  }
}
