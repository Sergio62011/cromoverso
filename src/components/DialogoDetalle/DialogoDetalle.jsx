import { useEffect, useRef, useId } from "react";
import "./DialogoDetalle.css";
export default function DialogoDetalle({ detalle, onCerrar, textos = {} }) {
  const dialogo = useRef(null);
  const id = useId();
  useEffect(() => {
    if (detalle && !dialogo.current.open) dialogo.current.showModal();
    if (!detalle && dialogo.current.open) dialogo.current.close();
  }, [detalle]);
  return (
    <dialog
      className="detalle-home"
      ref={dialogo}
      onClose={onCerrar}
      aria-labelledby={id}
    >
      <button
        className="cerrar-detalle cuerpo-g"
        aria-label={detalle?.cerrar ?? textos.cerrar ?? "Cerrar"}
        onClick={() => dialogo.current.close()}
      >
        ×
      </button>
      <h2 className="titular-h2" id={id}>{detalle?.titulo}</h2>
      <p className="cuerpo-m">{detalle?.descripcion}</p>
      {detalle?.contenido}
      <button
        className="boton-home primario cuerpo-p-fuerte"
        onClick={() => dialogo.current.close()}
      >
        {detalle?.cerrar ?? textos.cerrar ?? "Cerrar"}
      </button>
    </dialog>
  );
}
