'use client';

import { InfiniteMovingCardsDemo } from "@/components/InfiniteMovingCard";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div>   
      {/* Hero Section */}
      <section className="h-screen w-full flex flex-col lg:flex-row items-center justify-center dark:bg-black px-6">
        <div className="max-w-xl text-center lg:text-left">
          <TextGenerateEffect words={"Ace Your Next Interview With Real Job Intelligence"} />
          <p className="mt-6 text-xs sm:text-xl text-gray-600 dark:text-gray-300">
            Practice with interview questions generated from actual job postings.
            Get AI-powered feedback to improve your responses and land your dream job.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
            onClick={()=>{
              router.push("/jobs")
            }}
            className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition">
              Get Started
            </button>
            <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              Learn More
            </button>
          </div>
        </div>

        <div className="mt-10 lg:mt-0 lg:ml-16">
          <Image src="/robot.png" alt="Interview Illustration" width={500} height={400} />
        </div>
      </section>

      <InfiniteMovingCardsDemo />

      {/* Trusted By Section */}
      <section className="w-full py-16 flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-950 px-6">
        <h1 className="text-4xl font-bold mb-8 text-center dark:text-white">
          Trusted by the best companies
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <div className="flex items-center gap-2">
            <img src="/100x.jpg" alt="100xDevs logo" className="h-12 w-auto" />
            <span className="text-2xl font-extrabold dark:text-white">100xDevs</span>
          </div>

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix"
            className="h-12 w-auto"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="Amazon"
            className="h-12 w-auto"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
            alt="Google"
            className="h-12 w-auto"
          />
          
          
          <span className="text-xl font-semibold dark:text-white">+ 100+ more</span>
        </div>
      </section>

      <section>
      </section>
    </div>
  );
}
