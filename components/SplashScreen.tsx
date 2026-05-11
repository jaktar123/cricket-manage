"use client";

import React, { useEffect, useState } from "react";

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000); // Wait for fade out animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      id="splashScreen"
      className="fixed inset-0 z-50 bg-slate-900 flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {/* Glow Effect */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500 rounded-full blur-[120px] opacity-10"></div>

      <div className="perspective-container mb-8">
        <div className="coin">
          {/* Heads (Trophy) */}
          <div className="coin-face">
            <i className="fa-solid fa-trophy text-5xl text-yellow-900 drop-shadow-sm"></i>
          </div>
          {/* Tails (Year) */}
          <div className="coin-face coin-back">
            <span className="font-black text-2xl text-yellow-900">2026</span>
          </div>
        </div>
      </div>

      <div className="text-yellow-500/80 text-sm tracking-[0.5em] animate-pulse font-bold uppercase">
        Match Starting...
      </div>
    </div>
  );
};
