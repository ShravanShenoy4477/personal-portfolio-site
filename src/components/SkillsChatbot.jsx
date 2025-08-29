import React, { useState, useRef, useEffect } from 'react';

const SkillsChatbot = ({ isOpen, onClose, selectedSkill }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState('');
    const messagesEndRef = useRef(null);

    // Sample questions for quick access
    const sampleQuestions = [
        "What is your current research at DRCL?",
        "Tell me about your robotics experience",
        "What technologies do you know?",
        "Tell me about your projects",
        "What's your educational background?",
        "How long have you been working with this skill?"
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && selectedSkill) {
            // Generate or retrieve session ID for this skill conversation
            const newSessionId = `website_${selectedSkill.name}_${Date.now()}`;
            setSessionId(newSessionId);
            
            // Initialize conversation with skill context
            const initialMessage = {
                id: Date.now(),
                type: 'bot',
                content: `Hi! I can tell you about my experience with ${selectedSkill.name}. Ask me anything about my research, projects, or technical expertise!`,
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages([initialMessage]);
        }
    }, [isOpen, selectedSkill]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;
        await sendMessage(inputMessage);
    };

    const handleQuestionSend = async (question) => {
        if (!question.trim()) return;
        await sendMessage(question);
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
            const response = await callChatbotAPI(messageText, selectedSkill);
            
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

    const callChatbotAPI = async (message, skill) => {
        // Use the actual Railway API URL
        const API_BASE_URL = 'https://web-production-4fa536.up.railway.app';
        const API_ENDPOINT = '/chat';
        
        // Use persistent session ID for conversation continuity
        const currentSessionId = sessionId || `website_${skill.name}_${Date.now()}`;
        
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 h-96 flex flex-col">
                {/* Header */}
                <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                    <div>
                        <h3 className="font-semibold">Skills Assistant</h3>
                        {selectedSkill && (
                            <p className="text-sm opacity-90">Ask about {selectedSkill.name}</p>
                        )}
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
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                    message.type === 'user'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-800'
                                }`}
                            >
                                <p className="text-sm">{message.content}</p>
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
                            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
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
                <div className="p-4 border-t border-gray-200">
                    <div className="flex space-x-2 mb-3">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Ask about this skill..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={isLoading || !inputMessage.trim()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                    
                    {/* Sample Questions */}
                    <div className="space-y-2">
                        <p className="text-xs text-gray-500">Quick questions:</p>
                        <div className="flex flex-wrap gap-2">
                            {sampleQuestions.map((question, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setInputMessage(question);
                                        // Auto-send the question
                                        setTimeout(() => {
                                            const tempMessage = question;
                                            setInputMessage('');
                                            // Create and send the message
                                            const userMessage = {
                                                id: Date.now(),
                                                type: 'user',
                                                content: tempMessage,
                                                timestamp: new Date().toLocaleTimeString()
                                            };
                                            setMessages(prev => [...prev, userMessage]);
                                            // Call API with the question
                                            handleQuestionSend(tempMessage);
                                        }, 100);
                                    }}
                                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors cursor-pointer"
                                    disabled={isLoading}
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillsChatbot;
