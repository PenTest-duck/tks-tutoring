"use client";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!error && session?.user?.email) {
        setEmail(session.user.email);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className=" w-full bg-white z-50 max-h-16">
      <div className="flex flex-row justify-between w-full p-4">
        <div className="flex flex-row items-center space-x-4">
          <Image
            src="/images/tks-logo.png"
            alt="TKS logo"
            width={32}
            height={32}
          />
          <h1 className="text-xl font-bold">TKS Tutoring</h1>
        </div>
        <div className="flex flex-row items-center space-x-4 relative">
          <p>{email}</p>
          <div className="relative">
            <Image
              src="/images/bot_pfp.png"
              alt="Profile picture"
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
