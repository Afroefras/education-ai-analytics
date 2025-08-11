import { useAnalysis } from "../../services/AnalysisContext";
import UploadPanel from "../Upload/UploadPanel";
import TopicsChart from "../Charts/TopicsChart";
import TeachingStyleChart from "../Charts/TeachingStyleChart";
import QuestionsExamplesChart from "../Charts/QuestionsExamplesChart";
import TalkTimeChart from "../Charts/TalkTimeChart";

const DashboardLayout = () => {
  const { analysis } = useAnalysis();

  if (!analysis) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <UploadPanel />
      </div>
    );
  }

  return (
    <div className="grid gap-6 p-6 sm:grid-cols-2">
      <TopicsChart data={analysis.top_concepts} />
      <TeachingStyleChart data={analysis.teaching_style} />
      <QuestionsExamplesChart data={analysis.questions_examples} />
      <TalkTimeChart data={analysis.talk_time} />
    </div>
  );
};

export default DashboardLayout;
