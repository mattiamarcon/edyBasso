import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "./components/header"
import { Footer } from "./components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Edy Basso Studio",
  description: "Edy Basso studio web site",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 px-4 py-8 md:px-6 lg:px-8 mx-auto w-full">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
