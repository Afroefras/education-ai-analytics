import UploadPanel from '../components/Upload/UploadPanel';
import { useAnalysis } from '../services/AnalysisContext';

export default function UploadPage() {
  const { setAnalysis } = useAnalysis();

  return <UploadPanel onDataReceived={setAnalysis} />;
}
