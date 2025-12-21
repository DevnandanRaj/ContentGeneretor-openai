# ContentGenerator - Backend API

🚀 Node.js/Express backend for the Creative AI Studio content generation application.

## ✨ Powered by Google Gemini 2.5 Flash

This backend uses **Google's Gemini 2.5 Flash** - a cutting-edge AI model optimized for speed, cost-efficiency, and high-volume processing.

## 🎯 Features

- 🤖 **Google Gemini 2.5 Flash** - Latest model (GA June 2025)
- 🎨 **14 Content Types** - From shayari to motivational speeches
- 🎭 **Tone Customization** - Funny, serious, romantic, motivational
- 📏 **Length Control** - Short (100), medium (200), long (400 words)
- 🛡️ **Security First** - Helmet, CORS, rate limiting
- ⚡ **Fast & Efficient** - Optimized for low latency
- 🏗️ **Modular Architecture** - Clean MVC structure
- 🔒 **Production Ready** - Environment-based configuration

## 📦 Installation

### Local Development

1. **Clone the repository**:
```bash
git clone <your-repo-url>
cd backend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Get your FREE Gemini API key**:
   - Visit [Google AI Studio](https://aistudio.google.com/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy your API key (it's free!)

4. **Configure environment variables**:

Create a `.env` file in the backend directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
NODE_ENV=development
```

5. **Start the server**:

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## 🚀 Deployment to Render

### Prerequisites
- GitHub repository with your code
- Render account (free tier available at [render.com](https://render.com))
- Gemini API key

### Deployment Steps

1. **Push to GitHub**:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Create New Web Service on Render**:
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository with your backend code

3. **Configure the Service**:
   - **Name**: `contentgenerator-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your deployment branch)
   - **Root Directory**: `backend` (if backend is in a subdirectory)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Set Environment Variables**:
   
   In the "Environment" section, add:
   ```
   GEMINI_API_KEY = your_actual_gemini_api_key
   NODE_ENV = production
   PORT = 5000
   ```

5. **Advanced Settings** (Optional):
   - **Health Check Path**: `/api/health`
   - **Auto-Deploy**: Enable for automatic deployments on git push

6. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete (usually 2-3 minutes)
   - Your API will be live at: `https://your-service-name.onrender.com`

### Post-Deployment

**Test your deployment**:
```bash
# Health check
curl https://your-service-name.onrender.com/api/health

# Get content types
curl https://your-service-name.onrender.com/api/content-types

# Generate content
curl -X POST https://your-service-name.onrender.com/api/generate \
  -H "Content-Type: application/json" \
  -d '{"type":"joke","keyword":"programming","tone":"funny","length":"short"}'
```

**Update your frontend**: Update the API URL in your frontend code to point to your Render URL.

### Using render.yaml (Alternative)

The included `render.yaml` file allows for infrastructure-as-code deployment:

1. Connect your repo to Render
2. Render will automatically detect `render.yaml`
3. Set the `GEMINI_API_KEY` in the Render dashboard
4. Deploy with one click!

## 📚 API Documentation

### Base URL
- **Local**: `http://localhost:5000`
- **Production**: `https://your-service-name.onrender.com`

### Endpoints

#### 1. Generate Content
**POST** `/api/generate`

Generate AI content with customizable parameters.

**Request Body**:
```json
{
  "type": "joke",
  "keyword": "cats",
  "tone": "funny",
  "length": "medium"
}
```

**Parameters**:
- `type` (required): Content type (see supported types below)
- `keyword` (required): Topic or keyword for content generation
- `tone` (optional): `funny`, `serious`, `romantic`, `motivational` (default: `funny`)
- `length` (optional): `short`, `medium`, `long` (default: `medium`)

**Response** (200 OK):
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
    "timestamp": "2025-12-21T06:30:00.000Z"
  }
}
```

#### 2. Get Content Types
**GET** `/api/content-types`

Returns all available content types with descriptions.

**Response** (200 OK):
```json
{
  "types": [
    {
      "id": "joke",
      "name": "Joke",
      "description": "You are a witty comedian who creates clever, appropriate jokes."
    },
    ...
  ]
}
```

#### 3. Health Check
**GET** `/api/health`

Check server status and configuration.

**Response** (200 OK):
```json
{
  "status": "OK",
  "timestamp": "2025-12-21T06:30:00.000Z",
  "version": "1.0.0",
  "ai_provider": "Google Gemini",
  "model": "gemini-2.5-flash"
}
```

#### 4. Root Endpoint
**GET** `/`

API information and available endpoints.

## 🎨 Supported Content Types

| Type | Description |
|------|-------------|
| `shayari` | Beautiful Urdu/Hindi poetry with emotional depth |
| `joke` | Witty, clever jokes |
| `quote` | Inspirational and meaningful quotes |
| `story` | Engaging short stories with narrative structure |
| `riddle` | Brain teasers with answers |
| `pickup-line` | Clever, respectful pickup lines |
| `roast` | Playful, good-natured roasts |
| `compliment` | Genuine, heartwarming compliments |
| `dad-joke` | Classic pun-based dad jokes |
| `haiku` | Traditional 5-7-5 syllable poems |
| `rap-lyrics` | Rhyming rap verses with flow |
| `tweet-thread` | Engaging social media thread |
| `acrostic` | Poems where first letters spell words |
| `motivational-speech` | Inspiring, powerful speeches |

## 🔒 Security Features

- ✅ **Helmet.js** - Sets secure HTTP headers
- ✅ **CORS** - Configured for cross-origin requests
- ✅ **Rate Limiting** - 30 requests per 15 minutes per IP
- ✅ **Environment Variables** - Sensitive data protection
- ✅ **Error Handling** - Custom error middleware
- ✅ **Input Validation** - Request parameter validation

## 📊 Rate Limiting

**Server-Side Protection**: 30 requests per 15 minutes per IP address

**Gemini API Free Tier Limits**:
- ✅ 15 requests per minute
- ✅ 1,500 requests per day
- ✅ 1 million tokens per month
- ✅ **No credit card required!**

Perfect for personal projects and small-scale production apps!

## 🏗️ Project Structure

```
backend/
├── config/
│   ├── contentConfigs.js    # Content type configurations
│   └── gemini.config.js      # Gemini AI initialization
├── controllers/
│   └── generate.controller.js # Request handlers
├── middlewares/
│   ├── errorHandler.js       # Centralized error handling
│   └── rateLimiter.js        # Rate limiting config
├── routes/
│   └── routes.js             # API route definitions
├── services/
│   └── gemini.service.js     # Gemini API service
├── utils/
│   └── lengthConfig.js       # Word limit configurations
├── .env                      # Environment variables (gitignored)
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies and scripts
├── render.yaml              # Render deployment config
└── server.js                # Application entry point
```

## ⚙️ Tech Stack

- **Runtime**: Node.js (v14+)
- **Framework**: Express.js v4.18.2
- **AI SDK**: @google/generative-ai v0.24.1
- **Security**: Helmet v7.1.0, CORS v2.8.5
- **Rate Limiting**: express-rate-limit v7.1.5
- **Configuration**: dotenv v16.3.1
- **Development**: nodemon v3.0.2

## 🛠️ Troubleshooting

### "API key invalid" error
- ✅ Verify you copied the complete API key from Google AI Studio
- ✅ Check `.env` file has `GEMINI_API_KEY=your_key_here` (no quotes)
- ✅ Restart the server after changing `.env`
- ✅ On Render, verify environment variable is set correctly

### "Rate limit exceeded" error
- ✅ Server rate limit: 30 requests per 15 minutes (adjustable in `middlewares/rateLimiter.js`)
- ✅ Gemini API: 15 requests per minute on free tier
- ✅ Wait a moment and try again
- ✅ Consider implementing request queuing for high traffic

### Server won't start
- ✅ Ensure port 5000 is not already in use
- ✅ Run `npm install` to install all dependencies
- ✅ Check Node.js version: `node --version` (requires v14+)
- ✅ Verify `.env` file exists and contains `GEMINI_API_KEY`

### Deployment issues on Render
- ✅ Verify build command is `npm install`
- ✅ Verify start command is `npm start`
- ✅ Check environment variables are set in Render dashboard
- ✅ Review deployment logs for specific errors
- ✅ Ensure health check path `/api/health` is accessible

## 🔄 Development Workflow

1. **Make changes** to your code
2. **Test locally**: `npm run dev`
3. **Commit changes**: `git add . && git commit -m "your message"`
4. **Push to GitHub**: `git push origin main`
5. **Auto-deploy**: If enabled on Render, deployment happens automatically
6. **Manual deploy**: Trigger from Render dashboard if needed

## 📝 Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `GEMINI_API_KEY` | Yes | Your Google Gemini API key | `AIza...` |
| `PORT` | No | Server port (default: 5000) | `5000` |
| `NODE_ENV` | No | Environment mode | `production` |

## 📄 License

MIT License - Feel free to use this project for your own purposes!

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and enhancement requests.

---

**Built with ❤️ using Google Gemini 2.5 Flash**
