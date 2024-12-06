import '@/styles/global.css'

import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Footer } from '@/components/common/footer'
import { Header } from '@/components/common/header'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/providers/theme-provider'

export const metadata: Metadata = {
  title: 'izak.tech',
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <div className="w-full max-w-[1000px] h-screen mx-auto p-6 flex flex-col relative">
            <div
              className="absolute top-0 flex items-center justify-center w-1/3 pointer-events-none -translate-y-1/2 left-1/2 -translate-x-1/2 -z-10 aspect-square"
              aria-hidden="true"
            >
              <div className="absolute inset-0 translate-z-0 bg-primary rounded-full blur-[120px] opacity-70" />
              <div className="absolute w-1/4 h-1/4 translate-z-0 bg-primary rounded-full blur-[40px]" />
            </div>

            <Header />

            {children}

            <Footer />
          </div>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
