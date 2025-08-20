import { StrictMode } from 'react'
import { inject } from '@vercel/analytics';
import { createRoot } from 'react-dom/client'
import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.css'
import App from './App.tsx'


inject();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    
  </StrictMode>,
)
