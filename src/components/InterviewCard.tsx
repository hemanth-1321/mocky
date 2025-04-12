'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';


export const InterviewCard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const[feedback,setFeedBack]=useState<Feedback|null>(null)

  const jobsPerPage = 6;

  useEffect(() => {
    axios
      .get('https://remoteok.com/api')
      .then((res) => {
        const filteredJobs = res.data.slice(1) as Job[]; 
        setJobs(filteredJobs);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch jobs:', err);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = jobs.slice(startIndex, startIndex + jobsPerPage);

  if (loading) return <div className="text-center text-xl mt-10">Loading jobs...</div>;

  return (
   <div className="w-full px-4 md:px-16 lg:px-20">
  <div className="grid gap-6">
    {currentJobs.map((job, index) => (
      <><div
            key={`${job.id}-${index}`}
            className="shadow-md rounded-2xl p-4 md:p-8 flex flex-col md:flex-row gap-4 bg-gray-200 dark:bg-gray-800"
        >


            <div className="flex-1">
                <h2 className="text-lg md:text-xl font-semibold">{job.position}</h2>
                <p className="text-gray-400 text-sm">{job.company}</p>
                <p className="text-sm mt-1">{job.location}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                        <span
                            key={`${job.id}-${tag}-${index}`}
                            className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-xs"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center gap-4 mt-5">
                <p className="line-clamp-2 text-sm md:text-base mt-5">
               
                  If You haven't taken this interview yet. Take it now to improve your skills
                </p>

                <div className="mt-4 flex justify-end">
                <Link href={`/Interview/${job.id}`}>
                    <Button className="btn-primary cursor-pointer">
                     View Interview
                    </Button>
                </Link>
                </div>

                </div>  

            </div>

            <p className="text-xs md:text-sm text-right mt-2 md:mt-0 md:ml-auto">
                Posted on:{' '}
                {job.date
                    ? new Date(job.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })
                    : 'Unknown'}
            </p>

        </div></>

    ))}
  </div>

  {/* Pagination Controls */}
  <div className="flex justify-center mt-6 gap-4">
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((prev) => prev - 1)}
      className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
    >
      Prev
    </button>
    <span className="text-lg font-semibold">
      {currentPage} / {totalPages}
    </span>
    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((prev) => prev + 1)}
      className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
</div>

  );
};
