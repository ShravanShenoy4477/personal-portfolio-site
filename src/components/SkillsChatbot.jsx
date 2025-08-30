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
        const API_ENDPOINT = '/api/chat';
        
        // Use persistent session ID for conversation continuity
        const currentSessionId = sessionId || `website_general_${Date.now()}`;
        
        try {
            console.log('Calling chatbot API:', `${API_BASE_URL}${API_ENDPOINT}`);
            console.log('Request payload:', { message, session_id: currentSessionId });
            
            // Try POST first, if that fails with 405, try GET with query parameters
            let response = await fetch(`${API_BASE_URL}${API_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    session_id: currentSessionId
                })
            });

            console.log('First attempt response status:', response.status);

            // If POST returns 405 (Method Not Allowed), try GET
            if (response.status === 405) {
                console.log('POST returned 405, trying GET with query params...');
                const params = new URLSearchParams({
                    message: message,
                    session_id: currentSessionId
                });
                response = await fetch(`${API_BASE_URL}${API_ENDPOINT}?${params}`, {
                    method: 'GET'
                });
                console.log('GET attempt response status:', response.status);
            }

            console.log('Final API Response status:', response.status);
            console.log('Final API Response headers:', response.headers);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
            }

            const data = await response.json();
            console.log('API Response data:', data);
            
            if (data.response) {
                return data.response;
            } else {
                console.error('API response missing "response" field:', data);
                throw new Error('Invalid API response format');
            }
        } catch (error) {
            console.error('Chatbot API error:', error);
            console.error('Full error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
            
            // Only use fallback if it's a network/API error, not a parsing error
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                return "I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
            }
            
            // For other errors, be more specific
            return `I encountered an error: ${error.message}. Please try again or contact support if the issue persists.`;
        }
    };

    // Debug logging
    console.log('SkillsChatbot render:', { isOpen, messagesCount: messages.length });

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Simple Robot Chatbot Icon */}
            <div 
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-white rounded-full shadow-lg p-4 hover:shadow-xl transition-all duration-200 cursor-pointer group"
            >
                <div className="text-center">
                    {/* Robot Icon */}
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    {/* Text */}
                    <p className="text-xs text-gray-600 font-medium">Ask me anything</p>
                </div>
            </div>

            {/* Chat Interface - Shows when expanded */}
            {isExpanded && (
                <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col border border-gray-200">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold">AI Recruiter Assistant</h3>
                            <p className="text-sm opacity-90">Ask about skills, projects & experience</p>
                        </div>
                        <button
                            onClick={() => setIsExpanded(false)}
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
            )}
        </div>
    );
};

export default SkillsChatbot;
