# Karito Fest / KaritoEmpre — Frontend Web

Repositorio: `C:\Users\USUARIO\Documents\GitHub\KaritoEmpre`

Proyecto frontend dividido en dos secciones principales conectadas entre sí:
1. **Eventos y Decoración con Globos (`index.html` + `style.css`)**: Estilo editorial *Luna & Confetti* con acceso directo al apartado de **FLORES** en la barra de navegación.
2. **Tienda de Flores — Karito Fest (`flores.html`, `ocasiones.html`, `flores.css`, `cart.js`)**: Catálogo floral en tonos rosa (`#e85382`) y blanco, tipografía única `Plus Jakarta Sans` en toda la web (excepto el logo **Karito *Fest*** que usa `Cormorant Garamond`).

---

## Estructura actual de archivos

- `index.html` y `style.css`: Portada principal de eventos (Hero, cinta animada `PARTY +`, 4 paquetes de decoración, sección *The Studio* y menú de alquiler) + botón **FLORES** hacia `flores.html`.
- `flores.html`: Tienda de flores **Karito Fest** a ancho completo (`100%`), sin barra superior informativa. Incluye:
  - Cabecera unificada: Logo (`assets/flores/logo-karito-fest.png`) + botón **Catálogo** + buscador amplio + Perfil / Favoritos / **Carrito**.
  - **Hero carrusel automático** (4 diapositivas deslizantes cada 4s con pausa al pasar el mouse y dots interactivos).
  - **Carrusel continuo de Ocasiones** (*"Tenemos arreglos para todas las ocasiones"*): 7 círculos en movimiento infinito (*Amor, Aniversario, Condolencias, Cumpleaños, Graduación, Mejórate pronto, Nacimientos*) que enlazan a `ocasiones.html?ocasion=...`.
  - **Ramos populares** (5 columnas) y **Categorías** (6 columnas).
  - **3 Banners promocionales / descuento** (10% primer pedido, envío gratis, tarjeta de regalo).
  - **Franja de 4 beneficios** (*Entrega rápida, Flores frescas, Garantía de calidad, Pago cómodo*) al final antes del footer.
- `ocasiones.html`: Vista filtrable por ocasión con breadcrumb (`Karito Fest > [Ocasión]`), barra lateral izquierda (acordeones de *Ocasiones*, *Color*, *Categoría* y *Rango de precio*), ordenamiento (*Ventas / Menor precio / Mayor precio*), selector `- 1 +` y botón **Comprar ahora**.
- `cart.js`: **Panel lateral deslizante del carrito (Cart Drawer)** compartido entre `flores.html` y `ocasiones.html`, con persistencia en `localStorage` (`karitoFestCart`), edición de cantidades, eliminación de productos y cálculo de subtotal.
- `flores.css`: Hoja de estilos completa para `flores.html`, `ocasiones.html` y el panel lateral del carrito.

---

## Imágenes ya incluidas vs. espacios pendientes

### Incluidas en `assets/`
- `assets/hero-balloons.jpg`, `assets/studio-bows.jpg`, `assets/card-1.jpg` a `card-4.jpg` (para `index.html`).
- `assets/flores/logo-karito-fest.png` (emblema floral rosa/dorado del logo **Karito Fest**).

### Espacios preparados en `flores.html` y `ocasiones.html` (colocar fotos propias)
Cada recuadro muestra en pantalla su nombre exacto y desaparece al colocar la imagen:
- **Hero Slides** (`assets/flores/`): `hero-ramo.png`, `hero-ramo-2.png`, `hero-ramo-3.png`, `hero-ramo-4.png`.
- **Ocasiones circulares** (`assets/flores/`): `ocasion-amor.jpg`, `ocasion-aniversario.jpg`, `ocasion-condolencias.jpg`, `ocasion-cumpleanos.jpg`, `ocasion-graduacion.jpg`, `ocasion-mejorate.jpg`, `ocasion-nacimientos.jpg`.
- **Ramos populares** (`assets/flores/`): `ramo-1.jpg` a `ramo-5.jpg`.
- **Categorías** (`assets/flores/`): `cat-1.jpg` a `cat-6.jpg`.
- **Promociones** (`assets/flores/`): `promo-1.png` a `promo-3.png`.
- **Productos de `ocasiones.html`** (`assets/flores/productos/`): `amor-1.jpg`, `amor-2.jpg`, `aniv-1.jpg`, `aniv-2.jpg`, `cond-1.jpg` a `cond-4.jpg`, `cump-1.jpg`, `cump-2.jpg`, `grad-1.jpg`, `grad-2.jpg`, `mej-1.jpg`, `nac-1.jpg`.

---

## Próximos pasos sugeridos para continuar en otro chat
- Conectar el buscador de `flores.html` y filtros interactivos en la portada.
- Hacer funcional la sección de **Favoritos** y el botón **Finalizar pedido** (por ejemplo, envío directo de resumen por WhatsApp).
- Adaptar este frontend completo a un tema de **WordPress / WooCommerce** una vez terminado el diseño.
