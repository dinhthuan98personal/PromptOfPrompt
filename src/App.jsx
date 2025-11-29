import { useState } from 'react'
import { motion } from 'framer-motion'
import PromptInput from './components/PromptInput'
import AnalysisDisplay from './components/AnalysisDisplay'
import OptimizedPrompt from './components/OptimizedPrompt'
import ParticlesBackground from './components/ParticlesBackground'
import Header from './components/Header'

function App() {
  const [originalPrompt, setOriginalPrompt] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [optimizedPrompt, setOptimizedPrompt] = useState('')

  const handleAnalyze = async (prompt) => {
    setOriginalPrompt(prompt)
    setIsAnalyzing(true)
    setAnalysis(null)
    setOptimizedPrompt('')

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock analysis data
    const mockAnalysis = {
      clarity: 75,
      specificity: 68,
      completeness: 82,
      suggestions: [
        'Thêm context cụ thể hơn về mục tiêu',
        'Sử dụng từ khóa rõ ràng hơn',
        'Bổ sung thông tin về định dạng output mong muốn'
      ]
    }

    setAnalysis(mockAnalysis)
    setIsAnalyzing(false)

    // Generate optimized prompt
    await new Promise(resolve => setTimeout(resolve, 1000))
    setOptimizedPrompt(
      `[Context: ${prompt}] Hãy cung cấp một phản hồi chi tiết và có cấu trúc, bao gồm:\n` +
      `1. Phân tích sâu về chủ đề\n` +
      `2. Ví dụ cụ thể và minh họa\n` +
      `3. Kết luận và khuyến nghị\n\n` +
      `Định dạng: Markdown với các section rõ ràng.`
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticlesBackground />
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">
              AI Prompt Optimizer
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Tối ưu hóa prompt của bạn với AI để đạt được kết quả tốt nhất
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <PromptInput onAnalyze={handleAnalyze} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <AnalysisDisplay 
                isAnalyzing={isAnalyzing} 
                analysis={analysis}
                originalPrompt={originalPrompt}
              />
            </motion.div>
          </div>

          {optimizedPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <OptimizedPrompt prompt={optimizedPrompt} />
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App

