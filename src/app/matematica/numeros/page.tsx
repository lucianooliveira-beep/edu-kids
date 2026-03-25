'use client'
import { useState } from 'react'
import Feedback from '@/components/Feedback'

const exercicios = [
  { numero: 1, emoji: '🍎', quantidade: 1 },
  { numero: 2, emoji: '🌟', quantidade: 2 },
  { numero: 3, emoji: '🐱', quantidade: 3 },
  { numero: 4, emoji: '🦋', quantidade: 4 },
  { numero: 5, emoji: '🌺', quantidade: 5 },
  { numero: 6, emoji: '🐸', quantidade: 6 },
  { numero: 7, emoji: '🎈', quantidade: 7 },
  { numero: 8, emoji: '🐝', quantidade: 8 },
  { numero: 9, emoji: '🍊', quantidade: 9 },
  { numero: 10, emoji: '⭐', quantidade: 10 },
]

export default function NumerosPage() {
  const [mode, setMode] = useState<'learn' | 'quiz'>('learn')
  const [quizIndex, setQuizIndex] = useState(0)
  const [feedback, setFeedback] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const generateOptions = (correct: number) => {
    const opts = new Set<number>([correct])
    while (opts.size < 4) {
      opts.add(Math.floor(Math.random() * 10) + 1)
    }
    return Array.from(opts).sort(() => Math.random() - 0.5)
  }

  const currentQuiz = exercicios[quizIndex]
  const options = generateOptions(currentQuiz.numero)

  const handleAnswer = (n: number) => {
    if (feedback !== null) return
    const correct = n === currentQuiz.numero
    setFeedback(correct)
    if (correct) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (quizIndex < exercicios.length - 1) {
      setQuizIndex((i) => i + 1)
      setFeedback(null)
    } else {
      setFinished(true)
    }
  }

  if (mode === 'learn') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-5xl">🔢</span>
          <h1 className="text-4xl font-extrabold text-amber-600 mt-2">Números</h1>
          <p className="text-gray-500">Aprenda os números de 1 a 10!</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
          {exercicios.map((ex) => (
            <div key={ex.numero} className="bg-white rounded-2xl shadow-md p-4 text-center border-2 border-amber-200">
              <p className="text-4xl font-extrabold text-amber-600 mb-2">{ex.numero}</p>
              <div className="flex flex-wrap justify-center gap-1">
                {Array.from({ length: ex.quantidade }).map((_, i) => (
                  <span key={i} className="text-2xl">{ex.emoji}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => setMode('quiz')}
            className="bg-amber-500 text-white font-bold px-8 py-3 rounded-xl text-lg hover:bg-amber-600 transition"
          >
            Testar meus conhecimentos! 🎯
          </button>
        </div>
      </div>
    )
  }

  if (finished) {
    return (
      <div className="text-center py-12">
        <span className="text-8xl">🎉</span>
        <h1 className="text-4xl font-extrabold text-amber-600 mt-4">Parabéns!</h1>
        <p className="text-xl text-gray-600 mt-2">Você acertou {score} de {exercicios.length}!</p>
        <div className="flex gap-2 justify-center mt-4">
          {Array.from({ length: score }).map((_, i) => (
            <span key={i} className="text-3xl">⭐</span>
          ))}
        </div>
        <button
          onClick={() => { setMode('learn'); setQuizIndex(0); setScore(0); setFinished(false); setFeedback(null) }}
          className="mt-6 bg-amber-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-amber-600 transition"
        >
          Jogar Novamente
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-6">
        <span className="text-5xl">🎯</span>
        <h1 className="text-3xl font-extrabold text-amber-600 mt-2">Quantos são?</h1>
        <p className="text-gray-500">Pergunta {quizIndex + 1} de {exercicios.length}</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-amber-200 text-center">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {Array.from({ length: currentQuiz.quantidade }).map((_, i) => (
            <span key={i} className="text-4xl">{currentQuiz.emoji}</span>
          ))}
        </div>

        <p className="text-lg font-bold text-gray-600 mb-4">Quantos {currentQuiz.emoji} você vê?</p>

        <div className="grid grid-cols-2 gap-3">
          {options.map((n) => (
            <button
              key={n}
              onClick={() => handleAnswer(n)}
              disabled={feedback !== null}
              className={`p-4 rounded-2xl text-2xl font-extrabold transition-all ${
                feedback !== null
                  ? n === currentQuiz.numero
                    ? 'bg-green-400 text-white'
                    : 'bg-gray-200 text-gray-400'
                  : 'bg-amber-100 text-amber-700 hover:bg-amber-200 transform hover:scale-105'
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        {feedback !== null && (
          <div className="mt-4">
            <Feedback correct={feedback} />
            <button
              onClick={handleNext}
              className="mt-3 bg-green-500 text-white font-bold px-6 py-2 rounded-xl hover:bg-green-600 transition"
            >
              {quizIndex < exercicios.length - 1 ? 'Próximo →' : 'Ver Resultado'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
