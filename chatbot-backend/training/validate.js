const fs = require('fs-extra');
const path = require('path');
const { ChatbotService } = require('../services/chatbotService');

class ChatbotValidator {
    constructor() {
        this.chatbotService = new ChatbotService();
        this.testCases = this.loadTestCases();
    }

    loadTestCases() {
        return [
            {
                name: 'Experience Level Questions',
                tests: [
                    {
                        skill: { name: 'Python' },
                        input: 'What\'s your experience level with Python?',
                        expectedKeywords: ['advanced', 'years', 'experience']
                    },
                    {
                        skill: { name: 'C++' },
                        input: 'How good are you at C++?',
                        expectedKeywords: ['intermediate', 'years', 'projects']
                    }
                ]
            },
            {
                name: 'Project Questions',
                tests: [
                    {
                        skill: { name: 'Python' },
                        input: 'What projects have you done with Python?',
                        expectedKeywords: ['robot', 'vision', 'machine learning']
                    },
                    {
                        skill: { name: 'C++' },
                        input: 'What did you build with C++?',
                        expectedKeywords: ['control', 'embedded', 'systems']
                    }
                ]
            },
            {
                name: 'Technical Questions',
                tests: [
                    {
                        skill: { name: 'Python' },
                        input: 'Tell me about your Python skills',
                        expectedKeywords: ['python', 'experience', 'projects']
                    },
                    {
                        skill: { name: 'JavaScript' },
                        input: 'How long have you been using JavaScript?',
                        expectedKeywords: ['javascript', 'years', 'web']
                    }
                ]
            }
        ];
    }

    async runValidation() {
        console.log('🤖 Starting Chatbot Validation...\n');
        
        const results = {
            totalTests: 0,
            passedTests: 0,
            failedTests: 0,
            testResults: []
        };

        for (const testCategory of this.testCases) {
            console.log(`📋 Testing: ${testCategory.name}`);
            
            for (const test of testCategory.tests) {
                results.totalTests++;
                
                try {
                    const response = await this.chatbotService.generateResponse(
                        test.input,
                        test.skill
                    );
                    
                    const isValid = this.validateResponse(response, test);
                    
                    if (isValid) {
                        results.passedTests++;
                        console.log(`  ✅ PASS: "${test.input}"`);
                    } else {
                        results.failedTests++;
                        console.log(`  ❌ FAIL: "${test.input}"`);
                        console.log(`     Response: "${response}"`);
                        console.log(`     Expected keywords: ${test.expectedKeywords.join(', ')}`);
                    }
                    
                    results.testResults.push({
                        category: testCategory.name,
                        test: test.input,
                        response: response,
                        passed: isValid,
                        expectedKeywords: test.expectedKeywords
                    });
                    
                } catch (error) {
                    results.failedTests++;
                    console.log(`  ❌ ERROR: "${test.input}" - ${error.message}`);
                    
                    results.testResults.push({
                        category: testCategory.name,
                        test: test.input,
                        response: null,
                        passed: false,
                        error: error.message
                    });
                }
            }
            console.log('');
        }

        this.printResults(results);
        return results;
    }

    validateResponse(response, test) {
        if (!response || typeof response !== 'string') {
            return false;
        }

        const lowerResponse = response.toLowerCase();
        const lowerSkill = test.skill.name.toLowerCase();
        
        // Check if response mentions the skill
        if (!lowerResponse.includes(lowerSkill)) {
            return false;
        }

        // Check if response contains expected keywords
        const hasExpectedKeywords = test.expectedKeywords.some(keyword => 
            lowerResponse.includes(keyword.toLowerCase())
        );

        return hasExpectedKeywords;
    }

    printResults(results) {
        console.log('📊 Validation Results:');
        console.log(`Total Tests: ${results.totalTests}`);
        console.log(`Passed: ${results.passedTests}`);
        console.log(`Failed: ${results.failedTests}`);
        console.log(`Success Rate: ${((results.passedTests / results.totalTests) * 100).toFixed(1)}%`);
        
        if (results.failedTests > 0) {
            console.log('\n❌ Failed Tests:');
            results.testResults
                .filter(r => !r.passed)
                .forEach(result => {
                    console.log(`  - ${result.test}`);
                    if (result.response) {
                        console.log(`    Response: "${result.response}"`);
                    }
                    if (result.error) {
                        console.log(`    Error: ${result.error}`);
                    }
                });
        }
        
        console.log('\n🎯 Recommendations:');
        if (results.passedTests === results.totalTests) {
            console.log('  ✅ All tests passed! The chatbot is working well.');
        } else if (results.passedTests / results.totalTests >= 0.8) {
            console.log('  ⚠️  Most tests passed. Consider fine-tuning for better accuracy.');
        } else {
            console.log('  ❌ Many tests failed. The chatbot needs significant improvement.');
            console.log('     - Check training data quality');
            console.log('     - Verify skills data is complete');
            console.log('     - Consider retraining the model');
        }
    }

    async generateTestReport() {
        const results = await this.runValidation();
        
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                totalTests: results.totalTests,
                passedTests: results.passedTests,
                failedTests: results.failedTests,
                successRate: (results.passedTests / results.totalTests) * 100
            },
            details: results.testResults
        };

        const reportPath = path.join(__dirname, '../reports/validation-report.json');
        await fs.ensureDir(path.dirname(reportPath));
        await fs.writeJson(reportPath, report, { spaces: 2 });
        
        console.log(`\n📄 Detailed report saved to: ${reportPath}`);
        
        return report;
    }

    async testResponseTime() {
        console.log('\n⏱️  Testing Response Times...');
        
        const testSkill = { name: 'Python' };
        const testInput = 'What\'s your experience with Python?';
        const iterations = 5;
        const times = [];

        for (let i = 0; i < iterations; i++) {
            const start = Date.now();
            await this.chatbotService.generateResponse(testInput, testSkill);
            const end = Date.now();
            times.push(end - start);
            
            console.log(`  Test ${i + 1}: ${times[i]}ms`);
        }

        const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
        const minTime = Math.min(...times);
        const maxTime = Math.max(...times);

        console.log(`\n📈 Response Time Statistics:`);
        console.log(`  Average: ${avgTime.toFixed(1)}ms`);
        console.log(`  Min: ${minTime}ms`);
        console.log(`  Max: ${maxTime}ms`);

        return { avgTime, minTime, maxTime, times };
    }
}

// CLI interface
if (require.main === module) {
    const validator = new ChatbotValidator();
    
    const command = process.argv[2];
    
    switch (command) {
        case 'validate':
            validator.runValidation()
                .then(() => console.log('Validation completed'))
                .catch(console.error);
            break;
        case 'report':
            validator.generateTestReport()
                .then(() => console.log('Report generated'))
                .catch(console.error);
            break;
        case 'performance':
            validator.testResponseTime()
                .then(() => console.log('Performance test completed'))
                .catch(console.error);
            break;
        default:
            console.log('Usage: node validate.js [validate|report|performance]');
            console.log('  validate   - Run validation tests');
            console.log('  report     - Generate detailed validation report');
            console.log('  performance - Test response times');
    }
}

module.exports = { ChatbotValidator };
