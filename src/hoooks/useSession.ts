"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export function useSession() {
  const [user, setUser] = useState<AgentProps | null>(null);

  useEffect(() => {
    axios
      .get("/api/me", { withCredentials: true })
      .then((res) => {
        console.log("User data:", res.data); // Logging response
        setUser(res.data);
      })

      .catch(() => setUser(null));
  }, []);

  return user;
}
