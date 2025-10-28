# 🚀 GUÍA PASO A PASO: SUBIR PROYECTO A GITHUB
## Sistema de Gestión Escolar - Telesecundaria

**Fecha:** Octubre 2025  
**Tiempo estimado:** 15-20 minutos

---

## ¿QUÉ ES GITHUB Y POR QUÉ LO NECESITAS?

**GitHub** es como un "Google Drive para código". Te permite:
- ✅ Guardar tu proyecto en la nube
- ✅ Trabajar en equipo
- ✅ Tener historial de cambios
- ✅ **Desplegar a Vercel/Railway** (lo más importante)

---

## PARTE 1: CREAR CUENTA EN GITHUB

### Paso 1: Ir a GitHub

1. Abre tu navegador
2. Ve a: **https://github.com**
3. Verás la página principal de GitHub

### Paso 2: Crear tu cuenta (si no tienes)

1. Clic en **"Sign up"** (arriba a la derecha)
2. Ingresa tu email (puede ser cualquiera, ejemplo: `emilio.telesec@gmail.com`)
3. Crea una contraseña fuerte (ejemplo: `Proyecto2025!`)
4. Elige un username (ejemplo: `emilio-telesec` o `equipo-telesecundaria`)
5. Resuelve el captcha
6. Clic en **"Create account"**
7. Verifica tu email (te llegará un código)

**¿Ya tienes cuenta?** → Salta al Paso 3

---

### Paso 3: Iniciar sesión

1. Clic en **"Sign in"**
2. Ingresa tu email y contraseña
3. Clic en **"Sign in"**
4. Ya estás dentro de GitHub

---

## PARTE 2: INSTALAR GIT EN TU COMPUTADORA

### Paso 1: Verificar si ya tienes Git

Abre **PowerShell** o **CMD** y escribe:

```bash
git --version
```

**¿Te dice algo como "git version 2.x.x"?**
→ ✅ Ya tienes Git, salta a PARTE 3

**¿Te dice "no se reconoce el comando"?**
→ ❌ Necesitas instalarlo, continúa abajo

---

### Paso 2: Descargar Git

1. Ve a: **https://git-scm.com/download/win**
2. Se descargará automáticamente un archivo `.exe`
3. Espera que termine la descarga (2-5 minutos)

---

### Paso 3: Instalar Git

1. **Doble clic** en el archivo descargado (`Git-2.xx.x-64-bit.exe`)
2. Clic en **"Next"** (siguiente) en todas las pantallas
3. **IMPORTANTE:** En la pantalla de "Adjusting your PATH environment":
   - Selecciona: **"Git from the command line and also from 3rd-party software"**
   - Clic en **"Next"**
4. Continúa dando **"Next"** hasta que empiece la instalación
5. Espera que termine (2-3 minutos)
6. Clic en **"Finish"**

---

### Paso 4: Verificar instalación

1. **Cierra y abre de nuevo** PowerShell/CMD (importante)
2. Escribe:

```bash
git --version
```

Debe mostrar: `git version 2.xx.x`

✅ **¡Git está instalado!**

---

## PARTE 3: CONFIGURAR GIT (SOLO LA PRIMERA VEZ)

### Paso 1: Configurar tu nombre

Abre PowerShell/CMD y escribe (reemplaza con TU nombre):

```bash
git config --global user.name "Equipo Telesecundaria"
```

Presiona **Enter**

---

### Paso 2: Configurar tu email

Escribe (usa el MISMO email de GitHub):

```bash
git config --global user.email "tu-email@ejemplo.com"
```

Presiona **Enter**

---

### Paso 3: Verificar configuración

Escribe:

```bash
git config --global --list
```

Debe mostrar algo como:
```
user.name=Equipo Telesecundaria
user.email=tu-email@ejemplo.com
```

✅ **¡Git está configurado!**

---

## PARTE 4: PREPARAR TU PROYECTO

### Paso 1: Abrir terminal en tu proyecto

**Opción A: Desde VS Code**
1. Abre VS Code
2. Abre la carpeta: `C:\Users\Emilio\Documents\TelesecundariaProy\proyecto-nuevo`
3. Menú: **Terminal** → **New Terminal**

**Opción B: Desde explorador de archivos**
1. Abre la carpeta: `C:\Users\Emilio\Documents\TelesecundariaProy\proyecto-nuevo`
2. En la barra de direcciones, escribe: `powershell`
3. Presiona **Enter**

Ahora tienes una terminal en tu proyecto.

---

### Paso 2: Verificar que estás en la carpeta correcta

En la terminal, escribe:

```bash
pwd
```

Debe mostrar algo como:
```
Path
----
C:\Users\Emilio\Documents\TelesecundariaProy\proyecto-nuevo
```

Si no es así, navega a tu proyecto:

```bash
cd C:\Users\Emilio\Documents\TelesecundariaProy\proyecto-nuevo
```

---

### Paso 3: Inicializar Git

Escribe:

```bash
git init
```

Debe decir: `Initialized empty Git repository`

✅ **¡Tu proyecto ahora tiene Git!**

---

### Paso 4: Verificar archivos a subir

Escribe:

```bash
git status
```

Te mostrará una lista de archivos en ROJO. Estos son los que vas a subir.

**⚠️ IMPORTANTE:** Asegúrate de tener un archivo `.gitignore`

---

### Paso 5: Crear/Verificar .gitignore

El archivo `.gitignore` le dice a Git qué NO subir (como `node_modules` que pesa 700 MB).

**¿Ya existe?**
Verifica que exista: `proyecto-nuevo\.gitignore`

**¿No existe?** Créalo:

En la terminal:

```bash
echo "node_modules/
frontend/node_modules/
frontend/dist/
frontend/.env
backend/config/email.php
.DS_Store
*.log" > .gitignore
```

---

### Paso 6: Agregar todos los archivos

Escribe:

```bash
git add .
```

El punto (`.`) significa "agregar TODO".

No debe mostrar nada, es normal.

---

### Paso 7: Verificar qué se agregó

Escribe:

```bash
git status
```

Ahora los archivos deberían aparecer en VERDE.

---

### Paso 8: Hacer el primer commit

Un "commit" es como guardar una versión. Escribe:

```bash
git commit -m "Proyecto completo de Telesecundaria"
```

Debe decir algo como:
```
[master (root-commit) abc1234] Proyecto completo de Telesecundaria
 125 files changed, 15234 insertions(+)
```

✅ **¡Tu proyecto está guardado localmente!**

---

## PARTE 5: CREAR REPOSITORIO EN GITHUB

### Paso 1: Ir a GitHub

1. Abre tu navegador
2. Ve a: **https://github.com**
3. Asegúrate de estar **logueado** (debes ver tu foto de perfil arriba a la derecha)

---

### Paso 2: Crear nuevo repositorio

1. Clic en el **"+"** (arriba a la derecha)
2. Clic en **"New repository"**

---

### Paso 3: Configurar el repositorio

Llena el formulario:

**Repository name:** `telesecundaria-proyecto`
(Sin espacios, solo letras minúsculas, números y guiones)

**Description:** (Opcional)
```
Sistema de Gestión Escolar para Telesecundarias desarrollado con React, PHP y MySQL
```

**Public o Private:**
- **Public:** Cualquiera puede verlo (recomendado para proyectos escolares)
- **Private:** Solo tú y tu equipo pueden verlo

**⚠️ IMPORTANTE:**
- ❌ **NO** marques "Add a README file"
- ❌ **NO** agregues .gitignore
- ❌ **NO** agregues licencia

(Ya tienes todo eso en tu proyecto local)

---

### Paso 4: Crear repositorio

Clic en el botón verde **"Create repository"**

---

### Paso 5: Copiar comandos

GitHub te mostrará una página con comandos. Busca la sección:
**"…or push an existing repository from the command line"**

Verás algo como:

```bash
git remote add origin https://github.com/tu-usuario/telesecundaria-proyecto.git
git branch -M main
git push -u origin main
```

---

## PARTE 6: SUBIR TU PROYECTO A GITHUB

### Paso 1: Conectar tu proyecto local con GitHub

Copia el PRIMER comando de GitHub (el que empieza con `git remote add origin`):

```bash
git remote add origin https://github.com/TU-USUARIO/telesecundaria-proyecto.git
```

**⚠️ IMPORTANTE:** Reemplaza `TU-USUARIO` con tu username real de GitHub.

Pégalo en tu terminal y presiona **Enter**.

No debe mostrar nada (es normal).

---

### Paso 2: Renombrar rama a "main"

Copia el SEGUNDO comando:

```bash
git branch -M main
```

Pégalo en tu terminal y presiona **Enter**.

---

### Paso 3: Subir tu proyecto (PUSH)

Copia el TERCER comando:

```bash
git push -u origin main
```

Pégalo en tu terminal y presiona **Enter**.

---

### Paso 4: Autenticación

**Primera vez que haces push:**

GitHub te pedirá que te autentiques.

**En Windows:**
1. Se abrirá una ventana del navegador
2. Clic en **"Authorize Git Credential Manager"**
3. Ingresa tu contraseña de GitHub
4. Clic en **"Confirm"**

**Alternativa (si no se abre ventana):**
GitHub te pedirá un "token". Sigue estos pasos:

1. Ve a GitHub en el navegador
2. Clic en tu foto (arriba derecha) → **Settings**
3. Scroll hasta abajo → **Developer settings**
4. **Personal access tokens** → **Tokens (classic)**
5. **Generate new token** → **Generate new token (classic)**
6. Note: `Token para subir proyecto`
7. Expiration: `90 days`
8. Selecciona: **repo** (marca toda la sección)
9. Scroll abajo → **Generate token**
10. **Copia el token** (empieza con `ghp_...`)
11. Pégalo en la terminal cuando te lo pida

---

### Paso 5: Esperar que suba

Verás algo como:

```
Enumerating objects: 150, done.
Counting objects: 100% (150/150), done.
Delta compression using up to 8 threads
Compressing objects: 100% (125/125), done.
Writing objects: 100% (150/150), 2.5 MiB | 1.5 MiB/s, done.
Total 150 (delta 45), reused 0 (delta 0)
To https://github.com/tu-usuario/telesecundaria-proyecto.git
 * [new branch]      main -> main
```

**Tiempo:** 1-5 minutos dependiendo de tu internet.

✅ **¡TU PROYECTO YA ESTÁ EN GITHUB!**

---

## PARTE 7: VERIFICAR QUE SUBIÓ CORRECTAMENTE

### Paso 1: Ir a tu repositorio

1. Abre navegador
2. Ve a: `https://github.com/TU-USUARIO/telesecundaria-proyecto`

---

### Paso 2: Verificar archivos

Deberías ver:
- ✅ Carpeta `frontend/`
- ✅ Carpeta `backend/`
- ✅ Carpeta `database/`
- ✅ Archivos `.md` (README, etc.)
- ✅ Tu archivo `.gitignore`

**¿Lo ves todo?** → ✅ **¡Perfecto! Ya está en GitHub!**

**¿Falta algo?** → Verifica que no esté en `.gitignore`

---

## PARTE 8: COMPARTIR CON TU EQUIPO

### Para que tu equipo pueda colaborar:

1. Ve a tu repositorio en GitHub
2. Clic en **"Settings"** (arriba)
3. En el menú izquierdo: **"Collaborators"**
4. Clic en **"Add people"**
5. Ingresa el username o email de tus compañeros
6. Clic en **"Add [username] to this repository"**
7. Ellos recibirán un email de invitación

---

## 🎉 ¡LISTO! TU PROYECTO YA ESTÁ EN GITHUB

### ¿Qué sigue?

Ahora que tu proyecto está en GitHub, puedes:

1. **Desplegarlo en Vercel** (Frontend)
   - Ve a https://vercel.com
   - "Import Project"
   - Selecciona tu repositorio
   - Framework: Vite
   - Root: `frontend`
   - Deploy

2. **Desplegarlo en Railway** (Backend)
   - Ve a https://railway.app
   - "New Project"
   - "Deploy from GitHub"
   - Selecciona tu repositorio

3. **Clonar en otra computadora**
   ```bash
   git clone https://github.com/TU-USUARIO/telesecundaria-proyecto.git
   ```

---

## 📝 COMANDOS IMPORTANTES PARA EL FUTURO

### Cuando hagas cambios en tu código:

```bash
# 1. Ver qué cambió
git status

# 2. Agregar cambios
git add .

# 3. Guardar versión (commit)
git commit -m "Descripción de los cambios"

# 4. Subir a GitHub
git push
```

---

### Si tu equipo hizo cambios y quieres bajarlos:

```bash
# Traer cambios de GitHub a tu computadora
git pull
```

---

## ⚠️ ERRORES COMUNES

### Error: "fatal: not a git repository"
**Solución:** Estás en la carpeta incorrecta. Navega a tu proyecto:
```bash
cd C:\Users\Emilio\Documents\TelesecundariaProy\proyecto-nuevo
```

---

### Error: "failed to push some refs"
**Solución:** Alguien subió cambios antes que tú. Primero baja los cambios:
```bash
git pull --rebase
git push
```

---

### Error: "large files detected"
**Problema:** Estás tratando de subir archivos muy grandes (como `node_modules`)

**Solución:** Agrégalos a `.gitignore`:
```bash
echo "node_modules/" >> .gitignore
git rm -r --cached node_modules
git commit -m "Remove node_modules"
git push
```

---

### Error: "authentication failed"
**Solución:** Necesitas un Personal Access Token (ver Parte 6, Paso 4)

---

## 📞 RESUMEN ULTRA-RÁPIDO

```bash
# 1. Configurar Git (solo primera vez)
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# 2. En tu proyecto
cd C:\Users\Emilio\Documents\TelesecundariaProy\proyecto-nuevo
git init
git add .
git commit -m "Primer commit"

# 3. En GitHub: Crear repositorio "telesecundaria-proyecto"

# 4. Conectar y subir
git remote add origin https://github.com/TU-USUARIO/telesecundaria-proyecto.git
git branch -M main
git push -u origin main
```

**Tiempo total:** 15-20 minutos

---

## ✅ CHECKLIST FINAL

- [ ] Cuenta de GitHub creada
- [ ] Git instalado en tu computadora
- [ ] Git configurado con tu nombre y email
- [ ] Repositorio creado en GitHub
- [ ] Proyecto subido (hiciste `git push`)
- [ ] Puedes ver tus archivos en GitHub
- [ ] Compartiste el repositorio con tu equipo

---

**¡FELICIDADES! Tu proyecto ya está en GitHub y listo para ser desplegado a internet.**

**Siguiente paso:** Ir a la `GUIA_PRESENTACION_FACIL.md` y seguir con "Desplegar en Vercel"

---

**Elaborado por:** Equipo de Desarrollo  
**Fecha:** Octubre 2025  
**Versión:** 1.0

