'use client'
import { useState } from 'react'
import { paresMemoria } from '@/data/memoria'

interface Card {
  id: number
  conteudo: string
  tipo: 'palavra' | 'emoji'
  parId: number
  virada: boolean
  encontrada: boolean
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function criarCartas(quantidade: number): Card[] {
  const selecionados = shuffleArray(paresMemoria).slice(0, quantidade)
  const cartas: Card[] = []

  selecionados.forEach((par, i) => {
    cartas.push({ id: i * 2, conteudo: par.palavra, tipo: 'palavra', parId: i, virada: false, encontrada: false })
    cartas.push({ id: i * 2 + 1, conteudo: par.emoji, tipo: 'emoji', parId: i, virada: false, encontrada: false })
  })

  return shuffleArray(cartas)
}

const NIVEIS = [
  { nome: 'Facil', pares: 4, emoji: '⭐', cor: 'from-green-400 to-emerald-500' },
  { nome: 'Medio', pares: 6, emoji: '⭐⭐', cor: 'from-yellow-400 to-amber-500' },
  { nome: 'Dificil', pares: 8, emoji: '⭐⭐⭐', cor: 'from-red-400 to-rose-500' },
]

export default function MemoriaPage() {
  const [nivel, setNivel] = useState<number | null>(null)
  const [cartas, setCartas] = useState<Card[]>([])
  const [selecionadas, setSelecionadas] = useState<number[]>([])
  const [tentativas, setTentativas] = useState(0)
  const [bloqueado, setBloqueado] = useState(false)

  const encontradas = cartas.filter((c) => c.encontrada).length
  const totalCartas = cartas.length
  const venceu = totalCartas > 0 && encontradas === totalCartas

  const handleIniciar = (nivelIdx: number) => {
    setNivel(nivelIdx)
    setCartas(criarCartas(NIVEIS[nivelIdx].pares))
    setSelecionadas([])
    setTentativas(0)
    setBloqueado(false)
  }

  const handleClick = (id: number) => {
    if (bloqueado) return
    const carta = cartas.find((c) => c.id === id)
    if (!carta || carta.virada || carta.encontrada) return

    const novasCartas = cartas.map((c) => (c.id === id ? { ...c, virada: true } : c))
    setCartas(novasCartas)

    const novasSelecionadas = [...selecionadas, id]
    setSelecionadas(novasSelecionadas)

    if (novasSelecionadas.length === 2) {
      setTentativas((t) => t + 1)
      setBloqueado(true)

      const [primeiro, segundo] = novasSelecionadas
      const carta1 = novasCartas.find((c) => c.id === primeiro)!
      const carta2 = novasCartas.find((c) => c.id === segundo)!

      if (carta1.parId === carta2.parId) {
        setTimeout(() => {
          setCartas((prev) =>
            prev.map((c) =>
              c.parId === carta1.parId ? { ...c, encontrada: true } : c
            )
          )
          setSelecionadas([])
          setBloqueado(false)
        }, 500)
      } else {
        setTimeout(() => {
          setCartas((prev) =>
            prev.map((c) =>
              c.id === primeiro || c.id === segundo ? { ...c, virada: false } : c
            )
          )
          setSelecionadas([])
          setBloqueado(false)
        }, 1000)
      }
    }
  }

  if (nivel === null) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-5xl">🧠</span>
          <h1 className="text-4xl font-extrabold text-blue-600 mt-2">Jogo da Memoria</h1>
          <p className="text-gray-500">Encontre os pares: palavra + emoji!</p>
        </div>

        <div className="grid gap-4">
          {NIVEIS.map((n, i) => (
            <button
              key={n.nome}
              onClick={() => handleIniciar(i)}
              className={`bg-gradient-to-r ${n.cor} rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all`}
            >
              <p className="text-white font-extrabold text-2xl">{n.nome}</p>
              <p className="text-white/80 text-sm mt-1">{n.pares} pares - {n.emoji}</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (venceu) {
    const estrelas = tentativas <= NIVEIS[nivel].pares + 2 ? 3 : tentativas <= NIVEIS[nivel].pares * 2 ? 2 : 1
    return (
      <div className="text-center py-12 animate-bounce-in">
        <span className="text-8xl">🎉</span>
        <h1 className="text-4xl font-extrabold text-blue-600 mt-4">Parabens!</h1>
        <p className="text-xl text-gray-600 mt-2">
          Voce encontrou todos os pares em {tentativas} tentativas!
        </p>
        <div className="flex gap-2 justify-center mt-4">
          {Array.from({ length: estrelas }).map((_, i) => (
            <span key={i} className="text-4xl">⭐</span>
          ))}
        </div>
        <div className="flex gap-3 justify-center mt-6">
          <button
            onClick={() => handleIniciar(nivel)}
            className="bg-blue-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-600 transition"
          >
            Jogar Novamente
          </button>
          <button
            onClick={() => setNivel(null)}
            className="bg-gray-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-gray-600 transition"
          >
            Trocar Nivel
          </button>
        </div>
      </div>
    )
  }

  const gridCols = NIVEIS[nivel].pares <= 4 ? 'grid-cols-4' : 'grid-cols-4 sm:grid-cols-4'

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-4">
        <span className="text-5xl">🧠</span>
        <h1 className="text-3xl font-extrabold text-blue-600 mt-2">Jogo da Memoria</h1>
      </div>

      <div className="flex justify-between items-center bg-white rounded-2xl shadow-md p-4 mb-6 border-2 border-blue-200">
        <div className="text-center">
          <p className="text-sm text-gray-500">Tentativas</p>
          <p className="text-2xl font-extrabold text-blue-600">{tentativas}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Pares Encontrados</p>
          <p className="text-2xl font-extrabold text-green-600">{encontradas / 2} / {totalCartas / 2}</p>
        </div>
        <button
          onClick={() => setNivel(null)}
          className="text-blue-600 font-bold hover:underline text-sm"
        >
          ← Voltar
        </button>
      </div>

      <div className={`grid ${gridCols} gap-3`}>
        {cartas.map((carta) => (
          <button
            key={carta.id}
            onClick={() => handleClick(carta.id)}
            className={`aspect-square rounded-2xl font-bold text-lg transition-all duration-300 ${
              carta.encontrada
                ? 'bg-green-200 border-3 border-green-400 scale-95'
                : carta.virada
                ? 'bg-white border-3 border-blue-400 shadow-lg scale-105'
                : 'bg-gradient-to-br from-blue-500 to-indigo-600 border-3 border-blue-300 hover:scale-105 hover:shadow-lg'
            }`}
          >
            {carta.virada || carta.encontrada ? (
              <span className={carta.tipo === 'emoji' ? 'text-3xl' : 'text-sm font-extrabold text-gray-700'}>
                {carta.conteudo}
              </span>
            ) : (
              <span className="text-3xl text-white">❓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
