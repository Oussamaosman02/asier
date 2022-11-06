export default function fake (req, res) {
  const users = [
    {
      fecha: 1668639599000,
      titulo: 'Tarea de ASO',
      descripcion:
        'Hay que hacer un script de bash con un bucle for para iterar sobre un array',
      tipo: 'tarea',
      coments: [
        { name: 'Javi', id: 387, body: 'Que pasa so mugrosos' },
        { name: 'Victor', id: 389, body: 'Aquí andamios' }
      ],
      id: 1
    },
    {
      fecha: 1668639599000,
      titulo: 'Examen de Redes',
      descripcion: 'Hay examen de dns \nEs con Maria Del Carmen las dos primeras',
      tipo: 'examen',
      coments: [
        { name: 'Lucia', id: 387, body: 'Que pasa so mugrosos' },
        { name: 'Blass', id: 389, body: 'Aquí andamios' }
      ],
      id: 2
    },
    {
      fecha: 1669849199000,
      titulo: 'Mi cumple',
      descripcion: 'Es mi cumple, espero que me compreis muchos regalos',
      tipo: 'otro',
      coments: [
        { name: 'Angel', id: 387, body: 'Que pasa so mugrosos' },
        { name: 'Ana', id: 389, body: 'Aquí andamios' }
      ],
      id: 3
    },
    {
      fecha: 1667429999000,
      titulo: 'Examen de aso',
      descripcion:
        'Examen de recuperación del primer tema de Aso.\nEs a las dos ultimas',
      tipo: 'examen',
      coments: [
        { name: 'Esteban', id: 387, body: 'Que pasa so mugrosos' },
        { name: 'Jorge', id: 389, body: 'Aquí andamios' }
      ],
      id: 4
    },
    {
      fecha: 1669589999000,
      fechaString: '2022-11-27',
      titulo: 'Tarea de GBD',
      descripcion:
        'Entregar el trabajo de base de datos\nReminder: tiene que ser con su prototipo',
      tipo: 'tarea',
      coments: [
        { name: 'amalio', id: 387, body: 'Que pasa so mugrosos' },
        { name: 'Manu', id: 389, body: 'Aquí andamios' }
      ],
      id: 5
    },
    {
      fecha: 1668639599000,
      fechaString: '2022-11-16',
      titulo: 'Cumple de Victor',
      descripcion: 'Es el cumple de Victor\nRegalale un mechero',
      tipo: 'otro',
      coments: [
        { name: 'Fede', id: 387, body: 'Que pasa so mugrosos' },
        { name: 'Rocio', id: 389, body: 'Aquí andamios' }
      ],
      id: 6
    },
    {
      fecha: 1668466799000,
      fechaString: '2022-11-14',
      titulo: 'Examen de SAD',
      descripcion:
        'Examen de SAD sobre firewalls y seguridad\nEs a las 3 del medio',
      tipo: 'examen',
      coments: [
        { name: 'Luis', id: 387, body: 'Que pasa so mugrosos' },
        { name: 'Quite', id: 389, body: 'Aquí andamios' }
      ],
      id: 7
    },
    {
      fecha: 1668466799000,
      fechaString: '2022-11-14',
      titulo: 'NOTAs',
      descripcion: 'Este dia dan las notas\nStay tuned',
      tipo: 'otro',
      coments: [
        { name: 'Marcos', id: 387, body: 'Que pasa so mugrosos' },
        { name: 'Alvaro', id: 389, body: 'Aquí andamios' }
      ],
      id: 8
    },
    {
      fecha: 1672466799000,
      fechaString: '2022-11-14',
      titulo: 'FIn de año',
      descripcion: 'Este es el último dia del año\nFeliz año nuevo!!',
      tipo: 'tarea',
      coments: [
        { name: 'Marta', id: 387, body: 'Que pasa so mugrosos' },
        { name: 'Alba', id: 389, body: 'Aquí andamios' }
      ],
      id: 9
    },
    {
      fecha: 1673466799000,
      fechaString: '2022-11-14',
      titulo: 'Insti',
      descripcion: 'Este dia empieza el insti',
      tipo: 'otro',
      coments: [
        { name: 'Lidia', id: 387, body: 'Que pasa so mugrosos' },
        { name: 'Fran', id: 389, body: 'Aquí andamios' }
      ],
      id: 10
    }
  ]
  res.status(200).json(users)
}
