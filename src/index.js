import './styles.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import App from './App'
import ReactGA from 'react-ga4'
const TRACKING_ID = '323890448'
ReactGA.initialize(TRACKING_ID)

const rootElement = document.getElementById('root')

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
)
