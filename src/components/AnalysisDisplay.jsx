import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, CheckCircle2, Loader2 } from 'lucide-react'

const AnalysisDisplay = ({ isAnalyzing, analysis, originalPrompt }) => {
  const metrics = analysis ? [
    { label: 'Độ rõ ràng', value: analysis.clarity, color: 'from-blue-500 to-cyan-500' },
    { label: 'Tính cụ thể', value: analysis.specificity, color: 'from-purple-500 to-pink-500' },
    { label: 'Độ hoàn chỉnh', value: analysis.completeness, color: 'from-green-500 to-emerald-500' },
  ] : []

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-2xl p-6 shadow-2xl h-full"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gradient">Phân tích Prompt</h2>
      </div>

      {isAnalyzing ? (
        <div className="flex flex-col items-center justify-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-12 h-12 text-blue-500" />
          </motion.div>
          <p className="mt-4 text-gray-400">Đang phân tích prompt của bạn...</p>
        </div>
      ) : analysis ? (
        <div className="space-y-6">
          {/* Metrics */}
          <div className="space-y-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">{metric.label}</span>
                  <span className="text-sm font-bold text-white">{metric.value}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${metric.color} rounded-full shadow-lg`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Suggestions */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h3 className="font-semibold text-white">Gợi ý cải thiện</h3>
            </div>
            <ul className="space-y-2">
              {analysis.suggestions.map((suggestion, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-2 text-sm text-gray-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>{suggestion}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <BarChart3 className="w-16 h-16 text-gray-600 mb-4" />
          <p className="text-gray-400">Nhập prompt để bắt đầu phân tích</p>
        </div>
      )}
    </motion.div>
  )
}

export default AnalysisDisplay

