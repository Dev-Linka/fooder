import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Login() {
    return (
        <div className="flex min-h-screen flex-col  w-full items-center justify-center bg-orange-50">
            <Link href="/test">
                <Button className="bg-orange-500 hover:bg-orange-600 cursor-pointer">
                    Login
                </Button>
            </Link>
        </div>
    )
}