const fs = require('fs-extra');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const cheerio = require('cheerio');

class KnowledgeService {
    constructor() {
        this.knowledgeBase = new Map();
        this.documentsPath = process.env.DOCUMENTS_PATH || './documents';
        this.reportsPath = process.env.REPORTS_PATH || './reports';
        this.knowledgeBasePath = process.env.KNOWLEDGE_BASE_PATH || './knowledge-base';
    }

    async initialize() {
        console.log('📚 Initializing Knowledge Service...');
        
        // Ensure directories exist
        await fs.ensureDir(this.documentsPath);
        await fs.ensureDir(this.reportsPath);
        await fs.ensureDir(this.knowledgeBasePath);
        
        // Load existing knowledge base
        await this.loadKnowledgeBase();
        
        // Process documents if needed
        await this.processDocuments();
        
        console.log('✅ Knowledge Service initialized');
    }

    async loadKnowledgeBase() {
        const knowledgeBaseFile = path.join(this.knowledgeBasePath, 'knowledge-base.json');
        
        if (await fs.pathExists(knowledgeBaseFile)) {
            const data = await fs.readJson(knowledgeBaseFile);
            this.knowledgeBase = new Map(Object.entries(data));
            console.log(`📖 Loaded ${this.knowledgeBase.size} knowledge entries`);
        } else {
            console.log('📖 No existing knowledge base found, will create from documents');
        }
    }

    async processDocuments() {
        console.log('📄 Processing documents...');
        
        // Process PDF files
        await this.processPDFFiles();
        
        // Process Word documents
        await this.processWordFiles();
        
        // Process text files
        await this.processTextFiles();
        
        // Save knowledge base
        await this.saveKnowledgeBase();
    }

    async processPDFFiles() {
        const pdfFiles = await this.findFiles(this.documentsPath, '.pdf');
        const reportFiles = await this.findFiles(this.reportsPath, '.pdf');
        
        for (const file of [...pdfFiles, ...reportFiles]) {
            try {
                const content = await this.extractPDFContent(file);
                await this.extractKnowledge(file, content, 'pdf');
            } catch (error) {
                console.error(`Error processing PDF ${file}:`, error.message);
            }
        }
    }

    async processWordFiles() {
        const docxFiles = await this.findFiles(this.documentsPath, '.docx');
        const reportFiles = await this.findFiles(this.reportsPath, '.docx');
        
        for (const file of [...docxFiles, ...reportFiles]) {
            try {
                const content = await this.extractWordContent(file);
                await this.extractKnowledge(file, content, 'docx');
            } catch (error) {
                console.error(`Error processing Word document ${file}:`, error.message);
            }
        }
    }

    async processTextFiles() {
        const textFiles = await this.findFiles(this.documentsPath, '.txt');
        const reportFiles = await this.findFiles(this.reportsPath, '.txt');
        
        for (const file of [...textFiles, ...reportFiles]) {
            try {
                const content = await fs.readFile(file, 'utf-8');
                await this.extractKnowledge(file, content, 'txt');
            } catch (error) {
                console.error(`Error processing text file ${file}:`, error.message);
            }
        }
    }

    async findFiles(directory, extension) {
        const files = [];
        
        if (!await fs.pathExists(directory)) {
            return files;
        }
        
        const items = await fs.readdir(directory);
        
        for (const item of items) {
            const fullPath = path.join(directory, item);
            const stat = await fs.stat(fullPath);
            
            if (stat.isDirectory()) {
                const subFiles = await this.findFiles(fullPath, extension);
                files.push(...subFiles);
            } else if (item.toLowerCase().endsWith(extension)) {
                files.push(fullPath);
            }
        }
        
        return files;
    }

    async extractPDFContent(filePath) {
        const dataBuffer = await fs.readFile(filePath);
        const data = await pdfParse(dataBuffer);
        return data.text;
    }

    async extractWordContent(filePath) {
        const result = await mammoth.extractRawText({ path: filePath });
        return result.value;
    }

    async extractKnowledge(filePath, content, fileType) {
        const fileName = path.basename(filePath, path.extname(filePath));
        
        // Extract key information using simple NLP
        const knowledge = {
            source: fileName,
            type: fileType,
            content: content,
            skills: this.extractSkills(content),
            projects: this.extractProjects(content),
            technologies: this.extractTechnologies(content),
            insights: this.extractInsights(content),
            summary: this.generateSummary(content),
            timestamp: new Date().toISOString()
        };
        
        this.knowledgeBase.set(fileName, knowledge);
        console.log(`📝 Extracted knowledge from ${fileName}`);
    }

    extractSkills(content) {
        const skillKeywords = [
            'python', 'javascript', 'java', 'c++', 'c#', 'react', 'node.js',
            'machine learning', 'deep learning', 'computer vision', 'robotics',
            'ros', 'opencv', 'tensorflow', 'pytorch', 'docker', 'kubernetes',
            'aws', 'azure', 'gcp', 'git', 'agile', 'scrum'
        ];
        
        const foundSkills = [];
        const lowerContent = content.toLowerCase();
        
        for (const skill of skillKeywords) {
            if (lowerContent.includes(skill)) {
                foundSkills.push(skill);
            }
        }
        
        return foundSkills;
    }

    extractProjects(content) {
        // Simple project extraction - looks for project-related keywords
        const projectKeywords = ['project', 'developed', 'built', 'created', 'implemented', 'designed'];
        const sentences = content.split(/[.!?]+/);
        const projectSentences = [];
        
        for (const sentence of sentences) {
            const lowerSentence = sentence.toLowerCase();
            if (projectKeywords.some(keyword => lowerSentence.includes(keyword))) {
                projectSentences.push(sentence.trim());
            }
        }
        
        return projectSentences.slice(0, 5); // Limit to 5 most relevant
    }

    extractTechnologies(content) {
        const techKeywords = [
            'api', 'database', 'sql', 'nosql', 'mongodb', 'postgresql',
            'html', 'css', 'bootstrap', 'tailwind', 'vue', 'angular',
            'express', 'django', 'flask', 'spring', 'laravel'
        ];
        
        const foundTech = [];
        const lowerContent = content.toLowerCase();
        
        for (const tech of techKeywords) {
            if (lowerContent.includes(tech)) {
                foundTech.push(tech);
            }
        }
        
        return foundTech;
    }

    extractInsights(content) {
        // Extract insights by looking for reflective or analytical language
        const insightKeywords = ['learned', 'discovered', 'realized', 'found', 'concluded', 'observed'];
        const sentences = content.split(/[.!?]+/);
        const insights = [];
        
        for (const sentence of sentences) {
            const lowerSentence = sentence.toLowerCase();
            if (insightKeywords.some(keyword => lowerSentence.includes(keyword))) {
                insights.push(sentence.trim());
            }
        }
        
        return insights.slice(0, 3); // Limit to 3 most relevant
    }

    generateSummary(content) {
        // Simple summary generation - take first few sentences
        const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10);
        return sentences.slice(0, 3).join('. ') + '.';
    }

    async saveKnowledgeBase() {
        const knowledgeBaseFile = path.join(this.knowledgeBasePath, 'knowledge-base.json');
        const data = Object.fromEntries(this.knowledgeBase);
        await fs.writeJson(knowledgeBaseFile, data, { spaces: 2 });
        console.log(`💾 Saved knowledge base with ${this.knowledgeBase.size} entries`);
    }

    async searchKnowledge(query) {
        const results = [];
        const lowerQuery = query.toLowerCase();
        
        for (const [key, knowledge] of this.knowledgeBase) {
            let relevance = 0;
            
            // Check content relevance
            if (knowledge.content.toLowerCase().includes(lowerQuery)) {
                relevance += 3;
            }
            
            // Check skills relevance
            if (knowledge.skills.some(skill => skill.toLowerCase().includes(lowerQuery))) {
                relevance += 2;
            }
            
            // Check projects relevance
            if (knowledge.projects.some(project => project.toLowerCase().includes(lowerQuery))) {
                relevance += 2;
            }
            
            // Check technologies relevance
            if (knowledge.technologies.some(tech => tech.toLowerCase().includes(lowerQuery))) {
                relevance += 1;
            }
            
            if (relevance > 0) {
                results.push({
                    source: key,
                    relevance: relevance,
                    knowledge: knowledge
                });
            }
        }
        
        // Sort by relevance
        results.sort((a, b) => b.relevance - a.relevance);
        return results.slice(0, 5); // Return top 5 most relevant
    }

    async getKnowledgeContext(query) {
        const searchResults = await this.searchKnowledge(query);
        
        if (searchResults.length === 0) {
            return "I don't have specific information about that topic in my knowledge base.";
        }
        
        let context = "Based on my experience and documentation:\n\n";
        
        for (const result of searchResults) {
            context += `From ${result.knowledge.source}:\n`;
            context += `- Summary: ${result.knowledge.summary}\n`;
            
            if (result.knowledge.skills.length > 0) {
                context += `- Skills: ${result.knowledge.skills.join(', ')}\n`;
            }
            
            if (result.knowledge.projects.length > 0) {
                context += `- Projects: ${result.knowledge.projects.slice(0, 2).join('; ')}\n`;
            }
            
            if (result.knowledge.insights.length > 0) {
                context += `- Insights: ${result.knowledge.insights.slice(0, 1).join('; ')}\n`;
            }
            
            context += '\n';
        }
        
        return context;
    }

    async addDocument(filePath, category = 'general') {
        try {
            const fileName = path.basename(filePath, path.extname(filePath));
            const extension = path.extname(filePath).toLowerCase();
            
            let content = '';
            
            switch (extension) {
                case '.pdf':
                    content = await this.extractPDFContent(filePath);
                    break;
                case '.docx':
                    content = await this.extractWordContent(filePath);
                    break;
                case '.txt':
                    content = await fs.readFile(filePath, 'utf-8');
                    break;
                default:
                    throw new Error(`Unsupported file type: ${extension}`);
            }
            
            await this.extractKnowledge(filePath, content, extension.slice(1));
            await this.saveKnowledgeBase();
            
            return { success: true, fileName, category };
        } catch (error) {
            console.error(`Error adding document ${filePath}:`, error.message);
            return { success: false, error: error.message };
        }
    }
}

module.exports = { KnowledgeService };
