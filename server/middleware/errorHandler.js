

// default error handler 
const errorHanlder = (err, req, res, next) => {
    // console.log('default event')
    // console.log(`${req.method} ${req.path}`)
    // console.log(err.stack)
    const status = res.statusCode ? res.statusCode : 500 // server errror
    res.status(status).json({ msg: err.message })
}

module.exports = errorHanlder