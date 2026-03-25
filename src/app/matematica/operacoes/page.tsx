'use client'
import { useState, useEffect } from 'react'
import { gerarOperacoes, Operacao } from '@/data/operacoes'
import Feedback from '@/components/Feedback'
import ProgressBar from '@/components/ProgressBar'

const tipos = [
  { id: 'adicao', label: 'Adição (+)', emoji: '➕', color: 'from-green-400 to-emerald-500' },
  { id: 'subtracao', label: 'Subtração (-)', emoji: '➖', color: 'from-blue-400 to-indigo-500' },
  { id: 'multiplicacao', label: 'Multiplicação (×)', emoji: '✖️', color: 'from-orange-400 to-red-500' },
  { id: 'divisao', label: 'Divisão (÷)', emoji: '➗', color: 'from-purple-400 to-pink-500' },
]

export default function OperacoesPage() {
  const [selectedTipo, setSelectedTipo] = useState<string | null>(null)
  const [operacoes, setOperacoes] = useState<Operacao[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const total = 10

  useEffect(() => {
    if (selectedTipo) {
      setOperacoes(gerarOperacoes(selectedTipo, total))
    }
  }, [selectedTipo])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (feedback !== null || !userAnswer) return
    const correct = Number(userAnswer) === operacoes[currentIndex].resposta
    setFeedback(correct)
    if (correct) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1)
      setUserAnswer('')
      setFeedback(null)
    } else {
      setFinished(true)
    }
  }

  if (!selectedTipo) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-5xl">➕</span>
          <h1 className="text-4xl font-extrabold text-rose-600 mt-2">Operações</h1>
          <p className="text-gray-500">Escolha um tipo de operação!</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tipos.map((tipo) => (
            <button
              key={tipo.id}
              onClick={() => setSelectedTipo(tipo.id)}
              className={`bg-gradient-to-br ${tipo.color} rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all`}
            >
              <span className="text-4xl">{tipo.emoji}</span>
              <p className="text-white font-extrabold text-xl mt-2">{tipo.label}</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (finished) {
    return (
      <div className="text-center py-12">
        <span className="text-8xl">{score >= 8 ? '🏆' : score >= 5 ? '👍' : '💪'}</span>
        <h1 className="text-4xl font-extrabold text-rose-600 mt-4">Resultado</h1>
        <p className="text-xl text-gray-600 mt-2">Você acertou {score} de {total}!</p>
        <div className="flex gap-2 justify-center mt-4">
          {Array.from({ length: score }).map((_, i) => (
            <span key={i} className="text-3xl">⭐</span>
          ))}
        </div>
        <div className="flex gap-3 justify-center mt-6">
          <button
            onClick={() => { setSelectedTipo(null); setCurrentIndex(0); setScore(0); setFinished(false); setFeedback(null); setUserAnswer('') }}
            className="bg-gray-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-gray-600 transition"
          >
            Escolher Outro
          </button>
          <button
            onClick={() => { setOperacoes(gerarOperacoes(selectedTipo, total)); setCurrentIndex(0); setScore(0); setFinished(false); setFeedback(null); setUserAnswer('') }}
            className="bg-rose-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-rose-600 transition"
          >
            Jogar Novamente
          </button>
        </div>
      </div>
    )
  }

  if (operacoes.length === 0) return null

  const op = operacoes[currentIndex]

  return (
    <div className="max-w-lg mx-auto">
      <button
        onClick={() => { setSelectedTipo(null); setCurrentIndex(0); setScore(0); setFinished(false); setFeedback(null); setUserAnswer('') }}
        className="mb-4 text-rose-600 font-bold hover:underline"
      >
        ← Voltar
      </button>

      <ProgressBar current={currentIndex + 1} total={total} label="Progresso" />

      <div className="bg-white rounded-3xl shadow-xl p-8 mt-4 border-4 border-rose-200 text-center">
        <p className="text-5xl font-extrabold text-gray-800 mb-6">
          {op.a} {op.operador} {op.b} = ?
        </p>

        <form onSubmit={handleSubmit} className="flex gap-3 justify-center items-center">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={feedback !== null}
            className="w-32 p-3 text-center text-2xl font-bold border-3 border-gray-200 rounded-xl focus:border-rose-400 focus:outline-none"
            placeholder="?"
            autoFocus
          />
          {feedback === null && (
            <button
              type="submit"
              className="bg-rose-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-rose-600 transition text-lg"
            >
              Verificar
            </button>
          )}
        </form>

        {feedback !== null && (
          <div className="mt-4">
            <Feedback
              correct={feedback}
              message={feedback ? 'Correto!' : `A resposta certa é ${op.resposta}`}
            />
            <button
              onClick={handleNext}
              className="mt-3 bg-green-500 text-white font-bold px-6 py-2 rounded-xl hover:bg-green-600 transition"
            >
              {currentIndex < total - 1 ? 'Próximo →' : 'Ver Resultado'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
