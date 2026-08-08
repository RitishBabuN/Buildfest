import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const SEED_ACTIONS = [
  {
    id: 'action-101',
    title: 'Enforce AWS S3 Log Encryption at Rest',
    description: 'Configure AWS IAM bucket policies to require SSE-KMS on all customer audit logs.',
    assigneeName: 'David Miller',
    assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    assigneeRole: 'Security Lead',
    deadline: '2026-08-14',
    status: 'Pending',
    riskLevel: 'High',
    aiConfidence: 98
  },
  {
    id: 'action-102',
    title: 'Update Vendor Data Processing Agreements (DPA)',
    description: 'Execute updated HIPAA DPAs with third-party LLM API providers.',
    assigneeName: 'Elena Rostova',
    assigneeAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
    assigneeRole: 'Legal Counsel',
    deadline: '2026-08-25',
    status: 'In Progress',
    riskLevel: 'Medium',
    aiConfidence: 95
  },
  {
    id: 'action-103',
    title: 'Setup Automated Multi-Region Database Backups',
    description: 'Configure cross-region database snapshot replication with 30-day retention.',
    assigneeName: 'Marcus Chen',
    assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    assigneeRole: 'DevOps Architect',
    deadline: '2026-08-05',
    status: 'Overdue',
    riskLevel: 'High',
    aiConfidence: 96
  }
];

export async function GET() {
  try {
    let actions = await db.actionItem.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Auto-seed if database is empty
    if (actions.length === 0) {
      for (const item of SEED_ACTIONS) {
        await db.actionItem.create({
          data: item,
        });
      }
      actions = await db.actionItem.findMany({
        orderBy: { createdAt: 'desc' },
      });

      await db.auditLog.create({
        data: {
          event: 'DATABASE_SEEDED',
          details: JSON.stringify({ count: actions.length, message: 'Seeded default compliance actions into database.' }),
        },
      });
    }

    return NextResponse.json({ success: true, actions });
  } catch (error: any) {
    console.error('[API GET /api/actions] Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, assigneeName, assigneeAvatar, assigneeRole, deadline, riskLevel } = body;

    const action = await db.actionItem.create({
      data: {
        title: title || 'New Action Item',
        description: description || '',
        assigneeName: assigneeName || 'Unassigned',
        assigneeAvatar: assigneeAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        assigneeRole: assigneeRole || 'Team Member',
        deadline: deadline || new Date().toISOString().slice(0, 10),
        status: 'Pending',
        riskLevel: riskLevel || 'Medium',
        aiConfidence: 95,
      },
    });

    await db.auditLog.create({
      data: {
        event: 'ACTION_CREATED',
        details: JSON.stringify({ actionId: action.id, title: action.title, assignee: action.assigneeName }),
      },
    });

    return NextResponse.json({ success: true, action });
  } catch (error: any) {
    console.error('[API POST /api/actions] Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
