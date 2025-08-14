# reLecture - Frontend

Este es el frontend del proyecto **reLecture**, una plataforma web para análisis educativo inteligente, creada como parte del reto **ASU AI in Education Challenge 2025**.

Desarrollado con **React + Vite**, este frontend proporciona una interfaz rápida, moderna y responsiva para interactuar con el backend en FastAPI.

## 🎯 Funcionalidades principales

- 📤 **Subida de transcripts** - Carga archivos de clases fácilmente
- 📊 **Dashboard analítico** - Visualiza estadísticas de enseñanza en tiempo real  
- 🤖 **Análisis con IA** - Obtén insights automáticos sobre tu metodología
- 📈 **Métricas educativas** - Velocidad de habla, claridad, engagement estudiantil
- 💡 **Recomendaciones** - Sugerencias personalizadas para mejorar tu enseñanza
- 📋 **Historial de clases** - Revisa análisis anteriores y progreso

## 🚀 ¿Cómo iniciar el proyecto?

### Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/education-ai-analytics.git
cd education-ai-analytics/frontend
```

### Instalar dependencias

```bash
npm install
```

### Configurar variables de entorno

Crea un archivo `.env` en la carpeta frontend:

```bash
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=reLecture
VITE_APP_VERSION=1.0.0
```

### Ejecutar el servidor de desarrollo

```bash
npm run dev
```

Esto levantará la app en: [http://localhost:5173](http://localhost:5173)

## ⚙️ Estructura del proyecto

```bash
frontend/
├── node_modules/            # Dependencias del proyecto (se crea con npm install)
├── public/                  # Archivos estáticos públicos
│   └── favicon.svg
├── src/                     # Código fuente principal
│   ├── assets/              # Imágenes, íconos, logos, etc.
│   ├── components/          # Componentes reutilizables
│   │   ├── Dashboard/       # Componentes del dashboard
│   │   ├── Upload/          # Componentes de subida de archivos
│   │   └── Charts/          # Componentes de gráficas
│   ├── pages/               # Páginas principales (Home, Dashboard, etc.)
│   ├── services/            # Lógica de conexión con APIs
│   │   └── api.js           # Configuración de axios
│   ├── App.jsx              # Componente raíz de la app
│   └── main.jsx             # Punto de entrada de la aplicación
│   └── routes.jsx           # Rutas dentro de la aplicación
├── .env                     # Variables de entorno (no incluido en git)
├── .gitignore               # Archivos ignorados por git
├── eslint.config.js         # Configuración moderna de ESLint (flat config)
├── index.html               # HTML base usado por Vite
├── package.json             # Metadata del proyecto y scripts
├── tailwind.config.js       # Configuración de Tailwind CSS
├── vite.config.js           # Configuración de Vite
└── README.md                # Este archivo
```

## 🧠 Tecnologías utilizadas

- **React 18** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de construcción rápida
- **Tailwind CSS** - Framework de CSS utilitario
- **Recharts** - Biblioteca de gráficas para React
- **Axios** - Cliente HTTP para llamadas al backend
- **ESLint** - Linter con configuración moderna (flat config)
- **Prettier** - Formateador de código automático

## 📦 Scripts disponibles

```bash
npm run dev       # Ejecuta la app en modo desarrollo
npm run build     # Compila la app para producción
npm run preview   # Previsualiza la versión de producción
npm run lint      # Ejecuta ESLint para revisar código
npm run format    # Formatea código con Prettier (si está configurado)
```

## 🔗 Conexión con el backend

Asegúrate de que el backend (FastAPI) esté corriendo en [http://localhost:8000](http://localhost:8000).  

La configuración de la API se encuentra en:
```bash
src/services/api.js
```

El archivo utiliza las variables de entorno para configurar la URL base automáticamente.

## 📊 Componentes principales

### Dashboard de análisis
- Gráficas interactivas con Recharts
- Métricas en tiempo real
- Comparativas históricas

### Subida de transcripts
- Drag & drop para archivos
- Validación de formatos
- Feedback visual del progreso

### Visualización de insights
- Recomendaciones de IA
- Estadísticas educativas
- Análisis de tendencias

## 🎨 Guía de estilos

El proyecto utiliza **Tailwind CSS** con la nueva sintaxis:
```css
@import "tailwindcss";
```

Los colores y temas están configurados para ser consistentes con la identidad educativa del proyecto.

## 🔧 Calidad de código

El proyecto utiliza:
- **ESLint** con configuración moderna (flat config) en `eslint.config.js`
- **Prettier** para formateo automático de código
- Reglas específicas para React y Vite
- Integración con VS Code recomendada

Para mantener código limpio:
```bash
npm run lint        # Revisar errores de linting
npm run format      # Formatear código (si está configurado)
```

## ✨ Contribución

Este proyecto es desarrollado por el equipo de **reLecture** para el reto de **ASU AI in Education Challenge 2025**.

### Estructura de desarrollo:
- **Componentes reutilizables** en `/components`
- **Páginas principales** en `/pages`
- **Servicios de API** centralizados en `/services`
- **Assets estáticos** en `/assets`

## 🚀 Deployment

Para producción:
1. Construir la aplicación: `npm run build`
2. Los archivos se generan en `/dist`
3. Configurar variables de entorno de producción
4. Desplegar en Vercel, Netlify o similar

---
