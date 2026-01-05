export async function handlePaymentDowntimeStarted(event: any) {
    // Log downtime events (no database changes needed)
    console.log(`Payment downtime ${event.event}:`, event.payload);
}

export async function handlePaymentDowntimeUpdated(event: any) {
    // Log downtime events (no database changes needed)
    console.log(`Payment downtime ${event.event}:`, event.payload);
}

export async function handlePaymentDowntimeResolved(event: any) {
    // Log downtime events (no database changes needed)
    console.log(`Payment downtime ${event.event}:`, event.payload);
}

