const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Google Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

const contentConfigs = {
  shayari: {
    systemPrompt: 'You are a talented Urdu/Hindi poet who creates beautiful, emotional Shayari. Use elegant language and poetic devices.',
    userPromptTemplate: (keyword, tone, length) =>
      `Write a ${tone} Shayari about "${keyword}". Length: ${length}. Make it heartfelt and poetic with proper verse structure.`
  },
  joke: {
    systemPrompt: 'You are a witty comedian who creates clever, appropriate jokes.',
    userPromptTemplate: (keyword, tone, length) =>
      `Tell a ${tone} joke about "${keyword}". Length: ${length}. Make it clever and entertaining.`
  },
  quote: {
    systemPrompt: 'You are an inspirational speaker who creates meaningful, memorable quotes.',
    userPromptTemplate: (keyword, tone, length) =>
      `Create a ${tone} inspirational quote about "${keyword}". Length: ${length}. Make it profound and impactful.`
  },
  story: {
    systemPrompt: 'You are a creative storyteller who weaves engaging narratives.',
    userPromptTemplate: (keyword, tone, length) =>
      `Write a ${tone} short story about "${keyword}". Length: ${length}. Make it engaging with a clear beginning, middle, and end.`
  },
  riddle: {
    systemPrompt: 'You are a master of riddles who creates challenging but solvable puzzles.',
    userPromptTemplate: (keyword, tone, length) =>
      `Create a ${tone} riddle about "${keyword}". Length: ${length}. Include the answer at the end with "Answer:" prefix.`
  },
  'pickup-line': {
    systemPrompt: 'You are a charming wordsmith who creates clever, respectful pickup lines.',
    userPromptTemplate: (keyword, tone, length) =>
      `Create a ${tone} pickup line related to "${keyword}". Length: ${length}. Keep it respectful and witty.`
  },
  roast: {
    systemPrompt: 'You are a comedy roaster who creates playful, good-natured roasts.',
    userPromptTemplate: (keyword, tone, length) =>
      `Write a ${tone} roast about "${keyword}". Length: ${length}. Keep it funny and light-hearted, not mean-spirited.`
  },
  compliment: {
    systemPrompt: 'You are a sincere person who gives genuine, thoughtful compliments.',
    userPromptTemplate: (keyword, tone, length) =>
      `Create a ${tone} compliment about "${keyword}". Length: ${length}. Make it genuine and heartwarming.`
  },
  'dad-joke': {
    systemPrompt: 'You are a dad who tells classic pun-based dad jokes.',
    userPromptTemplate: (keyword, tone, length) =>
      `Tell a dad joke about "${keyword}". Length: ${length}. Use puns and wholesome humor.`
  },
  haiku: {
    systemPrompt: 'You are a haiku master who creates traditional 5-7-5 syllable poems.',
    userPromptTemplate: (keyword, tone, length) =>
      `Write a ${tone} haiku about "${keyword}". Follow the 5-7-5 syllable structure strictly. Create ${length === 'short' ? '1' : length === 'medium' ? '2' : '3'} haiku(s).`
  },
  'rap-lyrics': {
    systemPrompt: 'You are a talented rapper who creates clever rhymes with flow.',
    userPromptTemplate: (keyword, tone, length) =>
      `Write ${tone} rap lyrics about "${keyword}". Length: ${length}. Include rhyme scheme and wordplay.`
  },
  'tweet-thread': {
    systemPrompt: 'You are a social media expert who creates engaging tweet threads.',
    userPromptTemplate: (keyword, tone, length) =>
      `Create a ${tone} tweet thread about "${keyword}". Length: ${length === 'short' ? '3 tweets' : length === 'medium' ? '5 tweets' : '8 tweets'}. Number each tweet.`
  },
  acrostic: {
    systemPrompt: 'You create beautiful acrostic poems where first letters spell out words.',
    userPromptTemplate: (keyword, tone, length) =>
      `Write a ${tone} acrostic poem using the word "${keyword}". Each line should start with letters from the keyword in order.`
  },
  'motivational-speech': {
    systemPrompt: 'You are an inspiring motivational speaker who energizes and empowers people.',
    userPromptTemplate: (keyword, tone, length) =>
      `Write a ${tone} motivational speech about "${keyword}". Length: ${length}. Make it powerful and inspiring.`
  },
};

const lengthWords = {
  short: 100,
  medium: 200,
  long: 400
};

app.post('/api/generate', async (req, res) => {
  try {
    const {
      type = 'joke',
      keyword = '',
      tone = 'funny',
      length = 'medium'
    } = req.body;

    if (!keyword || keyword.trim() === '') {
      return res.status(400).json({
        error: 'Keyword is required',
        message: 'Please provide a keyword to generate content.'
      });
    }

    if (!contentConfigs[type]) {
      return res.status(400).json({
        error: 'Invalid content type',
        message: `Content type "${type}" is not supported.`,
        supportedTypes: Object.keys(contentConfigs)
      });
    }

    const config = contentConfigs[type];
    const maxWords = lengthWords[length] || 200;

    const fullPrompt = `${config.systemPrompt}\n\n${config.userPromptTemplate(keyword, tone, length)}\n\nKeep the response under ${maxWords} words. Provide only the content, no additional explanations.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const generatedContent = response.text().trim();

    res.json({
      success: true,
      result: generatedContent,
      metadata: {
        type,
        keyword,
        tone,
        length,
        model: 'gemini-2.5-flash',
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error generating content:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);

    if (error.message?.includes('API key')) {
      return res.status(401).json({
        error: 'API key invalid',
        message: 'Gemini API key is missing or invalid. Please check your configuration.'
      });
    }

    if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'API rate limit reached. Please try again in a moment.'
      });
    }

    res.status(500).json({
      error: 'Generation failed',
      message: 'An error occurred while generating content. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.get('/api/content-types', (req, res) => {
  const types = Object.keys(contentConfigs).map(key => ({
    id: key,
    name: key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    description: contentConfigs[key].systemPrompt
  }));

  res.json({ types });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    ai_provider: 'Google Gemini',
    model: 'gemini-2.5-flash'
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Creative AI Studio API',
    version: '1.0.0',
    ai_provider: 'Google Gemini (Free)',
    model: 'gemini-2.5-flash',
    endpoints: {
      generate: 'POST /api/generate',
      contentTypes: 'GET /api/content-types',
      health: 'GET /api/health'
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong on our end.'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Creative AI Studio Backend running on port ${PORT}`);
  console.log(`📝 API URL: http://localhost:${PORT}`);
  console.log(`🤖 AI Provider: Google Gemini (Free)`);
  console.log(`🔑 Gemini API Key: ${process.env.GEMINI_API_KEY ? '✅ Configured' : '❌ Missing'}`);
  console.log(`\n💡 Get your free API key: https://aistudio.google.com/apikey`);
});

module.exports = app;
