//centralized error handling

const errorHandling = (err, req, res, next)=>{
    console.log(err.stack);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        status,
        message,
    })
}

export default errorHandling;