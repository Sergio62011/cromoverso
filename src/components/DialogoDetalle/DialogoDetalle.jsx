import { useEffect, useRef, useId } from "react";
import IconoMundo from "../IconoMundo/IconoMundo.jsx";
import "./DialogoDetalle.css";
export default function DialogoDetalle({ detalle, onCerrar, textos = {} }) {
  const dialogo = useRef(null);
  const id = useId();
  const etiquetaCerrar = detalle?.tipo === "cromo"
    ? detalle.cerrar
    : detalle?.cerrar ?? textos.cerrar ?? textos.cerrarDialogo;
  useEffect(() => {
    if (detalle && !dialogo.current.open) dialogo.current.showModal();
    if (!detalle && dialogo.current.open) dialogo.current.close();
  }, [detalle]);
  return (
    <dialog
      className={`detalle-home ${detalle?.tipo === "cromo" ? "detalle-home--cromo" : ""}`}
      ref={dialogo}
      onClose={onCerrar}
      aria-labelledby={detalle?.tipo === "cromo" ? "titulo-ficha-cromo" : id}
    >
      <button
        className="cerrar-detalle cuerpo-g"
        aria-label={etiquetaCerrar}
        onClick={() => dialogo.current.close()}
      >
        <IconoMundo nombre="cerrar" />
      </button>
      {detalle?.tipo !== "cromo" && <><h2 className="titular-h2" id={id}>{detalle?.titulo}</h2><p className="cuerpo-m">{detalle?.descripcion}</p></>}
      {detalle?.contenido}
      {detalle?.tipo !== "cromo" && <button
        className="boton-home primario cuerpo-p-fuerte"
        onClick={() => dialogo.current.close()}
      >
        {etiquetaCerrar}
      </button>}
    </dialog>
  );
}
