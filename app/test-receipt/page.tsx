"use client";

import React from "react";
import { SuccessScreen } from "@/components/SuccessScreen";

export default function TestReceiptPage() {
  const mockData = {
    fullName: "Rohit Sharma",
    age: "37",
    mobile: "9876543210",
    email: "rohit@cricket.com",
    role: "Batsman",
    battingStyle: "Right Hand",
    bowlingStyle: "None",
    photoUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=500&auto=format&fit=crop",
    jerseyNumber: "45",
    jerseySize: "L",
  };

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <SuccessScreen 
        formData={mockData} 
        paymentId="pay_test_MOCK123456789" 
        onClose={() => window.location.href = '/'}
      />
    </main>
  );
}
