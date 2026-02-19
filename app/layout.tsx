import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { BottomNav } from '@/components/bottom-nav'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const jetbrains = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Fin — Your Financial Advisor',
  description: 'AI-powered financial guidance for Gen Z',
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans antialiased bg-black text-white`}
      >
        <main className="pb-16">{children}</main>
        <BottomNav />
      </body>
    </html>
  )
}
