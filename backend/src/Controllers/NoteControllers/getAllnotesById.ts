import { Note } from './../../models/Notes';
import { Request, Response } from "express"

export const getNoteById = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {

    try {
        const id = req.params.id
        const getNotesById = await Note.findById(id)
        if (!getNotesById) {
            return res.status(404).json({ message: 'Notes not found' })
        }
        return res.status(200).json(getNotesById)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}