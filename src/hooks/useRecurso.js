import { useEffect, useState } from "react";
import { consultar } from "../services/api.js";

// Comparte solicitudes simultáneas para la misma ruta, incluso durante el
// montaje y desmontaje de comprobación que StrictMode hace en desarrollo.
const solicitudes = new Map();

function suscribirSolicitud(ruta) {
  let solicitud = solicitudes.get(ruta);

  if (!solicitud) {
    const controlador = new AbortController();
    solicitud = {
      controlador,
      suscriptores: 0,
      promesa: consultar(ruta, { signal: controlador.signal }),
    };
    solicitudes.set(ruta, solicitud);
    solicitud.promesa.finally(() => {
      if (solicitudes.get(ruta) === solicitud) solicitudes.delete(ruta);
    }).catch(() => { });
  }

  solicitud.suscriptores += 1;
  return {
    promesa: solicitud.promesa,
    liberar() {
      solicitud.suscriptores -= 1;
      queueMicrotask(() => {
        if (solicitud.suscriptores === 0 && solicitudes.get(ruta) === solicitud) {
          solicitudes.delete(ruta);
          solicitud.controlador.abort();
        }
      });
    },
  };
}

export function useRecurso(ruta) {
  const [estado, setEstado] = useState({
    ruta: null,
    datos: null,
    error: null,
    cargando: true,
  });
  const [intento, setIntento] = useState(0);
  useEffect(() => {
    if (!ruta) return;
    let vigente = true;
    const solicitud = suscribirSolicitud(ruta);
    setEstado({ ruta, datos: null, error: null, cargando: true });
    solicitud.promesa
      .then((datos) => {
        if (vigente) setEstado({ ruta, datos, error: null, cargando: false });
      })
      .catch((error) => {
        if (vigente && error.name !== "AbortError")
          setEstado({ ruta, datos: null, error, cargando: false });
      });
    return () => {
      vigente = false;
      solicitud.liberar();
    };
  }, [ruta, intento]);
  const actual =
    estado.ruta === ruta
      ? estado
      : { datos: null, error: null, cargando: Boolean(ruta) };
  return { ...actual, recargar: () => setIntento((valor) => valor + 1) };
}
