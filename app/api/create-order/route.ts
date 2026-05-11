import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";

export async function POST() {
  try {
    const order = await razorpay.orders.create({
      amount: 5000, // ₹50.00
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json({ orderId: order.id });
  } catch (error: any) {
    console.error("Razorpay Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
