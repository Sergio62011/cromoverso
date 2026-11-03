import "./styles/tokens.css";
import "./styles/base.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home.jsx";
import CatalogoMundo from "./pages/CatalogoMundo.jsx";
import { PreferenciasProvider } from "./context/PreferenciasContext.jsx";

const rutaMundo = window.location.pathname.match(/^\/mundos\/([^/]+)\/?$/);
const pagina = rutaMundo ? (
  <CatalogoMundo id={decodeURIComponent(rutaMundo[1])} />
) : (
  <Home />
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PreferenciasProvider>
      {pagina}
    </PreferenciasProvider>
  </StrictMode>,
);
