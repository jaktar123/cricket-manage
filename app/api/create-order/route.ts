export const runtime = "edge";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!;
    const keySecret = process.env.RAZORPAY_KEY_SECRET!;

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(keyId + ":" + keySecret),
      },
      body: JSON.stringify({
        amount: 10000, // ₹100.00
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
  } catch (error: any) {
    console.error("Razorpay Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
