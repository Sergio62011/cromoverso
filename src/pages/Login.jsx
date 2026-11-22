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

  async function ingresar(evento) {
    evento.preventDefault();
    setCargando(true);
    setMensaje("");
    try {
      const datos = await consultar("/auth/login", {
        method: "POST",
        body: { correo, contrasena, mantenerSesion: mantener },
      });
      const token = datos.token ?? datos.datos?.token;
      if (token) localStorage.setItem("cromoverso_token", token);
      window.location.assign(datos.redireccion ?? datos.datos?.redireccion ?? "/");
    } catch (error) {
      setMensaje(error.message || "No fue posible iniciar sesión. Inténtalo de nuevo.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="landing cromoverso login-pagina">
      <section className="login-presentacion" aria-label="Cromoverso">
        <Marca nombre="cromoverso" tipo="cromoverso" ariaLabel="Cromoverso, inicio" />
        <div className="login-abanico" aria-label="Héroes destacados de la API">
          <AbanicoCromos heroes={cromos} mundos={mundos} en={idioma === "en"} textos={{ etiquetaHolografica: "Héroes destacados" }} onSeleccionar={() => {}} />
        </div>
        <div className="login-mensaje-marca">
          <span className="login-temporada detalle-etiqueta">Temporada 1 · Seis mundos</span>
          <h1 className="titular-h2">Seis mundos.<br />120 héroes.<br />Un álbum tuyo.</h1>
          <p className="cuerpo-p">Explora seis mundos y conoce a sus héroes originales.</p>
        </div>
      </section>
      <section className="login-formulario-zona" aria-labelledby="login-titulo">
        <div className="login-formulario-contenido">
          <Marca nombre="cromoverso" tipo="cromoverso" ariaLabel="Cromoverso" />
          <h2 className="titular-h2" id="login-titulo">Ingresa a tu<br />cuenta</h2>
          <p className="login-intro cuerpo-p">Ingresa con el correo y la contraseña de tu cuenta.</p>
          <form onSubmit={ingresar}>
            <label className="cuerpo-p-fuerte" htmlFor="login-correo">Correo electrónico</label>
            <input id="login-correo" type="email" autoComplete="email" required value={correo} onChange={(e) => setCorreo(e.target.value)} />
            <label className="cuerpo-p-fuerte" htmlFor="login-contrasena">Contraseña</label>
            <div className="login-campo-contrasena">
              <input id="login-contrasena" type={ver ? "text" : "password"} autoComplete="current-password" required value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
              <button type="button" className="login-ver" aria-label={ver ? "Ocultar contraseña" : "Mostrar contraseña"} aria-pressed={ver} onClick={() => setVer(!ver)}>
                <IconoMundo nombre={ver ? "ojo_oculto" : "ojo"} />
              </button>
            </div>
            <div className="login-opciones cuerpo-p">
              <label className="login-recordar"><input type="checkbox" checked={mantener} onChange={(e) => setMantener(e.target.checked)} /> Mantener la sesión iniciada</label>
              <a href="/recuperar-contrasena">¿Olvidaste tu contraseña?</a>
            </div>
            {mensaje && <p className="login-error cuerpo-p" role="alert">{mensaje}</p>}
            <button className="login-enviar boton-home primario" type="submit" disabled={cargando}>{cargando ? "Ingresando…" : "Ingresar"}</button>
          </form>
          <p className="login-registro cuerpo-p">¿No tienes cuenta? <a href="/registro">Crea una cuenta</a></p>
        </div>
      </section>
    </main>
  );
}
