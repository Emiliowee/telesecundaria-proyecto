# CRONOGRAMA DE ACTIVIDADES OCTUBRE - DICIEMBRE 2025
## Sistema de Gestión Escolar - Telesecundaria

**Periodo:** Octubre - Diciembre 2025 (3 meses)  
**Metodología:** Scrum con sprints de 2 semanas  
**Equipo:** 6 estudiantes

---

## INTRODUCCIÓN

Este cronograma detalla cómo organizamos y distribuimos el trabajo durante los 3 meses de desarrollo del proyecto. Como equipo de estudiantes, teníamos que balancear este proyecto con nuestras demás clases y actividades, por lo que la metodología Scrum nos ayudó a organizarnos mejor y trabajar de manera más eficiente.

**Fecha de Inicio:** 7 de Octubre de 2025  
**Fecha de Entrega:** 31 de Diciembre de 2025  
**Duración Total:** 13 semanas

---

## DISTRIBUCIÓN MENSUAL

### 📅 OCTUBRE 2025 (4 semanas)

**Objetivo del mes:** Configurar el entorno y crear las bases del sistema

**¿Qué hicimos?**
- **Semana 1:** Configuramos todo (Git, XAMPP, React, bases de datos)
- **Semanas 2-3:** Desarrollamos el sistema de login y los 4 dashboards básicos
- **Semana 4:** Iniciamos el módulo de usuarios

**Principales logros:**
- ✅ Todos pudimos correr el proyecto en nuestras computadoras
- ✅ El login funciona correctamente
- ✅ Cada tipo de usuario ve su propio dashboard

**Horas invertidas:** Aproximadamente 285 horas entre todo el equipo  
**Avance:** 25% del proyecto

**Dificultades:**
- Al principio algunos tuvimos problemas con la instalación de XAMPP
- Nos costó entender cómo funcionaba Git y los commits
- Emilio tuvo que ayudarnos a configurar el entorno

---

### 📅 NOVIEMBRE 2025 (4 semanas)

**Objetivo del mes:** Desarrollar los módulos principales del sistema

**¿Qué hicimos?**
- **Semana 1:** Terminamos el módulo de usuarios con recuperación de contraseña
- **Semanas 2-3:** Creamos los 4 CRUD principales (Maestros, Alumnos, Aulas, Materias)
- **Semana 4:** Empezamos el sistema de préstamos de materiales

**Principales logros:**
- ✅ Sistema de recuperación de contraseña funcionando con emails reales
- ✅ Todos los módulos de gestión académica completos
- ✅ El sistema ya se veía bastante completo

**Horas invertidas:** Aproximadamente 380 horas entre todo el equipo  
**Avance:** 58% del proyecto (acumulado)

**Dificultades:**
- PHPMailer nos dio problemas al configurar el SMTP de Gmail
- Hubo algunos errores al hacer merge en Git (conflictos de código)
- Jesús y Emilio tuvieron que coordinarse bien para la base de datos

---

### 📅 DICIEMBRE 2025 (5 semanas)

**Objetivo del mes:** Completar funcionalidades faltantes y pulir todo

**¿Qué hicimos?**
- **Semana 1:** Terminamos el sistema de préstamos con control de inventario
- **Semanas 2-3:** Desarrollamos el sistema de calificaciones con reportes
- **Semanas 4-5:** Conectamos estadísticas reales a los dashboards y corregimos bugs

**Principales logros:**
- ✅ Sistema de préstamos con transacciones (no se pierde stock)
- ✅ Calificaciones con promedios automáticos
- ✅ Dashboards muestran datos reales del sistema
- ✅ Todo documentado y funcionando

**Horas invertidas:** Aproximadamente 475 horas entre todo el equipo  
**Avance:** 100% del proyecto

**Dificultades:**
- Las transacciones de la base de datos fueron complicadas
- Encontramos varios bugs al final que tuvimos que corregir rápido
- La semana de Navidad trabajamos menos días

---

## SPRINTS REALIZADOS

### Sprint 0: Preparación (Semana del 7 de Octubre)
**Duración:** 1 semana

**¿Qué hicimos?**
La primera semana nos juntamos para configurar todo. Damián organizó las tareas en un tablero de Trello, Sergio creó el repositorio de Git, Emilio nos ayudó a instalar Node.js, XAMPP y React, Jesús diseñó las primeras tablas de la base de datos, Magui buscó referencias de diseño, y Elías preparó las plantillas de documentación.

**Resultado:** Todos pudimos correr el proyecto en nuestras computadoras

**Reuniones:**
- Kickoff al inicio de la semana (nos presentamos y dividimos roles)
- Review el viernes (checamos que todos tuvieran todo instalado)

---

### Sprint 1: Login y Dashboards (14-27 de Octubre)
**Duración:** 2 semanas

**¿Qué hicimos?**
Emilio programó el componente de login en React y el backend en PHP. Jesús creó la tabla de Usuarios en MySQL e implementó el sistema de sesiones. Magui diseñó la pantalla de login en Canva con la imagen lateral. Sergio fue probando que todo funcionara bien. Damián nos iba diciendo qué era más importante hacer primero.

En la segunda semana desarrollamos los 4 tipos de dashboards (uno para Director, uno para Secretario, uno para Maestro y uno para Administrativo).

**Resultado:** El login funciona y cada usuario ve su dashboard personalizado

**Dificultades:** Al principio no sabíamos bien cómo conectar React con PHP, pero lo resolvimos investigando en internet.

---

### Sprint 2: Usuarios y Recuperación (28 Oct - 10 Nov)
**Duración:** 2 semanas

**¿Qué hicimos?**
Desarrollamos el módulo completo de gestión de usuarios. Emilio programó el CRUD (crear, leer, editar, eliminar usuarios) y agregó validaciones para las contraseñas. Jesús configuró PHPMailer para enviar correos. Sergio probó todos los casos (contraseñas débiles, emails inválidos, etc.). Magui diseñó el modal de usuarios y el de recuperación de contraseña. Elías documentó cómo usar el módulo.

**Resultado:** El sistema puede crear usuarios, editarlos, desactivarlos y recuperar contraseñas por email

**Dificultades:** PHPMailer nos costó configurarlo porque Gmail tiene restricciones de seguridad. Tuvimos que generar una "contraseña de aplicación" específica.

---

### Sprint 3: Módulos Académicos (11-24 de Noviembre)
**Duración:** 2 semanas

**¿Qué hicimos?**
Este fue el sprint más pesado. Teníamos que hacer 4 CRUD completos: Maestros, Alumnos, Aulas y Materias. Emilio programó los 4 módulos (frontend y backend), Jesús creó las 4 tablas con sus relaciones, Sergio los probó uno por uno, Magui diseñó los formularios, y Elías fue documentando cada uno.

La primera semana hicimos Maestros y Alumnos, la segunda semana hicimos Aulas y Materias.

**Resultado:** 4 módulos CRUD completos y funcionando

**Dificultades:** Fue mucho trabajo en poco tiempo. Emilio estuvo bastante ocupado, pero Jesús lo ayudó con algunas consultas SQL complicadas.

---

### Sprint 4: Sistema de Préstamos (25 Nov - 8 Dic)
**Duración:** 2 semanas

**¿Qué hicimos?**
Desarrollamos el sistema de control de materiales y préstamos. Primero Emilio hizo el CRUD de Materiales, luego Jesús creó las tablas de Prestamos y DetallePrestamo. Lo más importante fue que Jesús programó un "stored procedure" que hace que cuando prestas un material, el stock se actualice automáticamente y si algo falla, se revierta todo (transacciones ACID).

Sergio probó casos complejos como prestar el mismo material dos veces al mismo tiempo. Elías documentó las políticas de préstamos.

**Resultado:** Sistema de préstamos con control automático de inventario

**Dificultades:** Las transacciones de base de datos fueron nuevas para nosotros, tuvimos que investigar bastante.

---

### Sprint 5: Calificaciones (9-22 de Diciembre)
**Duración:** 2 semanas

**¿Qué hicimos?**
Desarrollamos el sistema de calificaciones. Emilio creó una interfaz tipo hoja de cálculo para capturar las calificaciones. Jesús programó las consultas SQL para calcular promedios automáticamente. Implementamos validaciones para que solo acepte números del 0 al 100. También agregamos 3 tipos de reportes: por alumno, por grupo y por materia.

**Resultado:** Sistema completo de captura de calificaciones con cálculo automático de promedios

**Dificultades:** El cálculo de promedios por bimestre fue un poco complicado, pero Jesús lo resolvió con queries SQL bien pensados.

---

### Sprint 6: Finalización (23-31 de Diciembre)
**Duración:** 1.5 semanas

**¿Qué hicimos?**
Este fue el sprint de "pulir" todo. Conectamos los dashboards con estadísticas reales (antes solo mostraban números de prueba). Sergio hizo una lista de todos los bugs que encontró y Emilio los fue corrigiendo. Magui ajustó el diseño para que se viera bien en celulares. Elías terminó toda la documentación (README, manuales, guía de instalación).

La semana del 25 de diciembre trabajamos poco por las fiestas, pero el 29, 30 y 31 le metimos más para terminar todo.

**Resultado:** Sistema 100% funcional, probado y documentado

**Dificultades:** Encontramos como 20 bugs pequeños al final, pero los corregimos todos. También nos faltó tiempo por las fiestas de Navidad.

---

## REUNIONES Y ORGANIZACIÓN

### Reuniones Diarias (Daily Standup)
**Frecuencia:** Casi todos los días (cuando podíamos)  
**Duración:** 10-15 minutos  
**Dónde:** Por WhatsApp o Discord, a veces presencial

**¿Qué hacíamos?**
Cada quien decía rápido:
- ¿Qué hice ayer?
- ¿Qué voy a hacer hoy?
- ¿Tengo algún problema?

Si alguien estaba atorado, nos ayudábamos ahí mismo o después.

---

### Reuniones de Planeación (Sprint Planning)
**Frecuencia:** Al inicio de cada sprint (cada 2 semanas)  
**Duración:** 1-2 horas  
**Dónde:** Presencial o por Discord

**¿Qué hacíamos?**
Damián nos mostraba qué funcionalidades seguían. Discutíamos qué tan difícil era cada cosa y cuánto tiempo tomaría. Nos comprometíamos a terminar ciertas cosas en las próximas 2 semanas.

---

### Reuniones de Revisión (Sprint Review)
**Frecuencia:** Al final de cada sprint  
**Duración:** 1 hora aprox  
**Dónde:** Presencial

**¿Qué hacíamos?**
Le mostrábamos a Damián (nuestro Product Owner) lo que habíamos terminado. Él lo revisaba y nos decía si estaba bien o había que cambiar algo. A veces invitábamos a alguien externo para que nos diera feedback.

---

### Reuniones de Retrospectiva (Sprint Retrospective)
**Frecuencia:** Al final de cada sprint  
**Duración:** 30-45 minutos  
**Dónde:** Presencial o Discord

**¿Qué hacíamos?**
Hablábamos sobre qué salió bien, qué salió mal, y qué podíamos mejorar. Por ejemplo, una vez nos dimos cuenta que no nos estábamos comunicando bien entre frontend y backend, entonces decidimos avisarnos más cuando cambiábamos algo.

---

## DISTRIBUCIÓN DE TRABAJO

### Por Persona y Por Mes:

| Persona | Octubre | Noviembre | Diciembre | Total |
|---------|---------|-----------|-----------|-------|
| **Emilio** (Dev Principal) | 90h | 120h | 150h | **360h** |
| **Jesús** (Dev BD) | 45h | 60h | 75h | **180h** |
| **Damián** (Product Owner) | 45h | 60h | 75h | **180h** |
| **Sergio** (Scrum Master) | 45h | 60h | 75h | **180h** |
| **Magui** (Diseñadora) | 30h | 40h | 50h | **120h** |
| **Elías** (Documentador) | 30h | 40h | 50h | **120h** |
| **Total por mes** | **285h** | **380h** | **475h** | **1,140h** |

**Nota:** Estos tiempos incluyen todo: programar, diseñar, probar, documentar, reuniones, investigar cuando no sabíamos algo, y corregir errores.

---

## HORAS POR ACTIVIDAD (Promedio)

| Actividad | Horas Aprox | % del Total |
|-----------|-------------|-------------|
| **Programación (Emilio + Jesús)** | 540h | 47% |
| **Testing y QA (Sergio)** | 120h | 11% |
| **Diseño UI/UX (Magui)** | 80h | 7% |
| **Documentación (Elías)** | 80h | 7% |
| **Gestión y Coordinación (Damián)** | 100h | 9% |
| **Reuniones (Todos)** | 80h | 7% |
| **Investigación y Aprendizaje** | 140h | 12% |
| **TOTAL** | **1,140h** | **100%** |

**Nota:** "Investigación y Aprendizaje" incluye todo el tiempo que pasamos buscando en Google, viendo tutoriales, preguntando en foros, etc. porque no sabíamos cómo hacer varias cosas.

---

## ENTREGAS IMPORTANTES

### Entrega 1: Login Funcional (27 de Octubre)
**¿Qué entregamos?**
- Sistema de login con validación de usuarios
- 4 dashboards básicos (uno para cada tipo de usuario)
- Base de datos con tabla de Usuarios

**Feedback recibido:** Funcionó bien a la primera, pero nos pidieron mejorar el diseño del login (se veía muy simple).

---

### Entrega 2: Sistema Académico Básico (24 de Noviembre)
**¿Qué entregamos?**
- CRUD de Usuarios con recuperación de contraseña
- CRUD de Maestros, Alumnos, Aulas y Materias
- Base de datos con 6 tablas relacionadas

**Feedback recibido:** Todo funcionaba correctamente. Nos felicitaron por el sistema de recuperación de contraseña porque no era requerido originalmente.

---

### Entrega Final: Sistema Completo (31 de Diciembre)
**¿Qué entregamos?**
- 12 módulos funcionales completos
- Sistema de préstamos con control de inventario
- Sistema de calificaciones con reportes
- Dashboards con estadísticas en tiempo real
- Documentación completa (README, manuales, guía de instalación)

**Feedback recibido:** Cumplió con todos los requisitos. El sistema quedó mejor de lo esperado.

---

## PROBLEMAS QUE ENFRENTAMOS

### Técnicos:
1. **Git y Control de Versiones**
   - Problema: Al principio no sabíamos usar Git bien y hubo conflictos al hacer merge
   - Solución: Sergio nos dio un mini-tutorial y establecimos reglas (siempre hacer pull antes de push)

2. **Configuración de PHPMailer**
   - Problema: No podíamos enviar emails porque Gmail los bloqueaba
   - Solución: Investigamos y usamos "contraseñas de aplicación" de Gmail

3. **Transacciones de Base de Datos**
   - Problema: No sabíamos cómo hacer que el stock se actualizara correctamente
   - Solución: Jesús investigó sobre stored procedures y lo implementó

4. **CORS en el Backend**
   - Problema: React no podía conectarse con PHP por errores de CORS
   - Solución: Emilio configuró los headers correctos en PHP

### Organizacionales:
1. **Tiempo Limitado**
   - Problema: Teníamos otras materias y tareas
   - Solución: Nos organizamos con Scrum para trabajar en bloques de tiempo

2. **Comunicación**
   - Problema: A veces Emilio cambiaba algo y los demás no sabíamos
   - Solución: Usamos WhatsApp para avisar cambios importantes

3. **Dependencias**
   - Problema: A veces alguien no podía avanzar porque esperaba que otro terminara
   - Solución: Planificamos mejor en los Sprint Planning quién hace qué primero

---

## HERRAMIENTAS QUE USAMOS

### Para Organizarnos:
- **Trello:** Tablero con tarjetas de "Por hacer", "En progreso", "Terminado"
- **WhatsApp:** Grupo para comunicación rápida diaria
- **Discord:** Reuniones de voz y compartir pantalla
- **Google Drive:** Documentos compartidos

### Para Desarrollar:
- **Git/GitHub:** Control de versiones del código
- **VS Code:** Editor de código (todos usamos el mismo)
- **XAMPP:** Para correr PHP y MySQL en nuestras computadoras
- **Thunder Client:** Para probar los endpoints del backend

---

## LECCIONES APRENDIDAS

### ¿Qué funcionó bien?
1. ✅ **Scrum nos ayudó mucho:** Dividir el trabajo en sprints de 2 semanas hizo que no nos sintiéramos abrumados
2. ✅ **Daily Standups:** Estar en contacto diario evitó que alguien se quedara atorado mucho tiempo
3. ✅ **Roles claros:** Cada quien sabía qué hacer y no duplicamos esfuerzos
4. ✅ **Emilio como líder técnico:** Su experiencia nos salvó muchas veces
5. ✅ **Diseño primero:** Que Magui diseñara las pantallas antes ayudó a Emilio a programar más rápido

### ¿Qué mejoraríamos?
1. ❌ **Empezar más temprano:** Dejamos mucho para diciembre
2. ❌ **Aprender Git mejor desde el inicio:** Perdimos tiempo con conflictos
3. ❌ **Documentar mientras programamos:** Elías tuvo que documentar todo al final
4. ❌ **Hacer más pruebas durante el desarrollo:** Encontramos varios bugs al final
5. ❌ **Mejores estimaciones:** A veces creíamos que algo tomaría 1 día y tomaba 3

### ¿Qué aprendimos?
- Cómo usar React, PHP y MySQL juntos
- Cómo trabajar en equipo usando Git
- Metodología Scrum (nunca la habíamos usado)
- Cómo diseñar y normalizar bases de datos
- Cómo hacer transacciones en bases de datos
- Cómo enviar emails desde una aplicación web
- Mucha paciencia y comunicación

---

## CRONOGRAMA VISUAL SIMPLIFICADO

```
OCTUBRE 2025
════════════════════════════════════════════════════════
Semana 1:  [Setup] Configuración de entorno
Semana 2:  [Sprint 1] Desarrollo de login
Semana 3:  [Sprint 1] Desarrollo de dashboards  
Semana 4:  [Sprint 2] Inicio módulo usuarios

NOVIEMBRE 2025
════════════════════════════════════════════════════════
Semana 1:  [Sprint 2] Recuperación de contraseña
Semana 2:  [Sprint 3] CRUD Maestros y Alumnos
Semana 3:  [Sprint 3] CRUD Aulas y Materias
Semana 4:  [Sprint 4] Inicio de Préstamos

DICIEMBRE 2025
════════════════════════════════════════════════════════
Semana 1:  [Sprint 4] Sistema de préstamos completo
Semana 2:  [Sprint 5] Sistema de calificaciones parte 1
Semana 3:  [Sprint 5] Sistema de calificaciones parte 2
Semana 4:  [Sprint 6] Dashboards finales y corrección bugs
Semana 5:  [Sprint 6] Entrega final (trabajamos poco por fiestas)
```

---

## CONCLUSIÓN

El proyecto tomó 3 meses completos desde la configuración inicial hasta la entrega final. Aunque fue bastante trabajo (1,140 horas entre todos), logramos completar un sistema funcional y profesional.

Lo más importante que aprendimos no fue solo la parte técnica (React, PHP, MySQL), sino también **cómo trabajar en equipo**. Scrum nos ayudó a organizarnos, los Daily Standups nos mantuvieron comunicados, y tener roles claros evitó confusiones.

Si tuviéramos que hacerlo de nuevo, empezaríamos más temprano y aprenderíamos Git mejor desde el inicio, pero en general estamos satisfechos con el resultado. El sistema funciona, cumple con todos los requisitos, y aprendimos mucho en el proceso.

**Tiempo total:** 13 semanas (7 Oct - 31 Dic)  
**Horas totales:** 1,140 horas en equipo  
**Módulos completados:** 12 módulos funcionales  
**Cumplimiento:** 100% de los objetivos

---

**Elaborado por:** Equipo de Desarrollo  
**Fecha:** 31 de Diciembre de 2025  
**Versión:** 1.0
