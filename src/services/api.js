const TIEMPO_LIMITE = 15000;
const URL_API = import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, "");

export async function consultar(ruta, { signal, method = "GET", body } = {}) {
  if (!URL_API) throw new Error("Falta configurar URL de la API en VITE_API_URL.");

  const controlador = new AbortController();
  let agotado = false;
  const cancelar = () => controlador.abort();
  if (signal?.aborted) cancelar();
  else signal?.addEventListener("abort", cancelar, { once: true });
  const tiempoLimite = setTimeout(() => {
    agotado = true;
    controlador.abort();
  }, TIEMPO_LIMITE);

  try {
    const token = localStorage.getItem("cromoverso_token");
    const respuesta = await fetch(`${URL_API}${ruta}`, {
      method,
      signal: controlador.signal,
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
  } catch (error) {
    if (agotado) {
      throw new Error(
        "La API tardó demasiado en responder. Comprueba tu conexión y vuelve a intentarlo.",
      );
    }
    throw error;
  } finally {
    clearTimeout(tiempoLimite);
    signal?.removeEventListener("abort", cancelar);
  }
}
