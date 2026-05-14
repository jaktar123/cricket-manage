"use client";

import React, { useState, useEffect } from "react";
import { SplashScreen } from "@/components/SplashScreen";
import { IntroScreen } from "@/components/IntroScreen";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<"splash" | "intro" | "registration">("splash");

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hostname === "jaktar.pro") {
      window.location.href = "https://www.jaktar.pro" + window.location.pathname + window.location.search;
    }
  }, []);


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
      {currentScreen === "splash" ? (
        <SplashScreen onComplete={() => setCurrentScreen("intro")} />
      ) : (
        <IntroScreen />
      )}
    </main>
  );
}
