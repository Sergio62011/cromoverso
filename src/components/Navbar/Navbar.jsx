import { useEffect, useId, useRef, useState } from "react";
import Marca from "../Marca/Marca.jsx";
import MenuMovil from "../MenuMovil/MenuMovil.jsx";
import SelectorIdioma from "../SelectorIdioma/SelectorIdioma.jsx";
import IconoMundo from "../IconoMundo/IconoMundo.jsx";
import { interfaz } from "../../data/interfaz.js";
import "./Navbar.css";
export default function Navbar({
  nombre,
  tipo,
  idioma,
  textos,
  onCambiarIdioma,
  destino,
  etiqueta,
  onCuenta,
  catalogoMobile = false,
}) {
  const [abierto, setAbierto] = useState(false);
  const [accesibilidadAbierta, setAccesibilidadAbierta] = useState(false);
  const [altoContraste, setAltoContraste] = useState(false);
  const [tamanoTexto, setTamanoTexto] = useState("normal");
  const [movimientoReducido, setMovimientoReducido] = useState(false);
  const [subrayarEnlaces, setSubrayarEnlaces] = useState(false);
  const [fuenteFacil, setFuenteFacil] = useState(false);
  const [declaracionAbierta, setDeclaracionAbierta] = useState(false);
  const [esMovil, setEsMovil] = useState(false);
  const boton = useRef(null);
  const botonAccesibilidad = useRef(null);
  const id = useId();
  const idAccesibilidad = useId();
  const t = textos ?? interfaz[idioma];

  useEffect(() => {
    const debeBloquear =
      abierto ||
      (accesibilidadAbierta && window.matchMedia("(max-width: 767px)").matches);
    if (!debeBloquear) return undefined;

    const overflowAnterior = document.body.style.overflow;
    const overflowRaizAnterior = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflowAnterior;
      document.documentElement.style.overflow = overflowRaizAnterior;
    };
  }, [abierto, accesibilidadAbierta]);

  useEffect(() => {
    const consulta = window.matchMedia("(max-width: 767px)");
    const actualizarVista = () => setEsMovil(consulta.matches);
    actualizarVista();
    consulta.addEventListener("change", actualizarVista);
    return () => consulta.removeEventListener("change", actualizarVista);
  }, []);

  useEffect(() => {
    const raiz = document.documentElement;
    const atributos = {
      "data-accesibilidad-contraste": altoContraste,
      "data-accesibilidad-texto": tamanoTexto,
      "data-accesibilidad-movimiento": movimientoReducido,
      "data-accesibilidad-enlaces": subrayarEnlaces,
      "data-accesibilidad-fuente": fuenteFacil,
    };
    Object.entries(atributos).forEach(([nombre, valor]) => {
      if (!valor || valor === "normal") raiz.removeAttribute(nombre);
      else raiz.setAttribute(nombre, valor === true ? "true" : valor);
    });
    return () => {
      Object.keys(atributos).forEach((nombre) => raiz.removeAttribute(nombre));
    };
  }, [
    altoContraste,
    tamanoTexto,
    movimientoReducido,
    subrayarEnlaces,
    fuenteFacil,
  ]);

  return (
    <header
      className={`cabecera-home ${catalogoMobile ? "cabecera-home--catalogo" : ""}`}
      onKeyDown={(evento) => {
        if (evento.key === "Escape" && accesibilidadAbierta) {
          setAccesibilidadAbierta(false);
          botonAccesibilidad.current?.focus();
        } else if (evento.key === "Escape" && abierto) {
          setAbierto(false);
          boton.current?.focus();
        }
      }}
    >
      <div className="ancho-home fila-cabecera">
        <Marca
          nombre={t.nombreLogo ?? nombre}
          tipo={tipo}
          ariaLabel={t.ariaMarca}
        />
        <button className="ingreso-movil cuerpo-p-fuerte" onClick={() => onCuenta("ingresar")}>
          {t.ingresar}
        </button>
        <MenuMovil
          abierto={abierto}
          onAlternar={() => setAbierto((valor) => !valor)}
          menuId={id}
          botonRef={boton}
          textos={t}
        />
        <nav
          id={id}
          className={`menu-home cuerpo-p-fuerte ${abierto ? "abierto" : ""}`}
          aria-label={t.navegacion}
        >
          <a
            href="/#contenido"
            aria-current={window.location.pathname === "/" ? "page" : undefined}
            onClick={() => setAbierto(false)}
          >
            <IconoMundo nombre="home" />
            <span>{t.inicio}</span>
            <span className="menu-home__actual detalle-etiqueta">
              {idioma === "es" ? "ESTÁS AQUÍ" : "YOU ARE HERE"}
            </span>
          </a>
          <a
            className="menu-home__destino"
            href={destino}
            onClick={() => setAbierto(false)}
          >
            <span>
              <IconoMundo nombre="mundos" />
              {etiqueta}
            </span>
            <IconoMundo nombre="flecha" />
          </a>
          <div className="acciones-home">
            {tipo === "taquilla" && (
              <a
                className="buscar-cabecera"
                href="#buscador-eventos"
                onClick={() => setAbierto(false)}
              >
                {t.buscar}
              </a>
            )}
            <div className="idioma-fila">
              <span className="idioma-etiqueta">{t.idioma}</span>
              <SelectorIdioma
                idioma={idioma}
                onCambiar={onCambiarIdioma}
                etiqueta={t.ariaIdioma ?? t.idioma}
              />
            </div>
            <div className="accesibilidad">
              <button
                ref={botonAccesibilidad}
                className="accesibilidad-toggle"
                type="button"
                aria-expanded={accesibilidadAbierta}
                aria-controls={idAccesibilidad}
                onClick={() => setAccesibilidadAbierta((valor) => !valor)}
              >
                <span>{t.accesibilidad}</span>
                <IconoMundo nombre="accesibilidad" />
              </button>
              {accesibilidadAbierta && (
                <div
                  className="accesibilidad-overlay"
                  onClick={(evento) => {
                    if (evento.target === evento.currentTarget) {
                      setAccesibilidadAbierta(false);
                    }
                  }}
                >
                  <section
                    className="accesibilidad-panel"
                    id={idAccesibilidad}
                    role="dialog"
                    aria-modal={esMovil}
                    aria-labelledby={`${idAccesibilidad}-titulo`}
                  >
                    <header className="accesibilidad-panel__encabezado">
                      <h2 className="titular-h4" id={`${idAccesibilidad}-titulo`}>
                        {t.accesibilidad}
                      </h2>
                      <button
                        className="accesibilidad-cerrar cuerpo-g"
                        type="button"
                        aria-label={t.cerrarAccesibilidad ?? t.cerrar}
                        onClick={() => setAccesibilidadAbierta(false)}
                      >
                        ×
                      </button>
                    </header>

                    <div className="accesibilidad-opciones">
                      <div className="accesibilidad-tamano">
                        <h3 className="detalle-nota-fuerte">{t.tamanoTexto}</h3>
                        <div
                          className="accesibilidad-segmentos"
                          role="group"
                          aria-label={t.tamanoTexto}
                        >
                          {[
                            ["normal", t.normal],
                            ["grande", t.grande],
                            ["muy-grande", t.muyGrande],
                          ].map(([valor, etiqueta]) => (
                            <button
                              className="detalle-nota-fuerte"
                              key={valor}
                              type="button"
                              aria-pressed={tamanoTexto === valor}
                              onClick={() => setTamanoTexto(valor)}
                            >
                              {etiqueta}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="accesibilidad-interruptores">
                        {[
                          {
                            id: "contraste",
                            activo: altoContraste,
                            cambiar: setAltoContraste,
                            titulo: t.altoContraste,
                            descripcion: t.altoContrasteDescripcion,
                          },
                          {
                            id: "movimiento",
                            activo: movimientoReducido,
                            cambiar: setMovimientoReducido,
                            titulo: t.reducirMovimiento,
                            descripcion: t.reducirMovimientoDescripcion,
                          },
                          {
                            id: "enlaces",
                            activo: subrayarEnlaces,
                            cambiar: setSubrayarEnlaces,
                            titulo: t.subrayarEnlaces,
                            descripcion: t.subrayarEnlacesDescripcion,
                          },
                          {
                            id: "fuente",
                            activo: fuenteFacil,
                            cambiar: setFuenteFacil,
                            titulo: t.fuenteFacil,
                            descripcion: t.fuenteFacilDescripcion,
                          },
                        ].map((opcion) => (
                          <div
                            className="accesibilidad-control"
                            key={opcion.id}
                          >
                            <div>
                              <h3 className="detalle-nota-fuerte">{opcion.titulo}</h3>
                              <p className="detalle-nota">{opcion.descripcion}</p>
                            </div>
                            <button
                              className="accesibilidad-switch"
                              type="button"
                              role="switch"
                              aria-checked={opcion.activo}
                              aria-label={opcion.titulo}
                              onClick={() => opcion.cambiar((valor) => !valor)}
                            >
                              <span />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {declaracionAbierta && (
                      <p className="accesibilidad-declaracion detalle-nota">
                        {t.declaracionTexto}
                      </p>
                    )}
                    <footer className="accesibilidad-panel__pie">
                      <button
                        className="accesibilidad-declaracion-link detalle-nota"
                        type="button"
                        onClick={() => setDeclaracionAbierta((valor) => !valor)}
                      >
                        {t.declaracionAccesibilidad}
                      </button>
                      <button
                        className="accesibilidad-restablecer detalle-nota-fuerte"
                        type="button"
                        onClick={() => {
                          setTamanoTexto("normal");
                          setAltoContraste(false);
                          setMovimientoReducido(false);
                          setSubrayarEnlaces(false);
                          setFuenteFacil(false);
                          setDeclaracionAbierta(false);
                        }}
                      >
                        {t.restablecer}
                      </button>
                    </footer>
                  </section>
                </div>
              )}
            </div>
            <div className="botones-fila">
              <button
                className="ingresar-home cuerpo-p-fuerte"
                onClick={() => onCuenta("ingresar")}
              >
                {t.ingresar}
              </button>
              <button
                className="boton-home primario cuerpo-p-fuerte"
                onClick={() => onCuenta("registro")}
              >
                {t.registro}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
