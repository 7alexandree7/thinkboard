import axios from "axios"
import { ArrowLeftIcon } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router"
import FormNote from "../../Components/FormNote/FormNote"

const CreatePage = () => {

  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields")
      return
    }
    setLoading(true)

    try {
      await axios.post('/notes', { title, content })
      toast.success("Note created successfully")
      setTitle('')
      setContent('')
      navigate('/')
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">

        <div className="max-w-2xl mx-auto">
          <Link className="btn btn-ghost mb-6" to="/">
            <ArrowLeftIcon className="size-5" />
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create a New Note</h2>
              <FormNote
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                handleSubmit={handleSubmit}
                loading={loading}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CreatePage
