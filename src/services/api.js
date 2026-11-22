import { proyecto } from "../config/proyecto.js";

export async function consultar(ruta, { signal, method = "GET", body } = {}) {
  const respuesta = await fetch(`${proyecto.api}${ruta}`, {
    method,
    signal,
    headers: {
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const datos = await respuesta.json();
  if (!respuesta.ok) {
    const error = new Error(datos.error?.mensaje || `HTTP ${respuesta.status}`);
    error.codigo = datos.error?.codigo;
    error.campos = datos.error?.campos;
    throw error;
  }
  return datos;
}
