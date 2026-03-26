'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Avatar from '@/components/Avatar'

interface ScoreData {
  id: string
  module: string
  activity: string
  score: number
  totalQuestions: number
  createdAt: string
}

export default function PainelPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [scores, setScores] = useState<ScoreData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetch('/api/score')
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data)) setScores(data)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [session])

  if (status === 'loading' || loading) {
    return (
      <div className="text-center py-20">
        <span className="text-6xl animate-spin inline-block">⏳</span>
        <p className="text-xl text-gray-500 mt-4">Carregando...</p>
      </div>
    )
  }

  if (!session) return null

  const portuguesScores = scores.filter((s) => s.module === 'portugues')
  const matScores = scores.filter((s) => s.module === 'matematica')

  const calcAvg = (items: ScoreData[]) => {
    if (items.length === 0) return 0
    const total = items.reduce((sum, s) => sum + (s.score / s.totalQuestions) * 100, 0)
    return Math.round(total / items.length)
  }

  const totalStars = scores.reduce((sum, s) => sum + s.score, 0)

  const getMedal = (stars: number) => {
    if (stars >= 50) return { emoji: '🏆', label: 'Ouro' }
    if (stars >= 30) return { emoji: '🥈', label: 'Prata' }
    if (stars >= 10) return { emoji: '🥉', label: 'Bronze' }
    return { emoji: '🌱', label: 'Iniciante' }
  }

  const medal = getMedal(totalStars)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-center mb-8">
        <Avatar message={`Parabéns, ${session.user?.name}! Você tem ${totalStars} estrelas e está no nível ${medal.label}. Continue assim, você está indo muito bem!`} autoPlay />
      </div>
      <div className="text-center mb-8">
        <span className="text-6xl">📊</span>
        <h1 className="text-4xl font-extrabold text-purple-600 mt-2">
          Meu Painel
        </h1>
        <p className="text-lg text-gray-500">Olá, {session.user?.name}! Veja seu progresso.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-6 text-center border-2 border-yellow-200">
          <span className="text-4xl">⭐</span>
          <p className="text-3xl font-extrabold text-yellow-600 mt-2">{totalStars}</p>
          <p className="text-sm text-gray-500 font-semibold">Estrelas</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center border-2 border-purple-200">
          <span className="text-4xl">{medal.emoji}</span>
          <p className="text-xl font-extrabold text-purple-600 mt-2">{medal.label}</p>
          <p className="text-sm text-gray-500 font-semibold">Medalha</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center border-2 border-green-200">
          <span className="text-4xl">📝</span>
          <p className="text-3xl font-extrabold text-green-600 mt-2">{scores.length}</p>
          <p className="text-sm text-gray-500 font-semibold">Atividades</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-6 border-2 border-indigo-200">
          <h2 className="text-xl font-extrabold text-indigo-600 mb-3">📖 Português</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Atividades feitas</span>
              <span className="font-bold text-indigo-600">{portuguesScores.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Média de acertos</span>
              <span className="font-bold text-indigo-600">{calcAvg(portuguesScores)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-blue-500 transition-all"
                style={{ width: `${calcAvg(portuguesScores)}%` }}
              />
            </div>
          </div>
          <Link
            href="/portugues"
            className="mt-4 inline-block text-indigo-600 font-bold hover:underline"
          >
            Continuar estudando →
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border-2 border-teal-200">
          <h2 className="text-xl font-extrabold text-teal-600 mb-3">🔢 Matemática</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Atividades feitas</span>
              <span className="font-bold text-teal-600">{matScores.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Média de acertos</span>
              <span className="font-bold text-teal-600">{calcAvg(matScores)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 transition-all"
                style={{ width: `${calcAvg(matScores)}%` }}
              />
            </div>
          </div>
          <Link
            href="/matematica"
            className="mt-4 inline-block text-teal-600 font-bold hover:underline"
          >
            Continuar estudando →
          </Link>
        </div>
      </div>

      {scores.length > 0 && (
        <div className="bg-white rounded-2xl shadow-md p-6 border-2 border-gray-200">
          <h2 className="text-xl font-extrabold text-gray-700 mb-4">Histórico Recente</h2>
          <div className="space-y-3">
            {scores.slice(0, 10).map((s) => (
              <div key={s.id} className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{s.module === 'portugues' ? '📖' : '🔢'}</span>
                  <div>
                    <p className="font-bold text-gray-700 capitalize">{s.activity}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(s.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-lg">
                    {s.score}/{s.totalQuestions}
                  </p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: s.score }).map((_, i) => (
                      <span key={i} className="text-xs">⭐</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {scores.length === 0 && (
        <div className="text-center py-8 bg-white rounded-2xl shadow-md">
          <span className="text-6xl">🚀</span>
          <p className="text-xl text-gray-600 mt-4 font-semibold">
            Voce ainda nao fez nenhuma atividade!
          </p>
          <p className="text-gray-400 mt-1">Comece agora e ganhe estrelas!</p>
          <div className="flex gap-3 justify-center mt-4">
            <Link href="/portugues" className="bg-indigo-500 text-white font-bold px-6 py-2 rounded-xl hover:bg-indigo-600 transition">
              📖 Português
            </Link>
            <Link href="/matematica" className="bg-teal-500 text-white font-bold px-6 py-2 rounded-xl hover:bg-teal-600 transition">
              🔢 Matemática
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
