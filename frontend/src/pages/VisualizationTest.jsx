import React from 'react';
import TopicsChart from '../components/Charts/TopicsChart';
import TeachingStyleChart from '../components/Charts/TeachingStyleChart';
import QuestionsExamplesChart from '../components/Charts/QuestionsExamplesChart';
import TalkTimeChart from '../components/Charts/TalkTimeChart';
import mockData from '../services/mockData.json';

// Transform teaching_style data for the pie chart
const teachingStyleData = mockData.teaching_style
  ? [
      { name: 'Questioning', value: mockData.teaching_style.questioning * 100 },
      { name: 'Explanation', value: mockData.teaching_style.explanation * 100 },
      { name: 'Correcting', value: mockData.teaching_style.correcting * 100 },
      { name: 'Encouragement', value: mockData.teaching_style.encouraging * 100 }
    ].filter(item => item.value > 0)
  : [];

// Use the talk_time data directly for the area chart
const talkTimeData = mockData.talk_time || [];

// Use the top_concepts directly from mockData
const topicsData = mockData.top_concepts || [];

// Use the questions_examples data directly for the line chart
const questionsExamplesData = mockData.questions_examples || [];

// Golden ratio for chart proportions (1:1.618)
const CHART_HEIGHT = 400;

const VisualizationTest = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
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
