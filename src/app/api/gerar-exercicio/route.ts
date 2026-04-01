import { NextRequest, NextResponse } from 'next/server'
import { chat } from '@/lib/ai'

export async function POST(req: NextRequest) {
  try {
    const { modulo, quantidade = 5 } = await req.json()
    const reply = await chat([
      {
        role: 'system',
        content: `Voce gera exercicios educacionais para criancas de 6-12 anos em portugues do Brasil.
Retorne APENAS um JSON valido (sem markdown, sem texto extra) no formato:
[{"pergunta": "...", "opcoes": ["a", "b", "c", "d"], "respostaCorreta": 0}]
onde respostaCorreta e o indice (0-3) da opcao correta.
Use linguagem simples e divertida.`,
      },
      {
        role: 'user',
        content: `Gere ${quantidade} exercicios de ${modulo} para criancas.`,
      },
    ], { maxTokens: 1024, temperature: 0.8 })

    try {
      const match = reply.match(/\[[\s\S]*\]/)
      const exercicios = match ? JSON.parse(match[0]) : []
      return NextResponse.json({ exercicios })
    } catch {
      return NextResponse.json({ exercicios: [], raw: reply })
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Erro ao gerar exercicios'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
