import HomePage from "./components/HomePage"
import Header from "./components/Header"
import { useState } from "react"

function App() {
  const [file, setFile] = useState(null)
  const [audio, setAudio] = useState(null)

  const isAvailable = file || audio
  return (
    <div className="flex flex-col max-w-[1080px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header />
        {isAvailable ? (<FileDisplay />) : (<HomePage />)}
        <footer>
        </footer>
      </section>
    </div>
  )
}

export default App
