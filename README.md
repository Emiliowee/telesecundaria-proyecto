# Sistema de Gestión Escolar - Telesecundaria

Sistema completo de gestión escolar desarrollado con tecnologías modernas.

## 🚀 Stack Tecnológico

- **Frontend**: React 18 + TypeScript + Tailwind CSS + Vite
- **Backend**: PHP 8+ con arquitectura REST API
- **Base de Datos**: MySQL 8.0+
- **Estilos**: Tailwind CSS + diseño responsivo

## 📁 Estructura del Proyecto

```
proyecto-nuevo/
├── frontend/          # Aplicación React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── contexts/
│   │   └── utils/
│   └── public/
├── backend/           # API PHP
│   ├── config/
│   ├── api/
│   ├── models/
│   └── utils/
└── database/          # Scripts SQL
```

## 🛠️ Instalación

### Backend (PHP)
1. Instalar PHP 8+ y MySQL
2. Configurar base de datos: `mysql -u root -p < database/schema.sql`
3. Configurar credenciales en `backend/config/database.php`
4. Iniciar servidor: `php -S localhost:8000 -t backend`

### Frontend (React)
1. Instalar Node.js 18+
2. Instalar dependencias: `cd frontend && npm install`
3. Configurar variables de entorno en `.env`
4. Iniciar desarrollo: `npm run dev`

## 👥 Tipos de Usuario

- **Director**: Gestión de usuarios
- **Secretario**: Alumnos, Maestros, Aulas, Materias, Usuarios
- **Maestro**: Calificaciones
- **Administrativo**: Materiales y Préstamos

## 📋 Módulos

1. Login y Autenticación
2. Dashboard Principal
3. Gestión de Usuarios
4. Gestión de Alumnos
5. Gestión de Maestros
6. Gestión de Aulas
7. Gestión de Materias
8. Calificaciones
9. Materiales Didácticos
10. Préstamos de Materiales

## 🎨 Diseño

- UX Writing profesional
- Diseño responsivo (mobile-first)
- Paleta de colores institucional (azules)
- Animaciones sutiles
- Componentes reutilizables

## 📝 Licencia

Proyecto educativo - Telesecundaria


