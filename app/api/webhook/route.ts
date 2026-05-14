import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!signature || !secret) {
      console.error("Webhook Error: Missing signature or secret");
      return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      console.error("Webhook Error: Invalid signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const payload = JSON.parse(body);
    
    // Extract player_id, payment_id, and paid amount (in paise) from payload
    const playerId = payload.payload?.payment?.entity?.notes?.player_id || payload.payment?.entity?.notes?.player_id;
    const razorpayPaymentId = payload.payload?.payment?.entity?.id || payload.payment?.entity?.id;
    const paidAmountPaise = payload.payload?.payment?.entity?.amount || payload.payment?.entity?.amount;

    if (!playerId) {
      console.error("Webhook Error: Player ID not found in payload notes", payload);
      return NextResponse.json({ error: "Player ID not found in notes" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Fetch the player record to get the price snapshot saved at registration
    const { data: player, error: fetchError } = await supabase
      .from('players')
      .select('expected_amount_paise')
      .eq('id', playerId)
      .single();

    if (fetchError || !player) {
      console.error("Webhook Error: Player record not found", fetchError);
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    const expectedAmountPaise = player.expected_amount_paise;

    // Determine final status based on amount verification (paise comparison)
    let finalStatus = "Success";
    if (paidAmountPaise < expectedAmountPaise) {
      console.warn(`FRAUD ALERT: Player ${playerId} paid ${paidAmountPaise} paise, but snapshot expected ${expectedAmountPaise} paise.`);
      finalStatus = "FRAUD";
    }

    
    // Update player status and save payment ID
    const { error } = await supabase
      .from("players")
      .update({ 
        payment_status: finalStatus,
        razorpay_payment_id: razorpayPaymentId,
        updated_at: new Date().toISOString()
      })
      .eq("id", playerId);

    if (error) {
      console.error("Supabase Update Error:", error);
      throw error;
    }

    console.log(`Webhook Success: Player ${playerId} marked as ${finalStatus}`);
    return NextResponse.json({ success: true });


  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
