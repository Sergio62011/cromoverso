import IconoMundo from "../IconoMundo/IconoMundo.jsx";
import AbanicoCromos from "../AbanicoCromos/AbanicoCromos.jsx";
import "./HeroCromoverso.css";
export default function HeroCromoverso({
  en,
  heroes,
  mundos,
  abrirCuenta,
  onSeleccionarCromo,
}) {
  return (
    <section className="hero-cromoverso">
      <div className="ancho-home interior-cromoverso">
        <div className="texto-cromoverso">
          <h1>
            {en ? (
              <>
                Six worlds. 120 heroes.
                <br />
                An album of your own.
              </>
            ) : (
              <>
                Seis mundos. 120 héroes.
                <br />
                Un álbum tuyo.
              </>
            )}
          </h1>
          <p className="descripcion-cromoverso-movil">
            {en
              ? "Explore each world and meet its heroes. Sign up free with your email."
              : "Explora cada mundo y conoce a sus héroes. Crea tu cuenta gratis con tu correo."}
          </p>
          <div className="grupo-botones">
            <button
              className="boton-home primario"
              onClick={() => abrirCuenta("registro")}
            >
              <IconoMundo nombre="estrella" />
              {en ? "Sign up free" : "Crear cuenta gratis"}
            </button>
            <a href="#mundos" className="boton-home secundario">
              <IconoMundo nombre="orbita" />
              {en ? "Explore the worlds" : "Explorar los mundos"}
            </a>
          </div>
          <p>
            <IconoMundo nombre="destello" />
            {en
              ? "Sign up with your email and start your collection."
              : "Crea tu cuenta con tu correo y empieza tu colección."}
          </p>
        </div>
        <AbanicoCromos
          heroes={heroes}
          mundos={mundos}
          en={en}
          onSeleccionar={onSeleccionarCromo}
        />
      </div>
    </section>
  );
}
