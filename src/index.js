import './styles.css'

import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App'
import Auth from './Auth'
import PageNotFound from './PageNotFound'
import ErrorBoundary from './ErrorBoundary'
import Authenticate from './Authenticate'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/authenticate" element={<Authenticate />} />
          <Route path="/diagram" element={<App />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
  rootElement
)
