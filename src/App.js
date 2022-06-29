import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import useAuth from './AuthContext'

import Diagram from './pages/Diagram'
import Home from './pages/Home'
import Auth from './pages/Auth'
import AuthCallback from './pages/AuthCallback'
import PageNotFound from './pages/PageNotFound'
import ErrorBoundary from './ErrorBoundary'

function RequireAuth({ children }) {
  const { authed } = useAuth()
  const location = useLocation()

  return authed === true ? (
    children
  ) : (
    <Navigate to="/auth" replace state={{ path: location.pathname }} />
  )
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
