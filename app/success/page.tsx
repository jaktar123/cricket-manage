"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { GlobalFooter } from "@/components/GlobalFooter";
import Image from "next/image";

interface Player {
  id: string;
  full_name: string;
  photo_url: string;
  primary_role: string;
  age: number;
  jersey_number: number;
  jersey_size: string;
  payment_amount: number;
  payment_status: string;
  created_at: string;
}

export default function SuccessPage() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"PENDING" | "PAID" | "ERROR">("PENDING");

  useEffect(() => {
    // 1. Force Domain Consistency (Redirect to www if on apex domain)
    if (typeof window !== "undefined" && window.location.hostname === "jaktar.pro") {
      window.location.href = "https://www.jaktar.pro" + window.location.pathname + window.location.search;
      return;
    }

    const registrationId = localStorage.getItem("current_registration_id");

    if (!registrationId) {
      // If no ID, redirect after a short delay
      const timer = setTimeout(() => {
        window.location.href = "/";
      }, 3000);
      return () => clearTimeout(timer);
    }

    const fetchPlayerData = async () => {
      try {
        const { data, error } = await supabase
          .from("players")
          .select("*")
          .eq("id", registrationId)
          .single();

        if (error || !data) {
          console.error("Error fetching player:", error);
          setStatus("ERROR");
          setLoading(false);
          return;
        }

        setPlayer(data);
        setStatus(data.payment_status === "Success" ? "PAID" : "PENDING");
        setLoading(false);

        // If still pending, start polling
        if (data.payment_status === "PENDING") {
          const interval = setInterval(async () => {
            const { data: updatedData } = await supabase
              .from("players")
              .select("payment_status")
              .eq("id", registrationId)
              .single();

            if (updatedData?.payment_status === "Success") {
              setStatus("PAID");
              setPlayer((prev: Player | null) => prev ? ({ ...prev, payment_status: "Success" }) : null);
              clearInterval(interval);
            }
          }, 3000);


          return () => clearInterval(interval);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setStatus("ERROR");
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-black">Loading your receipt...</p>
      </div>
    );
  }

  if (status === "ERROR") {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-white p-4 text-center">
        <div className="w-20 h-20 bg-red-500/20 rounded-3xl flex items-center justify-center mb-8 border border-red-500/30">
            <i className="fa-solid fa-triangle-exclamation text-3xl text-red-500"></i>
        </div>
        <h1 className="text-3xl font-black mb-2 italic uppercase">Registration Not Found</h1>
        <p className="text-white/40 mb-8 max-w-xs">We couldn't find a registration record for you. Please contact support if you have already paid.</p>
        <button 
          onClick={() => window.location.href = "/"}
          className="px-10 py-4 bg-brand-primary rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-brand-primary/20"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] py-12 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-primary rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-secondary rounded-full blur-[140px]"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {status === "PENDING" ? (
            <motion.div
              key="pending"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-effect rounded-[3rem] p-16 text-center text-white border border-white/20 shadow-2xl premium-shadow"
            >
              <div className="w-24 h-24 bg-amber-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-10 border-2 border-amber-500/20 relative">
                <div className="absolute inset-0 rounded-[2rem] border-4 border-amber-500 border-t-transparent animate-spin"></div>
                <i className="fa-solid fa-hourglass-half text-3xl text-amber-500"></i>
              </div>
              <h1 className="text-4xl font-black mb-4 uppercase italic tracking-tight">Processing Payment</h1>
              <p className="text-blue-100/60 font-medium max-w-sm mx-auto leading-relaxed">
                Your registration is secured. We are just waiting for the final confirmation from Razorpay. This page will update automatically.
              </p>
              <div className="mt-12 flex items-center justify-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                <div className="w-1 h-1 rounded-full bg-white/20 animate-ping"></div>
                Checking status every 3 seconds
              </div>
            </motion.div>
          ) : player && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-10 print:m-0"
            >
              {/* Success Banner */}
              <div className="text-center text-white mb-6 print:hidden">
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="w-24 h-24 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-[0_20px_50px_rgba(16,185,129,0.4)] border-4 border-white/20"
                >
                  <i className="fa-solid fa-check text-4xl text-white"></i>
                </motion.div>
                <h1 className="text-5xl md:text-6xl font-black mb-3 uppercase italic tracking-tighter leading-none">Registration<br/>Successful!</h1>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-black uppercase tracking-[0.2em] text-[10px]">
                    <i className="fa-solid fa-shield-check"></i>
                    Payment Verified
                </div>
              </div>

              {/* Receipt Card */}
              <div id="receipt-card" className="bg-white rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[8px] border-white/10 print:border-none print:shadow-none relative">
                {/* Decorative cutouts for ticket look */}
                <div className="absolute top-1/2 -left-4 w-8 h-8 bg-[#0f172a] rounded-full print:hidden"></div>
                <div className="absolute top-1/2 -right-4 w-8 h-8 bg-[#0f172a] rounded-full print:hidden"></div>

                {/* Receipt Header */}
                <div className="bg-slate-900 p-10 text-white flex flex-col sm:flex-row justify-between items-center gap-6 border-b-4 border-brand-secondary">
                  <div className="text-center sm:text-left">
                    <h2 className="text-3xl font-black uppercase italic tracking-tighter">JUGORE <span className="text-brand-secondary">TRIPLE L</span></h2>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mt-2">Official Tournament Receipt - Season 2</p>
                  </div>
                  <div className="text-center sm:text-right">
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Receipt ID</p>
                    <p className="font-black text-lg font-mono text-brand-secondary">#{player.id.slice(0, 8).toUpperCase()}</p>
                  </div>
                </div>

                {/* Player Info Section */}
                <div className="p-10 md:p-12">
                  <div className="flex flex-col md:flex-row gap-10 items-center md:items-start border-b-2 border-dashed border-slate-100 pb-12 mb-10">
                    <div className="relative">
                        <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-8 border-slate-50 shadow-2xl shrink-0 rotate-[-2deg]">
                            <Image src={player.photo_url} alt={player.full_name} width={160} height={160} className="w-full h-full object-cover" unoptimized />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-brand-secondary rounded-2xl flex items-center justify-center text-white shadow-xl border-4 border-white rotate-[10deg]">
                            <i className="fa-solid fa-star text-sm"></i>
                        </div>
                    </div>
                    
                    <div className="flex-1 text-center md:text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-widest mb-4 border border-brand-primary/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></span>
                        Confirmed Player
                      </div>
                      <h3 className="text-4xl font-black text-slate-900 tracking-tight mb-6 leading-none">{player.full_name}</h3>
                      
                      <div className="grid grid-cols-2 gap-y-6 gap-x-12 text-sm">
                        <div className="space-y-1">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Primary Role</p>
                          <p className="font-black text-slate-800 text-base">{player.primary_role}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Age</p>
                          <p className="font-black text-slate-800 text-base">{player.age} Years</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Jersey No.</p>
                          <p className="font-black text-slate-800 text-base">#{player.jersey_number}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Jersey Size</p>
                          <p className="font-black text-slate-800 text-base">{player.jersey_size}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="space-y-6 bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Registration Fee</span>
                      <span className="text-slate-900 font-black">₹{player.payment_amount}.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Processing Fee</span>
                      <span className="text-slate-900 font-black">₹0.00</span>
                    </div>
                    <div className="h-[1px] w-full bg-slate-200 border-t border-dashed"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-900 font-black uppercase tracking-[0.2em] text-[11px]">Total Amount Paid</span>
                      <span className="text-4xl font-black text-brand-primary tracking-tighter">₹{player.payment_amount}<span className="text-sm text-slate-400">.00</span></span>
                    </div>
                  </div>

                  {/* Trust Footer */}
                  <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 border-2 border-emerald-500/20 shadow-inner">
                        <i className="fa-solid fa-shield-check text-xl"></i>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Digitally Signed & Secured</p>
                        <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">Transaction ID: {player.id}</p>
                      </div>
                    </div>
                    <div className="text-center md:text-right">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Registration Timestamp</p>
                      <p className="text-sm font-black text-slate-800">{new Date(player.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} at {new Date(player.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="bg-slate-50 px-10 py-6 flex justify-center border-t border-slate-100">
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.4em]">Thank you for registering for Season 2</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 print:hidden">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePrint}
                  className="flex-1 flex items-center justify-center gap-4 px-10 py-6 rounded-[2rem] bg-brand-primary text-white font-black uppercase tracking-[0.2em] text-[11px] shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:brightness-110 transition-all border-2 border-white/20"
                >
                  <i className="fa-solid fa-print text-sm"></i>
                  Print / Save Receipt
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = "/"}
                  className="flex-1 flex items-center justify-center gap-4 px-10 py-6 rounded-[2rem] bg-white/5 text-white font-black uppercase tracking-[0.2em] text-[11px] border-2 border-white/10 hover:bg-white/10 transition-all backdrop-blur-xl"
                >
                  <i className="fa-solid fa-arrow-left text-sm"></i>
                  Back to Dashboard
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="mt-20 print:hidden opacity-50 hover:opacity-100 transition-opacity">
            <GlobalFooter />
        </div>
      </div>
    </div>
  );
}
