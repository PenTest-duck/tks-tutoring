"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function sendPasswordResetEmail(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const email = formData.get("email") as string;

  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    redirect(
      "/resetpassword?error_description=" + encodeURIComponent(error.message)
    );
  }

  redirect("/resetpassword/success");
}
