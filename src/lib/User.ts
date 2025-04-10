import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function getUserFromServer() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;
  console.log("libs", verifyToken(token));
  return verifyToken(token);
}
