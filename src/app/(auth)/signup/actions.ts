"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);
  if (error) {
    console.error(error.message);
    redirect(`/signup?error_description=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/signup/success", "layout");
  redirect("/signup/success");
}
