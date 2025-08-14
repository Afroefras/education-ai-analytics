import { Link, useLocation } from 'react-router-dom';
import { FiUpload, FiHome } from 'react-icons/fi';

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="flex flex-col justify-between px-4 py-6 bg-white border-r w-60">
        <div>
          <div className="mb-10 text-2xl font-bold">reLecture</div>
          <nav className="space-y-4">
            <Link to="/dashboard" className={`flex items-center gap-2 ${location.pathname === '/dashboard' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}><FiHome /> Dashboard</Link>
            <Link to="/" className={`flex items-center gap-2 ${location.pathname === '/' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}><FiUpload /> Upload</Link>
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-6 bg-gray-50">
        </header>
        {children}
      </main>
    </div>
  );
}