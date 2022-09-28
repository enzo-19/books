// react-router-dom
import { Link } from 'react-router-dom'

// Context
import { useAuthContext } from '../hooks/useAuthContext';
import { useBooksContext } from '../hooks/useBooksContext';

// MUI Components
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Navbar() {

  const { user, dispatch: authDispatch } = useAuthContext()
  const { dispatch: booksDispatch } = useBooksContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    authDispatch({ type: 'LOGOUT' })
    booksDispatch({type: 'NO_DATA'})
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component={Link} to='/' sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
            Books
          </Typography>

          {
            user ?
            <Button color="inherit" onClick={logout}>Logout</Button>
            :
            <>
            <Button color="inherit" component={Link} to='/login'>
                Login
            </Button>
            <Button color="inherit" component={Link} to='/signup'>
                Signup
            </Button>
            </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
