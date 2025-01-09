"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

const ErrorMessage = () => {
  const searchParams = useSearchParams();
  const errMsg = searchParams.get("err_msg") || "Unknown error";

  return (
    <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
      {errMsg}
    </p>
  );
};

const ErrorPage = () => {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Something went wrong
          </h1>
          <Suspense
            fallback={
              <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                Loading...
              </p>
            }
          >
            <ErrorMessage />
          </Suspense>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
