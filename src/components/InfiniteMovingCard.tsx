"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
    {
      
      quote:
        "This platform gave me a real edge. Practicing with questions pulled from actual job listings helped me land my first tech role!",
      name: "Anjali Mehta",
      title: "Software Engineer at Amazon",
    },
    {
      quote:
        "I was amazed by how accurate and relevant the AI-generated questions were. It felt like a real interview.",
      name: "Ravi Sharma",
      title: "Data Analyst at Google",
    },
    {
      quote:
        "The feedback system showed me exactly where I was going wrong and how to improve. Highly recommended!",
      name: "Sarah Lee",
      title: "Product Manager at Netflix",
    },
    {
      quote:
        "I practiced every day for a week and got shortlisted in two companies. This platform is a game-changer.",
      name: "Karthik Raj",
      title: "Frontend Developer at Microsoft",
    },
    {
      quote:
        "The user experience is smooth and focused. It’s like having a personal interview coach in your pocket.",
      name: "Emily Zhao",
      title: "UX Designer at Adobe",
    },
  ];
  
