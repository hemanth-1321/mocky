import { AppBar } from '@/components/AppBar'
import Footer from '@/components/footer'
import React, { ReactNode } from 'react'

const Rootlayout = ({children}:{children:ReactNode}) => {
  return (
      <div>
          <AppBar/>
          {children}
          <Footer/>
    </div>
  )
}

export default Rootlayout