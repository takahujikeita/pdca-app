import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/client';
import { z } from 'zod';

const updateActionSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().optional(),
  status: z.enum(['planned', 'in_progress', 'completed']).optional(),
  priority: z.enum(['high', 'medium', 'low']).optional(),
  impact: z.enum(['high', 'medium', 'low']).optional(),
  effort: z.enum(['high', 'medium', 'low']).optional(),
  dueDate: z.string().datetime().optional(),
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

    const action = await prisma.action.findFirst({
      where: { id, assigneeId: session.user.id },
      include: {
        assignee: { select: { id: true, name: true, avatar: true } },
        evaluation: {
          select: {
            id: true,
            targetType: true,
            selfScore: true,
            comments: true,
            improvements: true,
            learnings: true,
            task: { select: { id: true, title: true } },
            project: { select: { id: true, name: true } },
          },
        },
      },
    });

    if (!action) {
      return NextResponse.json({ error: 'Action not found' }, { status: 404 });
    }

    return NextResponse.json({ action });
  } catch (error) {
    console.error('GET /api/actions/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch action' }, { status: 500 });
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
    const data = updateActionSchema.parse(body);

    // アクションが存在し、ユーザーが担当者か確認
    const existing = await prisma.action.findFirst({
      where: { id, assigneeId: session.user.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Action not found' }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.status !== undefined) {
      updateData.status = data.status;
      // completedに変更された場合、completedAtを設定
      if (data.status === 'completed' && existing.status !== 'completed') {
        updateData.completedAt = new Date();
      }
    }
    if (data.priority !== undefined) updateData.priority = data.priority;
    if (data.impact !== undefined) updateData.impact = data.impact;
    if (data.effort !== undefined) updateData.effort = data.effort;
    if (data.dueDate !== undefined) updateData.dueDate = new Date(data.dueDate);

    const action = await prisma.action.update({
      where: { id },
      data: updateData,
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

    return NextResponse.json({ action });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('PUT /api/actions/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update action' }, { status: 500 });
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

    // アクションが存在し、ユーザーが担当者か確認
    const existing = await prisma.action.findFirst({
      where: { id, assigneeId: session.user.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Action not found' }, { status: 404 });
    }

    await prisma.action.delete({ where: { id } });

    return NextResponse.json({ message: 'Action deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/actions/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete action' }, { status: 500 });
  }
}
