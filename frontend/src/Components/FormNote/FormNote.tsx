interface FormNoteProps {
    title: string
    setTitle: (title: string) => void
    content: string
    setContent: (content: string) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    loading: boolean
}

const FormNote = ({ title, setTitle, content, setContent, handleSubmit, loading }: FormNoteProps) => {

    return (
        <form onSubmit={(e) => handleSubmit(e)}>

            <div className="form-control mb-4">
                <label className="label">Title</label>
                <input
                    type="text"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Enter a title"
                />
            </div>

            <div className="form-control mb-4">
                <label className="label">Content</label>
                <input
                    type="text"
                    className="input input-bordered"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    placeholder="example content here ..."
                />
            </div>

            <div className="card-actions justify-end">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Note'}
                </button>
            </div>
        </form>
    )
}

export default FormNote
