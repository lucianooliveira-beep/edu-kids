import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (session.user as Record<string, any>).id
  const scores = await prisma.score.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
  return NextResponse.json(scores)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (session.user as Record<string, any>).id
  const { module, activity, score, totalQuestions } = await req.json()

  const newScore = await prisma.score.create({
    data: { userId, module, activity, score, totalQuestions },
  })

  return NextResponse.json(newScore, { status: 201 })
}
