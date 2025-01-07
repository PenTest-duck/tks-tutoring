"use client";

import { useAuth } from "@/context/AuthUserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PreauthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(loading, authUser);
    if (!loading && authUser) {
      router.push("/sheets");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, authUser]);

  if (authUser) return null;
  return <div className="w-full h-full">{children}</div>;
}
