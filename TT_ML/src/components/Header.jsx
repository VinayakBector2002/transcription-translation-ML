import React from 'react'

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 p-4">
    <h1 className='font-medium'>One<span className="text-blue-400 bold">ToMany</span></h1>
    <button className="flex items-center gap-2 newIconBtn px-4 py-2 rounded-lg text-blue-400">New<i className="fa-solid fa-plus"></i></button>
  </header>
  )
}
