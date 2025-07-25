import streamlit as st

def main():
    st.title("Education AI Analytics Dashboard")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.header("📊 Course Analytics")
        st.markdown("""
        - Analyze student performance patterns
        - Identify teaching gaps
        - Track learning outcomes
        """)
    
    with col2:
        st.header("👥 Student Monitoring")
        st.markdown("""
        - Monitor individual student progress
        - Identify learning difficulties
        - Group students by learning patterns
        """)
    
    # Navigation buttons
    col1, col2, col3 = st.columns(3)
    with col1:
        st.page_link("pages/upload.py", label="Upload Data", icon="📤")
    with col2:
        st.page_link("pages/analytics.py", label="View Analytics", icon="📊")
    with col3:
        st.page_link("pages/ai_analysis.py", label="AI Question Analysis", icon="🤖")

if __name__ == "__main__":
    st.set_page_config(
        page_title="Education AI Analytics",
        page_icon="🎓",
        layout="wide"
    )
    main()
