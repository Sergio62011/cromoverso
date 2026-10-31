import TarjetaCromo from "../TarjetaCromo/TarjetaCromo.jsx";
import "./AbanicoCromos.css";
export default function AbanicoCromos({ heroes, mundos, en, onSeleccionar }) {
  return (
    <div className="abanico-cromos">
      <span className="etiqueta-cromos">
        {en ? "Holographic guardian" : "Guardiana holográfica"}
      </span>
      {heroes.map((heroe) => (
        <TarjetaCromo
          key={heroe.numero}
          heroe={heroe}
          mundo={mundos[heroe.mundo]}
          en={en}
          onClick={() => onSeleccionar(heroe)}
        />
      ))}
    </div>
  );
}
