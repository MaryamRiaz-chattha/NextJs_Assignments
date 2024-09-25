import React from 'react'
import Link from 'next/link'
import { ModeToggle } from '@/components/ModeToggle'
export default function Navbar() {
  return (
    <div >
      
      <nav className="bg-gray-800 flex justify-around text-white p-10 neon-text">
  <Link href="" className="text-white text-left font-bold font-serif">MyBlog</Link>
  <span>
  <ModeToggle/>
  </span>
</nav>

    </div>
  )
}
