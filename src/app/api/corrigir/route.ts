import { NextRequest, NextResponse } from 'next/server'
import { chat } from '@/lib/ai'

export async function POST(req: NextRequest) {
  try {
    const { texto } = await req.json()
    const reply = await chat([
      {
        role: 'system',
        content: `Voce e um professor de portugues para criancas de 6-12 anos. Corrija o texto da crianca de forma carinhosa e educativa.
Formato da resposta:
- Elogie o esforco da crianca
- Aponte os erros de forma gentil com emojis
- Mostre a versao corrigida
- De uma dica divertida para melhorar
Responda em portugues do Brasil.`,
      },
      {
        role: 'user',
        content: `Corrija meu texto:\n\n${texto}`,
      },
    ], { maxTokens: 512 })
    return NextResponse.json({ correcao: reply })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Erro ao corrigir'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
