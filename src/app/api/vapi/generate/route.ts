import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  console.log("gemini key ", process.env.GOOGLE_GENERATIVE_AI_API_KEY);
  const {
    position,
    company,
    location,
    description,
    tags,
    userId,
    salary_max,
    salary_min,
    jobId,
    amount,
  } = await req.json();
  console.log(
    "fromserver",
    position,
    company,
    location,
    description,
    tags,
    userId,
    jobId,
    amount
  );
  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `You are a helpful AI assistant that generates interview questions based on a job listing.
         You will be given a JSON object containing details of a job such as:
        - Job title ${position}
        - Experience level refer from ${description}
        - Tech stack (from tags and description) ${tags}
        - Job description ${description}
        - Company name is ${company}
        - Work location is ${location}

        Your task is to analyze this job data and generate a list of thoughtful and relevant interview questions.

        Guidelines:
        - Focus on the job’s core requirements (skills, tools, frameworks, responsibilities).
        - Prioritize the type of questions based on whether the job is more technical or behavioral.
        - Extract insights from tags, description, and required qualifications.
        - Do not ask irrelevant or overly generic questions.
        - Format the output strictly as a JSON array of strings like this:
        ["Question 1", "Question 2", "Question 3"]
        - Do not include any markdown, formatting characters, slashes, or symbols that might break a voice assistant.
        - Only return the question array and nothing else.
        - This output will be parsed using JSON.parse(), so it must be **valid JSON**.
        - Do not include any explanation or text outside the array.

        Dynamic Parameters:
        - The job role is ${position}
        - The primary tech stack is ${tags} and ${description}
        - Focus on ${description} for questions
        - Number of questions needed is ${amount}

            Only output the JSON array.
        Thank you
        `,
    });

    const cleaned = questions
      .trim()
      .replace(/^```json/, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();

    const parsedQuestions = JSON.parse(cleaned);

    const question = await prisma.question.create({
      data: {
        position,
        company,
        location,
        userId,
        salary_max,
        salary_min,
        jobId,
        Questions: parsedQuestions,
        isQuestionsCreated: true,
      },
    });
    // console.log("inthe route", question.Questions);
    return Response.json(
      {
        success: true,
        question,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const jobId = searchParams.get("jobId");

    console.log("userID:", userId, "jobID:", jobId);

    if (!userId || !jobId) {
      return NextResponse.json(
        { error: "Missing userId or jobId" },
        { status: 400 }
      );
    }

    const existing = await prisma.question.findFirst({
      where: {
        userId,
        jobId,
      },
    });
    console.log("in the get route", existing?.id);
    return NextResponse.json({
      question: {
        isQuestionsCreated: !!existing,
        questions: existing?.Questions ?? [],
        interviewId: existing?.id,
      },
    });
  } catch (error) {
    console.error("GET /api/vapi/generate error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
