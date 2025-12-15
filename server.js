const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const apiRoutes = require('./routes/routes');
const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
app.use('/api/', rateLimiter);

// API Routes
app.use('/api', apiRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Creative AI Studio API',
    version: '1.0.0',
    ai_provider: 'Google Gemini',
    model: 'gemini-2.5-flash',
    endpoints: {
      generate: 'POST /api/generate',
      contentTypes: 'GET /api/content-types',
      health: 'GET /api/health'
    }
  });
});

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Creative AI Studio Backend running on port ${PORT}`);
  console.log(`📝 API URL: http://localhost:${PORT}`);
  console.log(`🤖 AI Provider: Google Gemini`);
  console.log(`🔧 Model: gemini-2.5-flash`);
  console.log(`🔑 API Key: ${process.env.GEMINI_API_KEY ? '✅ Configured' : '❌ Missing'}`);
  console.log(`\n💡 Get your free API key: https://aistudio.google.com/apikey`);
});

module.exports = app;
