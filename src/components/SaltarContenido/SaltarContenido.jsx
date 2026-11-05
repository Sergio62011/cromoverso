import "./SaltarContenido.css";
export default function SaltarContenido({ texto, destino = "contenido" }) {
  return (
    <a className="saltar-contenido cuerpo-p-fuerte" href={`#${destino}`}>
      {texto}
    </a>
  );
}
