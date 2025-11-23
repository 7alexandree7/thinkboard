import express from 'express'
import { getAllnotes } from '../Controllers/NoteControllers/getAllnotes'
import { createNotes } from '../Controllers/NoteControllers/createNotes'
import { updatedNotes } from '../Controllers/NoteControllers/updatedNotes'
import { deleteNotes } from '../Controllers/NoteControllers/deleteNotes'
import { getNoteById} from '../Controllers/NoteControllers/getAllnotesById'

const router = express.Router()

router.get('/', getAllnotes)
router.get('/:id', getNoteById)
router.post('/', createNotes)
router.put('/:id', updatedNotes)
router.delete('/:id', deleteNotes)

export default router