import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate, useParams } from "react-router"
import type { INote } from "../../@types/Inotes"
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react"

const NoteDetailsPage = () => {

  const [note, setNotes] = useState<INote | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [saving, setSaving] = useState<boolean>(false)

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await axios.get(`/notes/${id}`)
        setNotes(data)
      } catch (error) {
        console.log(error)
        toast.error("Failed to fetch notes")
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [id])

  const handleSave = async () => {
    if (!note?.title.trim() || !note?.content.trim()) {
      toast.error("Please fill in all fields")
      return
    }
    setSaving(true)

    try {
      await axios.put(`/notes/${id}`, note)
      toast.success("Note saved successfully")
      navigate("/")
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      axios.delete(`/notes/${id}`)
      toast.success("Note deleted successfully")
      navigate("/")
    }
    catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          <div className="flex items-center justify-between mb-6">
            <Link className="btn btn-ghost" to="/">
              <ArrowLeftIcon className="size-5" />
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline ">
              <Trash2Icon className="size-5" />
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label>Title</label>
                <input
                  type="text"
                  required
                  className="input input-bordered"
                  placeholder="Note Title"
                  value={note?.title || ""}
                  onChange={(e) =>
                    setNotes(prev => prev ? { ...prev, title: e.target.value } : prev)
                  }

                />
              </div>
              <div className="form-control mb-4">
                <label>Content</label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note?.content || ""} 
                  onChange={(e) =>
                    setNotes(prev => prev ? { ...prev, content: e.target.value } : prev)
                  }
                >
                </textarea>
              </div>

              <div className="card-actions justify-end">
                <button disabled={saving} className="btn btn-primary" onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default NoteDetailsPage
