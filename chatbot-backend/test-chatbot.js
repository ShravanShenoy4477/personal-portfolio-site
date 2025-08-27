const { ChatbotService } = require('./services/chatbotService');

async function testChatbot() {
    console.log('🤖 Testing Skills Chatbot...\n');
    
    const chatbot = new ChatbotService();
    
    const testCases = [
        {
            skill: { name: 'Python' },
            message: 'What\'s your experience level with Python?'
        },
        {
            skill: { name: 'Python' },
            message: 'What projects have you done with Python?'
        },
        {
            skill: { name: 'C++' },
            message: 'How long have you been using C++?'
        },
        {
            skill: { name: 'JavaScript' },
            message: 'Tell me about your JavaScript skills'
        }
    ];
    
    for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        console.log(`Test ${i + 1}: ${testCase.message}`);
        console.log(`Skill: ${testCase.skill.name}`);
        
        try {
            const start = Date.now();
            const response = await chatbot.generateResponse(
                testCase.message,
                testCase.skill
            );
            const end = Date.now();
            
            console.log(`Response: ${response}`);
            console.log(`Time: ${end - start}ms`);
            console.log('---\n');
        } catch (error) {
            console.error(`Error: ${error.message}\n`);
        }
    }
    
    console.log('✅ Chatbot testing completed!');
}

// Run the test if this file is executed directly
if (require.main === module) {
    testChatbot().catch(console.error);
}

module.exports = { testChatbot };
