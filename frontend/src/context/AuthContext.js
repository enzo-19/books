import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

const authInitialState = {
    user: null
}

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { 
        ...state,
        user: action.payload 
      }
    case 'LOGOUT':
      return { 
        ...state,
        user: null
      }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState)

  // const url = 'http://localhost:5050/api/v1/user'
  const url = 'https://books-crud-backend.onrender.com/api/v1/user'

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({ type: 'LOGIN', payload: user }) 
    }
  }, [])
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch, url }}>
      { children }
    </AuthContext.Provider>
  )

}