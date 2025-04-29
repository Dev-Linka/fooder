"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submitButton";
import * as yup from "yup";
import { signUp } from "@/lib/Api/Auth";

export default function SingUpForm({redirect} : {redirect : string}) {

    const signUpSchema = yup.object().shape({
        displayName: yup.string().min(2, "Display Name must be at least 2 characters").required("Display Name is required"),
        firstName: yup.string().min(2, "First Name must be at least 2 characters").required("First Name is required"),
        lastName: yup.string().min(2, "Last Name must be at least 2 characters").required("Last Name is required"),
        email: yup.string().email("Invalid email address").required("Email is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    });

    return (
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle className="font-bold tracking-tighter">Sign in</CardTitle>
                <CardDescription>
                    This account will be an learn account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <input type="hidden" name="redirect" value={redirect} />

                    <div className="grid gap-2 py-2">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="displayName" className="text-left text-muted-foreground font-bold">Display Name</Label>
                            <Input id="displayName" type="text" placeholder="Chomas_dev" name="displayName" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 py-2">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="firstName" className="text-left text-muted-foreground font-bold">First Name</Label>
                            <Input id="firstName" type="text" placeholder="Jhony" name="firstName" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="lastName" className="text-left text-muted-foreground font-bold">Last Name</Label>
                            <Input id="lastName" type="text" placeholder="IDk" name="lastName" />
                        </div>
                    </div>
                    <div className="grid gap-2 py-2">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email" className="text-left text-muted-foreground font-bold">Email</Label>
                            <Input id="email" type="email" placeholder="Example@teachflow.app" name="email" />
                        </div>
                    </div>
                    <div className="grid gap-2 py-2">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password" className="text-left text-muted-foreground font-bold">Password</Label>
                            <Input id="password" type="password" placeholder="Your super secure password" name="password" />
                        </div>
                    </div>
                    <SubmitButton validationSchema={signUpSchema} className="w-full items-center gap-2 my-4" pendingText="Signing Up..." formAction={signUp}>
                        Sign Up
                    </SubmitButton>
                </form>
            </CardContent>
        </Card>
    )
}