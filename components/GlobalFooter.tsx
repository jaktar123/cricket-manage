"use client";

import React from "react";
import { useRouter } from "next/navigation";

export const GlobalFooter = () => {
  const router = useRouter();

  return (
    <div className="relative z-20 pb-12 mt-auto w-full px-4">
      <div className="max-w-4xl mx-auto px-4 py-8 bg-white/[0.03] backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-2xl flex flex-col items-center gap-8">
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          <button 
            onClick={() => router.push('/terms-and-conditions')}
            className="text-white/70 hover:text-yellow-400 transition-all uppercase tracking-[0.2em] font-black text-[11px] border-b border-transparent hover:border-yellow-400/50 pb-1"
          >
            Terms & Conditions
          </button>
          <button 
            onClick={() => router.push('/privacy-policy')}
            className="text-white/70 hover:text-yellow-400 transition-all uppercase tracking-[0.2em] font-black text-[11px] border-b border-transparent hover:border-yellow-400/50 pb-1"
          >
            Privacy Policy
          </button>
          <button 
            onClick={() => router.push('/refund-policy')}
            className="text-white/70 hover:text-yellow-400 transition-all uppercase tracking-[0.2em] font-black text-[11px] border-b border-transparent hover:border-yellow-400/50 pb-1"
          >
            Refund Policy
          </button>
          <button 
            onClick={() => router.push('/contact-us')}
            className="text-white/70 hover:text-yellow-400 transition-all uppercase tracking-[0.2em] font-black text-[11px] border-b border-transparent hover:border-yellow-400/50 pb-1"
          >
            Contact Us
          </button>
        </div>

        <div className="flex flex-col items-center gap-6 w-full">
          <div className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-black text-center">
            © 2026 JUGORE TRIPLE L. ALL RIGHTS RESERVED.
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 pt-6 border-t border-white/5">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="text-white/10 text-[9px] uppercase tracking-[0.3em] font-bold">Powered by Triple L</div>
              <button 
                onClick={() => router.push('/admin')}
                className="text-yellow-500/60 text-[12px] underline hover:text-yellow-400 transition-all uppercase tracking-[0.2em] font-black"
              >
                Admin Panel
              </button>
            </div>

            <div className="font-black tracking-widest flex items-center gap-4 uppercase text-[11px] text-white/40">
              Developed by <span className="text-yellow-400">JAMIL</span>
              
              {/* Realistic Flipping JA Coin */}
              <CoinToss />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CoinToss = () => {
  const [isTossing, setIsTossing] = React.useState(false);
  const [rotation, setRotation] = React.useState(0);

  const handleToss = () => {
    if (isTossing) return;
    
    setIsTossing(true);
    const extraSpins = 8 + Math.floor(Math.random() * 8); // 8-16 half spins
    const isHead = Math.random() > 0.5;
    const newRotation = rotation + (extraSpins * 180) + (isHead ? 0 : 180);
    
    setRotation(newRotation);
    
    setTimeout(() => {
      setIsTossing(false);
    }, 1200);
  };

  return (
    <div 
      onClick={handleToss}
      className="group/coin relative w-12 h-12 [perspective:1000px] cursor-pointer"
    >
      <style jsx>{`
        @keyframes projectileY {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-120px) scale(1.5); }
          100% { transform: translateY(0) scale(1); }
        }
        .animate-projectile-y {
          animation: projectileY 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
      
      {/* Outer Container for Y-axis Projectile */}
      <div className={`w-full h-full ${isTossing ? "animate-projectile-y" : ""}`}>
        {/* Inner Container for Y-rotation Spin */}
        <div 
          className="w-full h-full transition-transform duration-[1200ms] ease-out [transform-style:preserve-3d]"
          style={{ transform: `rotateY(${rotation}deg)` }}
        >
          {/* Front: J */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-yellow-600 via-yellow-400 to-yellow-200 rounded-full shadow-lg border-2 border-white/20 [backface-visibility:hidden]">
            <span className="text-blue-900 font-black text-lg">J</span>
            <div className="absolute inset-1 rounded-full border border-yellow-900/10"></div>
          </div>
          {/* Back: A */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-yellow-200 via-yellow-400 to-yellow-600 rounded-full shadow-lg border-2 border-white/20 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <span className="text-blue-900 font-black text-lg">A</span>
            <div className="absolute inset-1 rounded-full border border-yellow-900/10"></div>
          </div>
        </div>
      </div>
      
      {/* Dynamic Shadow */}
      <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-black/40 rounded-full blur-md transition-all duration-[600ms] ${isTossing ? "scale-[2.5] opacity-5" : "scale-100 opacity-100"}`}></div>
    </div>
  );
};
