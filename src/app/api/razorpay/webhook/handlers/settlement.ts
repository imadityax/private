export async function handleSettlementProcessed(event: any) {
    // Log settlement (no database changes needed for now)
    console.log("Settlement processed:", event.payload);
}

