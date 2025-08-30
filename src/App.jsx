import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoadingPage from './components/LoadingPage';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import SkillsPage from './components/SkillsPage';
import ProjectsPage from './components/ProjectsPage';
import HireMePage from './components/HireMePage';
import BlogPage from './components/BlogPage';
import ResumePage from './components/ResumePage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Loading page - first route */}
        <Route path="/" element={<LoadingPage />} />
        
        {/* Main pages */}
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
    </Router>
  );
}

export default App;
