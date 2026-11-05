import Marca from "../Marca/Marca.jsx";
import { interfaz } from "../../data/interfaz.js";
import "./Footer.css";
export default function Footer({
  nombre,
  tipo,
  descripcion,
  destino,
  etiqueta,
  onCuenta,
  idioma,
  textos,
  onAbrirCookies,
}) {
  const t = textos ?? interfaz[idioma];
  return (
    <footer className="pie-home">
      <div className="ancho-home">
        <div className="columnas-pie">
          <div>
            <Marca
              nombre={t.nombreLogo ?? nombre}
              tipo={tipo}
              ariaLabel={t.ariaMarca}
            />
            <p className="cuerpo-p">{descripcion}</p>
          </div>
          <div>
            <h3 className="detalle-etiqueta">{t.explora}</h3>
            <a className="cuerpo-p" href="#contenido">{t.inicio}</a>
            <a className="cuerpo-p" href={destino}>{etiqueta}</a>
          </div>
          <div>
            <h3 className="detalle-etiqueta">{t.cuenta}</h3>
            <button className="cuerpo-p" onClick={() => onCuenta("ingresar")}>{t.ingresar}</button>
            <button className="cuerpo-p" onClick={() => onCuenta("registro")}>{t.registro}</button>
          </div>
        </div>
        <div className="pie-creditos">
          <span className="detalle-nota">
            {t.derechos
              ? t.derechos.replaceAll("{anio}", "2026")
              : `© 2026 ${nombre} · ${t.academico}`}
          </span>
          <button className="enlace-home cuerpo-p" onClick={onAbrirCookies}>
            {t.cookies}
          </button>
        </div>
      </div>
    </footer>
  );
}
