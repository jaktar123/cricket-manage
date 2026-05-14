"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Step1Personal } from "./Step1Personal";
import { Step2Kit } from "./Step2Kit";
import { Step2Payment } from "./Step2Payment";
import { PolicyModal } from "./PolicyModal";
import { InfoModal } from "./InfoModal";

import { RegistrationData } from "@/lib/types";
import { GlobalFooter } from "./GlobalFooter";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { useLanguage } from "./providers/LanguageProvider";
import Image from "next/image";



type Props = {
  onBackToIntro: () => void;
};

export const RegistrationForm = ({ onBackToIntro }: Props) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [showPolicy, setShowPolicy] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const [feeStructure, setFeeStructure] = useState<{name: string, amount: number}[]>([]);
  const [isFeeLoading, setIsFeeLoading] = useState(true);
  const [feeError, setFeeError] = useState<string | null>(null);


  useEffect(() => {
    const fetchFee = async () => {
      setIsFeeLoading(true);
      setFeeError(null);
      try {
        const { data, error } = await supabase
          .from('global_settings')
          .select('value')
          .ilike('key', 'registration_fee%')
          .maybeSingle();
        
        if (error) throw error;
        
        if (data) {
          const parsed = JSON.parse(data.value);
          if (Array.isArray(parsed)) {
            setFeeStructure(parsed);
          } else {
            setFeeStructure([{ name: "Registration Fee", amount: parseInt(data.value) || 0 }]);
          }
        } else {
          throw new Error("Registration fee setting not found in database.");
        }
      } catch (err) {
        console.error("Error fetching fee:", err);
        setFeeError("Critical Error: Could not retrieve registration fee. Registration is disabled. Please contact admin.");
      } finally {
        setIsFeeLoading(false);
      }
    };
    fetchFee();
  }, []);


  const totalFeeAmount = feeStructure.reduce((acc, item) => acc + item.amount, 0);

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
      if (!formData.fullName || !formData.age || !formData.mobile || !formData.email || !formData.photoUrl) {
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
      const ageNum = parseInt(formData.age);
      if (isNaN(ageNum) || ageNum < 10 || ageNum > 60) {
        alert("Age must be between 10 and 60.");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert("Please enter a valid email address.");
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
    
    if (totalFeeAmount <= 0) {
      alert("Invalid registration fee. Please refresh the page.");
      return;
    }

    setIsSubmitting(true);


    try {
      // 1. Insert player data into Supabase 'players' table with payment_status: 'PENDING'
      const { data, error } = await supabase
        .from("players")
        .insert([
          {
            full_name: formData.fullName,
            age: parseInt(formData.age),
            mobile: formData.mobile,
            email: formData.email,
            primary_role: formData.role,
            batting_style: formData.battingStyle,
            bowling_style: formData.bowlingStyle,
            jersey_number: parseInt(formData.jerseyNumber),
            jersey_size: formData.jerseySize,
            photo_url: formData.photoUrl,
            payment_status: "PENDING",
            payment_amount: totalFeeAmount,
            expected_amount_paise: totalFeeAmount * 100,
          },

        ])
        .select()
        .single();

      if (error) throw error;

      // 2. Get the returned id from Supabase
      const supabaseId = data.id;

      // 3. Save this id to the browser's localStorage as 'current_registration_id'
      localStorage.setItem('current_registration_id', supabaseId);

      // 4. Construct a Redirect URL to Razorpay Payment Page
      const email = formData.email || "";
      const mobile = formData.mobile || "";
      const uuid = supabaseId;
      const currentFeeInRupees = totalFeeAmount;
      
      const baseUrl = "https://pages.razorpay.com/jugore";
      const redirectUrl = `${baseUrl}?email=${encodeURIComponent(email)}&phone=${encodeURIComponent(mobile)}&player_id=${uuid}&amount=${currentFeeInRupees}&callback_url=https://www.jaktar.pro/success`;

      console.log("Redirect URL:", redirectUrl);

      // 5. Use window.location.href to send the user there
      window.location.href = redirectUrl;



    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert("Something went wrong: " + errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };




  return (
    <div id="registrationContainer" className="min-h-screen relative overflow-hidden py-10 px-4">

      
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Back to Home Button - Above Form */}
        <button
          onClick={onBackToIntro}
          className="mb-8 flex items-center gap-2 text-white/40 hover:text-white transition-all group w-fit"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-all">
            <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
          </div>
          <span className="uppercase tracking-[0.2em] text-[10px] font-black">Back to Home</span>
        </button>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 text-white"
        >
          <div className="inline-block w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-xl mb-6 border border-white/20 shadow-2xl premium-shadow overflow-hidden">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={96}
              height={96}
              className="w-full h-full object-cover" 
            />
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
          className="glass-effect rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] overflow-hidden relative border border-white/40 mb-20"
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
                    feeStructure={feeStructure}
                    totalAmount={totalFeeAmount}
                    isFeeLoading={isFeeLoading}
                    feeError={feeError}
                  />

                </motion.div>
              )}
            </AnimatePresence>

            {/* Global WhatsApp Support Section */}
            <div className="mt-12 pt-10 border-t border-slate-100/50 flex flex-col items-center gap-4">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                {t("helpTitle")}
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/919907434605"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-2xl transition-all duration-300 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-[#25D366]/20 group"
              >
                <i className="fa-brands fa-whatsapp text-lg group-hover:rotate-12 transition-transform"></i>
                <span>{t("btnChat")}</span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Modals */}
        <AnimatePresence>
          {showPolicy && <PolicyModal onClose={() => setShowPolicy(false)} />}
          {showInfo && <InfoModal onClose={() => setShowInfo(false)} />}
        </AnimatePresence>

        <GlobalFooter />
      </div>
    </div>
  );
};
