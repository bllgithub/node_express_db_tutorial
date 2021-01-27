const express = require('express');
const morgan = require('morgan');
const restricted = require('../auth/restricted-middleware');

const lessonsRouter = require('../Routes/lessons-routes');
const messagesRouter = require('../Routes/messages-routes');
const usersRouter = require('../Routes/users-routes');
const authRouter = require('../auth/auth-routes');


const server = express();
server.use(morgan('dev'));
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({message: "From server READ endpoint: ...  heloo world"})
})

server.use('/api/auth', authRouter);
server.use('/api/lessons', restricted, lessonsRouter);
server.use('/api/messages', restricted, messagesRouter);
server.use('/api/users', restricted, usersRouter);

module.exports = server;
