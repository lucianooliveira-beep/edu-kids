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
  const progress = await prisma.progress.findMany({ where: { userId }, orderBy: { completedAt: 'desc' } })
  return NextResponse.json(progress)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (session.user as Record<string, any>).id
  const { module, activity, level } = await req.json()

  const progress = await prisma.progress.create({
    data: { userId, module, activity, level },
  })

  return NextResponse.json(progress, { status: 201 })
}
