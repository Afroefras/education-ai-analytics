import streamlit as st
import pandas as pd
import plotly.express as px
from pathlib import Path
import os
import sys

# Add the parent directory to the path to allow importing from utils
sys.path.append(str(Path(__file__).parent.parent))
from utils.data_processing import load_exam_data, load_transcript, analyze_exam_answers

def display_analysis_results(analysis_results):
    """Display the analysis results with visualizations and tables."""
    st.header("📊 Exam Analysis")
    
    # Overall stats
    st.subheader("Overall Performance")
    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("Average Score", f"{analysis_results['student_stats']['score'].mean():.1f}%")
    with col2:
        st.metric("Questions Answered", f"{analysis_results['question_stats']['correct'].sum()} / {analysis_results['question_stats']['total_responses'].sum()}")
    with col3:
        st.metric("Students", len(analysis_results['student_stats']))
    
    # Question performance
    st.subheader("Question Performance")
    st.plotly_chart(analysis_results['fig_question_perf'], use_container_width=True)
    
    # Show question stats in a table
    with st.expander("View Detailed Question Statistics"):
        st.dataframe(
            analysis_results['question_stats'][[
                'question_id', 'question_text', 'pct_correct', 
                'pct_incorrect', 'pct_missed', 'total_responses'
            ]].rename(columns={
                'question_id': 'ID',
                'question_text': 'Question',
                'pct_correct': 'Correct %',
                'pct_incorrect': 'Incorrect %',
                'pct_missed': 'Missed %',
                'total_responses': 'Responses'
            }),
            hide_index=True,
            use_container_width=True
        )
    
    # Student score distribution
    st.subheader("Student Score Distribution")
    st.plotly_chart(analysis_results['fig_score_dist'], use_container_width=True)
    
    # Show student stats in a table
    with st.expander("View Student Performance"):
        st.dataframe(
            analysis_results['student_stats'].sort_values('score', ascending=False).rename(columns={
                'student_id': 'Student ID',
                'score': 'Score %',
                'correct': 'Correct',
                'incorrect': 'Incorrect',
                'missed': 'Missed',
                'total_questions': 'Total Questions'
            }),
            hide_index=True,
            use_container_width=True
        )

def main():
    st.title("📈 Analytics Dashboard")
    
    # Create data directories if they don't exist
    os.makedirs("../data/exams", exist_ok=True)
    os.makedirs("../data/transcripts", exist_ok=True)
    
    # Load data
    exam_files = list(Path("../data/exams").glob("*.csv"))
    
    if not exam_files:
        st.warning("Please upload exam data first!")
        if st.button("Go to Upload", type="primary"):
            st.page_link("pages/upload.py", label="Go to Upload", icon="📤")
        return
    
    # Select exam file
    selected_exam = st.selectbox(
        "Select Exam File",
        [f.name for f in exam_files],
        index=0
    )
    
    try:
        # Load and analyze exam data
        exam_path = Path(f"../data/exams/{selected_exam}")
        df = load_exam_data(exam_path)
        
        with st.spinner("Analyzing exam data..."):
            analysis_results = analyze_exam_answers(df)
        
        # Display analysis results
        display_analysis_results(analysis_results)
        
    except Exception as e:
        st.error(f"Error analyzing exam data: {str(e)}")
        st.exception(e)

if __name__ == "__main__":
    st.set_page_config(
        page_title="Analytics Dashboard",
        page_icon="📊",
        layout="wide"
    )
    main()
