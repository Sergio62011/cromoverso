import { useEffect } from "react";
import LayoutPublico from "../components/LayoutPublico/LayoutPublico.jsx";
import HeroCromoverso from "../components/HeroCromoverso/HeroCromoverso.jsx";
import SeccionMundos from "../components/SeccionMundos/SeccionMundos.jsx";
import IlustracionCromo from "../components/IlustracionCromo/IlustracionCromo.jsx";
import DialogoDetalle from "../components/DialogoDetalle/DialogoDetalle.jsx";
import { usePreferencias } from "../context/PreferenciasContext.jsx";
import { useDetalle } from "../hooks/useDetalle.js";
import { useTextos } from "../hooks/useTextos.js";
import { useMundos } from "../hooks/useMundos.js";
import { useCromosDestacados } from "../hooks/useCromosDestacados.js";
import { proyecto } from "../config/proyecto.js";

export default function Home() {
  const { idioma } = usePreferencias();
  const { textos } = useTextos(idioma);
  const { mundos } = useMundos();
  const { cromos: heroes } = useCromosDestacados();
  const en = idioma === "en";
  const leer = (clave, respaldo) => textos[clave] || respaldo;
  const { detalle, setDetalle, abrirCuenta } = useDetalle(textos);
  useEffect(() => {
    document.title = textos.tituloPagina;
  }, [textos.tituloPagina]);
  function abrirCromo(heroe, mundo) {
    mundo ??=
      typeof heroe.mundo === "number"
        ? mundos[heroe.mundo]
        : mundos.find((item) => item.id === heroe.mundo);
    setDetalle({
      titulo: heroe.nombre,
      descripcion:
        heroe.descripcion ?? `${mundo?.nombre ?? heroe.mundoNombre} · ${heroe.numero}`,
      contenido: (
        <IlustracionCromo
          mundo={{ ...mundo, color: heroe.ilustracion?.colorBase ?? mundo?.color }}
          holografico={heroe.holografico === true}
        />
      ),
      cerrar: textos.cerrarDialogo,
    });
  }
  return (
    <>
      <LayoutPublico
        textos={textos}
        destino="#mundos"
        etiqueta={leer("mundos", en ? "Worlds" : "Mundos")}
        descripcion={leer(
          "descripcionInicio",
          en
            ? "Collect original heroes from six worlds."
            : "Colecciona héroes originales de seis mundos.",
        )}
        onCuenta={abrirCuenta}
      >
        <HeroCromoverso
          textos={textos}
          en={en}
          heroes={heroes}
          mundos={mundos}
          abrirCuenta={abrirCuenta}
          onSeleccionarCromo={abrirCromo}
        />
        <SeccionMundos
          mundos={mundos}
          textos={textos}
        />
        <DialogoDetalle
          detalle={detalle}
          textos={textos}
          onCerrar={() => setDetalle(null)}
        />
      </LayoutPublico>
    </>
  );
}
