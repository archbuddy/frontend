import './styles.css'

import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Diagram from './Diagram'
import Auth from './Auth'
import PageNotFound from './PageNotFound'
import ErrorBoundary from './ErrorBoundary'
import Authenticate from './Authenticate'
import { isAuthenticated } from './util'

const rootElement = document.getElementById('root')

ReactDOM.render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated() ? <Navigate to="/diagram" /> : <Navigate to="/auth" />}
          />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/callback" element={<Authenticate />} />
          <Route
            path="/diagram"
            element={isAuthenticated() ? <Diagram /> : <Navigate to="/auth" />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
  rootElement
)
