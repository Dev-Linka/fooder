"use server";

import Link from "next/link";
import { Bell, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import MobileNavbar from "./mobile-navbar";
import { GetCurrentUser } from "@/lib/Api/Auth";

export default async function Navbar() {
    const currentUser = await GetCurrentUser();

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm shadow-md">
            <div className="flex h-16 items-center justify-between px-5 py-4">
                <div className="flex items-center gap-2">
                    <Link href="/" className="text-xl font-bold text-orange-500 relative">
                        Fooder
                        <span className="absolute -bottom-1 left-0 w-full h-1 bg-orange-500 rounded-full transform scale-x-75"></span>
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <Link href="/discover" className="text-sm font-medium hover:text-orange-500 transition-colors">
                        Discover
                    </Link>
                    <Link href="/favorites" className="text-sm font-medium hover:text-orange-500 transition-colors">
                        Favorites
                    </Link>
                    <Link href="/restaurants" className="text-sm font-medium hover:text-orange-500 transition-colors">
                        Restaurants
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">Notifications</span>
                    </Button>
                    {currentUser ? (
                        <Button variant={"glow"}>
                          <Link href="/profile" className="text-sm font-medium hover:text-orange-500 transition-colors">
                            Welcome {currentUser.display_name}
                          </Link>
                        </Button>
                    ) : (
                        <Button variant={"glow"}>
                            <Link href={"/sign-in"}>Get Started</Link>
                        </Button>
                    )}
                </div>

                <MobileNavbar />
            </div>
        </header>
    );
}
