import json
import collections
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

    def get_top_concepts(self, full_json: dict, top_n: int) -> list[dict]:
        """
        Analiza el JSON completo de la transcripción y devuelve los conceptos más frecuentes.

        Args:
            full_json (dict): El diccionario que contiene el análisis minuto a minuto de la clase.
            top_n (int, optional): El número de conceptos top a devolver. Por defecto es 10.

        Returns:
            list[dict]: Una lista de diccionarios, formateada para ser fácilmente
                        consumida por un frontend como JSON.
                        Ejemplo: [{"concept": "aprendizaje automático", "frequency": 5}, ...]
        """
        all_concepts = []
        
        # 1. Recorrer cada minuto en el JSON y recolectar todos los conceptos.
        for minute_data in full_json.values():
            if 'concepts' in minute_data and isinstance(minute_data['concepts'], list):
                all_concepts.extend(minute_data['concepts'])
                
        # 2. Contar la frecuencia de cada concepto.
        if not all_concepts:
            return []
            
        concept_counts = collections.Counter(all_concepts)
        
        # 3. Obtener los N conceptos más comunes.
        top_concepts_tuples = concept_counts.most_common(top_n)
        
        # 4. Formatear la salida a una lista de diccionarios (ideal para JSON).
        # Este es el único cambio importante. En lugar de devolver tuplas,
        # creamos objetos con claves claras ('concept', 'frequency').
        top_concepts = [
            {"concept": concept, "frequency": freq}
            for concept, freq in top_concepts_tuples
        ]
        
        return top_concepts

    def get_teaching_style(self, full_json: dict) -> dict:
        """
        Calcula la distribución general del estilo de enseñanza a lo largo de toda la clase.

        Realiza un promedio ponderado de los estilos de cada minuto, utilizando el tiempo
        de habla del profesor en ese minuto como el peso.

        Args:
            full_json (dict): El diccionario que contiene el análisis minuto a minuto.

        Returns:
            dict: Un diccionario con los porcentajes finales para cada estilo.
                Ejemplo: {'questioning': 0.25, 'explanation': 0.65, ...}
        """
        
        def time_to_seconds(time_str: str) -> int:
            """Helper function to convert MM:SS string to seconds."""
            try:
                minutes, seconds = map(int, time_str.split(':'))
                return (minutes * 60) + seconds
            except (ValueError, AttributeError):
                return 0

        # Inicializa acumuladores para los valores ponderados y el tiempo total
        weighted_styles = {
            "questioning": 0.0,
            "correcting": 0.0,
            "explanation": 0.0,
            "encouraging": 0.0
        }
        total_professor_talk_time = 0

        # 1. Recorrer cada minuto para acumular los valores ponderados
        for minute_data in full_json.values():
            style = minute_data.get('teaching_style', {})
            talk_time = minute_data.get('talk_time', {})
            
            # Obtiene el tiempo de habla del profesor en segundos (el peso)
            professor_seconds = time_to_seconds(talk_time.get('professor'))
            
            if professor_seconds > 0:
                total_professor_talk_time += professor_seconds
                for style_key in weighted_styles:
                    # Multiplica el porcentaje del estilo por el tiempo (peso)
                    weighted_styles[style_key] += style.get(style_key, 0.0) * professor_seconds

        # 2. Calcular el promedio final normalizando por el tiempo total
        teaching_style = {}
        if total_professor_talk_time > 0:
            for style_key, weighted_value in weighted_styles.items():
                teaching_style[style_key] = round(weighted_value / total_professor_talk_time, 4)
        else:
            # Si el profesor no habló, devuelve ceros.
            return {key: 0.0 for key in weighted_styles}
            
        return teaching_style

    def get_questions_and_examples(self, full_json: dict) -> list[dict]:
        """
        Crea una serie temporal con el número de preguntas (separadas por profesor y
        estudiante) y ejemplos por minuto.

        Args:
            full_json (dict): El diccionario que contiene el análisis minuto a minuto.

        Returns:
            list[dict]: Una lista de diccionarios, cada uno representando un minuto.
                        Ejemplo: [{"minute": 0, "professor_questions": 1, "student_questions": 2, "examples": 1}, ...]
        """
        questions_examples = []
        
        # Ordenar por la llave del minuto para asegurar el orden cronológico
        # Las llaves son strings ('0', '1', ...), se convierten a int para ordenar
        sorted_minutes = sorted(full_json.keys(), key=int)

        for minute_key in sorted_minutes:
            minute_data = full_json[minute_key]
            
            try:
                # Obtener las preguntas del profesor y de los estudiantes por separado
                prof_q_count = int(minute_data.get('professor_questions_count', 0))
                stud_q_count = int(minute_data.get('student_questions_count', 0))
                
                # Obtener el número de ejemplos
                examples_count = int(minute_data.get('examples_count', 0))
                
                questions_examples.append({
                    "minute": int(minute_key),
                    "professor_questions": prof_q_count,
                    "student_questions": stud_q_count,
                    "examples": examples_count
                })
                
            except (ValueError, TypeError):
                # En caso de que algún contador no sea un número válido, se omite el minuto
                # o se puede agregar con valores por defecto.
                questions_examples.append({
                    "minute": int(minute_key),
                    "professor_questions": 0,
                    "student_questions": 0,
                    "examples": 0
                })
                
        return questions_examples

    def run(
        self,
        prompt_path: str,
        transcript_path: str,
        model_name: str,
        top_n_concepts: int=10
    ) -> dict:

        prompt = self.get_prompt(prompt_path)
        transcript = self.get_transcript(transcript_path)
        final_prompt = self.make_final_prompt(prompt, transcript)

        response = self.get_model_response(final_prompt, model_name)
        metrics = self.get_json_metrics(response)

        top_concepts = self.get_top_concepts(metrics, top_n_concepts)
        teaching_style = self.get_teaching_style(metrics)
        questions_examples = self.get_questions_and_examples(metrics)
        
        metrics_dict = {
            'top_concepts': top_concepts,
            'teaching_style': teaching_style,
            'questions_examples': questions_examples,
        }
        return metrics_dict
