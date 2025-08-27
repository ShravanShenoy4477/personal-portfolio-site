const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { ChatbotService } = require('./services/chatbotService');
const multer = require('multer');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const category = req.body.category || 'general';
        const uploadPath = path.join(__dirname, 'documents', category);
        require('fs-extra').ensureDirSync(uploadPath);
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        const allowedTypes = ['.pdf', '.docx', '.txt'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF, DOCX, and TXT files are allowed'));
        }
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize chatbot service
const chatbotService = new ChatbotService();

// Initialize the service when server starts
chatbotService.initialize().then(() => {
    console.log('✅ Chatbot service initialized with knowledge base');
}).catch(error => {
    console.error('❌ Failed to initialize chatbot service:', error);
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Skills Chatbot is running' });
});

// Upload interface endpoint
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'upload.html'));
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, skill, conversationHistory } = req.body;
        
        if (!message || !skill) {
            return res.status(400).json({ 
                error: 'Message and skill are required' 
            });
        }

        const response = await chatbotService.generateResponse(
            message, 
            skill, 
            conversationHistory || []
        );

        res.json({ 
            response,
            skill: skill.name,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ 
            error: 'Failed to generate response',
            details: error.message 
        });
    }
});

// Skills endpoint
app.get('/api/skills', async (req, res) => {
    try {
        const skills = await chatbotService.getAvailableSkills();
        res.json(skills);
    } catch (error) {
        console.error('Skills error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch skills',
            details: error.message 
        });
    }
});

// Knowledge base stats endpoint
app.get('/api/knowledge/stats', async (req, res) => {
    try {
        const stats = await chatbotService.getKnowledgeBaseStats();
        res.json(stats);
    } catch (error) {
        console.error('Knowledge stats error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch knowledge base stats',
            details: error.message 
        });
    }
});

// Search knowledge base endpoint
app.post('/api/knowledge/search', async (req, res) => {
    try {
        const { query } = req.body;
        
        if (!query) {
            return res.status(400).json({ 
                error: 'Query is required' 
            });
        }

        const results = await chatbotService.searchKnowledge(query);
        res.json({ results, query });
    } catch (error) {
        console.error('Knowledge search error:', error);
        res.status(500).json({ 
            error: 'Failed to search knowledge base',
            details: error.message 
        });
    }
});

// Upload document endpoint
app.post('/api/knowledge/upload', upload.single('document'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                error: 'No file uploaded' 
            });
        }

        const category = req.body.category || 'general';
        const result = await chatbotService.addDocument(req.file.path, category);
        
        if (result.success) {
            res.json({ 
                message: 'Document uploaded and processed successfully',
                fileName: result.fileName,
                category: result.category
            });
        } else {
            res.status(400).json({ 
                error: 'Failed to process document',
                details: result.error 
            });
        }
    } catch (error) {
        console.error('Document upload error:', error);
        res.status(500).json({ 
            error: 'Failed to upload document',
            details: error.message 
        });
    }
});

// Training status endpoint
app.get('/api/training/status', async (req, res) => {
    try {
        const status = await chatbotService.getTrainingStatus();
        res.json(status);
    } catch (error) {
        console.error('Training status error:', error);
        res.status(500).json({ 
            error: 'Failed to get training status',
            details: error.message 
        });
    }
});

// Start training endpoint
app.post('/api/training/start', async (req, res) => {
    try {
        const { trainingData } = req.body;
        const jobId = await chatbotService.startTraining(trainingData);
        res.json({ 
            jobId,
            message: 'Training started successfully',
            status: 'started'
        });
    } catch (error) {
        console.error('Training start error:', error);
        res.status(500).json({ 
            error: 'Failed to start training',
            details: error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Skills Chatbot server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`Upload interface: http://localhost:${PORT}/upload`);
    console.log(`Knowledge base ready for document uploads`);
});
