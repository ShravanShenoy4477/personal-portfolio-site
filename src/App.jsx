import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadingPage from './components/LoadingPage';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import SkillsPage from './components/SkillsPage';
import ProjectsPage from './components/ProjectsPage';
import HireMePage from './components/HireMePage';
import BlogPage from './components/BlogPage';
import ResumePage from './components/ResumePage';
import './App.css';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Show loading page for 5 seconds on every route change
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Show loading page first
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Routes>
      {/* Main pages */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/hire-me" element={<HireMePage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/resume" element={<ResumePage />} />
      
      {/* Redirect any unknown routes to home */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
