const allowedOrigins = require('./allowedOrigins');

// if one of the allowed origins(urls) then continue, else error
const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by cors'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};

module.exports = corsOptions;