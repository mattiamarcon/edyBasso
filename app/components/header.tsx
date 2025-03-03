"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu} from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,

  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { supabaseClient } from '@/utils/supabase/client'



export function Header({isLogged}:{isLogged:boolean}) {

  const supabase= supabaseClient();

  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [logged,setLogged]=useState(isLogged)

  useEffect(()=>{
    setLogged(isLogged)
  },[isLogged])

  async function signOut(){
    const { error } = await supabase.auth.signOut();

    if(!error){
      setLogged(false);
    }
    
    router.push("/");
    router.refresh(); 
}


  const navigation = [
    { name: "Prenota", href: "/prenota" },
    { name: "Contatti", href: "/contatti" },
  ]
  
  const hideNavigation=[
    {name: "Servizi attivi", href:"/servizi/servizi-attivi"},
    {name: "Aggiungi servizio", href:"/servizi/aggiungi-servizio"},
  ]

  const handleNavigation = (href: string) => {
    setOpen(false)
    router.push(href) 
  }

  return (
    <header className="sticky top-0 z-[200] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
            {logged && 
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-lg font-normal w-fit">Servizi</DropdownMenuTrigger>
                <DropdownMenuContent>
                  {hideNavigation.map((item=>(
                      <DropdownMenuItem key={item.name} className="text-lg font-normal cursor-pointer" onClick={()=>handleNavigation(item.href)}>
                      {item.name}
                      </DropdownMenuItem>
                  )))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href={"/appuntamenti"} className="text-lg font-normal w-fit">Appuntamenti</Link>
            </>
            } 
          </div>
          {isLogged ? <button className="text-lg font-normal" onClick={()=>{signOut(), setOpen(false)}}>Log out</button> : <Link href={"/login"} className="text-lg font-normal">Accedi</Link>}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="md:hidden ml-auto">
          <Menu className="h-8 w-8" />
        </SheetTrigger>
        <SheetContent>
          <nav className="flex flex-col space-y-5 pt-10">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-xl font-normal"
                    onClick={()=>setOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
            {logged && 
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-xl font-normal w-fit">Servizi</DropdownMenuTrigger>
                <DropdownMenuContent>
                  {hideNavigation.map((item=>(
                      <DropdownMenuItem key={item.name} className="text-xl font-normal" onClick={()=>handleNavigation(item.href)}>
                        {item.name}
                        </DropdownMenuItem>
                  )))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href={"/appuntamenti"} className="text-xl font-normal w-fit">Appuntamenti</Link>
            </>
            }    
            {isLogged ? <button className="text-xl font-normal w-fit" onClick={()=>{signOut(), setOpen(false)}}>Log out</button> : <Link href={"/login"} onClick={()=>setOpen(false)} className="text-xl font-normal">Accedi</Link>}
          </nav>
          
        </SheetContent>
      </Sheet>
      </div>
    </header>
  )
}

