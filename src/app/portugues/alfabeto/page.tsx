'use client'
import { useState } from 'react'
import { alfabeto } from '@/data/alfabeto'

export default function AlfabetoPage() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div>
      <div className="text-center mb-8">
        <span className="text-5xl">🔤</span>
        <h1 className="text-4xl font-extrabold text-pink-600 mt-2">Alfabeto</h1>
        <p className="text-gray-500">Clique em uma letra para aprender mais!</p>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-13 gap-3 max-w-5xl mx-auto mb-8">
        {alfabeto.map((item, i) => (
          <button
            key={item.letra}
            onClick={() => setSelected(selected === i ? null : i)}
            className={`w-14 h-14 rounded-2xl text-2xl font-extrabold transition-all transform hover:scale-110 shadow-md ${
              selected === i
                ? 'bg-pink-500 text-white scale-110 shadow-lg'
                : 'bg-white text-pink-600 hover:bg-pink-100'
            }`}
          >
            {item.letra}
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 border-4 border-pink-200 text-center animate-bounce-once">
          <div className="text-8xl mb-4">{alfabeto[selected].emoji}</div>
          <h2 className="text-6xl font-extrabold text-pink-600 mb-2">{alfabeto[selected].letra}</h2>
          <p className="text-2xl font-bold text-gray-700 mb-1">
            {alfabeto[selected].palavra}
          </p>
          <p className="text-lg text-gray-500">
            Sílabas: <span className="font-bold text-purple-600">{alfabeto[selected].silaba}</span>
          </p>
        </div>
      )}
    </div>
  )
}
