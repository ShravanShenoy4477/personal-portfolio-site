// src/components/AboutPage.jsx
import { Link, useLocation } from 'react-router-dom';
import PhotoSlideshow from './PhotoSlideshow';

export default function AboutPage() {
    const location = useLocation();
    
    const navigationItems = [
        { label: 'Home', path: '/home' },
        { label: 'About Me', path: '/about' },
        { label: 'Skills', path: '/skills' },
        { label: 'Projects', path: '/projects' },
        { label: 'Blog / Opinions', path: '/blog' },
        { label: 'Resume', path: '/resume' }
    ];

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
                {/* 1. Personal Statement */}
                <section className="mb-20">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-5xl font-bold text-gray-900 mb-10 text-center">Who I Am</h1>
                        <div className="max-w-4xl w-full">
                            <div className="text-center text-lg md:text-xl text-gray-800 mb-8 leading-relaxed">
                                I am a graduate student at USC, pursuing a Master's in Computer Science. I am really excited about working at the intersection of Robotics and Computer Vision.<br/><br/>
                                My greatest strength is initiative. I take ownership, follow through, and never shy away from a challenge, even if it takes a significant amount of time.<br/><br/>
                                Over the years, I've come to realize that showing up consistently — even when I don't have all the answers — matters more than always being right.<br/><br/>
                                Essentially, I've tried to build the mindset of a grounded engineer, one that resonates with 'Hire for attitude, Train for skills'<br/><br/>
                                And, if you're asking me on a deeper level, I am just a kid really trying to make it big, one step at a time, as an international student and in what's a tough job market!
                            </div>
                            <hr className="border-t-2 border-gray-300 my-10" />
                        </div>
                    </div>
                </section>

                {/* 2. Dream Career Progression */}
                <section className="mb-20">
                    <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
                            <span className="text-blue-600 mr-3">🚀</span>
                            Dream Career Progression
                        </h2>
                        <p className="text-center text-gray-600 mb-6">How I saw my dream career change, over the years. I've grown up, but have I really?</p>
                        <ul className="relative pl-12 space-y-6">
                            {/* Timeline vertical line */}
                            <div className="absolute left-4 top-2 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 to-blue-500" style={{zIndex:0}}></div>
                            {/* Timeline items */}
                            <li className="relative flex items-start z-10">
                                <span className="absolute -left-6 top-1 text-sm font-semibold text-blue-600 bg-white px-2 py-1 rounded-full border border-blue-300 shadow-md hover:shadow-lg transition-shadow">Age 8</span>
                                <div className="w-full">
                                    <span className="font-semibold text-gray-800">Wanted to build Iron Man/Bumble Bee</span>
                                    <span className="block text-gray-500 text-sm">because the idea of a robot that can fly and transform was cool</span>
                                </div>
                            </li>
                            <li className="relative flex items-start z-10">
                                <span className="absolute -left-6 top-1 text-sm font-semibold text-blue-600 bg-white px-2 py-1 rounded-full border border-blue-300 shadow-md hover:shadow-lg transition-shadow">Age 14</span>
                                <div className="w-full">
                                    <span className="font-semibold text-gray-800">Wanted to be a F1 mechanic</span>
                                    <span className="block text-gray-500 text-sm">because I really liked Lewis Hamilton</span>
                                </div>
                            </li>
                            <li className="relative flex items-start z-10">
                                <span className="absolute -left-6 top-1 text-sm font-semibold text-blue-600 bg-white px-2 py-1 rounded-full border border-blue-300 shadow-md hover:shadow-lg transition-shadow">Age 18</span>
                                <div className="w-full">
                                    <span className="font-semibold text-gray-800">Figured I'd just be a software engineer</span>
                                    <span className="block text-gray-500 text-sm">since I took up CS in undergrad</span>
                                </div>
                            </li>
                            <li className="relative flex items-start z-10">
                                <span className="absolute -left-6 top-1 text-sm font-semibold text-blue-600 bg-white px-2 py-1 rounded-full border border-blue-300 shadow-md hover:shadow-lg transition-shadow">Age 20</span>
                                <div className="w-full">
                                    <span className="font-semibold text-gray-800">Now?</span>
                                    <span className="block text-gray-500 text-sm">I want to be a part of the Robotics Revolution</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* 3. Hobbies */}
                <section className="mb-20">
                    <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="text-blue-600 mr-3">🎯</span>
                            Hobbies & Interests
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-gray-50 rounded-lg p-6 text-center transition-transform duration-200 hover:scale-105 hover:bg-blue-50">
                                <div className="text-4xl mb-4">⚽</div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Football</h3>
                                <p className="text-gray-600 text-sm">Hala Madrid y nada más</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-6 text-center transition-transform duration-200 hover:scale-105 hover:bg-blue-50">
                                <div className="text-4xl mb-4">🏃‍♂️</div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Long-distance running</h3>
                                <p className="text-gray-600 text-sm">Best way to debug code is during a 10K (maybe that's why I haven't been able to run a 10K yet)</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-6 text-center transition-transform duration-200 hover:scale-105 hover:bg-blue-50">
                                <div className="text-4xl mb-4">💻</div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Doom-scrolling on LinkedIn</h3>
                                <p className="text-gray-600 text-sm">LinkedIn: 2, Me: 0</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-6 text-center transition-transform duration-200 hover:scale-105 hover:bg-blue-50">
                                <div className="text-4xl mb-4">🚗</div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Cars, Cars, Cars</h3>
                                <p className="text-gray-600 text-sm">I just find watching car builds extremely therapeutic</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Project Car */}
                <section className="mb-20">
                    <div className="bg-white rounded-lg shadow-md p-8 max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-8">
                        {/* Car Build Pictures */}
                        <div className="flex-shrink-0 w-full lg:w-1/2">
                            <div className="bg-gray-100 rounded-lg p-6 border-2 border-dashed border-gray-300">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                                        <img 
                                            src="https://res.cloudinary.com/dsyshe328/image/upload/v1756282346/bmwm3e36front_ret5vj.webp" 
                                            alt="Car inspiration Front" 
                                            className="w-full h-full object-cover rounded-lg shadow-md"
                                            onLoad={(e) => console.log('Front image loaded successfully:', e.target.src)}
                                            onError={(e) => {
                                                console.error('Failed to load front image:', e.target.src);
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                    <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                                        <img 
                                            src="https://res.cloudinary.com/dsyshe328/image/upload/v1756282345/bmwm3e36rear_tv9qza.webp" 
                                            alt="Car inspiration Rear" 
                                            className="w-full h-full object-cover rounded-lg shadow-md"
                                            onLoad={(e) => console.log('Rear image loaded successfully:', e.target.src)}
                                            onError={(e) => {
                                                console.error('Failed to load rear image:', e.target.src);
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Specs and description */}
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="text-blue-600 mr-3">🚗</span>
                                Project Car
                            </h2>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">BMW E36 M3</h3>
                            <p className="text-gray-700 mb-4">Build Goal: A modern-retro street car with an analog soul and a mechanical beating heart</p>
                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                <h4 className="font-semibold text-gray-800 mb-2">Dream Specs:</h4>
                                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                                    <li>Custom wide-body kit</li>
                                    <li>Negative camber for that aggressive stance</li>
                                    <li>Tuned inline-6 engine with performance exhaust</li>
                                    <li>Alcantara bucket seats with quick-release steering wheel</li>
                                    <li>Matte-black wrap with carbon accents</li>
                                    <li>BBS wheels on track-spec rubber</li>
                                </ul>
                            </div>
                            <p className="text-sm text-gray-500 italic mb-2">Why? Because in a world full of super silent EVs,I want something that talks back — every vibration, gear shift, and exhaust note reminding me I'm alive </p>
                        </div>
                    </div>
                </section>

                {/* 5. Pictures Through the Years
                <section className="mb-20">
                    <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="text-blue-600 mr-3">🖼</span>
                            Pictures of me through the years
                        </h2>
                        <div className="w-full">
                            <PhotoSlideshow />
                        </div>
                    </div>
                </section> */}
            </main>
        </div>
    );
} 