import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HireMePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        description: ''
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/home" className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
              Shravan Shenoy
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link to="/home" className="hover:text-blue-400 transition-colors">Home</Link>
              <Link to="/about" className="hover:text-blue-400 transition-colors">About</Link>
              <Link to="/projects" className="hover:text-blue-400 transition-colors">Projects</Link>
              <Link to="/skills" className="hover:text-blue-400 transition-colors">Skills</Link>
              <Link to="/resume" className="hover:text-blue-400 transition-colors">Resume</Link>
              <Link to="/blog" className="hover:text-blue-400 transition-colors">Blog</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Let's Work Together
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            I'm passionate about creating innovative solutions and bringing ideas to life. 
            Whether you need a full-stack application, AI integration, or robotics solutions, 
            I'm here to help turn your vision into reality.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold mb-6 text-blue-400">Get In Touch</h2>
            
            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="text-green-400 text-6xl mb-4">✓</div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-300">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                <button 
                  onClick={() => setSubmitStatus(null)}
                  className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Type *</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white"
                    >
                      <option value="">Select project type</option>
                      <option value="web-app">Web Application</option>
                      <option value="mobile-app">Mobile Application</option>
                      <option value="ai-ml">AI/ML Solution</option>
                      <option value="robotics">Robotics Project</option>
                      <option value="consulting">Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-15k">$5,000 - $15,000</option>
                      <option value="15k-50k">$15,000 - $50,000</option>
                      <option value="50k-plus">$50,000+</option>
                      <option value="discuss">Let's discuss</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Timeline</label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1-3-months">1-3 months</option>
                      <option value="3-6-months">3-6 months</option>
                      <option value="6-plus-months">6+ months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Project Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Tell me about your project, goals, and requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Information Section */}
          <div className="space-y-8">
            {/* Why Choose Me */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Why Choose Me?</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <span className="text-blue-400 mr-3">✓</span>
                  Full-stack development expertise
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-3">✓</span>
                  AI/ML and robotics experience
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-3">✓</span>
                  Proven track record of successful projects
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-3">✓</span>
                  Clear communication and project management
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-3">✓</span>
                  Competitive pricing and flexible engagement
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Services I Offer</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center p-4 bg-white/5 rounded-lg">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">💻</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Web Development</h4>
                    <p className="text-sm text-gray-400">React, Node.js, Full-stack apps</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white/5 rounded-lg">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">AI & Robotics</h4>
                    <p className="text-sm text-gray-400">Machine learning, automation</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white/5 rounded-lg">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Mobile Apps</h4>
                    <p className="text-sm text-gray-400">Cross-platform development</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Other Ways to Connect</h3>
              <div className="space-y-3 text-gray-300">
                <p className="flex items-center">
                  <span className="text-blue-400 mr-3">📧</span>
                  Email: shravan.shenoy@example.com
                </p>
                <p className="flex items-center">
                  <span className="text-blue-400 mr-3">💼</span>
                  LinkedIn: linkedin.com/in/shravanshenoy
                </p>
                <p className="flex items-center">
                  <span className="text-blue-400 mr-3">🐙</span>
                  GitHub: github.com/shravanshenoy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireMePage;
