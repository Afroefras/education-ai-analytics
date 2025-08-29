import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import UploadPage from './pages/Upload';
import DashboardPage from './pages/Dashboard';
import VisualizationTest from './pages/VisualizationTest';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={
        <MainLayout>
          <UploadPage />
        </MainLayout>
      } />
      <Route path="/dashboard" element={
        <MainLayout>
          <DashboardPage />
        </MainLayout>
      } />
      <Route path="/visualization-test" element={
        <MainLayout>
          <VisualizationTest />
        </MainLayout>
      } />
    </Routes>
  );
}