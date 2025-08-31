import { useAnalysis } from "../../services/AnalysisContext";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import TopicsChart from "../Charts/TopicsChart";
import TeachingStyleChart from "../Charts/TeachingStyleChart";
import QuestionsExamplesChart from "../Charts/QuestionsExamplesChart";
import TalkTimeChart from "../Charts/TalkTimeChart";

const DashboardLayout = () => {
  const { analysis } = useAnalysis();
  const navigate = useNavigate();

  useEffect(() => {
    if (!analysis) {
      navigate('/upload');
    }
  }, [analysis, navigate]);

  if (!analysis) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Classroom Analytics</h1>
        <p className="text-gray-600">Insights from your lecture analysis</p>
      </div>
      
      {/* Dashboard Grid */}
      <div className="grid gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Teaching Style</h2>
            <div className="h-80">
              <TeachingStyleChart data={analysis.data?.teaching_style} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Talk Time</h2>
            <div className="h-80">
              <TalkTimeChart data={analysis.data?.talk_time} />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Key Topics</h2>
            <div className="h-80">
              <TopicsChart data={analysis.data?.top_concepts} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Questions & Examples</h2>
            <div className="h-80">
              <QuestionsExamplesChart data={analysis.data?.questions_examples} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
