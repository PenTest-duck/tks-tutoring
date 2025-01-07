"use client";

import { useAuth } from "@/context/AuthUserContext";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { sendPasswordResetEmail } = useAuth();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    sendPasswordResetEmail(email)
      .then(() => setSuccess(true))
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setError("Invalid email address");
            break;
          default:
            console.log(error.message);
            setError("An unexpected error occurred. Please try again.");
        }
      });
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
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Send password reset email
              </button>
              {error && (
                <p className="mt-2 text-sm text-center text-red-500">{error}</p>
              )}
              {success && (
                <p className="mt-2 text-sm text-center text-primary-600">
                  If account exists, a reset email has been sent.
                </p>
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

export default ResetPassword;
