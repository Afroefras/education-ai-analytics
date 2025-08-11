from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import shutil
import uuid
import os
from core.utils.llm_cleaner import Cleaner
from core.utils.llm_analyzer import Analyzer

router = APIRouter()

UPLOAD_DIR = "./uploaded_transcripts"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Verificar que la API key esté configurada
def check_google_api_key():
    """Verifica que la API key de Google esté configurada"""
    api_key = os.getenv('GOOGLE_API_KEY') or os.getenv('GEMINI_API_KEY')
    if not api_key:
        raise HTTPException(
            status_code=500, 
            detail="API key de Google no configurada. Establece GOOGLE_API_KEY o GEMINI_API_KEY como variable de entorno."
        )
    return api_key


@router.post("/upload-transcript")
async def upload_transcript(file: UploadFile = File(...)):
    try:
        # 0️⃣ Verificar API key antes de procesar
        check_google_api_key()
        
        # 1️⃣ Guardar archivo original temporalmente
        file_id = str(uuid.uuid4())
        original_file_path = os.path.join(UPLOAD_DIR, f"{file_id}_{file.filename}")

        with open(original_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # 2️⃣ Limpiar la transcripción
        cleaner = Cleaner()
        cleaned_text = cleaner.run(
            prompt_path="core/prompts/clean_transcript.txt",
            transcript_path=original_file_path,
            model_name="gemini-1.5-flash"
        )

        # 3️⃣ Guardar el texto limpio en un archivo temporal
        cleaned_file_path = os.path.join(UPLOAD_DIR, f"{file_id}_cleaned.txt")
        with open(cleaned_file_path, "w", encoding="utf-8") as f:
            f.write(cleaned_text)

        # 4️⃣ Analizar usando LLM
        analyzer = Analyzer()
        result = analyzer.run(
            prompt_path="core/prompts/get_metrics.txt",
            transcript_path=cleaned_file_path,
            model_name="gemini-1.5-flash"
        )

        # 5️⃣ Limpiar archivos temporales
        try:
            os.remove(original_file_path)
            os.remove(cleaned_file_path)
        except OSError:
            pass  # Si no se puede eliminar, continúa

        # 6️⃣ Responder al frontend
        return JSONResponse(
            content={
                "success": True,
                "data": result,
                "message": "Análisis completado"
            }
        )

    except Exception as e:
        # Limpiar archivos en caso de error
        try:
            if 'original_file_path' in locals():
                os.remove(original_file_path)
            if 'cleaned_file_path' in locals():
                os.remove(cleaned_file_path)
        except OSError:
            pass
        
        # Manejo específico de errores comunes
        error_msg = str(e)
        if "429" in error_msg or "RESOURCE_EXHAUSTED" in error_msg:
            raise HTTPException(
                status_code=429, 
                detail="Has excedido tu cuota gratuita de Gemini. Espera unos minutos antes de volver a intentar."
            )
        elif "unsupported operand type" in error_msg:
            raise HTTPException(
                status_code=500, 
                detail="Error en el formato de datos del análisis. Revisa que el modelo esté devolviendo números correctamente."
            )
        else:
            raise HTTPException(status_code=500, detail=f"Error: {error_msg}")