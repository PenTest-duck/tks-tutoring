"use client";

import NavBar from "@/components/NavBar";
import { useAuth } from "@/context/AuthUserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) router.push("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, authUser]);

  if (loading || !authUser) return null;
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
