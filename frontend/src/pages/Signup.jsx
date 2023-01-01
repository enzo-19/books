import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import UserForm from '../components/UserForm'

const Signup = () => {
  return (
    <>
    <UserForm action="signup"/>
    <Typography align="center" sx={{m: 2}}>Already have an account? <Link to="/login">Log In</Link></Typography>
    </>
  )
}

export default Signup