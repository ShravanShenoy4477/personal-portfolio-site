// src/components/BlogPage.jsx
import { Link, useLocation } from 'react-router-dom';

export default function BlogPage() {
    const location = useLocation();
    
    	const navigationItems = [
		{ label: 'Home', path: '/home' },
		{ label: 'About Me', path: '/about' },
		{ label: 'Skills', path: '/skills' },
		{ label: 'Projects', path: '/projects' },
		{ label: 'Resume', path: '/resume' },
		{ label: 'Blog / Opinions', path: '/blog' }
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
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Blog / Opinions
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Unorthodox ideas, short thoughts - Coming soon!
                    </p>
                </div>
            </main>
        </div>
    );
} 