import { useContext } from "react"
import { BooksContext } from "../context/BooksContext"

export const useBooksContext = () => {
  const context = useContext(BooksContext)

  if(!context) {
    throw Error('useBooksContext must be used inside an BooksContextProvider')
  }

  return context
}