import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">📚</span>
              <span className="font-extrabold text-xl">EduKids</span>
            </div>
            <p className="text-white/80 text-sm">
              Plataforma educacional para criancas aprenderem Portugues e Matematica de forma divertida!
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Atividades</h3>
            <div className="space-y-2 text-sm">
              <Link href="/portugues" className="block text-white/80 hover:text-yellow-200 transition">
                📖 Portugues
              </Link>
              <Link href="/matematica" className="block text-white/80 hover:text-yellow-200 transition">
                🔢 Matematica
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Links</h3>
            <div className="space-y-2 text-sm">
              <Link href="/login" className="block text-white/80 hover:text-yellow-200 transition">
                🔐 Entrar
              </Link>
              <Link href="/registro" className="block text-white/80 hover:text-yellow-200 transition">
                🌟 Criar Conta
              </Link>
              <Link href="/painel" className="block text-white/80 hover:text-yellow-200 transition">
                📊 Meu Painel
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-6 pt-4 text-center">
          <p className="text-white/60 text-sm">
            EduKids &copy; {new Date().getFullYear()} - Aprender Brincando! 🎉
          </p>
        </div>
      </div>
    </footer>
  )
}
