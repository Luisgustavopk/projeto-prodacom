import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WebChatProvider } from './context/WebChatContext' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WebChatProvider>
      <App />
    </WebChatProvider>
  </StrictMode>,
)