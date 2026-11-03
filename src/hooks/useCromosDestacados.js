import { useMemo } from "react";
import { useRecurso } from "./useRecurso.js";
import { heroes as heroesRespaldo } from "../data/catalogo.js";

const DESTACADOS = [
  { id: "CV-041", mundo: "bosque", respaldo: 0 },
  { id: "CV-081", mundo: "orbita", respaldo: 1 },
  { id: "CV-001", mundo: "neon", respaldo: 2 },
];

function extraerCromo(respuesta) {
  const datos =
    respuesta?.cromo ??
    respuesta?.datos?.cromo ??
    respuesta?.data?.cromo ??
    respuesta?.datos?.data?.cromo ??
    respuesta?.datos ??
    respuesta?.data ??
    respuesta;
  return Array.isArray(datos) ? datos[0] : datos;
}

function textoMundoRespaldo(mundo) {
  return {
    bosque: "Bosque Eterno",
    orbita: "Estación Órbita",
    neon: "Ciudad Neón",
  }[mundo];
}

export function useCromosDestacados(mundos = []) {
  const cromo041 = useRecurso("/cromos/CV-041");
  const cromo081 = useRecurso("/cromos/CV-081");
  const cromo001 = useRecurso("/cromos/CV-001");
  const respuestas = [cromo041.datos, cromo081.datos, cromo001.datos];

  const cromos = useMemo(
    () =>
      DESTACADOS.map(({ id, mundo: mundoRespaldo, respaldo }, indice) => {
        const cromo = extraerCromo(respuestas[indice]);
        if (!cromo?.id) {
          return {
            ...heroesRespaldo[respaldo],
            id,
            mundo: mundoRespaldo,
            mundoNombre: textoMundoRespaldo(mundoRespaldo),
            holografico: mundoRespaldo === "neon",
          };
        }

        const idMundo =
          typeof cromo.mundo === "object" ? cromo.mundo.id : cromo.mundo;
        const mundo =
          mundos.find((item) => item.id === idMundo) ??
          mundos.find((item) => item.id === mundoRespaldo);

        return {
          ...cromo,
          id: cromo.id ?? id,
          mundo: idMundo ?? mundoRespaldo,
          mundoNombre: cromo.mundoNombre ?? mundo?.nombre ?? textoMundoRespaldo(mundoRespaldo),
        };
      }),
    [cromo041.datos, cromo081.datos, cromo001.datos, mundos],
  );

  return {
    cromos,
    cargando: cromo041.cargando || cromo081.cargando || cromo001.cargando,
    error: cromo041.error || cromo081.error || cromo001.error,
  };
}
