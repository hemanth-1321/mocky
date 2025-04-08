"use server";
import { cookies } from "next/headers";

export async function User() {
  const cookieStore = cookies();

  const token = (await cookieStore).get("token");

  return token;
}
