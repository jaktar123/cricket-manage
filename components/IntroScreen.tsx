"use client";

import React, { useEffect, useState, useRef } from "react";
import { useLanguage } from "./providers/LanguageProvider";

export const IntroScreen = ({ onStartRegistration }: { onStartRegistration: () => void }) => {
  const { t } = useLanguage();
  const [isBallVisible, setIsBallVisible] = useState(false);
  const [isTitleCracked, setIsTitleCracked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in intro page
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Trigger title hit animation after fade in
      setTimeout(() => {
        setIsBallVisible(true);
        setTimeout(() => {
          setIsTitleCracked(true);
        }, 1500); // Crack when ball hits
        setTimeout(() => {
          setIsBallVisible(false);
        }, 3100); // Hide ball after it flies away
      }, 1000);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="introPage"
      className={`min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[150px] opacity-20"></div>

      {/* Striking Ball Animation */}
      {isBallVisible && <div id="introBall" className="anim-title-ball"></div>}

      <div className="relative z-10 animate-fade-in space-y-8">
        {/* Icon: Trophy */}
        <div className="inline-block p-6 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl mb-4 transform hover:scale-110 transition-transform duration-500">
          <i
            id="introTrophy"
            className="fa-solid fa-trophy text-6xl text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)] animate-trophy-spin"
          ></i>
        </div>

        {/* Title */}
        <div className="relative">
          <h2 className="text-blue-300 tracking-[0.3em] font-bold text-sm md:text-lg mb-2 uppercase">
            Welcome To The
          </h2>
          <h1
            id="mainTitle"
            className={`text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter transition-all duration-100 ${
              isTitleCracked ? "anim-crack-active" : ""
            }`}
          >
            JUGORE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300">
              TRIPLE L
            </span>
          </h1>
          <div className="mt-4 flex items-center justify-center gap-4 text-white/80 font-medium">
            <span className="bg-blue-900/50 px-3 py-1 rounded-full border border-blue-500/30">Season 2</span>
            <span className="bg-blue-900/50 px-3 py-1 rounded-full border border-blue-500/30">2026</span>
          </div>
        </div>

        {/* Sports Quote */}
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-lg md:text-xl text-blue-100 italic leading-relaxed drop-shadow-md">
            &quot;Every champion was once a contender that refused to give up.&quot;
          </p>
          <div className="w-16 h-1 bg-yellow-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* CTA Buttons */}
        <div className="pt-8 flex flex-col items-center gap-4">
          <button
            onClick={onStartRegistration}
            className="group relative inline-flex items-center justify-center px-10 py-5 font-black text-slate-900 transition-all duration-300 bg-gradient-to-br from-white via-slate-50 to-slate-200 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] border border-white/60 w-full sm:w-auto min-w-[300px] overflow-hidden shadow-2xl"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-slate-200/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out skew-x-12"></span>
            <span className="relative text-xl tracking-widest uppercase">Register Now</span>
          </button>

          <button
            onClick={onStartRegistration}
            className="group relative inline-flex items-center justify-center px-10 py-5 font-black text-slate-900 transition-all duration-300 bg-gradient-to-br from-white via-slate-50 to-slate-200 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] border border-white/60 w-full sm:w-auto min-w-[300px] overflow-hidden shadow-2xl"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-slate-200/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out skew-x-12"></span>
            <span className="relative text-xl">রেজিস্ট্রেশন করুন</span>
          </button>

          <p className="mt-4 text-slate-400 text-xs uppercase tracking-widest font-bold">Join the ultimate cricket showdown!</p>
          
          {/* Support Contacts */}
          <div className="mt-8 pt-8 border-t border-white/10 w-full max-w-xl mx-auto">
            <p className="text-blue-300/60 text-[10px] mb-6 uppercase tracking-[0.3em] font-black">Need Help with Registration? Contact Us</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a 
                href="tel:+919907434605" 
                className="flex items-center justify-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-4 rounded-2xl transition-all group backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                  <i className="fa-solid fa-phone text-emerald-400 group-hover:rotate-12 transition-transform"></i>
                </div>
                <div className="text-left">
                  <p className="text-[11px] text-yellow-500 uppercase font-black tracking-[0.2em] mb-0.5">JAMIL</p>
                  <p className="text-white font-black tracking-widest text-sm">9907434605</p>
                </div>
              </a>
              
              <a 
                href="tel:+916294979597" 
                className="flex items-center justify-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-4 rounded-2xl transition-all group backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                  <i className="fa-solid fa-phone text-emerald-400 group-hover:rotate-12 transition-transform"></i>
                </div>
                <div className="text-left">
                  <p className="text-[11px] text-yellow-500 uppercase font-black tracking-[0.2em] mb-0.5">AYATULLAH</p>
                  <p className="text-white font-black tracking-widest text-sm">6294979597</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Quotes */}
        <div className="max-w-3xl mx-auto px-6 mt-6">
          <p className="text-base md:text-lg text-emerald-100/90 leading-relaxed text-center drop-shadow-md">
            &quot;ক্রিকেট শুধু একটা খেলা নয়, এটা আমাদের রক্তে মিশে থাকা আবেগ। ২২ গজের পিচে হার-জিতের চেয়ে বড় হলো শেষ বল পর্যন্ত লড়াই চালিয়ে যাওয়া। নিজের সবটুকু দিয়ে খেলো, কারণ মাঠের ঘাম আর জেদই একদিন তোমায় বিজয়ী করবে।&quot;
          </p>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full opacity-60"></div>
        </div>

        <div className="max-w-3xl mx-auto px-6 mt-8">
          <p className="text-base md:text-lg text-blue-100/90 leading-relaxed text-center drop-shadow-md italic">
            &quot;Cricket is not just a game, it is an emotion mixed in our blood. On the 22-yard pitch, more important than winning or losing is fighting until the last ball. Play with everything you have, because only the sweat and determination on the field will make you a winner one day.&quot;
          </p>
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-4 rounded-full opacity-60"></div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-white/30 text-xs">Powered by Triple L</div>
    </div>
  );
};
