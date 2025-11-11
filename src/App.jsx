import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout.jsx';
import HomePage from '@/pages/HomePage.jsx';
import DreamsPage from '@/pages/DreamsPage.jsx';
import ReflectionsPage from '@/pages/ReflectionsPage.jsx';
import ProfilePage from '@/pages/ProfilePage.jsx';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dreams" element={<DreamsPage />} />
        <Route path="/reflections" element={<ReflectionsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
