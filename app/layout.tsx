import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { BottomNav } from '@/components/bottom-nav'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Fin — Your Financial Advisor',
  description: 'AI-powered financial guidance for Gen Z',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <main className="pb-16">{children}</main>
        <BottomNav />
      </body>
    </html>
  )
}
