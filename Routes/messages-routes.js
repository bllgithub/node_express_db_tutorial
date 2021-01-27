const Lessons = require('../models/dbHelpers');
const express = require('express');

const router = express.Router();

// all end points are for "/api/messages" routes
router.get('/', (req, res) => {
    Lessons.findAllMessages()
    .then(messages => {
        res.status(200).json(messages);
    })
    .catch(error => {
        res.status(500).json({message:"Error in retrieving all messages!"})
    })
})

// all end points are for "/api/messages" routes
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Lessons.findMessageById(id)
        .then(message => {
            res.status(200).json(message);
        })
        .catch(error => {
            res.status(500).json({message:"Error in retrieving message!"})
        })
});

//router.delete('/api/messages/:id', (req, res) => {
router.delete('/:id', (req, res) => {
const { id } = req.params;
Lessons.removeMessage(id)
    .then((count)=> {
        if (count > 0) {
            res.status(200).json({message:`Message with id: ${id} successfully deleted!` })
        } else {
            res.status(404).json({message:`Message with id: ${id} could not be found!` })
        }
    })
    .catch(error => {
        res.status(500).json({message:"Error deleting the message!"})
    })
})


//router.patch('/api/messages/:id', (req, res) => {
router.patch('/:id', (req, res) => {
const { id } = req.params;
const changes = req.body;

Lessons.updateMessage(id, changes)
    .then(message => {
        res.status(200).json({message})
    })
    .catch(error => {
        res.status(500).json({message:"Error in updating message!"})
    })
})

module.exports = router;
