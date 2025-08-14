import { Routes, Route } from 'react-router-dom';
import UploadPage from './pages/Upload';
import DashboardPage from './pages/Dashboard';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UploadPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}