import React from 'react';
import mockData from '../services/mockData.json';
import TopicsChart from '../components/Charts/TopicsChart';
import TeachingStyleChart from '../components/Charts/TeachingStyleChart';
import QuestionsExamplesChart from '../components/Charts/QuestionsExamplesChart';
import TalkTimeChart from '../components/Charts/TalkTimeChart';

const VisualizationTest = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Visualization Test Page</h1>
      
      {/* Dashboard Layout with Mock Data */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Tópicos más mencionados</h2>
          <div className="h-[400px]">
            <TopicsChart data={mockData.top_concepts} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Estilo de enseñanza</h2>
          <div className="h-[400px]">
            <TeachingStyleChart data={mockData.teaching_style} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Ejemplos y preguntas</h2>
          <div className="h-[400px]">
            <QuestionsExamplesChart data={mockData.questions_examples} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Tiempo de habla</h2>
          <div className="h-[400px]">
            <TalkTimeChart data={mockData.talk_time} />
          </div>
        </div>
      </div>
      
      {/* Raw Data Toggle */}
      <details className="mt-8">
        <summary className="text-lg font-semibold cursor-pointer text-blue-600">
          Ver datos de prueba completos
        </summary>
        <div className="mt-2 bg-white p-4 rounded-lg shadow-inner">
          <pre className="text-xs overflow-auto max-h-96">
            {JSON.stringify(mockData, null, 2)}
          </pre>
        </div>
      </details>
    </div>
  );
};

export default VisualizationTest;
