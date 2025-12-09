import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SalesListPage from './pages/SalesListPage';
import UploadPage from './pages/UploadPage';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className=" mx-auto mx-2">
        <Routes>
          <Route path="/" element={<SalesListPage />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </main>
    </div>
  );
}
