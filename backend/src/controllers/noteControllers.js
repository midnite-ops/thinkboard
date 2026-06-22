export function getAllNotes(req, res) {
    res.status(200).send('You got 5 notes')
}

export function createNote(req, res) {
    res.status(201).json({message: 'Post created successfully'})
}

export function updateNote(req, res) {
    res.status(200).json({message: 'Post updated successfully'})
}

export function deleteNote (req, res) {
    res.status(200).json({message: 'Post deleted successfully'})
}

//wBNr2GMrzCZ9zLlX
//mongodb+srv://oyimsjesse4_db_user:wBNr2GMrzCZ9zLlX@cluster0.lc4tmu6.mongodb.net/?appName=Cluster0