'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Avatar from '@/components/Avatar'

export default function RegistroPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, age: Number(age) }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Erro ao criar conta')
      setLoading(false)
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md border-4 border-emerald-200">
        <div className="mb-6">
          <Avatar message="Que ótimo! Vamos criar sua conta! Preencha seu nome, email, uma senha e sua idade. Logo você estará aprendendo com a gente!" autoPlay />
        </div>
        <div className="text-center mb-6">
          <span className="text-6xl">🌟</span>
          <h1 className="text-3xl font-extrabold text-emerald-600 mt-2">Criar Conta</h1>
          <p className="text-gray-500">Junte-se à diversão e comece a aprender!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border-2 border-red-300 text-red-700 rounded-xl p-3 text-center font-semibold">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none text-lg"
              placeholder="Seu nome"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none text-lg"
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
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none text-lg"
              placeholder="Crie uma senha"
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Idade</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none text-lg"
              placeholder="Sua idade"
              min={6}
              max={12}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-3 rounded-xl text-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Criando...' : 'Criar Conta'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-500">
          Já tem conta?{' '}
          <Link href="/login" className="text-emerald-600 font-bold hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}
