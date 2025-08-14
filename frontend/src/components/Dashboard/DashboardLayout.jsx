import { useAnalysis } from "../../services/AnalysisContext";
import UploadPanel from "../Upload/UploadPanel";
import TopicsChart from "../Charts/TopicsChart";
import TeachingStyleChart from "../Charts/TeachingStyleChart";
import QuestionsExamplesChart from "../Charts/QuestionsExamplesChart";
import TalkTimeChart from "../Charts/TalkTimeChart";

const DashboardLayout = () => {
  const { analysis, setAnalysis } = useAnalysis();

  if (!analysis) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <UploadPanel onDataReceived={setAnalysis} />
      </div>
    );
  }

  console.log("🔍 Analysis data:", analysis); // ← Agrega esto para debug

  return (
    <div className="grid gap-6 p-6 sm:grid-cols-2">
      <TopicsChart data={analysis.data?.top_concepts} />
      <TeachingStyleChart data={analysis.data?.teaching_style} />
      <QuestionsExamplesChart data={analysis.data?.questions_examples} />
      <TalkTimeChart data={analysis.data?.talk_time} />
    </div>
  );
};

export default DashboardLayout;
