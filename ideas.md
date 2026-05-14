# Ideas de Diseño — La Guaca Boutique

## Contexto
Boutique de ropa femenina premium en Montería, Colombia. La identidad visual debe transmitir elegancia accesible, calidez latinoamericana y modernidad editorial.

---

<response>
<probability>0.07</probability>
<idea>

**Diseño Movement:** Minimalismo Editorial Latinoamericano

**Core Principles:**
1. Contraste tipográfico extremo: títulos serif pesados vs. cuerpo sans-serif ligero
2. Espacio negativo como protagonista — el silencio comunica lujo
3. Fotografía de producto como arte, no como ficha técnica
4. Navegación invisible que no compite con el producto

**Color Philosophy:**
- Fondo: blanco roto cálido `#FAFAF8` — evoca papel de revista de moda
- Texto primario: negro profundo `#0D0D0D`
- Acento: terracota suave `#C4785A` — remite a la tierra colombiana sin ser folclórico
- Borde/separador: gris arena `#E8E4DF`

**Layout Paradigm:**
- Asimétrico editorial: columnas de distinto ancho, texto que invade la imagen
- Hero de pantalla completa con tipografía superpuesta en escala masiva
- Catálogo en grid de 2-4 columnas con espaciado generoso

**Signature Elements:**
1. Línea fina horizontal como separador de secciones (1px, color acento)
2. Números de categoría en tipografía serif gigante como decoración de fondo
3. Etiquetas de precio con fondo terracota suave

**Interaction Philosophy:**
- Hover en tarjeta: la imagen hace zoom lento (scale 1.05, 400ms ease-out), el overlay de nombre sube desde abajo
- Carrito: desliza desde la derecha con overlay oscuro semitransparente
- Botones: sin relleno por defecto, borde fino; al hover se llenan con negro

**Animation:**
- Entrada de página: fade + translateY(16px) → 0, 300ms, stagger 60ms por elemento
- Skeleton loaders con shimmer cálido mientras carga el CSV
- Badge del carrito: scale bounce al agregar producto

**Typography System:**
- Display/Títulos: `Playfair Display` — serif clásico con personalidad
- Cuerpo/UI: `Inter` — legible, neutro, moderno
- Jerarquía: H1 64px/700, H2 36px/600, H3 24px/500, body 15px/400

</idea>
</response>

<response>
<probability>0.05</probability>
<idea>

**Diseño Movement:** Brutalismo Suave / Neo-Grotesco

**Core Principles:**
1. Tipografía como elemento gráfico dominante
2. Grid rígido con quiebres intencionales
3. Fotografía en blanco y negro con un solo color de acento
4. Interacciones abruptas y satisfactorias

**Color Philosophy:**
- Fondo: blanco puro `#FFFFFF`
- Texto: negro absoluto `#000000`
- Acento único: amarillo mostaza `#E8B84B`
- Sin gradientes, sin sombras suaves

**Layout Paradigm:**
- Columnas de ancho fijo con bordes visibles
- Texto que sangra fuera de su contenedor
- Precios en tipografía monoespaciada grande

**Signature Elements:**
1. Bordes negros de 2px en tarjetas de producto
2. Flechas de navegación dibujadas a mano (SVG)
3. Etiquetas de categoría con fondo amarillo

**Interaction Philosophy:**
- Hover: desplazamiento brusco de 4px (offset) sin transición suave
- Botones: texto en mayúsculas, sin radius, con sombra offset sólida

**Animation:**
- Transiciones de página: slide horizontal instantáneo
- Hover en tarjeta: borde se engrosa de 1px a 3px

**Typography System:**
- Display: `Space Grotesk` — grotesco contemporáneo
- Cuerpo: `Space Mono` — monoespaciado para precios y datos
- Jerarquía: H1 80px/700, body 14px/400

</idea>
</response>

<response>
<probability>0.08</probability>
<idea>

**Diseño Movement:** Lujo Orgánico / Biophilic Fashion

**Core Principles:**
1. Texturas naturales sutiles como fondos (lino, papel)
2. Paleta derivada de pigmentos naturales colombianos
3. Tipografía con carácter artesanal
4. Espaciado generoso que respira

**Color Philosophy:**
- Fondo: crema cálida `#F5F0E8`
- Texto: marrón oscuro `#2C1810`
- Acento primario: verde salvia `#7A8C6E`
- Acento secundario: durazno `#E8A87C`

**Layout Paradigm:**
- Masonry asimétrico para el catálogo
- Secciones con fondos alternos (crema / blanco / salvia muy claro)
- Hero con imagen de fondo texturizada

**Signature Elements:**
1. Iconos dibujados a mano (línea fina)
2. Separadores con motivos florales SVG minimalistas
3. Etiquetas de producto con esquinas redondeadas y sombra suave

**Interaction Philosophy:**
- Hover: transición de color suave (300ms) con sombra que crece
- Scroll: parallax sutil en imágenes de hero

**Animation:**
- Entrada: fade-in con ligero scale desde 0.98
- Carrito: spring animation al abrir/cerrar

**Typography System:**
- Display: `Cormorant Garamond` — serif refinado con personalidad orgánica
- Cuerpo: `Lato` — limpio y legible
- Jerarquía: H1 56px/600 italic, body 15px/300

</idea>
</response>

---

## Decisión Final: Minimalismo Editorial Latinoamericano

Se elige la primera opción por su equilibrio entre elegancia editorial y funcionalidad e-commerce. La combinación de Playfair Display + Inter, la paleta blanco-negro con acento terracota, y el layout asimétrico crean una identidad premium que se diferencia de las tiendas genéricas sin sacrificar la usabilidad móvil.
