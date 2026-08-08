import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { status, deadline } = body;

    const existingAction = await db.actionItem.findUnique({
      where: { id },
    });

    if (!existingAction) {
      return NextResponse.json({ success: false, error: 'Action item not found' }, { status: 404 });
    }

    const updatedData: any = {};
    if (status !== undefined) updatedData.status = status;
    if (deadline !== undefined) updatedData.deadline = deadline;

    const updatedAction = await db.actionItem.update({
      where: { id },
      data: updatedData,
    });

    // Record audit log entry in database
    if (status !== undefined && status !== existingAction.status) {
      await db.auditLog.create({
        data: {
          event: 'ACTION_STATUS_UPDATED',
          details: JSON.stringify({
            actionId: id,
            title: updatedAction.title,
            previousStatus: existingAction.status,
            newStatus: status,
            assignee: updatedAction.assigneeName,
          }),
        },
      });
    }

    if (deadline !== undefined && deadline !== existingAction.deadline) {
      await db.auditLog.create({
        data: {
          event: 'ACTION_DEADLINE_UPDATED',
          details: JSON.stringify({
            actionId: id,
            title: updatedAction.title,
            previousDeadline: existingAction.deadline,
            newDeadline: deadline,
          }),
        },
      });
    }

    return NextResponse.json({ success: true, action: updatedAction });
  } catch (error: any) {
    console.error('[API PATCH /api/actions/[id]] Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await db.actionItem.delete({
      where: { id },
    });

    await db.auditLog.create({
      data: {
        event: 'ACTION_DELETED',
        details: JSON.stringify({ actionId: id }),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[API DELETE /api/actions/[id]] Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
