import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import ThemeToggle from './ThemeToggle'

export const AppBar = () => {
  return (
    <header className="bg-gray-400  dark:bg-gray-950  dark:text-white rounded-2xl m-4 p-4">
      <div className="max-w-full mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-wide">
          MOCKY
        </Link>

        <div className='flex gap-2'>
          <ThemeToggle/>
          <Button asChild>
            <Link href="/sign-up">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
