// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const API_ENDPOINTS = {
  ANALYZE: `${API_URL}/api/analyze`,
  OPTIMIZE: `${API_URL}/api/optimize`,
  ANALYZE_AND_OPTIMIZE: `${API_URL}/api/analyze-and-optimize`,
  HEALTH: `${API_URL}/health`,
}

