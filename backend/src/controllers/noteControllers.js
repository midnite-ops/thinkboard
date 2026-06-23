import Note from "../models/Note.js"

export async function getAllNotes(_, res) {
    try{
        //.find() is used to get all the notes from the database
        const notes = await Note.find().sort({createdAt: -1}) //Shows the newest item created
        res.status(200).json(notes)
    }
    catch(error){
        console.error("error in the getAllNotes controller", error)
        res.status(500).json({message: 'Internal server error'})
    }
}

export async function getNoteById(req,res) {
    try {
        const findNote = await Note.findById(req.params.id)
        if(!findNote) return res.status(404).json({message: 'Note does not exist'})
        res.status(200).json(findNote)
    } catch (error) {
        console.error("error in the getNoteById controller", error)
        res.status(500).json({message: 'Internal server error'})
    }
}

export async function createNote(req, res) {
    try {
        //req.body: this is the content normally gotten from the frontend of the application
        const {title, content} = req.body

        //new Note: this creates a new instance of the Note model
        const newNote = new Note({title, content});

        //.save() this method saves the created note to the database
        await newNote.save();
        res.status(201).json({message: 'New note created successfully'})
    } catch (error) {
        console.error("error in the createNote controller", error)
        res.status(500).json({message: 'Internal server error'})
    }
    
}

export async function updateNote(req, res) {
    try {
        const {title, content} = req.body

        //.findByIdAndUpdate takes in two parameters, the id of the item and what update 
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title, content}, {new: true})
        if(!updatedNote){
            return res.status(404).json({message: 'Note not found'})
        }
        res.status(200).json(updatedNote)
    } catch (error) {
        console.error("error in the updateNote controller", error)
        res.status(500).json({message: 'Internal server error'})
    }
    
}

export async function deleteNote (req, res) {
    try {
        const findNote = await Note.findByIdAndDelete(req.params.id)
        if(!findNote){
            return res.status(404).json({message: 'Note not found'})
        }
        res.status(200).json({message: 'Note deleted successfully'})
    } catch (error) {
        console.error("error in the createNote controller", error)
        res.status(500).json({message: 'Internal server error'})
    }
    
}
