import { useMemo } from "react";
import { useRecurso } from "./useRecurso.js";
import { heroes as heroesRespaldo } from "../data/catalogo.js";

const DESTACADOS = [
  { mundo: "bosque", numero: 41, respaldo: 0 },
  { mundo: "orbita", numero: 81, respaldo: 1 },
  { mundo: "neon", numero: 1, respaldo: 2 },
];

function obtenerMundo(respuesta) {
  return respuesta?.mundo ?? respuesta?.datos?.mundo ?? respuesta?.datos ?? respuesta;
}

export function useCromosDestacados() {
  const bosque = useRecurso("/mundos/bosque");
  const orbita = useRecurso("/mundos/orbita");
  const neon = useRecurso("/mundos/neon");
  const cromos = useMemo(
    () =>
      DESTACADOS.map(({ mundo, numero, respaldo }, indice) => {
        const respuestas = [bosque.datos, orbita.datos, neon.datos];
        const datos = obtenerMundo(respuestas[indice]);
        const cromo = datos?.cromos?.find(
          (item) => Number(item.numero) === numero,
        );
        return cromo ?? {
          ...heroesRespaldo[respaldo],
          mundo,
          mundoNombre:
            mundo === "bosque"
              ? "Bosque Eterno"
              : mundo === "orbita"
                ? "Estación Órbita"
                : "Ciudad Neón",
          holografico: mundo === "neon",
        };
      }),
    [bosque.datos, orbita.datos, neon.datos],
  );

  return {
    cromos,
    cargando: bosque.cargando || orbita.cargando || neon.cargando,
    error: bosque.error || orbita.error || neon.error,
  };
}
