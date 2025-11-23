import { Plus} from "lucide-react"
import type { JSX } from "react"
import { Link } from "react-router"

const NavBar = (): JSX.Element => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="w-full flex items-center justify-between">

          <Link to="/">
            <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">ThinkBoard</h1>
          </Link>

          <Link to="/create" className="btn btn-primary min-w-36 text-center font-bold flex items-center justify-center"> <Plus className="size-5" /> Create</Link>
        </div>
      </div>
    </header>
  )
}

export default NavBar
