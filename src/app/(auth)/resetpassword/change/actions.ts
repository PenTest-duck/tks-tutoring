"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function changePassword(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    redirect(
      "/resetpassword/change?error_description=" +
        encodeURIComponent(error.message)
    );
  }

  redirect("/resetpassword/change/success");
}
