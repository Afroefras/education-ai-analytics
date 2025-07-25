import streamlit as st
import pandas as pd
from datetime import datetime
import json
from pathlib import Path
from utils.data_processing import analyze_exam_answers

# Mock LLM function (will be replaced with actual implementation)
def analyze_question_relevance(question_data, transcript_text):
    """
    Analyze if a question is related to transcript content.
    
    Args:
        question_data: Dictionary containing question details
        transcript_text: The full transcript text to analyze against
        
    Returns:
        dict: Analysis results including relevance, confidence, and explanations
    """
    # This is a simple mock - in reality, we'd use an LLM here
    question_text = question_data['question_text'].lower()
    
    # Simple keyword matching for demo purposes
    keywords = {
        'science': ['chemical', 'formula', 'water', 'h2o', 'physics', 'chemistry'],
        'math': ['2+2', 'addition', 'subtract', 'calculate', 'arithmetic', 'numbers'],
        'literature': ['shakespeare', 'romeo', 'juliet', 'author', 'write', 'book'],
        'geography': ['capital', 'france', 'country', 'city', 'paris', 'london']
    }
    
    # Check for matches in question and options
    matched_topics = []
    for topic, topic_keywords in keywords.items():
        if any(keyword in question_text for keyword in topic_keywords):
            matched_topics.append(topic)
        
        # Check options for additional context
        for option in ['option_a', 'option_b', 'option_c', 'option_d']:
            if option in question_data and any(keyword in str(question_data[option]).lower() for keyword in topic_keywords):
                if topic not in matched_topics:
                    matched_topics.append(topic)
    
    # Check transcript for topic relevance
    transcript_lower = transcript_text.lower()
    transcript_matches = []
    for topic in matched_topics:
        if any(keyword in transcript_lower for keyword in keywords[topic]):
            transcript_matches.append(topic)
    
    # Generate analysis
    is_related = len(transcript_matches) > 0
    confidence = min(0.9, 0.4 + (len(transcript_matches) * 0.2))  # 0.6-0.9 confidence
    
    if is_related:
        explanation = f"The question relates to {', '.join(transcript_matches)} which is covered in the transcript."
    else:
        explanation = "The question doesn't appear to be directly covered in the provided transcript."
    
    # Add more context about the question
    explanation += f"\n\nQuestion: {question_data['question_text']}"
    explanation += f"\nSelected Option: {question_data.get('selected_option', 'N/A')}"
    explanation += f"\nCorrect Option: {question_data.get('correct_option', 'N/A')}"
    
    # Provide feedback on the answer
    if 'selected_option' in question_data and 'correct_option' in question_data:
        if question_data['selected_option'] == question_data['correct_option']:
            explanation += "\n\n✅ Correct answer!"
        else:
            explanation += "\n\n❌ Incorrect answer."
    
    return {
        "is_related": is_related,
        "confidence": confidence,
        "explanation": explanation,
        "supporting_evidence": [
            f"Found {len(matched_topics)} relevant topic(s): {', '.join(matched_topics) or 'None'}",
            f"Transcript covers: {', '.join(transcript_matches) or 'No matching topics found'}",
            "Note: This is a mock analysis. Real implementation would use an LLM for deeper analysis."
        ]
    }

def show_ai_analysis():
    st.title("AI-Powered Exam Analysis")
    st.write("Analyze how exam questions relate to class transcripts")
    
    # Upload exam results
    st.subheader("1. Upload Exam Results")
    exam_file = st.file_uploader("Upload Exam Results (CSV)", type=["csv"])
    
    # Upload transcript
    st.subheader("2. Upload Class Transcript")
    transcript_file = st.file_uploader("Upload Class Transcript (TXT)", type=["txt"])
    
    if exam_file and transcript_file:
        try:
            # Process exam results
            exam_df = pd.read_csv(exam_file)
            transcript_text = transcript_file.read().decode("utf-8")
            
            # Show previews
            with st.expander("Preview Exam Results"):
                st.dataframe(exam_df.head())
                
            with st.expander("Preview Transcript"):
                st.text_area("Transcript", transcript_text, height=200)
            
            # Analyze button
            if st.button("Analyze Questions"):
                with st.spinner("Analyzing questions..."):
                    # Get questions with incorrect answers
                    problem_questions = exam_df[exam_df['selected_option'] != exam_df['correct_option']]
                    
                    if not problem_questions.empty:
                        # Get unique questions that were answered incorrectly
                        unique_questions = problem_questions.drop_duplicates('question_id')
                    else:
                        # Fallback: use first 3 questions if none are incorrect
                        unique_questions = exam_df.drop_duplicates('question_id').head(3)
                    
                    # Display summary
                    st.subheader("Analysis Results")
                    st.write(f"Analyzing {len(unique_questions)} questions...")
                    
                    # Analyze each question
                    for i, (_, question_row) in enumerate(unique_questions.iterrows(), 1):
                        analysis = analyze_question_relevance(question_row.to_dict(), transcript_text)
                        
                        with st.expander(f"Question {i}: {question_row['question_text'][:50]}..."):
                            # Display question and options
                            st.markdown("### Question Details")
                            st.write(question_row['question_text'])
                            
                            # Show options with correct/incorrect indicators
                            for option in ['A', 'B', 'C', 'D']:
                                option_text = question_row.get(f'option_{option.lower()}', '')
                                if option_text:
                                    prefix = ""
                                    if question_row['selected_option'] == option:
                                        prefix = "✅ " if question_row['correct_option'] == option else "❌ "
                                    elif question_row['correct_option'] == option:
                                        prefix = "✓ "
                                    st.write(f"{prefix}**{option}.** {option_text}")
                            
                            # Display analysis
                            st.markdown("### Analysis")
                            if analysis["is_related"]:
                                st.success("✅ Related to transcript content")
                            else:
                                st.warning("❌ Not clearly related to transcript")
                            
                            # Show confidence with a progress bar
                            st.write(f"Confidence: {analysis['confidence']*100:.0f}%")
                            st.progress(analysis['confidence'])
                            
                            # Show detailed explanation
                            st.markdown("### Explanation")
                            st.write(analysis["explanation"])
                            
                            # Show supporting evidence
                            st.markdown("### Supporting Evidence")
                            for evidence in analysis["supporting_evidence"]:
                                st.write(f"• {evidence}")
                            
                            # Add some space
                            st.write("")
                            
        except Exception as e:
            st.error(f"Error processing files: {str(e)}")
    
    # Demo mode with sample data
    elif st.checkbox("Use sample data for demo"):
        st.info("Using sample data for demonstration")
        # Sample exam data - matching the specified structure
        sample_exam = pd.DataFrame({
            'exam_id': ['EXAM001'] * 5,  # Same exam ID for all questions
            'question_id': [f'Q{i+1}' for i in range(5)],
            'question_text': [
                'What is the capital of France?',
                'What is the chemical formula for water?',
                'Who developed the theory of relativity?',
                'What is 2+2?',
                'Who wrote Romeo and Juliet?'
            ],
            'option_a': ['Paris', 'CO2', 'Isaac Newton', '3', 'Charles Dickens'],
            'option_b': ['London', 'H2O', 'Albert Einstein', '4', 'William Shakespeare'],
            'option_c': ['Berlin', 'O2', 'Galileo', '5', 'Jane Austen'],
            'option_d': ['Madrid', 'N2', 'Stephen Hawking', '6', 'Mark Twain'],
            'correct_option': ['A', 'B', 'B', 'B', 'B'],
            'timestamp': [pd.Timestamp('2023-01-01')] * 5,
            'student_id': ['S001', 'S002', 'S003', 'S004', 'S005'],
            'selected_option': ['A', 'C', 'B', 'D', 'B']  # Some correct, some incorrect
        })
        
        # Sample transcript
        sample_transcript = """
        In today's class, we discussed various scientific concepts including gravity.
        Gravity is a natural phenomenon by which all things with mass are brought toward one another.
        We also reviewed basic arithmetic operations like addition and subtraction.
        """
        
        with st.expander("Preview Sample Data"):
            st.write("Sample Exam Results:")
            st.dataframe(sample_exam)
            st.write("Sample Transcript:")
            st.text_area("Transcript", sample_transcript, height=100)
        
        if st.button("Analyze Sample Questions"):
            with st.spinner("Analyzing sample questions..."):
                st.subheader("Sample Analysis Results")
                
                # Get questions with incorrect answers in the sample data
                problem_questions = sample_exam[sample_exam['selected_option'] != sample_exam['correct_option']]
                
                if not problem_questions.empty:
                    # Get unique questions that were answered incorrectly
                    unique_questions = problem_questions.drop_duplicates('question_id')
                else:
                    # Fallback: use first 3 questions if none are incorrect
                    unique_questions = sample_exam.drop_duplicates('question_id').head(3)
                
                # Analyze each question
                for i, (_, question_row) in enumerate(unique_questions.iterrows(), 1):
                    question_data = question_row.to_dict()
                    analysis = analyze_question_relevance(question_data, sample_transcript)
                    
                    with st.expander(f"Question {i}: {question_data['question_text'][:50]}..."):
                        # Display question and options
                        st.markdown("### Question Details")
                        st.write(question_data['question_text'])
                        
                        # Show options with correct/incorrect indicators
                        for option in ['A', 'B', 'C', 'D']:
                            option_text = question_data.get(f'option_{option.lower()}', '')
                            if option_text:
                                prefix = ""
                                if question_data['selected_option'] == option:
                                    prefix = "✅ " if question_data['correct_option'] == option else "❌ "
                                elif question_data['correct_option'] == option:
                                    prefix = "✓ "
                                st.write(f"{prefix}**{option}.** {option_text}")
                        
                        # Display analysis
                        st.markdown("### Analysis")
                        if analysis["is_related"]:
                            st.success("✅ Related to transcript content")
                        else:
                            st.warning("❌ Not clearly related to transcript")
                        
                        # Show confidence with a progress bar
                        st.write(f"Confidence: {analysis['confidence']*100:.0f}%")
                        st.progress(analysis['confidence'])
                        
                        # Show detailed explanation
                        st.markdown("### Explanation")
                        st.write(analysis["explanation"])
                        
                        # Show supporting evidence
                        st.markdown("### Supporting Evidence")
                        for evidence in analysis["supporting_evidence"]:
                            st.write(f"• {evidence}")
                        
                        # Add some space
                        st.write("")

# This allows the page to be run directly for testing
if __name__ == "__main__":
    show_ai_analysis()
