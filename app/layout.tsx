import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { Analytics } from '@vercel/analytics/next';

import { supabaseServer } from "@/utils/supabase/server"



const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Edy Basso Studio",
  description: "Edy Basso studio web site",
} 
 
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const dbServer= await supabaseServer();  

  const {data} = await dbServer.auth.getUser();

  

  return ( 
    <html lang="it">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header isLogged={!!data.user} />
          <main className="flex-1 px-4 py-8 md:px-6 lg:px-8 mx-auto w-full">{children}</main>
          <Analytics />
          <Footer />
        </div>
      </body>
    </html>
  )
}
