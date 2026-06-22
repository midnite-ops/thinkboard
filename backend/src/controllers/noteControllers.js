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