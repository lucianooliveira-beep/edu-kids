'use client'
import { useState, useMemo } from 'react'
import { exerciciosSilabas } from '@/data/silabas'
import Feedback from '@/components/Feedback'
import ProgressBar from '@/components/ProgressBar'

export default function SilabasPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedSilabas, setSelectedSilabas] = useState<string[]>([])
  const [feedback, setFeedback] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [shuffleKey, setShuffleKey] = useState(0)

  const exercicio = exerciciosSilabas[currentIndex]
  const shuffled = useMemo(
    () => [...exercicio.silabas].sort(() => Math.random() - 0.5),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentIndex, shuffleKey]
  )

  const handleSilabaClick = (silaba: string) => {
    if (feedback !== null) return
    const next = [...selectedSilabas, silaba]
    setSelectedSilabas(next)

    const currentWord = next.join('')
    if (next.length === exercicio.silabas.length) {
      const correct = currentWord === exercicio.resposta
      setFeedback(correct)
      if (correct) setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < exerciciosSilabas.length - 1) {
      setCurrentIndex((i) => i + 1)
      setSelectedSilabas([])
      setFeedback(null)
    } else {
      setFinished(true)
    }
  }

  const handleReset = () => {
    setSelectedSilabas([])
    setFeedback(null)
    setShuffleKey((k) => k + 1)
  }

  if (finished) {
    return (
      <div className="text-center py-12">
        <span className="text-8xl">🎉</span>
        <h1 className="text-4xl font-extrabold text-purple-600 mt-4">Parabéns!</h1>
        <p className="text-xl text-gray-600 mt-2">
          Você acertou {score} de {exerciciosSilabas.length} palavras!
        </p>
        <div className="flex gap-2 justify-center mt-4">
          {Array.from({ length: score }).map((_, i) => (
            <span key={i} className="text-3xl">⭐</span>
          ))}
        </div>
        <button
          onClick={() => { setCurrentIndex(0); setScore(0); setFinished(false); setSelectedSilabas([]); setFeedback(null) }}
          className="mt-6 bg-purple-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-purple-600 transition"
        >
          Jogar Novamente
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <span className="text-5xl">🧩</span>
        <h1 className="text-4xl font-extrabold text-purple-600 mt-2">Sílabas</h1>
        <p className="text-gray-500">Junte as sílabas para formar a palavra!</p>
      </div>

      <ProgressBar current={currentIndex + 1} total={exerciciosSilabas.length} label="Progresso" />

      <div className="bg-white rounded-3xl shadow-xl p-8 mt-6 border-4 border-purple-200">
        <p className="text-center text-lg text-gray-500 mb-2">{exercicio.dica}</p>

        <div className="bg-gray-100 rounded-2xl p-4 mb-6 min-h-[60px] flex items-center justify-center gap-1">
          {selectedSilabas.length > 0 ? (
            <span className="text-3xl font-extrabold text-purple-700">
              {selectedSilabas.join('')}
            </span>
          ) : (
            <span className="text-gray-400 text-lg">Clique nas sílabas abaixo...</span>
          )}
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {shuffled.map((silaba, i) => {
            const usedCount = selectedSilabas.filter((s) => s === silaba).length
            const availableCount = exercicio.silabas.filter((s) => s === silaba).length
            const isUsed = usedCount >= availableCount

            return (
              <button
                key={`${silaba}-${i}`}
                onClick={() => handleSilabaClick(silaba)}
                disabled={isUsed || feedback !== null}
                className={`px-6 py-3 rounded-2xl text-xl font-bold transition-all ${
                  isUsed
                    ? 'bg-gray-200 text-gray-400'
                    : 'bg-purple-500 text-white hover:bg-purple-600 transform hover:scale-105'
                }`}
              >
                {silaba}
              </button>
            )
          })}
        </div>

        {feedback !== null && <Feedback correct={feedback} />}

        <div className="flex gap-3 justify-center mt-4">
          {feedback === false && (
            <button
              onClick={handleReset}
              className="bg-orange-400 text-white font-bold px-6 py-2 rounded-xl hover:bg-orange-500 transition"
            >
              Tentar de Novo
            </button>
          )}
          {feedback !== null && (
            <button
              onClick={handleNext}
              className="bg-green-500 text-white font-bold px-6 py-2 rounded-xl hover:bg-green-600 transition"
            >
              {currentIndex < exerciciosSilabas.length - 1 ? 'Próxima →' : 'Ver Resultado'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
