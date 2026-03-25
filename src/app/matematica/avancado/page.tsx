'use client'
import { useState } from 'react'
import Feedback from '@/components/Feedback'
import ProgressBar from '@/components/ProgressBar'

type Exercicio = {
  tipo: string
  pergunta: string
  opcoes: string[]
  resposta: string
}

const exercicios: Exercicio[] = [
  { tipo: 'fracao', pergunta: 'Quanto é 1/2 de 10?', opcoes: ['3', '5', '7', '10'], resposta: '5' },
  { tipo: 'fracao', pergunta: 'Quanto é 1/4 de 20?', opcoes: ['4', '5', '10', '15'], resposta: '5' },
  { tipo: 'fracao', pergunta: 'Quanto é 3/4 de 12?', opcoes: ['6', '8', '9', '3'], resposta: '9' },
  { tipo: 'fracao', pergunta: 'Qual fração representa metade?', opcoes: ['1/3', '1/4', '1/2', '2/3'], resposta: '1/2' },
  { tipo: 'porcentagem', pergunta: 'Quanto é 10% de 100?', opcoes: ['5', '10', '15', '20'], resposta: '10' },
  { tipo: 'porcentagem', pergunta: 'Quanto é 50% de 80?', opcoes: ['20', '30', '40', '50'], resposta: '40' },
  { tipo: 'porcentagem', pergunta: 'Quanto é 25% de 40?', opcoes: ['5', '8', '10', '15'], resposta: '10' },
  { tipo: 'geometria', pergunta: 'Quantos lados tem um triângulo?', opcoes: ['2', '3', '4', '5'], resposta: '3' },
  { tipo: 'geometria', pergunta: 'Quantos lados tem um quadrado?', opcoes: ['3', '4', '5', '6'], resposta: '4' },
  { tipo: 'geometria', pergunta: 'Qual é a área de um quadrado com lado 5?', opcoes: ['10', '15', '20', '25'], resposta: '25' },
  { tipo: 'geometria', pergunta: 'Qual é o perímetro de um retângulo 3x4?', opcoes: ['7', '12', '14', '24'], resposta: '14' },
  { tipo: 'porcentagem', pergunta: 'Se um produto custa R$200 e tem 10% de desconto, quanto fica?', opcoes: ['R$170', 'R$180', 'R$190', 'R$160'], resposta: 'R$180' },
]

export default function AvancadoPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [feedback, setFeedback] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const ex = exercicios[currentIndex]

  const handleAnswer = (opcao: string) => {
    if (feedback !== null) return
    const correct = opcao === ex.resposta
    setFeedback(correct)
    if (correct) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (currentIndex < exercicios.length - 1) {
      setCurrentIndex((i) => i + 1)
      setFeedback(null)
    } else {
      setFinished(true)
    }
  }

  const getTypeLabel = (tipo: string) => {
    switch (tipo) {
      case 'fracao': return '🔢 Fração'
      case 'porcentagem': return '💯 Porcentagem'
      case 'geometria': return '📐 Geometria'
      default: return tipo
    }
  }

  if (finished) {
    return (
      <div className="text-center py-12">
        <span className="text-8xl">{score >= 10 ? '🏆' : score >= 7 ? '🥈' : '💪'}</span>
        <h1 className="text-4xl font-extrabold text-fuchsia-600 mt-4">Resultado</h1>
        <p className="text-xl text-gray-600 mt-2">Você acertou {score} de {exercicios.length}!</p>
        <div className="flex gap-2 justify-center mt-4 flex-wrap">
          {Array.from({ length: score }).map((_, i) => (
            <span key={i} className="text-3xl">⭐</span>
          ))}
        </div>
        <button
          onClick={() => { setCurrentIndex(0); setScore(0); setFinished(false); setFeedback(null) }}
          className="mt-6 bg-fuchsia-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-fuchsia-600 transition"
        >
          Jogar Novamente
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <span className="text-5xl">📐</span>
        <h1 className="text-4xl font-extrabold text-fuchsia-600 mt-2">Avançado</h1>
        <p className="text-gray-500">Frações, porcentagem e geometria!</p>
      </div>

      <ProgressBar current={currentIndex + 1} total={exercicios.length} label="Progresso" />

      <div className="bg-white rounded-3xl shadow-xl p-8 mt-4 border-4 border-fuchsia-200">
        <span className="bg-fuchsia-100 text-fuchsia-700 text-sm font-bold px-3 py-1 rounded-full">
          {getTypeLabel(ex.tipo)}
        </span>

        <p className="text-xl font-bold text-gray-800 mt-4 mb-6">{ex.pergunta}</p>

        <div className="grid grid-cols-2 gap-3">
          {ex.opcoes.map((opcao) => (
            <button
              key={opcao}
              onClick={() => handleAnswer(opcao)}
              disabled={feedback !== null}
              className={`p-4 rounded-2xl font-bold text-lg transition-all ${
                feedback !== null
                  ? opcao === ex.resposta
                    ? 'bg-green-400 text-white'
                    : 'bg-gray-200 text-gray-400'
                  : 'bg-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-200 transform hover:scale-105'
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
                {currentIndex < exercicios.length - 1 ? 'Próximo →' : 'Ver Resultado'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
