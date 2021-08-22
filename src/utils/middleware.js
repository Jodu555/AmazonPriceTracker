function notFound(req, res) {
    throw new Error('notFound')
}

function errorHandling(err, req, res, next) {
    const error = {
        message: err.stack.split('\n')[0],
        stack: err.stack,
    };
    if (process.env.NODE_ENV !== 'production') {
        if (error.message.includes('notFound')) {
            res.status(404).send({
                success: false,
                path: req.path,
                message: 'Route not Found!',
            });
        } else {
            res.status(500).send({
                success: false,
                path: req.path,
                error,
            });
        }
    } else {
        res.status(500).send({
            success: false,
            message: error.message,
        })
    }
}

module.exports = {
    notFound,
    errorHandling,
}