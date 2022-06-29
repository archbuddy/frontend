import { Routes, Route, Navigate } from 'react-router-dom'
import useAuth from './AuthContext'

import Diagram from './Diagram'
import Home from './Home'
import Auth from './Auth'
import AuthCallback from './AuthCallback'
import PageNotFound from './PageNotFound'
import ErrorBoundary from './ErrorBoundary'

function RequireAuth({ children }) {
  const { authed } = useAuth()

  return authed === true ? children : <Navigate to="/auth" replace />
}

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/diagram"
          element={
            <RequireAuth>
              <Diagram />
            </RequireAuth>
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default App
