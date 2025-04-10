import { NextResponse } from "next/server";
import { getUserFromServer } from "@/lib/User";

export async function GET() {
  const user = await getUserFromServer();
  console.log("userin server", user);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json(user);
}
