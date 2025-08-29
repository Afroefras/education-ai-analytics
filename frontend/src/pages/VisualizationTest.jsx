import React from 'react';
import TopicsChart from '../components/Charts/TopicsChart';
import TeachingStyleChart from '../components/Charts/TeachingStyleChart';
import QuestionsExamplesChart from '../components/Charts/QuestionsExamplesChart';
import TalkTimeChart from '../components/Charts/TalkTimeChart';
import mockData from '../services/mockData.json';

// Transform teaching_style data for the pie chart
const teachingStyleData = mockData.teaching_style ? [
  { name: 'Questioning', value: mockData.teaching_style.questioning * 100 },
  { name: 'Explanation', value: mockData.teaching_style.explanation * 100 },
  { name: 'Correcting', value: mockData.teaching_style.correcting * 100 },
  { name: 'Encouragement', value: mockData.teaching_style.encouraging * 100 }
] : [];

// Calculate talk time percentages from the data
const calculateTalkTimePercentages = () => {
  if (!mockData.talk_time || mockData.talk_time.length === 0) {
    return { professor: 0, students: 0 };
  }
  
  const totalMinutes = mockData.talk_time.length;
  const professorTime = mockData.talk_time.reduce((sum, minute) => sum + minute.professor_percentage, 0);
  const studentTime = mockData.talk_time.reduce((sum, minute) => sum + minute.student_percentage, 0);
  
  return {
    professor: Math.round((professorTime / totalMinutes) * 100),
    students: Math.round((studentTime / totalMinutes) * 100)
  };
};

const talkTimePercentages = calculateTalkTimePercentages();
const talkTimeData = [
  { name: 'Professor', value: talkTimePercentages.professor },
  { name: 'Students', value: talkTimePercentages.students }
];

// Use the top_concepts directly from mockData
const topicsData = mockData.top_concepts || [];

// Transform questions_examples data for the bar chart
const questionsExamplesData = mockData.questions_examples && mockData.questions_examples.length > 0
  ? [
      { 
        name: 'Professor', 
        questions: mockData.questions_examples[0].professor_questions || 0, 
        examples: mockData.questions_examples[0].examples || 0
      },
      { 
        name: 'Students', 
        questions: mockData.questions_examples[0].student_questions || 0, 
        examples: 0 // Not available in the data
      }
    ]
  : [
      { name: 'Professor', questions: 0, examples: 0 },
      { name: 'Students', questions: 0, examples: 0 }
    ];

// Golden ratio for chart proportions (1:1.618)
const CHART_HEIGHT = 400;

const VisualizationTest = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Visualization Test</h1>
        <p className="text-gray-600">Testing chart components with mock data</p>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Teaching Style Distribution */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Teaching Style Distribution</h2>
          <div className="w-full" style={{ height: CHART_HEIGHT }}>
            <TeachingStyleChart data={teachingStyleData} />
          </div>
        </div>
        
        {/* Talk Time Distribution */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Talk Time Distribution</h2>
          <div className="w-full" style={{ height: CHART_HEIGHT }}>
            <TalkTimeChart data={talkTimeData} />
          </div>
        </div>
        
        {/* Most Mentioned Topics */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Topics</h2>
          <div className="w-full" style={{ height: CHART_HEIGHT }}>
            <TopicsChart data={topicsData} />
          </div>
        </div>
        
        {/* Questions & Examples */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Questions & Examples</h2>
          <div className="w-full" style={{ height: CHART_HEIGHT }}>
            <QuestionsExamplesChart data={questionsExamplesData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizationTest;
