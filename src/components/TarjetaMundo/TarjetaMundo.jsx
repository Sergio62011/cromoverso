import IconoMundo from "../IconoMundo/IconoMundo.jsx";
import "./TarjetaMundo.css";
export default function TarjetaMundo({ mundo, i, en, onSeleccionar }) {
  return (
    <button
      className="tarjeta-mundo"

      style={{
        "--mundo": mundo.color,
        "--fondo-mundo": mundo.fondo,
      }}
      onClick={() => onSeleccionar(mundo)}
    >
      <span className="icono-mundo">
        <IconoMundo nombre={mundo.icono} />
      </span>
      {i === 0 && (
        <span className="etiqueta-mundo">{en ? "World 1" : "Mundo 1"}</span>
      )}
      <b>{mundo.nombre}</b>
      <small>{en ? "20 cards" : "20 cromos"}</small>
    </button>
  );
}
