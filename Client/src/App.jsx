import { Routes, Route } from "react-router-dom"
import register from "./Pages/register"

const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/register" element={register} />
      </Routes>
    </main>
  )
}

export default App