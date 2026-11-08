import { useMemo } from "react";
import { useRecurso } from "./useRecurso.js";
import { interfaz } from "../data/interfaz.js";

// Mantiene intacta la estructura del contrato y crea alias para los
// componentes actuales del home, que usan nombres planos.
const ALIAS_HOME = {
  nombreLogo: "navbar.logo.texto",
  ariaMarca: "navbar.logo.aria",
  inicio: "navbar.enlaces.inicio",
  mundos: "navbar.enlaces.mundos",
  descripcionInicio: "footer.lema",
  tituloPagina: "paginas.inicio.seo.titulo",
  heroTitulo: "paginas.inicio.hero.titulo",
  heroDescripcion: "paginas.inicio.hero.subtituloMovil",
  heroRegistro: "paginas.inicio.hero.botones.crearCuentaGratis",
  heroExplorar: "paginas.inicio.hero.botones.explorarMundos",
  etiquetaHolografica: "paginas.inicio.hero.etiquetas.guardiana",
  iniciarColeccion: "paginas.inicio.hero.subtitulo",
  mundosTitulo: "paginas.inicio.mundos.titulo",
  mundosDescripcion: "paginas.inicio.mundos.subtitulo",
  mundoDescripcion: "paginas.inicio.mundos.subtitulo",
  mundoNumero: "paginas.inicio.mundos.etiquetas.mundo",
  veinteCromos: "paginas.inicio.mundos.etiquetas.cromos",
  verCiudadNeon: "paginas.inicio.mundos.enlaces.ver",
  registro: "navbar.botones.crearCuenta",
  ingresar: "navbar.botones.ingresar",
  registroTitulo: "paginas.registro.formulario.titulo",
  loginTitulo: "paginas.ingresar.formulario.titulo",
  cuentaNoDisponible: "paginas.ingresar.formulario.subtitulo",
  seguirExplorando: "general.acciones.volver",
  abrirMenu: "menuMovil.abrir",
  cerrarMenu: "menuMovil.cerrar",
  idioma: "menuMovil.secciones.idioma",
  ariaIdioma: "navbar.aria.idioma",
  accesibilidad: "accesibilidad.titulo",
  opcionesAccesibilidad: "accesibilidad.botones.abrir",
  tamanoTexto: "accesibilidad.tamanoTexto.titulo",
  normal: "accesibilidad.tamanoTexto.opciones.normal",
  grande: "accesibilidad.tamanoTexto.opciones.grande",
  muyGrande: "accesibilidad.tamanoTexto.opciones.muyGrande",
  altoContraste: "accesibilidad.altoContraste.titulo",
  altoContrasteDescripcion: "accesibilidad.altoContraste.ayuda",
  reducirMovimiento: "accesibilidad.reducirMovimiento.titulo",
  reducirMovimientoDescripcion: "accesibilidad.reducirMovimiento.ayuda",
  subrayarEnlaces: "accesibilidad.subrayarEnlaces.titulo",
  subrayarEnlacesDescripcion: "accesibilidad.subrayarEnlaces.ayuda",
  fuenteFacil: "accesibilidad.fuenteLecturaFacil.titulo",
  fuenteFacilDescripcion: "accesibilidad.fuenteLecturaFacil.ayuda",
  declaracionAccesibilidad: "accesibilidad.enlaces.declaracion",
  restablecer: "accesibilidad.botones.restablecer",
  cerrar: "general.acciones.cerrar",
  cerrarDialogo: "general.aria.cerrarDialogo",
  cerrarAccesibilidad: "general.aria.cerrarDialogo",
  saltar: "general.aria.saltarAlContenido",
  explora: "footer.columnas.explora.titulo",
  cuenta: "footer.columnas.cuenta.titulo",
  legal: "footer.columnas.legal.titulo",
  terminos: "footer.columnas.legal.enlaces.terminos",
  accesibilidad: "footer.columnas.legal.enlaces.accesibilidad",
  derechos: "footer.legal.derechos",
  cookies: "cookies.preferencias.titulo",
  banner: "cookies.banner.titulo",
  descripcion: "cookies.banner.texto",
  descripcionCookiesPreferencias: "cookies.preferencias.texto",
  aceptar: "cookies.banner.botones.aceptar",
  rechazar: "cookies.banner.botones.rechazar",
  guardar: "cookies.preferencias.botones.guardarSeleccion",
  cerrarPreferencias: "cookies.preferencias.botones.cerrarSinGuardar",
  necesarias: "cookies.preferencias.categorias.necesarias.titulo",
  necesariasTexto: "cookies.preferencias.categorias.necesarias.descripcion",
  preferencias: "cookies.preferencias.categorias.preferencias.titulo",
  preferenciasTexto:
    "cookies.preferencias.categorias.preferencias.descripcion",
  error: "estados.error.texto",
  guardado: "estados.mensajes.guardado",
  tipoHeroe: "componentes.cromo.tipos.heroe",
  tipoVillano: "paginas.albumMundo.filtros.tipo.opciones.villano",
  tipoAliado: "paginas.albumMundo.filtros.tipo.opciones.aliado",
  rarezaComun: "componentes.cromo.rarezas.comun",
  rarezaRara: "componentes.cromo.rarezas.rara",
  rarezaEpica: "componentes.cromo.rarezas.epica",
  rarezaLegendaria: "componentes.cromo.rarezas.legendaria",
  catalogoMundosTitulo: "paginas.albumMundo.mundos.titulo",
  catalogoInicio: "paginas.albumMundo.migas.inicio",
  catalogoRango: "paginas.albumMundo.encabezado.rango",
  catalogoCromos: "paginas.albumMundo.filtros.cantidad.otro",
  catalogoOrden: "paginas.albumMundo.orden.etiqueta",
  catalogoOrdenNumero: "paginas.albumMundo.orden.opciones.numero",
  catalogoFiltroRareza: "paginas.albumMundo.filtros.rareza.titulo",
  catalogoTodasRarezas: "paginas.albumMundo.filtros.rareza.todas",
  catalogoFiltroTipo: "paginas.albumMundo.filtros.tipo.titulo",
  catalogoTodosTipos: "paginas.albumMundo.filtros.tipo.todos",
  catalogoHeroe: "paginas.albumMundo.filtros.tipo.opciones.heroe",
  catalogoAliado: "paginas.albumMundo.filtros.tipo.opciones.aliado",
  catalogoVillano: "paginas.albumMundo.filtros.tipo.opciones.villano",
  catalogoVacioTitulo: "paginas.albumMundo.vacio.titulo",
  catalogoVacioTexto: "paginas.albumMundo.vacio.texto",
  catalogoLimpiar: "paginas.albumMundo.vacio.botones.limpiar",
  detallePoder: "paginas.detalleCromo.poder.titulo",
  detalleAtributos: "paginas.detalleCromo.atributos.titulo",
  detalleAtributosEscala: "paginas.detalleCromo.atributos.escala",
  detalleCerrar: "paginas.detalleCromo.botones.cerrar",
  detalleFuerza: "paginas.detalleCromo.atributos.nombres.fuerza",
  detalleVelocidad: "paginas.detalleCromo.atributos.nombres.velocidad",
  detalleMente: "paginas.detalleCromo.atributos.nombres.mente",
  detalleEnergia: "paginas.detalleCromo.atributos.nombres.energia",
};

function leerRuta(origen, ruta) {
  return ruta.split(".").reduce((valor, parte) => valor?.[parte], origen);
}

function extraerTextos(respuesta) {
  return (
    respuesta?.textos ??
    respuesta?.datos?.textos ??
    respuesta?.data?.textos ??
    respuesta?.datos?.data?.textos ??
    {}
  );
}

function normalizar(respuesta, idioma) {
  const origen = extraerTextos(respuesta);
  const estructurados = origen?.[idioma] ?? origen;
  const resultado = { ...interfaz[idioma], ...estructurados };

  for (const [alias, ruta] of Object.entries(ALIAS_HOME)) {
    const valor = leerRuta(estructurados, ruta);
    if (typeof valor === "string") resultado[alias] = valor;
  }

  return resultado;
}

export function useTextos(idioma = "es") {
  const recurso = useRecurso(`/textos?idioma=${encodeURIComponent(idioma)}`);
  const textos = useMemo(
    () => normalizar(recurso.datos, idioma),
    [recurso.datos, idioma],
  );

  return { ...recurso, textos, respuesta: recurso.datos };
}
