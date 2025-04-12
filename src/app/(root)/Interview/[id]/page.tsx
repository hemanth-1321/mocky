"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/hoooks/useSession";
import { BACKEND_URL } from "@/lib/config";
import axios from "axios";
import { BriefcaseBusiness } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useInterviewStore } from "@/lib/store/useInterviewStore";
import { useRouter } from "next/navigation";

const Page = () => {
  const user = useSession();
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [isQuestionsCreated, setIsQuestionsCreated] = useState(false);
  const[questions,setquestions]=useState()
  const [loading, setLoading] = useState(false);

const router = useRouter();
const setQuestions = useInterviewStore((state) => state.setQuestions);

  useEffect(() => {
    axios.get('https://remoteok.com/api')
      .then((res) => {
        const jobs = res.data.slice(1) as Job[];
        const selectedJob = jobs.find((job) => job.id.toString() === id);
        if (selectedJob) {
          setJob(selectedJob);
        }
      })
      .catch((err) => console.error('Failed to fetch job:', err));
  }, [id]);

  useEffect(() => {
  if (user?.id && job?.id) {
    axios.get(`${BACKEND_URL}/api/vapi/generate`, {
      params: {
        userId: user.id,
        jobId: job.id,
      }
    }).then((res) => {
      if (res.data?.question?.isQuestionsCreated) {
        setIsQuestionsCreated(true);
      }
      if (res.data?.question?.questions) {
        setquestions(res.data?.question?.questions)

      }
    }).catch((err) => console.error("Failed to check question status:", err));
  }
}, [user?.id, job?.id]);

  const handleGenerateInterview = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_URL}/api/vapi/generate`, {
        position: job?.position,
        company: job?.company,
        location: job?.location,
        tags: job?.tags,
        userId: user?.id,
        salary_max: job?.salary_max,
        salary_min: job?.salary_min,
        amount: 10,
        jobId:job?.id
      });
      setIsQuestionsCreated(true);
      toast.success("Interview generated");
      console.log("Interview generated:", res.data.question.isQuestionsCreated);
    } catch (err) {
      console.error("Failed to generate interview:", err);
      toast.error("Failed to generate interview");
    } finally {
      setLoading(false);
    }
  };
  const handleTakeInterview = async () => {
    if (questions) { 
      setQuestions(questions)
      router.push("/Interview")
    } else {
      toast.error("no Questions Found")
 }

  console.log("question",questions)
}
  if (!job) {
    return <div className="text-center text-xl mt-10">No jobs found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex justify-between">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{job.position}</h1>
        <div className="flex items-center">
          {isQuestionsCreated ? (
            <div className="flex flex-col gap-4"><span className="text-green-600 font-medium">Interview Questions generated</span>
            <Button onClick={handleTakeInterview} variant={"ghost"}><BriefcaseBusiness />take a interview</Button></div>
          ) : (
            <Button onClick={handleGenerateInterview} disabled={loading}>
              {loading ? "Generating..." : "Generate Interview"}
            </Button>
          )}
        </div>
    
      </div>

      <p className="text-lg text-gray-600 mb-1">{job.company}</p>
      {job.location && (
        <p className="text-sm text-gray-500 mb-4">{job.location}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {job.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{
          __html: job.description || "<p>No description available.</p>",
        }}
      />
    </div>
  );
};

export default Page;
