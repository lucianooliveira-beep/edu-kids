'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Email ou senha incorretos')
      setLoading(false)
    } else {
      router.push('/painel')
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md border-4 border-purple-200">
        <div className="text-center mb-6">
          <span className="text-6xl">🔐</span>
          <h1 className="text-3xl font-extrabold text-purple-600 mt-2">Entrar</h1>
          <p className="text-gray-500">Acesse sua conta para continuar aprendendo!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border-2 border-red-300 text-red-700 rounded-xl p-3 text-center font-semibold">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none text-lg"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none text-lg"
              placeholder="Sua senha"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl text-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-500">
          Não tem conta?{' '}
          <Link href="/registro" className="text-purple-600 font-bold hover:underline">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  )
}
