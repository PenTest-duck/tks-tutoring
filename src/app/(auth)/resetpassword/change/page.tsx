"use client";

import PasswordEye from "@/components/PasswordEye";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { changePassword } from "./actions";

const ChangePassword = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setError("");
  };

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
            Reset password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  New password
                </label>
              </div>
              <div className="relative mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  minLength={8}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 pe-10 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6"
                />
                <PasswordEye passwordId="password" />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                formAction={changePassword}
              >
                {isLoading && <LoaderCircle className="animate-spin mr-2" />}
                Change password
              </button>
              {error && (
                <p className="mt-2 text-sm text-center text-red-500">{error}</p>
              )}
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary-600 hover:text-primary-500"
            >
              Sign in here.
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
