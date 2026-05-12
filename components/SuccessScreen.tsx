"use client";

import React from "react";
import { RegistrationData } from "@/lib/types";
import Image from "next/image";

type Props = {
  formData: RegistrationData;
  paymentId: string;
  onClose: () => void;
};

export const SuccessScreen = ({ formData, paymentId, onClose }: Props) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto py-10 animate-fade-in px-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 receipt-content">
        {/* Success Header */}
        <div className="bg-emerald-500 p-8 text-center text-white relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
              <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="white" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </div>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
            <i className="fa-solid fa-check text-4xl text-white"></i>
          </div>
          <h2 className="text-3xl font-black tracking-tight uppercase">Registration Confirmed!</h2>
          <p className="text-emerald-100 font-medium mt-1 italic">Welcome to the JUGORE TRIPLE L - Season 2</p>
        </div>

        {/* Receipt Body */}
        <div className="p-8 md:p-10 space-y-8">
          <div className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-slate-100">
             <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl rotate-3 transform hover:rotate-0 transition-transform duration-500 shrink-0">
                <Image 
                  src={formData.photoUrl} 
                  alt="Player" 
                  width={128} 
                  height={128} 
                  className="w-full h-full object-cover" 
                  unoptimized
                />
             </div>
             <div className="text-center md:text-left flex-1">
               <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Official Player Card</div>
               <h3 className="text-3xl font-black text-slate-900 leading-tight">{formData.fullName.toUpperCase()}</h3>
               <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2">
                 <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter border border-slate-200">
                   {formData.role}
                 </span>
                 <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter">
                   Jersey #{formData.jerseyNumber}
                 </span>
               </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Transaction ID</label>
                <div className="font-mono text-sm text-slate-800 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 break-all">
                  {paymentId}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Payment Date</label>
                <div className="text-sm font-bold text-slate-800">
                  {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>

            <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-blue-800 font-bold uppercase tracking-wide">
                <span>Amount Paid</span>
                <i className="fa-solid fa-shield-check"></i>
              </div>
              <div className="text-4xl font-black text-blue-700 mt-2">₹100.00</div>
              <div className="text-[10px] text-blue-500 font-medium mt-2">Verified via Razorpay</div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl p-5 border border-amber-100 flex items-start gap-4">
            <i className="fa-solid fa-circle-info text-amber-500 text-xl mt-1"></i>
            <div className="text-xs text-amber-900 leading-relaxed">
              <p className="font-bold mb-1">What&apos;s Next?</p>
              Your registration is now official. Keep this receipt or take a screenshot for your records. Our team will contact you regarding the auction schedule and team assignments via your registered mobile number: <strong>{formData.mobile}</strong>.
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 no-print">
          <button 
            onClick={handlePrint}
            className="w-full sm:w-auto text-slate-600 hover:text-slate-900 font-bold text-sm flex items-center justify-center gap-2 px-6 py-3 transition"
          >
            <i className="fa-solid fa-print"></i>
            <span>Download / Print Receipt</span>
          </button>
          
          <button 
            onClick={onClose}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 text-sm"
          >
            Back to Home
          </button>
        </div>
      </div>
      
      <p className="text-center text-blue-100/40 text-[10px] mt-8 uppercase tracking-[0.2em] no-print">
        Jugore Triple L • Match Starting 2026
      </p>

      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0 !important; }
          .receipt-content { box-shadow: none !important; border: 1px solid #eee !important; width: 100% !important; max-width: none !important; }
        }
      `}</style>
    </div>
  );
};
