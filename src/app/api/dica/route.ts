import { NextRequest, NextResponse } from 'next/server'
import { chat } from '@/lib/ai'

export async function POST(req: NextRequest) {
  try {
    const { pergunta, opcoes } = await req.json()
    const reply = await chat([
      {
        role: 'system',
        content: `Voce e um tutor para criancas de 6-12 anos. De uma dica curta e divertida (2-3 frases) para ajudar a crianca a pensar na resposta certa. NAO de a resposta direta. Use emojis. Responda em portugues do Brasil.`,
      },
      {
        role: 'user',
        content: `Pergunta: ${pergunta}\nOpcoes: ${opcoes.join(', ')}\n\nMe de uma dica!`,
      },
    ], { maxTokens: 256 })
    return NextResponse.json({ dica: reply })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Erro ao gerar dica'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
