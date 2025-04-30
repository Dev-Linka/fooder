"use server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/submitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { signIn } from "@/lib/Api/Auth";
import { Button } from "@/components/ui/button";


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
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-3xl font-black w-full text-center tracking-tight">Log in</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <input type="hidden" name="redirect" value={redirectTo} />
              <div className="grid gap-4 py-2">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email" className="text-left font-bold text-muted-foreground">
                    Email
                  </Label>
                  <Input id="email" type="email" placeholder="Info@teachflow.app" className="col-span-3" name="email" />
                </div>
              </div>
              <div className="grid gap-4 py-2">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password" className="text-left font-bold text-muted-foreground">
                    Password
                  </Label>
                  <Input id="password" type="password" placeholder="Administrator01! (Super Secure)" className="col-span-3" name="password" />
                </div>
              </div>
              <SubmitButton
                pendingText="Logging in..."
                className="w-full items-center gap-4 my-4"
                formAction={signIn}
              >
                Log in
              </SubmitButton>
            </form>
  
            <Separator />
            <h2 className="font-bold tracking-tighter text-center w-full text-xl my-4">Don’t have an account yet?</h2>
            <Link href={`/sign-up${redirectTo ? `?redirect=${redirectTo}` : ''}`} className="z-50" passHref>
              <Button className="w-full items-center">
                Sign up
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
  
      {/* Warp + immagine solo su desktop */}
      <div className="hidden lg:flex w-1/2 h-full relative">
        <div className="absolute top-10 left-0 w-full h-full z-50 font-bold text-4xl text-center tracking-tighter">
          <h1>io offrire cibo buono, tu pagare bene</h1>
        </div>
        <div
          className="w-full h-full flex justify-center items-center m-2"
          //beamDuration={1}
          //beamsPerSide={15}
          //gridColor="#00000000"
        >
          <Link href="https://github.com/Signorlupo22/teachflowExtension" prefetch={false} passHref legacyBehavior>
            <a target="_blank" rel="noopener noreferrer">
              {/*<ShineBorder
                color="#1C54D6FF"
                className="w-80 transform transition-transform duration-300 hover:scale-150 hover:rotate-6 cursor-pointer hover:drop-shadow-xl hover:!shadow-vsCode-foreground relative"
              >
                <Image src="/vscode.png" alt="vscode" className="overflow-hidden rounded-lg w-80" width={400} height={400} />
              </ShineBorder> */}
            </a>
          </Link>
        </div>
      </div>
    </div>
  </div>
  

  )
};
