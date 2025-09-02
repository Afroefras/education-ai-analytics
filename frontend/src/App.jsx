import AppRoutes from './routes';
import { AnalysisProvider } from './services/AnalysisContext';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <AnalysisProvider>
        <AppRoutes />
      </AnalysisProvider>
    </ErrorBoundary>
  );
}

export default App;
