# FRAMEWORKS Y TECNOLOGÍAS UTILIZADAS - EXPLICACIÓN DETALLADA
## Sistema de Gestión Escolar - Telesecundaria

**Equipo:** 6 personas | **Periodo:** Octubre - Diciembre 2025

---

## ÍNDICE

1. [Introducción](#introducción)
2. [Frontend - Frameworks de Interfaz](#frontend---frameworks-de-interfaz)
3. [Backend - Frameworks del Servidor](#backend---frameworks-del-servidor)
4. [Base de Datos - Tecnologías](#base-de-datos---tecnologías)
5. [Herramientas de Desarrollo](#herramientas-de-desarrollo)
6. [Resumen de Uso por Módulo](#resumen-de-uso-por-módulo)

---

## INTRODUCCIÓN

Un **framework** es una estructura o conjunto de herramientas que proporciona funcionalidades predefinidas para facilitar y acelerar el desarrollo de software. En lugar de escribir todo el código desde cero, los frameworks nos ofrecen soluciones ya probadas para problemas comunes.

En nuestro proyecto, utilizamos **22 frameworks y tecnologías diferentes**, cada uno seleccionado estratégicamente para resolver necesidades específicas del sistema. No todos se usan en todas las partes del proyecto, pero cada uno cumple un rol fundamental donde se implementa.

### Clasificación de Frameworks Utilizados

- **Frontend (Interfaz de Usuario):** 10 frameworks/librerías
- **Backend (Servidor):** 5 frameworks/tecnologías
- **Base de Datos:** 2 tecnologías
- **Herramientas de Desarrollo:** 5 herramientas

---

## FRONTEND - FRAMEWORKS DE INTERFAZ

El frontend es la parte visual del sistema que los usuarios ven e interactúan. Aquí utilizamos frameworks modernos de JavaScript para crear una experiencia fluida y profesional.

---

### 1. REACT 18.3.1

#### ¿Qué es React?

React es una **biblioteca de JavaScript** desarrollada por Facebook (ahora Meta) para construir interfaces de usuario. No es un framework completo, sino una biblioteca especializada en la capa de visualización. Su filosofía se basa en componentes reutilizables que facilitan el desarrollo y mantenimiento.

#### ¿Cómo funciona React?

React utiliza un concepto llamado **Virtual DOM** (DOM Virtual). Cuando los datos cambian, React primero actualiza una copia virtual del DOM en memoria, compara los cambios con el DOM real, y solo actualiza las partes que realmente cambiaron. Esto hace que las aplicaciones sean muy rápidas.

**Analogía:** Imagina que tienes un documento de Word. En lugar de reimprimir toda la página cada vez que cambias una palabra, solo cambias esa palabra específica. React hace algo similar con las páginas web.

#### ¿Por qué lo elegimos?

1. **Componentes Reutilizables:** Podemos crear una vez un botón, una tabla o un formulario, y reutilizarlo en diferentes partes del sistema.

2. **Ecosistema Amplio:** React tiene miles de librerías complementarias que resuelven problemas comunes (navegación, manejo de estado, etc.).

3. **Rendimiento:** El Virtual DOM hace que las actualizaciones sean muy eficientes, ideal para un sistema que muestra muchos datos dinámicos.

4. **Comunidad Grande:** Si tenemos dudas o problemas, hay millones de desarrolladores que ya han resuelto problemas similares.

5. **Demanda Laboral:** React es una de las tecnologías más solicitadas en el mercado laboral, aprender React beneficia nuestras carreras.

#### ¿Dónde lo usamos en el proyecto?

**TODA la interfaz de usuario está construida con React:**

- **Pantalla de Login:** El formulario de inicio de sesión, validaciones y el modal de recuperación de contraseña son componentes React.

- **Dashboard:** Los 4 dashboards diferentes (Director, Secretario, Maestro, Administrativo) son componentes React que se renderizan condicionalmente según el rol del usuario.

- **Módulos CRUD:** Cada módulo (Usuarios, Alumnos, Maestros, etc.) es un componente React independiente que maneja su propia lógica y visualización.

- **Componentes Compartidos:** El Sidebar, Header, tablas, modales y formularios son componentes React reutilizables.

#### Ejemplo de uso en el proyecto

En nuestro sistema, cuando un usuario edita una calificación:

1. React detecta el cambio en el input
2. Actualiza solo ese campo en el Virtual DOM
3. Compara con el DOM real
4. Solo actualiza ese campo específico en la página
5. El resto de la interfaz permanece sin cambios

Esto hace que la edición sea instantánea y fluida, sin recargar toda la página.

---

### 2. VITE 5.4.10

#### ¿Qué es Vite?

Vite (pronunciado "vit", que significa "rápido" en francés) es una **herramienta de construcción y servidor de desarrollo** moderna. Es el reemplazo de herramientas más antiguas como Webpack o Create React App.

#### ¿Cómo funciona Vite?

Vite usa dos estrategias principales:

1. **En Desarrollo:** No compila todo el código de una vez. Usa ES Modules nativos del navegador, lo que significa que solo carga los archivos que realmente necesitas cuando los necesitas.

2. **En Producción:** Utiliza Rollup para compilar y optimizar todo el código, creando archivos pequeños y eficientes.

**Analogía:** Es como tener una biblioteca. En desarrollo, Vite solo te trae los libros que estás leyendo en ese momento (rápido). En producción, organiza y empaqueta todos los libros en cajas ordenadas para distribuir (optimizado).

#### ¿Por qué lo elegimos?

1. **Velocidad de Inicio:** El servidor de desarrollo arranca en menos de 2 segundos, mientras que herramientas antiguas podían tardar 30+ segundos.

2. **Hot Module Replacement (HMR) Instantáneo:** Cuando guardas un archivo, los cambios aparecen en el navegador en milisegundos, sin recargar toda la página.

3. **Configuración Mínima:** Funciona "out of the box" sin necesidad de configuraciones complejas.

4. **Build Optimizado:** Genera archivos de producción muy optimizados y pequeños.

5. **Moderno:** Aprovecha las características más recientes de JavaScript y los navegadores.

#### ¿Dónde lo usamos en el proyecto?

Vite es la **base de todo el proceso de desarrollo frontend:**

- **Desarrollo Local:** Cuando ejecutamos `npm run dev`, Vite inicia el servidor de desarrollo en el puerto 5173.

- **Hot Reload:** Cada vez que modificamos un componente (por ejemplo, el diseño del Dashboard), los cambios aparecen instantáneamente en el navegador sin perder el estado de la aplicación.

- **Build de Producción:** Cuando ejecutamos `npm run build`, Vite compila todo el proyecto React en archivos HTML, CSS y JavaScript optimizados.

- **Preview:** Con `npm run preview`, podemos ver exactamente cómo se verá el sistema en producción antes de desplegarlo.

#### Beneficio tangible en el proyecto

Antes de Vite, cada vez que un desarrollador hacía un cambio, tenía que esperar 10-20 segundos para ver el resultado. Con Vite, esa espera es de menos de 1 segundo. En un proyecto de 3 meses con 6 desarrolladores haciendo cientos de cambios diarios, esto ahorra **decenas de horas** de tiempo de desarrollo.

---

### 3. TAILWIND CSS 3.4.14

#### ¿Qué es Tailwind CSS?

Tailwind CSS es un **framework de CSS utility-first** (basado en utilidades). A diferencia de frameworks como Bootstrap que ofrecen componentes prediseñados (botones, tarjetas, etc.), Tailwind ofrece clases de utilidad que puedes combinar para crear cualquier diseño.

#### ¿Cómo funciona Tailwind?

En lugar de escribir CSS personalizado en archivos separados, Tailwind te permite aplicar estilos directamente en el HTML usando clases descriptivas.

**Comparación:**

**CSS Tradicional:**
```css
/* archivo.css */
.boton-principal {
  background-color: #ec4899;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}
```

**Con Tailwind:**
```html
<button class="bg-pink-500 text-white px-6 py-3 rounded-lg">
  Click aquí
</button>
```

**Analogía:** Es como tener bloques de Lego. En lugar de construir piezas desde cero, combinas bloques pre-hechos de diferentes formas para crear lo que necesitas.

#### ¿Por qué lo elegimos?

1. **Desarrollo Rápido:** No necesitas pensar en nombres de clases ni cambiar entre archivos HTML y CSS. Todo está en un solo lugar.

2. **Diseño Consistente:** Las clases de utilidad garantizan que usemos los mismos colores, espaciados y tamaños en todo el sistema.

3. **Responsive por Defecto:** Hacer un diseño que funcione en móviles, tablets y desktop es extremadamente simple.

4. **Sin CSS No Usado:** Tailwind elimina automáticamente todas las clases que no usas, resultando en archivos CSS muy pequeños (nuestro CSS final es solo ~10KB).

5. **Sin Conflictos de Nombres:** No hay problemas de clases CSS que se sobrescriben entre sí.

6. **Personalizable:** Aunque tiene valores predeterminados, podemos personalizar colores, espaciados, animaciones, etc.

#### ¿Dónde lo usamos en el proyecto?

**TODOS los estilos visuales del sistema usan Tailwind:**

- **Login:** El diseño split-screen, los degradados, los campos de entrada con iconos, todo usa clases de Tailwind.

- **Dashboard:** Las tarjetas de estadísticas con diferentes colores según el rol, los íconos circulares, el grid responsive.

- **Tablas:** Las tablas de Usuarios, Alumnos, Maestros tienen estilos hover, bordes, colores alternados, todo con Tailwind.

- **Modales:** Los modales de crear/editar tienen sombras, animaciones de entrada, overlays con blur.

- **Responsive Design:** El sidebar se oculta en móviles, las tablas se hacen scrolleables, las grids cambian de columnas.

- **Animaciones Personalizadas:** Creamos animaciones custom como `fade-in`, `slide-in`, `float` para hacer la interfaz más dinámica.

#### Ejemplo de uso en el proyecto

El **Dashboard del Director** tiene tarjetas de estadísticas. Cada tarjeta:
- Tiene un degradado de color (rosa a rosa oscuro): `bg-gradient-to-br from-pink-50 to-pink-100`
- Efecto hover que la eleva: `hover:shadow-lg transform hover:-translate-y-1 transition-all`
- Es responsive: `w-full md:w-1/2 lg:w-1/4` (100% en móvil, 50% en tablet, 25% en desktop)
- Bordes redondeados: `rounded-xl`
- Padding interno: `p-6`

Todo esto en una sola línea de clases, sin escribir CSS personalizado.

#### Configuración personalizada del proyecto

En nuestro archivo `tailwind.config.js` personalizamos:

- **Color primario:** Rosa (#ec4899) para mantener la identidad visual de telesecundaria
- **Animaciones custom:** `fade-in`, `slide-in`, `float`, `bounce-slow`
- **Fuente:** Poppins como fuente principal del sistema

---

### 4. REACT ROUTER DOM 6.27.0

#### ¿Qué es React Router?

React Router es una **librería de enrutamiento** para aplicaciones React. Permite crear aplicaciones de página única (SPA - Single Page Application) donde cambias de "página" sin realmente recargar el navegador.

#### ¿Cómo funciona React Router?

React Router intercepta los clics en enlaces y cambios de URL, y en lugar de hacer una petición al servidor, simplemente muestra diferentes componentes React según la URL.

**Analogía:** Es como cambiar de canal en un TV inteligente. No apagas y prendes el TV cada vez (recargar página), simplemente cambias el contenido que se muestra (cambiar componente).

#### ¿Por qué lo elegimos?

1. **SPA (Single Page Application):** El sistema carga una vez y luego todas las navegaciones son instantáneas, sin recargas de página.

2. **Mejor Experiencia de Usuario:** Las transiciones entre páginas son suaves y rápidas.

3. **Mantiene el Estado:** Al navegar entre páginas, el estado de la aplicación (usuario logueado, datos en memoria) se mantiene.

4. **URLs Limpias:** Podemos tener URLs como `/dashboard`, `/usuarios`, `/alumnos` en lugar de `index.html`, `usuarios.html`, etc.

5. **Navegación Programática:** Podemos redirigir al usuario después de ciertas acciones (por ejemplo, después de login exitoso, ir al dashboard).

6. **Rutas Protegidas:** Podemos prevenir que usuarios no autenticados accedan a ciertas páginas.

#### ¿Dónde lo usamos en el proyecto?

**Toda la navegación del sistema usa React Router:**

- **Rutas Públicas:**
  - `/login` - Pantalla de inicio de sesión
  - `/reset-password` - Recuperación de contraseña

- **Rutas Protegidas** (requieren autenticación):
  - `/dashboard` - Panel principal
  - `/usuarios` - Gestión de usuarios (solo Director/Secretario)
  - `/maestros` - Gestión de maestros
  - `/alumnos` - Gestión de alumnos
  - `/aulas` - Gestión de aulas
  - `/materias` - Gestión de materias
  - `/materiales` - Gestión de materiales
  - `/prestamos` - Gestión de préstamos
  - `/calificaciones` - Gestión de calificaciones
  - `/reportes` - Reportes académicos

- **Redirección Automática:** Si un usuario no autenticado intenta acceder a `/dashboard`, React Router lo redirige automáticamente a `/login`.

- **Navegación Después de Acciones:** Después de crear un alumno exitosamente, React Router redirige a la lista de alumnos.

#### Componentes especiales del proyecto

**ProtectedRoute:** Componente personalizado que verifica si el usuario está autenticado antes de permitir el acceso. Si no está autenticado, redirige a login. Si está autenticado pero no tiene permisos para esa sección, muestra "Acceso Denegado".

**MainLayout:** Componente que contiene el Sidebar y Header, usado como wrapper para todas las rutas protegidas, evitando duplicar código.

#### Beneficio para el usuario final

Cuando un secretario navega de Alumnos → Maestros → Aulas → Dashboard:
- No hay recargas de página (instantáneo)
- El sidebar permanece visible y funcional
- Si vuelve a Alumnos, los filtros y búsqueda que tenía se mantienen
- Puede usar los botones atrás/adelante del navegador normalmente

---

### 5. AXIOS 1.7.7

#### ¿Qué es Axios?

Axios es una **librería cliente HTTP** para JavaScript. Es la herramienta que usamos para hacer peticiones al backend (obtener datos, enviar datos, actualizar, eliminar).

#### ¿Cómo funciona Axios?

Axios envía peticiones HTTP al servidor y recibe las respuestas. Es como un mensajero entre el frontend (React) y el backend (PHP).

**Analogía:** Axios es como un cartero. El frontend le da una carta (petición HTTP con datos) para el backend. El cartero la entrega al backend, espera la respuesta, y la trae de vuelta al frontend.

#### ¿Por qué lo elegimos en lugar de fetch()?

JavaScript tiene una función nativa llamada `fetch()` para hacer peticiones HTTP. Entonces, ¿por qué usar Axios?

1. **Sintaxis Más Simple:** Axios convierte automáticamente las respuestas JSON, mientras que fetch() requiere dos pasos.

2. **Interceptores:** Axios permite interceptar peticiones antes de enviarlas o respuestas antes de procesarlas (útil para agregar tokens, manejar errores globalmente).

3. **Mejor Manejo de Errores:** Los errores de red se manejan más consistentemente.

4. **Timeouts:** Podemos configurar límites de tiempo para las peticiones.

5. **Cancelación de Peticiones:** Podemos cancelar peticiones en progreso si ya no se necesitan.

6. **Más Legible:** El código es más limpio y fácil de entender.

#### ¿Dónde lo usamos en el proyecto?

**TODAS las comunicaciones con el backend usan Axios:**

- **Login:** Cuando el usuario ingresa ID y contraseña, Axios envía una petición POST a `/api/auth/login.php`.

- **Obtener Datos:** Cuando entramos a Usuarios, Axios hace GET a `/api/usuarios/list.php` para traer todos los usuarios.

- **Crear Registros:** Cuando creamos un nuevo alumno, Axios envía POST a `/api/alumnos/create.php` con los datos del formulario.

- **Actualizar Datos:** Al editar un maestro, Axios envía POST a `/api/maestros/update.php`.

- **Eliminar:** Al eliminar un aula, Axios envía POST a `/api/aulas/delete.php`.

- **Dashboard:** Al cargar el dashboard, Axios hace GET a `/api/dashboard/stats.php` para obtener las estadísticas.

- **Recuperación de Contraseña:** Axios envía el email a `/api/auth/forgot-password.php`.

#### Configuración especial en el proyecto

**Instancia Personalizada:** Creamos una instancia de Axios con configuración base:
- URL base: `http://localhost:8000/api`
- Credenciales: activadas para enviar cookies de sesión
- Headers: JSON por defecto

**Interceptor de Respuestas:** Si el servidor responde con error 401 (No autorizado), el interceptor automáticamente redirige al login. Esto evita que el usuario vea pantallas de error si su sesión expiró.

**Servicios Organizados:** Creamos servicios separados por módulo:
- `authService`: login, logout, checkSession
- `usuariosService`: getAll, create, update, delete
- `alumnosService`: getAll, create, update, delete
- `dashboardService`: getStats

#### Ejemplo de flujo completo

**Crear un Usuario:**
1. Usuario llena formulario en el modal
2. Presiona "Crear Usuario"
3. React valida los datos localmente
4. Axios envía POST a `/api/usuarios/create.php` con los datos
5. PHP procesa, valida en el servidor, guarda en MySQL
6. PHP responde con éxito o error
7. Axios recibe la respuesta
8. React muestra notificación (toast)
9. Si fue exitoso, cierra el modal y recarga la lista

Todo esto en menos de 1 segundo, con feedback visual en cada paso.

---

### 6. SONNER 1.7.1

#### ¿Qué es Sonner?

Sonner es una **librería de notificaciones toast** para React. Los "toasts" son esas pequeñas notificaciones que aparecen generalmente en la esquina superior derecha para informar al usuario sobre acciones completadas o errores.

#### ¿Cómo funciona Sonner?

Sonner proporciona una función simple `toast()` que puedes llamar desde cualquier parte de tu aplicación para mostrar notificaciones. Las notificaciones aparecen, permanecen unos segundos, y desaparecen automáticamente con animaciones suaves.

**Analogía:** Son como las notificaciones de tu teléfono. Aparecen brevemente para informarte algo importante, y luego desaparecen solas.

#### ¿Por qué lo elegimos?

1. **Feedback Inmediato:** El usuario necesita saber si su acción fue exitosa o falló.

2. **No Invasivo:** A diferencia de `alert()` que bloquea toda la pantalla, los toasts aparecen en una esquina y no interrumpen el flujo de trabajo.

3. **Diseño Moderno:** Las notificaciones tienen animaciones suaves y diseño profesional.

4. **Diferentes Tipos:** Podemos mostrar éxitos (verde), errores (rojo), advertencias (amarillo), información (azul).

5. **Fácil de Usar:** Una sola línea de código para mostrar una notificación.

6. **Apilamiento:** Si hay múltiples notificaciones, se apilan ordenadamente.

#### ¿Dónde lo usamos en el proyecto?

**En TODAS las operaciones que el usuario necesita confirmar:**

- **Login:**
  - Éxito: "¡Bienvenido! Iniciando sesión..."
  - Error: "Usuario o contraseña incorrectos"
  - Error: "Complete todos los campos"

- **Usuarios:**
  - Éxito al crear: "Usuario creado exitosamente"
  - Éxito al editar: "Usuario actualizado exitosamente"
  - Éxito al eliminar: "Usuario eliminado exitosamente"
  - Error: "El correo ya está registrado"
  - Error: "Error al cargar usuarios"

- **Alumnos:**
  - Éxito: "Alumno registrado exitosamente"
  - Error: "La matrícula ya existe"
  - Advertencia: "Edad debe estar entre 10 y 18 años"

- **Calificaciones:**
  - Éxito: "Calificación guardada"
  - Advertencia: "Calificación reprobatoria (menor a 60)"
  - Error: "Ya existe calificación para este periodo"

- **Préstamos:**
  - Éxito: "Préstamo registrado"
  - Error: "Stock insuficiente. Disponible: 3 unidades"
  - Éxito al devolver: "Material devuelto. Stock actualizado"

- **Recuperación de Contraseña:**
  - Éxito: "Se ha enviado un enlace de recuperación a tu correo"
  - Error: "No se encontró un usuario con ese correo"

#### Tipos de notificaciones usadas

1. **toast.success()** - Verde con ✓
2. **toast.error()** - Rojo con ✗
3. **toast.warning()** - Amarillo con ⚠
4. **toast.info()** - Azul con ℹ
5. **toast.promise()** - Muestra loading → success/error automáticamente

#### Beneficio en la experiencia del usuario

Imagina que un secretario está registrando 20 alumnos. Sin notificaciones, no sabría si cada alumno se guardó correctamente. Con Sonner, después de cada registro ve claramente "Alumno registrado exitosamente" y puede continuar confiadamente. Si hay un error (matrícula duplicada, edad inválida), lo ve inmediatamente y puede corregirlo.

---

### 7. FONT AWESOME 6.5.1

#### ¿Qué es Font Awesome?

Font Awesome es una **biblioteca de iconos vectoriales**. Proporciona miles de iconos que se pueden usar como fuentes, lo que significa que son escalables, personalizables y no pixelean.

#### ¿Cómo funciona Font Awesome?

Los iconos de Font Awesome son fuentes especiales donde cada letra es en realidad un icono. Se usan con clases CSS como `<i class="fas fa-user"></i>`.

**Analogía:** Es como tener un diccionario de símbolos universales (✓, ✗, 🏠, 👤, 📧) pero en formato de fuente, lo que los hace perfectos en cualquier tamaño.

#### ¿Por qué lo elegimos?

1. **Miles de Iconos:** Más de 2,000 iconos gratuitos que cubren casi cualquier necesidad.

2. **Escalables:** Al ser fuentes vectoriales, se ven perfectos en cualquier tamaño (16px o 200px).

3. **Fácil de Personalizar:** Podemos cambiar color, tamaño, rotación con CSS simple.

4. **Consistencia Visual:** Todos los iconos tienen un estilo consistente que hace que la interfaz se vea profesional.

5. **Sin Imágenes:** No necesitamos descargar archivos de imagen, todo es CSS y fuentes.

6. **Reconocibles:** Son iconos estándar que los usuarios reconocen universalmente.

#### ¿Dónde lo usamos en el proyecto?

**TODA la iconografía del sistema usa Font Awesome:**

- **Sidebar (Navegación):**
  - 🏠 Dashboard: `fa-home`
  - 👥 Usuarios: `fa-users`
  - 👨‍🏫 Maestros: `fa-chalkboard-teacher`
  - 🎓 Alumnos: `fa-user-graduate`
  - 🚪 Aulas: `fa-door-open`
  - 📚 Materias: `fa-book-open`
  - 📦 Materiales: `fa-box`
  - 🤝 Préstamos: `fa-hand-holding`
  - 📊 Calificaciones: `fa-chart-line`

- **Campos de Formulario:**
  - Usuario: `fa-user`
  - Contraseña: `fa-lock`
  - Email: `fa-envelope`
  - Teléfono: `fa-phone`
  - Calendario: `fa-calendar`

- **Botones de Acción:**
  - Editar: `fa-edit` (lápiz)
  - Eliminar: `fa-trash` (papelera)
  - Guardar: `fa-save` (diskette)
  - Agregar: `fa-plus-circle` (más)
  - Buscar: `fa-search` (lupa)
  - Cerrar: `fa-times` (X)

- **Indicadores de Estado:**
  - Éxito: `fa-check` (✓)
  - Error: `fa-times` (✗)
  - Advertencia: `fa-exclamation-triangle` (⚠)
  - Información: `fa-info-circle` (ℹ)
  - Cargando: `fa-spinner fa-spin` (spinner giratorio)

- **Dashboard:**
  - Estadísticas: `fa-chart-pie`
  - Reportes: `fa-file-alt`
  - Configuración: `fa-cog`

- **Validación de Contraseña:**
  - Requisito cumplido: `fa-check` verde
  - Requisito no cumplido: `fa-times` gris

#### Personalización en el proyecto

Los iconos se personalizan con Tailwind:
- Tamaños: `text-xs`, `text-sm`, `text-lg`, `text-2xl`, `text-3xl`
- Colores: `text-pink-500`, `text-green-600`, `text-red-600`
- Efectos: `hover:text-pink-600` (cambia color al pasar mouse)

#### Beneficio en usabilidad

Los iconos permiten reconocimiento visual instantáneo. Un usuario puede:
- Identificar rápidamente las secciones en el sidebar por sus iconos
- Entender la función de un botón sin leer el texto
- Saber el estado de una acción (✓ éxito, ✗ error) de un vistazo

Esto es especialmente útil para usuarios con poca experiencia técnica o que usan el sistema frecuentemente y quieren eficiencia.

---

### 8. GOOGLE FONTS (POPPINS)

#### ¿Qué es Google Fonts?

Google Fonts es un **servicio gratuito de fuentes web** proporcionado por Google. Permite usar fuentes profesionales en sitios web sin necesidad de comprar licencias ni descargar archivos.

#### ¿Cómo funciona Google Fonts?

Cuando cargamos una fuente de Google Fonts, el navegador descarga los archivos de fuente desde los servidores de Google. Las fuentes se cachean, por lo que si el usuario ya visitó otro sitio que usa la misma fuente, la descarga es instantánea.

#### ¿Por qué elegimos Poppins?

Poppins es una fuente **sans-serif geométrica** diseñada específicamente para interfaces digitales.

**Características de Poppins:**
1. **Moderna y Profesional:** Transmite innovación y profesionalismo
2. **Excelente Legibilidad:** Fácil de leer en pantallas de cualquier tamaño
3. **Múltiples Pesos:** 300, 400, 500, 600, 700 (de ligera a negrita)
4. **Versátil:** Funciona bien en títulos y texto de cuerpo
5. **Gratuita:** Sin costo de licencia
6. **Optimizada:** Archivos ligeros y rápidos de cargar

#### ¿Dónde lo usamos en el proyecto?

**Poppins es la fuente principal de TODO el sistema:**

- **Títulos y Encabezados:**
  - Peso 700 (Bold): "Bienvenido, Juan Pérez"
  - Peso 600 (Semibold): Títulos de secciones

- **Texto Normal:**
  - Peso 400 (Regular): Contenido general, descripciones
  - Peso 500 (Medium): Labels de formularios

- **Texto Secundario:**
  - Peso 300 (Light): Subtítulos, texto auxiliar

#### Pesos utilizados y sus propósitos

| Peso | Uso en el Proyecto |
|------|-------------------|
| 300 (Light) | Descripciones secundarias, textos auxiliares |
| 400 (Regular) | Texto de cuerpo, contenido general |
| 500 (Medium) | Labels de formularios, botones secundarios |
| 600 (Semibold) | Títulos de secciones, encabezados de modales |
| 700 (Bold) | Títulos principales, botones primarios, números grandes en estadísticas |

#### Beneficio visual

La tipografía es uno de los elementos más importantes del diseño. Poppins le da al sistema:
- **Identidad Visual Consistente:** Toda la interfaz se siente cohesiva
- **Jerarquía Clara:** Los diferentes pesos ayudan a distinguir entre títulos, subtítulos y contenido
- **Profesionalismo:** Se ve como un sistema comercial, no como un proyecto estudiantil

---

### 9. POSTCSS 8.4.47

#### ¿Qué es PostCSS?

PostCSS es un **procesador de CSS** que transforma CSS usando plugins de JavaScript. Es como un compilador para CSS que lo hace más poderoso y compatible.

#### ¿Cómo funciona PostCSS?

PostCSS lee tu CSS, lo convierte en una estructura de datos, aplica transformaciones mediante plugins, y genera CSS final optimizado.

**Analogía:** Es como un traductor que toma un texto en español moderno y lo traduce a español que todas las generaciones puedan entender.

#### ¿Por qué lo usamos?

Aunque no escribimos configuraciones complejas de PostCSS directamente, es **requerido por Tailwind CSS** y nos da:

1. **Autoprefixer:** Agrega prefijos de navegador automáticamente
2. **Minificación:** Comprime el CSS para archivos más pequeños
3. **Nested Rules:** Permite anidar reglas CSS como en Sass
4. **Purge:** Elimina CSS no usado

#### ¿Dónde lo usamos en el proyecto?

PostCSS trabaja **detrás de escena** en nuestro proceso de build:

- Cuando desarrollamos con `npm run dev`, PostCSS procesa el CSS de Tailwind
- Cuando compilamos para producción con `npm run build`, PostCSS:
  - Procesa Tailwind
  - Agrega prefijos de navegador
  - Elimina CSS no usado
  - Minifica el archivo final

Nuestro `postcss.config.js` tiene dos plugins:
1. `tailwindcss` - Procesa las clases de Tailwind
2. `autoprefixer` - Agrega compatibilidad con navegadores antiguos

---

### 10. AUTOPREFIXER 10.4.20

#### ¿Qué es Autoprefixer?

Autoprefixer es un **plugin de PostCSS** que agrega prefijos de proveedores de navegadores automáticamente al CSS.

#### ¿Por qué es necesario?

Diferentes navegadores implementan características CSS nuevas con prefijos temporales:
- Chrome/Safari: `-webkit-`
- Firefox: `-moz-`
- Internet Explorer: `-ms-`

**Problema sin Autoprefixer:**
Tendríamos que escribir manualmente:
```css
.elemento {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
```

**Con Autoprefixer:**
Escribimos solo:
```css
.elemento {
  transform: rotate(45deg);
}
```

Y Autoprefixer agrega los prefijos automáticamente según los navegadores que queramos soportar.

#### ¿Dónde lo usamos en el proyecto?

Autoprefixer trabaja **automáticamente en todo el CSS** que genera Tailwind:

- **Flexbox:** Se asegura que funcione en IE 10+
- **Grid:** Agrega soporte para navegadores antiguos
- **Transitions:** Funciona en Safari antiguo
- **Transforms:** Compatible con todos los navegadores

#### Configuración en el proyecto

Nuestro Autoprefixer está configurado para soportar:
- Últimas 2 versiones de cada navegador
- Navegadores con >1% de uso global
- No soportar navegadores "muertos" (IE 6, etc.)

Esto significa que nuestro sistema funciona en:
- ✅ Chrome (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Safari (últimas versiones)
- ✅ Edge (últimas versiones)
- ✅ Opera (últimas versiones)
- ✅ Safari iOS (últimas versiones)
- ✅ Chrome Android (últimas versiones)

---

## BACKEND - FRAMEWORKS DEL SERVIDOR

El backend es el servidor que procesa la lógica de negocio, maneja la base de datos y responde a las peticiones del frontend.

---

### 11. PHP 8.2

#### ¿Qué es PHP?

PHP (Hypertext Preprocessor) es un **lenguaje de programación del lado del servidor** especialmente diseñado para desarrollo web. Fue creado en 1994 y es uno de los lenguajes más usados para backend web.

#### ¿Cómo funciona PHP?

PHP se ejecuta en el servidor. Cuando un usuario hace una petición:
1. El servidor recibe la petición (ejemplo: GET /api/usuarios/list.php)
2. El servidor ejecuta el código PHP
3. PHP procesa la lógica (consultar base de datos, validar, etc.)
4. PHP genera una respuesta (JSON en nuestro caso)
5. El servidor envía la respuesta al navegador

**Analogía:** PHP es como el chef de un restaurante. El frontend (mesero) toma tu orden y la lleva al chef. El chef (PHP) prepara el platillo consultando la alacena (base de datos) y entrega el platillo terminado.

#### ¿Por qué elegimos PHP 8.2?

1. **Fácil de Aprender:** Sintaxis simple, perfecto para equipos con diferentes niveles de experiencia.

2. **Amplio Ecosistema:** Miles de librerías y frameworks disponibles.

3. **Hosting Universal:** Casi todos los servicios de hosting soportan PHP, haciendo el despliegue fácil.

4. **Integración con MySQL:** PHP y MySQL funcionan perfectamente juntos.

5. **Gratuito y Open Source:** Sin costos de licencia.

6. **Comunidad Enorme:** Si tenemos dudas, hay millones de desarrolladores que pueden ayudar.

7. **PHP 8 es Moderno:** Las versiones 8+ de PHP son rápidas y tienen características modernas (named arguments, match expressions, etc.).

#### ¿Dónde lo usamos en el proyecto?

**TODO el backend está escrito en PHP:**

- **50+ Endpoints API:** Cada operación (login, crear usuario, editar alumno, etc.) es un archivo PHP.

- **Autenticación:** Sistema de login con sesiones PHP.

- **Validación de Datos:** Todas las validaciones del servidor están en PHP.

- **Lógica de Negocio:** 
  - Verificar que no haya correos duplicados
  - Validar que las calificaciones estén entre 0-100
  - Actualizar stock de materiales cuando hay préstamos
  - Generar tokens de recuperación de contraseña

- **Integración con MySQL:** Todas las consultas a la base de datos se hacen desde PHP.

- **Generación de Respuestas JSON:** Convertir datos de MySQL a formato JSON para el frontend.

#### Características de PHP 8 usadas en el proyecto

**Named Arguments (Argumentos Nombrados):**
Hace el código más legible al especificar explícitamente qué argumento es cada uno.

**Match Expression:**
Reemplazo moderno del switch, más conciso y seguro.

**Null Safe Operator:**
Evita errores cuando una variable puede ser null.

#### Estructura de archivos PHP en el proyecto

Cada módulo tiene 5 operaciones CRUD:
- `list.php` - Listar todos los registros
- `get.php` - Obtener un registro específico
- `create.php` - Crear nuevo registro
- `update.php` - Actualizar registro existente
- `delete.php` - Eliminar registro

Ejemplo para Usuarios:
- `/api/usuarios/list.php`
- `/api/usuarios/get.php`
- `/api/usuarios/create.php`
- `/api/usuarios/update.php`
- `/api/usuarios/delete.php`

---

### 12. PDO (PHP Data Objects)

#### ¿Qué es PDO?

PDO es una **extensión de PHP** que proporciona una interfaz consistente para acceder a bases de datos. Es una capa de abstracción que funciona con MySQL, PostgreSQL, SQLite y otros.

#### ¿Cómo funciona PDO?

PDO actúa como intermediario entre PHP y la base de datos. Toma comandos SQL desde PHP, los ejecuta en la base de datos, y devuelve los resultados a PHP.

**Analogía:** PDO es como un traductor. PHP habla "PHP", MySQL habla "SQL". PDO traduce entre ambos y asegura que se entiendan correctamente.

#### ¿Por qué elegimos PDO en lugar de mysqli?

PHP tiene dos formas principales de conectarse a MySQL: **mysqli** y **PDO**. Elegimos PDO porque:

1. **Prepared Statements por Defecto:** Previene SQL Injection automáticamente.

2. **Múltiples Bases de Datos:** Si en el futuro queremos cambiar a PostgreSQL, solo cambiamos la configuración, no el código.

3. **API Orientada a Objetos:** Código más limpio y moderno.

4. **Mejor Manejo de Errores:** Excepciones claras cuando algo falla.

5. **Named Parameters:** Podemos usar `:nombre` en lugar de `?` en las queries, haciéndolas más legibles.

#### ¿Dónde lo usamos en el proyecto?

**100% de las consultas a la base de datos usan PDO:**

- **Consultas SELECT (Leer Datos):**
  - Obtener lista de usuarios
  - Buscar un alumno por matrícula
  - Obtener estadísticas del dashboard
  - Listar préstamos activos

- **Consultas INSERT (Crear Datos):**
  - Registrar nuevo usuario
  - Agregar alumno
  - Guardar calificación
  - Crear préstamo

- **Consultas UPDATE (Actualizar Datos):**
  - Modificar información de maestro
  - Actualizar stock de materiales
  - Cambiar estado de usuario (activo/inactivo)
  - Marcar préstamo como devuelto

- **Consultas DELETE (Eliminar Datos):**
  - Eliminar usuario
  - Borrar aula
  - Eliminar materia

#### Configuración de PDO en el proyecto

**Archivo:** `backend/config/database.php`

Nuestra configuración de PDO incluye:

1. **ATTR_ERRMODE → ERRMODE_EXCEPTION:** Si hay un error SQL, lanza una excepción que podemos capturar.

2. **ATTR_DEFAULT_FETCH_MODE → FETCH_ASSOC:** Los resultados vienen como arrays asociativos (más fáciles de usar).

3. **ATTR_EMULATE_PREPARES → false:** Usa prepared statements reales de MySQL (más seguro).

4. **MYSQL_ATTR_INIT_COMMAND → SET NAMES utf8mb4:** Asegura compatibilidad con caracteres especiales y emojis.

#### Prepared Statements - Seguridad contra SQL Injection

**El Problema (Sin Prepared Statements):**
Si concatenamos variables directamente en SQL:
```php
$query = "SELECT * FROM Usuarios WHERE IDUsuario = $id";
```

Un atacante podría enviar: `$id = "1 OR 1=1"`
Resultando en: `SELECT * FROM Usuarios WHERE IDUsuario = 1 OR 1=1`
Esto devolvería TODOS los usuarios (brecha de seguridad).

**La Solución (Con Prepared Statements de PDO):**
```php
$query = "SELECT * FROM Usuarios WHERE IDUsuario = :id";
$stmt = $db->prepare($query);
$stmt->bindParam(':id', $id, PDO::PARAM_INT);
$stmt->execute();
```

PDO escapa y valida los parámetros, haciendo imposible la inyección SQL.

#### Tipos de PDO usados en el proyecto

**PDO::PARAM_INT:** Para números enteros (IDs, edades, cantidades)
**PDO::PARAM_STR:** Para strings (nombres, correos, descripciones)
**PDO::PARAM_BOOL:** Para booleanos (activo/inactivo, devuelto/no devuelto)

#### Transacciones con PDO

En el módulo de Préstamos, usamos transacciones para garantizar integridad:

```
beginTransaction()
  1. Crear préstamo
  2. Actualizar stock de materiales
  Si ambas operaciones son exitosas:
    commit() - Se guardan los cambios
  Si alguna falla:
    rollback() - Se revierten TODOS los cambios
```

Esto asegura que nunca tengamos un préstamo sin actualización de stock, o stock actualizado sin préstamo registrado.

---

### 13. PHPMAILER 6.9

#### ¿Qué es PHPMailer?

PHPMailer es una **librería de PHP** para enviar correos electrónicos. Aunque PHP tiene la función `mail()` integrada, PHPMailer es mucho más poderosa y confiable.

#### ¿Cómo funciona PHPMailer?

PHPMailer se conecta a un servidor SMTP (Simple Mail Transfer Protocol) para enviar correos. Es como usar una oficina postal profesional en lugar de poner una carta en un buzón.

**Analogía:** La función `mail()` de PHP es como enviar una carta sin remitente ni seguimiento. PHPMailer es como usar un servicio de paquetería certificado (FedEx, UPS) que confirma la entrega y proporciona seguimiento.

#### ¿Por qué usamos PHPMailer en lugar de mail()?

1. **Compatibilidad:** La función `mail()` a menudo no funciona en hosting compartido o requiere configuraciones complicadas del servidor.

2. **SMTP Autenticado:** Podemos usar Gmail, Outlook o cualquier servicio SMTP con autenticación.

3. **HTML Emails:** Fácil de enviar correos con diseño HTML, no solo texto plano.

4. **Attachments:** Podemos adjuntar archivos (aunque no lo usamos en este proyecto).

5. **Manejo de Errores:** Proporciona mensajes de error claros cuando algo falla.

6. **Confiabilidad:** Los correos tienen mucha menos probabilidad de caer en spam.

#### ¿Dónde lo usamos en el proyecto?

**PHPMailer se usa en el módulo de Recuperación de Contraseña:**

- **Forgot Password:** Cuando un usuario olvida su contraseña y solicita recuperación:
  1. Usuario ingresa su correo en el modal
  2. Backend genera un token único de 64 caracteres
  3. Backend guarda el token en la tabla `password_resets` con expiración de 1 hora
  4. **PHPMailer envía un email** al usuario con un enlace que contiene el token
  5. Usuario recibe el email, hace clic en el enlace
  6. El enlace lo lleva a la página de reset con el token
  7. Usuario ingresa nueva contraseña
  8. Backend valida el token (que existe, no expiró, no se usó)
  9. Backend actualiza la contraseña
  10. **PHPMailer envía email de confirmación** del cambio

#### Configuración de PHPMailer en el proyecto

**Servidor SMTP:** Gmail (smtp.gmail.com)
**Puerto:** 587 (TLS/STARTTLS)
**Autenticación:** Usuario y contraseña de aplicación de Gmail
**Charset:** UTF-8 (para soportar caracteres especiales)

#### Emails HTML enviados

**1. Email de Recuperación de Contraseña:**
- Header con logo y gradiente rosa
- Mensaje personalizado con nombre del usuario
- Botón destacado "Restablecer Contraseña"
- Advertencia de expiración (1 hora)
- Nota de seguridad (si no fuiste tú, ignora)
- Footer profesional

**2. Email de Confirmación de Cambio:**
- Confirma que la contraseña se cambió exitosamente
- Recomienda acciones si el cambio no fue autorizado
- Proporciona información de contacto con soporte

#### Seguridad en los emails

- **Tokens Únicos:** Cada enlace tiene un token único que no se puede adivinar
- **Expiración:** Los enlaces expiran después de 1 hora
- **Un Solo Uso:** Una vez usado el token, queda marcado y no se puede reusar
- **HTTPS en Producción:** Los enlaces usarían HTTPS en un servidor real
- **No Passwords en Email:** NUNCA enviamos la contraseña por email, solo un enlace seguro

#### Beneficio para los usuarios

Antes de PHPMailer, si un usuario olvidaba su contraseña, tenía que contactar al administrador para que la restableciera manualmente. Con PHPMailer:
- **Autoservicio:** El usuario recupera su contraseña por sí mismo
- **Disponibilidad 24/7:** Funciona a cualquier hora sin necesidad de personal
- **Seguro:** El proceso es seguro con tokens temporales
- **Rápido:** Recibe el email en segundos

---

### 14. COMPOSER 2.x

#### ¿Qué es Composer?

Composer es el **gestor de dependencias** estándar para PHP. Es el equivalente de `npm` en JavaScript o `pip` en Python.

#### ¿Cómo funciona Composer?

Composer lee un archivo `composer.json` que lista las librerías que el proyecto necesita, las descarga desde internet (packagist.org), y las instala en una carpeta `vendor/`.

**Analogía:** Es como una librería con servicio a domicilio. Le das una lista de libros que necesitas (composer.json), y Composer los busca, descarga, y organiza en tu estante (carpeta vendor).

#### ¿Por qué usamos Composer?

1. **Gestión de Dependencias:** En lugar de descargar manualmente PHPMailer y copiarlo al proyecto, Composer lo hace automáticamente.

2. **Versiones Controladas:** Especificamos qué versión de cada librería necesitamos.

3. **Autoloading:** Composer genera automáticamente código que carga las clases cuando las necesitamos.

4. **Actualizaciones Fáciles:** Con un comando podemos actualizar todas las librerías.

5. **Estándar de la Industria:** Todos los proyectos PHP profesionales usan Composer.

#### ¿Dónde lo usamos en el proyecto?

**Composer gestiona las dependencias del backend:**

**Archivo `composer.json`:**
```json
{
    "require": {
        "phpmailer/phpmailer": "^6.9"
    }
}
```

Esto indica que necesitamos PHPMailer versión 6.9 o superior (pero no 7.0).

**Comandos usados:**
- `composer install` - Instala todas las dependencias (lo hace cada desarrollador al clonar el proyecto)
- `composer update` - Actualiza las dependencias a sus últimas versiones compatibles
- `composer require phpmailer/phpmailer` - Agrega una nueva dependencia

**Estructura generada:**
```
backend/
├── vendor/
│   ├── phpmailer/
│   │   └── phpmailer/
│   │       ├── src/
│   │       └── ...
│   └── autoload.php
└── composer.json
```

#### Autoloading

En lugar de hacer:
```php
require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
require 'vendor/phpmailer/phpmailer/src/SMTP.php';
require 'vendor/phpmailer/phpmailer/src/Exception.php';
```

Solo hacemos:
```php
require_once __DIR__ . '/../vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
```

Composer se encarga de cargar todos los archivos necesarios automáticamente.

#### Beneficio en el proyecto

Sin Composer:
- Tendríamos que descargar PHPMailer manualmente
- Copiarlo al proyecto
- Asegurar que todos los desarrolladores tengan la misma versión
- Actualizar manualmente si hay bugs o mejoras

Con Composer:
- Un comando (`composer install`) y todo está listo
- Todos los desarrolladores tienen exactamente las mismas versiones
- Actualizar es un comando (`composer update`)
- El archivo `composer.lock` asegura reproducibilidad

---

### 15. APACHE HTTP SERVER 2.4

#### ¿Qué es Apache?

Apache HTTP Server es un **servidor web** open source. Es el software que recibe peticiones HTTP de navegadores y las responde.

#### ¿Cómo funciona Apache?

Cuando escribes `http://localhost:8000/api/usuarios/list.php`:
1. El navegador envía una petición HTTP al puerto 8000
2. **Apache** escucha en ese puerto y recibe la petición
3. Apache ve que pides un archivo `.php`
4. Apache pasa la petición al intérprete de PHP
5. PHP ejecuta el código y devuelve el resultado
6. Apache toma ese resultado y lo envía de vuelta al navegador

**Analogía:** Apache es como el recepcionista de un hotel. Recibe a los visitantes (peticiones HTTP), los dirige a las habitaciones correctas (archivos PHP), y les entrega lo que necesitan (respuestas).

#### ¿Por qué Apache?

1. **Estándar de la Industria:** El servidor web más usado en el mundo (junto con Nginx).

2. **Incluido en XAMPP:** Viene preconfigurado en XAMPP, no necesitamos instalación separada.

3. **Soporte PHP Integrado:** Apache y PHP funcionan perfectamente juntos.

4. **Módulos Extensibles:** Podemos agregar funcionalidades con módulos (reescritura de URLs, compresión, etc.).

5. **Gratuito:** Sin costo de licencia.

6. **Documentación Extensa:** Cualquier problema ya fue resuelto por alguien.

#### ¿Dónde lo usamos en el proyecto?

**Apache sirve TODO el backend:**

- **En Desarrollo Local:**
  - Servidor PHP en puerto 8000
  - Comando: `php -S localhost:8000 -t backend`
  - Alternativa con XAMPP: Apache en puerto 80 o 8000

- **Configuración CORS:**
  - Apache permite configurar headers HTTP
  - Habilitamos CORS para que el frontend (puerto 5173) pueda comunicarse con el backend (puerto 8000)

- **Reescritura de URLs (Si aplica):**
  - Archivo `.htaccess` para URLs limpias
  - Redirección automática de HTTP a HTTPS en producción

#### Configuración específica del proyecto

**php.ini (Configuración de PHP en Apache):**
- `session.cookie_httponly = On` - Previene robo de sesiones con JavaScript
- `session.use_strict_mode = On` - Mejora seguridad de sesiones
- `upload_max_filesize = 10M` - Límite de archivos subidos
- `post_max_size = 10M` - Límite de datos POST
- `memory_limit = 256M` - Memoria para PHP

#### Apache vs alternativas

**Apache vs Nginx:**
- Apache: Más fácil de configurar, mejor para PHP
- Nginx: Más rápido para contenido estático, más complejo

Para nuestro proyecto, Apache es perfecto porque:
- Es fácil de configurar para el equipo
- Funciona bien con PHP
- Está incluido en XAMPP
- No tenemos necesidades de alto rendimiento que justifiquen Nginx

---

## BASE DE DATOS - TECNOLOGÍAS

La base de datos es donde se almacenan permanentemente todos los datos del sistema.

---

### 16. MYSQL 8.0 / MARIADB 10.x

#### ¿Qué es MySQL?

MySQL es un **Sistema de Gestión de Bases de Datos Relacionales** (RDBMS). Almacena datos en tablas relacionadas entre sí, como hojas de cálculo de Excel que se conectan.

#### ¿Cómo funciona MySQL?

MySQL almacena datos en tablas. Cada tabla tiene:
- **Columnas:** Atributos (Nombre, Edad, Correo)
- **Filas:** Registros individuales (un usuario específico)
- **Relaciones:** Conexiones entre tablas (un alumno pertenece a un aula)

**Analogía:** MySQL es como una biblioteca bien organizada:
- Cada estante es una tabla
- Cada libro es un registro
- El sistema de catalogación son las relaciones
- El bibliotecario es el motor de base de datos

#### ¿Por qué elegimos MySQL?

1. **Open Source y Gratuito:** Sin costos de licencia.

2. **Ampliamente Soportado:** Funciona en todos los sistemas operativos.

3. **Rendimiento:** Muy rápido para aplicaciones web.

4. **Relacional:** Perfecto para datos estructurados con relaciones (alumnos → aulas, alumnos → calificaciones).

5. **ACID Compliant:** Garantiza integridad de datos.

6. **Comunidad Enorme:** Problemas comunes ya están resueltos.

7. **Integración con PHP:** PHP y MySQL son la combinación clásica para desarrollo web.

8. **Incluido en XAMPP:** No necesitamos instalación separada.

#### ¿Dónde lo usamos en el proyecto?

**MySQL almacena el 100% de los datos permanentes:**

- **12 Tablas Principales:**
  1. **Usuarios** - Cuentas del sistema (4 usuarios de prueba)
  2. **Aulas** - Salones (5 aulas: 101, 102, 201, 202, 301)
  3. **Maestros** - Personal docente (2 maestros de prueba)
  4. **Alumnos** - Estudiantes (2 alumnos de prueba)
  5. **Materias** - Asignaturas (8 materias: Matemáticas, Español, etc.)
  6. **AlumnoMateria** - Calificaciones (relación alumno-materia)
  7. **MaestroMateria** - Asignación maestro-materia
  8. **Materiales** - Inventario didáctico (3 materiales: Proyector, Laptop, Calculadora)
  9. **Prestamo** - Registro de préstamos
  10. **DetallePrestamo** - Detalles de cada préstamo
  11. **password_resets** - Tokens de recuperación de contraseña

#### Características de MySQL 8 usadas

**1. CHECK Constraints:**
Validaciones a nivel de base de datos:
- Edad de alumnos entre 10 y 18
- Grado entre 1 y 3
- Semestre entre 1 y 6
- Calificación entre 0 y 100

**2. FOREIGN KEYS (Integridad Referencial):**
Aseguran que las relaciones sean válidas:
- No puede haber un alumno sin aula
- No puede haber préstamo de material que no existe
- Si eliminas un alumno, sus calificaciones se eliminan automáticamente (CASCADE)

**3. ÍNDICES:**
Aceleran las búsquedas:
- Índice en Correo de Usuarios (búsqueda rápida en login)
- Índice en Matricula de Alumnos
- Índice en token de password_resets

**4. TIMESTAMPS:**
Registran automáticamente cuándo se creó/modificó un registro:
- FechaCreacion en Usuarios
- FechaRegistro en Alumnos, Maestros, Calificaciones

**5. ENUM:**
Valores predefinidos:
- TipoUsuario: 'Director', 'Secretario', 'Maestro', 'Administrativo'

#### Stored Procedures en el proyecto

**sp_RegistrarPrestamo:**
Procedimiento que:
1. Verifica disponibilidad del material
2. Obtiene nombres del alumno y material
3. Crea el préstamo
4. Actualiza el stock
5. Registra el detalle

Todo de forma atómica (todo o nada).

#### Triggers en el proyecto

**trg_ActualizarUltimoAcceso:**
Actualiza automáticamente la columna `UltimoAcceso` en Usuarios cuando el usuario hace login.

#### Views (Vistas) en el proyecto

**Vista_Alumnos_Completa:**
Une información de alumnos con su aula para reportes.

**Vista_Calificaciones:**
Une alumnos, materias y calificaciones para consultas rápidas.

**Vista_Prestamos_Activos:**
Muestra solo préstamos que no han sido devueltos.

#### Ventajas de las relaciones en nuestra BD

**Ejemplo: Cambio de Aula**
Si el Aula 101 cambia su capacidad de 30 a 35:
- Actualizo UN solo registro en la tabla Aulas
- Automáticamente, todos los alumnos y maestros de esa aula ven el cambio
- Sin inconsistencias ni datos duplicados

**Ejemplo: Eliminar Alumno**
Si un alumno se da de baja:
- Elimino UN registro en Alumnos
- CASCADE automáticamente elimina sus calificaciones
- CASCADE automáticamente elimina sus préstamos
- No quedan "datos huérfanos"

---

### 17. INNODB STORAGE ENGINE

#### ¿Qué es InnoDB?

InnoDB es un **motor de almacenamiento** para MySQL. Es uno de varios motores (otros: MyISAM, MEMORY), pero es el más avanzado y el predeterminado en MySQL 8.

#### ¿Cómo funciona InnoDB?

InnoDB maneja cómo MySQL almacena físicamente los datos en el disco duro. Proporciona características avanzadas que otros motores no tienen.

**Analogía:** Si MySQL es un coche, InnoDB es el motor. Puedes cambiar el motor (usar MyISAM en lugar de InnoDB), pero InnoDB es el motor moderno y potente.

#### ¿Por qué usamos InnoDB?

**1. Transacciones ACID:**

**ACID significa:**
- **A**tomicity (Atomicidad): Todo o nada
- **C**onsistency (Consistencia): Datos siempre válidos
- **I**solation (Aislamiento): Operaciones no interfieren entre sí
- **D**urability (Durabilidad): Cambios confirmados no se pierden

**Ejemplo en nuestro proyecto (Préstamos):**
```
BEGIN TRANSACTION
  1. Crear préstamo
  2. Reducir stock de material
  Si AMBAS operaciones son exitosas:
    COMMIT (guardar cambios)
  Si ALGUNA falla:
    ROLLBACK (deshacer TODO)
```

Esto garantiza que NUNCA tengamos:
- Préstamo registrado pero stock sin actualizar
- Stock actualizado pero préstamo sin registrar

**2. Foreign Keys (Llaves Foráneas):**

InnoDB soporta foreign keys, MyISAM no.

Foreign keys garantizan integridad referencial:
- No puedes crear un alumno con IdAula = 999 si el aula 999 no existe
- No puedes eliminar un aula si tiene alumnos asignados (RESTRICT)
- Si eliminas un alumno, sus calificaciones se eliminan automáticamente (CASCADE)

**3. Row-Level Locking:**

Cuando múltiples usuarios usan el sistema simultáneamente:

**MyISAM (Antiguo):**
- Bloquea toda la tabla
- Si un usuario está editando, otros deben esperar

**InnoDB (Moderno):**
- Bloquea solo la fila específica
- Usuario A edita alumno 1, Usuario B edita alumno 2 simultáneamente sin problemas

**4. Crash Recovery:**

Si el servidor se apaga inesperadamente:
- InnoDB recupera automáticamente los datos al reiniciar
- Revierte transacciones incompletas
- Garantiza consistencia de datos

**5. MVCC (Multi-Version Concurrency Control):**

Múltiples usuarios pueden leer la misma data mientras otro la está modificando, sin bloqueos.

#### ¿Dónde lo usamos en el proyecto?

**TODAS las 12 tablas usan InnoDB:**

Especificado en el schema con: `ENGINE=InnoDB`

#### Beneficios tangibles en el proyecto

**Escenario 1: Director y Secretario simultáneos**
- Director está editando Usuario ID 5
- Secretario está creando Usuario nuevo
- Ambas operaciones proceden sin conflictos (row-level locking)

**Escenario 2: Préstamo con error**
- Alumno pide préstamo de 5 laptops
- Solo hay 3 disponibles
- La transacción falla
- ROLLBACK asegura que no se creó el préstamo ni se modificó el stock
- Base de datos permanece consistente

**Escenario 3: Corte de luz durante operación**
- Secretario está guardando 10 calificaciones
- Se va la luz después de guardar 7
- Al reiniciar MySQL, InnoDB:
  - Recupera automáticamente
  - Revierte las 7 calificaciones parciales
  - El usuario debe volver a guardar (consistencia garantizada)

---

## HERRAMIENTAS DE DESARROLLO

Estas son herramientas que usamos durante el desarrollo pero que no forman parte del código final.

---

### 18. GIT 2.x

#### ¿Qué es Git?

Git es un **sistema de control de versiones distribuido**. Guarda el historial completo de cambios del proyecto, permitiendo trabajar en equipo sin conflictos.

#### ¿Cómo funciona Git?

Git toma "fotografías" (commits) del proyecto en diferentes momentos. Puedes:
- Ver cambios anteriores
- Volver a versiones antiguas
- Trabajar en diferentes ramas
- Combinar trabajo de varios desarrolladores

**Analogía:** Git es como una máquina del tiempo para código. Puedes ver el pasado, volver atrás si algo sale mal, y ver diferentes líneas temporales (ramas) del proyecto.

#### ¿Por qué usamos Git?

1. **Trabajo en Equipo:** 6 desarrolladores trabajando simultáneamente sin pisarse.

2. **Historial Completo:** Sabemos quién cambió qué, cuándo y por qué.

3. **Ramas:** Cada desarrollador puede trabajar en features separadas sin afectar a otros.

4. **Recuperación:** Si algo se rompe, podemos volver a una versión que funcionaba.

5. **Estándar de la Industria:** Todas las empresas usan Git.

6. **Gratuito y Open Source.**

#### ¿Dónde lo usamos en el proyecto?

**Git controla TODOS los archivos del proyecto:**

- **Estructura de Ramas:**
  - `main` - Código de producción, siempre funcional
  - `develop` - Integración de features
  - `feature/login` - Feature de login
  - `feature/dashboard` - Feature de dashboard
  - `feature/usuarios` - Feature de gestión de usuarios
  - etc.

- **Workflow del Equipo:**
  1. Desarrollador crea rama desde `develop`: `git checkout -b feature/calificaciones`
  2. Trabaja en su feature, hace commits: `git commit -m "feat(calificaciones): agregar validación de rango"`
  3. Sube su rama: `git push origin feature/calificaciones`
  4. Crea Pull Request para revisión
  5. Otro miembro revisa el código
  6. Si está bien, se hace merge a `develop`
  7. Al final del sprint, `develop` se fusiona a `main`

- **Commits del Proyecto:**
  - ~150 commits en 3 meses
  - Promedio de 12 commits por semana
  - Commits descriptivos siguiendo convención

#### Convención de Commits usada

```
tipo(módulo): descripción corta

- Detalle 1
- Detalle 2
```

**Tipos:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `style`: Cambios de estilo (CSS, formato)
- `refactor`: Reestructuración de código
- `docs`: Documentación
- `test`: Tests

**Ejemplos:**
```
feat(login): agregar recuperación de contraseña
fix(usuarios): corregir validación de email
style(dashboard): mejorar responsive en móviles
```

#### Beneficios en el proyecto

**Escenario 1: Bug en Producción**
- Usuario reporta que el login no funciona
- Revisamos historial de Git
- Identificamos que el commit `fix(auth): actualizar validación` causó el problema
- Revertimos ese commit específico
- Sistema funcional en minutos

**Escenario 2: Trabajo Simultáneo**
- Dev 1 trabaja en Usuarios (frontend)
- Dev 2 trabaja en Alumnos (frontend)
- Dev 3 trabaja en API de Usuarios (backend)
- Dev 4 trabaja en API de Alumnos (backend)
- Dev 5 trabaja en Dashboard
- Dev 6 trabaja en Calificaciones
- Cada uno en su rama, sin conflictos

**Escenario 3: Revisar Cambios**
- Dev A termina feature de Préstamos
- Dev B revisa el código antes de hacer merge
- Dev B encuentra error de lógica
- Dev A corrige basándose en la revisión
- Se hace merge solo cuando todos aprueban

---

### 19. VISUAL STUDIO CODE 1.x

#### ¿Qué es VS Code?

VS Code es un **editor de código** open source desarrollado por Microsoft. Es como Microsoft Word pero para programadores.

#### ¿Por qué VS Code?

1. **Gratuito:** Sin costo.

2. **Extensiones:** Miles de plugins que agregan funcionalidades.

3. **IntelliSense:** Autocompletado inteligente de código.

4. **Terminal Integrada:** No necesitas cambiar de ventana.

5. **Git Integrado:** Puedes hacer commits sin salir del editor.

6. **Debugging:** Puedes depurar código línea por línea.

7. **Lightweight:** Más rápido que IDEs pesados como Eclipse o NetBeans.

#### Extensiones usadas en el proyecto

**1. ES7+ React/Redux/React-Native snippets**
- Atajos para crear componentes React rápidamente
- `rafce` → Crea componente funcional completo

**2. PHP Intelephense**
- Autocompletado para PHP
- Detecta errores en tiempo real
- Navegación a definiciones

**3. Tailwind CSS IntelliSense**
- Autocompletado de clases Tailwind
- Preview de colores
- Sugerencias de clases

**4. Thunder Client**
- Testing de APIs REST dentro de VS Code
- Colecciones de requests organizadas
- Alternativa a Postman

**5. GitLens**
- Muestra quién modificó cada línea
- Historial de Git inline
- Blame annotations

**6. ESLint**
- Detecta errores de JavaScript
- Sugiere mejores prácticas
- Formatea código automáticamente

#### Beneficios en el proyecto

- **Productividad:** Snippets y autocompletado aceleran el desarrollo
- **Calidad:** Linters detectan errores antes de ejecutar
- **Consistencia:** Todos usan el mismo editor con mismas configuraciones
- **Debugging:** Encontrar errores es más rápido

---

### 20. XAMPP 8.2

#### ¿Qué es XAMPP?

XAMPP es un **paquete de software** que instala Apache, MySQL, PHP y phpMyAdmin en un solo instalador. XAMPP significa: **X** (Cross-platform), **A** (Apache), **M** (MariaDB/MySQL), **P** (PHP), **P** (Perl).

#### ¿Por qué XAMPP?

1. **Todo en Uno:** Instalar Apache, MySQL y PHP por separado es complicado. XAMPP lo hace en 5 minutos.

2. **Configuración Automática:** Apache y MySQL ya vienen configurados para trabajar juntos.

3. **phpMyAdmin Incluido:** Interfaz gráfica para gestionar MySQL sin comandos.

4. **Panel de Control:** Encender/apagar servicios fácilmente.

5. **Cross-Platform:** Funciona en Windows, Mac y Linux.

#### ¿Dónde lo usamos en el proyecto?

**XAMPP es el entorno de desarrollo local de todo el equipo:**

- **Apache:** Sirve el backend PHP en puerto 8000
- **MySQL:** Base de datos en puerto 3306
- **phpMyAdmin:** Gestión visual de la BD en http://localhost/phpmyadmin

#### Servicios de XAMPP usados

**1. Apache Web Server**
- Sirve archivos PHP
- Puerto: 80 (o alternativo 8000)

**2. MySQL Database**
- Almacena todos los datos
- Puerto: 3306

**3. phpMyAdmin**
- Interfaz gráfica para MySQL
- Crear tablas, insertar datos, ejecutar queries

**4. PHP**
- Versión 8.2
- Con extensiones necesarias (PDO, mysqli, mbstring, etc.)

#### Configuración del proyecto en XAMPP

**php.ini modificado:**
```
session.cookie_httponly = On
session.use_strict_mode = On
upload_max_filesize = 10M
post_max_size = 10M
memory_limit = 256M
```

**my.ini (MySQL) modificado:**
```
max_connections = 100
innodb_buffer_pool_size = 256M
```

---

### 21. THUNDER CLIENT / POSTMAN

#### ¿Qué son?

Son **clientes HTTP** para probar APIs. Permiten enviar peticiones HTTP y ver respuestas sin necesidad de un navegador o frontend.

#### ¿Por qué los usamos?

Cuando desarrollamos un endpoint PHP, necesitamos probarlo antes de conectarlo al frontend. Thunder Client/Postman permiten:

1. **Probar APIs sin Frontend:** Antes de que el frontend esté listo
2. **Debug:** Ver exactamente qué responde el servidor
3. **Colecciones:** Organizar peticiones por módulo
4. **Variables:** Reutilizar URLs y tokens
5. **Historial:** Ver peticiones anteriores

#### ¿Dónde lo usamos en el proyecto?

**Testing de TODOS los 50+ endpoints:**

**Colecciones creadas:**
1. **Autenticación**
   - POST /api/auth/login.php
   - POST /api/auth/logout.php
   - GET /api/auth/session.php
   - POST /api/auth/forgot-password.php

2. **Usuarios**
   - GET /api/usuarios/list.php
   - POST /api/usuarios/create.php
   - POST /api/usuarios/update.php
   - POST /api/usuarios/delete.php

3. **Alumnos, Maestros, Aulas, etc.**
   - 5 endpoints cada uno

#### Ejemplo de uso en desarrollo

**Desarrollador A está creando el endpoint de crear usuario:**

1. Escribe el código PHP en `usuarios/create.php`
2. Abre Thunder Client
3. Configura petición POST a `http://localhost:8000/api/usuarios/create.php`
4. Agrega body JSON:
```json
{
  "Nombre": "Test Usuario",
  "Correo": "test@test.com",
  "Contraseña": "Test123!",
  "TipoUsuario": "Secretario"
}
```
5. Envía la petición
6. Ve la respuesta:
```json
{
  "success": true,
  "message": "Usuario creado exitosamente",
  "id": 10
}
```
7. Verifica en phpMyAdmin que el usuario se creó
8. Prueba casos de error (correo duplicado, contraseña débil, etc.)
9. Una vez que todo funciona, conecta el frontend

---

### 22. MYSQL WORKBENCH / PHPMYADMIN

#### ¿Qué son?

Son **herramientas de gestión visual** para MySQL. Permiten trabajar con la base de datos sin escribir SQL directamente.

#### ¿Por qué las usamos?

1. **Diseño Visual:** Crear tablas con clicks en lugar de SQL
2. **Diagrama ER:** Ver gráficamente las relaciones entre tablas
3. **Query Builder:** Construir queries visualmente
4. **Import/Export:** Backup y restauración fáciles
5. **Gestión de Usuarios:** Crear usuarios y permisos

#### ¿Dónde las usamos en el proyecto?

**MySQL Workbench:**
- **Diseño del Schema:** Diagrama ER con las 12 tablas y sus relaciones
- **Forward Engineering:** Generar SQL desde el diagrama
- **Reverse Engineering:** Generar diagrama desde BD existente
- **Query Editor:** Escribir y ejecutar queries complejas
- **Backup:** Exportar toda la BD

**phpMyAdmin (más usado):**
- **Día a día:** Ejecutar queries rápidas
- **Importar schema.sql:** Crear la estructura inicial
- **Ver datos:** Verificar que los inserts funcionaron
- **Ejecutar Stored Procedures:** Probar sp_RegistrarPrestamo
- **Ver estadísticas:** Tamaño de tablas, índices

#### Operaciones comunes en phpMyAdmin

1. **Crear base de datos:** `telesecundaria`
2. **Importar schema:** Ejecutar `database/schema.sql`
3. **Insertar datos de prueba:** Los 4 usuarios, 5 aulas, 8 materias
4. **Verificar relaciones:** Ver foreign keys en la pestaña "Estructura"
5. **Ejecutar queries de análisis:**
   - Cuántos alumnos por grado
   - Promedio de calificaciones
   - Materiales más prestados

---

## RESUMEN DE USO POR MÓDULO

Para cumplir con el requerimiento de demostrar que usamos los frameworks (aunque no sea en todo el proyecto), aquí está el mapeo exacto:

### LOGIN

| Framework | Uso Específico |
|-----------|----------------|
| React | Componente Login.jsx completo |
| Tailwind CSS | Diseño split-screen, modal de recuperación |
| React Router | Ruta /login, redirección a /dashboard |
| Axios | POST a /api/auth/login.php |
| Sonner | Notificaciones de éxito/error |
| Font Awesome | Iconos fa-user, fa-lock, fa-eye, fa-key |
| Google Fonts | Tipografía Poppins en todo el formulario |
| PHP | Backend login.php |
| PDO | Query SELECT para buscar usuario |
| MySQL | Tabla Usuarios |
| InnoDB | Actualización de UltimoAcceso con transacción |
| PHPMailer | Envío de email en forgot-password |

### DASHBOARD

| Framework | Uso Específico |
|-----------|----------------|
| React | Componente Dashboard.jsx con 4 variantes |
| Tailwind CSS | Tarjetas de estadísticas con gradientes |
| React Router | Ruta /dashboard |
| Axios | GET a /api/dashboard/stats.php |
| Font Awesome | Iconos para cada estadística |
| PHP | Backend stats.php |
| PDO | Múltiples queries SELECT para estadísticas |
| MySQL | Consultas a todas las tablas |

### USUARIOS (CRUD)

| Framework | Uso Específico |
|-----------|----------------|
| React | Componente Usuarios.jsx |
| Tailwind CSS | Tabla, modal crear/editar, indicadores de validación |
| Axios | POST/GET/DELETE a /api/usuarios/*.php |
| Sonner | Notificaciones CRUD |
| Font Awesome | Iconos editar, eliminar, plus, check, times |
| PHP | 5 endpoints (list, get, create, update, delete) |
| PDO | Prepared statements para todas las operaciones |
| MySQL | Tabla Usuarios, validación de correo único |

### PRÉSTAMOS

| Framework | Uso Específico |
|-----------|----------------|
| React | Componente Prestamos.jsx |
| Axios | POST a /api/prestamos/create.php |
| PHP | Backend con lógica de transacciones |
| PDO | beginTransaction, commit, rollback |
| MySQL | Tablas Prestamo, DetallePrestamo, Materiales |
| InnoDB | Transacción ACID para integridad |

### RECUPERACIÓN DE CONTRASEÑA

| Framework | Uso Específico |
|-----------|----------------|
| React | Modal de forgot password |
| Tailwind CSS | Diseño del modal |
| Axios | POST a /api/auth/forgot-password.php |
| Sonner | Notificación "Email enviado" |
| PHP | Backend forgot-password.php |
| PDO | INSERT en password_resets |
| MySQL | Tabla password_resets |
| PHPMailer | **Envío de email HTML con token** |
| Composer | Instalación de PHPMailer |

---

## CONCLUSIÓN

Este proyecto utiliza **22 frameworks, librerías y tecnologías** diferentes, cada una seleccionada estratégicamente para resolver problemas específicos:

**Frontend (10):** React, Vite, Tailwind CSS, React Router, Axios, Sonner, Font Awesome, Google Fonts, PostCSS, Autoprefixer

**Backend (5):** PHP 8.2, PDO, PHPMailer, Composer, Apache

**Base de Datos (2):** MySQL 8.0, InnoDB

**Herramientas (5):** Git, VS Code, XAMPP, Thunder Client, phpMyAdmin

Cada framework:
- **Resuelve un problema real** del proyecto
- **Fue usado efectivamente** en al menos un módulo
- **Mejora la calidad** del código o la experiencia del usuario
- **Es estándar de la industria** y relevante profesionalmente

El resultado es un sistema **profesional, escalable, seguro y mantenible** que demuestra dominio de tecnologías web modernas.

---

**Elaborado por:** Equipo de Desarrollo - Sistema Telesecundaria (6 personas)  
**Periodo:** Octubre - Diciembre 2025  
**Documento:** Explicación Detallada de Frameworks  
**Versión:** 1.0

