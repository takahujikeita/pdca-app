import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/client';
import { z } from 'zod';

const createActionSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  assigneeId: z.string().min(1),
  evaluationId: z.string().min(1),
  status: z.enum(['planned', 'in_progress', 'completed']).default('planned'),
  priority: z.enum(['high', 'medium', 'low']).default('medium'),
  impact: z.enum(['high', 'medium', 'low']).default('medium'),
  effort: z.enum(['high', 'medium', 'low']).default('medium'),
  dueDate: z.string().datetime(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const evaluationId = searchParams.get('evaluationId');
    const status = searchParams.get('status');
    const assigneeId = searchParams.get('assigneeId');

    const where: Record<string, unknown> = {
      assigneeId: session.user.id,
    };

    if (evaluationId) where.evaluationId = evaluationId;
    if (status) where.status = status;
    if (assigneeId) where.assigneeId = assigneeId;

    const actions = await prisma.action.findMany({
      where,
      include: {
        assignee: { select: { id: true, name: true, avatar: true } },
        evaluation: {
          select: {
            id: true,
            targetType: true,
            selfScore: true,
            task: { select: { id: true, title: true } },
            project: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ actions });
  } catch (error) {
    console.error('GET /api/actions error:', error);
    return NextResponse.json({ error: 'Failed to fetch actions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = createActionSchema.parse(body);

    // 評価が存在し、ユーザーがアクセス可能か確認
    const evaluation = await prisma.evaluation.findFirst({
      where: { id: data.evaluationId, userId: session.user.id },
    });

    if (!evaluation) {
      return NextResponse.json({ error: 'Evaluation not found or no access' }, { status: 404 });
    }

    // 担当者がシステムに存在するか確認
    const assignee = await prisma.user.findUnique({
      where: { id: data.assigneeId },
    });

    if (!assignee) {
      return NextResponse.json({ error: 'Assignee not found' }, { status: 404 });
    }

    const action = await prisma.action.create({
      data: {
        title: data.title,
        description: data.description || '',
        assigneeId: data.assigneeId,
        evaluationId: data.evaluationId,
        status: data.status,
        priority: data.priority,
        impact: data.impact,
        effort: data.effort,
        dueDate: new Date(data.dueDate),
      },
      include: {
        assignee: { select: { id: true, name: true, avatar: true } },
        evaluation: {
          select: {
            id: true,
            targetType: true,
            selfScore: true,
            task: { select: { id: true, title: true } },
            project: { select: { id: true, name: true } },
          },
        },
      },
    });

    return NextResponse.json({ action }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('POST /api/actions error:', error);
    return NextResponse.json({ error: 'Failed to create action' }, { status: 500 });
  }
}
