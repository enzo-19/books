import { useState, useEffect } from 'react'

// Components
import { Box, TextField, FormControlLabel, Rating, Checkbox, Stack, Button, Typography } from '@mui/material'

// Context
import { useBooksContext } from '../hooks/useBooksContext'
import { useAuthContext } from '../hooks/useAuthContext'

const initialForm = {
    title: '',
    author: '',
    rating: null,
    read: false
}

const validateForm = form => {
    let formErr = {}

    // destructuración
    const {title, author} = form

    // Title
    if (!title.trim()){
        formErr.title = 'Title is required'
    } else if (title.trim().length > 50) {
        formErr.title = "Max length is 50"
    }
    // Author
    if (author.trim().length > 30) {
        formErr.author = "Max length is 30"
    }

    return formErr
}

const AddForm = ({handleClose, dataToEdit}) => {

  const {url, dispatch} = useBooksContext()
  const {user} = useAuthContext()

  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})


  const handleSubmit = async e => {
    e.preventDefault()
    
    const formErr = validateForm(form)
    setError(formErr)
    if (Object.keys(formErr).length !== 0) return false;
    
    setLoading(true)

    try {
        const options = {
            method: dataToEdit ? 'PUT' : 'POST',
            body: JSON.stringify(form),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
        }

        const res = await fetch(`${url}/${dataToEdit ? dataToEdit._id : ''}`, options)
        if(!res.ok) throw res
        const json = await res.json()
        dispatch({type: dataToEdit ? 'UPDATE_BOOK' : 'CREATE_BOOK', payload: json})

        // reset form
        setError({})
        setForm(initialForm)

        // cerrar modal
        handleClose()
        
    } catch (error) {

        setError({message: "Something went wrong"})
        try {
            // esto es por si el error viene del back
            const data = await error.json()
            console.log(data.error)
        } catch (err) {
            // esto es por si el error viene del front
            console.log(error)
        }
        
    }

    setLoading(false)
  }

  useEffect(() => {
    if(dataToEdit){
        setForm(dataToEdit)
    }else{
        setForm(initialForm)
    }

  }, [dataToEdit])

  return (
    <Box
        component="form"
        sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        // '& .MuiTextField-root': { m: 0, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        display="flex"
        flexDirection="column"
    >
        {/* Title */}
        <TextField error={error.title ? true : false} helperText={error.title || '' } label="Title" name="title" variant="standard" size="small" value={form.title} onChange={e => setForm({...form, title: e.target.value})}/>
        {/* Author */}
        <TextField error={error.author ? true : false} helperText={error.author || '' } label="Author" name="author" variant="standard" size="small" value={form.author} onChange={e => setForm({...form, author: e.target.value})}/>
        {/* Rating */}
        <FormControlLabel control={<Rating precision={0.5} />} label="Rating" name="rating" labelPlacement='start' value={form.rating} onChange={e => setForm({...form, rating: Number(e.target.value)})}/>
        {/* Read */}
        <FormControlLabel control={<Checkbox />} label="Mark as read" name="read" labelPlacement='start' checked={form.read} onChange={e => setForm({...form, read: e.target.checked})}/>

        {error.message? <Typography color="error" variant="body2">{error.message}</Typography> : ''}
 
        {/* Form Actions */}
        <Stack direction="row" justifyContent="center" spacing={1}>
            <Button disabled={loading} variant="text" onClick={handleClose}>Cancel</Button>
            <Button disabled={loading} variant="contained" onClick={handleSubmit}>Save</Button>
        </Stack>
    </Box>
  )
}

export default AddForm