const genAI = require('../config/gemini.config');
const contentConfigs = require('../config/contentConfigs');
const lengthConfig = require('../utils/lengthConfig');

class GeminiService {
    static async generateContent({ type, keyword, tone, length }) {
        if (!contentConfigs[type]) {
            throw new Error(`Content type "${type}" is not supported.`);
        }

        const config = contentConfigs[type];
        const maxWords = lengthConfig[length] || lengthConfig.medium;

        const fullPrompt = `${config.systemPrompt}\n\n${config.userPromptTemplate(keyword, tone, length)}\n\nKeep the response under ${maxWords} words. Provide only the content, no additional explanations.`;

        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
            const result = await model.generateContent(fullPrompt);
            const response = await result.response;
            const generatedContent = response.text().trim();

            return generatedContent;
        } catch (error) {
            console.error('Gemini API Error:', error);

            if (error.message?.includes('API key')) {
                throw new Error('INVALID_API_KEY');
            }

            if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
                throw new Error('RATE_LIMIT_EXCEEDED');
            }

            throw error;
        }
    }
}

module.exports = GeminiService;
