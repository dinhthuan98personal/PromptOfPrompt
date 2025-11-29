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

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
      
      // Call API to analyze and optimize
      const response = await fetch(`${API_URL}/api/analyze-and-optimize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to analyze prompt')
      }

      const data = await response.json()
      
      setAnalysis(data.analysis)
      setOptimizedPrompt(data.optimizedPrompt)
    } catch (error) {
      console.error('Error analyzing prompt:', error)
      // Show error to user (you can add a toast/notification component later)
      alert(`Lỗi: ${error.message}. Vui lòng kiểm tra lại API key và server.`)
    } finally {
      setIsAnalyzing(false)
    }
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

