import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/client';
import { z } from 'zod';

const updateTaskSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().optional(),
  assigneeId: z.string().optional(),
  priority: z.enum(['high', 'medium', 'low']).optional(),
  status: z.enum(['todo', 'in_progress', 'review', 'done']).optional(),
  estimatedHours: z.number().int().positive().optional(),
  actualHours: z.number().int().positive().optional(),
  dueDate: z.string().datetime().optional(),
  dependencies: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const task = await prisma.task.findFirst({
      where: { id, project: { members: { some: { userId: session.user.id } } } },
      include: {
        project: { select: { id: true, name: true } },
        assignee: { select: { id: true, name: true, email: true, avatar: true } },
        evaluation: true,
      },
    });

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({
      task: {
        ...task,
        dependencies: task.dependencies ? JSON.parse(task.dependencies) : [],
        tags: task.tags ? JSON.parse(task.tags) : [],
      },
    });
  } catch (error) {
    const { id } = await params;
    console.error(`GET /api/tasks/${id} error:`, error);
    return NextResponse.json({ error: 'Failed to fetch task' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.task.findFirst({
      where: { id, project: { members: { some: { userId: session.user.id } } } },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    const body = await request.json();
    const data = updateTaskSchema.parse(body);

    const updateData: Record<string, unknown> = {};
    if (data.title) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.assigneeId) updateData.assigneeId = data.assigneeId;
    if (data.priority) updateData.priority = data.priority;
    if (data.status) {
      updateData.status = data.status;
      if (data.status === 'done' && !existing.completedAt) {
        updateData.completedAt = new Date();
      }
    }
    if (data.estimatedHours) updateData.estimatedHours = data.estimatedHours;
    if (data.actualHours) updateData.actualHours = data.actualHours;
    if (data.dueDate) updateData.dueDate = new Date(data.dueDate);
    if (data.dependencies) updateData.dependencies = JSON.stringify(data.dependencies);
    if (data.tags) updateData.tags = JSON.stringify(data.tags);

    const task = await prisma.task.update({
      where: { id },
      data: updateData,
      include: {
        project: { select: { id: true, name: true } },
        assignee: { select: { id: true, name: true, avatar: true } },
      },
    });

    return NextResponse.json({ task });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    const { id } = await params;
    console.error(`PUT /api/tasks/${id} error:`, error);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.task.findFirst({
      where: { id, project: { members: { some: { userId: session.user.id } } } },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    await prisma.task.delete({ where: { id } });

    return NextResponse.json({ message: 'Task deleted' });
  } catch (error) {
    const { id } = await params;
    console.error(`DELETE /api/tasks/${id} error:`, error);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
