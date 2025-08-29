import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MainLayout = ({ children }) => {
  console.log('Rendering MainLayout with children:', children);
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6 flex flex-col">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            LA
          </div>
          <span className="text-xl font-bold text-gray-800">Lecture Analytics</span>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/dashboard" 
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/upload" 
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span>Upload New</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* User profile/settings */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
              U
            </div>
            <div className="text-sm">
              <div className="font-medium text-gray-900">User</div>
              <div className="text-gray-500">Admin</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
