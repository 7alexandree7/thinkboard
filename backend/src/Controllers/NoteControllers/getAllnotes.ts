import { Note } from './../../models/Notes';
import { Request, Response } from "express"

export const getAllnotes = async (_: Request, res: Response): Promise<Response> => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 })
        return res.status(200).json(notes)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}