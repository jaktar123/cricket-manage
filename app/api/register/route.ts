import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature,
      formData 
    } = await req.json();

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    const isSignatureValid = expectedSignature === razorpay_signature;

    if (!isSignatureValid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from("players")
      .insert([
        {
          full_name: formData.fullName,
          age: parseInt(formData.age),
          mobile: formData.mobile,
          email: formData.email,
          primary_role: formData.role,
          batting_style: formData.battingStyle,
          bowling_style: formData.bowlingStyle,
          jersey_number: parseInt(formData.jerseyNumber),
          jersey_size: formData.jerseySize,
          photo_url: formData.photoUrl,
          payment_status: "Success",
          payment_id: razorpay_payment_id,
        },
      ]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
