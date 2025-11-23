import { Note } from './../../models/Notes';
import { Request, Response } from "express"

export const deleteNotes = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {

    try {
        const deletedUser = await Note.findByIdAndDelete(req.params.id)
        if (!deletedUser) {
            return res.status(404).json({ message: 'notes not found' })
        }
        return res.status(200).json(deletedUser)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}
