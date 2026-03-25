'use client'
import { useState } from 'react'
import { textos } from '@/data/textos'
import QuizQuestion from '@/components/QuizQuestion'
import ProgressBar from '@/components/ProgressBar'

export default function InterpretacaoPage() {
  const [selectedTexto, setSelectedTexto] = useState<number | null>(null)
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const texto = textos.find((t) => t.id === selectedTexto)

  const handleAnswer = (correct: boolean) => {
    if (correct) setScore((s) => s + 1)
    setTimeout(() => {
      if (texto && currentQ < texto.perguntas.length - 1) {
        setCurrentQ((q) => q + 1)
      } else {
        setFinished(true)
      }
    }, 1500)
  }

  const handleReset = () => {
    setSelectedTexto(null)
    setCurrentQ(0)
    setScore(0)
    setFinished(false)
  }

  if (selectedTexto === null) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-5xl">🤔</span>
          <h1 className="text-4xl font-extrabold text-orange-600 mt-2">Interpretação de Texto</h1>
          <p className="text-gray-500">Leia o texto e responda as perguntas!</p>
        </div>

        <div className="grid gap-4">
          {textos.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTexto(t.id)}
              className="bg-white rounded-2xl shadow-md p-6 text-left hover:shadow-lg transition border-2 border-transparent hover:border-orange-300"
            >
              <h3 className="text-xl font-bold text-gray-800">{t.titulo}</h3>
              <p className="text-gray-500 text-sm mt-1">
                {t.perguntas.length} perguntas - Nível {t.nivel}
              </p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (finished) {
    return (
      <div className="text-center py-12 max-w-md mx-auto">
        <span className="text-8xl">{score === texto!.perguntas.length ? '🏆' : '👏'}</span>
        <h1 className="text-4xl font-extrabold text-orange-600 mt-4">
          {score === texto!.perguntas.length ? 'Perfeito!' : 'Bom Trabalho!'}
        </h1>
        <p className="text-xl text-gray-600 mt-2">
          Você acertou {score} de {texto!.perguntas.length} perguntas
        </p>
        <div className="flex gap-2 justify-center mt-4">
          {Array.from({ length: score }).map((_, i) => (
            <span key={i} className="text-3xl">⭐</span>
          ))}
        </div>
        <button
          onClick={handleReset}
          className="mt-6 bg-orange-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-orange-600 transition"
        >
          Escolher Outro Texto
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={handleReset} className="mb-4 text-orange-600 font-bold hover:underline">
        ← Voltar
      </button>

      <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-orange-200 mb-6">
        <h2 className="text-2xl font-extrabold text-orange-700 mb-3">{texto!.titulo}</h2>
        <p className="text-gray-700 leading-relaxed text-lg">{texto!.texto}</p>
      </div>

      <ProgressBar current={currentQ + 1} total={texto!.perguntas.length} label="Perguntas" />

      <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-orange-200 mt-4">
        <QuizQuestion
          key={currentQ}
          pergunta={texto!.perguntas[currentQ].pergunta}
          opcoes={texto!.perguntas[currentQ].opcoes}
          respostaCorreta={texto!.perguntas[currentQ].resposta}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  )
}
