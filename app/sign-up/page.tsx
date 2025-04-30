"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import SingUpForm from "@/components/signupform";




export default async function Page() {

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const heads = await headers();
    const searchParams = heads.get('x-params') || '';

    const value = JSON.parse(searchParams);

    console.log(value)
    const redirectTo = value.redirect || "/home";


    if (user) {
        return redirect(redirectTo);
    }


    return (
        <div className="h-full w-full">
            <div className="flex flex-col lg:flex-row items-center justify-center h-[calc(93vh-8rem)] m-4 lg:m-16 relative">
                <div className="w-full lg:w-1/2 h-full flex items-center justify-center">
                    <SingUpForm redirect={redirectTo} />
                </div>

                {/* Warp visibile solo su schermi large e superiori */}
                <div className="hidden lg:flex w-1/2 h-full relative">
                    <div className="absolute top-10 left-0 w-full h-full z-50 font-bold text-4xl text-center tracking-tighter">
                        <h1>Tu dare tuoi dati, io felice</h1>
                    </div>
                    <div
                        className="w-full h-full flex justify-center items-center m-2"
                        //beamDuration={1}
                        //beamsPerSide={15}
                        //gridColor="#00000000"
                    >
                    </div>
                </div>
            </div>
        </div>


    );
}
