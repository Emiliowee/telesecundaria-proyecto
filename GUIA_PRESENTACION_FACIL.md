# 🎓 GUÍA PARA PRESENTAR EL PROYECTO AL MAESTRO
## Opciones Fáciles y Profesionales

**Fecha:** Octubre 2025

---

## ⚠️ PROBLEMA

Si le pides al maestro que instale Node.js, XAMPP, configure MySQL, ejecute terminales... **es muy complicado** y puede fallar durante la presentación.

## ✅ SOLUCIONES FÁCILES

---

## OPCIÓN 1: DESPLEGAR EN INTERNET (GRATIS) ⭐⭐⭐

### 🌐 La Más Profesional y Fácil

**¿Qué es?**
Subir tu proyecto a internet para que CUALQUIERA pueda usarlo desde un navegador, sin instalar nada.

**Ventajas:**
- ✅ El maestro solo abre un link: `https://tu-proyecto.vercel.app`
- ✅ Funciona desde cualquier computadora/celular
- ✅ No necesita instalar nada
- ✅ Se ve muy profesional
- ✅ **100% GRATIS**

**Desventajas:**
- ❌ Requiere configuración inicial (1-2 horas)
- ❌ Necesitas cuenta de GitHub

---

### 📝 Cómo hacerlo (Paso a Paso):

#### **1. Subir Frontend a Vercel (GRATIS)**

**a) Crear cuenta:**
1. Ve a: https://vercel.com
2. Clic en "Sign Up"
3. Usa tu cuenta de GitHub

**b) Conectar proyecto:**
1. Clic en "Add New" → "Project"
2. Selecciona tu repositorio de GitHub
3. Framework Preset: "Vite"
4. Root Directory: `frontend`
5. Clic en "Deploy"
6. Espera 2-3 minutos
7. ¡Listo! Te da un link como: `https://telesecundaria-abc123.vercel.app`

---

#### **2. Subir Backend a Railway (GRATIS)**

**a) Crear cuenta:**
1. Ve a: https://railway.app
2. Clic en "Start a New Project"
3. Usa tu cuenta de GitHub

**b) Desplegar backend:**
1. Clic en "Deploy from GitHub repo"
2. Selecciona tu repositorio
3. Root Directory: `/backend`
4. Variables de entorno:
   - `DB_HOST`: (la que te dé Railway para MySQL)
   - `DB_USER`: root
   - `DB_PASS`: (la que genere Railway)
   - `DB_NAME`: telesecundaria
5. Clic en "Deploy"

**c) Crear base de datos:**
1. En Railway, clic en "New" → "Database" → "MySQL"
2. Railway te dará las credenciales automáticamente
3. Conecta con MySQL Workbench
4. Importa tu `schema.sql`

---

#### **3. Conectar Frontend con Backend:**

En tu proyecto, actualiza:
`frontend/src/context/AuthContext.jsx`

Cambia:
```javascript
const API_URL = 'http://localhost:8000';
```

Por:
```javascript
const API_URL = 'https://tu-backend.railway.app';
```

Guarda, haz commit y push. Vercel se actualiza automáticamente.

---

### 🎉 Resultado Final:

**Link del proyecto:** `https://telesecundaria-abc123.vercel.app`

Le das ese link a tu maestro y él solo:
1. Abre el navegador
2. Pega el link
3. ¡Ya puede usar todo el sistema!

**Tiempo de configuración:** 1-2 horas (una sola vez)  
**Costo:** $0 MXN (100% gratis)

---

## OPCIÓN 2: VIDEO DEMO + CAPTURAS DE PANTALLA ⭐⭐

### 📹 La Más Rápida

**¿Qué es?**
Grabar un video mostrando TODAS las funcionalidades del sistema + PDF con capturas.

**Ventajas:**
- ✅ No requiere que el maestro ejecute nada
- ✅ Puedes editarlo para que se vea perfecto
- ✅ Rápido de hacer (30-60 minutos)
- ✅ Puedes ensayar antes

**Desventajas:**
- ❌ No es interactivo
- ❌ El maestro no puede "tocar" el sistema

---

### 📝 Cómo hacerlo:

#### **1. Grabar el video:**

**Herramientas gratuitas:**
- **OBS Studio** (https://obsproject.com) - Recomendado
- **Windows Game Bar** (Win + G)
- **Loom** (https://loom.com) - Online

**Qué grabar:**
1. **Intro (30 seg):**
   - "Hola, este es nuestro Sistema de Gestión para Telesecundarias"
   - Muestra el login

2. **Login (1 min):**
   - Inicia sesión como Director
   - Explica que hay 4 tipos de usuarios

3. **Dashboard (2 min):**
   - Muestra las estadísticas
   - Explica qué hace cada sección

4. **Módulo Usuarios (2 min):**
   - Crear usuario
   - Editar usuario
   - Muestra la recuperación de contraseña

5. **Módulo Alumnos (2 min):**
   - Registrar alumno
   - Buscar alumno
   - Editar información

6. **Módulo Maestros (1 min):**
   - Registrar maestro
   - Asignar materias

7. **Módulo Calificaciones (2 min):**
   - Capturar calificaciones
   - Ver reportes
   - Calcular promedios

8. **Módulo Préstamos (1 min):**
   - Registrar préstamo de material
   - Ver control de stock

9. **Cierre (30 seg):**
   - Resumen rápido
   - Tecnologías usadas (React, PHP, MySQL)

**Duración total recomendada:** 10-12 minutos

---

#### **2. Crear documento PDF con capturas:**

**Contenido:**
```
1. Portada
   - Nombre del proyecto
   - Integrantes del equipo
   - Fecha

2. Pantalla de Login
   - Captura con descripción

3. Dashboard Director
   - Captura con descripción de cada sección

4. Dashboard Secretario
   - Captura con descripción

5. Dashboard Maestro
   - Captura con descripción

6. Módulo Usuarios
   - Captura de lista
   - Captura de formulario crear
   - Captura de modal de recuperación

7. Módulo Alumnos
   - Captura de lista
   - Captura de formulario

8. Módulo Calificaciones
   - Captura de tabla de calificaciones
   - Captura de reportes

9. Módulo Préstamos
   - Captura del control de materiales

10. Conclusiones
    - Tecnologías usadas
    - Logros del proyecto
```

**Herramientas:**
- **Captura de pantalla:** Win + Shift + S (Windows)
- **Edición:** Canva (https://canva.com) - Gratis
- **Alternativa:** PowerPoint, Word, Google Slides

---

#### **3. Subirlo:**

**Video:**
- YouTube (privado o no listado)
- Google Drive
- OneDrive

**PDF:**
- Google Drive
- Enviar por email

Le das al maestro:
- 🎬 Link del video
- 📄 PDF con capturas

---

## OPCIÓN 3: LLEVAR TU LAPTOP CON TODO LISTO ⭐⭐⭐

### 💻 La Más Segura

**¿Qué es?**
Llevar tu propia laptop con el proyecto ya ejecutándose.

**Ventajas:**
- ✅ Control total
- ✅ No depende de internet
- ✅ Puedes demostrar en vivo
- ✅ Respondes preguntas en tiempo real

**Desventajas:**
- ❌ Necesitas llevar tu laptop
- ❌ Puede haber nervios en vivo

---

### 📝 Checklist antes de presentar:

**1 día antes:**
- [ ] Prueba que todo funcione
- [ ] Carga 100% la batería
- [ ] Lleva cable de corriente
- [ ] Lleva adaptador HDMI (para proyector)
- [ ] Borra historial del navegador (para que se vea limpio)

**30 minutos antes:**
- [ ] Inicia XAMPP (Apache + MySQL)
- [ ] Ejecuta backend: `C:\xampp\php\php.exe -S localhost:8000`
- [ ] Ejecuta frontend: `npm run dev`
- [ ] Abre el navegador en: http://localhost:5173
- [ ] Haz login de prueba
- [ ] Déjalo abierto en el Dashboard

**Durante la presentación:**
- Navega entre los módulos
- Explica mientras lo usas
- Ten los usuarios de prueba anotados en un papel

---

## OPCIÓN 4: SCRIPT DE INSTALACIÓN AUTOMÁTICA ⭐

### 🤖 Semi-Automática

**¿Qué es?**
Crear un archivo `.bat` que instale y ejecute todo automáticamente.

**Ventajas:**
- ✅ Relativamente fácil para el maestro
- ✅ Reduce errores

**Desventajas:**
- ❌ Aún requiere tener Node.js y XAMPP instalados
- ❌ Puede fallar en algunas laptops

---

### 📝 Crear el script:

Crea un archivo: `EJECUTAR_PROYECTO.bat`

```batch
@echo off
echo ========================================
echo   SISTEMA GESTION TELESECUNDARIA
echo ========================================
echo.
echo Iniciando proyecto...
echo.

REM Verificar Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js no esta instalado
    echo Descarga desde: https://nodejs.org
    pause
    exit /b
)

REM Verificar XAMPP
if not exist "C:\xampp\php\php.exe" (
    echo ERROR: XAMPP no esta instalado
    echo Descarga desde: https://www.apachefriends.org
    pause
    exit /b
)

echo [1/4] Verificando dependencias...
cd frontend
if not exist "node_modules" (
    echo Instalando dependencias (esto toma 2-3 minutos)...
    call npm install
)

echo.
echo [2/4] Iniciando MySQL...
start "" "C:\xampp\xampp-control.exe"
timeout /t 5 /nobreak >nul

echo.
echo [3/4] Iniciando Backend...
start "Backend PHP" cmd /k "cd backend && C:\xampp\php\php.exe -S localhost:8000"
timeout /t 3 /nobreak >nul

echo.
echo [4/4] Iniciando Frontend...
start "Frontend React" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo   PROYECTO EJECUTANDOSE
echo ========================================
echo.
echo Abre tu navegador en: http://localhost:5173
echo.
echo Presiona cualquier tecla para cerrar...
pause >nul
```

**Cómo usarlo:**
1. El maestro solo hace doble clic en `EJECUTAR_PROYECTO.bat`
2. Espera 30 segundos
3. Abre el navegador en http://localhost:5173

**Requisitos previos:**
- Node.js instalado
- XAMPP instalado
- Base de datos ya importada

---

## OPCIÓN 5: PREPARAR USB CON XAMPP PORTABLE ⭐⭐

### 💾 Versión Portátil (Sin Instalación)

**¿Qué es?**
Poner Node.js portable + XAMPP portable en una USB para que corra desde ahí.

**Ventajas:**
- ✅ No requiere instalación en la laptop del maestro
- ✅ Todo autocontenido

**Desventajas:**
- ❌ USB debe ser de 8GB+ y rápida
- ❌ Más lento que instalación normal
- ❌ Complejo de configurar

**Tiempo de preparación:** 3-4 horas

---

## 🎯 RECOMENDACIÓN FINAL

### Para tu caso, te recomiendo COMBINAR:

**PLAN A: Para la presentación formal**
1. **OPCIÓN 3** - Lleva tu laptop con todo funcionando
2. **OPCIÓN 2** - Ten un video de respaldo por si algo falla

**PLAN B: Para que el maestro revise después**
1. **OPCIÓN 1** - Despliega online y dale el link
2. **OPCIÓN 2** - Envíale el PDF con capturas + video

---

## 📊 COMPARACIÓN DE OPCIONES

| Opción | Facilidad Maestro | Tiempo Setup | Costo | Recomendado |
|--------|-------------------|--------------|-------|-------------|
| **1. Desplegar Online** | ⭐⭐⭐⭐⭐ | 2 horas | Gratis | ✅ SÍ |
| **2. Video + PDF** | ⭐⭐⭐⭐⭐ | 1 hora | Gratis | ✅ SÍ |
| **3. Tu Laptop** | ⭐⭐⭐⭐ | 0 horas | Gratis | ✅ SÍ |
| **4. Script .bat** | ⭐⭐⭐ | 30 min | Gratis | ⚠️ Tal vez |
| **5. USB Portable** | ⭐⭐ | 4 horas | USB | ❌ Complicado |

---

## 🚀 PLAN DE ACCIÓN INMEDIATO

### Si tienes 1 hora:
1. Graba un video demo (30 min)
2. Crea PDF con capturas (30 min)
3. Sube a Google Drive
4. Envía links al maestro

### Si tienes 2 horas:
1. Despliega en Vercel (gratis)
2. Dale el link al maestro
3. Haz video de respaldo

### Si tienes 30 minutos:
1. Asegúrate que tu laptop funcione perfectamente
2. Haz captura de las pantallas principales
3. Lleva tu laptop a la presentación

---

## 📧 MENSAJE SUGERIDO PARA EL MAESTRO

```
Estimado Profesor:

Le comparto nuestro proyecto de Sistema de Gestión Escolar:

🌐 VERSIÓN ONLINE (Recomendado):
   https://telesecundaria-proyecto.vercel.app
   
   Solo abra el link y puede usar el sistema completo.
   Usuario de prueba: 1 / Contraseña: 123456

📹 VIDEO DEMOSTRACIÓN:
   https://drive.google.com/[tu-video]

📄 DOCUMENTO CON CAPTURAS:
   https://drive.google.com/[tu-pdf]

💻 PRESENTACIÓN EN VIVO:
   Llevaremos nuestra laptop con el sistema funcionando
   para demostración en tiempo real.

Quedamos atentos a sus comentarios.

Saludos,
Equipo de Desarrollo
```

---

**Elaborado por:** Equipo de Desarrollo  
**Fecha:** Octubre 2025  
**Versión:** 1.0

