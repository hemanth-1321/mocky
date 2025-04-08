"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from './ui/button';

export const Agent = () => {
  


  const isSpeaking = true;

  enum CallStatus{
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED='FINISHED'
  }
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const handleCall = () => {
    if (callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED) {
      setCallStatus(CallStatus.CONNECTING)
      setTimeout(() => setCallStatus(CallStatus.ACTIVE), 1000);
    } else if (callStatus === CallStatus.ACTIVE) {
      setCallStatus(CallStatus.FINISHED);
    }
  }
  
  const Messages = [
    'Whats your Name',
    'My Name is Hemanth M'
  ]

  const lastMessage=Messages[Messages.length-1]
  return (
    <>
    <div className="flex flex-col md:flex-row items-center justify-center gap-6  p-4">
      <div className="flex flex-col items-center justify-center w-64 h-64 p-4 bg-gray-400 dark:bg-gray-800 rounded-xl shadow-md">
        <div className="relative flex items-center justify-center w-24 h-24 bg-blue-500 rounded-full overflow-hidden">
          <Image
            src="/ai-avatar.png"
            alt="AI Avatar"
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
          {isSpeaking && (
            <span className="absolute w-4/5 h-4/5 rounded-full bg-blue-300 opacity-75 animate-ping" />
          )}
        </div>
        <h1 className="mt-6 font-bold text-gray-900 dark:text-white">AI Interviewer</h1>
      </div>

      {/* User Card */}
      <div className="flex flex-col items-center justify-center w-64 h-64 p-4 bg-gray-400 dark:bg-gray-900 rounded-xl shadow-md">
        <div className="flex items-center justify-center w-24 h-24 bg-blue-500 rounded-full overflow-hidden">
          <Image
            src="/user-avatar.png"
            alt="User Avatar"
            width={90}
            height={90}
            className="rounded object-cover"
          />
        </div>
        <p className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">You</p>
      </div>

        {Messages.length > 0 && (
          <div className='border border-gray-400 p-2 rounded-2xl w-full'>
            <div className='rounded-2xl min-h-12 px-5 py-3 flex items-center justify-center'>
              <p key={lastMessage} className='transition-opacity duration-500'>
                {lastMessage}
              </p>
              </div>
          </div>
    )}
    </div> 
     <div className='w-full flex justify-center mt-8'>
        <Button onClick={handleCall}>
          {callStatus===CallStatus.ACTIVE?'End Call':callStatus===CallStatus.CONNECTING?'Connecting...':'Call'}
       </Button>
      </div>


    </>
  );
};
