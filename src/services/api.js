const TIEMPO_LIMITE = 15000;
const URL_API = import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, "");

export async function consultar(
  ruta,
  { signal, method = "GET", body, redirigirSiNoAutenticado = true } = {},
) {
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
    const respuesta = await fetch(`${URL_API}${ruta}`, {
      method,
      signal: controlador.signal,
      credentials: "include",
      headers: {
        Accept: "application/json",
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
      error.retryAfter = respuesta.headers.get("Retry-After");
      const noAutenticado =
        respuesta.status === 401 &&
        String(error.codigo || "").toLowerCase() === "no_autenticado";
      const esConsultaSesion = /^\/?sesion(?:\?|$)/.test(ruta);
      const yaEstaEnLogin = /^\/login\/?$/.test(window.location.pathname);
      if (
        noAutenticado &&
        redirigirSiNoAutenticado &&
        !esConsultaSesion &&
        !yaEstaEnLogin
      ) {
        window.location.assign("/login");
      }
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
