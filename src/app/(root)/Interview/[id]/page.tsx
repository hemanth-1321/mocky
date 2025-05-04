"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; 
import { useSession } from "@/hoooks/useSession";
import { BACKEND_URL } from "@/lib/config";
import axios from "axios";
import { BriefcaseBusiness, MessageCircle } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useInterviewStore } from "@/lib/store/useInterviewStore";
import { useRouter } from "next/navigation";

const JobDetailSkeleton = () => (
  <div className="h-screen max-w-4xl mx-auto mt-20 p-4 md:p-8 space-y-4">
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-4 w-40" />
      </div>
      <Skeleton className="h-10 w-32" />
    </div>
    <Skeleton className="h-4 w-24" />
    <div className="flex gap-2 flex-wrap">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-6 w-16 rounded-md" />
      ))}
    </div>
    <Skeleton className="h-48 w-full" />
  </div>
);

const Page = () => {
  const user = useSession();
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [isQuestionsCreated, setIsQuestionsCreated] = useState(false);
  const [questions, setquestions] = useState();
  const [loading, setLoading] = useState(false);
  const [jobLoading, setJobLoading] = useState(true);
  const [interviewId, setInterviewid] = useState("");
  const [feedbackExists, setFeedbackExists] = useState(false);

  const router = useRouter();
  const setQuestions = useInterviewStore((state) => state.setQuestions);
  const setInterviewId = useInterviewStore((state) => state.setInterviewId);

  useEffect(() => {
    const fetchJobDetails = async () => {
      setJobLoading(true);
      try {
        const jobResponse = await axios.get("https://remoteok.com/api");
        const jobs = jobResponse.data.slice(1) as Job[];
        const selectedJob = jobs.find((job) => job.id.toString() === id);
        if (selectedJob) {
          setJob(selectedJob);
          //@ts-ignore
          await fetchQuestionStatus(selectedJob.id);
        }
      } catch (err) {
        console.error("Failed to fetch job:", err);
      } finally {
        setJobLoading(false);
      }
    };

    const fetchQuestionStatus = async (jobId: string) => {
      if (user?.id) {
        try {
          const questionResponse = await axios.get(`${BACKEND_URL}/api/vapi/generate`, {
            params: {
              userId: user.id,
              jobId,
            },
          });
          if (questionResponse.data?.question?.isQuestionsCreated) {
            setIsQuestionsCreated(true);
          }
          if (questionResponse.data?.question) {
            setquestions(questionResponse.data?.question?.questions);
            setInterviewid(questionResponse.data?.question?.interviewId);
          }
        } catch (err) {
          console.error("Failed to check question status:", err);
        }
      }
    };

    fetchJobDetails();
  }, [id, user?.id]);

  useEffect(() => {
    if (!interviewId) return;
    const fetchFeedbackStatus = async () => {
      try {
        const feedbackResponse = await axios.get(`${BACKEND_URL}/api/feedback`, {
          params: { id: interviewId },
        });
        setFeedbackExists(feedbackResponse.data.isFeedbackCreated);
      } catch (err) {
        console.error("Failed to fetch feedback:", err);
      }
    };

    fetchFeedbackStatus();
  }, [interviewId]);

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
        jobId: job?.id,
      });
      setIsQuestionsCreated(true);
      window.location.reload();

      toast.success("Interview generated");
    } catch (err) {
      console.error("Failed to generate interview:", err);
      toast.error("Failed to generate interview");
    } finally {
      setLoading(false);
    }
  };

  const handleTakeInterview = () => {
    if (questions && interviewId) {
      setQuestions(questions);
      setInterviewId(interviewId);
      router.push("/Interview");
    } else {
      toast.error("No questions found");
    }
  };

  const handleFeedBack = () => {
    router.push(`/Interview/feedback/${interviewId}`);
  };

  if (jobLoading) {
    return <JobDetailSkeleton />;
  }

  if (!job) {
    return <div className="text-center text-xl mt-10">No jobs found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-20 p-4 md:p-8">
      <div className="flex justify-between">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{job.position}</h1>
        <div className="flex items-center">
          {isQuestionsCreated ? (
            <div className="flex flex-col gap-4">
              <span className="text-green-600 font-medium">
                Interview Questions generated
              </span>
              <Button className="cursor-pointer" onClick={handleTakeInterview} variant="ghost">
                <BriefcaseBusiness className="mr-2 h-4 w-4 " />
                Take Interview
              </Button>
              {feedbackExists && (
                <Button onClick={handleFeedBack} variant="ghost" className="cursor-pointer">
                  <MessageCircle className="mr-2 h-4 w-4 " />
                  View Feedback
                </Button>
              )}
            </div>
          ) : (
            <Button onClick={handleGenerateInterview} disabled={loading} className="cursor-pointer">
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
