import HomePage from "./components/HomePage"

function App() {
  return (
    <div className="flex flex-col max-w-[1080px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <header className="flex items-center justify-between gap-4 p-4">
          <h1>One<span className="text-blue-400">ToMany</span></h1>
          <button className="flex items-center gap-2">New<i className="fa-solid fa-plus"></i></button>
        </header>
        <HomePage />
        <footer> 
        </footer>
      </section>
    </div>
  )
}

export default App
