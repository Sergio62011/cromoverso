import IconoMundo from "../IconoMundo/IconoMundo.jsx";
import AbanicoCromos from "../AbanicoCromos/AbanicoCromos.jsx";
import "./HeroCromoverso.css";
export default function HeroCromoverso({
  en,
  textos,
  heroes,
  mundos,
  abrirCuenta,
  onSeleccionarCromo,
}) {
  const t = textos ?? {};
  return (
    <section className="hero-cromoverso">
      <div className="ancho-home interior-cromoverso">
        <div className="texto-cromoverso">
          <h1>{t.heroTitulo}</h1>
          <p className="descripcion-cromoverso-movil">
            {t.heroDescripcion}
          </p>
          <div className="grupo-botones">
            <button
              className="boton-home primario cuerpo-m-fuerte"
              onClick={() => abrirCuenta("registro")}
            >
              <IconoMundo nombre="regalo" />
              {t.heroRegistro}
            </button>
            <a href="#mundos" className="boton-home secundario">
              <IconoMundo nombre="libro" />
              {t.heroExplorar}
            </a>
          </div>
          <p>
            <IconoMundo nombre="destello" />
            {t.iniciarColeccion}
          </p>
        </div>
        <AbanicoCromos
          heroes={heroes}
          mundos={mundos}
          en={en}
          textos={t}
          onSeleccionar={onSeleccionarCromo}
        />
      </div>
    </section>
  );
}
