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


@router.post("/upload-transcript")
async def upload_transcript(file: UploadFile = File(...)):
    try:
        # 1️⃣ Guardar archivo temporalmente
        file_id = str(uuid.uuid4())
        file_path = os.path.join(UPLOAD_DIR, f"{file_id}_{file.filename}")

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # 2️⃣ Limpiar la transcripción
        cleaner = Cleaner()
        cleaned_text = cleaner.clean(file_path)  # Devuelve texto limpio

        # 3️⃣ Analizar usando LLM
        analyzer = Analyzer()
        result = analyzer.run(
            prompt_path="core/prompts/base_prompt.txt",  # Ajustar si está en otro path
            transcript_text=cleaned_text,           # OJO: ahora pasamos texto, no archivo
            model_name="gemini-pro"                 # O el que uses
        )

        # 4️⃣ Responder al frontend
        return JSONResponse(
            content={
                "success": True,
                "data": result,
                "message": "Análisis completado"
            }
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))