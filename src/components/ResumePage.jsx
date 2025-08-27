// src/components/ResumePage.jsx
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function ResumePage() {
    const location = useLocation();
    const [pdfLoaded, setPdfLoaded] = useState(false);
    const [pdfError, setPdfError] = useState(false);
    
    const navigationItems = [
        { label: 'Home', path: '/home' },
        { label: 'About Me', path: '/about' },
        { label: 'Skills', path: '/skills' },
        { label: 'Projects', path: '/projects' },
        { label: 'Blog / Opinions', path: '/blog' },
        { label: 'Resume', path: '/resume' }
    ];

    const handlePdfLoad = () => {
        setPdfLoaded(true);
        setPdfError(false);
    };

    const handlePdfError = () => {
        setPdfError(true);
        setPdfLoaded(false);
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = 'https://drive.google.com/file/d/1CZTW_hOUOY15swAAA3rXr554NfewxAkp/view?usp=drive_link';
        link.download = 'Shravan_Shenoy_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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

            {/* Sticky Download Button */}
            <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex justify-center">
                        <button
                            onClick={handleDownload}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 shadow-sm"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Resume
                    </h1>
                    <p className="text-xl text-gray-600 mb-6">
                        Professional experience and skills
                    </p>
                </div>

                {/* Summary Section */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-8 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Professional Summary
                    </h2>
                    <div className="prose prose-gray max-w-none">
                        <p className="text-gray-700 leading-relaxed mb-4">
                            [Your professional summary will go here. This is a great place to highlight your key strengths, 
                            career objectives, and what makes you unique as a candidate.]
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            [You can add multiple paragraphs here to provide a comprehensive overview of your background, 
                            key achievements, and what you're looking for in your next role.]
                        </p>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-4xl mx-auto">
                    <div className="flex items-start">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h3 className="text-sm font-medium text-blue-800 mb-1">
                                Resume Note
                            </h3>
                            <p className="text-sm text-blue-700">
                                This is a generic version of my resume. A tailored resume highlighting relevant experience 
                                and achievements specific to your role has been submitted with my application.
                            </p>
                        </div>
                    </div>
                </div>

                {/* PDF Viewer Container with Enhanced Shadow */}
                <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-100">
                    {!pdfError ? (
                        <div className="relative">
                            {/* Loading State */}
                            {!pdfLoaded && (
                                <div className="absolute inset-0 bg-gray-50 flex items-center justify-center z-10">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                        <p className="text-gray-600">Loading resume...</p>
                                    </div>
                                </div>
                            )}
                            
                            {/* PDF Embed */}
                            <iframe
                                src="https://drive.google.com/file/d/1CZTW_hOUOY15swAAA3rXr554NfewxAkp/preview"
                                className="w-full h-[800px] sm:h-[900px] lg:h-[1000px] border-0"
                                onLoad={handlePdfLoad}
                                onError={handlePdfError}
                                title="Resume PDF"
                            />
                        </div>
                    ) : (
                        /* Fallback for PDF loading errors */
                        <div className="p-8 text-center">
                            <div className="mb-4">
                                <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Resume Not Available
                            </h3>
                            <p className="text-gray-600 mb-4">
                                The resume PDF couldn't be loaded. Please use the download button above to view the resume.
                            </p>
                            <button
                                onClick={handleDownload}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download Resume
                            </button>
                        </div>
                    )}
                </div>

                {/* Additional Info */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>
                        📄 Resume is embedded for easy viewing • 📱 Optimized for mobile and desktop • 
                        ⏱️ Respectful of your time
                    </p>
                </div>
            </main>
        </div>
    );
} 