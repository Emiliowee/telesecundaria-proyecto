# METODOLOGÍA SCRUM Y ROLES DEL EQUIPO
## Sistema de Gestión Escolar - Telesecundaria

**Equipo:** 6 personas | **Periodo:** Octubre - Diciembre 2025  
**Metodología:** Scrum (Ágil)

---

## ÍNDICE

1. [Introducción a Scrum](#introducción-a-scrum)
2. [Por qué elegimos Scrum](#por-qué-elegimos-scrum)
3. [Roles del Equipo Scrum](#roles-del-equipo-scrum)
4. [Distribución de Responsabilidades](#distribución-de-responsabilidades)
5. [Sprints del Proyecto](#sprints-del-proyecto)
6. [Ceremonias de Scrum](#ceremonias-de-scrum)
7. [Herramientas Utilizadas](#herramientas-utilizadas)

---

## INTRODUCCIÓN A SCRUM

Scrum es un **marco de trabajo ágil** para gestionar proyectos complejos. Se basa en iteraciones llamadas **Sprints** (ciclos de 2-4 semanas) donde el equipo desarrolla incrementos funcionales del producto.

### Principios Fundamentales de Scrum:

1. **Transparencia:** Todo el equipo sabe qué está haciendo cada quien
2. **Inspección:** Revisar constantemente el progreso
3. **Adaptación:** Ajustar el plan según lo aprendido
4. **Trabajo en Equipo:** Colaboración constante
5. **Entregas Incrementales:** Funcionalidad nueva cada sprint

---

## POR QUÉ ELEGIMOS SCRUM

### Razones de la Elección:

1. **Equipo de 6 Personas:** Tamaño ideal para Scrum (3-9 personas)
2. **Plazo Definido:** 3 meses = 6 sprints de 2 semanas
3. **Requisitos Cambiantes:** Nos permitió ajustar durante el desarrollo
4. **Entregas Frecuentes:** Cliente vio progreso cada 2 semanas
5. **Aprendizaje Continuo:** Mejoramos el proceso en cada retrospectiva
6. **Trabajo en Equipo:** Todos participaron según sus fortalezas

### Alternativas Consideradas:

- **Cascada (Waterfall):** Descartada por ser demasiado rígida
- **Kanban:** Descartada por falta de estructura temporal
- **XP (Extreme Programming):** Demasiado enfocado en programación

**Conclusión:** Scrum fue la mejor opción para nuestro proyecto.

---

## ROLES DEL EQUIPO SCRUM

En Scrum existen 3 roles principales:

### 1. PRODUCT OWNER (Dueño del Producto)

**Responsabilidad:** Maximizar el valor del producto y gestionar el Product Backlog.

**Actividades:**
- Definir requisitos y prioridades
- Crear User Stories
- Validar que las funcionalidades cumplan expectativas
- Comunicarse con stakeholders
- Aceptar o rechazar el trabajo completado

---

### 2. SCRUM MASTER (Facilitador)

**Responsabilidad:** Asegurar que el equipo siga Scrum correctamente y eliminar impedimentos.

**Actividades:**
- Facilitar ceremonias (Daily Standup, Sprint Planning, etc.)
- Resolver bloqueos y problemas
- Proteger al equipo de interrupciones externas
- Entrenar al equipo en Scrum
- Promover la mejora continua

---

### 3. EQUIPO DE DESARROLLO (Development Team)

**Responsabilidad:** Construir el incremento de producto funcional.

**Actividades:**
- Escribir código (frontend, backend, base de datos)
- Diseñar interfaces
- Probar funcionalidades
- Documentar el sistema
- Auto-organizarse para completar el trabajo

---

## 4. IMPLEMENTACIÓN DE SCRUM EN EL PROYECTO

Una vez seleccionado Scrum como la metodología apropiada, el siguiente paso fue planificar su implementación específica para este proyecto. La implementación se dividió en varias etapas clave: definición de roles, establecimiento de ceremonias, configuración de artefactos y definición de la duración de sprints.

---

## 4.1. DEFINICIÓN DE ROLES

La correcta asignación de roles fue fundamental para el éxito del proyecto. Se consideraron las fortalezas, experiencia y habilidades de cada miembro del equipo para maximizar la productividad y eficiencia.

### 🔵 DAMIÁN - PRODUCT OWNER

**Perfil:** Con fuerte capacidad de comunicación  
**Rol en Scrum:** Product Owner (Dueño del Producto)

#### ¿Qué hizo?
Coordinó todo el proyecto, decidió qué era prioritario y validó que cada funcionalidad cumpliera con las expectativas del cliente.

#### Responsabilidades Principales:
- **Gestión del Product Backlog:** Creó y priorizó las 60+ User Stories del proyecto
- **Validación de Funcionalidades:** Revisó y aprobó cada módulo completado
- **Comunicación con Stakeholders:** Representó las necesidades de la telesecundaria
- **Definición de Criterios de Aceptación:** Estableció qué significa "terminado" para cada funcionalidad
- **Priorización Continua:** Ajustó prioridades según feedback y necesidades emergentes

#### Módulos que Validó:
✅ Login y Autenticación  
✅ Dashboard (4 variantes por rol)  
✅ Gestión de Usuarios, Alumnos, Maestros  
✅ Sistema de Préstamos y Calificaciones  
✅ Todos los módulos del sistema

**Horas Totales:** 180 horas (15h/semana × 12 semanas)

---

### 🟠 SERGIO - SCRUM MASTER

**Perfil:** Organizado y resolutivo  
**Rol en Scrum:** Scrum Master (Facilitador)

#### ¿Qué hizo?
Probó toda la aplicación buscando errores, y cuando algo no funcionaba, coordinaba con el equipo para arreglarlo. Facilitó todas las ceremonias Scrum.

#### Responsabilidades Principales:
- **Testing y Control de Calidad:** Probó todos los módulos manualmente, identificó bugs y validó correcciones
- **Facilitación de Ceremonias:** Organizó y moderó Daily Standups, Sprint Planning, Reviews y Retrospectives
- **Gestión de Impedimentos:** Resolvió bloqueos técnicos (problemas de Git, XAMPP, configuraciones)
- **Protección del Equipo:** Aseguró que el equipo pudiera trabajar sin interrupciones
- **Mejora Continua:** Propuso mejoras en cada retrospectiva

#### Contribuciones Clave:
✅ Plan de pruebas completo (100+ casos de prueba)  
✅ GUIA_INSTALACION_Y_EJECUCION.md  
✅ Scripts de reparación (REPARAR_MYSQL_ARIA.bat)  
✅ Configuración de Git y control de versiones  
✅ Testing exhaustivo de todos los módulos

**Horas Totales:** 180 horas (15h/semana × 12 semanas)

---

### 🟡 MAGUI & ELÍAS - DISEÑADORES UI/UX & DOCUMENTACIÓN

**Perfiles:** Creativos y orientados al usuario  
**Rol en Scrum:** Equipo de Diseño y Documentación

#### ¿Qué hicieron?
Diseñaron cómo se vería todo el sistema: los colores, las fuentes, la experiencia de usuario. Magui creó los diseños en Canva, y Elías escribió la documentación técnica y de usuario.

#### Responsabilidades de MAGUI:
- **Diseño Visual:** Definió la paleta de colores (rosa #ec4899 primario)
- **Tipografía:** Seleccionó Poppins como fuente principal
- **Mockups en Canva:** Creó diseños de pantallas principales (Login, Dashboard, CRUD)
- **Iconografía:** Seleccionó íconos de Font Awesome
- **Diseño Responsive:** Definió cómo se vería en diferentes dispositivos

#### Responsabilidades de ELÍAS:
- **Documentación Técnica:** Escribió guías de instalación, configuración y uso
- **Manuales de Usuario:** Creó manuales para cada tipo de usuario (Director, Secretario, Maestro)
- **README y Wikis:** Documentó el proyecto completo
- **Diagramas:** Creó diagramas de flujo de navegación
- **Documentación de Código:** Comentó y explicó funcionalidades clave

#### Contribuciones Conjuntas:
✅ Identidad visual completa del sistema  
✅ Mockups de las 12+ pantallas principales en Canva  
✅ Manuales de usuario para 4 tipos de roles  
✅ Documentación técnica completa  
✅ Guías de estilo y buenas prácticas  
✅ README.md y documentación general

**Horas Totales por Persona:** 120 horas cada uno (10h/semana × 12 semanas)  
**Horas Totales del Equipo de Diseño:** 240 horas

---

### 🔴 EMILIO - DESARROLLADOR FULL-STACK PRINCIPAL

**Perfil:** Mayor experiencia técnica  
**Rol en Scrum:** Desarrollador Principal / Arquitecto Técnico

#### ¿Qué hizo?
Fue el desarrollador principal que implementó todo el código del sistema: frontend con React, backend con PHP y la integración completa entre ambos.

#### Responsabilidades Principales:
- **Arquitectura del Sistema:** Definió el stack tecnológico (React + Vite + PHP + MySQL)
- **Frontend (React):** Desarrolló todos los componentes, páginas y navegación con React Router
- **Backend (PHP):** Creó 50+ endpoints REST API con validaciones y seguridad
- **Integración:** Conectó frontend-backend con Axios, configuró CORS
- **Autenticación:** Implementó sistema de login con sesiones PHP
- **Seguridad:** Aplicó prepared statements, validaciones y hashing de contraseñas

#### Módulos Desarrollados:
✅ Login y Autenticación completo  
✅ Dashboard dinámico (4 variantes por rol)  
✅ CRUD Usuarios (con validación de contraseñas seguras)  
✅ CRUD Maestros, Alumnos, Aulas, Materias  
✅ CRUD Materiales  
✅ Sistema de Préstamos (con transacciones ACID)  
✅ Sistema de Calificaciones  
✅ Reportes dinámicos  
✅ Recuperación de Contraseña (PHPMailer)

**Horas Totales:** 360 horas (30h/semana × 12 semanas)

---

### 🟢 JESÚS LEYVA - DESARROLLADOR FULL-STACK

**Perfil:** Especialista en Base de Datos  
**Rol en Scrum:** Desarrollador Secundario / DBA

#### ¿Qué hizo?
Diseñó la estructura de la base de datos (12 tablas, stored procedures, triggers) y apoyó en el desarrollo de funcionalidades backend.

#### Responsabilidades Principales:
- **Diseño de Base de Datos:** Diseñó el esquema relacional completo con normalización 3FN
- **Modelado de Datos:** Creó diagrama Entidad-Relación con 12 tablas
- **Scripts SQL:** Escribió el archivo `schema.sql` con estructura y datos iniciales
- **Stored Procedures:** Implementó `sp_RegistrarPrestamo` con lógica transaccional
- **Triggers:** Creó triggers para actualización automática de stock
- **Optimización:** Definió índices estratégicos para mejorar rendimiento
- **Datos de Prueba:** Generó datos realistas (4 usuarios, 5 aulas, 8 materias, 20+ alumnos)
- **Apoyo Backend:** Colaboró en endpoints complejos con Emilio

#### Contribuciones Clave:
✅ Script `schema.sql` completo (12 tablas relacionales)  
✅ Stored Procedure `sp_RegistrarPrestamo`  
✅ Triggers de automatización  
✅ Índices de optimización  
✅ Datos de prueba realistas  
✅ Scripts de verificación (VERIFICAR_CALIFICACIONES.sql, VERIFICAR_TIPOS_DATOS.sql)

**Horas Totales:** 180 horas (15h/semana × 12 semanas)

---

## 4.2. RESUMEN DE HORAS Y ESFUERZO POR PERSONA

| Nombre | Rol Principal | Horas/Semana | Total Horas | % del Proyecto |
|--------|---------------|--------------|-------------|----------------|
| **Emilio** | Desarrollador Full-Stack Principal | 30h | 360h | 33% |
| **Jesús Leyva** | Desarrollador Full-Stack (BD) | 15h | 180h | 17% |
| **Damián** | Product Owner | 15h | 180h | 17% |
| **Sergio** | Scrum Master | 15h | 180h | 17% |
| **Magui** | Diseñadora UI/UX | 10h | 120h | 11% |
| **Elías** | Documentador Técnico | 10h | 120h | 11% |
| **TOTAL** | - | **95h/sem** | **1,140h** | **106%** |

**Nota:** El total de 1,140 horas refleja el esfuerzo colaborativo de 6 personas durante 12 semanas.

---

## 4.3. SPRINTS DEL PROYECTO

El proyecto se organizó en **6 sprints de 2 semanas cada uno**, precedidos por un Sprint 0 de preparación. Cada sprint culminó con funcionalidades demostrables y valor entregado al cliente.

### Duración de Sprints: 2 semanas cada uno (excepto Sprint 0)

---

### **Sprint 0 (Semana 1): Setup del Proyecto**
**Duración:** 1 semana  
**Objetivo:** Preparar entorno de desarrollo, herramientas y arquitectura base

**Actividades por Persona:**
- **Damián:** Definió requisitos iniciales, creó el Product Backlog con 60+ User Stories priorizadas
- **Sergio:** Configuró herramientas de comunicación (WhatsApp, Discord), tablero Trello, Git
- **Emilio:** Configuró repositorio Git, inicializó proyecto React con Vite, configuró XAMPP
- **Jesús Leyva:** Diseñó esquema inicial de base de datos, creó diagrama ER preliminar
- **Magui:** Investigó referencias de diseño, definió paleta de colores y tipografía, creó primeros mockups en Canva
- **Elías:** Preparó estructura de documentación, creó plantillas de manuales, configuró README

**Entregable:** Entorno de desarrollo configurado, Product Backlog priorizado, arquitectura definida

---

### **Sprint 1 (Semanas 2-3): Autenticación y Base**
**Objetivo:** Sistema de login funcional con autenticación segura

**User Stories Completadas:**
- US-001: Como usuario, quiero iniciar sesión con ID y contraseña
- US-002: Como usuario, quiero ver un dashboard según mi rol
- US-003: Como usuario, quiero cerrar sesión de forma segura

**Actividades por Persona:**
- **Damián:** Validó flujo de login, definió criterios de aceptación para cada tipo de dashboard
- **Sergio:** Probó casos de error (contraseña incorrecta, usuario inactivo), validó seguridad de sesiones
- **Emilio:** Desarrolló componente Login en React, endpoints de autenticación en PHP, 4 dashboards base
- **Jesús Leyva:** Creó tabla Usuarios con campos de seguridad, insertó 4 usuarios de prueba
- **Magui:** Diseñó interfaz de login split-screen con imagen lateral en Canva
- **Elías:** Documentó flujos de autenticación, casos de uso de login, manual inicial

**Entregable:** Login funcional + 4 dashboards básicos + Documentación de autenticación

---

### **Sprint 2 (Semanas 4-5): Gestión de Usuarios**
**Objetivo:** CRUD completo de usuarios con recuperación de contraseña

**User Stories Completadas:**
- US-004: Como Director, quiero crear usuarios nuevos
- US-005: Como Director, quiero editar información de usuarios
- US-006: Como Director, quiero activar/desactivar usuarios
- US-007: Como usuario, quiero recuperar mi contraseña vía email

**Actividades por Persona:**
- **Damián:** Definió requisitos de contraseñas seguras (mayúsculas, minúsculas, números, símbolos)
- **Sergio:** Probó todas las validaciones, recuperación de contraseña, envío de emails con PHPMailer
- **Emilio:** Desarrolló CRUD completo, validaciones en tiempo real, integración de PHPMailer
- **Jesús Leyva:** Creó tabla `password_resets` con tokens y expiración, queries de recuperación
- **Magui:** Diseñó modal de usuarios, indicadores de fortaleza de contraseña, modal de recuperación
- **Elías:** Documentó proceso de creación de usuarios, guía de recuperación de contraseña

**Entregable:** Módulo de Usuarios completo + Sistema de recuperación de contraseña + Documentación

---

### **Sprint 3 (Semanas 6-7): Gestión Académica**
**Objetivo:** CRUD completos de entidades académicas principales

**User Stories Completadas:**
- US-008 a US-011: CRUD de Maestros (con especialidad y horarios)
- US-012 a US-015: CRUD de Alumnos (con validación de edad y matrícula)
- US-016 a US-019: CRUD de Aulas (con capacidad y equipamiento)
- US-020 a US-023: CRUD de Materias (con grados y horas)

**Actividades por Persona:**
- **Damián:** Priorizó módulos, validó que cumplieran requisitos académicos de telesecundaria
- **Sergio:** Probó los 4 CRUD completos, validaciones de campos, casos límite (capacidad aulas, edades)
- **Emilio:** Desarrolló 4 módulos CRUD completos con endpoints backend y componentes React
- **Jesús Leyva:** Creó tablas Maestros, Alumnos, Aulas, Materias; optimizó queries con índices
- **Magui:** Diseñó formularios modernos y tablas responsive con paginación en Canva
- **Elías:** Documentó cada módulo CRUD, manuales de uso para secretarios y directivos

**Entregable:** 4 módulos académicos completos + Documentación de cada módulo

---

### **Sprint 4 (Semanas 8-9): Materiales y Préstamos**
**Objetivo:** Sistema completo de inventario y préstamos con control de stock

**User Stories Completadas:**
- US-024 a US-027: CRUD de Materiales (con categorías y ubicación)
- US-028 a US-031: Registro de Préstamos (con control de disponibilidad)
- US-032 a US-033: Devoluciones de Materiales (con actualización de stock)
- US-034: Historial completo de préstamos por alumno

**Actividades por Persona:**
- **Damián:** Definió lógica de negocio (límite de préstamos, tiempos de devolución, multas)
- **Sergio:** Probó transacciones, actualización de stock, casos de préstamos simultáneos
- **Emilio:** Desarrolló sistema con transacciones ACID, validaciones de stock disponible
- **Jesús Leyva:** Implementó stored procedure `sp_RegistrarPrestamo` con BEGIN/COMMIT/ROLLBACK
- **Magui:** Diseñó interfaz de préstamos con indicadores visuales de disponibilidad
- **Elías:** Documentó proceso de préstamos, políticas de devolución, manual para administrativos

**Entregable:** Sistema de préstamos completo + Control de inventario + Documentación

---

### **Sprint 5 (Semanas 10-11): Calificaciones**
**Objetivo:** Sistema completo de captura y gestión de calificaciones

**User Stories Completadas:**
- US-035 a US-037: Captura de calificaciones por materia y periodo
- US-038 a US-039: Edición y corrección de calificaciones
- US-040 a US-042: Cálculo automático de promedios
- US-043 a US-045: Reportes de calificaciones por alumno, grupo y materia

**Actividades por Persona:**
- **Damián:** Validó lógica de periodos (bimestres), criterios de aprobación (mínimo 60)
- **Sergio:** Probó rangos (0-100), validaciones, casos límite (decimales, negativos), reportes
- **Emilio:** Desarrolló módulo completo de calificaciones, cálculo de promedios, generación de reportes
- **Jesús Leyva:** Creó tabla Calificaciones, views para promedios, optimizó queries con índices compuestos
- **Magui:** Diseñó interfaz de captura tipo hoja de cálculo, visualización de promedios con colores
- **Elías:** Documentó proceso de captura, políticas de evaluación, manual para maestros

**Entregable:** Sistema de calificaciones completo + Reportes + Documentación

---

### **Sprint 6 (Semanas 12-13): Dashboard Dinámico y Refinamiento**
**Objetivo:** Dashboards personalizados con estadísticas reales y pulido final del sistema

**User Stories Completadas:**
- US-046 a US-049: Dashboards personalizados por rol (Director, Secretario, Maestro, Administrativo)
- US-050 a US-052: Estadísticas en tiempo real (totales, promedios, gráficas)
- US-053 a US-055: Mejoras de usabilidad y corrección de bugs
- US-056 a US-060: Optimización de rendimiento y documentación final

**Actividades por Persona:**
- **Damián:** Validó todas las estadísticas, criterios de aceptación final, aprobación del cliente
- **Sergio:** Realizó testing de regresión completo (todos los módulos), documentó instalación (GUIA_INSTALACION_Y_EJECUCION.md)
- **Emilio:** Implementó estadísticas dinámicas para dashboards, corrigió 20+ bugs identificados, optimizó rendimiento
- **Jesús Leyva:** Creó queries optimizadas para estadísticas, índices finales, script de respaldo
- **Magui:** Refinó diseño final, ajustó responsive para móviles y tablets, pulido visual
- **Elías:** Completó documentación final (README, manuales de usuario, guías técnicas), casos de uso completos

**Entregable:** Sistema 100% completo, probado, optimizado y documentado

---

## CEREMONIAS DE SCRUM

### 1. DAILY STANDUP (Reunión Diaria)
**Frecuencia:** Todos los días  
**Duración:** 15 minutos  
**Hora:** 9:00 AM

**Formato:**
Cada miembro responde 3 preguntas:
1. ¿Qué hice ayer?
2. ¿Qué haré hoy?
3. ¿Tengo algún impedimento?

**Facilitador:** Sergio (Scrum Master)

---

### 2. SPRINT PLANNING (Planificación de Sprint)
**Frecuencia:** Inicio de cada sprint (cada 2 semanas)  
**Duración:** 2 horas  
**Día:** Lunes de inicio de sprint

**Actividades:**
1. Damián presenta User Stories prioritarias
2. Equipo estima esfuerzo (Planning Poker)
3. Equipo se compromete con User Stories del sprint
4. Se define el Sprint Goal
5. Se descomponen User Stories en tareas

**Resultado:** Sprint Backlog definido

---

### 3. SPRINT REVIEW (Revisión de Sprint)
**Frecuencia:** Final de cada sprint  
**Duración:** 1 hora  
**Día:** Viernes de fin de sprint

**Actividades:**
1. Emilio demuestra funcionalidades completadas
2. Damián valida que cumplan criterios de aceptación
3. Se recibe feedback del cliente (simulado)
4. Se discuten ajustes necesarios

**Asistentes:** Todo el equipo + stakeholders

---

### 4. SPRINT RETROSPECTIVE (Retrospectiva)
**Frecuencia:** Final de cada sprint  
**Duración:** 1 hora  
**Día:** Viernes después del Sprint Review

**Formato:** Start-Stop-Continue
- ¿Qué deberíamos empezar a hacer?
- ¿Qué deberíamos dejar de hacer?
- ¿Qué deberíamos continuar haciendo?

**Facilitador:** Sergio

**Resultado:** Plan de mejora para siguiente sprint

---

## HERRAMIENTAS UTILIZADAS

### Gestión de Proyecto:
- **Trello:** Tablero Kanban para Product Backlog y Sprint Backlog
- **Google Sheets:** Seguimiento de horas y velocidad del equipo
- **Google Meet:** Reuniones diarias y ceremonias

### Desarrollo:
- **Git/GitHub:** Control de versiones
- **VS Code:** Editor de código (todo el equipo)
- **XAMPP:** Entorno de desarrollo local
- **Thunder Client:** Testing de APIs

### Comunicación:
- **WhatsApp:** Comunicación diaria del equipo
- **Google Drive:** Documentación compartida
- **Discord:** Pair programming y ayuda técnica

---

## BENEFICIOS DE USAR SCRUM

### Para el Proyecto:
1. ✅ Entregas funcionales cada 2 semanas
2. ✅ Feedback temprano y frecuente
3. ✅ Ajustes basados en aprendizajes
4. ✅ Visibilidad clara del progreso
5. ✅ Calidad asegurada con testing continuo

### Para el Equipo:
1. ✅ Todos conocían el estado del proyecto
2. ✅ Problemas se resolvían rápidamente
3. ✅ Cada quien trabajó en sus fortalezas
4. ✅ Mejora continua del proceso
5. ✅ Aprendizaje de metodologías ágiles

---

## CONCLUSIÓN

El uso de **Scrum** permitió al equipo de 6 personas desarrollar exitosamente el Sistema de Gestión Escolar en 3 meses. La distribución clara de roles y la colaboración constante fueron clave para:

- ✅ Completar **12 módulos funcionales**
- ✅ Desarrollar **50+ endpoints REST API**
- ✅ Implementar **12 tablas relacionales** con integridad referencial
- ✅ Crear **1,140 horas** de trabajo efectivo colaborativo
- ✅ Entregar un sistema **100% funcional** y documentado

### Contribución por Miembro del Equipo:

- **Damián (Product Owner):** Coordinó todo el proyecto, priorizó funcionalidades y validó entregas
- **Sergio (Scrum Master):** Probó exhaustivamente el sistema, facilitó ceremonias y resolvió impedimentos
- **Emilio (Dev Principal):** Programó toda la aplicación (React + PHP + integración)
- **Jesús Leyva (Dev Secundario/DBA):** Diseñó la base de datos completa y apoyó en backend
- **Magui (Diseñadora UI/UX):** Creó todos los diseños visuales en Canva y definió la identidad
- **Elías (Documentador):** Escribió toda la documentación técnica y manuales de usuario

### Aprendizajes Clave:

1. **Sprints de 2 semanas** permitieron entregas frecuentes y feedback temprano
2. **Daily Standups** mantuvieron al equipo sincronizado y sin bloqueos
3. **Roles claros** evitaron duplicación de esfuerzos y maximizaron productividad
4. **Retrospectivas** generaron mejoras continuas en el proceso de trabajo
5. **Colaboración constante** entre desarrolladores, diseñadores y testers aseguró calidad

El resultado es un **proyecto profesional, completo y listo para producción**.

---

**Elaborado por:** Equipo de Desarrollo Scrum  
**Metodología:** Scrum (Ágil)  
**Periodo:** Octubre - Diciembre 2025  
**Documento:** Metodología y Roles del Equipo  
**Versión:** 1.0

