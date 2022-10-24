
exports.constants = {
    // error handler
    handleError: (err, res) => {

        let errObj = {};
        
        err.errors.map(error => {
            errObj[error.path] = error.message
        });
        return res.status(400).send(errObj);

    }
}