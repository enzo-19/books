const errorHandler = (err, req, res, next) => {

    let customErr = {
        status: err.status || 500,
        error: err.message || 'Something went wrong'
    }

    if(err.name === 'CastError') {
        if (err.path === '_id') {
            customErr.status = 404
            customErr.error = 'Book not found'
        } else {
            // al intentar actualizar el registro con formato inválido en alguno de los campos
            customErr.status = 500
            customErr.error = err.message
        }
    }

    res.status(customErr.status).json({error: customErr.error})
}

module.exports = errorHandler