import HomePage from "./components/HomePage"
import Header from "./components/Header"
import FileDisplay from "./components/FileDisplay"
import Transcribing from "./components/Transcribing"
import Information from "./components/Information"
import { useState, useRef, useEffect } from "react"

function App() {
  const [file, setFile] = useState(null)
  const [audio, setAudio] = useState(null)
  const [output, setOutput] = useState(null)
  const [downloading, setDownloading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  function resetPage() {
    setFile(null)
    setAudio(null)
  }

  const worker = useRef(null)

  async function readAudioFrom(file) {
    const sampling_rate = 16000
    const audioCTX = new AudioContext({ sampleRate: sampling_rate })
    const response = await file.arrayBuffer()
    const decoded = await audioCTX.decodeAudioData(response)
    const audio = decoded.getChannelData(0)
    return audio
  }

  async function handleFormSubmission() {
    if (!file && !audioStream) { return }

    let audio = await readAudioFrom(file ? file : audioStream)
    const model_name = `openai/whisper-tiny.en`

    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name
    })
  }

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('./utils/whisper.worker.js', import.meta.url), {
        type: 'module'
      })
    }

    const onMessageReceived = async (e) => {
      switch (e.data.type) {
        case 'DOWNLOADING':
          setDownloading(true)
          console.log('DOWNLOADING')
          break;
        case 'LOADING':
          setLoading(true)
          console.log('LOADING')
          break;
        case 'RESULT':
          setOutput(e.data.results)
          console.log(e.data.results)
          break;
        case 'INFERENCE_DONE':
          setFinished(true)
          console.log("DONE")
          break;
      }
    }

    worker.current.addEventListener('message', onMessageReceived)

    return () => worker.current.removeEventListener('message', onMessageReceived)
  })

  const isAvailable = file || audio
  return (
    <div className="flex flex-col max-w-[1080px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header />
        { output ? ( <Information output={output} finished={finished} /> ) : loading ? ( <Transcribing /> ) : isAvailable ? ( <FileDisplay file={file} audio={audio} resetPage={resetPage} /> ) : (<HomePage setFile={setFile} setAudioStream={setAudio}/>) }
      </section>
        <footer>
        </footer>
    </div>
  )
}

export default App
