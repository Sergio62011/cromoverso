import { useEffect, useMemo, useState } from "react";
import LayoutPublico from "../components/LayoutPublico/LayoutPublico.jsx";
import TarjetaMundo from "../components/TarjetaMundo/TarjetaMundo.jsx";
import TarjetaCromo from "../components/TarjetaCromo/TarjetaCromo.jsx";
import DialogoDetalle from "../components/DialogoDetalle/DialogoDetalle.jsx";
import IconoMundo from "../components/IconoMundo/IconoMundo.jsx";
import { usePreferencias } from "../context/PreferenciasContext.jsx";
import { useMundos } from "../hooks/useMundos.js";
import { useRecurso } from "../hooks/useRecurso.js";
import { useTextos } from "../hooks/useTextos.js";
import { useDetalle } from "../hooks/useDetalle.js";
import "./CatalogoMundo.css";

const RAREZAS = ["legendaria", "epica", "rara", "comun"];
const TIPOS = ["heroe", "aliado", "villano"];

function leer(origen, ruta) {
  return ruta.split(".").reduce((valor, parte) => valor?.[parte], origen);
}

function interpolar(plantilla, valores = {}) {
  return Object.entries(valores).reduce(
    (texto, [clave, valor]) =>
      String(texto ?? "").replaceAll(`{${clave}}`, String(valor ?? "")),
    plantilla ?? "",
  );
}

function obtenerMundo(respuesta) {
  return respuesta?.mundo ?? respuesta?.datos?.mundo ?? respuesta?.datos ?? respuesta;
}

export default function CatalogoMundo({ id }) {
  const { idioma } = usePreferencias();
  const { textos } = useTextos(idioma);
  const { mundos } = useMundos();
  const recurso = useRecurso(`/mundos/${encodeURIComponent(id)}`);
  const {
    detalle: cuentaDetalle,
    setDetalle: setCuentaDetalle,
    abrirCuenta,
  } = useDetalle(textos);
  const mundo = obtenerMundo(recurso.datos);
  const [rarezaActiva, setRarezaActiva] = useState("");
  const [tipoActivo, setTipoActivo] = useState("");
  const [orden, setOrden] = useState("asc");
  const [busqueda, setBusqueda] = useState("");
  const [busquedaAbierta, setBusquedaAbierta] = useState(false);
  const t = textos;
  const cromos = Array.isArray(mundo?.cromos) ? mundo.cromos : [];
  const numeroMundo = Math.max(1, mundos.findIndex((item) => item.id === id) + 1);
  const visible = useMemo(() => {
    const filtrados = cromos.filter(
      (cromo) =>
        (!rarezaActiva || cromo.rareza === rarezaActiva) &&
        (!tipoActivo || cromo.tipo === tipoActivo) &&
        (!busqueda.trim() || `${cromo.numero} ${cromo.nombre}`.toLocaleLowerCase().includes(busqueda.trim().toLocaleLowerCase())),
    );
    return filtrados.sort((a, b) =>
      orden === "desc" ? b.numero - a.numero : a.numero - b.numero,
    );
  }, [cromos, rarezaActiva, tipoActivo, orden, busqueda]);

  useEffect(() => {
    if (mundo?.nombre) {
      const titulo = leer(textos, "paginas.albumMundo.seo.titulo");
      document.title = titulo
        ? interpolar(titulo, { mundo: mundo.nombre })
        : `${mundo.nombre} · Cromoverso`;
    }
  }, [mundo?.nombre, textos]);

  const textosCatalogo = leer(textos, "paginas.albumMundo") ?? {};
  const cantidadRareza = (rareza) =>
    mundo?.porRareza?.[rareza] ??
    cromos.filter((cromo) => cromo.rareza === rareza).length;
  const cantidadTipo = (tipo) => cromos.filter((cromo) => cromo.tipo === tipo).length;
  const nombreRareza = (rareza) => t[`rareza${rareza[0].toUpperCase()}${rareza.slice(1)}`] ?? rareza;
  const nombreTipo = (tipo) => t[`tipo${tipo[0].toUpperCase()}${tipo.slice(1)}`] ?? tipo;

  const inicio = t.catalogoInicio ?? t.inicio;
  const tituloMundos = t.catalogoMundosTitulo ?? t.mundos;
  const etiquetaMundos = mundo?.nombre ?? tituloMundos;
  const destino = "/#mundos";
  const rango = mundo?.numeros
    ? interpolar(t.catalogoRango, {
        numero: numeroMundo,
        desde: String(mundo.numeros.desde).padStart(3, "0"),
        hasta: String(mundo.numeros.hasta).padStart(3, "0"),
      })
    : "";

  return (
    <LayoutPublico
      textos={t}
      destino={destino}
      etiqueta={tituloMundos}
      descripcion={t.descripcionInicio}
      onCuenta={abrirCuenta}
      catalogoMobile
    >
      <section
        className="encabezado-catalogo"
        style={{ "--color-mundo-catalogo": mundo?.color ?? "var(--marca-acento)" }}
      >
        <div className="ancho-home">
          <nav className="migas-catalogo" aria-label={t.navegacion}>
            <a href="/">{inicio}</a>
            <span aria-hidden="true">›</span>
            <span aria-current="page">{mundo?.nombre ?? "…"}</span>
          </nav>
          <div className="catalogo-encabezado-movil">
            <a className="catalogo-volver" href="/#mundos" aria-label={t.general?.acciones?.volver ?? "Volver"}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 12H5m7 7-7-7 7-7" />
              </svg>
            </a>
            <div className="catalogo-titulo-movil">
              <h1>{mundo?.nombre ?? "…"}</h1>
              {mundo?.tema && <p>{mundo.tema}</p>}
            </div>
            <button
              className="catalogo-busqueda-toggle"
              type="button"
              aria-label={t.navbar?.buscador?.aria ?? (idioma === "en" ? "Search cards" : "Buscar cromos")}
              aria-expanded={busquedaAbierta}
              onClick={() => setBusquedaAbierta((abierta) => !abierta)}
            >
              <IconoMundo nombre="buscar" />
            </button>
          </div>
          {busquedaAbierta && (
            <label className="catalogo-busqueda-movil">
              <span className="solo-lectores">{t.navbar?.buscador?.aria ?? (idioma === "en" ? "Search cards" : "Buscar cromos")}</span>
              <input
                autoFocus
                type="search"
                value={busqueda}
                onChange={(evento) => setBusqueda(evento.target.value)}
                placeholder={t.navbar?.buscador?.placeholder ?? (idioma === "en" ? "Search a hero or number" : "Busca un héroe o un número")}
              />
            </label>
          )}
          <h1>{mundo?.nombre ?? (recurso.cargando ? t.estados?.cargando ?? "Cargando…" : "")}</h1>
          {rango && <p className="rango-catalogo">{rango}</p>}
          {mundo?.tema && <p className="tema-catalogo">{mundo.tema}</p>}
        </div>
      </section>

      <section className="catalogo-mundo ancho-home" aria-label={mundo?.nombre ?? tituloMundos}>
        <div className="filtros-catalogo-movil">
          <label>
            <span className="solo-lectores">{t.catalogoFiltroRareza ?? "Filtrar por rareza"}</span>
            <select value={rarezaActiva} onChange={(evento) => setRarezaActiva(evento.target.value)}>
              <option value="">{t.catalogoTodasRarezas ?? "Rareza: todas"}</option>
              {RAREZAS.map((rareza) => (
                <option key={rareza} value={rareza}>{nombreRareza(rareza)}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="solo-lectores">{t.catalogoFiltroTipo ?? "Filtrar por tipo"}</span>
            <select value={tipoActivo} onChange={(evento) => setTipoActivo(evento.target.value)}>
              <option value="">{t.catalogoTodosTipos ?? "Tipo: todos"}</option>
              {TIPOS.map((tipo) => (
                <option key={tipo} value={tipo}>{nombreTipo(tipo)}</option>
              ))}
            </select>
          </label>
        </div>
        <aside className="filtros-catalogo">
          <section className="panel-catalogo panel-mundos">
            <h2>{tituloMundos}</h2>
            <nav aria-label={tituloMundos}>
              {mundos.map((item, indice) => (
                <a
                  href={`/mundos/${item.id}`}
                  key={item.id}
                  className={item.id === id ? "activo" : ""}
                  aria-current={item.id === id ? "page" : undefined}
                >
                  <span className="punto-mundo" style={{ backgroundColor: item.color }} />
                  <span>{item.nombre}</span>
                  <small>{item.totalCromos ?? 20}</small>
                  {item.id === id && <em>{leer(textosCatalogo, "mundos.aria.paginaActual") ?? "Página actual"}</em>}
                </a>
              ))}
            </nav>
          </section>

          <section className="panel-catalogo">
            <h2>{t.catalogoFiltroRareza ?? "Filtrar por rareza"}</h2>
            <button
              type="button"
              className={!rarezaActiva ? "filtro-activo" : ""}
              aria-pressed={!rarezaActiva}
              onClick={() => setRarezaActiva("")}
            >
              <span>{t.catalogoTodasRarezas ?? "Rareza: todas"}</span>
              <small>{cromos.length}</small>
            </button>
            {RAREZAS.map((rareza) => (
              <button
                type="button"
                key={rareza}
                className={`filtro-${rareza} ${rarezaActiva === rareza ? "filtro-activo" : ""}`}
                aria-pressed={rarezaActiva === rareza}
                onClick={() => setRarezaActiva(rarezaActiva === rareza ? "" : rareza)}
              >
                <span>{nombreRareza(rareza)}</span>
                <small>{cantidadRareza(rareza)}</small>
              </button>
            ))}
          </section>

          <section className="panel-catalogo">
            <h2>{t.catalogoFiltroTipo ?? "Filtrar por tipo"}</h2>
            {TIPOS.map((tipo) => (
              <button
                type="button"
                key={tipo}
                className={tipoActivo === tipo ? "filtro-activo" : ""}
                aria-pressed={tipoActivo === tipo}
                onClick={() => setTipoActivo(tipoActivo === tipo ? "" : tipo)}
              >
                <span>{nombreTipo(tipo)}</span>
                <small>{cantidadTipo(tipo)}</small>
              </button>
            ))}
          </section>
        </aside>

        <div className="catalogo-resultados">
          <div className="barra-catalogo">
            <p>
              {interpolar(
                visible.length === 1
                  ? leer(textosCatalogo, "filtros.cantidad.uno") ?? t.catalogoCromos
                  : t.catalogoCromos ?? "{cantidad} cromos",
                {
                cantidad: visible.length,
                },
              )}
            </p>
            <label>
              <span>{interpolar(t.catalogoOrden ?? "Orden: {orden}", { orden: "" }).replace(/:\s*$/, "")}</span>
              <select value={orden} onChange={(evento) => setOrden(evento.target.value)}>
                <option value="asc">{t.catalogoOrdenNumero ?? "número"} ↑</option>
                <option value="desc">{t.catalogoOrdenNumero ?? "número"} ↓</option>
              </select>
            </label>
          </div>

          {recurso.cargando && !mundo && (
            <p className="estado-catalogo" role="status">{t.estados?.cargando ?? "Cargando…"}</p>
          )}
          {recurso.error && !mundo && (
            <div className="estado-catalogo" role="alert">
              <h2>{t.estados?.error?.titulo ?? "No se pudo cargar"}</h2>
              <p>{t.estados?.error?.texto ?? "Vuelve a intentarlo."}</p>
              <button className="boton-home secundario" onClick={recurso.recargar}>
                {t.estados?.error?.botones?.reintentar ?? "Reintentar"}
              </button>
            </div>
          )}
          {mundo && visible.length > 0 && (
            <div className="catalogo-grid">
              {visible.map((cromo) => (
                <TarjetaCromo
                  key={cromo.id}
                  heroe={cromo}
                  mundo={{ ...mundo, color: cromo.ilustracion?.colorBase ?? mundo.color }}
                  en={idioma === "en"}
                  textos={t}
                />
              ))}
            </div>
          )}
          {mundo && visible.length === 0 && (
            <div className="catalogo-vacio">
              <h2>{leer(textosCatalogo, "vacio.titulo") ?? "Ningún cromo coincide con estos filtros"}</h2>
              <p>{leer(textosCatalogo, "vacio.texto") ?? "Prueba con otra rareza u otro tipo."}</p>
              <button
                className="boton-home secundario"
                onClick={() => {
                  setRarezaActiva("");
                  setTipoActivo("");
                }}
              >
                {t.catalogoLimpiar ?? "Quitar filtros"}
              </button>
            </div>
          )}
        </div>
      </section>
      <DialogoDetalle
        detalle={cuentaDetalle}
        textos={t}
        onCerrar={() => setCuentaDetalle(null)}
      />
    </LayoutPublico>
  );
}
