import { useState } from 'react'

// Context
import { useBooksContext } from '../hooks/useBooksContext';
import { useAuthContext } from '../hooks/useAuthContext';

// MUI Components
import { TableRow, TableCell, Rating, Typography, Stack, IconButton } from "@mui/material"

// MUI Icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';

const Row = ({book, setDataToEdit, handleOpen}) => {
    const [loadingDelete, setLoadingDelete] = useState(false)
    const {url, dispatch} = useBooksContext()
    const {user} = useAuthContext()

    const handleDelete = async (id) => {
        setLoadingDelete(true)

        try {
            const res = await fetch(`${url}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
            })
        
            if(!res.ok) throw res
        
            const json = await res.json()
        
            dispatch({type: 'DELETE_BOOK', payload: json})
            
        } catch (error) {

            try {
                // esto es por si el error viene del back
                const data = await error.json()
                console.log(data)
            } catch (err) {
                // esto es por si el error viene del front
                console.log(error)
            }
            
        }

        setLoadingDelete(false)
    }

    const handleEdit = (data) => {
        setDataToEdit(data)
        handleOpen()
    }

    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            {/* Title */}
            <TableCell component="th" scope="row">{book.title ||'Not provided'}</TableCell>
            {/* Author */}
            <TableCell align="right">{book.author || <Typography sx={{color: "text.disabled"}} variant="body2">Not provided</Typography>}</TableCell>
            {/* Rating */}
            <TableCell align="center">
                {book.rating ? <Rating disabled={!book.rating} size='small' name="rating" precision={0.5} value={book.rating} readOnly /> : <Typography sx={{color: "text.disabled"}} variant="body2">Not rating given</Typography>}
            </TableCell>
            {/* Read */}
            <TableCell align="center">
                {book.read ? <DoneAllIcon color="info"/> : <RemoveDoneIcon color="disabled"/>}
            </TableCell>
            {/* Actions */}
            <TableCell align="center">
                <Stack direction="row" justifyContent="center" spacing={1}>
                    <IconButton aria-label="delete" onClick={() => handleDelete(book._id)} disabled={loadingDelete}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => handleEdit(book)}>
                        <EditIcon />
                    </IconButton>
                </Stack>
            </TableCell>
        </TableRow>
    )
}

export default Row