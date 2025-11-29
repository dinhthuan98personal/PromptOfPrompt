import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { analyzePrompt, optimizePrompt } from './services/geminiService.js'

// Get current directory (ES modules)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load .env from project root (one level up from server folder)
dotenv.config({ path: join(__dirname, '..', '.env') })

// Validate required environment variables
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ ERROR: GEMINI_API_KEY is not set in .env file')
  console.error('📝 Please create a .env file in the project root with:')
  console.error('   GEMINI_API_KEY=your_api_key_here')
  process.exit(1)
}

console.log('✅ Environment variables loaded')
console.log(`🔑 API Key: ${process.env.GEMINI_API_KEY ? 'Set (' + process.env.GEMINI_API_KEY.substring(0, 10) + '...)' : 'NOT SET'}`)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// Analyze prompt endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { prompt } = req.body

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Prompt is required and must be a non-empty string' 
      })
    }

    const analysis = await analyzePrompt(prompt)
    res.json(analysis)
  } catch (error) {
    console.error('Error analyzing prompt:', error)
    res.status(500).json({ 
      error: 'Failed to analyze prompt',
      message: error.message 
    })
  }
})

// Optimize prompt endpoint
app.post('/api/optimize', async (req, res) => {
  try {
    const { prompt, analysis } = req.body

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Prompt is required and must be a non-empty string' 
      })
    }

    const optimized = await optimizePrompt(prompt, analysis)
    res.json({ optimizedPrompt: optimized })
  } catch (error) {
    console.error('Error optimizing prompt:', error)
    res.status(500).json({ 
      error: 'Failed to optimize prompt',
      message: error.message 
    })
  }
})

// Combined endpoint (analyze + optimize)
app.post('/api/analyze-and-optimize', async (req, res) => {
  try {
    const { prompt } = req.body

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Prompt is required and must be a non-empty string' 
      })
    }

    // Analyze first
    const analysis = await analyzePrompt(prompt)
    
    // Then optimize based on analysis
    const optimizedPrompt = await optimizePrompt(prompt, analysis)

    res.json({
      analysis,
      optimizedPrompt
    })
  } catch (error) {
    console.error('Error in analyze-and-optimize:', error)
    res.status(500).json({ 
      error: 'Failed to analyze and optimize prompt',
      message: error.message 
    })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📝 API endpoints:`)
  console.log(`   POST /api/analyze`)
  console.log(`   POST /api/optimize`)
  console.log(`   POST /api/analyze-and-optimize`)
  console.log(`\n💡 Make sure your .env file is in the project root (same level as server folder)`)
})

