"use client";

import React, { useState } from "react";
import { SplashScreen } from "@/components/SplashScreen";
import { IntroScreen } from "@/components/IntroScreen";
import { RegistrationForm } from "@/components/RegistrationForm";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<"splash" | "intro" | "registration">("splash");

  return (
    <main
      className="min-h-screen font-sans text-slate-800"
      style={{
        background:
          "linear-gradient(rgba(15, 23, 42, 0.85), rgba(30, 58, 138, 0.8)), url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2000&auto=format&fit=crop') no-repeat center center fixed",
        backgroundSize: "cover",
      }}
    >
      {currentScreen === "splash" && (
        <SplashScreen onComplete={() => setCurrentScreen("intro")} />
      )}

      {currentScreen === "intro" && (
        <IntroScreen onStartRegistration={() => setCurrentScreen("registration")} />
      )}

      {currentScreen === "registration" && (
        <RegistrationForm onBackToIntro={() => setCurrentScreen("intro")} />
      )}
    </main>
  );
}
