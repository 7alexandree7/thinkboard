import { Route, Routes } from "react-router"
import HomePage from "./Pages/HomePage/HomePage"
import CreatePage from "./Pages/CreatePage/CreatePage"
import NoteDetailsPage from "./Pages/NoteDetailsPage/NoteDetailsPage"


const App = () => {
  return (
    <div data-theme='halloween'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/:id" element={<NoteDetailsPage />} />
      </Routes>
    </div>
  )
}

export default App
