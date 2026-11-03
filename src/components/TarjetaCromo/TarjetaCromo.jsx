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

export default function TarjetaCromo({
  heroe,
  mundo,
  onClick,
  en = false,
  textos = {},
}) {
  const rareza = RAREZAS[heroe.rareza] ? heroe.rareza : "comun";
  const nombreRareza = `rareza${rareza.charAt(0).toUpperCase()}${rareza.slice(1)}`;
  const etiquetaRareza =
    textos[nombreRareza] || RAREZAS[rareza][en ? "en" : "es"];
  const tipo = TIPOS[heroe.tipo] || TIPOS.heroe;
  const nombreTipo = `tipo${(heroe.tipo || "heroe").charAt(0).toUpperCase()}${(heroe.tipo || "heroe").slice(1)}`;
  const claveCiudad =
    mundo?.slug ||
    mundo?.codigo ||
    (mundo?.nombre?.toLowerCase().includes("neón") ? "neon" : null);
  const nombreMundo = CIUDAD[claveCiudad]?.[en ? "en" : "es"] || mundo?.nombre;
  const numero = String(heroe.numero).padStart(3, "0");
  const etiquetaTipo = textos[nombreTipo] || tipo[en ? "en" : "es"];
  const Elemento = onClick ? "button" : "article";

  return (
    <Elemento
      className={`cromo cromo-${numero}`}
      onClick={onClick}
      aria-label={onClick ? `${numero} ${heroe.nombre}, ${etiquetaRareza}, ${etiquetaTipo}` : undefined}
    >
      <span className="cromo-numero">{numero}</span>
      <span
        className={`cromo-rareza cromo-rareza--${rareza}`}
        aria-label={etiquetaRareza}
        title={etiquetaRareza}
      >
        <IconoMundo nombre={`rareza_${rareza}`} />
      </span>
      <span
        className={`cromo-ilustracion ${heroe.holografico === true ? "cromo-ilustracion--holografica" : ""}`}
        style={{ backgroundColor: mundo?.color }}
      >
        <IlustracionCromo mundo={mundo} holografico={heroe.holografico === true} />
      </span>
      <b>{heroe.nombre}</b>
      <small>
        {heroe.mundoNombre || nombreMundo} · {etiquetaTipo}
      </small>
    </Elemento>
  );
}
