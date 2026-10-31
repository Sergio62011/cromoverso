import { useId } from "react";
import "./IlustracionCromo.css";
export default function IlustracionCromo({ mundo }) {
  const id = useId();
  return (
    <svg className="retrato-heroe" viewBox="0 0 200 240" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#ffe084" stopOpacity=".5" />
          <stop offset=".5" stopColor="#9af7dd" stopOpacity=".5" />
          <stop offset="1" stopColor="#ae86ff" stopOpacity=".65" />
        </linearGradient>
      </defs>
      <rect width="200" height="240" fill={mundo.color} />
      <path
        d="m0 0 35 30-12-30h45l16 35L92 0h25l10 34 20-34h53l-28 44 28-10v27l-30 18 30 8v30l-35 12 35 25v86H0v-52l38-29L0 171v-40l29-17L0 95V70l34 9L0 47Z"
        fill="white"
        opacity=".15"
      />
      <circle cx="100" cy="108" r="70" fill="white" opacity=".23" />
      <circle cx="100" cy="137" r="30" fill="#191130" />
      <path d="M34 240v-30a66 66 0 0 1 132 0v30" fill="#191130" />
      <path
        d="M80 137h40"
        stroke="#ffd744"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path d="m100 179 3 8h9l-7 6 3 9-8-5-8 5 3-9-7-6h9Z" fill="#ffd744" />
      <rect width="200" height="240" fill={`url(#${id})`} />
    </svg>
  );
}
