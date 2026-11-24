import { useState } from "react";
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
  const [mensaje, setMensaje] = useState("");
  const [tipoError, setTipoError] = useState("");
  const [errores, setErrores] = useState({});
  const [intento, setIntento] = useState(false);

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
    setIntento(true);
    const erroresValidacion = validar(correo, contrasena);
    setErrores(erroresValidacion);
    if (erroresValidacion.correo || erroresValidacion.contrasena) {
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
      const token = datos.token ?? datos.datos?.token;
      if (token) localStorage.setItem("cromoverso_token", token);
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

      if (credencialesIncorrectas) {
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
                </div>
              </div>
            )}
            <label className="cuerpo-p-fuerte" htmlFor="login-correo">
              Correo electrónico
            </label>
            <input
              className={errores.correo ? "tiene-error" : ""}
              id="login-correo"
              type="email"
              autoComplete="email"
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
                className={errores.contrasena ? "tiene-error" : ""}
                id="login-contrasena"
                type={ver ? "text" : "password"}
                autoComplete="current-password"
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
                  onChange={(e) => setMantener(e.target.checked)}
                />{" "}
                Mantener la sesión iniciada
              </label>
              <a href="/recuperar-contrasena">¿Olvidaste tu contraseña?</a>
            </div>
            <button
              className="login-enviar boton-home primario"
              type="submit"
              disabled={cargando}
              aria-busy={cargando}
            >
              {cargando && <IconoMundo nombre="cargando" />}
              {cargando
                ? "Ingresando…"
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
