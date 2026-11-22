import { useState } from "react";
export function useDetalle(textos = {}) {
  const [detalle, setDetalle] = useState(null);
  function abrirCuenta(tipo) {
    window.location.assign("/login");
  }
  return { detalle, setDetalle, abrirCuenta };
}
