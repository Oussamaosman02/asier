import getProps from 'components/funciones/getprops'
import Link from 'next/link'
import css from 'styles/calendar.module.css'

export default function CalendarioP ({ datos }) {
  const respuesta = datos.reverse()
  // obtenemos las fechas actuales y el idioma
  const actualYear = new Date().getFullYear()
  const actualMonth = new Date().getMonth()
  const actualDay = new Date().getDate()
  const locale = 'es'
  // renderizamos los siguientes 6 meses
  const months = [
    actualMonth,
    actualMonth + 1,
    actualMonth + 2,
    actualMonth + 3,
    actualMonth + 4,
    actualMonth + 5,
    actualMonth + 6
  ]
  // indicamos que el nombre del mes sea completo
  const intl = new Intl.DateTimeFormat(locale, { month: 'long' })
  // función para sacar el nombre del mes
  const actualMonthName = mname => intl.format(new Date(actualYear, mname))
  // dias de la semana
  const weekdays = [...Array(7).keys()]
  // el nombre de los dias de la semana será abreviado
  const intlWeekDays = new Intl.DateTimeFormat(locale, { weekday: 'short' })
  // sacamos el día de la semana usando como referencia un
  // mes que enpiece en lunes
  const weekdaynames = weekdays.map(weekdayIndex => {
    const weekdayname = intlWeekDays.format(new Date(2024, 0, weekdayIndex + 1))
    return weekdayname
  })
  // pintamos los días de la semana
  const renderedWeekDays = weekdaynames.map((weekdayname, i) => {
    return <li key={i + weekdayname}>{weekdayname}</li>
  })
  // calendario
  const calendar = months.map(monthkey => {
    // nombre de mes
    const monthname = actualMonthName(monthkey)
    // sacamos el siguiente mes
    const nextMonthIndex = monthkey + 1
    // sacamos el día 0 del siguiente mes
    // el día 0 es el último día del mes anterior
    const daysOfMonth = new Date(actualYear, nextMonthIndex, 0).getDate()
    // sacamos el día de la semana en la que empieza dicho mes
    const startsOn = new Date(actualYear, monthkey, 1).getDay()
    // devolvemos los valores
    return {
      monthname,
      daysOfMonth,
      startsOn,
      monthkey
    }
  })

  function clases (day, index, monthname) {
    // array de clases
    const nuevasClases = []
    // si el día ya ha pasado devolvemos la clase anter(anterior)
    if (index + 1 < actualDay && monthname === actualMonthName(actualMonth)) {
      return css.anter
    }
    // si tenemos los datos
    if (respuesta) {
      respuesta.map(res => {
        const dia = new Date(res.fecha).getDate()
        const mes = new Date(res.fecha).getMonth()
        const tipo = res.tipo
        if (
          day + 1 === dia &&
          monthname === actualMonthName(mes) &&
          tipo === 'examen'
        ) {
          return nuevasClases.push(css.examen)
        } else if (
          day + 1 === dia &&
          monthname === actualMonthName(mes) &&
          tipo === 'tarea'
        ) {
          return nuevasClases.push(css.tarea)
        } else if (
          day + 1 === dia &&
          monthname === actualMonthName(mes) &&
          tipo === 'otro'
        ) {
          return nuevasClases.push(css.otro)
        } else {
          return null
        }
      })
      return nuevasClases.join(' ')
    }
  }

  return (
    <div className={css.cont}>
      {calendar.map(({ daysOfMonth, monthname, monthkey, startsOn }) => {
        // array con los días del mes (empieza en 0)
        const days = [...Array(daysOfMonth).keys()]
        // días a renderizar
        const renderedDays = days.map((day, i) => (
          <li
            className={clases(day, i, monthname)}
            style={
              i === 0
                ? { gridColumnStart: `${startsOn}` }
                : { color: 'royalblue' }
            }
            key={`${monthname}${day}`}
          >
            <Link href={`/app/${monthkey + 1}/${day + 1}`}><a>{day + 1}</a></Link>
          </li>
        ))
        return (
          <div className={css.calendar} key={monthname}>
            <h2>{monthname}</h2>
            <ol>
              {renderedWeekDays}
              {renderedDays}
            </ol>
          </div>
        )
      })}
    </div>
  )
}

export async function getServerSideProps () {
  return await getProps()
}
