import { proyecto } from "../config/proyecto.js";

export async function consultar(ruta, { signal, method = "GET", body } = {}) {
  const token = localStorage.getItem("cromoverso_token");
  const respuesta = await fetch(`${proyecto.api}${ruta}`, {
    method,
    signal,
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const datos = await respuesta.json().catch(() => ({}));
  if (!respuesta.ok) {
    const error = new Error(datos.error?.mensaje || `HTTP ${respuesta.status}`);
    error.estado = respuesta.status;
    error.codigo = datos.error?.codigo;
    error.campos = datos.error?.campos;
    throw error;
  }
  return datos;
}
