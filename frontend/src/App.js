// react-router-dom
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Auth context
import { useAuthContext } from './hooks/useAuthContext'

// Pages
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

// Components
import { Container, CssBaseline } from '@mui/material'
import Navbar from './components/Navbar'

const App = () => {

  const { user } = useAuthContext()

  return (
    <>
    <CssBaseline />
      <BrowserRouter>
        <Navbar/>
        <Container sx={{py: 5}}>
          <Routes>
            <Route path="/"  element={user ? <Home /> : <Navigate to='/login' />}/>
            <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />}/>
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to='/' />}/>
          </Routes>
        </Container>
      </BrowserRouter>
      </>

  )
}
export default App
