import "./IconoMundo.css";

const TRAZOS = {
  rayo: <path d="m14 2-9 12h6l-1 8 9-13h-6z" />,
  orbita: <><path d="M4 15c3-8 11-8 16-8M8 9c-6 5-3 10 4 8s11-9 6-10" /><circle cx="12" cy="13" r="4" /></>,
  destello: <path d="m9 3 2 6 6 2-6 2-2 6-2-6-6-2 6-2zM19 14v8m-4-4h8" />,
  llama: <path d="M13 2c2 5-4 6-2 11 3-1 4-4 4-6 7 7 6 15-3 15S2 14 7 8c0 5 2 5 2 5-2-5 4-7 4-11Z" />,
  estrella: <path d="m12 2 3 6 7 1-5 5 1 8-6-4-6 4 1-8-5-5 7-1z" />,
  ojo: <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Zm10-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6" />,
  buscar: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  menu: (
    <>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </>
  ),
  cerrar: <path d="m6 6 12 12M6 18 18 6" />,
  favoritos: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
  ),
  idioma: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a18 18 0 0 1 0 18 18 18 0 0 1 0-18Z" />
    </>
  ),
  accesibilidad: (
    <>
      <circle cx="12" cy="4" r="2" />
      <path d="M4 8h16M12 6v8m0 0-4 7m4-7 4 7" />
    </>
  ),
  logo: (
    <>
      <path
        d="M12 2.79999L14.8 8.59999L21.2 9.49999L16.6 14L17.7 20.3L12 17.3L6.29999 20.3L7.39999 14L2.79999 9.49999L9.19999 8.59999L12 2.79999Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  rareza_comun: <circle cx="12" cy="12" r="5" />,
  rareza_rara: <path d="m12 3 9 9-9 9-9-9 9-9Z" />,
  rareza_epica: (
    <path d="m12 2 2.6 6.2L21 11l-6.4 2.8L12 20l-2.6-6.2L3 11l6.4-2.8L12 2Z" />
  ),
  rareza_legendaria: (
    <svg
      x="2"
      y="2"
      width="20"
      height="20"
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M1.75 11.0833H12.25"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      />
      <path
        d="M2.625 9.33325L1.75 4.08325L4.66667 6.41659L7 2.33325L9.33333 6.41659L12.25 4.08325L11.375 9.33325H2.625Z"
        fill="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      />
    </svg>
  ),
};

export default function IconoMundo({ nombre }) {
  return (
    <svg
      viewBox="2 2 20 20"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {TRAZOS[nombre] || TRAZOS.estrella}
    </svg>
  );
}
