from core.utils.llm_base import LLMClass

class Cleaner(LLMClass):
    def __init__(self) -> None:
        super().__init__()

    def __str__(self) -> str:
        return super().__str__() + ':\nCleaner ready!'

    def run(
        self,
        prompt_path: str,
        transcript_path: str,
        model_name: str,
        save_path: str=None,
    ) -> str:

        prompt = self.get_prompt(prompt_path)
        transcript = self.get_transcript(transcript_path, is_docx=True)
        final_prompt = self.make_final_prompt(prompt, transcript)
        response = self.get_model_response(final_prompt, model_name)
        response_text = self.get_response_text(response)

        if save_path:
            self.save_txt(save_path, response_text)

        return response_text
