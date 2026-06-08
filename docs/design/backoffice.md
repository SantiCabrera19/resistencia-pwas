# Backoffice Design – Santi Soluciones

## 1. Propósito del backoffice

El backoffice existe para que dueños y operadores trabajen rápido y cometan menos errores.
Prioriza **claridad, velocidad y consistencia**, por encima de lo visualmente llamativo.

Casos principales:
- Control de operaciones diarias (ventas, reservas, turnos, stock).
- Consulta rápida de información crítica (estadísticas, alertas, vencimientos).
- Configuración básica (precios, horarios, usuarios, permisos).

---

## 2. Principios de diseño

1. **Función sobre estilo**  
   - Si una decisión de diseño enfrenta “más lindo” vs “más claro”, siempre gana lo claro.
   - Elementos decorativos mínimos: sin gradients agresivos, sin fondos con fotos.

2. **Consistencia primero**  
   - Misma tipografía, tamaños y espaciado en todo el backoffice.
   - Los mismos tipos de acciones (guardar, eliminar, filtrar) se muestran siempre en el mismo lugar.

3. **Baja carga cognitiva**  
   - Cada pantalla debe tener un objetivo obvio (ej: “gestionar productos”, “ver turnos de hoy”).
   - No se mezclan tareas de edición masiva con tareas de consulta rápida.

4. **Velocidad operativa**  
   - Flujos cortos (ideal 1–3 pasos).
   - Atajos y acciones en bloque cuando tenga sentido (seleccionar varios ítems, aplicar acciones masivas).

---

## 3. Identidad visual del backoffice

### 3.1 Paleta base

> Ajustar hex según proyecto, pero mantener la estructura.

- **Fondo principal:** gris muy claro o beige desaturado  
  - `--bg`: `#F5F5F5` o `#F4F1EC`
- **Superficie / tarjetas / modales:** blanco  
  - `--surface`: `#FFFFFF`
- **Texto principal:** gris oscuro  
  - `--text-primary`: `#1F2933`
- **Texto secundario / labels:** gris medio  
  - `--text-secondary`: `#6B7280`
- **Bordes suaves / dividers:** gris claro  
  - `--border-subtle`: `#E5E7EB`
- **Color de acento (marca del cliente):**  
  - `--accent`: definido por proyecto (ej: verde oliva, rojo vino).
- **Estados:**
  - `--success`: `#16A34A`
  - `--warning`: `#F59E0B`
  - `--danger`: `#DC2626`
  - `--info`: `#0EA5E9`

Reglas:
- Fondo general neutro, contenidos sobre superficies blancas.
- El color de acento se usa solo para acciones primarias, links y elementos clave, no para fondos grandes.

### 3.2 Tipografía

- **Fuente:** sans-serif limpia (ej: Inter / system / Roboto).
- **Escala de tamaños (mobile/desktop):**
  - Título de página: `1.5rem–1.75rem`, peso semibold.
  - Subtítulo / sección: `1.125rem–1.25rem`, semibold.
  - Texto base: `0.95rem–1rem`, normal.
  - Caption / labels: `0.75rem–0.8rem`, medium.

Reglas:
- No usar más de 2 tamaños de texto diferentes dentro de la misma tarjeta o formulario.
- Evitar mayúsculas completas salvo en pill labels muy cortos.

### 3.3 Espaciado y grid

- **Base de espaciado:** múltiplos de 4px (4, 8, 12, 16, 24, 32).
- **Layout general:**
  - Sidebar + topbar en desktop.
  - Solo topbar + menú tipo drawer en mobile.
- **Densidad:**
  - Verticalmente, dejar aire entre secciones; tablas pueden ser más densas pero siempre legibles.
  - Evitar más de 3 niveles de anidamiento visual (página → sección → tarjeta).

---

## 4. Componentes clave

### 4.1 App Shell

- **Topbar:**
  - Contiene título de la vista actual.
  - Acciones globales: selector de negocio (si aplica), perfil de usuario.
- **Sidebar (desktop):**
  - Navegación principal agrupada por módulos (Operaciones, Catálogo, Reportes, Configuración).
  - Ícono + label, nunca ícono solo.
- **Drawer (mobile):**
  - Se abre desde ícono de menú en el topbar.
  - Mismas secciones que la sidebar.

### 4.2 Tarjetas (cards)

Uso:
- KPIs y resúmenes (ventas del día, mesas ocupadas, turnos de hoy).
- Grupos de acciones relacionadas.

Estilo:
- Fondo blanco, borde suave (`--border-subtle`) y sombra muy ligera.
- Título arriba, contenido centrado verticalmente.
- No más de 1 CTA primaria por tarjeta.

### 4.3 Tablas y listas

Uso:
- Listado de productos, turnos, reservas, ventas, clientes.

Requisitos:
- Fila clickeable completa o icono de acción explícito, pero consistente en todo el sistema.
- Cabecera fija en scroll vertical cuando la tabla es alta.
- Soporte para:
  - Búsqueda rápida.
  - Filtros simples (estado, fecha, categoría).
  - Paginación clara (indicando cuántos elementos se muestran).

Estados:
- Empty state con mensaje claro y CTA (“No hay productos todavía. Crear producto”).
- Loading con skeletons simples, sin animaciones pesadas.

### 4.4 Formularios

Principios:
- Formularios divididos en secciones lógicas (Datos básicos, Precios, Configuración avanzada).
- Labels visibles siempre, no solo placeholders.
- Ayuda contextual (tooltips / texto secundario) para campos complejos.

Validación:
- Validar en tiempo real cuando sea posible.
- Errores siempre en rojo, mensaje claro debajo del campo.

Acciones:
- Botón principal: lado derecho, color de acento.
- Botón secundario (Cancelar / Volver): estilo ghost o texto, nunca competir visualmente con el primario.

### 4.5 Modales y drawers

Uso:
- Modales para acciones de confirmación importante o formularios cortos.
- Drawers laterales para edición rápida sin salir de la vista.

Reglas:
- Un único propósito por modal/drawer.
- Cerrar con esc + icono de cierre visible.
- Botones alineados a la derecha, primario siempre visible sin scroll.

---

## 5. Comportamiento y UX

### 5.1 Flujos principales

Cada módulo debe tener definidos sus flujos “rápidos”, por ejemplo:

- Tomar pedido / venta rápida.
- Registrar reserva / turno.
- Actualizar stock crítico.
- Ver reportes del día.

Reglas:
- Máximo 3 pantallas para completar cualquier flujo crítico.
- Siempre ofrecer feedback claro al finalizar (toast + actualización visual inmediata en la tabla/lista).

### 5.2 Feedback y estados

- **Éxito:** toast discreto arriba a la derecha, sin bloquear interacción.
- **Error:** mensaje claro, explicar qué hacer (“Revisá el campo X”, “Intentá más tarde”).
- **Procesando:** spinners pequeños dentro del propio botón o sección, evitar overlays de pantalla completa salvo en operaciones muy pesadas.

### 5.3 Responsive y PWA

- Mobile first: todas las vistas deben ser totalmente operables en pantallas pequeñas.
- Evitar hovers como dependencia principal (usar estados activos / focus).
- Gestos simples:
  - Swipe para cerrar drawers.
  - Pull-to-refresh solo si es claramente necesario.

---

## 6. Accesibilidad y buenas prácticas

- Contraste suficiente entre texto y fondo (especialmente en tablas y formularios).
- Tamaño mínimo de tap target: 40×40px.
- No depender solo del color para transmitir estado (usar íconos y texto).

---

## 7. Notas por cliente / demo

> En esta sección se documentan ajustes específicos por nicho, sin romper las reglas generales.

### Restaurantes / Bares

- Acento sugerido: verde oliva, rojo vino o similar al branding del local.
- KPIs destacados:
  - Mesas ocupadas / disponibles.
  - Ventas del día (Caja).
  - Reservas próximas.

### Ferreterías / ERP

- Mayor énfasis en tablas densas y filtros potentes.
- Acento más sobrio (azul / gris azul).

### Consultorios

- Priorizar agenda y detalle del paciente.
- Uso fuerte de estados (turno confirmado, pendiente, cancelado).

---

## 8. Eliminación de "AI Slop" (Diseño Genuino vs. Plantilla Genérica)

El "AI Slop" es el diseño inflado, decorativo y sin utilidad real que suelen generar las inteligencias artificiales por defecto. Para evitar que el sistema parezca una plantilla genérica de internet, se aplican las siguientes reglas de trinchera:

1. **Prohibición de KPIs de Adorno**:
   - Cada métrica en la pantalla principal debe requerir una acción del operador.
   - **Incorrecto**: *"Tasa de interacción global: +4.2%"* o *"Gráficos de dispersión mensuales"*.
   - **Correcto**: *"Platos pausados: 2"*, *"Stock Crítico: 3 productos"*, *"Ventas de hoy (Caja): $125.000"*.

2. **Acciones Inline sobre Modales**:
   - Cambiar precios o pausar disponibilidad debe hacerse en la misma tabla con **toggles físicos o inputs rápidos**, sin abrir drawers ni confirmaciones molestas salvo para eliminar datos históricos.

3. **Sin Gráficos de Relleno**:
   - Evitar cargar librerías pesadas como `Recharts` o `Chart.js` solo para mostrar tendencias planas. Es preferible usar **barras de progreso nativas (HTML `<progress>`)** o indicadores de estado semafóricos.

4. **Identidad del Chaco y Datos Reales**:
   - Los placeholders iniciales deben reflejar el comercio real y los modismos de la zona. No usar nombres genéricos como *"John Doe"* o productos de ejemplo en inglés.
   - **Ejemplo**: *"Mbaipy Chaqueño"*, *"Chipá calentito"*, *"Av. Alberdi 420"*.

5. **Eliminación de Degradados SaaS**:
   - Los botones y bordes no deben usar degradados de colores neón o morados que simulen una plataforma cripto. El backoffice de Santi Soluciones respeta los colores limpios de la marca del local sobre fondos off-white.