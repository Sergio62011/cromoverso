import { useState } from "react";
export function useDetalle(textos = {}) {
  const [detalle, setDetalle] = useState(null);
  function abrirCuenta(tipo) {
    setDetalle({
      titulo:
        tipo === "registro"
          ? textos.registroTitulo
          : textos.loginTitulo,
      descripcion: textos.cuentaNoDisponible,
      cerrar: textos.seguirExplorando,
    });
  }
  return { detalle, setDetalle, abrirCuenta };
}
