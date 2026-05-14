/*
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await createClient();
    
    // Fetch fee structure from database
    const { data: settings } = await supabase
      .from('global_settings')
      .select('value')
      .eq('key', 'registration_fee')
      .single();
    
    let totalFee = 100;
    if (settings) {
      try {
        const feeItems = JSON.parse(settings.value);
        if (Array.isArray(feeItems)) {
          totalFee = feeItems.reduce((acc, item) => acc + (parseInt(item.amount) || 0), 0);
        } else {
          totalFee = parseInt(settings.value) || 100;
        }
      } catch (e) {
        totalFee = parseInt(settings.value) || 100;
      }
    }
    
    const amountInPaise = totalFee * 100;

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!;
    const keySecret = process.env.RAZORPAY_KEY_SECRET!;

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(keyId + ":" + keySecret),
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.description || "Failed to create order");
    }

    const order = await response.json();
    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    console.error("Razorpay Error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
*/

export async function POST() {
    return new Response("This route is currently disabled.", { status: 503 });
}

