// explains what routes exists

const express = require('express');
const router = express.Router();

let notes = require('../data/notes');
const validateInput = require('../middleware/validateinput');

router.get('/', (req, res) => {
    res.json(notes);
});

router.get('/:id', (req, res) => {
    const noteId = parseInt(req.params.id);
    const note = notes.find(n => n.id === noteId);

    if (!note) {
        return res.status(404).json({message: "Note not found."});

    }
    res.json(note);
});

router.post('/', validateInput, (req, res) => {
    const newNote = {
        id: notes.length > 0 ? notes[notes.length - 1].id + 1: 1,
        title: req.body.title,
        content: req.body.content
    };

    notes.push(newNote);
    res.status(201).json(newNote);
});

router.put('/:id', validateInput, (req, res) => {
    const noteId = parseInt(req.params.id);
    const noteIndex = notes.findIndex(n => n.id === noteId);

    if (noteIndex === -1) {
        return res.status(404).json({message : 'Note not found.'});
    }

    notes[noteIndex] = {
        id: noteId,
        title: req.body.title,
        content: req.body.content
    };
    res.json(notes[noteIndex]);
});

router.delete('/:id', (req, res) => {
    const noteId = parseInt(req.params.id);
    const noteIndex = notes.findIndex(n => n.id === noteId);

    if (noteIndex == -1) {
        return res.status(404).json({message: 'Note not found'});

    }

    const deletedNote = notes.splice(noteIndex, 1);
    res.json(deletedNote[0]);
});

module.exports = router;