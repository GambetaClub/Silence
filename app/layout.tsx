import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchAllCategories } from "@/actions/server/categories"
import { Toaster } from "@/components/ui/sonner"
import { Filter } from "./components/Filters"
import Search from "./components/Search"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Articles App",
  description: "Developing in secret...",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const categories = await fetchAllCategories()
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-100 font-sans antialiased dark:bg-black dark:text-white`}
      >
        <div className="group flex w-full">
          <div className="hidden md:block w-[300px] h-screen sticky top-0 p-8">
            <div className="h-full rounded-lg bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
              <div className="h-full overflow-y-auto p-4">
                <Suspense
                  fallback={<Skeleton className="h-4 w-20 rounded-lg" />}
                >
                  <Filter categories={categories} />
                </Suspense>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col min-h-screen">
            <div className="sticky top-0 z-10 bg-gray-100 dark:bg-black">
              <div className="mx-8 py-4">
                <Suspense
                  fallback={<Skeleton className="h-4 w-20 rounded-lg" />}
                >
                  <Search />
                </Suspense>
              </div>
            </div>
            <div className="flex-1 flex flex-col p-4">{children}</div>
          </div>
        </div>

        <Toaster />
      </body>
    </html>
  )
}
