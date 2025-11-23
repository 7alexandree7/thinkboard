import { useEffect, useState } from "react"
import NavBar from "../../Components/NavBar/NavBar"
import RateLimitedUI from "../../Components/RateLimitedUI/RateLimitedUI"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { LoaderCircle } from "lucide-react"
import NoteCard from "../../Components/NoteCard/NoteCard"
import type { INote } from "../../@types/Inotes"
import NotesNotFound from "../../Components/NotesNotFound/NotesNotFound"

const HomePage = () => {

  const [isRateLimited, setIsRateLimited] = useState<boolean>(false)
  const [notes, setNotes] = useState<INote[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await axios.get<INote[]>('/notes')
        setNotes(data)
        setIsRateLimited(false)

      } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 429) {
          setIsRateLimited(true)
        }

        toast.error("Something went wrong")

      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])


  return (
    <div className="min-h-screen relative">

      <NavBar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="w-full text-center">
            <LoaderCircle className="animate-spin size-5 text-primary absolute top-1/2 left-1/2" />
          </div>
        )}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                setNotes={setNotes}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default HomePage
