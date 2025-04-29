"use server"
import { User } from "@/utils/interface/db";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const GetCurrentUser = async (): Promise<User | null> => {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data: userData = null } = await supabase
        .from("User")
        .select("*")
        .eq("id", user?.id)
        .single<User>();

    return userData;
}


export const GetCurrentUserId = async (): Promise<string | null> => {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user?.id || null;
}

export const GetCurrentUserEmail = async (): Promise<string | null> => {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user?.email || null;
}

export const GetUserByName = async (username: string): Promise<User | null> => {
    const supabase = await createClient();
    const { data: userData = null } = await supabase
        .from("User")
        .select("*")
        .eq("display_name", username)
        .single<User>();

    return userData;
}


export const signOut = async () => {
    "use server"
    const supabase = await createClient();


    //scope?: "local" | "global" | "others"
    const { error } = await supabase.auth.signOut({ scope: 'local' })
    if (error) {
        console.log("error")
        console.log(error)
    }
    return redirect("/sign-in");
}


export const signIn = async (
    prevState: unknown,
    formData: FormData
  ): Promise<{error: string} | never> => {
    "use server";
  
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    //TODO implement this
    const redirectTo = formData.get("redirect") as string || "/home";
  
    const safeRedirect = redirectTo?.startsWith("/") ? redirectTo : "/home";
  
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) {
      return { error: "Error" + error.message };
    }
  
    return redirect(safeRedirect);
  };