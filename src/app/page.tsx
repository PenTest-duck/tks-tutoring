"use client";

import { useAuth } from "@/context/AuthUserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!authUser) {
        router.push("/login");
      } else {
        router.push("/sheets");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, authUser]);

  return null;
}
