import React, { useState, useRef, useEffect } from 'react';

const SkillsChatbot = ({ isOpen, onClose, selectedSkill }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && selectedSkill) {
            // Initialize conversation with skill context
            const initialMessage = {
                id: Date.now(),
                type: 'bot',
                content: `Hi! I can tell you about my experience with ${selectedSkill.name}. What would you like to know?`,
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages([initialMessage]);
        }
    }, [isOpen, selectedSkill]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: inputMessage,
            timestamp: new Date().toLocaleTimeString()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            // Simulate API call to chatbot
            const response = await simulateChatbotResponse(inputMessage, selectedSkill);
            
            const botMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: response,
                timestamp: new Date().toLocaleTimeString()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: "Sorry, I'm having trouble connecting right now. Please try again later.",
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const simulateChatbotResponse = async (message, skill) => {
        // This will be replaced with actual chatbot API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const responses = {
            'experience': `I've used ${skill.name} extensively in several projects. For example, in my robotics project, I implemented ${skill.name} for sensor fusion and control algorithms.`,
            'projects': `Here are some key projects where I used ${skill.name}:\n• Autonomous Robot Navigation System\n• Computer Vision Pipeline\n• Machine Learning Model Training`,
            'level': `My proficiency level with ${skill.name} is ${skill.level || 'Advanced'}. I've been working with it for about ${skill.years || '3'} years.`,
            'default': `I have solid experience with ${skill.name}. I've used it in various contexts including robotics, computer vision, and data analysis. What specific aspect would you like to know more about?`
        };

        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('experience') || lowerMessage.includes('how long')) {
            return responses.experience;
        } else if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
            return responses.projects;
        } else if (lowerMessage.includes('level') || lowerMessage.includes('proficiency')) {
            return responses.level;
        } else {
            return responses.default;
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
                    <div className="flex space-x-2">
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillsChatbot;
