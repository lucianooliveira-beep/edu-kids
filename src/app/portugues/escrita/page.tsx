'use client'
import { useState } from 'react'
import Feedback from '@/components/Feedback'
import ProgressBar from '@/components/ProgressBar'

type ExercicioCompletar = {
  tipo: 'completar'
  palavra: string
  lacuna: string
  opcoes: string[]
  resposta: string
}

type ExercicioOrdenar = {
  tipo: 'ordenar'
  palavras: string[]
  resposta: string
}

type Exercicio = ExercicioCompletar | ExercicioOrdenar

const exercicios: Exercicio[] = [
  { tipo: 'completar', palavra: 'ESCOLA', lacuna: 'ESC_LA', opcoes: ['O', 'A', 'U', 'E'], resposta: 'O' },
  { tipo: 'completar', palavra: 'CAVALO', lacuna: 'CA_ALO', opcoes: ['B', 'V', 'F', 'P'], resposta: 'V' },
  { tipo: 'completar', palavra: 'FLORESTA', lacuna: 'FLOR_STA', opcoes: ['A', 'I', 'E', 'O'], resposta: 'E' },
  { tipo: 'completar', palavra: 'CACHORRO', lacuna: 'CACH_RRO', opcoes: ['A', 'E', 'I', 'O'], resposta: 'O' },
  { tipo: 'completar', palavra: 'PASSARO', lacuna: 'PA_SARO', opcoes: ['S', 'C', 'Z', 'X'], resposta: 'S' },
  { tipo: 'ordenar', palavras: ['gosta', 'O', 'brincar', 'gato', 'de'], resposta: 'O gato gosta de brincar' },
  { tipo: 'ordenar', palavras: ['é', 'A', 'bonita', 'flor', 'muito'], resposta: 'A flor é muito bonita' },
  { tipo: 'ordenar', palavras: ['na', 'escola', 'Eu', 'estudo'], resposta: 'Eu estudo na escola' },
  { tipo: 'ordenar', palavras: ['brilha', 'O', 'céu', 'no', 'sol'], resposta: 'O sol brilha no céu' },
  { tipo: 'ordenar', palavras: ['come', 'macaco', 'O', 'banana'], resposta: 'O macaco come banana' },
]

export default function EscritaPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [feedback, setFeedback] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [selectedWords, setSelectedWords] = useState<string[]>([])

  const ex = exercicios[currentIndex]

  const handleCompletarAnswer = (opcao: string) => {
    if (feedback !== null) return
    const correct = opcao === ex.resposta
    setFeedback(correct)
    if (correct) setScore((s) => s + 1)
  }

  const handleWordClick = (word: string) => {
    if (feedback !== null) return
    const next = [...selectedWords, word]
    setSelectedWords(next)

    if (ex.tipo === 'ordenar' && next.length === ex.palavras.length) {
      const sentence = next.join(' ')
      const correct = sentence === ex.resposta
      setFeedback(correct)
      if (correct) setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < exercicios.length - 1) {
      setCurrentIndex((i) => i + 1)
      setFeedback(null)
      setSelectedWords([])
    } else {
      setFinished(true)
    }
  }

  const handleRetry = () => {
    setFeedback(null)
    setSelectedWords([])
  }

  if (finished) {
    return (
      <div className="text-center py-12">
        <span className="text-8xl">🎉</span>
        <h1 className="text-4xl font-extrabold text-green-600 mt-4">Parabéns!</h1>
        <p className="text-xl text-gray-600 mt-2">
          Você acertou {score} de {exercicios.length}!
        </p>
        <div className="flex gap-2 justify-center mt-4">
          {Array.from({ length: score }).map((_, i) => (
            <span key={i} className="text-3xl">⭐</span>
          ))}
        </div>
        <button
          onClick={() => { setCurrentIndex(0); setScore(0); setFinished(false); setFeedback(null); setSelectedWords([]) }}
          className="mt-6 bg-green-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-green-600 transition"
        >
          Jogar Novamente
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <span className="text-5xl">✏️</span>
        <h1 className="text-4xl font-extrabold text-green-600 mt-2">Escrita</h1>
        <p className="text-gray-500">Complete palavras e ordene frases!</p>
      </div>

      <ProgressBar current={currentIndex + 1} total={exercicios.length} label="Progresso" />

      <div className="bg-white rounded-3xl shadow-xl p-8 mt-6 border-4 border-green-200">
        {ex.tipo === 'completar' ? (
          <>
            <p className="text-center text-gray-500 mb-2">Complete a letra que falta:</p>
            <p className="text-center text-5xl font-extrabold text-gray-800 mb-6 tracking-widest">
              {ex.lacuna}
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              {ex.opcoes!.map((opcao) => (
                <button
                  key={opcao}
                  onClick={() => handleCompletarAnswer(opcao)}
                  disabled={feedback !== null}
                  className={`w-14 h-14 rounded-2xl text-2xl font-extrabold transition-all ${
                    feedback !== null
                      ? opcao === ex.resposta
                        ? 'bg-green-400 text-white'
                        : 'bg-gray-200 text-gray-400'
                      : 'bg-green-500 text-white hover:bg-green-600 transform hover:scale-110'
                  }`}
                >
                  {opcao}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-center text-gray-500 mb-2">Ordene as palavras para formar uma frase:</p>
            <div className="bg-gray-100 rounded-2xl p-4 mb-4 min-h-[50px] flex items-center justify-center">
              {selectedWords.length > 0 ? (
                <span className="text-xl font-bold text-gray-800">{selectedWords.join(' ')}</span>
              ) : (
                <span className="text-gray-400">Clique nas palavras abaixo...</span>
              )}
            </div>
            <div className="flex gap-2 justify-center flex-wrap">
              {ex.tipo === 'ordenar' && ex.palavras.map((word: string, i: number) => {
                const usedCount = selectedWords.filter((w) => w === word).length
                const totalCount = ex.palavras.filter((w: string) => w === word).length
                const disabled = usedCount >= totalCount

                return (
                  <button
                    key={`${word}-${i}`}
                    onClick={() => handleWordClick(word)}
                    disabled={disabled || feedback !== null}
                    className={`px-4 py-2 rounded-xl font-bold transition-all ${
                      disabled
                        ? 'bg-gray-200 text-gray-400'
                        : 'bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-105'
                    }`}
                  >
                    {word}
                  </button>
                )
              })}
            </div>
          </>
        )}

        {feedback !== null && (
          <div className="mt-4">
            <Feedback correct={feedback} />
          </div>
        )}

        <div className="flex gap-3 justify-center mt-4">
          {feedback === false && (
            <button onClick={handleRetry} className="bg-orange-400 text-white font-bold px-6 py-2 rounded-xl hover:bg-orange-500 transition">
              Tentar de Novo
            </button>
          )}
          {feedback !== null && (
            <button onClick={handleNext} className="bg-green-500 text-white font-bold px-6 py-2 rounded-xl hover:bg-green-600 transition">
              {currentIndex < exercicios.length - 1 ? 'Próximo →' : 'Ver Resultado'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
