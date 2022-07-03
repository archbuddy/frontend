import * as React from 'react'
import jwt_decode from 'jwt-decode'

const authContext = React.createContext()

function useAuth() {
  const isAuthenticated = () => {
    const jwt = localStorage.getItem('jwt')
    if (!jwt) {
      return false
    }

    const decode = jwt_decode(jwt)

    if (decode.exp < Date.now() / 1000) {
      localStorage.clear()
      return false
    }

    return true
  }
  const [authed, setAuthed] = React.useState(isAuthenticated())

  return {
    authed,
    login(jwt) {
      return new Promise((res) => {
        localStorage.setItem('jwt', jwt)
        setAuthed(true)
        res()
      })
    },
    logout() {
      return new Promise((res) => {
        localStorage.clear()
        setAuthed(false)
        res()
      })
    }
  }
}

export function AuthProvider({ children }) {
  const auth = useAuth()

  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export default function AuthConsumer() {
  return React.useContext(authContext)
}
