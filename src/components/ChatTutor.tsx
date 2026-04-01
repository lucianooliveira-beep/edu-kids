'use client'
import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatTutor() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight)
  }, [messages])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const updated = [...messages, { role: 'user' as const, content: text }]
    setMessages(updated)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      })
      const data = await res.json()
      if (data.reply) {
        setMessages([...updated, { role: 'assistant', content: data.reply }])
      }
    } catch {
      setMessages([...updated, { role: 'assistant', content: 'Ops, algo deu errado! Tente novamente.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-500 to-pink-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition-transform"
        title="Chat com EduBot"
      >
        {open ? '✕' : '🤖'}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-[28rem] bg-white rounded-2xl shadow-2xl border-2 border-purple-200 flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 text-center font-bold rounded-t-2xl">
            🤖 EduBot - Seu Tutor!
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.length === 0 && (
              <p className="text-center text-gray-400 text-sm mt-8">
                Oi! Pergunte qualquer coisa sobre suas materias! 📚
              </p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-purple-500 text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-3 py-2 rounded-2xl text-sm text-gray-500 animate-pulse">
                  Pensando...
                </div>
              </div>
            )}
          </div>

          <div className="p-2 border-t flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Digite sua pergunta..."
              className="flex-1 px-3 py-2 border rounded-xl text-sm focus:outline-none focus:border-purple-400"
            />
            <button
              onClick={send}
              disabled={loading}
              className="bg-purple-500 text-white px-3 py-2 rounded-xl text-sm font-bold hover:bg-purple-600 disabled:opacity-50"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  )
}
