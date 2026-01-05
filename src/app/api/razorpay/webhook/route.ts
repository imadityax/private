import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { handlePaymentAuthorized, handlePaymentCaptured, handlePaymentFailed } from "./handlers/payment";
import {
  handleDisputeCreated,
  handleDisputeUnderReview,
  handleDisputeActionRequired,
  handleDisputeWon,
  handleDisputeLost,
  handleDisputeClosed,
} from "./handlers/dispute";
import {
  handleOrderPaid,
  handleOrderNotificationDelivered,
  handleOrderNotificationFailed,
} from "./handlers/order";
import {
  handlePaymentLinkPaid,
  handlePaymentLinkPartiallyPaid,
  handlePaymentLinkExpired,
  handlePaymentLinkCancelled,
} from "./handlers/payment-link";
import {
  handleInvoicePaid,
  handleInvoicePartiallyPaid,
  handleInvoiceExpired,
} from "./handlers/invoice";
import {
  handleRefundCreated,
  handleRefundProcessed,
  handleRefundFailed,
  handleRefundSpeedChanged,
} from "./handlers/refund";
import { handleSettlementProcessed } from "./handlers/settlement";
import {
  handlePaymentDowntimeStarted,
  handlePaymentDowntimeUpdated,
  handlePaymentDowntimeResolved,
} from "./handlers/downtime";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);
  const eventType = event.event;

  try {
    switch (eventType) {
      // Payment Events
      case "payment.authorized":
        await handlePaymentAuthorized(event);
        break;

      case "payment.captured":
        await handlePaymentCaptured(event);
        break;

      case "payment.failed":
        await handlePaymentFailed(event);
        break;

      // Dispute Events
      case "payment.dispute.created":
        await handleDisputeCreated(event);
        break;

      case "payment.dispute.under_review":
        await handleDisputeUnderReview(event);
        break;

      case "payment.dispute.action_required":
        await handleDisputeActionRequired(event);
        break;

      case "payment.dispute.won":
        await handleDisputeWon(event);
        break;

      case "payment.dispute.lost":
        await handleDisputeLost(event);
        break;

      case "payment.dispute.closed":
        await handleDisputeClosed(event);
        break;

      // Order Events
      case "order.paid":
        await handleOrderPaid(event);
        break;

      case "order.notification.delivered":
        await handleOrderNotificationDelivered(event);
        break;

      case "order.notification.failed":
        await handleOrderNotificationFailed(event);
        break;

      // Payment Link Events
      case "payment_link.paid":
        await handlePaymentLinkPaid(event);
        break;

      case "payment_link.partially_paid":
        await handlePaymentLinkPartiallyPaid(event);
        break;

      case "payment_link.expired":
        await handlePaymentLinkExpired(event);
        break;

      case "payment_link.cancelled":
        await handlePaymentLinkCancelled(event);
        break;

      // Invoice Events
      case "invoice.paid":
        await handleInvoicePaid(event);
        break;

      case "invoice.partially_paid":
        await handleInvoicePartiallyPaid(event);
        break;

      case "invoice.expired":
        await handleInvoiceExpired(event);
        break;

      // Refund Events
      case "refund.created":
        await handleRefundCreated(event);
        break;

      case "refund.processed":
        await handleRefundProcessed(event);
        break;

      case "refund.failed":
        await handleRefundFailed(event);
        break;

      case "refund.speed_changed":
        await handleRefundSpeedChanged(event);
        break;

      // Settlement Events
      case "settlement.processed":
        await handleSettlementProcessed(event);
        break;

      // Downtime Events
      case "payment.downtime.started":
        await handlePaymentDowntimeStarted(event);
        break;

      case "payment.downtime.updated":
        await handlePaymentDowntimeUpdated(event);
        break;

      case "payment.downtime.resolved":
        await handlePaymentDowntimeResolved(event);
        break;

      default:
        console.log(`Unhandled webhook event: ${eventType}`, event.payload);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(`Error processing webhook event ${eventType}:`, error);
    return NextResponse.json(
      { error: "Failed to process webhook", details: error.message },
      { status: 500 }
    );
  }
}
