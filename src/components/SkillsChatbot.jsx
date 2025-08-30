import React, { useState, useRef, useEffect } from 'react';

const SkillsChatbot = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const messagesEndRef = useRef(null);



    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            // Generate session ID for this conversation
            const newSessionId = `website_general_${Date.now()}`;
            setSessionId(newSessionId);
            
            // Initialize conversation
            const initialMessage = {
                id: Date.now(),
                type: 'bot',
                content: `Hi! I'm your AI assistant. Ask me about any of my skills, projects, research, or experience. I can help recruiters understand my background and capabilities!`,
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages([initialMessage]);
        }
    }, [isOpen]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;
        await sendMessage(inputMessage);
    };



    const sendMessage = async (messageText) => {
        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: messageText,
            timestamp: new Date().toLocaleTimeString()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage(''); // Clear input after sending
        setIsLoading(true);

        try {
            // Call the actual chatbot API
            const response = await callChatbotAPI(messageText);
            
            const botMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: response,
                timestamp: new Date().toLocaleTimeString()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Chatbot API error:', error);
            const errorMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: "Sorry, I encountered an error. Please try again.",
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const callChatbotAPI = async (message) => {
        // Use the actual Railway API URL
        const API_BASE_URL = 'https://web-production-4fa536.up.railway.app';
        const API_ENDPOINT = '/chat';
        
        // Use persistent session ID for conversation continuity
        const currentSessionId = sessionId || `website_general_${Date.now()}`;
        
        try {
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    session_id: currentSessionId
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('Chatbot API error:', error);
            
            // Fallback responses if API is not available
            const fallbackResponses = {
                'research': `I'm currently working on cutting-edge research in robot perception at Dynamic Robotics and Control Lab, USC. My focus is on real-time object state estimation using vision-language models and segmentation pipelines.`,
                'experience': `I have extensive experience in robotics, computer vision, and AI/ML. I've worked at ABB, IISc, and Netradyne Technologies on various robotics and automation projects.`,
                'projects': `Some of my key projects include the ICRA METRICS ADAPT Challenge (winners), Robothon competition (top 10), and developing vision stacks for humanoid robots.`,
                'skills': `My technical skills include Python, C++, ROS, OpenCV, PyTorch, CUDA, and various robotics frameworks. I specialize in computer vision and machine learning for robotics applications.`,
                'default': `I'm a robotics researcher and software developer with expertise in computer vision, AI/ML, and robotics. I'm currently pursuing research at USC's Dynamic Robotics and Control Lab.`
            };

            const lowerMessage = message.toLowerCase();
            if (lowerMessage.includes('research') || lowerMessage.includes('current') || lowerMessage.includes('drc')) {
                return fallbackResponses.research;
            } else if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
                return fallbackResponses.experience;
            } else if (lowerMessage.includes('project') || lowerMessage.includes('competition')) {
                return fallbackResponses.projects;
            } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
                return fallbackResponses.skills;
            } else {
                return fallbackResponses.default;
            }
        }
    };

    // Debug logging
    console.log('SkillsChatbot render:', { isOpen, messagesCount: messages.length });

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 50 }}>
            {/* Chat Widget - Fixed Bottom Right */}
            <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col border-4 border-red-500" style={{ width: '320px', height: '384px' }}>
                {/* Header */}
                <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                    <div>
                        <h3 className="font-semibold">AI Recruiter Assistant</h3>
                        <p className="text-sm opacity-90">Ask about skills, projects & experience</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                                    message.type === 'user'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-800'
                                }`}
                            >
                                <p>{message.content}</p>
                                <p className={`text-xs mt-1 ${
                                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                                }`}>
                                    {message.timestamp}
                                </p>
                            </div>
                        </div>
                    ))}
                    
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t border-gray-200">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Ask about skills, projects..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={isLoading || !inputMessage.trim()}
                            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillsChatbot;
