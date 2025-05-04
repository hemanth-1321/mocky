"use server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "@/lib/auth";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export const signUp = async (params: SignUpParams) => {
  const { name, email, password } = params;
  console.log(name, email, password);
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const token = generateToken({ id: user.id, email: user.email });

    (await cookies()).set("token", token, {
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    console.log("error while Signup", error);
  }
};

export const signIn = async (params: SignInParams) => {
  const { email, password } = params;
  console.log(email, password);

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      username: user.name,
    });

    (await cookies()).set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return { id: user.id, email: user.email, name: user.name };
  } catch (error) {
    console.log("error while Signin", error);

    throw error;
  }
};
