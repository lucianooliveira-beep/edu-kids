import ModuleCard from '@/components/ModuleCard'
import Avatar from '@/components/Avatar'

export default function PortuguesPage() {
  return (
    <div>
      <div className="flex justify-center mb-8">
        <Avatar message="Bem-vindo ao módulo de Português! Aqui você vai aprender o alfabeto, sílabas, leitura, escrita e muito mais. Escolha uma atividade!" autoPlay />
      </div>
      <div className="text-center mb-10">
        <span className="text-6xl">📖</span>
        <h1 className="text-4xl font-extrabold text-indigo-600 mt-2">Português</h1>
        <p className="text-gray-500 text-lg">Escolha uma atividade para praticar!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <ModuleCard
          title="Alfabeto"
          description="Aprenda todas as letras do A ao Z!"
          href="/portugues/alfabeto"
          emoji="🔤"
          color="bg-gradient-to-br from-pink-400 to-rose-500"
        />
        <ModuleCard
          title="Sílabas"
          description="Junte sílabas e forme palavras!"
          href="/portugues/silabas"
          emoji="🧩"
          color="bg-gradient-to-br from-violet-400 to-purple-500"
        />
        <ModuleCard
          title="Leitura"
          description="Leia textos divertidos!"
          href="/portugues/leitura"
          emoji="📚"
          color="bg-gradient-to-br from-blue-400 to-cyan-500"
        />
        <ModuleCard
          title="Interpretação"
          description="Leia e responda perguntas!"
          href="/portugues/interpretacao"
          emoji="🤔"
          color="bg-gradient-to-br from-amber-400 to-orange-500"
        />
        <ModuleCard
          title="Escrita"
          description="Complete palavras e ordene frases!"
          href="/portugues/escrita"
          emoji="✏️"
          color="bg-gradient-to-br from-emerald-400 to-green-500"
        />
        <ModuleCard
          title="Jogo da Forca"
          description="Adivinhe a palavra antes que o boneco apareca!"
          href="/portugues/forca"
          emoji="🎮"
          color="bg-gradient-to-br from-red-400 to-rose-500"
        />
        <ModuleCard
          title="Jogo da Memoria"
          description="Encontre os pares de palavras e emojis!"
          href="/portugues/memoria"
          emoji="🧠"
          color="bg-gradient-to-br from-cyan-400 to-blue-500"
        />
      </div>
    </div>
  )
}
