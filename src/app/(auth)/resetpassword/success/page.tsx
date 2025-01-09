"use client";

import Image from "next/image";

const SendPasswordResetEmailSuccess = () => {
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
            Sent password reset email
          </h2>

          <p className="text-center text-gray-500">
            Please check your inbox and follow the instructions. It may take a
            couple of minutes, and may be in the junk/spam folder.
          </p>
        </div>
      </div>
    </>
  );
};

export default SendPasswordResetEmailSuccess;
