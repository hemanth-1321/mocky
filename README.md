# 🎙️ Mocky - AI-Powered Mock Interview Platform

Mocky is a modern, AI-driven mock interview platform designed to help developers practice real-time job interviews. Built with **Next.js**, **TypeScript**, and **Prisma**, it integrates **Google Gemini AI** for generating job-specific interview questions and **Vapi agents** for conducting live mock interviews in a conversational interface.

![Mocky Screenshot](./public/mocky.webp)

---

## 🚀 Features

- 🔍 Fetches job listings from [RemoteOK](https://remoteok.com)
- 🧠 Sends job details to **Gemini AI** to generate custom interview questions
- 💬 Real-time conversational interviews powered by **Vapi AI Agents**
- 🎨 Beautiful, modern UI using **Shadcn UI**, **Tailwind CSS**, and **Aceternity UI**
- 🧩 Type-safe, modular architecture with **TypeScript** and **Prisma**

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Database**: [Prisma](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/), [Aceternity UI](https://ui.aceternity.com/)
- **AI Integration**: [Google Gemini](https://deepmind.google/technologies/gemini/), [Vapi](https://vapi.ai/)
- **Job Listings**: [RemoteOK API](https://remoteok.com/api)

---

## 📦 Installation

```bash
git clone https://github.com/hemanth-1321/mocky.git
cd mocky
pnpm install
```

## Environment Variables

Create a .env file in the root and add your API keys:
```bash
JWT_SECRET=secret
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
DATABASE_URL=your_postgresql_connection
GOOGLE_GENERATIVE_AI_API_KEY=gemini_api_key
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
```
