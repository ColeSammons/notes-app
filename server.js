// express is a node.js framework
const express = require('express');
const app = express();
// provides utilities for working with file and directory paths
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const { logger } = require('./middleware/logger');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3500;

app.use(logger);

// enables all cors requests instead of individual routes
app.use(cors(corsOptions));

// allows app to recieve and parse json data
app.use(express.json());

// parse cookies that are recieved
app.use(cookieParser());

// express.static acts as middleware, telling the server where to find static files
app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, './views/404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

// Using custom error handler that overrides express default
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));