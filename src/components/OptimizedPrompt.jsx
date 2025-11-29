import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Sparkles, ArrowDown } from 'lucide-react'

const OptimizedPrompt = ({ prompt }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-strong rounded-2xl p-6 shadow-2xl border-2 border-purple-500/30"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="flex items-center justify-between mb-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600"
          >
            <Sparkles className="w-5 h-5 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gradient">Prompt đã tối ưu</h2>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 
                   rounded-lg transition-colors border border-white/20"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">Đã sao chép!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="text-sm">Sao chép</span>
            </>
          )}
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative"
      >
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-6 h-6 text-purple-400" />
          </motion.div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-6 
                      border border-purple-500/20 backdrop-blur-sm">
          <pre className="text-white whitespace-pre-wrap font-mono text-sm leading-relaxed 
                        selection:bg-purple-500/50">
            {prompt}
          </pre>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 
                  rounded-lg border border-green-500/20"
      >
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-green-400">✨ Tối ưu hóa hoàn tất!</span> 
          {' '}Prompt của bạn đã được cải thiện với cấu trúc rõ ràng hơn, context đầy đủ hơn 
          và định dạng output cụ thể.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default OptimizedPrompt

