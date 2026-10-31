import Flecha from "../Flecha/Flecha.jsx";
import TarjetaMundo from "../TarjetaMundo/TarjetaMundo.jsx";
import "./SeccionMundos.css";
export default function SeccionMundos({ mundos, en, abrirMundo }) {
  return (
    <section className="seccion-mundos" id="mundos">
      <div className="ancho-home">
        <div className="titulo-seccion">
          <div>
            <h2>{en ? "The six worlds" : "Los seis mundos"}</h2>
            <p>
              {en
                ? "Each world has 20 cards featuring heroes, villains and allies."
                : "Cada mundo tiene 20 cromos de héroes, villanos y aliados."}
            </p>
          </div>
          <button className="enlace-home" onClick={() => abrirMundo(mundos[0])}>
            <Flecha />
            {en ? "View Ciudad Neón" : "Ver Ciudad Neón"}
          </button>
        </div>
        <div className="mundos-grid">
          {mundos.map((mundo, i) => (
            <TarjetaMundo
              key={mundo.nombre}
              mundo={mundo}
              i={i}
              en={en}
              onSeleccionar={abrirMundo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
