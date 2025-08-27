const fs = require('fs-extra');
const path = require('path');

class DataPreparation {
    constructor() {
        this.dataDir = path.join(__dirname, '../data');
        this.trainingDir = path.join(__dirname, '../training-data');
    }

    async prepareTrainingData() {
        try {
            console.log('Starting data preparation...');
            
            // Ensure directories exist
            await fs.ensureDir(this.dataDir);
            await fs.ensureDir(this.trainingDir);

            // Load existing skills data
            const skillsData = await this.loadSkillsData();
            
            // Generate training examples
            const trainingExamples = await this.generateTrainingExamples(skillsData);
            
            // Save training data
            await this.saveTrainingData(trainingExamples);
            
            console.log('Data preparation completed successfully!');
            return trainingExamples;
        } catch (error) {
            console.error('Error preparing training data:', error);
            throw error;
        }
    }

    async loadSkillsData() {
        const skillsPath = path.join(this.dataDir, 'skills-data.json');
        
        if (await fs.pathExists(skillsPath)) {
            return await fs.readJson(skillsPath);
        }
        
        // Return default data if file doesn't exist
        return {
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
                }
            ]
        };
    }

    async generateTrainingExamples(skillsData) {
        const examples = [];
        
        for (const skill of skillsData.skills) {
            const skillExamples = this.generateSkillExamples(skill);
            examples.push(...skillExamples);
        }
        
        return examples;
    }

    generateSkillExamples(skill) {
        const examples = [];
        
        // Example 1: Experience level question
        examples.push({
            input: `What's your experience level with ${skill.name}?`,
            output: `I have ${skill.level.toLowerCase()} level experience with ${skill.name}, having worked with it for about ${skill.years} years. ${skill.experience}`
        });

        // Example 2: Projects question
        examples.push({
            input: `What projects have you done with ${skill.name}?`,
            output: `I've worked on several projects using ${skill.name}, including: ${skill.projects.join(', ')}. These projects involved ${skill.experience.toLowerCase()}`
        });

        // Example 3: Years of experience
        examples.push({
            input: `How long have you been using ${skill.name}?`,
            output: `I've been using ${skill.name} for about ${skill.years} years. My experience includes ${skill.projects.join(', ')}.`
        });

        // Example 4: Technical details
        examples.push({
            input: `Tell me about your ${skill.name} skills`,
            output: `I have ${skill.level.toLowerCase()} proficiency in ${skill.name} with ${skill.years} years of experience. I've used it for ${skill.projects.join(', ')}. ${skill.experience}`
        });

        // Example 5: Specific project details
        examples.push({
            input: `What did you build with ${skill.name}?`,
            output: `With ${skill.name}, I've built ${skill.projects.join(', ')}. These projects involved ${skill.experience.toLowerCase()}`
        });

        // Example 6: Skill comparison
        examples.push({
            input: `How good are you at ${skill.name}?`,
            output: `I'd say I'm at a ${skill.level.toLowerCase()} level with ${skill.name}. I've been using it for ${skill.years} years on projects like ${skill.projects.join(', ')}.`
        });

        return examples;
    }

    async saveTrainingData(examples) {
        const trainingData = {
            version: '1.0.0',
            created: new Date().toISOString(),
            examples: examples,
            metadata: {
                totalExamples: examples.length,
                skills: [...new Set(examples.map(ex => this.extractSkillFromExample(ex)))]
            }
        };

        const outputPath = path.join(this.trainingDir, 'training-data.json');
        await fs.writeJson(outputPath, trainingData, { spaces: 2 });
        
        console.log(`Training data saved to ${outputPath}`);
        console.log(`Total examples: ${examples.length}`);
    }

    extractSkillFromExample(example) {
        // Simple extraction - in practice, you might want more sophisticated parsing
        const skillMatch = example.input.match(/with (\w+)\?/);
        return skillMatch ? skillMatch[1] : 'Unknown';
    }

    async validateTrainingData() {
        try {
            const trainingPath = path.join(this.trainingDir, 'training-data.json');
            
            if (!await fs.pathExists(trainingPath)) {
                console.log('No training data found. Run prepare-data first.');
                return false;
            }

            const trainingData = await fs.readJson(trainingPath);
            
            // Basic validation
            const isValid = trainingData.examples && 
                          Array.isArray(trainingData.examples) &&
                          trainingData.examples.length > 0 &&
                          trainingData.examples.every(ex => ex.input && ex.output);

            if (isValid) {
                console.log('Training data validation passed!');
                console.log(`Found ${trainingData.examples.length} examples`);
                return true;
            } else {
                console.log('Training data validation failed!');
                return false;
            }
        } catch (error) {
            console.error('Error validating training data:', error);
            return false;
        }
    }
}

// CLI interface
if (require.main === module) {
    const dataPrep = new DataPreparation();
    
    const command = process.argv[2];
    
    switch (command) {
        case 'prepare':
            dataPrep.prepareTrainingData()
                .then(() => console.log('Data preparation completed'))
                .catch(console.error);
            break;
        case 'validate':
            dataPrep.validateTrainingData()
                .then(isValid => {
                    if (isValid) {
                        console.log('✅ Training data is valid');
                    } else {
                        console.log('❌ Training data validation failed');
                        process.exit(1);
                    }
                })
                .catch(console.error);
            break;
        default:
            console.log('Usage: node prepare-data.js [prepare|validate]');
            console.log('  prepare  - Generate training data from skills');
            console.log('  validate - Validate existing training data');
    }
}

module.exports = { DataPreparation };
