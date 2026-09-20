import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/globals.css'
import App from './App.tsx'
import { ScrollToTop } from './components/ScrollToTop.tsx'
import { PlanItProject } from './pages/PlanItProject.tsx'

if ('scrollRestoration' in window.history) {
  // Take scroll restoration over from the browser: with client-side routing
  // there's no real page reload for it to key off, so its "auto" restore
  // fires before the new route finishes rendering and misses the mark.
  // ScrollToTop restores it manually once content has laid out.
  window.history.scrollRestoration = 'manual'
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
