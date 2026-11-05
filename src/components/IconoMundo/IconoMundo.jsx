import "./IconoMundo.css";

const TRAZOS = {
  rayo: <path d="m14 2-9 12h6l-1 8 9-13h-6z" />,
  orbita: (
    <>
      <path d="M4 15c3-8 11-8 16-8M8 9c-6 5-3 10 4 8s11-9 6-10" />
      <circle cx="12" cy="13" r="4" />
    </>
  ),
  destello: <path d="m9 3 2 6 6 2-6 2-2 6-2-6-6-2 6-2zM19 14v8m-4-4h8" />,
  llama: (
    <path d="M13 2c2 5-4 6-2 11 3-1 4-4 4-6 7 7 6 15-3 15S2 14 7 8c0 5 2 5 2 5-2-5 4-7 4-11Z" />
  ),
  estrella: <path d="m12 2 3 6 7 1-5 5 1 8-6-4-6 4 1-8-5-5 7-1z" />,
  ojo: (
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Zm10-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6" />
  ),
  ola: (
    <path d="M2 15c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 20c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M7 10a5 5 0 0 1 10 0" />
  ),
  hoja: (
    <path d="M20 4C10 4 5 7 5 13a6 6 0 0 0 6 6c6 0 9-5 9-15ZM4 21c3-5 7-8 12-11" />
  ),
  runa: (
    <path d="m12 2 2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2ZM19 16v6m-3-3h6" />
  ),
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
  regalo: (
    <>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M10 6.66665C11.6667 3.33331 14.5833 3.74998 13.75 5.66665C13.1667 6.66665 10 6.66665 10 6.66665Z"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="var(--texto-principal)"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M9.99999 6.66665C8.33333 3.33331 5.41666 3.74998 6.24999 5.66665C6.83333 6.66665 9.99999 6.66665 9.99999 6.66665Z"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="var(--texto-principal)"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M10 6.66663V17.5"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="var(--texto-principal)"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M4.16667 10.8334V17.5H15.8333V10.8334"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="var(--texto-principal)"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M3.33333 6.66663H16.6667C17.1269 6.66663 17.5 7.03972 17.5 7.49996V9.99996C17.5 10.4602 17.1269 10.8333 16.6667 10.8333H3.33333C2.8731 10.8333 2.5 10.4602 2.5 9.99996V7.49996C2.5 7.03972 2.8731 6.66663 3.33333 6.66663Z"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="var(--texto-principal)"
      />
    </>
  ),
  libro: (
    <>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M10.8333 6.66663H14.1667"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="var(--texto-principal)"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M7.5 2.5V17.5"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="var(--texto-principal)"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M5.00001 2.5H15C15.9205 2.5 16.6667 3.24619 16.6667 4.16667V15.8333C16.6667 16.7538 15.9205 17.5 15 17.5H5.00001C4.07954 17.5 3.33334 16.7538 3.33334 15.8333V4.16667C3.33334 3.24619 4.07954 2.5 5.00001 2.5Z"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="var(--texto-principal)"
      />
    </>
  ),
  rareza_comun: <circle cx="12" cy="12" r="5" />,
  rareza_rara: <path d="m12 3 9 9-9 9-9-9 9-9Z" strokeLinejoin="miter" />,
  rareza_epica: (
    <path d="m12 2.5 2.9 6.1 6.7.9-4.9 4.6 1.2 6.7-5.9-3.3-5.9 3.3 1.2-6.7-4.9-4.6 6.7-.9L12 2.5Z" strokeLinejoin="miter" />
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
  flecha: (
    <svg
      className="menu-home__flecha"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  mundos: (
    <>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
        stroke="#1A1033"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M3 15.0001C6 10.0001 18 4.00006 21 7.00006"
        stroke="#1A1033"
      />
    </>
  ),
  home: (
    <svg
      className="icono-enlace-movil"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path
        d="m3.5 10 8.5-7 8.5 7v10.5h-6v-7h-5v7h-6z"
        strokeLinejoin="round"
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
