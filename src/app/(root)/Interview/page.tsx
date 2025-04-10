"use client"
import { Agent } from '@/components/Agent'
import React from 'react'
import { useSession } from '@/hoooks/useSession'
const page = () => {
   const user= useSession()
   console.log("user",user  )
  return (
      <div>
      <Agent username={ user?.username} id={user?.id} type="generate" />
    </div>
  )
}

export default page