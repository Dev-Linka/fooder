"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const MobileNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right">
                <div className="flex flex-col gap-6 pt-6">
                    <Link href="/discover" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                        Discover
                    </Link>
                    <Link href="/favorites" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                        Favorites
                    </Link>
                    <Link href="/restaurants" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                        Restaurants
                    </Link>
                    <Link href="/profile" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                        Profile
                    </Link>
                    <Link href="/notifications" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                        Notifications
                    </Link>
                    <Button className="mt-4 bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition-all duration-300">
                        Get Started
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNavbar;