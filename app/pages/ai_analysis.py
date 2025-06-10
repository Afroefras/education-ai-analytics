import streamlit as st
import pandas as pd
from datetime import datetime
import json
from pathlib import Path
from utils.data_processing import analyze_exam_answers

# Mock LLM function (will be replaced with actual implementation)
def analyze_question_relevance(question, transcript_text):
    """
    Mock function to analyze if a question is related to transcript content.
    In production, this would call an LLM API.
    """
    # This is a simple mock - in reality, we'd use an LLM here
    mock_analysis = {
        "is_related": True,
        "confidence": 0.75,
        "explanation": "The question appears to be related to the transcript content about data analysis techniques.",
        "supporting_evidence": [
            "The transcript discusses data analysis methods",
            "The question tests understanding of these methods"
        ]
    }
    return mock_analysis

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
                        problem_questions = problem_questions['question_text'].unique().tolist()
                    else:
                        # Fallback: use all questions if none are incorrect
                        problem_questions = exam_df['question_text'].head(3).tolist()
                    
                    # Analyze each question
                    st.subheader("Analysis Results")
                    for i, question in enumerate(problem_questions, 1):
                        analysis = analyze_question_relevance(question, transcript_text)
                        
                        with st.expander(f"Question {i}: {question[:50]}..."):
                            if analysis["is_related"]:
                                st.success("✅ Related to transcript content")
                            else:
                                st.warning("❌ Not clearly related to transcript")
                                
                            st.write("Confidence:", f"{analysis['confidence']*100:.0f}%")
                            st.write("Explanation:", analysis["explanation"])
                            
                            st.write("Supporting Evidence:")
                            for evidence in analysis["supporting_evidence"]:
                                st.write(f"- {evidence}")
                            
        except Exception as e:
            st.error(f"Error processing files: {str(e)}")
    
    # Demo mode with sample data
    elif st.checkbox("Use sample data for demo"):
        st.info("Using sample data for demonstration")
        # Sample exam data - matching the expected format from analyze_exam_answers
        sample_exam = pd.DataFrame({
            'student_id': ['S001', 'S002', 'S003', 'S004', 'S005'],
            'question_id': ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
            'question_text': [
                'What is the capital of France?',
                'Explain the concept of gravity',
                'What is 2+2?',
                'Who wrote Romeo and Juliet?',
                'What is photosynthesis?'
            ],
            'selected_option': ['A', 'B', 'C', 'D', 'A'],
            'correct_option': ['A', 'C', 'C', 'D', 'B'],  # Last one is incorrect
            'timestamp': pd.Timestamp('2023-01-01')
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
                for i, question in enumerate(sample_exam[sample_exam['incorrect']]['question'], 1):
                    analysis = analyze_question_relevance(question, sample_transcript)
                    with st.expander(f"Sample Question {i}: {question}"):
                        if analysis["is_related"]:
                            st.success("✅ Related to transcript content")
                        else:
                            st.warning("❌ Not clearly related to transcript")
                        st.write("Explanation:", analysis["explanation"])

# This allows the page to be run directly for testing
if __name__ == "__main__":
    show_ai_analysis()
