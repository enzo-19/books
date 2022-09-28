import { useState } from 'react'

// Context
import { useAuthContext } from '../hooks/useAuthContext'

// components
import { Box, TextField, Button, Paper, Typography, Container } from '@mui/material'

const initialForm = {
    email: '',
    password: ''
}

const validateForm = form => {
    let formErr = {}

    // destructuración
    const {email, password} = form

    // Complete todos los campos
    if (!email.trim() || !password.trim()){
        formErr.error = 'Enter email and password'
    }
 
    return formErr
}

const UserForm = ({action}) => {

    const {url, dispatch} = useAuthContext()
    const [form, setForm] = useState(initialForm)
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false)

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const formErr = validateForm(form)
        setError(formErr)
        if (Object.keys(formErr).length !== 0) return false;

        setLoading(true)

        try {
            const endpoint = `${url}/${action}`
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form)
            }
            const res = await fetch(endpoint, options)

            if(!res.ok) throw res
              
            const json = await res.json()
      
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({type: 'LOGIN', payload: json})
      
            
        } catch (error) {
            try {
                // si el error viene del back
                const data = await error.json()
                setError(data)
              } catch (err) {
                // si el error viene del front
                setError({error: 'Something went wrong. Try again later.'})
            }
        }

        setLoading(false)
    }


  return (
    <Container maxWidth="sm">

    <Paper sx={{p:2}}>
    

    <Box
        component="form"
        noValidate
        autoComplete="off"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="10px"
    >
        <TextField error={error.email ? true : false} label="Email" name="email" variant="outlined" value={form.email} onChange={handleChange}/>
        <TextField error={error.password ? true : false} label="Password" type="password" name="password" variant="outlined" value={form.password} onChange={handleChange}/>
        {error? <Typography color="error" variant="body2">{error.error}</Typography> : ''}
        <Button disabled={loading} onClick={handleSubmit}>{action}</Button>
    </Box>
    </Paper>
    </Container>
  )
}

export default UserForm