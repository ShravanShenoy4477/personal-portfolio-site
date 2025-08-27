// src/components/PhotoSlideshow.jsx
import { useState, useEffect } from 'react';

export default function PhotoSlideshow() {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Use images that exist under public/assets
    const images = [
        '/assets/photo1.jpg',
        '/assets/photo2.jpg',
        '/assets/photo3.jpg',
        '/assets/internship-photo.jpeg'
    ];

    // Captions for each image
    const captions = [
        "Building early prototypes",
        "Tuning and testing",
        "Snapshots from projects",
        "Internship moments"
    ];

    // Auto-advance slideshow
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000); // Change every 4 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    const handleImageClick = (index) => {
        setCurrentIndex(index);
    };

    const handlePrev = () => {
        setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
    };

    const handleNext = () => {
        setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
    };

    // Get previous, current, and next indices
    const getPreviousIndex = () => currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    const getNextIndex = () => currentIndex === images.length - 1 ? 0 : currentIndex + 1;

    return (
        <div className="relative w-full">
            {/* Main Slideshow Container - 16:9 Aspect Ratio */}
            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                    {/* Previous Image (faint, left side) */}
                    <div className="absolute left-0 top-0 w-1/4 h-full transition-all duration-1000 ease-out">
                        <div className="relative w-full h-full">
                            <img
                                src={images[getPreviousIndex()]}
                                alt={`Previous photo`}
                                className="w-full h-full object-cover opacity-30 scale-90"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div className="hidden absolute inset-0 bg-gray-200 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-2xl mb-1">📸</div>
                                    <div className="text-xs text-gray-500">Previous</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Current Image (focused, center) */}
                    <div className="absolute left-1/4 top-0 w-1/2 h-full transition-all duration-1000 ease-out">
                        <div className="relative w-full h-full">
                            <img
                                src={images[currentIndex]}
                                alt={`Current photo ${currentIndex + 1}`}
                                className="w-full h-full object-cover opacity-100 scale-100 shadow-lg"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div className="hidden absolute inset-0 bg-gray-200 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-4xl mb-2">📸</div>
                                    <div className="text-sm text-gray-500">Photo {currentIndex + 1}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Next Image (faint, right side) */}
                    <div className="absolute right-0 top-0 w-1/4 h-full transition-all duration-1000 ease-out">
                        <div className="relative w-full h-full">
                            <img
                                src={images[getNextIndex()]}
                                alt={`Next photo`}
                                className="w-full h-full object-cover opacity-30 scale-90"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div className="hidden absolute inset-0 bg-gray-200 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-2xl mb-1">📸</div>
                                    <div className="text-xs text-gray-500">Next</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gradient overlays for smooth transitions */}
                    <div className="absolute left-0 top-0 w-1/4 h-full bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
                    <div className="absolute right-0 top-0 w-1/4 h-full bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 z-20"
            >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            
            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 z-20"
            >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Caption */}
            <div className="mt-6 text-center">
                <p className="text-gray-800 font-medium text-lg">
                    {captions[currentIndex]}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    {currentIndex + 1} of {images.length}
                </p>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-3">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleImageClick(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentIndex 
                                ? 'bg-blue-500 scale-125' 
                                : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
} 