import { useBooksContext } from "../hooks/useBooksContext"

// Components
import { Box, CircularProgress, Typography } from "@mui/material"
import Tabla from "../components/Tabla"

const Home = () => {

  const {books, isLoading, error} = useBooksContext()

  return (
    <>
      {isLoading && !books && <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}

      {books && <Tabla/>}

      {!isLoading && error && <Typography align="center">{error}</Typography>}
    </>
  )
}

export default Home