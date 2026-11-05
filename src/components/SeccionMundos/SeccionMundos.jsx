import Flecha from "../Flecha/Flecha.jsx";
import TarjetaMundo from "../TarjetaMundo/TarjetaMundo.jsx";
import "./SeccionMundos.css";
export default function SeccionMundos({ mundos, textos = {} }) {
  const enlaceMundo = (plantilla, mundo) =>
    (plantilla ?? "").replaceAll("{mundo}", mundo);
  return (
    <section className="seccion-mundos" id="mundos">
      <div className="ancho-home">
        <div className="titulo-seccion">
          <div>
            <h2 className="titular-h2">{textos.mundosTitulo}</h2>
            <p className="cuerpo-m">{textos.mundosDescripcion}</p>
          </div>
          <a className="enlace-home cuerpo-p-fuerte" href={`/mundos/${mundos[0]?.id}`}>
            <Flecha />
            {enlaceMundo(textos.verCiudadNeon, mundos[0]?.nombre)}
          </a>
        </div>
        <div className="mundos-grid">
          {mundos.map((mundo, i) => (
            <TarjetaMundo
              key={mundo.nombre}
              mundo={mundo}
              i={i}
              textos={textos}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
