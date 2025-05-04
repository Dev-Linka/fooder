"use server"
import { FormState } from "@/components/submitButton";
import { User } from "@/utils/interface/db";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
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
    const redirectTo = formData.get("redirect") as string || "/disvoer";
  
    const safeRedirect = redirectTo?.startsWith("/") ? redirectTo : "/discover";
  
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


  interface UserFormData {
    display_name: string;
    first_name: string;
    last_name: string;
  }
  
  interface SignUpResponse {
    error?: string;
  }
  
  
  export const signUp = async (
      prevState: FormState,
      formData: FormData
    ): Promise<SignUpResponse | never> => {
      "use server";
      const origin = (await headers()).get("origin");
    
      const displayName = formData.get("displayName") as string;
      const firstName = formData.get("firstName") as string;
      const lastName = formData.get("lastName") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const supabase = await createClient();
  
      const redirectTo = formData.get("redirect") as string || "/";
  
      const safeRedirect = redirectTo?.startsWith("/") ? redirectTo : "/";
    
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
            first_name: firstName,
            last_name: lastName,
          } as UserFormData,
          emailRedirectTo: `${origin}/auth/callback`,
        },
      });
  
      if (error) {
        console.log(error.message)
        return { error: "Error: " + error.message };
      }
      if (!data.user) {
        return { error: "User Not created" };
      }
      
    //   await createStripeCustomer(
    //     data.user.id,
    //     email,
    //     firstName,
    //     lastName
    //   );
    
    
      return redirect(safeRedirect);
    };