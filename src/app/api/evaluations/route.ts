import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/client';
import { z } from 'zod';

const createEvaluationSchema = z.object({
  targetType: z.enum(['task', 'project', 'daily']),
  targetId: z.string().min(1),
  taskId: z.string().optional(),
  projectId: z.string().optional(),
  selfScore: z.number().int().min(1).max(5),
  autoScore: z.number().int().min(1).max(5).optional(),
  comments: z.string().optional(),
  improvements: z.array(z.string()).default([]),
  learnings: z.array(z.string()).default([]),
});

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const targetType = searchParams.get('targetType');
    const taskId = searchParams.get('taskId');
    const projectId = searchParams.get('projectId');

    const where: Record<string, unknown> = {
      userId: session.user.id,
    };

    if (targetType) where.targetType = targetType;
    if (taskId) where.taskId = taskId;
    if (projectId) where.projectId = projectId;

    const evaluations = await prisma.evaluation.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        task: { select: { id: true, title: true } },
        project: { select: { id: true, name: true } },
        actions: { select: { id: true, title: true, status: true } },
      },
      orderBy: { evaluatedAt: 'desc' },
    });

    return NextResponse.json({ evaluations });
  } catch (error) {
    console.error('GET /api/evaluations error:', error);
    return NextResponse.json({ error: 'Failed to fetch evaluations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = createEvaluationSchema.parse(body);

    // targetTypeに応じてtaskIdまたはprojectIdを設定
    let taskId: string | null = null;
    let projectId: string | null = null;

    if (data.targetType === 'task') {
      taskId = data.targetId;

      // タスクが存在し、ユーザーがアクセス可能か確認
      const task = await prisma.task.findFirst({
        where: {
          id: taskId,
          project: { members: { some: { userId: session.user.id } } },
        },
      });

      if (!task) {
        return NextResponse.json({ error: 'Task not found or no access' }, { status: 404 });
      }
    } else if (data.targetType === 'project') {
      projectId = data.targetId;

      // プロジェクトが存在し、ユーザーがアクセス可能か確認
      const project = await prisma.project.findFirst({
        where: {
          id: projectId,
          members: { some: { userId: session.user.id } },
        },
      });

      if (!project) {
        return NextResponse.json({ error: 'Project not found or no access' }, { status: 404 });
      }
    }

    const evaluation = await prisma.evaluation.create({
      data: {
        userId: session.user.id,
        taskId,
        projectId,
        targetType: data.targetType,
        selfScore: data.selfScore,
        autoScore: data.autoScore,
        comments: data.comments || '',
        improvements: JSON.stringify(data.improvements),
        learnings: JSON.stringify(data.learnings),
      },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        task: { select: { id: true, title: true } },
        project: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json({ evaluation }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('POST /api/evaluations error:', error);
    return NextResponse.json({ error: 'Failed to create evaluation' }, { status: 500 });
  }
}
