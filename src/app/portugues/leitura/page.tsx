'use client'
import { useState } from 'react'
import { textos } from '@/data/textos'

export default function LeituraPage() {
  const [selectedTexto, setSelectedTexto] = useState<number | null>(null)
  const [fontSize, setFontSize] = useState(18)

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-5xl">📚</span>
        <h1 className="text-4xl font-extrabold text-cyan-600 mt-2">Leitura</h1>
        <p className="text-gray-500">Escolha um texto para ler!</p>
      </div>

      {selectedTexto === null ? (
        <div className="grid gap-4">
          {textos.map((texto) => (
            <button
              key={texto.id}
              onClick={() => setSelectedTexto(texto.id)}
              className="bg-white rounded-2xl shadow-md p-6 text-left hover:shadow-lg transition border-2 border-transparent hover:border-cyan-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{texto.titulo}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Nível {texto.nivel} {texto.nivel === 1 ? '⭐' : '⭐⭐'}
                  </p>
                </div>
                <span className="text-3xl">📄</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedTexto(null)}
            className="mb-4 text-cyan-600 font-bold hover:underline"
          >
            ← Voltar aos textos
          </button>

          <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-cyan-200">
            <h2 className="text-2xl font-extrabold text-cyan-700 mb-4">
              {textos.find((t) => t.id === selectedTexto)?.titulo}
            </h2>

            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setFontSize((s) => Math.max(14, s - 2))}
                className="bg-gray-200 px-3 py-1 rounded-lg font-bold hover:bg-gray-300"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize((s) => Math.min(28, s + 2))}
                className="bg-gray-200 px-3 py-1 rounded-lg font-bold hover:bg-gray-300"
              >
                A+
              </button>
            </div>

            <p
              className="text-gray-700 leading-relaxed"
              style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
            >
              {textos.find((t) => t.id === selectedTexto)?.texto}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
