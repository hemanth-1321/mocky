"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { vapi } from "@/lib/vapi";

export const Agent = ({ username, id, type }: AgentProps) => {
  const router = useRouter();

  enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
  }

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessaged[]>([]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => console.error("error", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      router.push("/");
    }
  }, [callStatus]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    console.log(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!)
    try {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username: username,
          userId: id,
        },
      });
    } catch (err) {
      console.error("Failed to start call:", err);
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);
    try {
      await vapi.stop();
    } catch (err) {
      console.error("Failed to stop call:", err);
    }
  };

  const lastMessage = messages[messages.length - 1]?.content;

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-4">
        {/* AI Avatar */}
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

        {/* User Avatar */}
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

        {/* Message Display */}
        {messages.length > 0 && (
          <div className="border border-gray-400 p-2 rounded-2xl w-full">
            <div className="rounded-2xl min-h-12 px-5 py-3 flex items-center justify-center">
              <p key={lastMessage} className="transition-opacity duration-500">
                {lastMessage}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Call Button */}
      <div className="w-full flex justify-center mt-8">
        <Button
          onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
          disabled={callStatus === CallStatus.CONNECTING}
        >
          {callStatus === CallStatus.ACTIVE
            ? "End Call"
            : callStatus === CallStatus.CONNECTING
            ? "Connecting..."
            : "Call"}
        </Button>
      </div>
    </>
  );
};
