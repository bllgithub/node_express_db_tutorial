const Lessons = require('../models/dbHelpers');
const bcryptjs = require('bcryptjs');
const express = require('express');

const router = express.Router();

// all end points are for "/api/auth" routes

//router.post('/api/auth/register', (req, res) => {
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

//router.post('/api/auth/login', (req, res) => {
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    //check for blank fields
    if (!(username && password)) {
        return  res.status(400).json({message:"username & password are required!"});
    }
    
    Lessons.findUserByUsername(username)
        .then(user => {
            if (user && bcryptjs.compareSync(password, user.password)) {
                console.log("From /login endpoint before creation ... session object", req.session);                

                // add object user to object session 
                req.session.user = {
                    id: user.id,
                    username: user.username
                }
                console.log("From /login endpoint after creation ... session object", req.session);                

                res.status(200).json({message:`Welcome ${user.username} !`});
            } else {
                res.status(401).json({message:"Invalid credentials!"});
            }
        })
        .catch(error => {
            res.status(500).json(error);
        })
});

router.get('/logout', (req, res) => {
    if (req.session) {
        console.log("From /logout endpoint before destroying ... session object", req.session);                
        // when session is destroyed, object user is removed from object session  
        req.session.destroy((error) => {
            if (error) {
                res.status(500).json({message:"You can checkout anytime but you can never leave!"});
            } else {
                console.log("From /logout endpoint after destroyed ... session object", req.session);                
                res.status(200).json({message:"Successfully loged out!"});
            }
        })
    } else {
        res.status(200).json({message:"Not logged in!"});
    }
})

module.exports = router;