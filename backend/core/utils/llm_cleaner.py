from core.utils.llm_base import LLMClass, save_txt

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
        filename_to_save: str='transcript',
        name_suffix: str="__clean"
    ) -> str:

        prompt = self.get_prompt(prompt_path)
        transcript = self.get_transcript(transcript_path, is_docx=True)
        final_prompt = self.make_final_prompt(prompt, transcript)
        response = self.get_model_response(final_prompt, model_name)
        response_text = self.get_response_text(response)

        if save_path:
            save_txt(response_text, save_path, filename_to_save, name_suffix)

        return response_text
