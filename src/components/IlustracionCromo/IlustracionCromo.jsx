import { useId } from "react";
import "./IlustracionCromo.css";
export default function IlustracionCromo({ mundo, holografico = false }) {
  const id = useId();
  return (
    <svg
      className={`retrato-heroe ${holografico ? "retrato-heroe--holografico" : ""}`}
      viewBox="0 0 200 240"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {holografico && (
          <linearGradient id={id} x1="0" y1="1" x2="1" y2="0">
            <stop stopColor="var(--marca-rosa)" stopOpacity=".12" />
            <stop offset=".48" stopColor="var(--mundo-orbita)" stopOpacity=".1" />
            <stop offset="1" stopColor="var(--marca-acento)" stopOpacity=".14" />
          </linearGradient>
        )}
        {holografico && (
          <linearGradient id={`${id}-figura`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="var(--mundo-coral)" />
            <stop offset=".55" stopColor="var(--mundo-orbita)" />
            <stop offset="1" stopColor="var(--marca-primario)" />
          </linearGradient>
        )}
      </defs>
      <rect width="200" height="240" fill={mundo.color} />
      <path
        d="m0 0 35 30-12-30h45l16 35L92 0h25l10 34 20-34h53l-28 44 28-10v27l-30 18 30 8v30l-35 12 35 25v86H0v-52l38-29L0 171v-40l29-17L0 95V70l34 9L0 47Z"
        fill="var(--texto-inverso)"
        opacity=".15"
      />
      <circle cx="100" cy="108" r="70" fill="var(--texto-inverso)" opacity=".23" />
      <circle
        cx="100"
        cy="137"
        r="30"
        fill={holografico ? `url(#${id}-figura)` : "var(--texto-principal)"}
      />
      <path
        d="M34 240v-30a66 66 0 0 1 132 0v30"
        fill={holografico ? `url(#${id}-figura)` : "var(--texto-principal)"}
      />
      <path
        d="M80 137h40"
        stroke="var(--marca-acento)"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path d="m100 179 3 8h9l-7 6 3 9-8-5-8 5 3-9-7-6h9Z" fill="var(--marca-acento)" />
      {holografico && (
        <rect
          className="capa-holografica"
          width="200"
          height="240"
          fill={`url(#${id})`}
        />
      )}
    </svg>
  );
}
