export const busLines = [
  {
    id: "250",
    name: "Conjunto Amélia Torres (Circular)",
    direction: ["Ida", "Volta"],
    schedules: {
      weekday: {
        Ida: [
          "05:30",
          "06:30",
          "07:30",
          "08:30",
          "09:30",
          "10:30",
          "11:30",
          "12:00",
          "13:30",
          "14:30",
          "15:30",
          "16:30",
          "17:30",
          "18:00",
          "19:00",
        ],
        Volta: [
          "06:00",
          "07:00",
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "12:30",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "18:30",
          "19:30",
        ],
      },
      saturday: {
        Ida: ["06:00", "07:30", "09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"],
        Volta: ["06:30", "08:00", "09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30"],
      },
      sunday: {
        Ida: ["07:00", "09:00", "11:00", "13:00", "15:00", "17:00"],
        Volta: ["07:30", "09:30", "11:30", "13:30", "15:30", "17:30"],
      },
    },
    stops: [
      "Terminal Central",
      "Avenida Brasil",
      "Rua das Acácias",
      "Praça da Bandeira",
      "Escola Municipal",
      "Posto de Saúde",
      "Mercado Central",
      "Conjunto Amélia Torres",
    ],
    active: true,
    popular: true,
  },
  {
    id: "101",
    name: "Centro - Zona Norte",
    direction: ["Ida", "Volta"],
    schedules: {
      weekday: {
        Ida: [
          "05:00",
          "06:00",
          "07:00",
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
        ],
        Volta: [
          "05:30",
          "06:30",
          "07:30",
          "08:30",
          "09:30",
          "10:30",
          "11:30",
          "12:30",
          "13:30",
          "14:30",
          "15:30",
          "16:30",
          "17:30",
          "18:30",
          "19:30",
        ],
      },
      saturday: {
        Ida: ["06:00", "07:30", "09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"],
        Volta: ["06:30", "08:00", "09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30"],
      },
      sunday: {
        Ida: ["07:00", "09:00", "11:00", "13:00", "15:00", "17:00"],
        Volta: ["07:30", "09:30", "11:30", "13:30", "15:30", "17:30"],
      },
    },
    stops: [
      "Terminal Central",
      "Rua Principal",
      "Shopping Center",
      "Hospital Regional",
      "Universidade",
      "Bairro Novo",
      "Zona Norte",
    ],
    active: true,
    popular: true,
  },
  {
    id: "205",
    name: "Aeroporto - Centro",
    direction: ["Ida", "Volta"],
    schedules: {
      weekday: {
        Ida: ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"],
        Volta: ["06:30", "08:30", "10:30", "12:30", "14:30", "16:30", "18:30", "20:30"],
      },
      saturday: {
        Ida: ["07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00"],
        Volta: ["07:30", "09:30", "11:30", "13:30", "15:30", "17:30", "19:30"],
      },
      sunday: {
        Ida: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
        Volta: ["08:30", "10:30", "12:30", "14:30", "16:30", "18:30"],
      },
    },
    stops: [
      "Aeroporto Internacional",
      "Rodovia Principal",
      "Distrito Industrial",
      "Centro Comercial",
      "Terminal Central",
    ],
    active: true,
    popular: true,
  },
  {
    id: "302",
    name: "Vila Esperança - Terminal",
    direction: ["Ida", "Volta"],
    schedules: {
      weekday: {
        Ida: [
          "05:15",
          "06:15",
          "07:15",
          "08:15",
          "09:15",
          "10:15",
          "11:15",
          "12:15",
          "13:15",
          "14:15",
          "15:15",
          "16:15",
          "17:15",
          "18:15",
        ],
        Volta: [
          "05:45",
          "06:45",
          "07:45",
          "08:45",
          "09:45",
          "10:45",
          "11:45",
          "12:45",
          "13:45",
          "14:45",
          "15:45",
          "16:45",
          "17:45",
          "18:45",
        ],
      },
      saturday: {
        Ida: ["06:15", "07:45", "09:15", "10:45", "12:15", "13:45", "15:15", "16:45", "18:15"],
        Volta: ["06:45", "08:15", "09:45", "11:15", "12:45", "14:15", "15:45", "17:15", "18:45"],
      },
      sunday: {
        Ida: ["07:15", "09:15", "11:15", "13:15", "15:15", "17:15"],
        Volta: ["07:45", "09:45", "11:45", "13:45", "15:45", "17:45"],
      },
    },
    stops: [
      "Vila Esperança",
      "Escola Estadual",
      "Posto Policial",
      "Mercado Municipal",
      "Centro da Cidade",
      "Terminal Central",
    ],
    active: true,
    popular: false,
  },
  {
    id: "150",
    name: "Jardim das Flores - Shopping",
    direction: ["Ida", "Volta"],
    schedules: {
      weekday: {
        Ida: [
          "06:00",
          "07:00",
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
        ],
        Volta: [
          "06:30",
          "07:30",
          "08:30",
          "09:30",
          "10:30",
          "11:30",
          "12:30",
          "13:30",
          "14:30",
          "15:30",
          "16:30",
          "17:30",
          "18:30",
        ],
      },
      saturday: {
        Ida: ["07:00", "08:30", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30"],
        Volta: ["07:30", "09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"],
      },
      sunday: {
        Ida: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
        Volta: ["08:30", "10:30", "12:30", "14:30", "16:30", "18:30"],
      },
    },
    stops: ["Jardim das Flores", "Avenida das Palmeiras", "Clínica Médica", "Banco Central", "Shopping Center"],
    active: true,
    popular: false,
  },
  {
    id: "400",
    name: "Bairro Alto - Centro",
    direction: ["Ida", "Volta"],
    schedules: {
      weekday: {
        Ida: [
          "05:30",
          "06:30",
          "07:30",
          "08:30",
          "09:30",
          "10:30",
          "11:30",
          "12:30",
          "13:30",
          "14:30",
          "15:30",
          "16:30",
          "17:30",
          "18:30",
        ],
        Volta: [
          "06:00",
          "07:00",
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
        ],
      },
      saturday: {
        Ida: ["06:30", "08:00", "09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30"],
        Volta: ["07:00", "08:30", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00"],
      },
      sunday: {
        Ida: ["07:30", "09:30", "11:30", "13:30", "15:30", "17:30"],
        Volta: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
      },
    },
    stops: ["Bairro Alto", "Igreja Matriz", "Prefeitura", "Correios", "Terminal Central"],
    active: true,
    popular: false,
  },
]

// Função para obter o próximo horário baseado no dia atual
export function getNextSchedule(line: any) {
  const now = new Date()
  const dayOfWeek = now.getDay() // 0 = domingo, 6 = sábado
  const currentTime = now.getHours() * 100 + now.getMinutes()

  let scheduleType: "weekday" | "saturday" | "sunday"
  if (dayOfWeek === 0) {
    scheduleType = "sunday"
  } else if (dayOfWeek === 6) {
    scheduleType = "saturday"
  } else {
    scheduleType = "weekday"
  }

  const todaySchedules = line.schedules[scheduleType]
  const allSchedules = [...todaySchedules.Ida, ...todaySchedules.Volta]
    .map((time) => {
      const [hours, minutes] = time.split(":").map(Number)
      return { time, value: hours * 100 + minutes }
    })
    .sort((a, b) => a.value - b.value)

  const nextSchedule = allSchedules.find((schedule) => schedule.value > currentTime)
  return nextSchedule ? nextSchedule.time : allSchedules[0]?.time || todaySchedules.Ida[0]
}

// Função para obter informações detalhadas do próximo ônibus
export function getNextBusInfo(line: any) {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const currentTime = now.getHours() * 100 + now.getMinutes()

  let scheduleType: "weekday" | "saturday" | "sunday"
  if (dayOfWeek === 0) {
    scheduleType = "sunday"
  } else if (dayOfWeek === 6) {
    scheduleType = "saturday"
  } else {
    scheduleType = "weekday"
  }

  const todaySchedules = line.schedules[scheduleType]

  // Combinar horários com direção
  const allSchedulesWithDirection = [
    ...todaySchedules.Ida.map((time: string) => ({ time, direction: "Ida" })),
    ...todaySchedules.Volta.map((time: string) => ({ time, direction: "Volta" })),
  ]
    .map((schedule) => {
      const [hours, minutes] = schedule.time.split(":").map(Number)
      return {
        ...schedule,
        value: hours * 100 + minutes,
        scheduledTime: schedule.time,
      }
    })
    .sort((a, b) => a.value - b.value)

  // Encontrar próximo horário
  let nextSchedule = allSchedulesWithDirection.find((schedule) => schedule.value > currentTime)

  // Se não encontrou, pegar o primeiro do dia seguinte
  if (!nextSchedule) {
    nextSchedule = allSchedulesWithDirection[0]
  }

  if (!nextSchedule) return null

  // Calcular minutos até o próximo ônibus
  const nextTime = nextSchedule.value
  let minutesUntil: number

  if (nextTime > currentTime) {
    // Mesmo dia
    const currentHours = Math.floor(currentTime / 100)
    const currentMinutes = currentTime % 100
    const nextHours = Math.floor(nextTime / 100)
    const nextMinutes = nextTime % 100

    const currentTotalMinutes = currentHours * 60 + currentMinutes
    const nextTotalMinutes = nextHours * 60 + nextMinutes

    minutesUntil = nextTotalMinutes - currentTotalMinutes
  } else {
    // Próximo dia (após meia-noite)
    const currentHours = Math.floor(currentTime / 100)
    const currentMinutes = currentTime % 100
    const nextHours = Math.floor(nextTime / 100)
    const nextMinutes = nextTime % 100

    const currentTotalMinutes = currentHours * 60 + currentMinutes
    const nextTotalMinutes = (nextHours + 24) * 60 + nextMinutes

    minutesUntil = nextTotalMinutes - currentTotalMinutes
  }

  return {
    direction: nextSchedule.direction,
    scheduledTime: nextSchedule.scheduledTime,
    minutesUntil: Math.max(0, minutesUntil),
  }
}

export function getDayTypeLabel() {
  const dayOfWeek = new Date().getDay()
  if (dayOfWeek === 0) return "Domingo"
  if (dayOfWeek === 6) return "Sábado"
  return "Dia Útil"
}
