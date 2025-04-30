"use client"

import Link from "next/link"
import { Bell, Menu, User } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

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
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
          <Button variant={"glow"}>
            <Link href={"/sign-in"}>
              Get Started
            </Link>
          </Button>
        </div>

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
      </div>
    </header>
  )
}
