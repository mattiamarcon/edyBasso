"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


export function Header() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Servizi", href: "/servizi" },
    { name: "Prenota", href: "/prenota" },
    { name: "Contatti", href: "/contatti" },
  ]

  const handleNavigation = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6 lg:px-8">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-2xl font-bold">Edy Basso Studio</span>
        </Link>
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-lg font-normal"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div>
            <Button asChild>
              <Link href="/prenota">Prenota Ora</Link>
            </Button>
          </div>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="md:hidden ml-auto">
          <Menu className="h-8 w-8" />
        </SheetTrigger>
        <SheetContent>
          <nav className="flex flex-col space-y-5 pt-10">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-xl font-normal"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation(item.href)
                    }}
                  >
                    {item.name}
                  </a>
                ))}
          </nav>
        </SheetContent>
      </Sheet>
      </div>
    </header>
  )
}

