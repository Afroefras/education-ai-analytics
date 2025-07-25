# reLecture - Backend

Este es el backend del proyecto **reLecture**, una API REST desarrollada con **FastAPI** que proporciona análisis inteligente de transcripts educativos usando IA.

Desarrollado como parte del reto **ASU AI in Education Challenge 2025**.

## 🚀 ¿Cómo iniciar el proyecto?

### Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/education-ai-analytics.git
cd education-ai-analytics/backend
```

### Crear entorno virtual

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### Instalar dependencias

```bash
pip install -r requirements.txt
```

### Configurar variables de entorno

Crea un archivo `.env` en la carpeta backend:

```bash
GEMINI_API_KEY=tu-api-key-de-gemini
DATABASE_URL=sqlite:///./relecture.db
SECRET_KEY=tu-super-secret-key
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Ejecutar el servidor

```bash
uvicorn main:app --reload
```

El servidor estará disponible en: [http://localhost:8000](http://localhost:8000)

## 📋 Documentación de la API

Una vez que el servidor esté corriendo, puedes acceder a:

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## ⚙️ Estructura del proyecto

```bash
backend/
├── venv/                        # Entorno virtual (se crea automáticamente)
├── core/                        # Módulos principales de análisis
│   ├── text_analyzer.py         # Análisis básico de texto
│   ├── llm_processor.py         # Procesamiento con Gemini AI
│   ├── data_processor.py        # Limpieza y preparación de datos
│   └── schemas.py               # Modelos de datos (Pydantic)
├── api/                         # Endpoints de la API
│   └── routes.py                # Rutas principales
├── .env                         # Variables de entorno (no incluido en git)
├── main.py                      # Aplicación principal FastAPI
├── requirements.txt             # Dependencias del proyecto
└── README.md                    # Este archivo
```

## 🤖 Funcionalidades de IA

### Análisis de texto básico
- Conteo de palabras y velocidad de habla
- Detección de pausas y palabras de relleno
- Métricas de complejidad del vocabulario

### Análisis con Gemini AI
- Identificación de temas principales
- Análisis de sentimientos
- Evaluación de claridad en la enseñanza
- Generación de recomendaciones personalizadas
- Detección de interacciones profesor-estudiante

### Métricas educativas
- Ratio preguntas vs afirmaciones
- Uso de ejemplos y analogías
- Momentos de alta/baja participación
- Indicadores de engagement estudiantil

## 📊 Endpoints principales

```bash
POST /upload-transcript          # Subir y analizar transcript
GET  /analysis/{transcript_id}   # Obtener análisis específico
GET  /teacher-stats/{teacher_id} # Estadísticas del profesor
GET  /health                     # Estado del servidor
```

## 🧠 Tecnologías utilizadas

- **FastAPI** - Framework web moderno y rápido
- **Pydantic** - Validación de datos
- **Google Gemini AI** - Análisis inteligente de texto
- **NLTK/TextStat** - Procesamiento de lenguaje natural
- **Uvicorn** - Servidor ASGI de alto rendimiento
- **SQLite** - Base de datos ligera (desarrollo)

## 📦 Scripts disponibles

```bash
uvicorn main:app --reload        # Servidor de desarrollo
uvicorn main:app --host 0.0.0.0  # Servidor accesible externamente
python -m pytest                # Ejecutar tests (cuando se implementen)
```

## 🔗 Conexión con el frontend

El frontend React debe estar configurado para conectarse a `http://localhost:8000`.

Asegúrate de que las variables de CORS estén correctamente configuradas en el archivo `.env`.

## 🛠️ Desarrollo

### Agregar nuevas dependencias

```bash
pip install nueva-dependencia
pip freeze > requirements.txt
```

### Estructura de respuesta estándar

```python
{
    "success": true,
    "data": {...},
    "message": "Análisis completado exitosamente",
    "timestamp": "2025-01-XX"
}
```

## ✨ Contribución

Este proyecto es desarrollado por el equipo de **reLecture** para el reto de **ASU AI in Education Challenge 2025**.

## 🚀 Deployment

Para producción, considera usar:
- **Railway**, **Render** o **Heroku** para el hosting
- **PostgreSQL** en lugar de SQLite
- Variables de entorno seguras para las API keys

---
