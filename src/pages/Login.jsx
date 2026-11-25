import { useEffect, useRef, useState } from "react";
import AbanicoCromos from "../components/AbanicoCromos/AbanicoCromos.jsx";
import IconoMundo from "../components/IconoMundo/IconoMundo.jsx";
import Marca from "../components/Marca/Marca.jsx";
import { usePreferencias } from "../context/PreferenciasContext.jsx";
import { useCromosDestacados } from "../hooks/useCromosDestacados.js";
import { useMundos } from "../hooks/useMundos.js";
import { consultar } from "../services/api.js";
import "./Login.css";

export default function Login() {
  const { idioma } = usePreferencias();
  const { mundos } = useMundos();
  const { cromos } = useCromosDestacados(mundos);
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mantener, setMantener] = useState(true);
  const [ver, setVer] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [segundosBloqueo, setSegundosBloqueo] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [tipoError, setTipoError] = useState("");
  const [errores, setErrores] = useState({});
  const [intento, setIntento] = useState(false);
  const correoRef = useRef(null);
  const contrasenaRef = useRef(null);
  const campoPendienteDeEnfocar = useRef(null);
  const formularioBloqueado = cargando || segundosBloqueo > 0;

  useEffect(() => {
    if (segundosBloqueo <= 0) return undefined;
    const intervalo = setInterval(() => {
      setSegundosBloqueo((segundos) => Math.max(0, segundos - 1));
    }, 1000);
    return () => clearInterval(intervalo);
  }, [segundosBloqueo > 0]);

  useEffect(() => {
    const campo = campoPendienteDeEnfocar.current;
    if (!campo) return;
    campoPendienteDeEnfocar.current = null;
    (campo === "correo" ? correoRef : contrasenaRef).current?.focus();
  }, [errores]);

  function validar(correoValor, contrasenaValor) {
    return {
      correo: !correoValor.trim()
        ? "Escribe tu correo electrónico."
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoValor)
          ? "Escribe un correo electrónico válido."
          : "",
      contrasena: contrasenaValor ? "" : "Escribe tu contraseña.",
    };
  }

  function cambiarCampo(campo, valor) {
    if (campo === "correo") setCorreo(valor);
    else setContrasena(valor);
    setMensaje("");
    setTipoError("");
    if (intento)
      setErrores((actuales) => ({
        ...actuales,
        ...validar(
          campo === "correo" ? valor : correo,
          campo === "contrasena" ? valor : contrasena,
        ),
      }));
  }

  function salirCampo(campo) {
    setErrores((actuales) => ({ ...actuales, ...validar(correo, contrasena) }));
  }

  async function ingresar(evento) {
    evento.preventDefault();
    if (formularioBloqueado) return;
    setIntento(true);
    const erroresValidacion = validar(correo, contrasena);
    setErrores(erroresValidacion);
    if (erroresValidacion.correo || erroresValidacion.contrasena) {
      campoPendienteDeEnfocar.current = erroresValidacion.correo
        ? "correo"
        : "contrasena";
      setMensaje("Revisa los campos marcados");
      setTipoError("validacion");
      return;
    }
    setCargando(true);
    setMensaje("");
    setTipoError("");
    try {
      const datos = await consultar("/sesion", {
        method: "POST",
        body: { correo, clave: contrasena },
      });
      window.location.assign(
        datos.redireccion ?? datos.datos?.redireccion ?? "/",
      );
    } catch (error) {
      const codigo = String(error.codigo || "").toLowerCase();
      const detalle = String(error.message || "").toLowerCase();
      const credencialesIncorrectas =
        error.estado === 401 ||
        /credencial|unauthorized|invalid.?credential|invalid.?login/.test(
          codigo,
        ) ||
        /credencial|correo o contraseña|usuario o contraseña/.test(detalle);
      const errorRed =
        error instanceof TypeError ||
        error.estado >= 500 ||
        !navigator.onLine ||
        /network|fetch|conexión|conectar|tardó demasiado/.test(detalle);
      const demasiadasPeticiones =
        error.estado === 429 || codigo === "demasiadas_peticiones";

      if (demasiadasPeticiones) {
        const valorRetryAfter = error.retryAfter?.trim();
        const segundosHeader = Number(valorRetryAfter);
        const fechaRetry = Date.parse(valorRetryAfter || "");
        const segundos = Number.isFinite(segundosHeader) && valorRetryAfter !== ""
          ? Math.max(0, Math.ceil(segundosHeader))
          : Number.isFinite(fechaRetry)
            ? Math.max(0, Math.ceil((fechaRetry - Date.now()) / 1000))
            : 1;
        setSegundosBloqueo(segundos);
        setTipoError("limite");
        setMensaje("Demasiadas solicitudes. Espera antes de volver a intentarlo.");
      } else if (credencialesIncorrectas) {
        setTipoError("credenciales");
        setMensaje("Correo o contraseña incorrectos");
      } else if (errorRed) {
        setTipoError("conexion");
        setMensaje("No pudimos conectarnos");
      } else {
        setTipoError("general");
        setMensaje(
          error.message || "No fue posible iniciar sesión. Inténtalo de nuevo.",
        );
      }
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="landing cromoverso login-pagina">
      <section className="login-presentacion" aria-label="Cromoverso">
        <Marca
          nombre="cromoverso"
          tipo="cromoverso"
          ariaLabel="Cromoverso, inicio"
        />
        <div className="login-abanico" aria-label="Héroes destacados de la API">
          <AbanicoCromos
            heroes={cromos}
            mundos={mundos}
            en={idioma === "en"}
            textos={{ etiquetaHolografica: "Héroes destacados" }}
            onSeleccionar={() => {}}
          />
        </div>
        <div className="login-mensaje-marca">
          <span className="login-temporada detalle-etiqueta">
            Temporada 1 · Seis mundos
          </span>
          <h1 className="titular-h2">
            Seis mundos.
            <br />
            120 héroes.
            <br />
            Un álbum tuyo.
          </h1>
          <p className="cuerpo-p">
            Explora seis mundos y conoce a sus héroes originales.
          </p>
        </div>
      </section>
      <section className="login-formulario-zona" aria-labelledby="login-titulo">
        <div className="login-formulario-contenido">
          <Marca nombre="cromoverso" tipo="cromoverso" ariaLabel="Cromoverso" />
          <h2 className="titular-h2" id="login-titulo">
            Ingresa a tu
            <br />
            cuenta
          </h2>
          <p className="login-intro cuerpo-p">
            Ingresa con el correo y la contraseña de tu cuenta.
          </p>
          <form onSubmit={ingresar}>
            {mensaje && (
              <div
                className={`login-error-resumen login-error-resumen--${tipoError}`}
                role="alert"
              >
                <IconoMundo nombre="alerta" />
                <div>
                  <strong>
                    {tipoError === "general"
                      ? "No fue posible iniciar sesión"
                      : mensaje}
                  </strong>
                  {tipoError === "validacion" && (
                    <span>
                      Para ingresar escribe tu correo y tu contraseña.
                    </span>
                  )}
                  {tipoError === "credenciales" && (
                    <span>
                      Revisa los datos e inténtalo de nuevo. Si no recuerdas tu
                      contraseña, puedes restablecerla.
                    </span>
                  )}
                  {tipoError === "conexion" && (
                    <span>
                      Revisa tu conexión a internet e inténtalo de nuevo. Lo que
                      escribiste se conserva.
                    </span>
                  )}
                  {tipoError === "general" && <span>{mensaje}</span>}
                  {tipoError === "limite" && (
                    <span>
                      {segundosBloqueo > 0
                        ? `Podrás intentarlo de nuevo en ${segundosBloqueo} ${segundosBloqueo === 1 ? "segundo" : "segundos"}.`
                        : "Ya puedes intentarlo de nuevo."}
                    </span>
                  )}
                </div>
              </div>
            )}
            <label className="cuerpo-p-fuerte" htmlFor="login-correo">
              Correo electrónico
            </label>
            <input
              ref={correoRef}
              className={errores.correo ? "tiene-error" : ""}
              id="login-correo"
              type="email"
              autoComplete="email"
              disabled={formularioBloqueado}
              aria-invalid={Boolean(errores.correo)}
              aria-describedby={errores.correo ? "error-correo" : undefined}
              value={correo}
              onBlur={() => salirCampo("correo")}
              onChange={(e) => cambiarCampo("correo", e.target.value)}
            />
            {errores.correo && (
              <span className="login-error-campo" id="error-correo">
                <IconoMundo nombre="advertencia" />
                {errores.correo}
              </span>
            )}
            <label className="cuerpo-p-fuerte" htmlFor="login-contrasena">
              Contraseña
            </label>
            <div className="login-campo-contrasena">
              <input
                ref={contrasenaRef}
                className={errores.contrasena ? "tiene-error" : ""}
                id="login-contrasena"
                type={ver ? "text" : "password"}
                autoComplete="current-password"
                disabled={formularioBloqueado}
                aria-invalid={Boolean(errores.contrasena)}
                aria-describedby={
                  errores.contrasena ? "error-contrasena" : undefined
                }
                value={contrasena}
                onBlur={() => salirCampo("contrasena")}
                onChange={(e) => cambiarCampo("contrasena", e.target.value)}
              />
              <button
                type="button"
                className="login-ver"
                aria-label={ver ? "Ocultar contraseña" : "Mostrar contraseña"}
                aria-pressed={ver}
                disabled={formularioBloqueado}
                onClick={() => setVer(!ver)}
              >
                <IconoMundo nombre={ver ? "ojo_oculto" : "ojo"} />
              </button>
            </div>
            {errores.contrasena && (
              <span className="login-error-campo" id="error-contrasena">
                <IconoMundo nombre="advertencia" />
                {errores.contrasena}
              </span>
            )}
            <div className="login-opciones cuerpo-p">
              <label className="login-recordar">
                <input
                  type="checkbox"
                  checked={mantener}
                  disabled={formularioBloqueado}
                  onChange={(e) => setMantener(e.target.checked)}
                />{" "}
                Mantener la sesión iniciada
              </label>
              <a href="/recuperar-contrasena">¿Olvidaste tu contraseña?</a>
            </div>
            <button
              className="login-enviar boton-home primario"
              type="submit"
              disabled={formularioBloqueado}
              aria-busy={formularioBloqueado}
            >
              {cargando && <IconoMundo nombre="cargando" />}
              {cargando
                ? "Ingresando…"
                : segundosBloqueo > 0
                  ? `Espera ${segundosBloqueo} s`
                  : tipoError === "conexion"
                  ? "Reintentar"
                  : "Ingresar"}
            </button>
          </form>
          <p className="login-registro cuerpo-p">
            ¿No tienes cuenta? <a href="/registro">Crea una cuenta</a>
          </p>
        </div>
      </section>
    </main>
  );
}
