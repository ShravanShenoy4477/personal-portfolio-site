// src/components/ProjectsPage.jsx
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function ProjectsPage() {
    const location = useLocation();
    const [selectedProject, setSelectedProject] = useState(null);
    const [videoPopup, setVideoPopup] = useState({ show: false, src: '', title: '' });
    
    const navigationItems = [
        { label: 'Home', path: '/home' },
        { label: 'About Me', path: '/about' },
        { label: 'Skills', path: '/skills' },
        { label: 'Projects', path: '/projects' },
        { label: 'Blog / Opinions', path: '/blog' },
        { label: 'Resume', path: '/resume' }
    ];

    const projects = [
        {
            id: 1,
            title: 'LLM-Powered Recruiter Chatbot & Coaching System',
            description: 'Enterprise-grade AI chatbot system for professional recruiter interactions with advanced knowledge management capabilities.',
            details: 'Developed a production-ready, enterprise-grade chatbot that combines cutting-edge LLM technology with robust backend infrastructure. The system features multi-stage search capabilities, intelligent document processing, and continuous knowledge base evolution, making it suitable for professional recruiter interactions and automated coaching.',
            icon: '🤖',
            achievements: [
                'Multi-stage search with semantic and metadata routing',
                'Advanced document processing (PDF, DOCX, CSV, TXT, Images)',
                'Intelligent chunking with context preservation',
                'Vector database integration with ChromaDB',
                'Production-ready FastAPI backend'
            ],
            duration: '3 months',
            location: 'Personal Project',
            type: 'AI/ML',
            category: 'NLP',
            status: 'Production Ready',
            github: 'Private repository',
            artifacts: [
                { name: 'System Architecture', type: 'documentation', path: '#' },
                { name: 'API Documentation', type: 'documentation', path: '#' }
            ]
        },
        {
            id: 2,
            title: 'Open-Source Vision Stack',
            description: 'Currently implementing an open-source vision stack at Dynamic Robotics and Control Lab, USC.',
            details: 'Working on developing a vision stack for an open-source humanoid robot platform that will be used by the other researchers as a plug-and-play modular tool, on top of which they can build their own applications. The project involves implementing state-of-the-art computer vision algorithms, creating comprehensive documentation, and ensuring the stack is easily deployable on various humanoid platforms.',
            icon: '👁️',
            achievements: ['Open-source vision stack for humanoid robots', 'Modular design', 'Plug-and-play tool'],
            duration: 'Ongoing',
            location: 'Los Angeles, USA',
            type: 'Research & Development',
            category: 'Computer Vision',
            status: 'Currently in development',
            github: 'Will be open-sourced upon completion',
            artifacts: ["In Progress"]
        },
        {
            id: 3,
            title: 'Robothon E-Waste Segregation Competition',
            description: 'International robotics competition focused on autonomous navigation and object manipulation challenges.',
            details: 'Participated in an international robotics competition where I implemented object detection algorithms for autonomously navigating a 6-DoF manipulator to perform object manipulation and waste segregation tasks, on a board provided by the competition organizers.',
            icon: '🤖',
            achievements: ['Computer vision algorithms for object detection', 'Autonomous navigation using SLAM techniques', 'Top 10 ranking among 30 teams'],
            duration: '1.5 months',
            location: 'Bangalore, India',
            type: 'Competition',
            category: 'Robotics',
            artifacts: [
                { name: 'Competition Video', type: 'video', path: 'https://drive.google.com/file/d/1ViHQofLK-pdxwHHV9KolCX5jx-bnlgmI/preview' },
            ]
        },
        {
            id: 4,
            title: 'ICRA METRICS ADAPT Challenge',
            description: 'International Conference on Robotics and Automation challenge focusing on advanced robotic manipulation and perception tasks.',
            details: 'Developed a image segmentation pipeline to detect and autonomously assemble a bevel gear assembly from scratch using a 6-DoF manipulator. The project involved developing a vision pipeline to detect the gear parts and a manipulation pipeline to autonomously assemble the gear.',
            icon: '🎯',
            achievements: ['Instance Segmentation', 'Autonomous Assembly', 'Winners of the challenge'],
            duration: '1 month',
            location: 'International',
            type: 'Research Challenge',
            category: 'Robotics',
            video: 'Demo video available',
            documentation: 'Technical documentation provided',
            artifacts: [
                { name: 'Challenge Video', type: 'video', path: 'https://drive.google.com/file/d/1ABr-DYs9hIMhr15QyJtHDa-bJkEjbg1z/preview' },
            ]
        },
        {
            id: 5,
            title: 'Lung Cancer Metastasis Project',
            description: 'Research project focused on developing machine learning models to predict and analyze lung cancer metastasis patterns using medical imaging data.',
            details: 'Developed machine learning models to predict and analyze lung cancer metastasis patterns using medical imaging data. The research involved extensive data analysis, model development, and validation. Successfully published findings in a peer-reviewed journal.',
            icon: '🔬',
            achievements: ['ML models for metastasis detection', 'Performance analysis & validation', 'Published research paper'],
            duration: '12 months',
            location: 'Research Institute',
            type: 'Research',
            category: 'Healthcare AI',
            paper: 'Published research paper available',
            artifacts: [
                { name: 'Techincal Report', type: 'pdf', path: 'https://drive.google.com/file/d/1Zmsf6zBOCa2u7c5WAfqgkMj_Zld6WM-A/view?usp=drive_link' },
            ]
        },
        {
            id: 6,
            title: 'Formula Student India',
            description: 'Formula-One style collegiate racing competition focused on design and engineering principles',
            details: 'Led the sponsorship and vehicle interface teams, raising $10,000 in sponsorship and designing a new steering wheel and pneumatic gear shift. Placed 1st in the Business Plan competition and 2nd in the Engineering Design competition.',
            icon: '🚗',
            achievements: ['Sponsorship', 'Vehicle Interface', 'Business Plan', 'Engineering Design'],
            duration: '2 years',
            location: 'Bangalore, India',
            type: 'Development',
            category: 'Combustion Vehicles',
            artifacts: [
                { name: 'About the Competition', type: 'URL', path: 'https://www.formulabharat.com/the-competition/' },
                { name: 'Busines Plan Presentation (BPP)', type: 'pdf', path: 'https://drive.google.com/file/d/1ZwLcCt2Mubw7mQBwJ58jbK1b4CCh2zx1/view?usp=drive_link' },
                { name: 'Engineering Design Presentation (EDP)', type: 'pdf', path: 'https://drive.google.com/file/d/1IUB7UkgaHVaO66xVsOqKSL0-DrhIrr0R/view?usp=drive_link' },                    
            ]
        }
    ];

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    const closePopup = () => {
        setSelectedProject(null);
    };

    const openVideoPopup = (src, title) => {
        setVideoPopup({ show: true, src, title });
    };

    const closeVideoPopup = () => {
        setVideoPopup({ show: false, src: '', title: '' });
    };

    return (
        <div className="min-h-screen bg-[#fefae0]">
            {/* Navigation Tabs */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex justify-between w-full">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                                        location.pathname === item.path
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Projects
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        A showcase of my robotics, research, and development work
                    </p>
                </div>
                
                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div 
                            key={project.id}
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 flex flex-col h-full"
                            onClick={() => handleProjectClick(project)}
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">{project.title}</h2>
                            <p className="text-gray-600 mb-4 text-sm flex-grow">{project.description}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                                <span>{project.type}</span>
                                <span>{project.category}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-12">
                    <div className="bg-blue-50 rounded-lg p-8 max-w-2xl mx-auto">
                        <h3 className="text-xl font-semibold text-blue-800 mb-3">
                            Interested in my work?
                        </h3>
                        <p className="text-blue-600 mb-4">
                            I'm always open to discussing these projects in detail or exploring new opportunities.
                        </p>
                        <Link
                            to="/hire-me"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                        >
                            Let's Connect
                        </Link>
                    </div>
                </div>
            </main>

            {/* Project Details Popup */}
            {selectedProject && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    onClick={closePopup}
                >
                    <div 
                        className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closePopup}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Popup Content */}
                        <div>
                            <div className="flex items-center mb-4">
                                <span className="text-4xl mr-4">{selectedProject.icon}</span>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h3>
                                    <div className="text-sm text-gray-500">{selectedProject.type} • {selectedProject.category}</div>
                                </div>
                            </div>

                            <div className="text-gray-700 mb-6">{selectedProject.details}</div>

                            {/* Project Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                {/* Left Column */}
                                <div className="space-y-4">
                                    {selectedProject.location && (
                                        <div>
                                            <span className="text-sm font-medium text-gray-700">📍 Location: </span>
                                            <span className="text-sm text-gray-600">{selectedProject.location}</span>
                                        </div>
                                    )}
                                    
                                    {selectedProject.duration && (
                                        <div>
                                            <span className="text-sm font-medium text-gray-700">⏱️ Duration: </span>
                                            <span className="text-sm text-gray-600">{selectedProject.duration}</span>
                                        </div>
                                    )}

                                    {selectedProject.status && (
                                        <div>
                                            <span className="text-sm font-medium text-gray-700">📊 Status: </span>
                                            <span className="text-sm text-gray-600">{selectedProject.status}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Right Column */}
                                <div className="space-y-4">
                                    {selectedProject.video && (
                                        <div>
                                            <span className="text-sm font-medium text-gray-700">📹 Video: </span>
                                            <span className="text-sm text-gray-600">{selectedProject.video}</span>
                                        </div>
                                    )}

                                    {selectedProject.documentation && (
                                        <div>
                                            <span className="text-sm font-medium text-gray-700">📄 Documentation: </span>
                                            <span className="text-sm text-gray-600">{selectedProject.documentation}</span>
                                        </div>
                                    )}

                                    {selectedProject.paper && (
                                        <div>
                                            <span className="text-sm font-medium text-gray-700">📋 Paper: </span>
                                            <span className="text-sm text-gray-600">{selectedProject.paper}</span>
                                        </div>
                                    )}

                                    {selectedProject.github && (
                                        <div>
                                            <span className="text-sm font-medium text-gray-700">🐙 GitHub: </span>
                                            <span className="text-sm text-gray-600">{selectedProject.github}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Technologies */}
                            {selectedProject.technologies && (
                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-800 mb-3">💻 Technologies Used:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.technologies.map((tech, index) => (
                                            <span key={index} className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Achievements */}
                            {selectedProject.achievements && (
                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-800 mb-3">🏆 Key Achievements:</h4>
                                    <ul className="space-y-2">
                                        {selectedProject.achievements.map((achievement, index) => (
                                            <li key={index} className="text-sm text-gray-700 flex items-start">
                                                <span className="text-blue-500 mr-2">•</span>
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Artifacts */}
                            {selectedProject.artifacts && (
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-3">📁 Project Artifacts:</h4>
                                    <ul className="space-y-2">
                                        {selectedProject.artifacts.map((artifact, index) => (
                                            <li key={index} className="text-sm text-gray-700 flex items-start">
                                                <span className="text-orange-500 mr-2">•</span>
                                                <span>{artifact.name}</span>
                                                {artifact.type === 'link' && (
                                                    <a href={artifact.path} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:underline">
                                                        (Link)
                                                    </a>
                                                )}
                                                {artifact.type === 'video' && (
                                                    <button 
                                                        onClick={() => openVideoPopup(artifact.path, artifact.name)}
                                                        className="ml-2 text-blue-500 hover:underline cursor-pointer"
                                                    >
                                                        (Video)
                                                    </button>
                                                )}
                                                {artifact.type === 'pdf' && (
                                                    <a href={artifact.path} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:underline">
                                                        (PDF)
                                                    </a>
                                                )}
                                                {artifact.type === 'image' && (
                                                    <a href={artifact.path} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:underline">
                                                        (Image)
                                                    </a>
                                                )}
                                                {artifact.type === 'URL' && (
                                                    <a href={artifact.path} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:underline">
                                                        (URL)
                                                    </a>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            
            {/* Video Popup Modal */}
            {videoPopup.show && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    onClick={closeVideoPopup}
                >
                    <div 
                        className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeVideoPopup}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Video Title */}
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                            {videoPopup.title}
                        </h3>

                        {/* Video Player */}
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                            {videoPopup.src.includes('drive.google.com') ? (
                                <iframe
                                    src={videoPopup.src}
                                    className="absolute inset-0 w-full h-full rounded-lg"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    title={videoPopup.title}
                                />
                            ) : (
                                <video
                                    className="absolute inset-0 w-full h-full rounded-lg"
                                    controls
                                    autoPlay
                                    muted
                                >
                                    <source src={videoPopup.src} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 