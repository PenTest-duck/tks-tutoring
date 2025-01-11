"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { jwtVerify } from "jose";

export const getRole = async () => {
  const supabase = await createClient();

  try {
    const token = (await supabase.auth.getSession()).data.session?.access_token;
    if (token) {
      const verifiedToken = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET)
      );
      if (verifiedToken) {
        const payloadBase64 = token.split(".")[1];
        const decodedPayload = Buffer.from(payloadBase64, "base64").toString();
        const userRole = JSON.parse(decodedPayload).user_role;
        return userRole;
      }
    }
  } catch (error) {
    console.error("Error decoding token or fetching user role:", error);
  }
};

export async function signup(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<{ error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { first_name: firstName, last_name: lastName } },
  });
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/signup/success", "layout");
  redirect("/signup/success");
}

export async function login(
  email: string,
  password: string
): Promise<{ error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/sheets", "layout");
  redirect("/sheets");
}

export async function changePassword(
  password: string
): Promise<{ error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return { error: error.message };
  }

  redirect("/resetpassword/change/success");
}

export async function sendPasswordResetEmail(
  email: string
): Promise<{ error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    return { error: error.message };
  }

  redirect("/resetpassword/success");
}
