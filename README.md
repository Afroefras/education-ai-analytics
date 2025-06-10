# Education AI Analytics

An AI-powered platform that analyzes classroom transcripts and exam results to identify learning patterns and potential teaching gaps.

## Features

- Upload classroom transcripts (.txt)
- Upload exam results (.csv)
- Analyze student performance patterns
- Identify potential teaching gaps
- Student monitoring and clustering
- Interactive dashboard for insights

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up OpenAI API key:
Create a `.env` file with:
```
OPENAI_API_KEY=your_api_key_here
```

## Project Structure

```
education-ai-analytics/
├── app/
│   ├── pages/
│   │   ├── home.py
│   │   ├── upload.py
│   │   ├── analytics.py
│   │   └── student_monitoring.py
│   └── utils/
│       ├── data_processing.py
│       ├── llm_analysis.py
│       └── visualization.py
├── data/
│   ├── transcripts/
│   └── exams/
├── requirements.txt
└── README.md
```
