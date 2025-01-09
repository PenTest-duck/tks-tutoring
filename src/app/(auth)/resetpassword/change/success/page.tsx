"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ChangePasswordSuccess = () => {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            alt="TKS Logo"
            src="/images/tks-logo.png"
            className="mx-auto"
            width={64}
            height={64}
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Password changed
          </h2>

          <p className="text-center text-gray-500">
            Please sign in with your new password.
          </p>

          <Link
            href="/login"
            className="block mt-6 text-center text-primary-600 hover:text-primary-500"
          >
            Sign In <ArrowRight className="inline-block w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordSuccess;
