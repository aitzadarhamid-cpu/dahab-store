import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// POST /api/analytics — receives client-side analytics events
// Logs them server-side for debugging / future warehousing.
// ---------------------------------------------------------------------------

interface AnalyticsPayload {
  event: string;
  data: Record<string, unknown>;
  timestamp: string;
  url: string;
  userAgent: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AnalyticsPayload;

    // Validate required fields
    if (!body.event) {
      return NextResponse.json(
        { error: "Missing event name" },
        { status: 400 }
      );
    }

    // Log to server console (can later be piped to a data warehouse)
    console.log(
      JSON.stringify({
        type: "analytics_event",
        event: body.event,
        data: body.data,
        timestamp: body.timestamp || new Date().toISOString(),
        url: body.url,
        ip: request.headers.get("x-forwarded-for") || "unknown",
        userAgent: body.userAgent || request.headers.get("user-agent") || "unknown",
      })
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Invalid payload" },
      { status: 400 }
    );
  }
}
