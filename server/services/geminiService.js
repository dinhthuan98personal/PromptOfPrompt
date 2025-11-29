import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Get current directory (ES modules)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load .env from project root
dotenv.config({ path: join(__dirname, '..', '..', '.env') })

// Validate API key
const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not set in environment variables. Please check your .env file.')
}

const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' })

/**
 * Phân tích prompt và đưa ra đánh giá
 */
export async function analyzePrompt(prompt) {
  const analysisPrompt = `
Bạn là một chuyên gia phân tích prompt. Hãy phân tích prompt sau đây và đánh giá theo các tiêu chí:

Prompt cần phân tích:
"${prompt}"

Hãy đánh giá prompt này theo các tiêu chí sau (mỗi tiêu chí từ 0-100):
1. Độ rõ ràng (Clarity): Prompt có rõ ràng, dễ hiểu không?
2. Tính cụ thể (Specificity): Prompt có cụ thể, chi tiết không?
3. Độ hoàn chỉnh (Completeness): Prompt có đầy đủ thông tin cần thiết không?

Và đưa ra 3-5 gợi ý cụ thể để cải thiện prompt này.

Trả về kết quả theo định dạng JSON sau (chỉ trả về JSON, không có text thêm):
{
  "clarity": <số từ 0-100>,
  "specificity": <số từ 0-100>,
  "completeness": <số từ 0-100>,
  "suggestions": [
    "<gợi ý 1>",
    "<gợi ý 2>",
    "<gợi ý 3>"
  ]
}
`

  try {
    const result = await model.generateContent(analysisPrompt)
    const response = await result.response
    const text = response.text()

    // Parse JSON từ response
    // Gemini có thể trả về text với markdown code blocks, cần extract JSON
    let jsonText = text.trim()
    
    // Remove markdown code blocks nếu có
    if (jsonText.includes('```json')) {
      jsonText = jsonText.split('```json')[1].split('```')[0].trim()
    } else if (jsonText.includes('```')) {
      jsonText = jsonText.split('```')[1].split('```')[0].trim()
    }

    const analysis = JSON.parse(jsonText)

    // Validate và normalize
    return {
      clarity: Math.max(0, Math.min(100, parseInt(analysis.clarity) || 0)),
      specificity: Math.max(0, Math.min(100, parseInt(analysis.specificity) || 0)),
      completeness: Math.max(0, Math.min(100, parseInt(analysis.completeness) || 0)),
      suggestions: Array.isArray(analysis.suggestions) 
        ? analysis.suggestions.slice(0, 5)
        : []
    }
  } catch (error) {
    console.error('Error in analyzePrompt:', error)
    throw new Error(`Failed to analyze prompt: ${error.message}`)
  }
}

/**
 * Tối ưu hóa prompt dựa trên phân tích
 */
export async function optimizePrompt(originalPrompt, analysis = null) {
  const optimizationPrompt = `
Bạn là một chuyên gia tối ưu hóa prompt. Hãy cải thiện prompt sau đây để làm cho nó rõ ràng hơn, cụ thể hơn và hiệu quả hơn.

Prompt gốc:
"${originalPrompt}"

${analysis ? `
Phân tích hiện tại:
- Độ rõ ràng: ${analysis.clarity}/100
- Tính cụ thể: ${analysis.specificity}/100
- Độ hoàn chỉnh: ${analysis.completeness}/100
- Gợi ý: ${analysis.suggestions.join(', ')}

Hãy áp dụng các gợi ý trên để tối ưu hóa prompt.
` : ''}

Yêu cầu:
1. Giữ nguyên ý tưởng và mục đích chính của prompt gốc
2. Làm rõ và cụ thể hóa các yêu cầu
3. Thêm context và thông tin cần thiết nếu thiếu
4. Cải thiện cấu trúc và định dạng để dễ hiểu hơn
5. Đảm bảo prompt có thể tạo ra output chất lượng cao

Trả về prompt đã được tối ưu hóa (chỉ trả về prompt, không có giải thích thêm).
`

  try {
    const result = await model.generateContent(optimizationPrompt)
    const response = await result.response
    let optimizedText = response.text().trim()

    // Remove quotes nếu prompt được wrap trong quotes
    if ((optimizedText.startsWith('"') && optimizedText.endsWith('"')) ||
        (optimizedText.startsWith("'") && optimizedText.endsWith("'"))) {
      optimizedText = optimizedText.slice(1, -1)
    }

    return optimizedText
  } catch (error) {
    console.error('Error in optimizePrompt:', error)
    throw new Error(`Failed to optimize prompt: ${error.message}`)
  }
}

