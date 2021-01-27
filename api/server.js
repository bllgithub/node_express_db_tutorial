const express = require('express');

// morgan allows us to log access to our resources in console log:
// below are examples of logs:
    // POST /api/auth/login 200 302.778 ms - 229
    // GET /api/users 200 2.818 ms - 1180
    // GET /api/messages 200 1.461 ms - 581
const morgan = require('morgan');

// helmet hides info in the response headers about "express" 
const helmet = require('helmet');

//cors allows the api and client to be able to talk to each other
const cors = require('cors');

const restricted = require('../auth/restricted-middleware');

const lessonsRouter = require('../Routes/lessons-routes');
const messagesRouter = require('../Routes/messages-routes');
const usersRouter = require('../Routes/users-routes');
const authRouter = require('../auth/auth-routes');


const server = express();
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({message: "From server READ endpoint: ...  heloo world"})
})

server.use('/api/auth', authRouter);
// we can put more middleware here in between "restricted" and "lessonsRouter if we need to.
server.use('/api/lessons', restricted, lessonsRouter);
server.use('/api/messages', restricted, messagesRouter);
server.use('/api/users', restricted, usersRouter);

module.exports = server;
