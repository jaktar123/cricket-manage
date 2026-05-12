"use client";

import React, { useState } from "react";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import { Step1Personal } from "./Step1Personal";
import { Step2Kit } from "./Step2Kit";
import { Step2Payment } from "./Step2Payment";
import { PolicyModal } from "./PolicyModal";
import { InfoModal } from "./InfoModal";
import { SuccessScreen } from "./SuccessScreen";
import { RegistrationData } from "@/lib/types";

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

type Props = {
  onBackToIntro: () => void;
};

export const RegistrationForm = ({ onBackToIntro }: Props) => {
  const [step, setStep] = useState(1);
  const [showPolicy, setShowPolicy] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState("");

  const [formData, setFormData] = useState<RegistrationData>({
    fullName: "",
    age: "",
    mobile: "",
    email: "",
    role: "Batsman",
    battingStyle: "Right Hand",
    bowlingStyle: "Right Arm Pace",
    photoUrl: "",
    jerseyNumber: "10",
    jerseySize: "L",
    rulesAccepted: false,
  });

  const handleContinue = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.age || !formData.mobile || !formData.photoUrl) {
        alert("Please fill all required fields and upload a photo.");
        return;
      }
      if (!formData.rulesAccepted) {
        alert("Please accept the tournament rules to continue.");
        return;
      }
      if (formData.mobile.length !== 10) {
        alert("Mobile number must be exactly 10 digits.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.role) {
        alert("Please select your primary role.");
        return;
      }
      setStep(3);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    if (step === 1) {
      onBackToIntro();
    } else {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/create-order", { method: "POST" });
      const { orderId, error: orderError } = await res.json();

      if (orderError) throw new Error(orderError);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_YOUR_KEY",
        amount: 10000,
        currency: "INR",
        name: "JUGORE TRIPLE L",
        description: "Registration Fee - Season 2",
        order_id: orderId,
        handler: async (response: RazorpayResponse) => {
          try {
            const registerRes = await fetch("/api/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                formData,
                amount: options.amount / 100, // Convert paise to Rupees
              }),
            });

            const { success, error: regError } = await registerRes.json();

            if (regError) throw new Error(regError);

            if (success) {
              setPaymentId(response.razorpay_payment_id);
              setIsSuccess(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            alert("Error verifying payment: " + errorMessage);
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: {
          color: "#2563eb",
        },
      };

      const Razorpay = (window as unknown as { Razorpay: new (options: unknown) => { open: () => void } }).Razorpay;
      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert("Something went wrong: " + errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return <SuccessScreen formData={formData} paymentId={paymentId} onClose={onBackToIntro} />;
  }

  return (
    <div id="registrationContainer" className="min-h-screen relative overflow-hidden py-10 px-4">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      {/* Dynamic Background Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-secondary/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 text-white"
        >
          <div className="inline-block p-4 rounded-3xl bg-white/10 backdrop-blur-xl mb-6 border border-white/20 shadow-2xl premium-shadow">
            <i className="fa-solid fa-baseball-bat-ball text-5xl text-brand-secondary drop-shadow-[0_0_15px_rgba(255,157,35,0.5)]"></i>
          </div>
          <h1 className="text-5xl font-black tracking-tight mb-2 uppercase italic">
            <span className="text-white">JUGORE</span>{" "}
            <span className="text-brand-secondary">TRIPLE L</span>
          </h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-white/30"></div>
            <div className="text-2xl font-black text-brand-secondary tracking-[0.3em]">2026</div>
            <div className="h-[1px] w-12 bg-white/30"></div>
          </div>
          <p className="text-blue-100/80 text-lg font-medium tracking-wide">Single Player Registration Portal</p>
        </motion.div>

        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {/* Consolidated Rules Container (Moved Outside) */}
            <div className="bg-[#FAF9F6] border-2 border-[#EADBC8]/50 rounded-[2.5rem] p-6 space-y-6 shadow-2xl premium-shadow relative overflow-hidden">
              {/* Subtle texture overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              
              {/* Advisory Row */}
              <div className="relative z-10 flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center">
                  <i className="fa-solid fa-circle-info text-lg"></i>
                </div>
                <p className="text-[11px] font-black uppercase tracking-tight leading-tight">
                  Please read all rules and policies carefully before filling the form.
                </p>
              </div>

              {/* Buttons Row */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowInfo(true)}
                  className="p-4 rounded-2xl border-2 border-[#EADBC8] bg-white hover:bg-brand-primary/5 transition-all duration-300 flex items-center gap-4 cursor-pointer group shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shadow-sm group-hover:bg-brand-primary/20 transition-colors">
                    <i className="fa-solid fa-list-check text-brand-primary text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 tracking-tight uppercase text-[10px]">Form Fill-up rules</h4>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Important Guidelines</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowPolicy(true)}
                  className="p-4 rounded-2xl border-2 border-[#EADBC8] bg-white hover:bg-brand-primary/5 transition-all duration-300 flex items-center gap-4 cursor-pointer group shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shadow-sm group-hover:bg-brand-primary/20 transition-colors">
                    <i className="fa-solid fa-shield-halved text-brand-primary text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 tracking-tight uppercase text-[10px]">Auction Rules</h4>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Rules & Conduct</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-effect rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] overflow-hidden relative border border-white/40"
        >
          {/* Progress Bar */}
          <div className="h-1.5 bg-white/10 w-full flex relative z-10">
            <motion.div
              initial={{ width: `${(step / 3) * 100}%` }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="h-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-[length:200%_100%] animate-gradient"
            ></motion.div>
          </div>

          <div className="p-8 md:p-12 relative z-10 pt-16">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Step1Personal
                    formData={formData}
                    setFormData={setFormData}
                    onContinue={handleContinue}
                    onBack={handleBack}
                  />
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Step2Kit
                    formData={formData}
                    setFormData={setFormData}
                    onContinue={handleContinue}
                    onBack={handleBack}
                  />
                </motion.div>
              )}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Step2Payment
                    formData={formData}
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Modals */}
        <AnimatePresence>
          {showPolicy && <PolicyModal onClose={() => setShowPolicy(false)} />}
          {showInfo && <InfoModal onClose={() => setShowInfo(false)} />}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-12 pb-12 px-6 flex flex-col md:flex-row items-center justify-between text-blue-100/60 text-sm">
          <div className="text-center md:text-left font-medium">
            &copy; 2026 Triple L (Season-2). All rights reserved.
          </div>
          <div className="mt-4 md:mt-0 font-bold tracking-widest flex items-center justify-center md:justify-end gap-3 uppercase">
            Developed by <span className="text-yellow-400">JAMIL</span>
            <div className="relative w-10 h-10 flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-600 via-yellow-400 to-yellow-200 rotate-45 rounded-xl shadow-lg border border-white/20 group-hover:rotate-[225deg] transition-all duration-1000 ease-in-out"></div>
              <span className="relative z-10 text-blue-900 font-black text-xs scale-110">JA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
