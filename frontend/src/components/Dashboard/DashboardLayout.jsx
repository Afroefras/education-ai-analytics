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
    <div className="space-y-4 p-2">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Classroom Analytics</h1>
        <p className="text-sm md:text-base text-gray-600">Insights from your lecture analysis</p>
      </div>
      
      {/* Dashboard Grid */}
      <div className="grid gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Teaching Style - 3 columns */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 lg:col-span-3">
            <h2 className="text-base font-semibold text-gray-800 mb-2">Teaching Style</h2>
            <div className="w-full h-full min-h-[200px]">
              <TeachingStyleChart data={analysis.data?.teaching_style} />
            </div>
          </div>
          
          {/* Talk Time - 9 columns */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 lg:col-span-9">
            <h2 className="text-base font-semibold text-gray-800 mb-2">Talk Time</h2>
            <div className="h-[200px] w-full">
              <TalkTimeChart data={analysis.data?.talk_time} />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-base font-semibold text-gray-800 mb-2">Key Topics</h2>
            <div className="h-20">
              <TopicsChart data={analysis.data?.top_concepts} />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-base font-semibold text-gray-800 mb-2">Questions & Examples</h2>
            <div className="h-20">
              <QuestionsExamplesChart data={analysis.data?.questions_examples} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
