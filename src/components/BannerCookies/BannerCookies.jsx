import "./BannerCookies.css";
export default function BannerCookies({
  textos,
  onAceptar,
  onRechazar,
  onConfigurar,
}) {
  return (
    <aside className="banner-cookies" aria-label={textos.banner}>
      <h2 className="titular-h3">{textos.banner}</h2>
      <p className="cuerpo-p">{textos.descripcion}</p>
      <div className="grupo-botones">
        <button className="boton-home primario cuerpo-p-fuerte" onClick={onAceptar}>
          {textos.aceptar}
        </button>
        <button className="boton-home secundario cuerpo-p-fuerte" onClick={onRechazar}>
          {textos.rechazar}
        </button>
        <button className="enlace-home cuerpo-p-fuerte" onClick={onConfigurar}>
          {textos.configurar}
        </button>
      </div>
    </aside>
  );
}
