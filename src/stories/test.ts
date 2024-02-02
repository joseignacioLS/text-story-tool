import type { TStory } from "../components/types";

export const story: TStory = {
  title: "First Story",
  baseEntry: "Bienvenida",
  entries: [
    {
      id: "Bienvenida",
      desc: ["Bienvenido", "¿Empezamos?"],
      options: [
        { text: "Sí", nextEntry: "Puente" },
        { text: "No", nextEntry: "Abandono" },
      ],
    },
    {
      id: "Puente",
      desc: ["Así que te atreves", "Salta!"],
      options: [
        {
          text: "Sí",
          nextEntry: "Cueva",
          actions: [
            { key: "jumped", value: "true" },
            {
              key: "test",
              value: "0",
              conditions: [
                {
                  key: "jumped",
                  values: ["true"],
                },
              ],
            },
          ],
        },
        { text: "No", nextEntry: "Abandono" },
        {
          text: "Esta vez mejor bordeo",
          nextEntry: "Cueva",
          conditions: [
            {
              key: "jumped",
              values: ["true"],
            },
          ],
        },
      ],
    },
    {
      id: "Abandono",
      desc: ["Hasta nunca entonces"],
    },
    {
      id: "Cueva",
      desc: ["Llegas a una cueva", "¿Qué quieres hacer?"],
      options: [
        {
          text: "Entrar",
          nextEntry: "CuevaDentro",
        },
        { text: "Volver al puente", nextEntry: "Puente" },
      ],
    },
    {
      id: "CuevaDentro",
      desc: ["Un horrible trol duerme", "Vives feliz para siempre con él."],
      options: [
        {
          text: "Volver a jugar",
          nextEntry: "Bienvenida",
          actions: [
            {
              key: "memoryReset",
              value: "",
            },
          ],
        },
        { text: "Salir", nextEntry: "Abandono" },
      ],
    },
  ],
};
