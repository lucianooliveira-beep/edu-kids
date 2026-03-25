'use client'

interface FeedbackProps {
  correct: boolean
  message?: string
}

export default function Feedback({ correct, message }: FeedbackProps) {
  return (
    <div
      className={`p-4 rounded-2xl text-center font-bold text-lg animate-bounce ${
        correct
          ? 'bg-green-100 text-green-700 border-2 border-green-300'
          : 'bg-red-100 text-red-700 border-2 border-red-300'
      }`}
    >
      {correct ? (
        <span>🎉 {message || 'Parabéns! Você acertou!'}</span>
      ) : (
        <span>😢 {message || 'Ops! Tente novamente!'}</span>
      )}
    </div>
  )
}
