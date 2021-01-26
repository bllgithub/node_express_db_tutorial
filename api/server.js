const express = require('express');
const lessonsRouter = require('../Routes/lessons-routes');
const messagesRouter = require('../Routes/messages-routes');
const usersRouter = require('../Routes/users-routes');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({message: "From server READ endpoint: ...  heloo world"})
})

server.use('/api/lessons', lessonsRouter);
server.use('/api/messages', messagesRouter);
server.use('/api/users', usersRouter);

module.exports = server;