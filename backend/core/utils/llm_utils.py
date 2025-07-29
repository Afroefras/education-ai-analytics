import json
from google import genai


class Analyzer:
    def __init__(self) -> None:
        self.client = genai.Client()

    def __str__(self) -> str:
        return "Large Language Model (LLM) to get metrics from a class transcript"

    def read_txt(self, path: str) -> str:
        with open(path, 'r', encoding='utf-8') as file:
            return file.read()

    def get_prompt(self, prompt_path: str) -> str:
        return self.read_txt(prompt_path)

    def get_transcript(self, transcript_path: str) -> str:
        return self.read_txt(transcript_path)

    def make_final_prompt(self, prompt: str, transcript: str) -> str:
        return prompt + "\n\n" + transcript

    def get_model_response(self, prompt: str, model_name: str):
        return self.client.models.generate_content(
            model=model_name,
            contents=prompt
        )

    def get_json_metrics(self, response) -> dict:
        try:
            return json.loads(response.text)
        except json.JSONDecodeError:
            return response.text

    def run(self, prompt_path: str, transcript_path: str, model_name: str) -> dict:
        prompt = self.get_prompt(prompt_path)
        transcript = self.get_transcript(transcript_path)
        final_prompt = self.make_final_prompt(prompt, transcript)
        response = self.get_model_response(final_prompt, model_name)
        metrics = self.get_json_metrics(response)
        return metrics
