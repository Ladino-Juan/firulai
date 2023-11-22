export const thingsToDo = [
  "Rocky muestra signos de malestar. ¿Cómo decides abordar la situación?",
  "Es hora de alimentar a tu perro, ¿cómo decides hacerlo?",
  "Rocky muestra signos de malestar leve. ¿Cómo decides abordar la situación?",
  "Rocky parece inquieto, ¿cómo lo tranquilizas?",
  "Rocky se ha comportado muy bien últimamente ¿Cómo lo recompensamos?",
  "Parece que se acerca una tormenta. ¿Qué deberías hacer?",
  "Rocky necesita hacer ejercicio. ¿Qué piensas hacer al respecto?",
  "Rocky quiere un juguete nuevo. ¿Qué piensas hacer al respecto?",
  "Es hora del baño. ¿Cuál opción es la mejor?",
  "Rocky debe quedarse solo en casa por un día. ¿Cuál sería la mejor opción?",
  "Rocky necesita un poco de ejercicio canino. ¿Cómo decides abordar la situación?",
  "Notamos a Rocky un poco obeso. ¿Qué decides hacer al respecto?",
  "Quiero que Rocky esté en una mejor forma física. ¿A qué deporte lo inscribimos?",
  "Rocky es muy sociable, unos niños quieren jugar con él. ¿Lo dejamos jugar?",
  "Max, el vecino de Rocky, quiere jugar. ¿Permitimos jugar a Rocky?"
];

export const decisions = [
  // Decision array for question 1
  [
    {
      idx: 1,
      description: "Llevar a Rocky inmediatamente al veterinario",
      happinessLevel: +3,
      healthLevel: +15,
      money: -20,
    },
    {
      idx: 1,
      description: "diagnosticar el problema por tu cuenta en casa.",
      happinessLevel: +3,
      healthLevel: +8,
      money: +0,
    },
    {
      idx: 1,
      description: "Suministrar medicamento recomendado por un amigo",
      happinessLevel: +0,
      healthLevel: -12,
      money: -7,
    },
    {
      idx: 1,
      description: "Esperar un poco para ver si los síntomas mejoran por sí solos.",
      happinessLevel: +5,
      healthLevel: -20,
      money: +10,
    },
    {
      idx: 1,
      description: "administrarle a Rocky medicamentos sin una opinión profesional.",
      happinessLevel: -0,
      healthLevel: -12,
      money: -10,
    },
  ],
  // Decision array for question 2
  [
    {
      idx: 2,
      description: "Prepararle un plato con comida balanceada",
      happinessLevel: +4,
      healthLevel: +15,
      money: -10
    },
    {
      idx: 2,
      description: "Darle una comida especial por su buen comportamiento",
      happinessLevel: +15,
      healthLevel: -5,
      money: -10
    },
    {
      idx: 2,
      description: "Compartir tú comida con Rocky",
      happinessLevel: +15,
      healthLevel: -9,
      money: +0
    },
    {
      idx: 2,
      description: "Dejarlo sin comer esta vez",
      happinessLevel: -10,
      healthLevel: -10,
      money: +10
    },
    {
      idx: 2,
      description: "Comprar un alimento premium",
      happinessLevel: +10,
      healthLevel: +10,
      money: -15
    }
  ],
  // Decision array for question 3
  [
    {
      idx: 3,
      description: "Llevarlo inmediatamente al veterinario",
      happinessLevel: +0,
      healthLevel: +15,
      money: -20
    },
    {
      idx: 3,
      description: "Investigar los síntomas en línea y tratar de aliviarlo",
      happinessLevel: +3,
      healthLevel: -8,
      money: +0
    },
    {
      idx: 3,
      description: "Suministrar medicamento recomendado por un amigo",
      happinessLevel: +0,
      healthLevel: +11,
      money: -8
    },
    {
      idx: 3,
      description: "Esperar por si los síntomas mejoran por sí solos",
      happinessLevel: +5,
      healthLevel: +0,
      money: +0
    },
    {
      idx: 3,
      description: "Comprarle medicamentos a Rocky sin una opinión profesional",
      happinessLevel: -2,
      healthLevel: -14,
      money: -10
    }
  ],
  // Decision array for question 4
  [
    {
      idx: 4,
      description: "Jugar usando su juguete favorito",
      happinessLevel: +5,
      healthLevel: +0,
      money: +0
    },
    {
      idx: 4,
      description: "Llevarlo a un paseo corto en coche",
      happinessLevel: +10,
      healthLevel: -5,
      money: -9
    },
    {
      idx: 4,
      description: "Darle un masaje relajante",
      happinessLevel: +4,
      healthLevel: -8,
      money: -5
    },
    {
      idx: 4,
      description: "Ignorar su inquietud por el momento",
      happinessLevel: -8,
      healthLevel: -13,
      money: +11
    },
    {
      idx: 4,
      description: "Acariciarlo y abrazarlo para calmarlo",
      happinessLevel: +10,
      healthLevel: -5,
      money: +0
    }
  ],
  // Decision array for question 5
  [
    {
      idx: 5,
      description: "Darle pollo como recompensa",
      happinessLevel: +9,
      healthLevel: -15,
      money: -3
    },
    {
      idx: 5,
      description: "Darle un paseo al parque",
      happinessLevel: +9,
      healthLevel: -5,
      money: -4
    },
    {
      idx: 5,
      description: "Darle croquetas como recompensa",
      happinessLevel: +5,
      healthLevel: -10,
      money: -5
    },
    {
      idx: 5,
      description: "Obsequiarle un rascador",
      happinessLevel: -4,
      healthLevel: +0,
      money: -10
    },
    {
      idx: 5,
      description: "Darle un paseo al río",
      happinessLevel: -7,
      healthLevel: +0,
      money: -2
    }
  ],
  // Decision array for question 6
  [
    {
      idx: 6,
      description: "Crear un refugio seguro para Rocky en casa",
      happinessLevel: +10,
      healthLevel: +0,
      money: -5
    },
    {
      idx: 6,
      description: "Utilizar música suave",
      happinessLevel: +8,
      healthLevel: +0,
      money: +0
    },
    {
      idx: 6,
      description: "Dejarlo dormir en tú cama",
      happinessLevel: +7,
      healthLevel: -8,
      money: -3
    },
    {
      idx: 6,
      description: "Consultar a un experto en comportamiento canino",
      happinessLevel: +5,
      healthLevel: +0,
      money: -10
    },
    {
      idx: 6,
      description: "darle afecto y caricias durante la tormenta",
      happinessLevel: +9,
      healthLevel: +0,
      money: +0
    }
  ],
  // Decision array for question 7
  [
    {
      idx: 7,
      description: "Dejar a Rocky en casa",
      happinessLevel: -5,
      healthLevel: -12,
      money: +0
    },
    {
      idx: 7,
      description: "Contratar a un entrenador personal",
      happinessLevel: +6,
      healthLevel: +13,
      money: -15
    },
    {
      idx: 7,
      description: "Crear circuito de obstáculos en casa",
      happinessLevel: +8,
      healthLevel: +10,
      money: -3
    },
    {
      idx: 7,
      description: "Inscribirlo en un programa de clases grupales de entrenamiento canino",
      happinessLevel: -15,
      healthLevel: +6,
      money: -15
    },
    {
      idx: 7,
      description: "Dedicar tiempo personal para entrenarlo",
      happinessLevel: +6,
      healthLevel: +8,
      money: +0
    }
  ],
  // Decision array for question 8
  [
    {
      idx: 8,
      description: "Comprar un juguete nuevo que salió al mercado",
      happinessLevel: +8,
      healthLevel: +0,
      money: -15
    },
    {
      idx: 8,
      description: "Fabricar un juguete casero",
      happinessLevel: +7,
      healthLevel: +0,
      money: -5
    },
    {
      idx: 8,
      description: "Consultar con un experto en mascotas",
      happinessLevel: +0,
      healthLevel: +0,
      money: -12
    },
    {
      idx: 8,
      description: "Reutilizar y modificar un juguete",
      happinessLevel: +10,
      healthLevel: +3,
      money: -3
    },
    {
      idx: 8,
      description: "No hacer nada al respecto",
      happinessLevel: -13,
      healthLevel: -13,
      money: +5
    }
  ],
  // Decision array for question 9
  [
    {
      idx: 9,
      description: "Baño en casa con abundante agua",
      happinessLevel: -12,
      healthLevel: +12,
      money: -5
    },
    {
      idx: 9,
      description: "Visitar una peluquería canina",
      happinessLevel: -7,
      healthLevel: +5,
      money: -15
    },
    {
      idx: 9,
      description: "No bañar a Rocky",
      happinessLevel: +3,
      healthLevel: -15,
      money: +0
    },
    {
      idx: 9,
      description: "Usar un spray de limpieza en seco",
      happinessLevel: +10,
      healthLevel: +5,
      money: -5
    },
    {
      idx: 9,
      description: "Bañar a Rocky afuera usando una manguera",
      happinessLevel: -20,
      healthLevel: +5,
      money: +3
    }
  ],
  // Decision array for question 10
  [
    {
      idx: 10,
      description: "Instalar cámaras de seguridad para monitorearlo",
      happinessLevel: +3,
      healthLevel: +10,
      money: -15
    },
    {
      idx: 10,
      description: "Contratar a un cuidador de mascotas para que lo cuide",
      happinessLevel: +10,
      healthLevel: +5,
      money: -9
    },
    {
      idx: 10,
      description: "Instalar dispensadores de comida",
      happinessLevel: +10,
      healthLevel: +4,
      money: -4
    },
    {
      idx: 10,
      description: "No hacer nada",
      happinessLevel: -10,
      healthLevel: -10,
      money: +5
    },
    {
      idx: 10,
      description: "Utilizar música relajante y dejar juguetes para Rocky",
      happinessLevel: -2,
      healthLevel: +8,
      money: +0
    }
  ],
  [
    {
      idx: 11,
      description: "Llevar a Rocky a un recreador canino",
      happinessLevel: +10,
      healthLevel: +10,
      money: -15
    },
    {
      idx: 11,
      description: "Permitir jugar a Rocky con perros extraños",
      happinessLevel: +9,
      healthLevel: -10,
      money: +5
    },
    {
      idx: 11,
      description: "Salir a trotar con Rocky en las mañanas",
      happinessLevel: +5,
      healthLevel: -10,
      money: +0
    },
    {
      idx: 11,
      description: "Mejor dejamos el ejercicio para después",
      happinessLevel: +0,
      healthLevel: -7,
      money: +10
    },
    {
      idx: 11,
      description: "Ingresamos a Rocky a una academia canina de velocidad",
      happinessLevel: +9,
      healthLevel: -12,
      money: -10
    }
  ],
  [
    {
      idx: 12,
      description: "Prepararle un plato con comida saludable",
      happinessLevel: -2,
      healthLevel: +6,
      money: -4
    },
    {
      idx: 12,
      description: "Ingresar a Rocky a una dieta estricta",
      happinessLevel: -5,
      healthLevel: +10,
      money: -5
    },
    {
      idx: 12,
      description: "¡Rocky se ve mejor gordito!",
      happinessLevel: +10,
      healthLevel: -9,
      money: +4
    },
    {
      idx: 12,
      description: "No alimentarlo hoy",
      happinessLevel: -5,
      healthLevel: -10,
      money: +10
    },
    {
      idx: 12,
      description: "Disminuir la cantidad de comida diaria",
      happinessLevel: -6,
      healthLevel: +9,
      money: +7
    }
  ],
  [
    {
      idx: 13,
      description: "Inscribir a Rocky a practicar natación canina",
      happinessLevel: -20,
      healthLevel: +9,
      money: -20
    },
    {
      idx: 13,
      description: "Disc Dog (Frisbee canino)",
      happinessLevel: +10,
      healthLevel: -10,
      money: +10
    },
    {
      idx: 13,
      description: "Agility (Agilidad)",
      happinessLevel: +12,
      healthLevel: +11,
      money: -8
    },
    {
      idx: 13,
      description: "Herding (Pastoreo)",
      happinessLevel: +20,
      healthLevel: +15,
      money: -12
    },
    {
      idx: 13,
      description: "Rocky no necesita deporte!",
      happinessLevel: -1,
      healthLevel: -11,
      money: +10
    }
  ],
  [
    {
      idx: 14,
      description: "Sí pero en nuestro jardín",
      happinessLevel: +5,
      healthLevel: +5,
      money: +0
    },
    {
      idx: 14,
      description: "Que ellos le den un paseo libremente",
      happinessLevel: +10,
      healthLevel: -8,
      money: -7
    },
    {
      idx: 14,
      description: "Darle un paseo a Rocky con los niños",
      happinessLevel: +5,
      healthLevel: +5,
      money: -2
    },
    {
      idx: 14,
      description: "Ignorar a los niños",
      happinessLevel: -2,
      healthLevel: -2,
      money: +5
    },
    {
      idx: 14,
      description: "No, mejor juego yo con él después",
      happinessLevel: +2,
      healthLevel: +5,
      money: +0
    }
  ],
  [
    {
      idx: 15,
      description: "Sí, observando a la lejanía",
      happinessLevel: +10,
      healthLevel: -5,
      money: +0
    },
    {
      idx: 15,
      description: "Sí, confiar en Rocky que no peleará ni se lastimará jugando",
      happinessLevel: +15,
      healthLevel: -10,
      money: +0
    },
    {
      idx: 15,
      description: "Jugar con Rocky y Max",
      happinessLevel: +10,
      healthLevel: -15,
      money: -2
    },
    {
      idx: 15,
      description: "No permitir a Rocky jugar con Max",
      happinessLevel: -3,
      healthLevel: -5,
      money: +0
    },
    {
      idx: 15,
      description: "Luego jugamos con Max",
      happinessLevel: -5,
      healthLevel: +5,
      money: +0
    }
  ]
 

];
