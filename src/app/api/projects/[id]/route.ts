import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/client';
import { z } from 'zod';

const updateProjectSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  goals: z.array(z.string()).optional(),
  status: z.enum(['planning', 'active', 'completed', 'suspended']).optional(),
});

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const project = await prisma.project.findFirst({
      where: { id, members: { some: { userId: session.user.id } } },
      include: {
        members: { include: { user: { select: { id: true, name: true, email: true, avatar: true } } } },
        tasks: { include: { assignee: { select: { id: true, name: true, avatar: true } } }, orderBy: { createdAt: 'desc' } },
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ project: { ...project, goals: JSON.parse(project.goals) } });
  } catch (error) {
    const { id } = await params;
    console.error(`GET /api/projects/${id} error:`, error);
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.project.findFirst({
      where: { id, members: { some: { userId: session.user.id } } },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const body = await request.json();
    const data = updateProjectSchema.parse(body);

    const updateData: Record<string, unknown> = {};
    if (data.name) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.startDate) updateData.startDate = new Date(data.startDate);
    if (data.endDate) updateData.endDate = new Date(data.endDate);
    if (data.goals) updateData.goals = JSON.stringify(data.goals);
    if (data.status) updateData.status = data.status;

    const project = await prisma.project.update({
      where: { id },
      data: updateData,
      include: { members: { include: { user: { select: { id: true, name: true, email: true, avatar: true } } } } },
    });

    return NextResponse.json({ project });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    const { id: errId } = await params;
    console.error(`PUT /api/projects/${errId} error:`, error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.project.findFirst({
      where: { id, members: { some: { userId: session.user.id, role: 'owner' } } },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Project not found or no permission' }, { status: 404 });
    }

    await prisma.project.delete({ where: { id } });

    return NextResponse.json({ message: 'Project deleted' });
  } catch (error) {
    const { id: delId } = await params;
    console.error(`DELETE /api/projects/${delId} error:`, error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
