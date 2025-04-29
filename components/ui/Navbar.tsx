import Link from "next/link";
import { Button } from "./button";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className=" flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 pl-5">
            <Link href="/" className="text-xl font-bold text-orange-500">Fooder</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
              Log in
            </Link>
            <Button className="bg-orange-500 hover:bg-orange-600 cursor-pointer">Download App</Button>
          </div>
        </div>
      </header>
    )
    
}