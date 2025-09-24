import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Instructions from './Instructions.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <BrowserRouter>
        <Routes>
          <Route path="/instructions" element={<Instructions />} /> 
          <Route path="/" element={<App />} />


        </Routes>

    </BrowserRouter> 

  </React.StrictMode>,
)
