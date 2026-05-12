
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature,
      formData 
    } = await req.json();

    // Verify signature using Web Crypto API
    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(body)
    );
    const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    const isSignatureValid = expectedSignature === razorpay_signature;

    if (!isSignatureValid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    const supabase = await createClient();

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
