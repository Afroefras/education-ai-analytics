import pandas as pd
import numpy as np
from pathlib import Path
import os
from typing import Tuple, List, Dict, Optional, Any
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime

def load_exam_data(exam_file: str) -> pd.DataFrame:
    """
    Load and clean exam results data.
    
    Args:
        exam_file: Path to the exam CSV file
        
    Returns:
        pd.DataFrame: Cleaned DataFrame with exam data
    """
    try:
        # Read CSV with proper encoding and handle potential parsing issues
        df = pd.read_csv(exam_file, encoding='utf-8', parse_dates=['timestamp'])
        
        # Basic cleaning
        df = df.drop_duplicates()
        
        # Convert empty strings to NaN for consistency
        df['selected_option'] = df['selected_option'].replace('', pd.NA)
        
        # Ensure required columns exist
        required_columns = [
            'exam_id', 'question_id', 'question_text', 'option_a', 'option_b', 
            'option_c', 'option_d', 'correct_option', 'timestamp', 'student_id', 
            'selected_option'
        ]
        
        missing_cols = [col for col in required_columns if col not in df.columns]
        if missing_cols:
            raise ValueError(f"Missing required columns in exam data: {', '.join(missing_cols)}")
            
        return df
        
    except Exception as e:
        raise Exception(f"Error loading exam data: {str(e)}")
        

def analyze_exam_answers(df: pd.DataFrame) -> Dict[str, Any]:
    """
    Analyze exam answers to calculate correctness and generate statistics.
    
    Args:
        df: DataFrame containing exam data
        
    Returns:
        Dict containing analysis results including question stats, student stats, and visualizations
    """
    # Make a copy to avoid modifying the original
    df = df.copy()
    
    # Calculate answer status
    df['is_correct'] = df['selected_option'] == df['correct_option']
    df['is_missed'] = df['selected_option'].isna()
    df['is_incorrect'] = (~df['is_correct']) & (~df['is_missed'])
    
    # Per-question stats
    question_stats = df.groupby(['question_id', 'question_text']).agg(
        total_responses=('student_id', 'count'),
        correct=('is_correct', 'sum'),
        incorrect=('is_incorrect', 'sum'),
        missed=('is_missed', 'sum')
    ).reset_index()
    
    # Calculate percentages
    question_stats['pct_correct'] = (question_stats['correct'] / question_stats['total_responses'] * 100).round(1)
    question_stats['pct_incorrect'] = (question_stats['incorrect'] / question_stats['total_responses'] * 100).round(1)
    question_stats['pct_missed'] = (question_stats['missed'] / question_stats['total_responses'] * 100).round(1)
    
    # Per-student stats
    student_stats = df.groupby('student_id').agg(
        total_questions=('question_id', 'count'),
        correct=('is_correct', 'sum'),
        incorrect=('is_incorrect', 'sum'),
        missed=('is_missed', 'sum')
    ).reset_index()
    
    student_stats['score'] = (student_stats['correct'] / student_stats['total_questions'] * 100).round(1)
    
    # Generate visualizations
    # 1. Overall question performance
    fig_question_perf = px.bar(
        question_stats.sort_values('pct_correct', ascending=True),
        x='pct_correct',
        y='question_text',
        orientation='h',
        title='Question Performance (% Correct)',
        labels={'pct_correct': 'Percentage Correct', 'question_text': 'Question'}
    )
    
    # 2. Answer distribution for each question
    answer_dist = df.melt(
        id_vars=['question_id', 'question_text', 'student_id'],
        value_vars=['option_a', 'option_b', 'option_c', 'option_d'],
        var_name='option',
        value_name='option_text'
    )
    
    # 3. Student score distribution
    fig_score_dist = px.histogram(
        student_stats,
        x='score',
        nbins=10,
        title='Student Score Distribution',
        labels={'score': 'Score (%)'}
    )
    
    return {
        'question_stats': question_stats,
        'student_stats': student_stats,
        'fig_question_perf': fig_question_perf,
        'fig_score_dist': fig_score_dist,
        'answer_dist': answer_dist
    }

def load_transcript(transcript_file: str) -> str:
    """Load and clean transcript text."""
    with open(transcript_file, 'r', encoding='utf-8') as f:
        text = f.read()
    return text

def get_difficult_questions(exam_df: pd.DataFrame, threshold: float = 0.3) -> pd.DataFrame:
    """Identify questions with high error rates."""
    # Calculate error rates for each question
    question_stats = exam_df.drop(['student_id'], axis=1, errors='ignore').mean()
    difficult_questions = question_stats[question_stats < threshold]
    
    return difficult_questions

def cluster_students(exam_df: pd.DataFrame, n_clusters: int = 3) -> Tuple[pd.DataFrame, Dict]:
    """Cluster students based on their performance patterns."""
    from sklearn.cluster import KMeans
    from sklearn.preprocessing import StandardScaler
    
    # Prepare data for clustering
    X = exam_df.drop(['student_id'], axis=1, errors='ignore')
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # Perform clustering
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    clusters = kmeans.fit_predict(X_scaled)
    
    # Add cluster labels to original dataframe
    exam_df['cluster'] = clusters
    
    # Get cluster characteristics
    cluster_stats = {
        f'Cluster {i}': {
            'size': len(exam_df[exam_df['cluster'] == i]),
            'avg_score': exam_df[exam_df['cluster'] == i].drop(['cluster'], axis=1).mean().mean()
        }
        for i in range(n_clusters)
    }
    
    return exam_df, cluster_stats
