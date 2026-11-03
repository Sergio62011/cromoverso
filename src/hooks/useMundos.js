import { useMemo } from "react";
import { useRecurso } from "./useRecurso.js";
import { mundos as mundosRespaldo } from "../data/catalogo.js";

export function useMundos() {
  const recurso = useRecurso("/mundos");
  const mundos = useMemo(() => {
    const datos = recurso.datos?.datos ?? recurso.datos?.mundos ?? [];
    if (!Array.isArray(datos) || datos.length === 0) return mundosRespaldo;
    return datos.map((mundo) => ({
      ...mundo,
      icono: mundo.figura ?? mundo.icono ?? "estrella",
    }));
  }, [recurso.datos]);

  return { ...recurso, mundos };
}
