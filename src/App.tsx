// src/App.tsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import StatePage from './pages/StatePage';
import SupplierPage from './pages/SupplierPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <Routes>
      {/* Redirect root to /home */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* Home */}
      <Route path="/home" element={<Home />} />

      {/* State listings */}
      <Route path="/state/:state" element={<StatePage />} />
      <Route path="/state/:state/:city" element={<StatePage />} />

      {/* Individual supplier */}
      <Route path="/supplier/:id" element={<SupplierPage />} />

      {/* Static pages */}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
