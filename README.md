# AI Prompt Optimizer

Ứng dụng web đẹp mắt để tối ưu hóa prompt với AI (Gemini), được xây dựng bằng React, Vite, Tailwind CSS và Express.

## Tính năng

- ✨ Giao diện đẹp mắt với animations mượt mà
- 🎨 Thiết kế hiện đại với glassmorphism effects
- 📊 Phân tích prompt với AI (Gemini) - metrics trực quan
- 🚀 Tối ưu hóa prompt tự động với AI
- 💫 Particles background animation
- 📱 Responsive design
- 🔒 Backend API bảo mật API key

## Cài đặt

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Cấu hình Environment Variables

Tạo file `.env` trong thư mục gốc (copy từ `.env.example`):

```bash
cp .env.example .env
```

Sau đó chỉnh sửa file `.env`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
FRONTEND_URL=http://localhost:5173
```

**Lấy Gemini API Key:**
1. Truy cập [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Tạo API key mới
3. Copy và paste vào file `.env`

### 3. Chạy ứng dụng

**Option 1: Chạy riêng lẻ**

Terminal 1 - Backend:
```bash
npm run dev:server
```

Terminal 2 - Frontend:
```bash
npm run dev
```

**Option 2: Chạy cùng lúc (recommended)**

```bash
npm run dev:all
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001`

## Cấu trúc dự án

```
promptofprompt/
├── server/
│   ├── index.js              # Express server
│   └── services/
│       └── geminiService.js  # Gemini API integration
├── src/
│   ├── components/           # React components
│   ├── config/
│   │   └── api.js           # API configuration
│   ├── App.jsx
│   └── main.jsx
├── .env                      # Environment variables (tạo từ .env.example)
└── package.json
```

## API Endpoints

### `POST /api/analyze`
Phân tích prompt và trả về metrics

**Request:**
```json
{
  "prompt": "Viết một bài blog về AI"
}
```

**Response:**
```json
{
  "clarity": 75,
  "specificity": 68,
  "completeness": 82,
  "suggestions": [
    "Thêm context cụ thể hơn",
    "Sử dụng từ khóa rõ ràng hơn"
  ]
}
```

### `POST /api/optimize`
Tối ưu hóa prompt

**Request:**
```json
{
  "prompt": "Viết blog về AI",
  "analysis": { ... }
}
```

**Response:**
```json
{
  "optimizedPrompt": "Prompt đã được tối ưu..."
}
```

### `POST /api/analyze-and-optimize`
Phân tích và tối ưu hóa trong một request

**Request:**
```json
{
  "prompt": "Viết blog về AI"
}
```

**Response:**
```json
{
  "analysis": { ... },
  "optimizedPrompt": "..."
}
```

## Build cho production

```bash
npm run build
```

## Công nghệ sử dụng

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Backend
- **Express** - Web server
- **@google/generative-ai** - Gemini API client
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## Troubleshooting

### Lỗi "Failed to analyze prompt"
- Kiểm tra API key trong file `.env`
- Đảm bảo server backend đang chạy
- Kiểm tra console để xem lỗi chi tiết

### CORS errors
- Đảm bảo `FRONTEND_URL` trong `.env` đúng với URL frontend
- Hoặc sử dụng Vite proxy (đã cấu hình sẵn)

### Port đã được sử dụng
- Thay đổi `PORT` trong file `.env`
- Hoặc kill process đang dùng port đó

## License

MIT
