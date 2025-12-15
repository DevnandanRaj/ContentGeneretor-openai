const express = require('express');
const controller = require('../controllers/generate.controller');
const contentConfigs = require('../config/contentConfigs');

const router = express.Router();

// Generate content
router.post('/generate', controller.generateContent);

// Get available content types
router.get('/content-types', (req, res) => {
    const types = Object.keys(contentConfigs).map(key => ({
        id: key,
        name: key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        description: contentConfigs[key].systemPrompt
    }));

    res.json({ types });
});

// Health check
router.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        ai_provider: 'Google Gemini',
        model: 'gemini-2.5-flash'
    });
});

module.exports = router;
