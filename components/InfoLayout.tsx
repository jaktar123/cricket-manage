"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { GlobalFooter } from "./GlobalFooter";
import Image from "next/image";

interface InfoLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const InfoLayout = ({ title, children }: InfoLayoutProps) => {
  const router = useRouter();

  return (
    <main
      className="min-h-screen font-sans text-slate-800 relative overflow-x-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(15, 23, 42, 0.95), rgba(54, 98, 227, 0.2)), url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2000&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 md:py-20 animate-fade-in">
        {/* Back Button - Repositioned to Top Left */}
        <button
          onClick={() => router.push("/")}
          className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-white/40 hover:text-white transition-all group z-20"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-all">
            <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
          </div>
          <span className="uppercase tracking-[0.2em] text-[10px] font-black hidden sm:block">Back to Home</span>
        </button>

        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="inline-block w-28 h-28 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl mb-8 overflow-hidden">
            <Image
              src="/logo.png"
              alt="Logo"
              width={112}
              height={112}
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white text-center leading-tight tracking-tighter">
            {title.split(' ').map((word, i) => (
              word.toLowerCase() === 'policy' || word.toLowerCase() === 'conditions' ? 
              <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 ml-2">{word} </span> : 
              <span key={i}>{word} </span>
            ))}
          </h1>
          <div className="w-24 h-1 bg-brand-primary mt-6 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-12 premium-shadow text-slate-900 leading-relaxed space-y-8 border border-white/20">
          {children}
        </div>

        <GlobalFooter />
      </div>
    </main>
  );
};
