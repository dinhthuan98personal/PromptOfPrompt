import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-6 max-w-7xl"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600"
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>
          <span className="text-xl font-bold text-gradient">PromptAI</span>
        </div>
        
        <nav className="hidden md:flex gap-6">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Tính năng
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Về chúng tôi
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Liên hệ
          </a>
        </nav>
      </div>
    </motion.header>
  )
}

export default Header

