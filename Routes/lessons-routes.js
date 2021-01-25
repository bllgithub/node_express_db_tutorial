const Lessons = require('../models/dbHelpers');
const express = require('express');

const router = express.Router();

// all end points are for "/api/lessons" routes

// router.post('/api/lessons', (req, res) => {
router.post('/', (req, res) => {
Lessons.add(req.body)
    .then(lesson => {
        res.status(200).json(lesson);
    })
    .catch(error => {
        res.status(500).json({message: "cannot find lesson!"})
    })
})

// router.get('/api/lessons', (req, res) => {
router.get('/', (req, res) => {
    Lessons.read()
        .then(lessons => {
            res.status(200).json(lessons);
        })
        .catch(error => {
            res.status(500).json({message: "Unable to retrieve database!"})
        })
})

// router.get('/api/lessons/:id', (req, res) => {
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Lessons.findById(id)
        .then(lesson => {
            if (lesson) {
                res.status(200).json(lesson);
            } else {
                res.status(404).json({message: "Record not found!"});
            }
        })
        .catch(error => {
            res.status(500).json({message: "Error in finding this id!"});
        })
})

// router.delete('/api/lessons/:id', (req, res) => {
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Lessons.remove(id) // return the number of rows affected
        .then(count => {
            if (count > 0) {
                res.status(200).json({message: "Succesfully deleted!"})
            } else {
                res.status(500).json({message: "Unable to locate record to be deleted!"})
            }
        })
        .catch(error => {
            res.status(500).json({message: "Error in deleting record!"});
        })
})

// router.patch('/api/lessons/:id', (req, res) => {
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    changes = req.body;

    Lessons.update(id, changes)
        .then(lesson => {
            if(lesson) {
                res.status(200).json(lesson);
            } else {
                res.status(404).json({message: "Record not found!"})
            }
        })
        .catch(error => {
            res.status(500).json({message: "Error updating record!"})
        })
})

// router.post('/api/lessons/:id/messages', (req, res) => {
router.post('/:id/messages', (req, res) => {
    const { id } = req.params;
    const msg = req.body;
    
    // if lesson_id does not exist in msg object then add it with
    // the value of id taken from params
    if (!msg.lesson_id) {
        msg["lesson_id"] = parseInt(id, 10) // 10 means base 10
    } 

    // Find the lesson where the message is about to be appended to.
    // when lesson found then append the message

    Lessons.findById(id)
        .then(lesson => {
            //if lesson not found
            if (!lesson) {
                res.status(404).json({message:"Invalid id!"})
            }

            // Check for all required fields
            if (!msg.sender || !msg.text) {
                res.status(400).json({message:"Must provide both Sender and Text values!"})
            }

            // means everything is ok so execute adding record for message
            Lessons.addMessage(msg, id)
                .then(message => {
                    if (message) {
                        res.status(200).json(message)
                    }
                })
                .catch(error => {
                    res.status(500).json({message:"Failed to add message"})
                });

        })
        .catch(error => {
            res.status(500).json({message:"Error finding lesson!"})
        });

});

// router.get('/api/lessons/:id/messages', (req, res) => {
router.get('/:id/messages', (req, res) => {
    const { id } = req.params;

    Lessons.findLessonMessages(id)
        .then(lessons => {
            res.status(200).json(lessons)
        })
        .catch(error => {
            res.status(500).json({message:"Error retrieving messages!"})
        })
})

module.exports = router;