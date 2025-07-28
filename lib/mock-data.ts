export interface RouteSchedule {
  time: string
  route: string
  css: string
}

export interface BusLine {
  id: string
  name: string
  direction: string[]
  schedules: {
    weekday: {
      Ida: RouteSchedule[]
      Volta: RouteSchedule[]
    }
    saturday: {
      Ida: RouteSchedule[]
      Volta: RouteSchedule[]
    }
    sunday: {
      Ida: RouteSchedule[]
      Volta: RouteSchedule[]
    }
  }
  stops: string[]
  active: boolean
  popular: boolean
  farePrice: {
    ida: {
      from: string
      to: string
      price: string
    }
    volta: {
      from: string
      to: string
      price: string
    }
  }
}

export const busLines: BusLine[] = [
  {
  id: "250",
  name: "Conjunto Amélia Torres (Circular)",
  direction: ["Ida", "Volta"],
  schedules: {
    weekday: {
      Ida: [
        { time: "05:20", route: "Rota normal", css: "" },
        { time: "06:25", route: "Via Conjunto Laginha", css: "bg-amber-100 text-amber-800" },
        { time: "07:05", route: "Rota normal", css: "" },
        { time: "07:50", route: "Rota normal", css: "" },
        { time: "09:00", route: "Rota normal", css: "" },
        { time: "11:10", route: "Via Conjunto Laginha", css: "bg-amber-100 text-amber-800" },
        { time: "12:00", route: "Rota normal", css: "" },
        { time: "13:10", route: "Rota normal", css: "" },
        { time: "14:35", route: "Via Haver & Boecker", css: "bg-blue-100 text-blue-800" },
        { time: "15:10", route: "Rota normal", css: "" },
        { time: "16:00", route: "Via Conjunto Laginha", css: "bg-amber-100 text-amber-800" },
        { time: "17:10", route: "Via Haver & Boecker", css: "bg-blue-100 text-blue-800" },
        { time: "18:10", route: "Rota normal", css: "" },
        { time: "18:40", route: "Via Haver & Boecker", css: "bg-blue-100 text-blue-800" },
        { time: "19:40", route: "Rota normal", css: "" },
        { time: "20:40", route: "Rota normal", css: "" },
        { time: "21:45", route: "Rota normal", css: "" }
      ],
      Volta: [
        { time: "04:50", route: "Rota normal", css: "" },
        { time: "05:55", route: "Via Haver & Boecker", css: "bg-blue-100 text-blue-800" },
        { time: "06:30", route: "Via Haver & Boecker", css: "bg-blue-100 text-blue-800" },
        { time: "07:15", route: "Rota normal", css: "" },
        { time: "08:25", route: "Rota normal", css: "" },
        { time: "10:30", route: "Rota normal", css: "" },
        { time: "11:20", route: "Rota normal", css: "" },
        { time: "12:35", route: "Rota normal", css: "" },
        { time: "13:50", route: "Rota normal", css: "" },
        { time: "15:10", route: "Rota normal", css: "" },
        { time: "16:20", route: "Rota normal", css: "" },
        { time: "17:35", route: "Via Haver & Boecker", css: "bg-blue-100 text-blue-800" },
        { time: "18:00", route: "Rota normal", css: "" },
        { time: "19:10", route: "Rota normal", css: "" },
        { time: "20:10", route: "Rota normal", css: "" },
        { time: "21:10", route: "Rota normal", css: "" },
        { time: "22:15", route: "Rota normal", css: "" }
      ]
    },
    saturday: {
      Ida: [
        { time: "05:20", route: "Rota normal", css: "" },
        { time: "06:35", route: "Via Haver & Boecker", css: "bg-blue-100 text-blue-800" },
        { time: "08:10", route: "Rota normal", css: "" },
        { time: "10:15", route: "Rota normal", css: "" },
        { time: "12:30", route: "Rota normal", css: "" },
        { time: "14:10", route: "Rota normal", css: "" },
        { time: "15:30", route: "Rota normal", css: "" },
        { time: "17:00", route: "Rota normal", css: "" },
        { time: "18:40", route: "Via Haver & Boecker", css: "bg-blue-100 text-blue-800" }
      ],
      Volta: [
        { time: "05:00", route: "Rota normal", css: "" },
        { time: "05:55", route: "Via Haver & Boecker", css: "bg-blue-100 text-blue-800" },
        { time: "07:15", route: "Rota normal", css: "" },
        { time: "09:00", route: "Rota normal", css: "" },
        { time: "11:15", route: "Rota normal", css: "" },
        { time: "13:30", route: "Rota normal", css: "" },
        { time: "15:00", route: "Rota normal", css: "" },
        { time: "16:00", route: "Rota normal", css: "" },
        { time: "17:35", route: "Via Haver & Boecker", css: "bg-blue-100 text-blue-800" }
      ]
    },
    sunday: {
      Ida: [
        { time: "06:35", route: "Via Haver & Boecker", css: "bg-blue-100 text-blue-800" },
        { time: "08:10", route: "Rota normal", css: "" },
        { time: "18:40", route: "Rota normal", css: "" },
        { time: "20:10", route: "Rota normal", css: "" }
      ],
      Volta: [
        { time: "05:55", route: "Via Haver & Boecker", css: "bg-blue-100 text-blue-800" },
        { time: "07:35", route: "Rota normal", css: "" },
        { time: "17:35", route: "Via Haver & Boecker", css: "bg-blue-100 text-blue-800" },
        { time: "19:20", route: "Rota normal", css: "" }
      ]
    }
  },
  stops: [
    "Praça Amélia Torres",
    "Haver & Boecker",
    "Conjunto Laginha",
    "Rua Moacir Pereira Ciroca",
    "Santo Antônio"
  ],
  active: true,
  popular: true,
  farePrice: {
    ida: {
      from: "Praça Amélia Torres",
      to: "Santo Antônio",
      price: "R$ 4,50"
    },
    volta: {
      from: "Santo Antônio",
      to: "Praça Amélia Torres",
      price: "R$ 4,50"
    }
  }
},
  {
    id: "101",
    name: "Centro - Zona Norte",
    direction: ["Ida", "Volta"],
    schedules: {
      weekday: {
        Ida: [
          { time: "05:00", route: "Via Rodoviária", css: "bg-red-100 text-red-800" },
          { time: "06:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "07:00", route: "Via Rodoviária", css: "bg-red-100 text-red-800" },
          { time: "08:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "09:00", route: "Via Shopping", css: "bg-green-100 text-green-800" },
          { time: "10:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "11:00", route: "Via Rodoviária", css: "bg-red-100 text-red-800" },
          { time: "12:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "13:00", route: "Via Shopping", css: "bg-green-100 text-green-800" },
          { time: "14:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "15:00", route: "Via Rodoviária", css: "bg-red-100 text-red-800" },
          { time: "16:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "17:00", route: "Via Shopping", css: "bg-green-100 text-green-800" },
          { time: "18:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "19:00", route: "Via Rodoviária", css: "bg-red-100 text-red-800" },
        ],
        Volta: [
          { time: "05:30", route: "Via Universidade", css: "bg-indigo-100 text-indigo-800" },
          { time: "06:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "07:30", route: "Via Universidade", css: "bg-indigo-100 text-indigo-800" },
          { time: "08:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "09:30", route: "Via Shopping", css: "bg-green-100 text-green-800" },
          { time: "10:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "11:30", route: "Via Universidade", css: "bg-indigo-100 text-indigo-800" },
          { time: "12:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "13:30", route: "Via Shopping", css: "bg-green-100 text-green-800" },
          { time: "14:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "15:30", route: "Via Universidade", css: "bg-indigo-100 text-indigo-800" },
          { time: "16:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "17:30", route: "Via Shopping", css: "bg-green-100 text-green-800" },
          { time: "18:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "19:30", route: "Via Universidade", css: "bg-indigo-100 text-indigo-800" },
        ],
      },
      saturday: {
        Ida: [
          { time: "06:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "07:30", route: "Via Rodoviária", css: "bg-red-100 text-red-800" },
          { time: "09:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "10:30", route: "Via Shopping", css: "bg-green-100 text-green-800" },
          { time: "12:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "13:30", route: "Via Rodoviária", css: "bg-red-100 text-red-800" },
          { time: "15:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "16:30", route: "Via Shopping", css: "bg-green-100 text-green-800" },
          { time: "18:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
        ],
        Volta: [
          { time: "06:30", route: "Via Universidade", css: "bg-indigo-100 text-indigo-800" },
          { time: "08:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "09:30", route: "Via Universidade", css: "bg-indigo-100 text-indigo-800" },
          { time: "11:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "12:30", route: "Via Shopping", css: "bg-green-100 text-green-800" },
          { time: "14:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "15:30", route: "Via Universidade", css: "bg-indigo-100 text-indigo-800" },
          { time: "17:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "18:30", route: "Via Shopping", css: "bg-green-100 text-green-800" },
        ],
      },
      sunday: {
        Ida: [
          { time: "07:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "09:00", route: "Via Rodoviária", css: "bg-red-100 text-red-800" },
          { time: "11:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "13:00", route: "Via Shopping", css: "bg-green-100 text-green-800" },
          { time: "15:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "17:00", route: "Via Rodoviária", css: "bg-red-100 text-red-800" },
        ],
        Volta: [
          { time: "07:30", route: "Via Universidade", css: "bg-indigo-100 text-indigo-800" },
          { time: "09:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "11:30", route: "Via Universidade", css: "bg-indigo-100 text-indigo-800" },
          { time: "13:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "15:30", route: "Via Shopping", css: "bg-green-100 text-green-800" },
          { time: "17:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
        ],
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
    farePrice: {
      ida: {
        from: "Terminal Central",
        to: "Zona Norte",
        price: "R$ 5,00",
      },
      volta: {
        from: "Zona Norte",
        to: "Terminal Central",
        price: "R$ 5,00",
      },
    },
  },
  {
    id: "205",
    name: "Aeroporto - Centro",
    direction: ["Ida", "Volta"],
    schedules: {
      weekday: {
        Ida: [
          { time: "06:00", route: "Via Rodovia", css: "bg-orange-100 text-orange-800" },
          { time: "08:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "10:00", route: "Via Rodovia", css: "bg-orange-100 text-orange-800" },
          { time: "12:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "14:00", route: "Via Rodovia", css: "bg-orange-100 text-orange-800" },
          { time: "16:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "18:00", route: "Via Rodovia", css: "bg-orange-100 text-orange-800" },
          { time: "20:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
        ],
        Volta: [
          { time: "06:30", route: "Via Industrial", css: "bg-gray-100 text-gray-800" },
          { time: "08:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "10:30", route: "Via Industrial", css: "bg-gray-100 text-gray-800" },
          { time: "12:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "14:30", route: "Via Industrial", css: "bg-gray-100 text-gray-800" },
          { time: "16:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "18:30", route: "Via Industrial", css: "bg-gray-100 text-gray-800" },
          { time: "20:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
        ],
      },
      saturday: {
        Ida: [
          { time: "07:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "09:00", route: "Via Rodovia", css: "bg-orange-100 text-orange-800" },
          { time: "11:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "13:00", route: "Via Rodovia", css: "bg-orange-100 text-orange-800" },
          { time: "15:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "17:00", route: "Via Rodovia", css: "bg-orange-100 text-orange-800" },
          { time: "19:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
        ],
        Volta: [
          { time: "07:30", route: "Via Industrial", css: "bg-gray-100 text-gray-800" },
          { time: "09:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "11:30", route: "Via Industrial", css: "bg-gray-100 text-gray-800" },
          { time: "13:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "15:30", route: "Via Industrial", css: "bg-gray-100 text-gray-800" },
          { time: "17:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "19:30", route: "Via Industrial", css: "bg-gray-100 text-gray-800" },
        ],
      },
      sunday: {
        Ida: [
          { time: "08:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "10:00", route: "Via Rodovia", css: "bg-orange-100 text-orange-800" },
          { time: "12:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "14:00", route: "Via Rodovia", css: "bg-orange-100 text-orange-800" },
          { time: "16:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "18:00", route: "Via Rodovia", css: "bg-orange-100 text-orange-800" },
        ],
        Volta: [
          { time: "08:30", route: "Via Industrial", css: "bg-gray-100 text-gray-800" },
          { time: "10:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "12:30", route: "Via Industrial", css: "bg-gray-100 text-gray-800" },
          { time: "14:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "16:30", route: "Via Industrial", css: "bg-gray-100 text-gray-800" },
          { time: "18:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
        ],
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
    farePrice: {
      ida: {
        from: "Aeroporto Internacional",
        to: "Terminal Central",
        price: "R$ 6,50",
      },
      volta: {
        from: "Terminal Central",
        to: "Aeroporto Internacional",
        price: "R$ 6,50",
      },
    },
  },
  {
    id: "302",
    name: "Vila Esperança - Terminal",
    direction: ["Ida", "Volta"],
    schedules: {
      weekday: {
        Ida: [
          { time: "05:15", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "06:15", route: "Via Mercado", css: "bg-teal-100 text-teal-800" },
          { time: "07:15", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "08:15", route: "Via Mercado", css: "bg-teal-100 text-teal-800" },
          { time: "09:15", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "10:15", route: "Via Mercado", css: "bg-teal-100 text-teal-800" },
          { time: "11:15", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "12:15", route: "Via Mercado", css: "bg-teal-100 text-teal-800" },
          { time: "13:15", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "14:15", route: "Via Mercado", css: "bg-teal-100 text-teal-800" },
          { time: "15:15", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "16:15", route: "Via Mercado", css: "bg-teal-100 text-teal-800" },
          { time: "17:15", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "18:15", route: "Via Mercado", css: "bg-teal-100 text-teal-800" },
        ],
        Volta: [
          { time: "05:45", route: "Via Escola", css: "bg-pink-100 text-pink-800" },
          { time: "06:45", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "07:45", route: "Via Escola", css: "bg-pink-100 text-pink-800" },
          { time: "08:45", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "09:45", route: "Via Escola", css: "bg-pink-100 text-pink-800" },
          { time: "10:45", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "11:45", route: "Via Escola", css: "bg-pink-100 text-pink-800" },
          { time: "12:45", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "13:45", route: "Via Escola", css: "bg-pink-100 text-pink-800" },
          { time: "14:45", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "15:45", route: "Via Escola", css: "bg-pink-100 text-pink-800" },
          { time: "16:45", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "17:45", route: "Via Escola", css: "bg-pink-100 text-pink-800" },
          { time: "18:45", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
        ],
      },
      saturday: {
        Ida: [
          { time: "06:15", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "07:45", route: "Via Mercado", css: "bg-teal-100 text-teal-800" },
          { time: "09:15", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "10:45", route: "Via Mercado", css: "bg-teal-100 text-teal-800" },
          { time: "12:15", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "13:45", route: "Via Mercado", css: "bg-teal-100 text-teal-800" },
          { time: "15:15", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "16:45", route: "Via Mercado", css: "bg-teal-100 text-teal-800" },
          { time: "18:15", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
        ],
        Volta: [
          { time: "06:45", route: "Via Escola", css: "bg-pink-100 text-pink-800" },
          { time: "08:15", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "09:45", route: "Via Escola", css: "bg-pink-100 text-pink-800" },
          { time: "11:15", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "12:45", route: "Via Escola", css: "bg-pink-100 text-pink-800" },
          { time: "14:15", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "15:45", route: "Via Escola", css: "bg-pink-100 text-pink-800" },
          { time: "17:15", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "18:45", route: "Via Escola", css: "bg-pink-100 text-pink-800" },
        ],
      },
      sunday: {
        Ida: [
          { time: "07:15", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "09:15", route: "Via Mercado", css: "bg-teal-100 text-teal-800" },
          { time: "11:15", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "13:15", route: "Via Mercado", css: "bg-teal-100 text-teal-800" },
          { time: "15:15", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "17:15", route: "Via Mercado", css: "bg-teal-100 text-teal-800" },
        ],
        Volta: [
          { time: "07:45", route: "Via Escola", css: "bg-pink-100 text-pink-800" },
          { time: "09:45", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "11:45", route: "Via Escola", css: "bg-pink-100 text-pink-800" },
          { time: "13:45", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "15:45", route: "Via Escola", css: "bg-pink-100 text-pink-800" },
          { time: "17:45", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
        ],
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
    farePrice: {
      ida: {
        from: "Vila Esperança",
        to: "Terminal Central",
        price: "R$ 4,25",
      },
      volta: {
        from: "Terminal Central",
        to: "Vila Esperança",
        price: "R$ 4,25",
      },
    },
  },
  {
    id: "150",
    name: "Jardim das Flores - Shopping",
    direction: ["Ida", "Volta"],
    schedules: {
      weekday: {
        Ida: [
          { time: "06:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "07:00", route: "Via Avenida", css: "bg-cyan-100 text-cyan-800" },
          { time: "08:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "09:00", route: "Via Avenida", css: "bg-cyan-100 text-cyan-800" },
          { time: "10:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "11:00", route: "Via Avenida", css: "bg-cyan-100 text-cyan-800" },
          { time: "12:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "13:00", route: "Via Avenida", css: "bg-cyan-100 text-cyan-800" },
          { time: "14:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "15:00", route: "Via Avenida", css: "bg-cyan-100 text-cyan-800" },
          { time: "16:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "17:00", route: "Via Avenida", css: "bg-cyan-100 text-cyan-800" },
          { time: "18:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
        ],
        Volta: [
          { time: "06:30", route: "Via Clínica", css: "bg-emerald-100 text-emerald-800" },
          { time: "07:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "08:30", route: "Via Clínica", css: "bg-emerald-100 text-emerald-800" },
          { time: "09:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "10:30", route: "Via Clínica", css: "bg-emerald-100 text-emerald-800" },
          { time: "11:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "12:30", route: "Via Clínica", css: "bg-emerald-100 text-emerald-800" },
          { time: "13:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "14:30", route: "Via Clínica", css: "bg-emerald-100 text-emerald-800" },
          { time: "15:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "16:30", route: "Via Clínica", css: "bg-emerald-100 text-emerald-800" },
          { time: "17:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "18:30", route: "Via Clínica", css: "bg-emerald-100 text-emerald-800" },
        ],
      },
      saturday: {
        Ida: [
          { time: "07:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "08:30", route: "Via Avenida", css: "bg-cyan-100 text-cyan-800" },
          { time: "10:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "11:30", route: "Via Avenida", css: "bg-cyan-100 text-cyan-800" },
          { time: "13:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "14:30", route: "Via Avenida", css: "bg-cyan-100 text-cyan-800" },
          { time: "16:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "17:30", route: "Via Avenida", css: "bg-cyan-100 text-cyan-800" },
        ],
        Volta: [
          { time: "07:30", route: "Via Clínica", css: "bg-emerald-100 text-emerald-800" },
          { time: "09:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "10:30", route: "Via Clínica", css: "bg-emerald-100 text-emerald-800" },
          { time: "12:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "13:30", route: "Via Clínica", css: "bg-emerald-100 text-emerald-800" },
          { time: "15:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "16:30", route: "Via Clínica", css: "bg-emerald-100 text-emerald-800" },
          { time: "18:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
        ],
      },
      sunday: {
        Ida: [
          { time: "08:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "10:00", route: "Via Avenida", css: "bg-cyan-100 text-cyan-800" },
          { time: "12:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "14:00", route: "Via Avenida", css: "bg-cyan-100 text-cyan-800" },
          { time: "16:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "18:00", route: "Via Avenida", css: "bg-cyan-100 text-cyan-800" },
        ],
        Volta: [
          { time: "08:30", route: "Via Clínica", css: "bg-emerald-100 text-emerald-800" },
          { time: "10:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "12:30", route: "Via Clínica", css: "bg-emerald-100 text-emerald-800" },
          { time: "14:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "16:30", route: "Via Clínica", css: "bg-emerald-100 text-emerald-800" },
          { time: "18:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
        ],
      },
    },
    stops: ["Jardim das Flores", "Avenida das Palmeiras", "Clínica Médica", "Banco Central", "Shopping Center"],
    active: true,
    popular: false,
    farePrice: {
      ida: {
        from: "Jardim das Flores",
        to: "Shopping Center",
        price: "R$ 3,75",
      },
      volta: {
        from: "Shopping Center",
        to: "Jardim das Flores",
        price: "R$ 3,75",
      },
    },
  },
  {
    id: "400",
    name: "Bairro Alto - Centro",
    direction: ["Ida", "Volta"],
    schedules: {
      weekday: {
        Ida: [
          { time: "05:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "06:30", route: "Via Igreja", css: "bg-violet-100 text-violet-800" },
          { time: "07:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "08:30", route: "Via Igreja", css: "bg-violet-100 text-violet-800" },
          { time: "09:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "10:30", route: "Via Igreja", css: "bg-violet-100 text-violet-800" },
          { time: "11:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "12:30", route: "Via Igreja", css: "bg-violet-100 text-violet-800" },
          { time: "13:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "14:30", route: "Via Igreja", css: "bg-violet-100 text-violet-800" },
          { time: "15:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "16:30", route: "Via Igreja", css: "bg-violet-100 text-violet-800" },
          { time: "17:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "18:30", route: "Via Igreja", css: "bg-violet-100 text-violet-800" },
        ],
        Volta: [
          { time: "06:00", route: "Via Prefeitura", css: "bg-slate-100 text-slate-800" },
          { time: "07:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "08:00", route: "Via Prefeitura", css: "bg-slate-100 text-slate-800" },
          { time: "09:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "10:00", route: "Via Prefeitura", css: "bg-slate-100 text-slate-800" },
          { time: "11:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "12:00", route: "Via Prefeitura", css: "bg-slate-100 text-slate-800" },
          { time: "13:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "14:00", route: "Via Prefeitura", css: "bg-slate-100 text-slate-800" },
          { time: "15:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "16:00", route: "Via Prefeitura", css: "bg-slate-100 text-slate-800" },
          { time: "17:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "18:00", route: "Via Prefeitura", css: "bg-slate-100 text-slate-800" },
          { time: "19:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
        ],
      },
      saturday: {
        Ida: [
          { time: "06:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "08:00", route: "Via Igreja", css: "bg-violet-100 text-violet-800" },
          { time: "09:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "11:00", route: "Via Igreja", css: "bg-violet-100 text-violet-800" },
          { time: "12:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "14:00", route: "Via Igreja", css: "bg-violet-100 text-violet-800" },
          { time: "15:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "17:00", route: "Via Igreja", css: "bg-violet-100 text-violet-800" },
          { time: "18:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
        ],
        Volta: [
          { time: "07:00", route: "Via Prefeitura", css: "bg-slate-100 text-slate-800" },
          { time: "08:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "10:00", route: "Via Prefeitura", css: "bg-slate-100 text-slate-800" },
          { time: "11:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "13:00", route: "Via Prefeitura", css: "bg-slate-100 text-slate-800" },
          { time: "14:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "16:00", route: "Via Prefeitura", css: "bg-slate-100 text-slate-800" },
          { time: "17:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "19:00", route: "Via Prefeitura", css: "bg-slate-100 text-slate-800" },
        ],
      },
      sunday: {
        Ida: [
          { time: "07:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "09:30", route: "Via Igreja", css: "bg-violet-100 text-violet-800" },
          { time: "11:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "13:30", route: "Via Igreja", css: "bg-violet-100 text-violet-800" },
          { time: "15:30", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "17:30", route: "Via Igreja", css: "bg-violet-100 text-violet-800" },
        ],
        Volta: [
          { time: "08:00", route: "Via Prefeitura", css: "bg-slate-100 text-slate-800" },
          { time: "10:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "12:00", route: "Via Prefeitura", css: "bg-slate-100 text-slate-800" },
          { time: "14:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
          { time: "16:00", route: "Via Prefeitura", css: "bg-slate-100 text-slate-800" },
          { time: "18:00", route: "Via Centro", css: "bg-blue-100 text-blue-800" },
        ],
      },
    },
    stops: ["Bairro Alto", "Igreja Matriz", "Prefeitura", "Correios", "Terminal Central"],
    active: true,
    popular: false,
    farePrice: {
      ida: {
        from: "Bairro Alto",
        to: "Terminal Central",
        price: "R$ 4,00",
      },
      volta: {
        from: "Terminal Central",
        to: "Bairro Alto",
        price: "R$ 4,00",
      },
    },
  },
]

// Função para obter o próximo horário baseado no dia atual
export function getNextSchedule(line: BusLine) {
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
    .map((schedule) => {
      const [hours, minutes] = schedule.time.split(":").map(Number)
      return { time: schedule.time, value: hours * 100 + minutes }
    })
    .sort((a, b) => a.value - b.value)

  const nextSchedule = allSchedules.find((schedule) => schedule.value > currentTime)
  return nextSchedule ? nextSchedule.time : allSchedules[0]?.time || todaySchedules.Ida[0]?.time
}

// Função para obter informações detalhadas do próximo ônibus
// export function getNextBusInfo(line: BusLine) {
//   const now = new Date()
//   const dayOfWeek = now.getDay()
//   const currentTime = now.getHours() * 100 + now.getMinutes()

//   let scheduleType: "weekday" | "saturday" | "sunday"
//   if (dayOfWeek === 0) {
//     scheduleType = "sunday"
//   } else if (dayOfWeek === 6) {
//     scheduleType = "saturday"
//   } else {
//     scheduleType = "weekday"
//   }

//   const todaySchedules = line.schedules[scheduleType]

//   // Combinar horários com direção
//   const allSchedulesWithDirection = [
//     ...todaySchedules.Ida.map((schedule) => ({ ...schedule, direction: "Ida" })),
//     ...todaySchedules.Volta.map((schedule) => ({ ...schedule, direction: "Volta" })),
//   ]
//     .map((schedule) => {
//       const [hours, minutes] = schedule.time.split(":").map(Number)
//       return {
//         ...schedule,
//         value: hours * 100 + minutes,
//         scheduledTime: schedule.time,
//       }
//     })
//     .sort((a, b) => a.value - b.value)

//   // Encontrar próximo horário
//   let nextSchedule = allSchedulesWithDirection.find((schedule) => schedule.value > currentTime)

//   // Se não encontrou, pegar o primeiro do dia seguinte
//   if (!nextSchedule) {
//     nextSchedule = allSchedulesWithDirection[0]
//   }

//   if (!nextSchedule) return null

//   // Calcular minutos até o próximo ônibus
//   const nextTime = nextSchedule.value
//   let minutesUntil: number

//   if (nextTime > currentTime) {
//     // Mesmo dia
//     const currentHours = Math.floor(currentTime / 100)
//     const currentMinutes = currentTime % 100
//     const nextHours = Math.floor(nextTime / 100)
//     const nextMinutes = nextTime % 100

//     const currentTotalMinutes = currentHours * 60 + currentMinutes
//     const nextTotalMinutes = nextHours * 60 + nextMinutes

//     minutesUntil = nextTotalMinutes - currentTotalMinutes
//   } else {
//     // Próximo dia (após meia-noite)
//     const currentHours = Math.floor(currentTime / 100)
//     const currentMinutes = currentTime % 100
//     const nextHours = Math.floor(nextTime / 100)
//     const nextMinutes = nextTime % 100

//     const currentTotalMinutes = currentHours * 60 + currentMinutes
//     const nextTotalMinutes = (nextHours + 24) * 60 + nextMinutes

//     minutesUntil = nextTotalMinutes - currentTotalMinutes
//   }

//   return {
//     direction: nextSchedule.direction,
//     scheduledTime: nextSchedule.scheduledTime,
//     route: nextSchedule.route,
//     css: nextSchedule.css,
//     minutesUntil: Math.max(0, minutesUntil),
//   }
// }
import type { BusLine } from "@/types"

export function getNextBusInfo(line: BusLine, direction: "Ida" | "Volta") {
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

  const todaySchedules = line.schedules[scheduleType][direction]

  const parsedSchedules = todaySchedules
    .map((schedule) => {
      const [hours, minutes] = schedule.time.split(":").map(Number)
      return {
        ...schedule,
        direction,
        value: hours * 100 + minutes,
        scheduledTime: schedule.time,
      }
    })
    .sort((a, b) => a.value - b.value)

  let nextSchedule = parsedSchedules.find((schedule) => schedule.value > currentTime)

  // Se não encontrou, pegar o primeiro do dia seguinte (mesma direção)
  if (!nextSchedule) {
    nextSchedule = parsedSchedules[0]
  }

  if (!nextSchedule) return null

  const nextTime = nextSchedule.value
  let minutesUntil: number

  const currentHours = Math.floor(currentTime / 100)
  const currentMinutes = currentTime % 100
  const nextHours = Math.floor(nextTime / 100)
  const nextMinutes = nextTime % 100

  const currentTotalMinutes = currentHours * 60 + currentMinutes
  const nextTotalMinutes =
    nextTime > currentTime
      ? nextHours * 60 + nextMinutes
      : (nextHours + 24) * 60 + nextMinutes

  minutesUntil = nextTotalMinutes - currentTotalMinutes

  return {
    direction: nextSchedule.direction,
    scheduledTime: nextSchedule.scheduledTime,
    route: nextSchedule.route,
    css: nextSchedule.css,
    minutesUntil: Math.max(0, minutesUntil),
  }
}


export function getDayTypeLabel() {
  const dayOfWeek = new Date().getDay()
  if (dayOfWeek === 0) return "Domingo"
  if (dayOfWeek === 6) return "Sábado"
  return "Dia Útil"
}
