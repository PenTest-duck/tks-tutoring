"use client";

import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const { data, error } = useQuery(
    supabase.from("profiles").select("first_name, last_name").limit(1).single(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    }
  );

  const signOut = () => {
    supabase.auth.signOut().then(() => router.push("/login"));
  };

  return (
    <nav className="w-full bg-white z-50 max-h-16">
      <div className="flex flex-row justify-between w-full py-4 px-12">
        <Link href="/">
          <div className="flex flex-row items-center space-x-4">
            <Image
              src="/images/tks-logo.png"
              alt="TKS logo"
              width={32}
              height={32}
            />
            <h1 className="hidden md:block text-lg text-primary-500 font-bold">
              TKS Tutoring Sheets
            </h1>
          </div>
        </Link>
        <div className="flex flex-row items-center space-x-4 relative">
          <p className="text-sm md:text-lg text-nowrap">
            {!error && `${data?.first_name} ${data?.last_name}`}
          </p>
          <div className="relative">
            <CircleUserRound
              width={32}
              height={32}
              className="rounded-full cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />

            {isOpen && (
              <>
                <div
                  className="fixed inset-0"
                  onClick={() => setIsOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={signOut}
                  >
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
