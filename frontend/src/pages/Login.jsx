import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import UserForm from '../components/UserForm'

const Login = () => {
  return (
    <>
    <UserForm action="login"/>
    <Typography align="center" sx={{m: 2}}>Don't have an account? <Link to="/signup">Sign Up</Link></Typography>
    </>
  )
}

export default Login