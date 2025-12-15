const GeminiService = require('../services/gemini.service');

exports.generateContent = async (req, res, next) => {
  try {
    const {
      type = 'joke',
      keyword,
      tone = 'funny',
      length = 'medium'
    } = req.body;

    if (!keyword?.trim()) {
      return res.status(400).json({
        error: 'Keyword is required'
      });
    }

    const result = await GeminiService.generateContent({
      type,
      keyword,
      tone,
      length
    });

    res.json({
      success: true,
      result,
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
    next(error);
  }
};
