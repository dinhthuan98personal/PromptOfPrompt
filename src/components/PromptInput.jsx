import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Sparkles, Loader2 } from 'lucide-react'

const PromptInput = ({ onAnalyze }) => {
  const [prompt, setPrompt] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!prompt.trim() || isSubmitting) return

    setIsSubmitting(true)
    await onAnalyze(prompt)
    setIsSubmitting(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-2xl p-6 shadow-2xl"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gradient">Nhập Prompt của bạn</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ví dụ: Viết một bài blog về công nghệ AI..."
            className="w-full h-48 px-4 py-3 bg-white/5 border border-white/20 rounded-xl 
                     text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:border-transparent resize-none
                     transition-all duration-300 backdrop-blur-sm"
            disabled={isSubmitting}
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400">
            {prompt.length} ký tự
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={!prompt.trim() || isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 
                   text-white font-semibold rounded-xl shadow-lg
                   disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center justify-center gap-2
                   transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Đang phân tích...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Tối ưu hóa Prompt</span>
            </>
          )}
        </motion.button>
      </form>

      <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-blue-400">💡 Mẹo:</span> Hãy mô tả rõ ràng mục tiêu, 
          context và định dạng output mong muốn để có kết quả tốt nhất.
        </p>
      </div>
    </motion.div>
  )
}

export default PromptInput

