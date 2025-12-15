# Creative AI Studio - Backend API

Node.js/Express backend for the Creative AI Studio content generation application.

## ✨ Powered by Google Gemini (FREE!)

This backend uses **Google's Gemini AI** (gemini-2.5-flash model) which is **completely free** with generous rate limits.

## Features

- 🤖 Google Gemini 2.5 Flash integration (FREE tier)
- 🎨 14+ content types supported
- 🎯 Tone customization (funny, serious, romantic, motivational)
- 📏 Length control (short, medium, long)
- 🛡️ Rate limiting and security (Helmet, CORS)
- ⚡ Fast and efficient API responses
- 🔒 Environment-based configuration
- 💰 **Completely FREE** - No API costs!

## Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Get your FREE Gemini API key**:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy your API key

3. **Configure environment variables**:
```bash
cp .env.example .env
```

Edit `.env` and add your Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
NODE_ENV=development
```

4. **Start the server**:

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Generate Content
**POST** `/api/generate`

Generate AI content based on parameters.

**Request Body**:
```json
{
  "type": "joke",
  "keyword": "cats",
  "tone": "funny",
  "length": "medium"
}
```

**Response**:
```json
{
  "success": true,
  "result": "Why did the cat sit on the computer? To keep an eye on the mouse!",
  "metadata": {
    "type": "joke",
    "keyword": "cats",
    "tone": "funny",
    "length": "medium",
    "model": "gemini-2.5-flash",
    "timestamp": "2025-12-13T08:00:00.000Z"
  }
}
```

### Get Content Types
**GET** `/api/content-types`

Returns all available content types.

### Health Check
**GET** `/api/health`

Check server status and AI provider info.

**Response**:
```json
{
  "status": "OK",
  "timestamp": "2025-12-13T08:00:00.000Z",
  "version": "1.0.0",
  "ai_provider": "Google Gemini",
  "model": "gemini-2.5-flash"
}
```

## Supported Content Types

| # | Type | Description | Example |
|---|------|-------------|---------|
| 1 | **shayari** | Urdu/Hindi poetry | Romantic verses |
| 2 | **joke** | Witty jokes | "Why did the..." |
| 3 | **quote** | Inspirational quotes | Motivational sayings |
| 4 | **story** | Short stories | Mini narratives |
| 5 | **riddle** | Brain teasers | Puzzles with answers |
| 6 | **pickup-line** | Clever pickup lines | Charming lines |
| 7 | **roast** | Playful roasts | Comedy roasts |
| 8 | **compliment** | Genuine compliments | Kind words |
| 9 | **dad-joke** | Pun-based humor | Classic dad jokes |
| 10 | **haiku** | 5-7-5 poems | Traditional haiku |
| 11 | **rap-lyrics** | Rhyming rap verses | Hip-hop lyrics |
| 12 | **tweet-thread** | Social media threads | Twitter threads |
| 13 | **acrostic** | First-letter poems | Word-based poems |
| 14 | **motivational-speech** | Inspiring speeches | Powerful talks |

## Tone Options

- `funny` - Humorous and light-hearted
- `serious` - Professional and thoughtful
- `romantic` - Love-themed and emotional
- `motivational` - Inspiring and uplifting

## Length Options

- `short` - ~100 words
- `medium` - ~200 words
- `long` - ~400 words

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `400` - Bad request (invalid parameters)
- `401` - Unauthorized (invalid API key)
- `429` - Rate limit exceeded
- `500` - Internal server error

## Rate Limiting

- 100 requests per 15 minutes per IP address
- Helps prevent abuse and manage API usage

## Security

- **Helmet** - Secure HTTP headers
- **CORS** - Cross-origin resource sharing enabled
- **Rate Limiting** - Protection against abuse
- **Environment Variables** - Sensitive data protection

## Google Gemini Free Tier

**Generous Free Limits:**
- ✅ 60 requests per minute
- ✅ 1,500 requests per day
- ✅ 1 million tokens per month
- ✅ No credit card required

This is perfect for personal projects and development!

## Tech Stack

- Node.js
- Express.js
- Google Generative AI SDK (@google/generative-ai)
- Gemini 2.5 Flash model (FREE)
- dotenv
- Helmet
- CORS
- Express Rate Limit

## Troubleshooting

### "API key invalid" error
- Make sure you copied the full API key from Google AI Studio
- Check that `.env` file has `GEMINI_API_KEY=your_key_here`
- Restart the server after changing `.env`

### "Rate limit exceeded" error
- Free tier has 60 requests/minute
- Wait a moment and try again
- For high traffic, consider implementing request queuing

### Server won't start
- Ensure port 5000 is not already in use
- Run `npm install` to install dependencies
- Check Node.js version (requires v14+)

## License

MIT
