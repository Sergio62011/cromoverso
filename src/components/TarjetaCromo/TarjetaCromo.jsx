import IconoMundo from "../IconoMundo/IconoMundo.jsx";
import IlustracionCromo from "../IlustracionCromo/IlustracionCromo.jsx";
import "./TarjetaCromo.css";

const TIPOS = {
  heroe: { es: "Héroe", en: "Hero" },
  villano: { es: "Villano", en: "Villain" },
  aliado: { es: "Aliado", en: "Ally" },
};

const CIUDAD = {
  neon: { es: "Ciudad Neón", en: "Neon City" },
};

const RAREZAS = {
  comun: { es: "Común", en: "Common" },
  rara: { es: "Rara", en: "Rare" },
  epica: { es: "Épica", en: "Epic" },
  legendaria: { es: "Legendaria", en: "Legendary" },
};

export default function TarjetaCromo({ heroe, mundo, onClick, en = false }) {
  const rareza = RAREZAS[heroe.rareza] ? heroe.rareza : "comun";
  const etiquetaRareza = RAREZAS[rareza][en ? "en" : "es"];
  const tipo = TIPOS[heroe.tipo] || TIPOS.heroe;
  const claveCiudad =
    mundo?.slug ||
    mundo?.codigo ||
    (mundo?.nombre?.toLowerCase().includes("neón") ? "neon" : null);
  const nombreMundo = CIUDAD[claveCiudad]?.[en ? "en" : "es"] || mundo?.nombre;

  return (
    <button className={`cromo cromo-${heroe.numero}`} onClick={onClick}>
      <span className="cromo-numero">{heroe.numero}</span>
      <span
        className={`cromo-rareza cromo-rareza--${rareza}`}
        aria-label={etiquetaRareza}
        title={etiquetaRareza}
      >
        <IconoMundo nombre={`rareza_${rareza}`} />
      </span>
      <IlustracionCromo mundo={mundo} />
      <b>{heroe.nombre}</b>
      <small>
        {nombreMundo} · {tipo[en ? "en" : "es"]}
      </small>
    </button>
  );
}