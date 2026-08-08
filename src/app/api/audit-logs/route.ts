import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const auditLogs = await db.auditLog.findMany({
      orderBy: { timestamp: 'desc' },
    });

    const parsedLogs = auditLogs.map((log) => ({
      ...log,
      details: typeof log.details === 'string' ? JSON.parse(log.details) : log.details,
    }));

    return NextResponse.json({ success: true, auditLogs: parsedLogs });
  } catch (error: any) {
    console.error('[API GET /api/audit-logs] Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
