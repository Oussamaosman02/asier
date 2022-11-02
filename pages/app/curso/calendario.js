import getProps from 'components/funciones/getprops'
import Link from 'next/link'
import React from 'react'
import css from 'styles/calendar.module.css'

export default function CalendarioP ({ datos }) {
  const respuesta = datos.reverse()
  const actualYear = new Date().getFullYear()
  const actualMonth = new Date().getMonth()
  const actualDay = new Date().getDate()
  const locale = 'es'
  const months = [
    actualMonth,
    actualMonth + 1,
    actualMonth + 2,
    actualMonth + 3,
    actualMonth + 4,
    actualMonth + 5,
    actualMonth + 6
  ]
  const intl = new Intl.DateTimeFormat(locale, { month: 'long' })
  const actualMonthName = mname => intl.format(new Date(actualYear, mname))
  const weekdays = [...Array(7).keys()]
  const intlWeekDays = new Intl.DateTimeFormat(locale, { weekday: 'short' })
  const weekdaynames = weekdays.map(weekdayIndex => {
    const weekdayname = intlWeekDays.format(new Date(2024, 0, weekdayIndex + 1))
    return weekdayname
  })
  const renderedWeekDays = weekdaynames.map((weekdayname, i) => {
    return <li key={i + weekdayname}>{weekdayname}</li>
  })
  const calendar = months.map(monthkey => {
    const monthname = intl.format(new Date(actualYear, monthkey))
    const nextMonthIndex = monthkey + 1
    const daysOfMonth = new Date(actualYear, nextMonthIndex, 0).getDate()
    const startsOn = new Date(actualYear, monthkey, 1).getDay()

    return {
      monthname,
      daysOfMonth,
      startsOn,
      monthkey
    }
  })

  function clases (day, index, daysOfMonth, monthname, startsOn) {
    const respuesa = []
    if (index + 1 < actualDay && monthname === actualMonthName(actualMonth)) {
      return css.anter
    }
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
          return respuesa.push(css.examen)
        } else if (
          day + 1 === dia &&
          monthname === actualMonthName(mes) &&
          tipo === 'tarea'
        ) {
          return respuesa.push(css.tarea)
        } else if (
          day + 1 === dia &&
          monthname === actualMonthName(mes) &&
          tipo === 'otro'
        ) {
          return respuesa.push(css.otro)
        } else {
          return null
        }
      })
      return respuesa.join(' ')
    }
  }

  return (
    <div className={css.cont}>
      {calendar.map(({ daysOfMonth, monthname, monthkey, startsOn }) => {
        const days = [...Array(daysOfMonth).keys()]
        const renderedDays = days.map((day, i) => (
          <li
            className={clases(day, i, daysOfMonth, monthname, startsOn)}
            style={
              i === 0
                ? { gridColumnStart: `${startsOn}` }
                : { color: 'royalblue' }
            }
            key={`${monthname}${day}`}
          >
            <Link href={`/app/${monthkey + 1}/${day + 1}`}>{day + 1}</Link>
          </li>
        ))
        return (
          <div className={css.calendar} key={monthname}>
            <h1>{monthname}</h1>
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
