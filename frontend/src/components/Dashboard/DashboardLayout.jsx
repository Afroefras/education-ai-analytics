import TeachingStyleChart from '../Charts/TeachingStyleChart';
import QuestionsExamplesChart from '../Charts/QuestionsExamplesChart';
import TalkTimeChart from '../Charts/TalkTimeChart';

export default function DashboardLayout() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <TeachingStyleChart />
      <QuestionsExamplesChart />
      <div className="col-span-2">
        <TalkTimeChart />
      </div>
    </div>
  );
}