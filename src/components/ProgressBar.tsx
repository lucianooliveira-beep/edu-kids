interface ProgressBarProps {
  current: number
  total: number
  label?: string
}

export default function ProgressBar({ current, total, label }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0

  return (
    <div className="w-full">
      {label && <p className="text-sm font-semibold text-gray-600 mb-1">{label}</p>}
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500 flex items-center justify-center"
          style={{ width: `${percentage}%` }}
        >
          {percentage > 15 && (
            <span className="text-[10px] font-bold text-white">{percentage}%</span>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1">{current} de {total}</p>
    </div>
  )
}
