import json
from typing import Union
from pathlib import Path
from google import genai
from docx import Document


def read_txt(path: str) -> str:
    with open(path, 'r', encoding='utf-8') as file:
        return file.read()


def read_docx(path: str) -> str:
    try:
        document = Document(path)
        full_text = []
        for paragraph in document.paragraphs:
            full_text.append(paragraph.text)
        return '\n'.join(full_text)
    except Exception as e:
        return f"Error reading docx file: {e}"


def save_txt(
    text_to_save: str,
    path: Union[str, Path],
    filename: str,
    name_suffix: str
) -> None:

    if isinstance(path, str):
        path = Path(path)
    
    path = path.joinpath(f"{filename}{name_suffix}.txt")
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(text_to_save)


def save_json(
    dict_to_save: str,
    path: Union[str, Path],
    filename: str,
    name_suffix: str
) -> None:

    if isinstance(path, str):
        path = Path(path)
        
    path = path.joinpath(f"{filename}{name_suffix}.json")

    with open(path, 'w', encoding='utf-8') as f:
        json.dump(dict_to_save, f, indent=4)


class LLMClass:
    def __init__(self) -> None:
        self.client = genai.Client()

    def __str__(self) -> str:
        return "Large Language Model (LLM) class"

    def get_prompt(self, prompt_path: str) -> str:
        return read_txt(prompt_path)

    def get_transcript(self, transcript_path: str, is_docx: bool=False) -> str:
        if is_docx:
            return read_docx(transcript_path)
        else:
            return read_txt(transcript_path)

    def make_final_prompt(self, prompt: str, transcript: str) -> str:
        return prompt + transcript

    def get_model_response(self, prompt: str, model_name: str):
        return self.client.models.generate_content(
            model=model_name,
            contents=prompt
        )

    def get_response_text(self, response) -> str:
        return response.text
