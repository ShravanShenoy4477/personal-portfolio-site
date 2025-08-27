const { ChatbotService } = require('./services/chatbotService');
const fs = require('fs-extra');
const path = require('path');

async function testKnowledgeSystem() {
    console.log('🧠 Testing Knowledge-Based Chatbot System...\n');
    
    const chatbot = new ChatbotService();
    
    try {
        // Initialize the service
        await chatbot.initialize();
        console.log('✅ Service initialized successfully');
        
        // Test knowledge base stats
        const stats = await chatbot.getKnowledgeBaseStats();
        console.log('\n📊 Knowledge Base Statistics:');
        console.log(`- Total Documents: ${stats.totalDocuments}`);
        console.log(`- Skills Found: ${stats.skillsFound.length}`);
        console.log(`- Technologies: ${stats.technologiesFound.length}`);
        console.log(`- Document Types: ${Object.entries(stats.documentTypes).map(([type, count]) => `${type}: ${count}`).join(', ')}`);
        
        // Test knowledge search
        console.log('\n🔍 Testing Knowledge Search...');
        const searchResults = await chatbot.searchKnowledge('python');
        console.log(`Found ${searchResults.length} relevant documents for 'python'`);
        
        // Test chatbot responses
        console.log('\n💬 Testing Chatbot Responses...');
        
        const testCases = [
            {
                skill: { name: 'Python' },
                message: 'What experience do you have with Python?'
            },
            {
                skill: { name: 'Machine Learning' },
                message: 'Tell me about your machine learning projects'
            },
            {
                skill: { name: 'Robotics' },
                message: 'What robotics work have you done?'
            }
        ];
        
        for (let i = 0; i < testCases.length; i++) {
            const testCase = testCases[i];
            console.log(`\nTest ${i + 1}: ${testCase.message}`);
            console.log(`Skill: ${testCase.skill.name}`);
            
            try {
                const start = Date.now();
                const response = await chatbot.generateResponse(
                    testCase.message,
                    testCase.skill
                );
                const end = Date.now();
                
                console.log(`Response: ${response.substring(0, 200)}...`);
                console.log(`Time: ${end - start}ms`);
            } catch (error) {
                console.error(`Error: ${error.message}`);
            }
        }
        
        console.log('\n✅ Knowledge system testing completed!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// CLI interface
if (require.main === module) {
    testKnowledgeSystem().catch(console.error);
}

module.exports = { testKnowledgeSystem };
