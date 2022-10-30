export default function fake(req, res) {
  const users = [
    {
      fecha: 1668639599000,
      titulo: "Tarea de ASO",
      descripcion:
        "Hay que hacer un script de bash con un bucle for para iterar sobre un array",
      tipo: "tarea",
    },
    {
      fecha: 1668639599000,
      titulo: "Examen de Redes",
      descripcion: "Hay examen de dns \nEs con soledad las dos primeras",
      tipo: "examen",
    },
    {
      fecha: 1669849199000,
      titulo: "Mi cumple",
      descripcion: "Es mi cumple, espero que me compreis muchos regalos",
      tipo: "otro",
    },
    {
      fecha: 1667429999000,
      titulo: "Examen de aso",
      descripcion:
        "Examen de recuperación del primer tema de Aso.\nEs a las dos ultimas",
      tipo: "examen",
    },
    {
      fecha: 1669589999000,
      fechaString: "2022-11-27",
      titulo: "Tarea",
      descripcion:
        "Entregar el trabajo de base de dato\nReminder: tiene que ser con su prototipo",
      tipo: "tarea",
    },
    {
      fecha: 1668639599000,
      fechaString: "2022-11-16",
      titulo: "Cumple del Charly",
      descripcion: "Es el cumple del charly\nRegalale un mechero",
      tipo: "otro",
    },
    {
      fecha: 1668466799000,
      fechaString: "2022-11-14",
      titulo: "Examen de SAD",
      descripcion:
        "Examen de SAD sobre firewalls y seguridad\nEs a las 3 del medio",
      tipo: "examen",
    },
    {
      fecha: 1668466799000,
      fechaString: "2022-11-14",
      titulo: "NOTAs",
      descripcion: "Este dia dan las notas\nSaty tuned",
      tipo: "otro",
    },
  ];
  res.status(200).json(users);
}
