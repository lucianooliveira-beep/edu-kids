import Link from 'next/link'

interface ModuleCardProps {
  title: string
  description: string
  href: string
  emoji: string
  color: string
}

export default function ModuleCard({ title, description, href, emoji, color }: ModuleCardProps) {
  return (
    <Link href={href}>
      <div className={`${color} rounded-3xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-4 border-white/30`}>
        <div className="text-6xl mb-4 text-center">{emoji}</div>
        <h3 className="text-2xl font-extrabold text-white text-center mb-2">{title}</h3>
        <p className="text-white/90 text-center text-sm">{description}</p>
      </div>
    </Link>
  )
}
