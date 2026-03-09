import { NextRequest, NextResponse } from "next/server";

// =============================================================================
// WhatsApp Notification Events Tracking API
// Logs WhatsApp interaction events for conversion tracking and analytics
// =============================================================================

interface NotificationEvent {
  event: string;
  timestamp: string;
  [key: string]: unknown;
}

// In-memory store for recent events (in production, use a database table)
// This keeps the last 1000 events for admin dashboard / analytics
const recentEvents: NotificationEvent[] = [];
const MAX_EVENTS = 1000;

/**
 * POST /api/notifications
 * Log a WhatsApp interaction event.
 *
 * Expected body:
 * {
 *   event: string (e.g., "whatsapp_product_click", "whatsapp_order_confirmation", "whatsapp_support_click")
 *   ...additional metadata
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.event || typeof body.event !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'event' field" },
        { status: 400 }
      );
    }

    // Validate event type
    const validEvents = [
      "whatsapp_product_click",
      "whatsapp_order_confirmation",
      "whatsapp_support_click",
      "whatsapp_share_click",
    ];

    if (!validEvents.includes(body.event)) {
      return NextResponse.json(
        { error: "Unknown event type" },
        { status: 400 }
      );
    }

    // Build the event record
    const eventRecord: NotificationEvent = {
      event: body.event,
      timestamp: new Date().toISOString(),
      // Include relevant metadata depending on event type
      ...(body.orderNumber && { orderNumber: String(body.orderNumber) }),
      ...(body.total && { total: Number(body.total) }),
      ...(body.productName && { productName: String(body.productName) }),
      ...(body.productPrice && { productPrice: Number(body.productPrice) }),
      ...(body.selectedSize && { selectedSize: String(body.selectedSize) }),
      ...(body.quantity && { quantity: Number(body.quantity) }),
      ...(body.page && { page: String(body.page) }),
    };

    // Store event in memory
    recentEvents.push(eventRecord);
    if (recentEvents.length > MAX_EVENTS) {
      recentEvents.shift();
    }

    return NextResponse.json({ success: true, event: eventRecord.event });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

/**
 * GET /api/notifications
 * Retrieve recent WhatsApp notification events.
 * Returns aggregate stats and recent events.
 */
export async function GET() {
  // Aggregate stats
  const stats = {
    totalEvents: recentEvents.length,
    byType: {} as Record<string, number>,
    last24h: 0,
  };

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  for (const event of recentEvents) {
    stats.byType[event.event] = (stats.byType[event.event] || 0) + 1;
    if (event.timestamp > oneDayAgo) {
      stats.last24h++;
    }
  }

  return NextResponse.json({
    stats,
    recentEvents: recentEvents.slice(-50).reverse(),
  });
}
