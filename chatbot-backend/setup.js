const fs = require('fs-extra');
const path = require('path');

class ChatbotSetup {
    constructor() {
        this.baseDir = __dirname;
    }

    async setup() {
        console.log('🚀 Setting up Skills Chatbot Backend...\n');
        
        try {
            // Create necessary directories
            await this.createDirectories();
            
            // Create default skills data
            await this.createDefaultSkillsData();
            
            // Create training data
            await this.createTrainingData();
            
            // Create environment file if it doesn't exist
            await this.createEnvironmentFile();
            
            console.log('✅ Setup completed successfully!');
            console.log('\n📋 Next steps:');
            console.log('1. Edit .env with your OpenAI API key');
            console.log('2. Run: npm install');
            console.log('3. Run: npm start');
            console.log('4. Test with: node test-chatbot.js');
            
        } catch (error) {
            console.error('❌ Setup failed:', error.message);
            process.exit(1);
        }
    }

    async createDirectories() {
        console.log('📁 Creating directories...');
        
        const directories = [
            'data',
            'training-data',
            'reports',
            'logs'
        ];
        
        for (const dir of directories) {
            const dirPath = path.join(this.baseDir, dir);
            await fs.ensureDir(dirPath);
            console.log(`  ✅ Created: ${dir}`);
        }
    }

    async createDefaultSkillsData() {
        console.log('\n📝 Creating default skills data...');
        
        const skillsData = {
            skills: [
                {
                    name: 'Python',
                    level: 'Advanced',
                    years: 4,
                    projects: [
                        'Autonomous Robot Navigation',
                        'Computer Vision Pipeline',
                        'Machine Learning Models'
                    ],
                    experience: 'Extensive experience in robotics, computer vision, and ML applications',
                    keywords: ['robotics', 'computer vision', 'machine learning', 'automation']
                },
                {
                    name: 'C++',
                    level: 'Intermediate',
                    years: 2,
                    projects: [
                        'Real-time Control Systems',
                        'Embedded Systems Programming'
                    ],
                    experience: 'Used for performance-critical applications and embedded systems',
                    keywords: ['embedded systems', 'real-time', 'performance', 'control systems']
                },
                {
                    name: 'JavaScript',
                    level: 'Advanced',
                    years: 3,
                    projects: [
                        'Web Applications',
                        'React Development',
                        'API Development'
                    ],
                    experience: 'Full-stack development with modern frameworks and APIs',
                    keywords: ['web development', 'react', 'node.js', 'full-stack']
                },
                {
                    name: 'ROS (Robot Operating System)',
                    level: 'Intermediate',
                    years: 2,
                    projects: [
                        'Autonomous Navigation',
                        'Sensor Fusion',
                        'Robot Control'
                    ],
                    experience: 'Experience with ROS for robotics applications and sensor integration',
                    keywords: ['robotics', 'navigation', 'sensors', 'control']
                },
                {
                    name: 'OpenCV',
                    level: 'Advanced',
                    years: 3,
                    projects: [
                        'Image Processing',
                        'Object Detection',
                        'Computer Vision Pipeline'
                    ],
                    experience: 'Extensive experience with computer vision and image processing',
                    keywords: ['computer vision', 'image processing', 'object detection']
                }
            ]
        };
        
        const dataPath = path.join(this.baseDir, 'data', 'skills-data.json');
        await fs.writeJson(dataPath, skillsData, { spaces: 2 });
        console.log(`  ✅ Created: data/skills-data.json`);
    }

    async createTrainingData() {
        console.log('\n🎯 Creating training data...');
        
        const { DataPreparation } = require('./training/prepare-data');
        const dataPrep = new DataPreparation();
        
        try {
            await dataPrep.prepareTrainingData();
            console.log('  ✅ Training data generated');
        } catch (error) {
            console.log('  ⚠️  Training data generation failed (will be created on first run)');
        }
    }

    async createEnvironmentFile() {
        console.log('\n🔧 Creating environment file...');
        
        const envPath = path.join(this.baseDir, '.env');
        const envExamplePath = path.join(this.baseDir, 'env.example');
        
        if (!await fs.pathExists(envPath)) {
            if (await fs.pathExists(envExamplePath)) {
                await fs.copy(envExamplePath, envPath);
                console.log('  ✅ Created: .env (from env.example)');
            } else {
                const envContent = `# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration
PORT=3001
NODE_ENV=development

# Training Configuration
TRAINING_MODEL_NAME=gpt-3.5-turbo
TRAINING_TEMPERATURE=0.7
TRAINING_MAX_TOKENS=150

# Logging Configuration
LOG_LEVEL=info
`;
                await fs.writeFile(envPath, envContent);
                console.log('  ✅ Created: .env');
            }
        } else {
            console.log('  ℹ️  .env already exists');
        }
    }

    async validateSetup() {
        console.log('\n🔍 Validating setup...');
        
        const requiredFiles = [
            'package.json',
            'server.js',
            'services/chatbotService.js',
            'training/prepare-data.js',
            'training/validate.js',
            'data/skills-data.json'
        ];
        
        let allValid = true;
        
        for (const file of requiredFiles) {
            const filePath = path.join(this.baseDir, file);
            if (await fs.pathExists(filePath)) {
                console.log(`  ✅ ${file}`);
            } else {
                console.log(`  ❌ ${file} (missing)`);
                allValid = false;
            }
        }
        
        if (allValid) {
            console.log('\n✅ All required files are present!');
        } else {
            console.log('\n❌ Some required files are missing. Please check the setup.');
        }
        
        return allValid;
    }
}

// CLI interface
if (require.main === module) {
    const setup = new ChatbotSetup();
    
    const command = process.argv[2];
    
    switch (command) {
        case 'setup':
            setup.setup()
                .then(() => setup.validateSetup())
                .catch(console.error);
            break;
        case 'validate':
            setup.validateSetup()
                .then(isValid => {
                    if (!isValid) {
                        process.exit(1);
                    }
                })
                .catch(console.error);
            break;
        default:
            console.log('Usage: node setup.js [setup|validate]');
            console.log('  setup   - Initialize the chatbot backend');
            console.log('  validate - Check if setup is complete');
    }
}

module.exports = { ChatbotSetup };
