/* Sixten Peterson - aq9300 */
// Standard boilerplate från React Vite projekt, behöver rimligtvis inte kommenteras i minsta detalj.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
