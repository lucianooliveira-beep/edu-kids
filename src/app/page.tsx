import ModuleCard from '@/components/ModuleCard'
import Avatar from '@/components/Avatar'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      {/* Avatar mascote */}
      <div className="flex justify-center mb-10 mt-2">
        <Avatar
          message="Oi! Eu sou o Edu, seu professor coruja! Clique em mim para me ouvir. Vamos aprender juntos? Escolha um módulo e comece sua aventura!"
          autoPlay
        />
      </div>

      {/* Hero Section */}
      <div className="text-center mb-14">
        <div className="relative inline-block">
          <span className="text-7xl animate-float inline-block">📚</span>
          <span className="absolute -top-2 -right-4 text-3xl animate-float" style={{ animationDelay: '0.5s' }}>✨</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 mb-4 mt-4">
          Bem-vindo ao EduKids!
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
          Aprenda Portugues e Matematica de um jeito divertido! Escolha um modulo para comecar.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/registro"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-3 rounded-full text-lg hover:shadow-lg hover:scale-105 transition-all"
          >
            Comecar Agora! 🚀
          </Link>
          <Link
            href="/login"
            className="bg-white text-purple-600 font-bold px-8 py-3 rounded-full text-lg border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all"
          >
            Ja tenho conta
          </Link>
        </div>
      </div>

      {/* Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-14">
        <ModuleCard
          title="Portugues"
          description="Alfabeto, silabas, leitura, escrita, jogos e muito mais!"
          href="/portugues"
          emoji="📖"
          color="bg-gradient-to-br from-blue-500 to-indigo-600"
        />
        <ModuleCard
          title="Matematica"
          description="Numeros, operacoes, tabuada, problemas e desafios!"
          href="/matematica"
          emoji="🔢"
          color="bg-gradient-to-br from-emerald-500 to-teal-600"
        />
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-14">
        <div className="bg-white rounded-2xl p-5 shadow-md text-center hover:shadow-lg transition-shadow border-2 border-transparent hover:border-purple-200">
          <div className="text-4xl mb-2 animate-float">🎯</div>
          <p className="text-sm font-bold text-gray-700">Atividades Interativas</p>
          <p className="text-xs text-gray-400 mt-1">Jogos educativos</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-md text-center hover:shadow-lg transition-shadow border-2 border-transparent hover:border-yellow-200">
          <div className="text-4xl mb-2 animate-float" style={{ animationDelay: '0.5s' }}>⭐</div>
          <p className="text-sm font-bold text-gray-700">Ganhe Estrelas</p>
          <p className="text-xs text-gray-400 mt-1">Recompensas divertidas</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-md text-center hover:shadow-lg transition-shadow border-2 border-transparent hover:border-green-200">
          <div className="text-4xl mb-2 animate-float" style={{ animationDelay: '1s' }}>📊</div>
          <p className="text-sm font-bold text-gray-700">Acompanhe o Progresso</p>
          <p className="text-xs text-gray-400 mt-1">Painel personalizado</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-md text-center hover:shadow-lg transition-shadow border-2 border-transparent hover:border-orange-200">
          <div className="text-4xl mb-2 animate-float" style={{ animationDelay: '1.5s' }}>🏆</div>
          <p className="text-sm font-bold text-gray-700">Conquiste Medalhas</p>
          <p className="text-xs text-gray-400 mt-1">Bronze, prata e ouro</p>
        </div>
      </div>

      {/* Quick Access Activities */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-extrabold text-gray-700 text-center mb-6">Atividades Populares</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <Link href="/portugues/alfabeto" className="bg-white rounded-2xl p-4 shadow-md text-center hover:shadow-lg hover:scale-105 transition-all border-2 border-pink-100">
            <span className="text-3xl">🔤</span>
            <p className="text-sm font-bold text-gray-700 mt-2">Alfabeto</p>
          </Link>
          <Link href="/portugues/silabas" className="bg-white rounded-2xl p-4 shadow-md text-center hover:shadow-lg hover:scale-105 transition-all border-2 border-purple-100">
            <span className="text-3xl">🧩</span>
            <p className="text-sm font-bold text-gray-700 mt-2">Silabas</p>
          </Link>
          <Link href="/portugues/forca" className="bg-white rounded-2xl p-4 shadow-md text-center hover:shadow-lg hover:scale-105 transition-all border-2 border-red-100">
            <span className="text-3xl">🎮</span>
            <p className="text-sm font-bold text-gray-700 mt-2">Jogo da Forca</p>
          </Link>
          <Link href="/portugues/memoria" className="bg-white rounded-2xl p-4 shadow-md text-center hover:shadow-lg hover:scale-105 transition-all border-2 border-blue-100">
            <span className="text-3xl">🧠</span>
            <p className="text-sm font-bold text-gray-700 mt-2">Jogo da Memoria</p>
          </Link>
          <Link href="/matematica/numeros" className="bg-white rounded-2xl p-4 shadow-md text-center hover:shadow-lg hover:scale-105 transition-all border-2 border-amber-100">
            <span className="text-3xl">🔢</span>
            <p className="text-sm font-bold text-gray-700 mt-2">Numeros</p>
          </Link>
          <Link href="/matematica/tabuada" className="bg-white rounded-2xl p-4 shadow-md text-center hover:shadow-lg hover:scale-105 transition-all border-2 border-green-100">
            <span className="text-3xl">✖️</span>
            <p className="text-sm font-bold text-gray-700 mt-2">Tabuada</p>
          </Link>
          <Link href="/matematica/operacoes" className="bg-white rounded-2xl p-4 shadow-md text-center hover:shadow-lg hover:scale-105 transition-all border-2 border-rose-100">
            <span className="text-3xl">➕</span>
            <p className="text-sm font-bold text-gray-700 mt-2">Operacoes</p>
          </Link>
          <Link href="/matematica/problemas" className="bg-white rounded-2xl p-4 shadow-md text-center hover:shadow-lg hover:scale-105 transition-all border-2 border-cyan-100">
            <span className="text-3xl">🧠</span>
            <p className="text-sm font-bold text-gray-700 mt-2">Problemas</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
