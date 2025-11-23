import { PenSquareIcon, Trash2Icon } from "lucide-react"
import { Link } from "react-router"
import { formateDate } from "../../lib/utils"
import type { INote } from "../../@types/Inotes"
import axios from "axios"
import toast from "react-hot-toast"

interface INoteCardProps {
    note: INote
    setNotes: React.Dispatch<React.SetStateAction<INote[]>>
}

const NoteCard = ({note, setNotes}: INoteCardProps) => {

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.preventDefault()
        try {
            await axios.delete(`/notes/${id}`)
            setNotes((previusState) => previusState.filter((note) => note._id !== id))
            console.log(note)
            toast.success("Note deleted successfully")
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

  return (
      <Link
       to={`/${note._id}`}
       className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#b38013e5]"
       >
        <div className="card-body">
            <h3 className="card-title text-base-content">{note.title}</h3>
            <p className="text-base-content/70 line-clamp-3">{note.content}</p>

            <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content/60">
                    {formateDate(new Date(note.createdAt || ''))}
                </span>

                <div className="flex items-center gap-1">
                    <PenSquareIcon className="size-4" />
                    <button onClick={(e) => handleDelete(e,note._id)} className="btn btn-ghost btn-xs text-error">
                        <Trash2Icon className="size-4" />
                    </button>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default NoteCard
