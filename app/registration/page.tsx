"use client";

import React from "react";
import { RegistrationForm } from "@/components/RegistrationForm";
import { useRouter } from "next/navigation";

export default function RegistrationPage() {
  const router = useRouter();

  return (
    <main
      className="min-h-screen font-sans text-slate-800"
      style={{
        backgroundImage:
          "linear-gradient(rgba(15, 23, 42, 0.95), rgba(54, 98, 227, 0.2)), url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2000&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <RegistrationForm onBackToIntro={() => router.push("/")} />
    </main>
  );
}
