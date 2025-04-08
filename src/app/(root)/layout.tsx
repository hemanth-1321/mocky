import { AppBar } from '@/components/AppBar'
import React, { ReactNode } from 'react'

const Rootlayout = ({children}:{children:ReactNode}) => {
  return (
      <div>
          <AppBar/>
          {children}
    </div>
  )
}

export default Rootlayout