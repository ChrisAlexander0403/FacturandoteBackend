const notesController = {};
const noteModel = require('../models/note');

notesController.getNotes = async (req, res) => {
    const notes = await noteModel.find();
    res.send(notes);
}
notesController.createNote = async (req, res) => {
    const { title, content, date, author } = req.body;
    const newNote = new noteModel({
        title,
        content,
        date,
        author
    });
    await newNote.save();
    res.json({message: 'Note saved'});
}
notesController.getNote = async (req, res) => {
    const note = await noteModel.findOne({_id: req.params.id})
    res.json(note)
}
notesController.deleteNote = async (req, res) => {
    await noteModel.findOneAndDelete({_id: req.params.id});
    res.json({message: 'Note Deleted'})
}
notesController.updateNote = async (req, res) => {
    const { title, content, author } = req.body
    await noteModel.findOneAndUpdate({_id: req.params.id}, {
        title,
        content,
        author
    })
    res.json({message: 'Note Updated'})
}

module.exports = notesController;