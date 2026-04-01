'use client'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ChatTutor from '@/components/ChatTutor'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <title>EduKids - Aprender Brincando!</title>
        <meta name="description" content="Plataforma educacional para crianças de 6 a 12 anos" />
      </head>
      <body className="min-h-screen bg-[#fef9f0] flex flex-col">
        <SessionProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
            {children}
          </main>
          <Footer />
          <ChatTutor />
        </SessionProvider>
      </body>
    </html>
  )
}
