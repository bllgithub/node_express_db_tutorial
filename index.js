const express = require('express');
const Lessons = require('./models/dbHelpers');

const server = express();

server.use(express.json());
const PORT = 5000;


server.get('/', (req, res) => {
    res.status(200).json({message: "From server READ endpoint: ...  heloo world"})
})

server.post('/api/lessons', (req, res) => {
    Lessons.add(req.body)
        .then(lesson => {
            res.status(200).json(lesson);
        })
        .catch(error => {
            server.status(500).json({message: "cannot find lesson!"})
        })
})

server.get('/api/lessons', (req, res) => {
    Lessons.read()
        .then(lessons => {
            res.status(200).json(lessons);
        })
        .catch(error => {
            res.status(500).json({message: "Unable to retrieve database!"})
        })
})


server.get('/api/lessons/:id', (req, res) => {
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

server.delete('/api/lessons/:id', (req, res) => {
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

server.patch('/api/lessons/:id', (req, res) => {
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



server.listen(PORT, () => {
    console.log(`\n *** Server running on http://localhost:${PORT}`);
});