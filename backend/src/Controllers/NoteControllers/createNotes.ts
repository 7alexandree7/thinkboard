import { CreateNoteBody } from '../../@types/createNoteBody';
import { Note } from './../../models/Notes';
import { Request, Response } from "express"

export const createNotes = async (req:Request<{}, {}, CreateNoteBody>, res:Response): Promise<Response> => {
    const { title, content} = req.body

    try {
        const createdNote = await Note.create({title, content})
        return res.status(201).json(createdNote)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}