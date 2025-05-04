import { AppBar } from '@/components/AppBar'
import Footer from '@/components/footer'
import React, { ReactNode } from 'react'
import { Toaster } from 'sonner'

const Rootlayout = ({children}:{children:ReactNode}) => {
  return (
      <div>
          <AppBar/>
          {children}
          <Footer/>
          <Toaster/>
    </div>
  )
}

export default Rootlayout