const express = require('express');
const session = require('express-session');
const restricted = require('../auth/restricted-middleware');

const lessonsRouter = require('../Routes/lessons-routes');
const messagesRouter = require('../Routes/messages-routes');
const usersRouter = require('../Routes/users-routes');
const authRouter = require('../auth/auth-routes');

const server = express();

const sessionConfig = {
    name: 'monster', // name of cookie
    secret: process.env.SECRET, // secret that makes cookie effective
    cookie: {
        maxAge: 1000 * 60 * 60, // time span of thhe cookie
        secure: false, // for production, set to true for https only access
        httpOnly: true // true means no access from javascript
    },
    resave: false,
    saveUninitialized: true // GDPR laws, user has to give consent
}

server.use(express.json());
server.use(session(sessionConfig));

server.get('/', (req, res) => {
    res.status(200).json({message: "From server READ endpoint: ...  heloo world"})
})

server.use('/api/auth', authRouter);
server.use('/api/lessons', restricted, lessonsRouter);
server.use('/api/messages', restricted, messagesRouter);
server.use('/api/users', restricted, usersRouter);

module.exports = server;
