import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/client';
import { z } from 'zod';

const updateEvaluationSchema = z.object({
  selfScore: z.number().int().min(1).max(5).optional(),
  autoScore: z.number().int().min(1).max(5).optional(),
  comments: z.string().optional(),
  improvements: z.array(z.string()).optional(),
  learnings: z.array(z.string()).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const evaluation = await prisma.evaluation.findFirst({
      where: { id, userId: session.user.id },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        task: { select: { id: true, title: true } },
        project: { select: { id: true, name: true } },
        actions: {
          select: {
            id: true,
            title: true,
            status: true,
            priority: true,
            impact: true,
            effort: true,
            dueDate: true,
          },
        },
      },
    });

    if (!evaluation) {
      return NextResponse.json({ error: 'Evaluation not found' }, { status: 404 });
    }

    return NextResponse.json({ evaluation });
  } catch (error) {
    console.error('GET /api/evaluations/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch evaluation' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const data = updateEvaluationSchema.parse(body);

    // 評価が存在し、ユーザーが所有者か確認
    const existing = await prisma.evaluation.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Evaluation not found' }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {};
    if (data.selfScore !== undefined) updateData.selfScore = data.selfScore;
    if (data.autoScore !== undefined) updateData.autoScore = data.autoScore;
    if (data.comments !== undefined) updateData.comments = data.comments;
    if (data.improvements !== undefined) updateData.improvements = JSON.stringify(data.improvements);
    if (data.learnings !== undefined) updateData.learnings = JSON.stringify(data.learnings);

    const evaluation = await prisma.evaluation.update({
      where: { id },
      data: updateData,
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        task: { select: { id: true, title: true } },
        project: { select: { id: true, name: true } },
        actions: { select: { id: true, title: true, status: true } },
      },
    });

    return NextResponse.json({ evaluation });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('PUT /api/evaluations/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update evaluation' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // 評価が存在し、ユーザーが所有者か確認
    const existing = await prisma.evaluation.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Evaluation not found' }, { status: 404 });
    }

    await prisma.evaluation.delete({ where: { id } });

    return NextResponse.json({ message: 'Evaluation deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/evaluations/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete evaluation' }, { status: 500 });
  }
}
