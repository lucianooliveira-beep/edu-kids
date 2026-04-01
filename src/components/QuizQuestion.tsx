'use client'
import { useState } from 'react'

interface QuizQuestionProps {
  pergunta: string
  opcoes: string[]
  respostaCorreta: number | string
  onAnswer: (correct: boolean) => void
}

export default function QuizQuestion({ pergunta, opcoes, respostaCorreta, onAnswer }: QuizQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [dica, setDica] = useState('')
  const [loadingDica, setLoadingDica] = useState(false)

  const handleSelect = (index: number) => {
    if (answered) return
    setSelected(index)
    setAnswered(true)
    const isCorrect =
      typeof respostaCorreta === 'number'
        ? index === respostaCorreta
        : opcoes[index] === respostaCorreta
    onAnswer(isCorrect)
  }

  const getButtonClass = (index: number) => {
    if (!answered) {
      return selected === index
        ? 'bg-blue-200 border-blue-500'
        : 'bg-white hover:bg-blue-50 border-gray-200'
    }
    const isCorrect =
      typeof respostaCorreta === 'number'
        ? index === respostaCorreta
        : opcoes[index] === respostaCorreta
    if (isCorrect) return 'bg-green-200 border-green-500'
    if (index === selected) return 'bg-red-200 border-red-500'
    return 'bg-white border-gray-200 opacity-50'
  }

  const pedirDica = async () => {
    if (loadingDica || dica) return
    setLoadingDica(true)
    try {
      const res = await fetch('/api/dica', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta, opcoes }),
      })
      const data = await res.json()
      setDica(data.dica || 'Tente pensar com calma!')
    } catch {
      setDica('Tente pensar com calma!')
    } finally {
      setLoadingDica(false)
    }
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-3">{pergunta}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {opcoes.map((opcao, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={answered}
            className={`p-4 rounded-2xl border-3 font-semibold text-gray-700 transition-all ${getButtonClass(i)} ${!answered ? 'cursor-pointer' : 'cursor-default'}`}
          >
            {opcao}
          </button>
        ))}
      </div>
      {!answered && (
        <button
          onClick={pedirDica}
          disabled={loadingDica || !!dica}
          className="mt-2 text-sm text-purple-600 hover:text-purple-800 font-semibold disabled:opacity-50"
        >
          {loadingDica ? '💭 Pensando...' : dica ? '💡 Dica abaixo' : '💡 Pedir uma dica'}
        </button>
      )}
      {dica && (
        <div className="mt-2 bg-purple-50 border border-purple-200 rounded-xl p-3 text-sm text-purple-800">
          {dica}
        </div>
      )}
    </div>
  )
}
