import './styles.css'

import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App'
import Auth from './Auth'
import ErrorBoundary from './ErrorBoundary'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/diagram" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
  rootElement
)
