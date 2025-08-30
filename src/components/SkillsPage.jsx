// src/components/SkillsPage.jsx
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SkillsChatbot from './SkillsChatbot';

export default function SkillsPage() {
	const location = useLocation();
	const [skills, setSkills] = useState([]);
	const [isChatbotOpen, setIsChatbotOpen] = useState(false);
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
			// Comprehensive skills based on actual experience
			const comprehensiveSkills = [
				// Programming Languages
				{
					name: 'Python',
					level: 'Advanced',
					years: 4,
					category: 'Programming Languages',
					description: 'Machine Learning (PyTorch, TensorFlow, Scikit-learn), Computer Vision (OpenCV, Mediapipe), Robotics (ROS2), Web Development (Flask)'
				},
				{
					name: 'C++',
					level: 'Intermediate',
					years: 2,
					category: 'Programming Languages',
					description: 'Performance-critical robotics applications, ROS Noetic framework modules'
				},
				{
					name: 'C#',
					level: 'Intermediate',
					years: 1,
					category: 'Programming Languages',
					description: 'Voice Assistance Middleware for ABB GoFa robot, .NET Framework'
				},

				{
					name: 'HTML/CSS',
					level: 'Intermediate',
					years: 2,
					category: 'Programming Languages',
					description: 'Bootstrap, Flask GUI development for lung cancer prediction project'
				},
				
				// Robotics
				{
					name: 'ROS (Noetic & Humble)',
					level: 'Advanced',
					years: 3,
					category: 'Robotics',
					description: 'Robot Operating System, MoveIt, motion planning, trajectory optimization'
				},
				{
					name: 'Gazebo & Isaac Lab',
					level: 'Intermediate',
					years: 2,
					category: 'Robotics',
					description: 'Robot simulation, testing, and validation environments'
				},
				{
					name: 'Motion Planning & Control',
					level: 'Advanced',
					years: 3,
					category: 'Robotics',
					description: 'RRT*, GDA algorithms, trajectory optimization, PID control, real-time control systems'
				},
				{
					name: 'Human-Robot Collaboration',
					level: 'Advanced',
					years: 2,
					category: 'Robotics',
					description: 'HRC safety protocols, collaborative workspace design, human intention prediction, safety evaluation'
				},
				{
					name: 'Kinematics & Dynamics',
					level: 'Advanced',
					years: 3,
					category: 'Robotics',
					description: 'Forward/inverse kinematics, Jacobian analysis, dynamic modeling, force control, impedance control'
				},
				
				// Computer Vision
				{
					name: 'YOLO & SAM2',
					level: 'Advanced',
					years: 2,
					category: 'Computer Vision',
					description: 'YOLO v7, Segment Anything Model 2.0, MobileSAM, FastSAM variants'
				},
				{
					name: 'OpenCV & Mediapipe',
					level: 'Advanced',
					years: 3,
					category: 'Computer Vision',
					description: 'Image processing, pose estimation, gesture recognition, real-time applications'
				},
				{
					name: 'PyTorch & CUDA',
					level: 'Advanced',
					years: 3,
					category: 'Computer Vision',
					description: 'Deep learning models, GPU programming, TensorRT, ONNX optimization'
				},
				{
					name: 'Instance Segmentation',
					level: 'Advanced',
					years: 2,
					category: 'Computer Vision',
					description: 'Mask R-CNN, OWL-ViT, NanoOWL, real-time object tracking'
				},
				{
					name: 'Model Optimization',
					level: 'Intermediate',
					years: 2,
					category: 'Computer Vision',
					description: 'GPU profiling, benchmarking, edge device deployment, Jetson optimization'
				},
				
				// Machine Learning
				{
					name: 'PyTorch & TensorFlow',
					level: 'Advanced',
					years: 3,
					category: 'Machine Learning',
					description: 'Deep learning frameworks, neural network development, model training'
				},
				{
					name: 'Scikit-learn & Pandas',
					level: 'Advanced',
					years: 3,
					category: 'Machine Learning',
					description: 'Classical ML, ensemble learning, data preprocessing, feature engineering'
				},
				{
					name: 'Ensemble Learning',
					level: 'Intermediate',
					years: 2,
					category: 'Machine Learning',
					description: 'Random Forest, Gradient Boosting, AdaBoost, survival analysis'
				},
				{
					name: 'Data Analysis',
					level: 'Intermediate',
					years: 2,
					category: 'Machine Learning',
					description: 'NumPy, Matplotlib, statistical analysis, model evaluation'
				},
				{
					name: 'NLP Concepts',
					level: 'Beginner',
					years: 1,
					category: 'Machine Learning',
					description: 'Natural Language Processing fundamentals, conceptual understanding'
				},
				
				// Software Development
				{
					name: '.NET Framework',
					level: 'Intermediate',
					years: 1,
					category: 'Software Development',
					description: 'Windows UWP development, ABB robot middleware applications'
				},
				{
					name: 'Flask & Web Development',
					level: 'Intermediate',
					years: 2,
					category: 'Software Development',
					description: 'Web applications, API development, GUI interfaces'
				},
				{
					name: 'Git & Version Control',
					level: 'Advanced',
					years: 4,
					category: 'Software Development',
					description: 'Collaborative development, branching strategies, project management'
				},
				{
					name: 'Development Tools',
					level: 'Intermediate',
					years: 3,
					category: 'Software Development',
					description: 'Visual Studio, VS Code, Jupyter Notebook, algorithm development'
				},
				{
					name: 'Documentation & APIs',
					level: 'Intermediate',
					years: 2,
					category: 'Software Development',
					description: 'Technical documentation, API integration, project specifications'
				}
			];
			
			setSkills(comprehensiveSkills);
			setIsLoading(false);
		} catch (error) {
			console.error('Error fetching skills:', error);
			setIsLoading(false);
		}
	};

	const handleCloseChatbot = () => {
		setIsChatbotOpen(false);
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
						Browse my technical skills and expertise across different domains
					</p>
					<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
						<p className="text-sm text-blue-800">
							💬 <strong>Chat with me:</strong> Use the chatbot widget at the bottom right to ask about any skill, project, or experience!
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
								<div className="space-y-3">
									{categorySkills.map((skill) => (
										<div key={skill.name} className="text-gray-800 flex items-start gap-3">
											<div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
											<div className="flex-1">
												<div className="flex items-center gap-2 mb-1">
													<span className="font-medium">
														{skill.name}
													</span>
													<span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${getLevelColor(skill.level)}`}>
														{skill.level}
													</span>
													<span className="text-xs text-gray-500">({skill.years} yrs)</span>
												</div>
												{skill.description && (
													<p className="text-sm text-gray-600">
														{skill.description}
													</p>
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				)}
			</main>

			{/* Chatbot Widget - Always Visible */}
			<SkillsChatbot
				isOpen={true}
				onClose={handleCloseChatbot}
			/>
		</div>
	);
} 