// src/components/Timeline.jsx
import { useState, useEffect, useRef } from 'react';

export default function Timeline() {
    const [animationPhase, setAnimationPhase] = useState('initial'); // 'initial', 'spotlight', 'final'
    const [selectedItem, setSelectedItem] = useState(null);
    const [showSpotlightPopup, setShowSpotlightPopup] = useState(false);
    const [spotlightPosition, setSpotlightPosition] = useState({ x: 0, y: 0 });
    const [timelineItems, setTimelineItems] = useState([
        {
            id: 1,
            year: '2002',
            title: 'Born',
            description: 'A curious over-weight kid enters the world.',
            details: 'Technically my first Hello World moment. Didn\'t write code, but I definitely had just one function - cry',
            isSpotlight: false,
            icon: '👶',
            company: null,
            location: 'Bangalore, India',
            duration: '9 months + 22 years ongoing',
            image: 'https://res.cloudinary.com/dsyshe328/image/upload/v1756282344/photo1.jpg' // Baby/child photo
        },
                {
            id: 2,
            year: '2010',
            title: 'Inspirational Movie',
            description: 'Transformers',
            details: 'I saw bumblebee transform and protect the earth from the Decepticons. I was so inspired by the movie that I wanted a bumblebee for myself.',
            isSpotlight: false,
            icon: '🎥',
            company: null,
            location: 'Bangalore, India',
            image: 'https://res.cloudinary.com/dsyshe328/image/upload/v1756282344/bumblebee_rspeip.jpg'
        },
        {
            id: 3,
            year: '2014',
            title: 'First Robotics Competition',
            description: 'Indian Robotics Olympiad - IRO',
            details: 'Built waste segregation robots using Lego Mindstorms EV3 and drag-and-drop code blocks. We won the state level competition',
            isSpotlight: false,
            icon: '🤖',
            location: 'Bangalore, India',
            duration: '3 months'
        },
        {
            id: 4,
            year: '2023',
            title: 'R&D intern',
            description: 'Robotics and Automation',
            details: 'Worked on implementing a voice-based interface for controlling an industrial robot arm using proprietary software. It involved creating a PoC and a demo for the management.',
            isSpotlight: false,
            icon: '💻',
            technologies: ['C#', 'UWP', 'Microsoft Speech Recognition', "ABB Robotstudio SDK"],
            projects: 1,
            company: 'ABB',
            duration: '3 months',
            location: 'Bangalore, India',
        },
        {
            id: 5,
            year: '2023',
            title: 'Undergraduate Researcher',
            description: 'Worked in India’s top research institutes',
            details: 'Participated in competitions and research projects dealing with manipulators and human-robot collaboration. I largely contributed to the vision stack that was used in most of the projects. I co-authored a paper that was published in Caimbridge Robotica',
            isSpotlight: false,
            icon: '💻',
            company: 'Robotics Innovations Lab, IISc',
            technologies: ['C++', 'Python', 'ROS', 'OpenCV', 'PyTorch', 'YOLO', 'Gazebo', 'CUDA'],
            duration: '7 months',
            location: 'Bangalore, India',
            image: 'https://res.cloudinary.com/dsyshe328/image/upload/v1756282342/iisc-internship_owv7we.jpg'
        },
        {
            id: 6,
            year: '2024',
            title: 'Software Developer Intern',
            description: 'Building at startup speed, in a company focussed on vision-based driver monitoring systems',
            details: 'Built a data analytics dashboard to visualise system usage behaviours of production devices to speed up debugging, development and bug triaging. It was a tool deployed internally and used by all levels of the organization as a defacto tool for debugging and development.',
            isSpotlight: false,
            icon: '💻',
            company: 'Netradyne Technologies',
            department: 'Device Team',
            duration: '10 months',
            location: 'Bangalore, India',
            technologies: ['Python', 'Docker', 'Git', 'PostgreSQL', 'Pandas', 'Matplotlib', 'Streamlit', 'Microservices', 'Linux Shell Scripting', 'LLM'],
        },
        {
            id: 6,
            year: '2025',
            title: 'Student Researcher',
            company: 'Dynamic Robotics and Control Lab, USC',
            description: 'Pushing state-of-the-art in robot perception.',
            details: 'Designing real-time object state estimators using vision-language models and segmentation pipelines. Deploying on edge devices like Jetson for real-world robotics.',
            isSpotlight: true,
            icon: '⭐',
            duration: (() => {
                const now = new Date();
                const april2025 = new Date(2025, 3, 1); // April 1, 2025 (month is 0-indexed)
                const diffTime = Math.abs(april2025 - now);
                const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44)); // Average days per month
                return `${diffMonths} months`;
            })(),
            location: 'Los Angeles, USA',
            technologies: ['Python', 'CUDA', 'PyTorch', 'OpenCV', 'SAM2', 'IsaacSim', 'VLM', 'Segmentation', 'Edge Computing', 'ROS2', 'Nsights Profiling'],
        }
    ]);

    const timelineRef = useRef(null);
    const spotlightRef = useRef(null);

    // Find the spotlight item(s)
    const spotlightItems = timelineItems.filter(item => item.isSpotlight);
    const anySpotlight = spotlightItems.length > 0;
    const spotlightItem = spotlightItems[0]; // For popup

    useEffect(() => {
        // Phase 1: Initial zoom-out (2 seconds)
        const phase1Timer = setTimeout(() => {
            setAnimationPhase('spotlight');
            
            // Phase 2: Zoom into spotlight (1 second delay, then 1 second animation)
            const phase2Timer = setTimeout(() => {
                if (spotlightRef.current) {
                    // Calculate the position of the spotlight item
                    const rect = spotlightRef.current.getBoundingClientRect();
                    const containerRect = timelineRef.current.getBoundingClientRect();
                    
                    // Calculate the center position of the spotlight item relative to the container
                    const centerX = rect.left + rect.width / 2 - containerRect.left;
                    const centerY = rect.top + rect.height / 2 - containerRect.top;
                    
                    setSpotlightPosition({ x: centerX, y: centerY });
                    
                    // Show spotlight popup
                    setShowSpotlightPopup(true);
                }
                
                // Phase 3: Zoom out to full timeline (3 seconds after spotlight)
                const phase3Timer = setTimeout(() => {
                    setAnimationPhase('final');
                    setShowSpotlightPopup(false);
                }, 2000);
                
                return () => clearTimeout(phase3Timer);
            }, 1000);
            
            return () => clearTimeout(phase2Timer);
        }, 1000);

        return () => clearTimeout(phase1Timer);
    }, []);

    const handleItemClick = (item) => {
        console.log('Timeline item clicked:', item); // Debug log
        setSelectedItem(item);
    };

    const closePopup = () => {
        setSelectedItem(null);
    };

    const handleZoomToItem = (item) => {
        // Set this item as spotlight
        setTimelineItems(prevItems => 
            prevItems.map(prevItem => ({
                ...prevItem,
                isSpotlight: prevItem.id === item.id
            }))
        );
        
        // Trigger zoom animation
        setAnimationPhase('spotlight');
        
        // Calculate position and show popup after a short delay
        setTimeout(() => {
            if (spotlightRef.current) {
                const rect = spotlightRef.current.getBoundingClientRect();
                const containerRect = timelineRef.current.getBoundingClientRect();
                
                const centerX = rect.left + rect.width / 2 - containerRect.left;
                const centerY = rect.top + rect.height / 2 - containerRect.top;
                
                setSpotlightPosition({ x: centerX, y: centerY });
                setShowSpotlightPopup(true);
            }
        }, 100);
        
        // Don't auto-return - let user click to return
    };

    // Calculate scale and transform based on animation phase
    const getTimelineTransform = () => {
        switch (animationPhase) {
            case 'initial':
                return 'scale-75'; // Slightly zoomed out
            case 'spotlight':
                return 'scale-140'; // More zoomed in to spotlight
            case 'final':
                return 'scale-100'; // Full view
            default:
                return 'scale-75';
        }
    };

    // Calculate transform origin for spotlight phase
    const getTransformOrigin = () => {
        if (animationPhase === 'spotlight' && spotlightPosition.x !== 0) {
            const containerWidth = timelineRef.current?.offsetWidth || 0;
            const containerHeight = timelineRef.current?.offsetHeight || 0;
            
            // Calculate transform origin as percentage
            const originX = (spotlightPosition.x / containerWidth) * 100;
            const originY = (spotlightPosition.y / containerHeight) * 100;
            
            return `${originX}% ${originY}%`;
        }
        return '50% 50%'; // Default center
    };

    const handleTimelineClick = () => {
        if (animationPhase === 'spotlight') {
            setAnimationPhase('final');
            setShowSpotlightPopup(false);
        }
    };

    return (
        <div 
            className="relative w-full h-full overflow-hidden border-2 border-gray-200 rounded-lg bg-gray-50"
            onClick={handleTimelineClick}
        >
            {/* Background Blur Overlay */}
            {animationPhase === 'spotlight' && anySpotlight && (
                <div className="absolute inset-0 backdrop-blur-sm transition-all duration-1000 ease-in-out z-10"></div>
            )}
            
            {/* Timeline Container */}
            <div 
                ref={timelineRef}
                className={`relative w-full h-full transition-all duration-1000 ease-in-out ${getTimelineTransform()} overflow-x-auto`}
                style={{ 
                    transformOrigin: getTransformOrigin(),
                    filter: animationPhase === 'spotlight' && anySpotlight ? 'blur(1px)' : 'none'
                }}
            >
                {/* Horizontal Timeline Line */}
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-blue-400"></div>

                {/* Timeline Items */}
                <div className="relative w-full h-full flex items-center justify-between px-8 min-w-max">
                    {timelineItems.map((item, index) => (
                        <div
                            key={item.id}
                            ref={item.isSpotlight ? spotlightRef : null}
                            className={`relative flex flex-col items-center ${
                                index % 2 === 0 ? 'flex-col-reverse' : 'flex-col'
                            }`}
                        >
                            {/* Timeline Icon */}
                            <div 
                                className={`relative cursor-pointer transition-all duration-300 hover:scale-110 ${
                                    index % 2 === 0 ? 'mb-12' : 'mt-12'
                                } ${item.isSpotlight ? 'z-20' : 'z-10'}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleZoomToItem(item);
                                }}
                            >
                                {/* Spotlight Effect */}
                                {item.isSpotlight && (
                                    <div className="absolute inset-0 animate-pulse">
                                        <div className="absolute inset-0 bg-blue-400 rounded-full opacity-20 animate-ping"></div>
                                        <div className="absolute inset-0 bg-blue-300 rounded-full opacity-30 animate-pulse"></div>
                                    </div>
                                )}
                                
                                {/* Timeline Icon */}
                                <div className={`relative w-6 h-6 flex items-center justify-center text-lg ${
                                    item.isSpotlight 
                                        ? 'text-blue-500' 
                                        : 'text-gray-400 hover:text-blue-400'
                                }`}>
                                    {/* Custom Icon */}
                                    <span>{item.icon}</span>
                                    
                                    {/* Spotlight Icon */}
                                    {item.isSpotlight && (
                                        <div className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 text-blue-500 animate-bounce ${
                                            index % 2 === 0 ? '-bottom-12' : '-top-12'
                                        }`}>
                                            <svg fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Content Card */}
                            <div 
                                className={`w-32 bg-white rounded-lg shadow-md p-2 border border-gray-200 hover:shadow-lg transition-shadow duration-300 text-center cursor-pointer ${
                                    item.isSpotlight ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                                } ${animationPhase === 'spotlight' && anySpotlight && item.isSpotlight ? 'ring-4 ring-blue-400 ring-opacity-75 shadow-xl' : ''}`}
                                style={{ 
                                    filter: animationPhase === 'spotlight' && anySpotlight && item.isSpotlight ? 'blur(0px)' : 'none'
                                }}
                                onClick={() => handleItemClick(item)}
                            >
                                <div className="text-xs font-medium text-gray-500 mb-1">{item.year}</div>
                                <div className="text-sm font-semibold text-gray-900 leading-tight">{item.title}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Spotlight Popup */}
            {showSpotlightPopup && spotlightItem && (
                <div className="absolute inset-0 flex items-center justify-center z-30">
                    <div 
                        className="bg-white rounded-lg shadow-xl p-6 border border-blue-200 max-w-sm mx-4 animate-fade-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-center">
                            <div className="text-sm font-medium text-blue-600 mb-2">Selected Event</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{spotlightItem.title}</h3>
                            <div className="text-sm text-gray-600 mb-3">{spotlightItem.description}</div>
                            <div className="text-xs text-gray-500 mb-4">{spotlightItem.year}</div>
                            
                            {/* Click to know more button */}
                            <button
                                onClick={() => {
                                    setShowSpotlightPopup(false);
                                    setSelectedItem(spotlightItem);
                                }}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                            >
                                Click to know more
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Animation Phase Indicator (for debugging - can be removed) */}
            <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                Phase: {animationPhase}
            </div>

            {/* Popup Modal */}
            {selectedItem && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    onClick={closePopup}
                >
                    <div 
                        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
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
                        <div className="space-y-4">
                            {/* Image (if exists) */}
                            {selectedItem.image && (
                                <div className="mb-2">
                                    <img 
                                        src={selectedItem.image} 
                                        alt={selectedItem.title}
                                        className="w-full h-48 object-cover rounded-lg"
                                        style={{ objectPosition: 'top' }}
                                        onLoad={(e) => console.log('Timeline image loaded successfully:', e.target.src)}
                                        onError={(e) => {
                                            console.error('Failed to load timeline image:', e.target.src);
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}
                            
                            {/* Header Section */}
                            <div className="text-center border-b border-gray-200 pb-3">
                                <div className="text-sm font-medium text-gray-500 mb-1">{selectedItem.year}</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedItem.title}</h3>
                                <div className="text-sm text-gray-600 text-left">{selectedItem.description}</div>
                            </div>
                            
                            {/* Info Grid */}
                            <div className="space-y-3">
                                {/* Location */}
                                {selectedItem.location && (
                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-medium text-gray-700 min-w-[80px]">📍 Location</span>
                                        <span className="text-sm text-gray-600 flex-1">{selectedItem.location}</span>
                                    </div>
                                )}
                                
                                {/* Company */}
                                {selectedItem.company && (
                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-medium text-gray-700 min-w-[80px]">🏢 Company</span>
                                        <span className="text-sm text-gray-600 flex-1">{selectedItem.company}</span>
                                    </div>
                                )}
                                
                                {/* University */}
                                {selectedItem.university && (
                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-medium text-gray-700 min-w-[80px]">🎓 University</span>
                                        <span className="text-sm text-gray-600 flex-1">{selectedItem.university}</span>
                                    </div>
                                )}
                                
                                {/* GPA */}
                                {selectedItem.gpa && (
                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-medium text-gray-700 min-w-[80px]">📊 GPA</span>
                                        <span className="text-sm text-gray-600 flex-1">{selectedItem.gpa}</span>
                                    </div>
                                )}
                                
                                {/* Role */}
                                {selectedItem.role && (
                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-medium text-gray-700 min-w-[80px]">👤 Role</span>
                                        <span className="text-sm text-gray-600 flex-1">{selectedItem.role}</span>
                                    </div>
                                )}
                                
                                {/* Department */}
                                {selectedItem.department && (
                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-medium text-gray-700 min-w-[80px]">🏛️ Department</span>
                                        <span className="text-sm text-gray-600 flex-1">{selectedItem.department}</span>
                                    </div>
                                )}
                                
                                {/* Duration */}
                                {selectedItem.duration && (
                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-medium text-gray-700 min-w-[80px]">⏱️ Duration</span>
                                        <span className="text-sm text-gray-600 flex-1">{selectedItem.duration}</span>
                                    </div>
                                )}
                                
                                {/* Technologies */}
                                {selectedItem.technologies && (
                                    <div className="space-y-2">
                                        <span className="text-sm font-medium text-gray-700 block">💻 Technologies</span>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedItem.technologies.map((tech, index) => (
                                                <span key={index} className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {/* Projects */}
                                {selectedItem.projects && (
                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-medium text-gray-700 min-w-[80px]">📁 Projects</span>
                                        <span className="text-sm text-gray-600 flex-1">{selectedItem.projects} completed</span>
                                    </div>
                                )}
                                
                                {/* Team Size */}
                                {selectedItem.teamSize && (
                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-medium text-gray-700 min-w-[80px]">👥 Team Size</span>
                                        <span className="text-sm text-gray-600 flex-1">{selectedItem.teamSize} members</span>
                                    </div>
                                )}
                                
                                {/* Funding */}
                                {selectedItem.funding && (
                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-medium text-gray-700 min-w-[80px]">💰 Funding</span>
                                        <span className="text-sm text-gray-600 flex-1">{selectedItem.funding}</span>
                                    </div>
                                )}
                                
                                {/* Achievements */}
                                {selectedItem.achievements && (
                                    <div className="space-y-2">
                                        <span className="text-sm font-medium text-gray-700 block">🏆 Achievements</span>
                                        <div className="space-y-1">
                                            {selectedItem.achievements.map((achievement, index) => (
                                                <div key={index} className="text-sm text-gray-600 text-left flex items-start gap-2">
                                                    <span className="text-blue-500 mt-1">•</span>
                                                    <span className="flex-1">{achievement}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Main Details */}
                            <div className="border-t border-gray-200 pt-3">
                                <span className="text-sm font-medium text-gray-700 block mb-2">📝 Details</span>
                                <div className="text-sm text-gray-700 leading-relaxed text-left">{selectedItem.details}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 