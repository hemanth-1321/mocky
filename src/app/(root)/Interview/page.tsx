"use client"
import { Agent } from '@/components/Agent'
import React from 'react'
import { useSession } from '@/hoooks/useSession'
import { useInterviewStore } from "@/lib/store/useInterviewStore";

const page = () => {
    const questions = useInterviewStore((state) => state.questions);

   const user= useSession()
   console.log("user",user  )
  return (
      <div>
      <Agent username={ user?.username} id={user?.id} type="generate" questions={questions} />
    </div>
  )
}

export default page