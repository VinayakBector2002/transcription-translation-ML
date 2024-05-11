import React from 'react'

export default function FileDisplay(props) {
    const { file, audio, resetPage } = props

  return (
    <main className="flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 text-center justify-center pb-20 w-fit max-w-full mx-auto">
    <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl'>Your<span className='text-blue-400 bold'>File</span></h1>
    <div className='flex flex-col gap-2'>
    <h2 className='font-semibold text-xl sm:text-2xl'>File Name: <span className='text-blue-400 bold'>{file ? file.name : "Recorded Audio"}</span></h2>
    </div>
    { file && 
    <div className='flex gap-4 justify-center'>
    <h3 className='font-semibold text-xl'>File Type: {file.type} </h3>
    <h3 className='font-semibold text-xl'>File Size: {file.size} bytes</h3>
    </div>
    }
    
    <div className='flex gap-4 justify-center gap-8'>
        <button className='text-slate-400 hover:text-blue-600 duration-200' onClick={resetPage}>Reset</button>
        <button className='newIconBtn p-2 rounded-lg text-blue-400 flex items-center gap-2 font-medium'><p>Transcribe</p> <i className='fa-solid fa-pen-nib'></i></button>
    </div>
    </main>
  )
}
