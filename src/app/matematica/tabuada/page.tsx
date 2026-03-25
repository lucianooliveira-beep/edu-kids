'use client'
import { useState, useEffect, useCallback } from 'react'
import Feedback from '@/components/Feedback'
import ProgressBar from '@/components/ProgressBar'

export default function TabuadaPage() {
  const [mode, setMode] = useState<'menu' | 'learn' | 'quiz'>('menu')
  const [selectedTabuada, setSelectedTabuada] = useState(2)
  const [quizQuestions, setQuizQuestions] = useState<{ a: number; b: number; resposta: number }[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [timer, setTimer] = useState(0)
  const [timerActive, setTimerActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerActive) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000)
    }
    return () => clearInterval(interval)
  }, [timerActive])

  const gerarQuiz = useCallback((num: number) => {
    const questions = []
    for (let i = 1; i <= 10; i++) {
      questions.push({ a: num, b: i, resposta: num * i })
    }
    // Shuffle
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]]
    }
    return questions
  }, [])

  const startQuiz = (num: number) => {
    setSelectedTabuada(num)
    setQuizQuestions(gerarQuiz(num))
    setCurrentIndex(0)
    setUserAnswer('')
    setFeedback(null)
    setScore(0)
    setFinished(false)
    setTimer(0)
    setTimerActive(true)
    setMode('quiz')
  }

  const startLearn = (num: number) => {
    setSelectedTabuada(num)
    setMode('learn')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (feedback !== null || !userAnswer) return
    const correct = Number(userAnswer) === quizQuestions[currentIndex].resposta
    setFeedback(correct)
    if (correct) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((i) => i + 1)
      setUserAnswer('')
      setFeedback(null)
    } else {
      setFinished(true)
      setTimerActive(false)
    }
  }

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60)
    const sec = s % 60
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  if (mode === 'menu') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-5xl">✖️</span>
          <h1 className="text-4xl font-extrabold text-green-600 mt-2">Tabuada</h1>
          <p className="text-gray-500">Escolha uma tabuada para estudar ou testar!</p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mb-8">
          {Array.from({ length: 9 }, (_, i) => i + 2).map((num) => (
            <div key={num} className="bg-white rounded-2xl shadow-md p-4 text-center border-2 border-green-200 hover:border-green-400 transition">
              <p className="text-3xl font-extrabold text-green-600 mb-3">{num}</p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => startLearn(num)}
                  className="bg-green-100 text-green-700 font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-green-200 transition"
                >
                  📖 Estudar
                </button>
                <button
                  onClick={() => startQuiz(num)}
                  className="bg-green-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-green-600 transition"
                >
                  🎯 Quiz
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              const random = Math.floor(Math.random() * 9) + 2
              startQuiz(random)
            }}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-8 py-3 rounded-xl text-lg hover:shadow-lg hover:scale-105 transition-all"
          >
            🎲 Quiz Aleatorio!
          </button>
        </div>
      </div>
    )
  }

  if (mode === 'learn') {
    return (
      <div className="max-w-lg mx-auto">
        <button onClick={() => setMode('menu')} className="mb-4 text-green-600 font-bold hover:underline">
          ← Voltar
        </button>

        <div className="text-center mb-6">
          <span className="text-5xl">📖</span>
          <h1 className="text-4xl font-extrabold text-green-600 mt-2">Tabuada do {selectedTabuada}</h1>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-green-200">
          <div className="space-y-3">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <div
                key={num}
                className="flex items-center justify-between bg-green-50 rounded-xl p-3 hover:bg-green-100 transition"
              >
                <span className="text-xl font-bold text-gray-700">
                  {selectedTabuada} x {num}
                </span>
                <span className="text-xl font-extrabold text-green-600">
                  = {selectedTabuada * num}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => startQuiz(selectedTabuada)}
            className="w-full mt-6 bg-green-500 text-white font-bold py-3 rounded-xl text-lg hover:bg-green-600 transition"
          >
            Testar meus conhecimentos! 🎯
          </button>
        </div>
      </div>
    )
  }

  if (finished) {
    return (
      <div className="text-center py-12 animate-bounce-in">
        <span className="text-8xl">{score >= 9 ? '🏆' : score >= 7 ? '🥈' : '💪'}</span>
        <h1 className="text-4xl font-extrabold text-green-600 mt-4">Resultado</h1>
        <p className="text-xl text-gray-600 mt-2">
          Tabuada do {selectedTabuada}: {score} de {quizQuestions.length} acertos
        </p>
        <p className="text-lg text-gray-400 mt-1">Tempo: {formatTime(timer)} ⏱️</p>
        <div className="flex gap-2 justify-center mt-4">
          {Array.from({ length: score }).map((_, i) => (
            <span key={i} className="text-3xl">⭐</span>
          ))}
        </div>
        <div className="flex gap-3 justify-center mt-6">
          <button
            onClick={() => startQuiz(selectedTabuada)}
            className="bg-green-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-600 transition"
          >
            Tentar Novamente
          </button>
          <button
            onClick={() => setMode('menu')}
            className="bg-gray-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-gray-600 transition"
          >
            Outra Tabuada
          </button>
        </div>
      </div>
    )
  }

  const q = quizQuestions[currentIndex]

  return (
    <div className="max-w-lg mx-auto">
      <button onClick={() => setMode('menu')} className="mb-4 text-green-600 font-bold hover:underline">
        ← Voltar
      </button>

      <div className="flex justify-between items-center mb-4">
        <p className="text-sm font-bold text-gray-500">Tabuada do {selectedTabuada}</p>
        <p className="text-sm font-bold text-green-600">⏱️ {formatTime(timer)}</p>
      </div>

      <ProgressBar current={currentIndex + 1} total={quizQuestions.length} label="Progresso" />

      <div className="bg-white rounded-3xl shadow-xl p-8 mt-4 border-4 border-green-200 text-center">
        <p className="text-5xl font-extrabold text-gray-800 mb-6">
          {q.a} x {q.b} = ?
        </p>

        <form onSubmit={handleSubmit} className="flex gap-3 justify-center items-center">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={feedback !== null}
            className="w-32 p-3 text-center text-2xl font-bold border-3 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none"
            placeholder="?"
            autoFocus
          />
          {feedback === null && (
            <button
              type="submit"
              className="bg-green-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-600 transition text-lg"
            >
              Verificar
            </button>
          )}
        </form>

        {feedback !== null && (
          <div className="mt-4">
            <Feedback
              correct={feedback}
              message={feedback ? 'Correto!' : `A resposta certa e ${q.resposta}`}
            />
            <button
              onClick={handleNext}
              className="mt-3 bg-green-500 text-white font-bold px-6 py-2 rounded-xl hover:bg-green-600 transition"
            >
              {currentIndex < quizQuestions.length - 1 ? 'Proximo →' : 'Ver Resultado'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
