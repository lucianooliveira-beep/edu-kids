import ModuleCard from '@/components/ModuleCard'
import Avatar from '@/components/Avatar'

export default function MatematicaPage() {
  return (
    <div>
      <div className="flex justify-center mb-8">
        <Avatar message="Oba! Matemática é divertida! Aqui você vai aprender números, operações, tabuada e resolver problemas incríveis. Por onde quer começar?" autoPlay />
      </div>
      <div className="text-center mb-10">
        <span className="text-6xl">🔢</span>
        <h1 className="text-4xl font-extrabold text-teal-600 mt-2">Matemática</h1>
        <p className="text-gray-500 text-lg">Escolha uma atividade para praticar!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <ModuleCard
          title="Números"
          description="Aprenda a reconhecer e contar números!"
          href="/matematica/numeros"
          emoji="🔢"
          color="bg-gradient-to-br from-yellow-400 to-amber-500"
        />
        <ModuleCard
          title="Operações"
          description="Adição, subtração, multiplicação e divisão!"
          href="/matematica/operacoes"
          emoji="➕"
          color="bg-gradient-to-br from-red-400 to-rose-500"
        />
        <ModuleCard
          title="Problemas"
          description="Resolva problemas com raciocínio lógico!"
          href="/matematica/problemas"
          emoji="🧠"
          color="bg-gradient-to-br from-cyan-400 to-blue-500"
        />
        <ModuleCard
          title="Tabuada"
          description="Estude e teste a tabuada de 2 a 10!"
          href="/matematica/tabuada"
          emoji="✖️"
          color="bg-gradient-to-br from-green-400 to-emerald-500"
        />
        <ModuleCard
          title="Avancado"
          description="Fracoes, porcentagem e geometria!"
          href="/matematica/avancado"
          emoji="📐"
          color="bg-gradient-to-br from-purple-400 to-fuchsia-500"
        />
      </div>
    </div>
  )
}
