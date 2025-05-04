import { cookies } from "next/headers";

export const getClientCookie = async (cookieName: string) => {
  const cookieStore = cookies();
  const token = (await cookieStore).get(cookieName);

  return token;
};
