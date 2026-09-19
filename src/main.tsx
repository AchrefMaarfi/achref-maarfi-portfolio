import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/globals.css'
import App from './App.tsx'
import { ScrollToTop } from './components/ScrollToTop.tsx'
import { PlanItProject } from './pages/PlanItProject.tsx'

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'auto'
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects/planit" element={<PlanItProject />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
