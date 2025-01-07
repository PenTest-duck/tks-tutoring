"use client";

import { useAuth } from "@/context/AuthUserContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut: _signOut } = useAuth();
  const router = useRouter();

  const signOut = () => {
    _signOut()
      .then(() => router.push("/login"))
      .catch((error) => console.log(error));
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
          <p>Chris Yoo</p>
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
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={signOut}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
