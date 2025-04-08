  import { InterviewCard } from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

  export default function Home() {
    return (
  
      <div >

        <section className="flex flex-row bg-gray-400 dark:blue-gradient-dark rounded-3xl px-16 py-6 items-center justify-between max-sm:px-4 m-4 md:mx-10 lg:mx-12">

          <div className="flex flex-col gap-6 max-w-lg">
           <h2 className="font-bold text-2xl">Get Interview-Ready with AI-Powered Practice & Instant Feedback</h2>
            <p className="font-semibold">Practice with real interview questions and receive instant, personalized feedback.</p>
            <Button asChild className="btn-primary">
              <Link href="/Interview ">Start an Interview</Link>
            </Button>
          </div>
          <Image src={"/robot.png"} alt="robo" width={400} height={400} className="max-sm:hidden"/>
        </section>
        <section className="flex flex-col gap-6 mt-8">
          <h2 className="text-center font-bold">Your Interviews</h2>
          <div className="flex flex-wrap gap-4 max-lg:flex-col w-full items-stretch">
      
              <InterviewCard />
           
          </div>
        </section>
        
      
      </div>
    );
  }
