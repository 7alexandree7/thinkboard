import { Note } from './../../models/Notes';
import { Request, Response } from "express"

export const updatedNotes = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {

    const { title, content } = req.body

    try {
        const updateUser = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true })
        if (!updateUser) {
            return res.status(404).json({ message: 'User not found' })
        }
        return res.status(200).json(updateUser)

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}