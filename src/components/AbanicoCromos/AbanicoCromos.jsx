import IconoMundo from "../IconoMundo/IconoMundo.jsx";
import TarjetaCromo from "../TarjetaCromo/TarjetaCromo.jsx";
import "./AbanicoCromos.css";
export default function AbanicoCromos({ heroes, mundos, en, textos = {}, onSeleccionar }) {
  const mundoDelCromo = (heroe) =>
    typeof heroe.mundo === "number"
      ? mundos[heroe.mundo]
      : mundos.find((mundo) => mundo.id === heroe.mundo) ??
        mundos.find((mundo) => mundo.nombre === heroe.mundoNombre);
  return (
    <div className="abanico-cromos">
      <span className="etiqueta-cromos detalle-etiqueta">
        <IconoMundo nombre="destello" />
        {textos.etiquetaHolografica}
      </span>
      {heroes.map((heroe) => (
        <TarjetaCromo
          key={heroe.numero}
          heroe={heroe}
          mundo={mundoDelCromo(heroe)}
          en={en}
          textos={textos}
          onClick={() => onSeleccionar(heroe, mundoDelCromo(heroe))}
        />
      ))}
    </div>
  );
}
