import { createContext, useReducer, useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

export const BooksContext = createContext()

const booksInitialState = {
    books: null,
}

export const booksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOKS':
      return { 
        ...state,
        books: action.payload
      }
    case 'CREATE_BOOK':
      return { 
        ...state,
        books: [action.payload, ...state.books] 
      }
    case 'UPDATE_BOOK':
      return {
        ...state,
        books: state.books.map(b => b._id !== action.payload._id ? b : action.payload)
      }
    case 'DELETE_BOOK':
      return { 
        ...state,
        books: state.books.filter(b => b._id !== action.payload._id) 
      }

    case 'NO_DATA':
      return booksInitialState

    default:
      return state
  }
}

export const BooksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(booksReducer, booksInitialState)
  const {user} = useAuthContext()

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const [search, setSearch] = useState('')

  // const url = 'http://localhost:5050/api/v1/books'
  const url = 'https://egc-books-crud.herokuapp.com/api/v1/books'

  useEffect(() => {
    const abortCtrl = new AbortController()
    let isMounted = true

    const fetchBooks = async () => {
        setIsLoading(true)

        try {

            // Abort ctrl & Token
            const options = { 
              signal: abortCtrl.signal,
              headers: {
                'Authorization': `Bearer ${user.token}`
              },
            }
            const res = await fetch(`${url}?title=${search}`, options)
            if(!res.ok) throw res
            const json = await res.json()
            dispatch({type: 'SET_BOOKS', payload: json})
            setError(null)
            
        } catch (error) {
   
            if(isMounted){
                dispatch({type: 'NO_DATA'})
                setError('Something went wrong. Please try again later.')
            }
        }

        if(isMounted){ setIsLoading(false) }

    }

    if (user){
      fetchBooks()
    }


    return () => {
        abortCtrl.abort()
        isMounted = false
    }

  }, [user, search])

  const data = {...state, dispatch, url, isLoading, error, search, setSearch}
  
  return (
    <BooksContext.Provider value={data}>
      { children }
    </BooksContext.Provider>
  )
}