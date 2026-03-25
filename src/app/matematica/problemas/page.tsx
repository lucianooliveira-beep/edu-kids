'use client'
import { useState } from 'react'
import { problemas } from '@/data/problemas-mat'
import Feedback from '@/components/Feedback'
import ProgressBar from '@/components/ProgressBar'

export default function ProblemasPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [feedback, setFeedback] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const problema = problemas[currentIndex]

  const handleAnswer = (opcao: string) => {
    if (feedback !== null) return
    const correct = opcao === problema.resposta
    setFeedback(correct)
    if (correct) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (currentIndex < problemas.length - 1) {
      setCurrentIndex((i) => i + 1)
      setFeedback(null)
    } else {
      setFinished(true)
    }
  }

  if (finished) {
    return (
      <div className="text-center py-12">
        <span className="text-8xl">{score >= 6 ? '🏆' : score >= 4 ? '👏' : '💪'}</span>
        <h1 className="text-4xl font-extrabold text-blue-600 mt-4">Resultado</h1>
        <p className="text-xl text-gray-600 mt-2">Você acertou {score} de {problemas.length}!</p>
        <div className="flex gap-2 justify-center mt-4">
          {Array.from({ length: score }).map((_, i) => (
            <span key={i} className="text-3xl">⭐</span>
          ))}
        </div>
        <button
          onClick={() => { setCurrentIndex(0); setScore(0); setFinished(false); setFeedback(null) }}
          className="mt-6 bg-blue-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-600 transition"
        >
          Jogar Novamente
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <span className="text-5xl">🧠</span>
        <h1 className="text-4xl font-extrabold text-blue-600 mt-2">Problemas</h1>
        <p className="text-gray-500">Leia com atenção e resolva!</p>
      </div>

      <ProgressBar current={currentIndex + 1} total={problemas.length} label="Progresso" />

      <div className="bg-white rounded-3xl shadow-xl p-8 mt-4 border-4 border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
            Nível {problema.nivel}
          </span>
        </div>

        <p className="text-lg text-gray-800 font-medium mb-6 leading-relaxed">
          {problema.enunciado}
        </p>

        <div className="grid grid-cols-2 gap-3">
          {problema.opcoes.map((opcao) => (
            <button
              key={opcao}
              onClick={() => handleAnswer(opcao)}
              disabled={feedback !== null}
              className={`p-4 rounded-2xl font-bold text-lg transition-all ${
                feedback !== null
                  ? opcao === problema.resposta
                    ? 'bg-green-400 text-white'
                    : 'bg-gray-200 text-gray-400'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200 transform hover:scale-105'
              }`}
            >
              {opcao}
            </button>
          ))}
        </div>

        {feedback !== null && (
          <div className="mt-4">
            <Feedback correct={feedback} />
            <div className="text-center mt-3">
              <button
                onClick={handleNext}
                className="bg-green-500 text-white font-bold px-6 py-2 rounded-xl hover:bg-green-600 transition"
              >
                {currentIndex < problemas.length - 1 ? 'Próximo →' : 'Ver Resultado'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
