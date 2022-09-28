import { useState } from 'react'

// Context
import { useBooksContext } from '../hooks/useBooksContext'

// Components
import { Box, TableContainer, Paper, Table, TableRow, TableCell, TextField, Button, Typography, TableHead, TableBody, Modal } from '@mui/material'
import Row from './Row'
import AddForm from './AddForm'


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};


const Tabla = () => {

  const {books, search, setSearch} = useBooksContext()

  const [dataToEdit, setDataToEdit] = useState(null)


  // modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setSearch('')
  }
  const handleClose = () => {
    setOpen(false)
    setDataToEdit(null)
  }

  return (
    <Paper>
      {/* Barra de búsqueda y add new */}
      <Box sx={{mx: 1, display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <Box component="form" noValidate autoComplete="off" sx={{'& > :not(style)': { m: 1, width: '25ch' }}}>
          <TextField label="Search" variant="standard" value={search} onChange={e => setSearch(e.target.value)} />
        </Box>
        <Button variant="contained" onClick={handleOpen}>New</Button>
      </Box>  

      <TableContainer>
        {
        books.length > 0 ?
        <Table stickyHeader aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Author</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="center">Read</TableCell>
                <TableCell align="center">Actions</TableCell>
            </TableRow>
            </TableHead>

            <TableBody>
            { books.map(book => <Row key={book._id} book={book} handleOpen={handleOpen} setDataToEdit={setDataToEdit}/>) }
            </TableBody>
        
        </Table>
        :
        <Typography sx={{m:4}} align="center">No data</Typography>

        }

      </TableContainer>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <AddForm handleClose={handleClose} dataToEdit={dataToEdit}/>
        </Box>
      </Modal>

    </Paper>
  )
}

export default Tabla