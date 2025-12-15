module.exports = (err, req, res, next) => {
  console.error('Error:', err);

  // Handle specific error types
  if (err.message === 'INVALID_API_KEY') {
    return res.status(401).json({
      error: 'API key invalid',
      message: 'Gemini API key is missing or invalid. Please check your configuration.'
    });
  }

  if (err.message === 'RATE_LIMIT_EXCEEDED') {
    return res.status(429).json({
      error: 'Rate limit exceeded',
      message: 'API rate limit reached. Please try again in a moment.'
    });
  }

  // Default error response
  res.status(err.status || 500).json({
    error: err.name || 'Internal server error',
    message: err.message || 'An error occurred while processing your request.',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};
