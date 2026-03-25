'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'

export default function Navbar() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">📚</span>
            <span className="text-white font-extrabold text-xl tracking-tight">EduKids</span>
          </Link>

          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/portugues" className="text-white font-semibold hover:text-yellow-200 transition">
              📖 Português
            </Link>
            <Link href="/matematica" className="text-white font-semibold hover:text-yellow-200 transition">
              🔢 Matemática
            </Link>
            {session ? (
              <>
                <Link href="/painel" className="text-white font-semibold hover:text-yellow-200 transition">
                  📊 Meu Painel
                </Link>
                <span className="text-yellow-200 font-medium">Olá, {session.user?.name}!</span>
                <button
                  onClick={() => signOut()}
                  className="bg-white text-purple-600 font-bold px-4 py-2 rounded-full hover:bg-yellow-200 transition"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-white text-purple-600 font-bold px-4 py-2 rounded-full hover:bg-yellow-200 transition"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            <Link href="/portugues" className="text-white font-semibold" onClick={() => setMenuOpen(false)}>
              📖 Português
            </Link>
            <Link href="/matematica" className="text-white font-semibold" onClick={() => setMenuOpen(false)}>
              🔢 Matemática
            </Link>
            {session ? (
              <>
                <Link href="/painel" className="text-white font-semibold" onClick={() => setMenuOpen(false)}>
                  📊 Meu Painel
                </Link>
                <button onClick={() => signOut()} className="text-yellow-200 font-semibold text-left">
                  Sair
                </button>
              </>
            ) : (
              <Link href="/login" className="text-yellow-200 font-semibold" onClick={() => setMenuOpen(false)}>
                Entrar
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
