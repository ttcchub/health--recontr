const rateLimit = require('express-rate-limit')



const loginLimiter = rateLimit({
    windowMs: 60 * 1000, //1 minute
    max: 5, //limit each IP to 5 login request per 'window' per minutes
    message: 'Too many accounts created from this IP, please try again after an hour',
    handler: (req, res, next, options) => {
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


module.exports = loginLimiter