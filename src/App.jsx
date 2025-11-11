// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { DreamsPage } from "./pages/DreamsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { MilestonesPage } from "./pages/MilestonesPage"; // ancien Reflections
import { Globe, Home, Target, User } from "lucide-react";
import "./pages/styles.css";

// 🌍 Import du système de langues
import "../assets/lang.js";

export default function App() {
  return (
    <Router>
      <div className="app-shell">
        {/* === CONTENU DES PAGES === */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dreams" element={<DreamsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/milestones" element={<MilestonesPage />} />
          </Routes>
        </main>

        {/* === BARRE DE NAVIGATION === */}
        <footer className="bottom-nav">
          <NavLink to="/" className="nav-item">
            <Home size={20} />
            <span data-i18n="nav.home">Home</span>
          </NavLink>
          <NavLink to="/dreams" className="nav-item">
            <Target size={20} />
            <span data-i18n="nav.dreams">Dreams</span>
          </NavLink>
          <NavLink to="/milestones" className="nav-item">
            <Globe size={20} />
            <span data-i18n="nav.milestones">Milestones</span>
          </NavLink>
          <NavLink to="/profile" className="nav-item">
            <User size={20} />
            <span data-i18n="nav.profile">Profile</span>
          </NavLink>
        </footer>
      </div>
    </Router>
  );
}
