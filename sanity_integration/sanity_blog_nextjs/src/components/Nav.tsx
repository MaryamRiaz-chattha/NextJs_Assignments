import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div >
      
    <nav className="bg-violet-800 flex justify-around text-white p-10 ">
        
    <Link href="" className="text-zinc-950 text-left font-bold font-serif">MyBlog</Link>
        <Link href="/home">Home</Link>
        <Link href="/blogs">Blogs</Link>
        <Link href="/about">About</Link>
      
  
    </nav>
    </div>
  )
}
