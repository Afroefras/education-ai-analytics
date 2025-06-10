import streamlit as st
import pandas as pd
from pathlib import Path
import os
import sys

# Add the parent directory to the path to allow importing from utils
sys.path.append(str(Path(__file__).parent.parent))

def save_uploaded_file(uploaded_file, target_dir):
    """Save an uploaded file to the target directory."""
    try:
        target_path = target_dir / uploaded_file.name
        with open(target_path, "wb") as f:
            f.write(uploaded_file.getbuffer())
        return target_path, None
    except Exception as e:
        return None, str(e)

def main():
    st.title("📤 Upload Data")
    
    # Create data directories if they don't exist
    data_dir = Path("../data")
    exams_dir = data_dir / "exams"
    transcripts_dir = data_dir / "transcripts"
    
    os.makedirs(exams_dir, exist_ok=True)
    os.makedirs(transcripts_dir, exist_ok=True)
    
    st.header("1. Upload Class Transcript")
    transcript_file = st.file_uploader(
        "Upload a text file with the class transcript", 
        type=["txt"],
        key="transcript_uploader"
    )
    
    st.header("2. Upload Exam Results")
    exam_file = st.file_uploader(
        "Upload a CSV file with exam results", 
        type=["csv"],
        key="exam_uploader"
    )
    
    if st.button("Upload Files", type="primary"):
        if not transcript_file or not exam_file:
            st.error("❌ Please upload both a transcript and an exam file.")
            return
        
        with st.spinner("Uploading and validating files..."):
            # Save transcript
            transcript_path, error = save_uploaded_file(transcript_file, transcripts_dir)
            if error:
                st.error(f"❌ Failed to save transcript: {error}")
                return
            
            # Save exam data
            exam_path, error = save_uploaded_file(exam_file, exams_dir)
            if error:
                st.error(f"❌ Failed to save exam file: {error}")
                # Clean up transcript if exam save failed
                if transcript_path and transcript_path.exists():
                    transcript_path.unlink()
                return
            
            # Validate exam file
            try:
                import pandas as pd
                df = pd.read_csv(exam_path)
                required_columns = [
                    'exam_id', 'question_id', 'question_text', 'option_a', 'option_b',
                    'option_c', 'option_d', 'correct_option', 'timestamp', 'student_id',
                    'selected_option'
                ]
                missing_columns = [col for col in required_columns if col not in df.columns]
                if missing_columns:
                    raise ValueError(f"Missing required columns: {', '.join(missing_columns)}")
                
                st.success("✅ Files uploaded and validated successfully!")
                st.balloons()
                
                # Add a button to go to analytics
                if st.button("Go to Analytics Dashboard"):
                    st.page_link("pages/analytics.py", label="Go to Analytics", icon="📊")
                
            except Exception as e:
                st.error(f"❌ Error validating exam file: {str(e)}")
                # Clean up files if validation fails
                if transcript_path and transcript_path.exists():
                    transcript_path.unlink()
                if exam_path and exam_path.exists():
                    exam_path.unlink()

if __name__ == "__main__":
    st.set_page_config(
        page_title="Upload Data",
        page_icon="📤",
        layout="wide"
    )
    main()
