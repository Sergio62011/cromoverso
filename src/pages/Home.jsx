import LayoutPublico from "../components/LayoutPublico/LayoutPublico.jsx";
import HeroCromoverso from "../components/HeroCromoverso/HeroCromoverso.jsx";
import SeccionMundos from "../components/SeccionMundos/SeccionMundos.jsx";
import IlustracionCromo from "../components/IlustracionCromo/IlustracionCromo.jsx";
import DialogoDetalle from "../components/DialogoDetalle/DialogoDetalle.jsx";
import { usePreferencias } from "../context/PreferenciasContext.jsx";
import { useDetalle } from "../hooks/useDetalle.js";
import { mundos, heroes } from "../data/catalogo.js";

export default function Home() {
  const { idioma } = usePreferencias();
  const en = idioma === "en";
  const { detalle, setDetalle, abrirCuenta } = useDetalle(idioma);
  function abrirMundo(mundo) {
    setDetalle({
      titulo: mundo.nombre,
      descripcion: en
        ? "A world of 20 hero, villain and ally cards."
        : "Un mundo con 20 cromos de héroes, villanos y aliados.",
      cerrar: en ? "Close" : "Cerrar",
    });
  }
  function abrirCromo(heroe) {
    setDetalle({
      titulo: heroe.nombre,
      descripcion: `${mundos[heroe.mundo].nombre} · ${heroe.numero}`,
      contenido: <IlustracionCromo mundo={mundos[heroe.mundo]} />,
      cerrar: en ? "Close" : "Cerrar",
    });
  }
  return (
    <>
      <LayoutPublico
        destino="#mundos"
        etiqueta={en ? "Worlds" : "Mundos"}
        descripcion={
          en
            ? "Collect original heroes from six worlds."
            : "Colecciona héroes originales de seis mundos."
        }
        onCuenta={abrirCuenta}
      >
        <HeroCromoverso
          en={en}
          heroes={heroes}
          mundos={mundos}
          abrirCuenta={abrirCuenta}
          onSeleccionarCromo={abrirCromo}
        />
        <SeccionMundos mundos={mundos} en={en} abrirMundo={abrirMundo} />
        <DialogoDetalle detalle={detalle} onCerrar={() => setDetalle(null)} />
      </LayoutPublico>
    </>
  );
}
