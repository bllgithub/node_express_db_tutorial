const Lessons = require('../models/dbHelpers');
const bcryptjs = require('bcryptjs');
const express = require('express');

const router = express.Router();


// all end points are for "/api/lessons" routes

//router.post('/api/users/register', (req, res) => {
router.post('/register', (req, res) => {
    const credentials = req.body;
    const { username, password } = credentials;

    //check for blank fields
    if (!(username && password)) {
        return  res.status(400).json({message:"username & password are required!"});
    }

    const hash = bcryptjs.hashSync(credentials.password,12);
    credentials.password = hash;

    Lessons.addUser(credentials)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            if (error.errno === 19 ) {
                res.status(400).json({message: "Username already taken!"})
            }
            res.status(500).json(error);
        });
})

//router.post('/api/users/login', (req, res) => {
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    //check for blank fields
    if (!(username && password)) {
        return  res.status(400).json({message:"username & password are required!"});
    }
    
    Lessons.findUserByUsername(username)
        .then(user => {
            if (user && bcryptjs.compareSync(password, user.password)) {
                res.status(200).json({message:`Welcome ${user.username} !`});
            } else {
                res.status(401).json({message:"Invalid credentials!"});
            }
        })
        .catch(error => {
            res.status(500).json(error);
        })
});

router.get('/', (req, res) => {
    Lessons.findAllUsers()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json({message:"Unable to retrieve users!"})
        })
})

router.get('/:username', (req, res) => {
    const { username } = req.params;
    Lessons.findUserByUsername(username)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).json(error);
        })        
})


module.exports = router;
