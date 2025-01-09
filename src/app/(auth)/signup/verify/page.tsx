"use client";

import Image from "next/image";
import { type EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const VerifyButton = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  const verify = () => {
    if (token_hash && type) {
      const supabase = createClient();
      supabase.auth
        .verifyOtp({
          type,
          token_hash,
        })
        .then(({ error }) => {
          if (!error) {
            return router.push(next);
          }
          return router.push(
            "/error?err_msg=" + encodeURIComponent(error.message)
          );
        });
    }
    router.push("/error?err_msg=Invalid%20or%20expired%20token");
  };

  return (
    <button
      onClick={verify}
      className="px-4 py-2 bg-primary-600 disabled:bg-primary-300 text-white rounded"
    >
      Verify email
    </button>
  );
};

const SignupVerify = () => {
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
          <div className="mt-4 text-center">
            <Suspense>
              <VerifyButton />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupVerify;
