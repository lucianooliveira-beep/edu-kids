'use client'
import { useState, useCallback } from 'react'
import { palavrasForca } from '@/data/forca'

const TECLADO = [
  ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  ['H', 'I', 'J', 'K', 'L', 'M', 'N'],
  ['O', 'P', 'Q', 'R', 'S', 'T', 'U'],
  ['V', 'W', 'X', 'Y', 'Z'],
]

const MAX_ERROS = 6

function getRandomWord() {
  return palavrasForca[Math.floor(Math.random() * palavrasForca.length)]
}

function ForcaDesenho({ erros }: { erros: number }) {
  return (
    <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
      {/* Base */}
      <line x1="20" y1="180" x2="100" y2="180" stroke="#4B5563" strokeWidth="4" strokeLinecap="round" />
      {/* Poste vertical */}
      <line x1="60" y1="180" x2="60" y2="20" stroke="#4B5563" strokeWidth="4" strokeLinecap="round" />
      {/* Poste horizontal */}
      <line x1="60" y1="20" x2="140" y2="20" stroke="#4B5563" strokeWidth="4" strokeLinecap="round" />
      {/* Corda */}
      <line x1="140" y1="20" x2="140" y2="50" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" />

      {/* Cabeca */}
      {erros >= 1 && (
        <circle cx="140" cy="65" r="15" stroke="#EF4444" strokeWidth="3" fill="none" />
      )}
      {/* Corpo */}
      {erros >= 2 && (
        <line x1="140" y1="80" x2="140" y2="130" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      )}
      {/* Braco esquerdo */}
      {erros >= 3 && (
        <line x1="140" y1="95" x2="115" y2="115" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      )}
      {/* Braco direito */}
      {erros >= 4 && (
        <line x1="140" y1="95" x2="165" y2="115" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      )}
      {/* Perna esquerda */}
      {erros >= 5 && (
        <line x1="140" y1="130" x2="120" y2="160" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      )}
      {/* Perna direita */}
      {erros >= 6 && (
        <line x1="140" y1="130" x2="160" y2="160" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      )}

      {/* Rosto triste quando perde */}
      {erros >= 6 && (
        <>
          <circle cx="134" cy="62" r="2" fill="#EF4444" />
          <circle cx="146" cy="62" r="2" fill="#EF4444" />
          <path d="M 133 72 Q 140 67 147 72" stroke="#EF4444" strokeWidth="2" fill="none" />
        </>
      )}
    </svg>
  )
}

export default function ForcaPage() {
  const [palavraAtual, setPalavraAtual] = useState(() => getRandomWord())
  const [letrasUsadas, setLetrasUsadas] = useState<Set<string>>(new Set())
  const [score, setScore] = useState(0)
  const [rodada, setRodada] = useState(1)
  const [totalRodadas] = useState(5)

  const palavra = palavraAtual.palavra
  const erros = Array.from(letrasUsadas).filter((l) => !palavra.includes(l)).length
  const venceu = Array.from(palavra).every((l) => letrasUsadas.has(l))
  const perdeu = erros >= MAX_ERROS
  const jogoAcabou = venceu || perdeu

  const handleLetra = useCallback(
    (letra: string) => {
      if (jogoAcabou || letrasUsadas.has(letra)) return
      setLetrasUsadas((prev) => { const next = new Set(Array.from(prev)); next.add(letra); return next })
    },
    [jogoAcabou, letrasUsadas]
  )

  const handleProxima = () => {
    if (venceu) setScore((s) => s + 1)
    if (rodada < totalRodadas) {
      setPalavraAtual(getRandomWord())
      setLetrasUsadas(new Set())
      setRodada((r) => r + 1)
    }
  }

  const handleReiniciar = () => {
    setPalavraAtual(getRandomWord())
    setLetrasUsadas(new Set())
    setScore(0)
    setRodada(1)
  }

  const finished = jogoAcabou && rodada >= totalRodadas

  if (finished) {
    const finalScore = score + (venceu ? 1 : 0)
    return (
      <div className="text-center py-12 animate-bounce-in">
        <span className="text-8xl">{finalScore >= 4 ? '🏆' : finalScore >= 2 ? '👏' : '💪'}</span>
        <h1 className="text-4xl font-extrabold text-red-600 mt-4">Fim do Jogo!</h1>
        <p className="text-xl text-gray-600 mt-2">
          Voce acertou {finalScore} de {totalRodadas} palavras!
        </p>
        <div className="flex gap-2 justify-center mt-4">
          {Array.from({ length: finalScore }).map((_, i) => (
            <span key={i} className="text-3xl">⭐</span>
          ))}
        </div>
        <button
          onClick={handleReiniciar}
          className="mt-6 bg-red-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-red-600 transition"
        >
          Jogar Novamente
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <span className="text-5xl">🎮</span>
        <h1 className="text-4xl font-extrabold text-red-600 mt-2">Jogo da Forca</h1>
        <p className="text-gray-500">Rodada {rodada} de {totalRodadas} | Acertos: {score}</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-red-200">
        {/* Desenho da forca */}
        <ForcaDesenho erros={erros} />

        {/* Vidas restantes */}
        <div className="flex justify-center gap-1 my-4">
          {Array.from({ length: MAX_ERROS }).map((_, i) => (
            <span key={i} className={`text-2xl ${i < MAX_ERROS - erros ? '' : 'grayscale opacity-30'}`}>
              ❤️
            </span>
          ))}
        </div>

        {/* Dica e Categoria */}
        <div className="text-center mb-4">
          <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
            {palavraAtual.categoria}
          </span>
          <p className="text-gray-500 mt-2">💡 Dica: {palavraAtual.dica}</p>
        </div>

        {/* Palavra */}
        <div className="flex gap-2 justify-center mb-6 flex-wrap">
          {Array.from(palavra).map((letra, i) => (
            <div
              key={i}
              className={`w-10 h-12 border-b-4 flex items-center justify-center text-2xl font-extrabold transition-all ${
                letrasUsadas.has(letra)
                  ? 'border-green-500 text-green-700 animate-bounce-in'
                  : perdeu
                  ? 'border-red-400 text-red-400'
                  : 'border-gray-300'
              }`}
            >
              {letrasUsadas.has(letra) || perdeu ? letra : ''}
            </div>
          ))}
        </div>

        {/* Resultado */}
        {jogoAcabou && (
          <div className={`text-center mb-4 p-3 rounded-2xl ${venceu ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            <p className="font-bold text-lg">
              {venceu ? '🎉 Parabens! Voce acertou!' : `😢 A palavra era: ${palavra}`}
            </p>
            <button
              onClick={handleProxima}
              className="mt-3 bg-green-500 text-white font-bold px-6 py-2 rounded-xl hover:bg-green-600 transition"
            >
              Proxima Palavra →
            </button>
          </div>
        )}

        {/* Teclado */}
        {!jogoAcabou && (
          <div className="space-y-2">
            {TECLADO.map((linha, i) => (
              <div key={i} className="flex gap-1.5 justify-center">
                {linha.map((letra) => {
                  const usada = letrasUsadas.has(letra)
                  const correta = usada && palavra.includes(letra)
                  const errada = usada && !palavra.includes(letra)

                  return (
                    <button
                      key={letra}
                      onClick={() => handleLetra(letra)}
                      disabled={usada}
                      className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                        correta
                          ? 'bg-green-400 text-white'
                          : errada
                          ? 'bg-red-300 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-700 hover:scale-110'
                      }`}
                    >
                      {letra}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
