# Home de Cromoverso

Proyecto React y Vite independiente. Incluye código ejecutable del home, componentes funcionales, estilos por componente y tokens. No depende de las otras carpetas del material.

## Ejecutar

Requiere Node.js 20.19 o posterior en la rama 20, o Node.js 22.12 o posterior.

```sh
npm ci
npm run dev
```

Abre la dirección que muestre Vite. Cada proyecto sirve su home en `/`.

```sh
npm run build
npm run preview
```

## Organización

- `src/pages/Home.jsx`: home y mundos destacados.
- `src/pages/CatalogoMundo.jsx`: catálogo de cromos, filtros y detalle del cromo.
- `src/components/`: cada carpeta incluye el componente `.jsx` y su `.css`.
- `src/styles/tokens.css`: colores de marca, fuentes, espaciado y radio.
- `src/styles/base.css`: reset, contenedores y elementos comunes.
- `src/data/catalogo.js`: datos de respaldo para la demo.
- `src/data/interfaz.js`: textos de respaldo en ES/EN.
- `src/context/PreferenciasContext.jsx`: estado compartido de idioma y consentimiento.
- `src/services/cookies.js`: lectura, guardado y eliminación de cookies.
- `src/services/api.js`: cliente GET para la API real del proyecto.
- `src/hooks/useRecurso.js`: consulta cancelable, carga, error y reintento.
- `src/hooks/useTextos.js`: obtiene los textos de la API según el idioma y los adapta al home.
- `src/hooks/useMundos.js`: obtiene los mundos de la API y usa el catálogo local como respaldo.
- `src/hooks/useDetalle.js`: datos del diálogo de demostración.

## Componentes incluidos

- `AbanicoCromos/AbanicoCromos.jsx` y `AbanicoCromos/AbanicoCromos.css`.
- `BannerCookies/BannerCookies.jsx` y `BannerCookies/BannerCookies.css`.
- `DialogoDetalle/DialogoDetalle.jsx` y `DialogoDetalle/DialogoDetalle.css`.
- `Flecha/Flecha.jsx` y `Flecha/Flecha.css`.
- `Footer/Footer.jsx` y `Footer/Footer.css`.
- `GestorCookies/GestorCookies.jsx` y `GestorCookies/GestorCookies.css`.
- `HeroCromoverso/HeroCromoverso.jsx` y `HeroCromoverso/HeroCromoverso.css`.
- `IconoMundo/IconoMundo.jsx` y `IconoMundo/IconoMundo.css`.
- `IlustracionCromo/IlustracionCromo.jsx` y `IlustracionCromo/IlustracionCromo.css`.
- `LayoutPublico/LayoutPublico.jsx` y `LayoutPublico/LayoutPublico.css`.
- `Marca/Marca.jsx` y `Marca/Marca.css`.
- `MenuMovil/MenuMovil.jsx` y `MenuMovil/MenuMovil.css`.
- `Navbar/Navbar.jsx` y `Navbar/Navbar.css`.
- `PreferenciasCookies/PreferenciasCookies.jsx` y `PreferenciasCookies/PreferenciasCookies.css`.
- `SaltarContenido/SaltarContenido.jsx` y `SaltarContenido/SaltarContenido.css`.
- `SeccionMundos/SeccionMundos.jsx` y `SeccionMundos/SeccionMundos.css`.
- `SelectorIdioma/SelectorIdioma.jsx` y `SelectorIdioma/SelectorIdioma.css`.
- `TarjetaCromo/TarjetaCromo.jsx` y `TarjetaCromo/TarjetaCromo.css`.
- `TarjetaMundo/TarjetaMundo.jsx` y `TarjetaMundo/TarjetaMundo.css`.

## Reutilizar

Importa el componente desde su carpeta y entrega sus datos por props. El componente importa su CSS. El archivo `main.jsx` carga tokens y estilos base una vez; otra página que use estos componentes debe mantener esas dos importaciones.

`LayoutPublico` compone Navbar, Footer, enlace de salto, contenido y gestor de cookies. Requiere `PreferenciasProvider`, ya montado en `main.jsx`. Las tarjetas reciben datos y callbacks; no hacen solicitudes HTTP por instancia.

Los estilos están separados por responsabilidad, pero usan las clases y los tokens del proyecto. Para copiar una tarjeta a otra aplicación, incluye sus componentes hijos, su CSS y los tokens que utiliza.

## Datos y API

El home carga los mundos desde `GET /mundos`. Cada mundo abre su catálogo en `/mundos/{id}`, que carga sus cromos y datos desde `GET /mundos/{id}`. Los textos de interfaz se cargan con `GET /textos?idioma=es` o `GET /textos?idioma=en`; los catálogos locales son respaldo si no se puede consultar la API.

API configurada: `https://yanethm-cromoverso-api.fly.dev/api/v1`.

El endpoint de textos usado por el home es `GET /textos?idioma=es` o `GET /textos?idioma=en`.

Las listas llegan en `datos`, las listas paginadas incluyen `paginacion` y los textos llegan en `textos`. Consulta el [contrato](https://yanethm-cromoverso-api.fly.dev/docs/contrato) antes de adaptar campos. El formulario de fecha de Taquilla es una demostración local: el contrato no documenta filtro remoto por fecha.

`useTextos` conserva el árbol de textos del contrato y prepara alias para los componentes del home. Los componentes de presentación no necesitan conocer la URL de la API.

## Cookies e idioma

El banner permite aceptar, rechazar o configurar. El footer vuelve a abrir el diálogo. Solo se persiste el idioma si se aceptan preferencias; al rechazarlas se elimina la cookie de idioma.

Se usan nombres `cromoverso_consentimiento` y `cromoverso_idioma`, con `Path=/`, para aislar estas demostraciones incluso cuando se ejecutan bajo el mismo host con diferentes puertos. Esta es una decisión del material distribuible; los contratos describen los nombres generales `consentimiento` e `idioma`.

No se instalan servicios de analítica ni publicidad y no se crea una sesión de usuario. La decisión se guarda por seis meses. Si el navegador bloquea el almacenamiento se muestra un error.

## Accesibilidad

Enlace de salto al contenido, menú con `aria-expanded`, Escape y retorno de foco, selector de idioma con `aria-pressed`, formularios etiquetados, estados anunciados, diálogos nativos y CSS para movimiento reducido. Comprueba teclado y zoom al modificar los componentes.

## Alcance

Solo el home. Los botones de cuenta abren un aviso; las tarjetas abren detalles locales de demostración. No hay registro, reproducción, compra ni vistas adicionales. Las fuentes de Google Fonts requieren conexión; el CSS incluye fuentes de respaldo.
