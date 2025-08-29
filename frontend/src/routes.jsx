import { Routes, Route } from 'react-router-dom';
import UploadPage from './pages/Upload';
import DashboardPage from './pages/Dashboard';
import VisualizationTest from './pages/VisualizationTest';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UploadPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/visualization-test" element={<VisualizationTest />} />
    </Routes>
  );
}