# Skills Chatbot Backend with Knowledge Base

A sophisticated chatbot system that uses Google Gemini to provide intelligent responses based on your actual documentation, internship reports, and insights. This system automatically extracts knowledge from your documents and uses it to answer recruiter questions.

## 🚀 **How It Works**

### **Knowledge-Based Architecture**

Instead of predefined responses, this system:

1. **📚 Processes Your Documents**: Uploads PDFs, Word docs, and text files
2. **🔍 Extracts Knowledge**: Automatically identifies skills, projects, technologies, and insights
3. **🧠 Uses Gemini AI**: Leverages Google's Gemini model for intelligent reasoning
4. **💬 Generates Contextual Responses**: Answers based on your actual documented experience

### **Data Flow**
```
Your Documents → Knowledge Extraction → Gemini AI → Intelligent Responses
```

## 🎯 **Key Features**

- **📄 Document Processing**: Handles PDF, DOCX, and TXT files
- **🔍 Smart Knowledge Extraction**: Identifies skills, projects, technologies automatically
- **🤖 Google Gemini Integration**: Uses state-of-the-art AI for reasoning
- **📊 Knowledge Base Statistics**: Track what information has been extracted
- **🎨 Web Upload Interface**: Easy document upload through browser
- **🔍 Semantic Search**: Find relevant information across all documents

## 📁 **Project Structure**

```
chatbot-backend/
├── server.js                    # Main server with API endpoints
├── services/
│   ├── chatbotService.js        # Gemini AI integration
│   └── knowledgeService.js      # Document processing & knowledge extraction
├── public/
│   └── upload.html             # Web interface for document uploads
├── documents/                  # Uploaded documents (auto-created)
├── knowledge-base/             # Extracted knowledge (auto-created)
├── data/
│   └── skills-data.json        # Skills metadata
└── package.json
```

## 🛠️ **Setup**

### **1. Install Dependencies**
```bash
cd chatbot-backend
npm install
```

### **2. Configure Environment**
```bash
cp env.example .env
```

Edit `.env`:
```env
# Google Gemini API Configuration
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here

# Server Configuration
PORT=3001
NODE_ENV=development

# Knowledge Base Configuration
KNOWLEDGE_BASE_PATH=./knowledge-base
DOCUMENTS_PATH=./documents
REPORTS_PATH=./reports
```

### **3. Get Google Gemini API Key**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file

### **4. Start the Server**
```bash
npm start
```

## 📚 **Using the Knowledge Base**

### **Upload Your Documents**

1. **Via Web Interface**: Visit `http://localhost:3001/upload`
2. **Via API**: Use the `/api/knowledge/upload` endpoint

### **Supported File Types**
- **PDF**: Internship reports, research papers, documentation
- **DOCX**: Word documents, project reports
- **TXT**: Plain text files, notes, insights

### **Document Categories**
- **Internships**: Your internship experiences and reports
- **Projects**: Project documentation and write-ups
- **Reports**: Technical reports and analyses
- **Documentation**: Code documentation, technical specs
- **Insights**: Personal insights and learnings
- **General**: Any other relevant documents

## 🔍 **Knowledge Extraction**

The system automatically extracts:

### **Skills Identified**
- Programming languages (Python, JavaScript, C++, etc.)
- Frameworks (React, Node.js, TensorFlow, etc.)
- Technologies (Docker, AWS, Git, etc.)
- Concepts (Machine Learning, Computer Vision, etc.)

### **Projects Extracted**
- Sentences mentioning "developed", "built", "created"
- Project descriptions and outcomes
- Technical implementations

### **Technologies Found**
- APIs, databases, frameworks
- Tools and platforms used
- Technical stack information

### **Insights Captured**
- Learning moments ("learned", "discovered")
- Realizations and conclusions
- Personal growth insights

## 🤖 **How the Chatbot Works**

### **Response Generation Process**

1. **User asks a question** about a skill or experience
2. **System searches knowledge base** for relevant information
3. **Gemini AI receives context** from your actual documents
4. **AI generates response** based on your documented experience
5. **Response is contextual** and specific to your background

### **Example Flow**
```
User: "What's your experience with Python?"
System: Searches knowledge base for Python mentions
Found: "Developed autonomous robot using Python and ROS"
Gemini: "Based on my documentation, I have extensive experience with Python, particularly in robotics applications. I developed an autonomous robot navigation system using Python and ROS..."
```

## 🎯 **API Endpoints**

### **Chat Endpoint**
```http
POST /api/chat
{
  "message": "What's your experience with Python?",
  "skill": { "name": "Python" },
  "conversationHistory": []
}
```

### **Knowledge Base Stats**
```http
GET /api/knowledge/stats
```

### **Search Knowledge Base**
```http
POST /api/knowledge/search
{
  "query": "machine learning"
}
```

### **Upload Document**
```http
POST /api/knowledge/upload
Content-Type: multipart/form-data
document: [file]
category: "internships"
```

## 📊 **Knowledge Base Statistics**

The system tracks:
- **Total Documents**: Number of processed files
- **Document Types**: PDF, DOCX, TXT counts
- **Skills Found**: All identified skills across documents
- **Technologies**: All technologies mentioned
- **Processing Status**: Success/failure rates

## 🔧 **Customization**

### **Adding New Skills**
The system automatically detects skills, but you can enhance detection by modifying `knowledgeService.js`:

```javascript
extractSkills(content) {
    const skillKeywords = [
        // Add your specific skills here
        'your-skill-name'
    ];
    // ... rest of the function
}
```

### **Custom Knowledge Extraction**
Modify the extraction methods in `knowledgeService.js`:
- `extractProjects()`: Customize project detection
- `extractTechnologies()`: Add new technology keywords
- `extractInsights()`: Define what constitutes an insight

## 🚀 **Deployment**

### **Local Development**
```bash
npm run dev
```

### **Production**
```bash
npm start
```

### **Environment Variables**
Ensure all required environment variables are set:
- `GOOGLE_GEMINI_API_KEY`
- `PORT`
- `NODE_ENV`

## 🔍 **Troubleshooting**

### **Common Issues**

1. **API Key Issues**: Ensure your Gemini API key is valid
2. **Document Processing**: Check file format and size
3. **Knowledge Extraction**: Verify document content quality
4. **Response Quality**: Use the search endpoint to test knowledge base

### **Debug Mode**
Enable detailed logging by setting `LOG_LEVEL=debug` in your environment.

## 📈 **Performance Optimization**

- **Document Processing**: Files are processed once and cached
- **Knowledge Search**: Optimized relevance scoring
- **Response Generation**: Context-aware prompting for faster responses
- **Memory Management**: Efficient knowledge base storage

## 🔄 **Workflow for Recruiters**

1. **Upload Documents**: Add your internship reports, project docs, insights
2. **System Learns**: AI extracts knowledge from your documents
3. **Recruiter Asks**: Questions about your experience
4. **AI Responds**: Based on your actual documented experience
5. **Contextual Answers**: Specific to your background and projects

## 🎯 **Benefits**

### **For You**
- **Authentic Responses**: Based on your real experience
- **Comprehensive Coverage**: All your documented work
- **Easy Maintenance**: Just upload new documents
- **Scalable**: Handles growing experience over time

### **For Recruiters**
- **Detailed Answers**: Specific project examples
- **Authentic Information**: Based on actual documentation
- **Comprehensive View**: Full picture of your capabilities
- **Interactive Experience**: Natural conversation flow

## 🤝 **Support**

For issues and questions:
1. Check the troubleshooting section
2. Review knowledge base statistics
3. Test with the search endpoint
4. Verify document processing
5. Check Gemini API status

---

**This system transforms your documentation into an intelligent, conversational representation of your experience!**
