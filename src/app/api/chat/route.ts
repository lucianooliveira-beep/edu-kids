import { NextRequest, NextResponse } from 'next/server'
import { chat } from '@/lib/ai'

const SYSTEM_PROMPT = `Voce e um tutor educacional para criancas de 6 a 12 anos chamado EduBot.
Regras:
- Use linguagem simples e divertida, como se falasse com uma crianca
- Use emojis para tornar a conversa mais alegre
- Explique conceitos de portugues e matematica de forma ludica
- De exemplos do dia a dia da crianca
- Respostas curtas e objetivas (maximo 3 paragrafos)
- Sempre incentive e elogie o esforco da crianca
- Responda sempre em portugues do Brasil`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    const allMessages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...messages,
    ]
    const reply = await chat(allMessages)
    return NextResponse.json({ reply })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Erro ao processar'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
