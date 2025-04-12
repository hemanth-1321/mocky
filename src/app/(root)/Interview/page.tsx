"use client"
import { Agent } from '@/components/Agent'
import React from 'react'
import { useSession } from '@/hoooks/useSession'
import { useInterviewStore } from "@/lib/store/useInterviewStore";

const page = () => {
    const questions = useInterviewStore((state) => state.questions);
    const interviewId = useInterviewStore((state) => state.interviewId);

   const user= useSession()
   console.log("user",user ,interviewId )
  return (
      <div>
      <Agent username={ user?.username} id={user?.id} type="generate" questions={questions} interviewId={interviewId}  />
    </div>
  )
}

export default page