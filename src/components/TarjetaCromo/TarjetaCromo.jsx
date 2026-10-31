import IconoMundo from "../IconoMundo/IconoMundo.jsx";
import IlustracionCromo from "../IlustracionCromo/IlustracionCromo.jsx";
import "./TarjetaCromo.css";
export default function TarjetaCromo({ heroe, mundo, onClick, en = false }) {
  return (
    <button className={`cromo cromo-${heroe.numero}`} onClick={onClick}>
      <span className="cromo-numero">{heroe.numero}</span>
      <span
        className="cromo-rareza"
        aria-label={en ? "Legendary" : "Legendaria"}
      >
        <IconoMundo nombre="estrella" />
      </span>
      <IlustracionCromo mundo={mundo} />
      <b>{heroe.nombre}</b>
      <small>
        {mundo.nombre} · {en ? "Hero" : "Héroe"}
      </small>
    </button>
  );
}
