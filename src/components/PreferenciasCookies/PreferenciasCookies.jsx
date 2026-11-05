import { useEffect, useId, useRef, useState } from "react";
import "./PreferenciasCookies.css";
export default function PreferenciasCookies({
  abierto,
  textos,
  permitir,
  onGuardar,
  onCerrar,
  error,
}) {
  const dialogo = useRef(null);
  const id = useId();
  const [seleccion, setSeleccion] = useState(permitir);
  useEffect(() => {
    if (abierto) {
      setSeleccion(permitir);
      if (!dialogo.current.open) dialogo.current.showModal();
    } else if (dialogo.current.open) dialogo.current.close();
  }, [abierto, permitir]);
  return (
    <dialog
      className="preferencias-dialogo"
      ref={dialogo}
      aria-labelledby={id}
      onClose={onCerrar}
    >
      <h2 className="titular-h3" id={id}>{textos.cookies}</h2>
      <p className="cuerpo-p">{textos.descripcionCookiesPreferencias ?? textos.descripcion}</p>
      <section>
        <h3 className="titular-h4">{textos.necesarias}</h3>
        <p className="cuerpo-p">{textos.necesariasTexto}</p>
      </section>
      <label className="opcion-cookie">
        <input
          type="checkbox"
          checked={seleccion}
          onChange={(e) => setSeleccion(e.target.checked)}
        />
        <span>
          <strong className="cuerpo-p-fuerte">{textos.preferencias}</strong>
          <span className="detalle-nota">{textos.preferenciasTexto}</span>
        </span>
      </label>
      {error && <p className="cuerpo-p" role="alert">{textos.error}</p>}
      <div className="grupo-botones">
        <button
          className="boton-home primario cuerpo-p-fuerte"
          onClick={() => onGuardar(seleccion)}
        >
          {textos.guardar}
        </button>
        <button
          className="boton-home secundario cuerpo-p-fuerte"
          onClick={() => dialogo.current.close()}
        >
          {textos.cerrarPreferencias ?? textos.cerrar}
        </button>
      </div>
    </dialog>
  );
}
