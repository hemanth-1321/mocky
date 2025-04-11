import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getJobsByUserId = async (userId: string): Promise<Job[]> => {
  const results = await prisma.question.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return results.map((job) => ({
    jobId: job.id,
    position: job.position,
    company: job.company,
    company_logo: "",
    logo: "",
    location: job.location,
    tags: job.techStack ? job.techStack.split(",") : [],
    apply_url: "",
    description: "",
    url: "",
    date: job.createdAt,
    salary_min: job.salary_min ?? undefined,
    salary_max: job.salary_max ?? undefined,
  }));
};
