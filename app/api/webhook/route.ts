import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export async function POST(req: Request) {
  // 1. Initialize Admin Client inside the function to ensure it's fresh
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY! // Corrected name from .env.local
  );

  let rawBody = "";
  try {
    rawBody = await req.text();
  } catch (err) {
    console.error("Failed to read request text:", err);
    return NextResponse.json({ error: "Failed to read body" }, { status: 400 });
  }

  // 2. THE EMERGENCY LOG - This must be the very first action
  let logId: string | null = null;
  try {
    let jsonPayload;
    try {
      jsonPayload = JSON.parse(rawBody || '{}');
    } catch {
      jsonPayload = { raw: rawBody };
    }

    const { data: logData, error: logError } = await supabaseAdmin
      .from('webhook_logs')
      .insert({
        raw_payload: jsonPayload,
        headers: Object.fromEntries(req.headers.entries()),
        status: 'received_at_gateway'
      })
      .select('id')
      .single();

    if (logData) logId = logData.id;
    if (logError) console.error("Critical Logging Failure (DB):", logError);
  } catch (logError) {
    console.error("Critical Logging Failure (Try/Catch):", logError);
  }

  try {
    const signature = req.headers.get("x-razorpay-signature");
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // 3. DO NOT THROW AN ERROR. Return a JSON response instead.
    if (!signature) {
      console.error("❌ Test blocked: No signature found in headers");
      if (logId) {
        await supabaseAdmin.from('webhook_logs').update({ 
          error: "No signature", 
          status: 'failed' 
        }).eq('id', logId);
      }
      return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    if (!secret) {
      console.error("❌ Server Error: RAZORPAY_WEBHOOK_SECRET is missing in .env");
      if (logId) {
        await supabaseAdmin.from('webhook_logs').update({ 
          error: "Server secret missing", 
          status: 'failed' 
        }).eq('id', logId);
      }
      return NextResponse.json({ error: "Server secret missing" }, { status: 500 });
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", secret!)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== signature) {
      throw new Error("Invalid Signature");
    }

    const payload = JSON.parse(rawBody);
    
    // Extract player_id, payment_id, and paid amount (in paise) from payload
    const playerId = payload.payload?.payment?.entity?.notes?.player_id || payload.payment?.entity?.notes?.player_id;
    const razorpayPaymentId = payload.payload?.payment?.entity?.id || payload.payment?.entity?.id;
    const paidAmountPaise = payload.payload?.payment?.entity?.amount || payload.payment?.entity?.amount;

    if (!playerId) {
      throw new Error("Player ID not found in payload notes");
    }

    const { data: player, error: fetchError } = await supabaseAdmin
      .from('players')
      .select('expected_amount_paise')
      .eq('id', playerId)
      .single();

    if (fetchError || !player) {
      throw new Error(fetchError?.message || "Player not found");
    }

    const expectedAmountPaise = player.expected_amount_paise;
    let finalStatus = "Success";
    if (paidAmountPaise < expectedAmountPaise) {
      console.warn(`FRAUD ALERT: Player ${playerId} paid ${paidAmountPaise} paise, but snapshot expected ${expectedAmountPaise} paise.`);
      finalStatus = "FRAUD";
    }

    const { error: updateError } = await supabaseAdmin
      .from("players")
      .update({ 
        payment_status: finalStatus,
        razorpay_payment_id: razorpayPaymentId
      })
      .eq("id", playerId);

    if (updateError) throw updateError;

    // Update log status to success
    if (logId) {
      await supabaseAdmin.from('webhook_logs').update({ status: 'processed_success' }).eq('id', logId);
    }

    console.log(`Webhook Success: Player ${playerId} marked as ${finalStatus}`);
    return NextResponse.json({ success: true });

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    const details = err && typeof err === 'object' && 'details' in err ? String((err as { details: unknown }).details) : undefined;
    const hint = err && typeof err === 'object' && 'hint' in err ? String((err as { hint: unknown }).hint) : undefined;

    // This will print the actual message (like "column does not exist") instead of [object Object]
    console.error("❌ Webhook Logic Failed:", errorMessage);
    if (details) console.error("Details:", details);
    if (hint) console.error("Hint:", hint);

    if (logId) {
      await supabaseAdmin
        .from("webhook_logs")
        .update({ 
          error: errorMessage,
          status: 'failed'
        })
        .eq("id", logId);
    }

    return NextResponse.json(
      { error: errorMessage || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}





