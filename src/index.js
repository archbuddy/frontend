import './styles.css'

import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import ErrorBoundary from './ErrorBoundary'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
  rootElement
)
