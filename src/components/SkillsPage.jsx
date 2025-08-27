// src/components/SkillsPage.jsx
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SkillsChatbot from './SkillsChatbot';

export default function SkillsPage() {
	const location = useLocation();
	const [skills, setSkills] = useState([]);
	const [isChatbotOpen, setIsChatbotOpen] = useState(false);
	const [selectedSkill, setSelectedSkill] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	
	const navigationItems = [
		{ label: 'Home', path: '/home' },
		{ label: 'About Me', path: '/about' },
		{ label: 'Skills', path: '/skills' },
		{ label: 'Projects', path: '/projects' },
		{ label: 'Blog / Opinions', path: '/blog' },
		{ label: 'Resume', path: '/resume' }
	];

	useEffect(() => {
		fetchSkills();
	}, []);

	const fetchSkills = async () => {
		try {
			// For now, using mock data. Replace with actual API call
			const mockSkills = [
				{
					name: 'Python',
					level: 'Advanced',
					years: 4,
					category: 'Programming Languages',
					description: 'Robotics, Computer Vision, Machine Learning'
				},
				{
					name: 'C++',
					level: 'Intermediate',
					years: 2,
					category: 'Programming Languages',
					description: 'Real-time Control Systems, Embedded Systems'
				},
				{
					name: 'JavaScript',
					level: 'Advanced',
					years: 3,
					category: 'Programming Languages',
					description: 'Web Development, React, Node.js'
				},
				{
					name: 'ROS (Robot Operating System)',
					level: 'Intermediate',
					years: 2,
					category: 'Robotics',
					description: 'Autonomous Navigation, Sensor Fusion'
				},
				{
					name: 'OpenCV',
					level: 'Advanced',
					years: 3,
					category: 'Computer Vision',
					description: 'Image Processing, Object Detection'
				},
				{
					name: 'TensorFlow',
					level: 'Intermediate',
					years: 2,
					category: 'Machine Learning',
					description: 'Neural Networks, Model Training'
				},
				{
					name: 'Git',
					level: 'Advanced',
					years: 4,
					category: 'Development Tools',
					description: 'Version Control, Collaboration'
				},
				{
					name: 'Docker',
					level: 'Intermediate',
					years: 1,
					category: 'Development Tools',
					description: 'Containerization, Deployment'
				}
			];
			
			setSkills(mockSkills);
			setIsLoading(false);
		} catch (error) {
			console.error('Error fetching skills:', error);
			setIsLoading(false);
		}
	};

	const handleSkillClick = (skill) => {
		setSelectedSkill(skill);
		setIsChatbotOpen(true);
	};

	const handleCloseChatbot = () => {
		setIsChatbotOpen(false);
		setSelectedSkill(null);
	};

	const getCategorySkills = () => {
		const categories = {};
		skills.forEach(skill => {
			if (!categories[skill.category]) {
				categories[skill.category] = [];
			}
			categories[skill.category].push(skill);
		});
		return categories;
	};

	const getLevelColor = (level) => {
		switch (level.toLowerCase()) {
			case 'advanced':
				return 'bg-green-100 text-green-800 border-green-200';
			case 'intermediate':
				return 'bg-yellow-100 text-yellow-800 border-yellow-200';
			case 'beginner':
				return 'bg-blue-100 text-blue-800 border-blue-200';
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200';
		}
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

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						Skills & Expertise
					</h1>
					<p className="text-xl text-gray-600 mb-4">
						Click any skill to ask about my experience with it
					</p>
					<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
						<p className="text-sm text-blue-800">
							💡 <strong>Tip:</strong> Each bullet is clickable and opens the AI assistant with context about that skill.
						</p>
					</div>
				</div>
				
				{isLoading ? (
					<div className="flex justify-center items-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
					</div>
				) : (
					<div className="space-y-8">
						{Object.entries(getCategorySkills()).map(([category, categorySkills]) => (
							<div key={category} className="bg-white rounded-lg shadow-md p-6">
								<h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
									<span className="text-blue-600 mr-3">
										{category === 'Programming Languages' && '💻'}
										{category === 'Robotics' && '🤖'}
										{category === 'Computer Vision' && '👁️'}
										{category === 'Machine Learning' && '🧠'}
										{category === 'Development Tools' && '🛠️'}
									</span>
									{category}
								</h2>
								<ul className="list-disc list-inside space-y-2">
									{categorySkills.map((skill) => (
										<li key={skill.name} className="text-gray-800">
											<button
												onClick={() => handleSkillClick(skill)}
												className="text-left w-full group"
											>
												<div className="flex items-center gap-2">
													<span className="font-medium group-hover:underline">
														{skill.name}
													</span>
													<span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${getLevelColor(skill.level)}`}>
														{skill.level}
													</span>
													<span className="text-xs text-gray-500">({skill.years} yrs)</span>
												</div>
												{skill.description && (
													<p className="text-sm text-gray-600 mt-0.5">
														{skill.description}
													</p>
												)}
											</button>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				)}
			</main>

			{/* Chatbot */}
			<SkillsChatbot
				isOpen={isChatbotOpen}
				onClose={handleCloseChatbot}
				selectedSkill={selectedSkill}
			/>
		</div>
	);
} 