import * as React from 'react'

const authContext = React.createContext()

function useAuth() {
  const [authed, setAuthed] = React.useState(false)

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
        localStorage.removeItem('jwt')
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
