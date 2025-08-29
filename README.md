# Personal Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. Features include project showcases, skills demonstrations, and an AI-powered chatbot for interactive engagement.

## 🚀 **Features**

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Project Showcase**: Interactive project cards with detailed information
- **Skills Section**: Visual representation of technical expertise
- **AI Chatbot**: Intelligent assistant for answering portfolio-related questions
- **Timeline**: Professional journey and achievements
- **Modern UI**: Clean, professional design with smooth animations

## 🤖 **Chatbot API Integration**

The portfolio includes an AI-powered chatbot that can answer questions about your experience, research, and projects. 

### **Setup Instructions:**

1. **Create a `.env` file** in the root directory:
   ```bash
   REACT_APP_CHATBOT_API_URL=https://your-railway-app.railway.app
   REACT_APP_CHATBOT_ENDPOINT=/chat
   ```

2. **Replace the placeholder URL** with your actual Railway app URL once deployed

3. **Restart your development server** after adding the environment variables

### **Chatbot Capabilities:**
- Research & Experience questions
- Technical skills inquiries  
- Project details and achievements
- Educational background
- Current work at DRCL

### **Fallback Mode:**
If the API is unavailable, the chatbot provides intelligent fallback responses based on your portfolio content.

## 🛠 **Tech Stack**

- **Frontend**: React 19, Vite, Tailwind CSS
- **State Management**: React Hooks
- **Routing**: React Router DOM
- **Deployment**: GitHub Pages
- **Assets**: Cloudinary for media hosting

## 📱 **Getting Started**

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Set up environment variables** (see Chatbot section above)
4. **Start development server**: `npm run dev`
5. **Build for production**: `npm run build`

## 🌐 **Deployment**

The site is configured for GitHub Pages deployment with automatic builds via GitHub Actions.
