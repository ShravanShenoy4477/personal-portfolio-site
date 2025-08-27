const fs = require('fs-extra');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { KnowledgeService } = require('./knowledgeService');

class ChatbotService {
    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({ 
            model: process.env.GEMINI_MODEL_NAME || 'gemini-2.5-flash',
            generationConfig: {
                temperature: parseFloat(process.env.GEMINI_TEMPERATURE) || 0.7,
                maxOutputTokens: parseInt(process.env.GEMINI_MAX_TOKENS) || 2048,
            }
        });

        this.knowledgeService = new KnowledgeService();
        this.skillsData = this.loadSkillsData();
        this.trainingStatus = {
            isTraining: false,
            progress: 0,
            currentJob: null
        };
    }

    async initialize() {
        await this.knowledgeService.initialize();
    }

    loadSkillsData() {
        try {
            const dataPath = path.join(__dirname, '../data/skills-data.json');
            if (fs.existsSync(dataPath)) {
                return fs.readJsonSync(dataPath);
            }
            return this.getDefaultSkillsData();
        } catch (error) {
            console.error('Error loading skills data:', error);
            return this.getDefaultSkillsData();
        }
    }

    getDefaultSkillsData() {
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
                }
            ]
        };
    }

    async generateResponse(message, skill, conversationHistory = []) {
        try {
            // First, search the knowledge base for relevant information
            const knowledgeContext = await this.knowledgeService.getKnowledgeContext(message);
            
            // Find skill data
            const skillData = this.skillsData.skills.find(s => 
                s.name.toLowerCase() === skill.name.toLowerCase()
            );

            if (!skillData && knowledgeContext.includes("don't have specific information")) {
                return `I don't have specific information about ${skill.name} in my knowledge base. Could you ask about a skill I'm familiar with, or would you like me to search through my documentation for related information?`;
            }

            // Create enhanced system prompt with knowledge context
            const systemPrompt = this.createEnhancedSystemPrompt(skillData, knowledgeContext);
            
            // Create conversation context
            let conversationText = '';
            if (conversationHistory.length > 0) {
                conversationText = '\n\nPrevious conversation:\n';
                conversationHistory.forEach(msg => {
                    conversationText += `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
                });
            }

            // Generate response using Gemini directly
            const prompt = `${systemPrompt}\n\n${conversationText}\n\nUser: ${message}\n\nAssistant:`;
            
            const result = await this.model.generateContent(prompt);
            const response = result.response.text();
            
            return response;
        } catch (error) {
            console.error('Error generating response:', error);
            return "I'm having trouble processing your request right now. Please try again.";
        }
    }

    createEnhancedSystemPrompt(skillData, knowledgeContext) {
        let prompt = `You are a helpful assistant that explains technical skills and experience based on real documentation and reports. 
You have access to detailed knowledge about the user's actual experiences and projects.

${knowledgeContext}

`;

        if (skillData) {
            prompt += `Additional Skill Information:
- Name: ${skillData.name}
- Level: ${skillData.level}
- Years of Experience: ${skillData.years}
- Key Projects: ${skillData.projects.join(', ')}
- Experience Summary: ${skillData.experience}
- Keywords: ${skillData.keywords.join(', ')}

`;
        }

        prompt += `Guidelines:
1. Be conversational and friendly
2. Provide specific examples from the documentation when available
3. Keep responses concise but informative
4. If asked about experience level, mention years and specific projects
5. If asked about projects, provide details from the documentation
6. If asked about technical details, explain in accessible terms
7. Always relate back to actual documented experience
8. If the knowledge base has relevant information, prioritize that over generic responses
9. Be honest about what you know and don't know
10. Suggest related topics or skills that might be relevant

Respond naturally as if you're the person who has this experience, using the documentation and reports as your source of truth.`;

        return prompt;
    }

    async getAvailableSkills() {
        return this.skillsData.skills.map(skill => ({
            name: skill.name,
            level: skill.level,
            years: skill.years
        }));
    }

    async getKnowledgeBaseStats() {
        const stats = {
            totalDocuments: this.knowledgeService.knowledgeBase.size,
            documentTypes: {},
            skillsFound: new Set(),
            technologiesFound: new Set()
        };

        for (const [key, knowledge] of this.knowledgeService.knowledgeBase) {
            // Count document types
            stats.documentTypes[knowledge.type] = (stats.documentTypes[knowledge.type] || 0) + 1;
            
            // Collect skills and technologies
            knowledge.skills.forEach(skill => stats.skillsFound.add(skill));
            knowledge.technologies.forEach(tech => stats.technologiesFound.add(tech));
        }

        return {
            totalDocuments: stats.totalDocuments,
            documentTypes: stats.documentTypes,
            skillsFound: Array.from(stats.skillsFound),
            technologiesFound: Array.from(stats.technologiesFound)
        };
    }

    async searchKnowledge(query) {
        return await this.knowledgeService.searchKnowledge(query);
    }

    async addDocument(filePath, category = 'general') {
        return await this.knowledgeService.addDocument(filePath, category);
    }

    async getTrainingStatus() {
        return this.trainingStatus;
    }

    async startTraining(trainingData) {
        if (this.trainingStatus.isTraining) {
            throw new Error('Training already in progress');
        }

        const jobId = `training_${Date.now()}`;
        
        this.trainingStatus = {
            isTraining: true,
            progress: 0,
            currentJob: jobId
        };

        // Start training in background
        this.runTraining(trainingData, jobId);

        return jobId;
    }

    async runTraining(trainingData, jobId) {
        try {
            console.log(`Starting training job ${jobId}`);
            
            // Simulate training steps
            const steps = [
                'Preparing training data...',
                'Validating data format...',
                'Fine-tuning model...',
                'Evaluating performance...',
                'Saving model...'
            ];

            for (let i = 0; i < steps.length; i++) {
                this.trainingStatus.progress = (i / steps.length) * 100;
                console.log(steps[i]);
                await new Promise(resolve => setTimeout(resolve, 2000));
            }

            // Update skills data with new training data
            await this.updateSkillsData(trainingData);
            
            this.trainingStatus = {
                isTraining: false,
                progress: 100,
                currentJob: jobId
            };

            console.log(`Training job ${jobId} completed successfully`);
        } catch (error) {
            console.error(`Training job ${jobId} failed:`, error);
            this.trainingStatus = {
                isTraining: false,
                progress: 0,
                currentJob: jobId,
                error: error.message
            };
        }
    }

    async updateSkillsData(newData) {
        try {
            // Merge new data with existing data
            const updatedSkills = [...this.skillsData.skills];
            
            newData.skills.forEach(newSkill => {
                const existingIndex = updatedSkills.findIndex(s => 
                    s.name.toLowerCase() === newSkill.name.toLowerCase()
                );
                
                if (existingIndex >= 0) {
                    updatedSkills[existingIndex] = {
                        ...updatedSkills[existingIndex],
                        ...newSkill
                    };
                } else {
                    updatedSkills.push(newSkill);
                }
            });

            this.skillsData.skills = updatedSkills;
            
            // Save to file
            const dataPath = path.join(__dirname, '../data/skills-data.json');
            await fs.ensureDir(path.dirname(dataPath));
            await fs.writeJson(dataPath, this.skillsData, { spaces: 2 });
            
            console.log('Skills data updated successfully');
        } catch (error) {
            console.error('Error updating skills data:', error);
            throw error;
        }
    }
}

module.exports = { ChatbotService };
