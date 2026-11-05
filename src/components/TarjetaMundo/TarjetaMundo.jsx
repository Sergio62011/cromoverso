import IconoMundo from "../IconoMundo/IconoMundo.jsx";
import "./TarjetaMundo.css";
export default function TarjetaMundo({ mundo, i, textos = {} }) {
  const interpolar = (plantilla, valores) =>
    Object.entries(valores).reduce(
      (texto, [clave, valor]) => texto.replaceAll(`{${clave}}`, valor),
      plantilla ?? "",
    );
  return (
    <a
      className="tarjeta-mundo"
      style={{
        "--mundo": mundo.color,
        "--fondo-mundo":
          mundo.fondo ??
          "color-mix(in srgb, var(--mundo) 14%, var(--fondo-superficie))",
      }}
      href={`/mundos/${mundo.id}`}
    >
      <span className="icono-mundo">
        <IconoMundo nombre={mundo.icono} />
      </span>
      {i === 0 && (
        <span className="etiqueta-mundo detalle-etiqueta">
          {interpolar(textos.mundoNumero, { numero: i + 1 })}
        </span>
      )}
      <b className="titular-h4">{mundo.nombre}</b>
      <small className="cuerpo-p">
        {interpolar(textos.veinteCromos, {
          cantidad:
            mundo.totalCromos ??
            (mundo.numeros
              ? mundo.numeros.hasta - mundo.numeros.desde + 1
              : 20),
        })}
      </small>
    </a>
  );
}
