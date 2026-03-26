'use client'
import { useEffect, useRef, useState } from 'react'

interface AvatarProps {
  message: string
  autoPlay?: boolean
}

export default function Avatar({ message, autoPlay = false }: AvatarProps) {
  const [speaking, setSpeaking] = useState(false)
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null)

  const typeMessage = () => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const type = () => {
      if (i <= message.length) {
        setDisplayed(message.slice(0, i))
        i++
        typingRef.current = setTimeout(type, 35)
      } else {
        setDone(true)
      }
    }
    type()
  }

  const speak = () => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()

    const utter = new SpeechSynthesisUtterance(message)
    utter.lang = 'pt-BR'
    utter.rate = 0.9
    utter.pitch = 1.2

    const setVoice = () => {
      const voices = window.speechSynthesis.getVoices()
      const ptVoice = voices.find(
        (v) => v.lang.startsWith('pt') && v.name.toLowerCase().includes('female')
      ) || voices.find((v) => v.lang.startsWith('pt'))
      if (ptVoice) utter.voice = ptVoice
    }

    if (window.speechSynthesis.getVoices().length > 0) {
      setVoice()
    } else {
      window.speechSynthesis.onvoiceschanged = setVoice
    }

    utter.onstart = () => setSpeaking(true)
    utter.onend = () => setSpeaking(false)
    utter.onerror = () => setSpeaking(false)

    synthRef.current = utter
    window.speechSynthesis.speak(utter)
  }

  const handlePlay = () => {
    if (typingRef.current) clearTimeout(typingRef.current)
    typeMessage()
    speak()
  }

  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(() => handlePlay(), 500)
      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current)
      window.speechSynthesis?.cancel()
    }
  }, [])

  return (
    <div className="flex items-end gap-4">
      {/* Mascote */}
      <div className="relative flex-shrink-0">
        <div
          className={`w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center shadow-lg border-4 border-white cursor-pointer select-none transition-transform active:scale-95 ${
            speaking ? 'animate-bounce' : 'hover:scale-105'
          }`}
          onClick={handlePlay}
          title="Clique para ouvir"
        >
          <span className="text-5xl">🦉</span>
        </div>
        {/* ondas de som */}
        {speaking && (
          <span className="absolute -right-1 top-1 flex gap-0.5 items-end h-5">
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-orange-400 animate-pulse"
                style={{
                  height: `${i * 5 + 4}px`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </span>
        )}
      </div>

      {/* Balão de fala */}
      <div className="relative bg-white rounded-2xl rounded-bl-none shadow-md border-2 border-yellow-200 px-5 py-4 max-w-xs md:max-w-sm">
        {/* ponteiro */}
        <div className="absolute -left-3 bottom-4 w-0 h-0 border-t-8 border-t-transparent border-r-[14px] border-r-yellow-200 border-b-8 border-b-transparent" />
        <div className="absolute -left-[10px] bottom-[18px] w-0 h-0 border-t-[7px] border-t-transparent border-r-[12px] border-r-white border-b-[7px] border-b-transparent" />

        <p className="text-gray-700 font-semibold text-sm leading-relaxed min-h-[1.5rem]">
          {displayed || <span className="text-gray-300">...</span>}
          {!done && displayed.length > 0 && (
            <span className="inline-block w-0.5 h-4 bg-orange-400 animate-pulse ml-0.5 align-middle" />
          )}
        </p>

        {done && (
          <button
            onClick={handlePlay}
            className="mt-2 text-xs text-orange-400 font-bold hover:text-orange-600 flex items-center gap-1"
          >
            🔊 Ouvir novamente
          </button>
        )}
      </div>
    </div>
  )
}
