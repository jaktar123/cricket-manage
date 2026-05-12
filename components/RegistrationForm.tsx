"use client";

import React, { useState } from "react";
import Script from "next/script";
import { Step1Personal } from "./Step1Personal";
import { Step2Payment } from "./Step2Payment";
import { PolicyModal } from "./PolicyModal";
import { InfoModal } from "./InfoModal";
import { SuccessScreen } from "./SuccessScreen";
import { RegistrationData } from "@/lib/types";

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
  });

  const handleContinue = () => {
    // Basic validation check before moving to step 2
    if (!formData.fullName || !formData.age || !formData.mobile || (!formData.photoUrl)) {
      alert("Please fill all required fields and upload a photo.");
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    if (step === 1) {
      onBackToIntro();
    } else {
      setStep(1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Create Order
      const res = await fetch("/api/create-order", { method: "POST" });
      const { orderId, error: orderError } = await res.json();

      if (orderError) throw new Error(orderError);

      // 2. Initialize Razorpay Options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_YOUR_KEY", // Fallback for dev
        amount: 10000,
        currency: "INR",
        name: "JUGORE TRIPLE L",
        description: "Registration Fee - Season 2",
        order_id: orderId,
        handler: async (response: any) => {
          try {
            // 3. Verify Payment & Register
            const registerRes = await fetch("/api/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                formData,
              }),
            });

            const { success, error: regError } = await registerRes.json();

            if (regError) throw new Error(regError);

            if (success) {
              setPaymentId(response.razorpay_payment_id);
              setIsSuccess(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          } catch (error: any) {
            alert("Error verifying payment: " + error.message);
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

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error("Error submitting form:", error);
      alert("Something went wrong: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return <SuccessScreen formData={formData} paymentId={paymentId} onClose={onBackToIntro} />;
  }

  return (
    <div id="registrationContainer" className="max-w-3xl mx-auto py-10 animate-scramble-pop px-4">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      {/* Header */}
      <div className="text-center mb-10 text-white">
        <div className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-md mb-4 border border-white/20">
          <i className="fa-solid fa-baseball-bat-ball text-4xl text-yellow-300"></i>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">JUGORE TRIPLE L</h1>
        <div className="text-3xl font-extrabold text-yellow-400 mb-2">2026</div>
        <p className="text-blue-100 text-lg">Single Player Registration</p>
      </div>

      <div className="glass-effect rounded-2xl shadow-2xl overflow-hidden relative">
        {/* Background Watermark */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067&auto=format&fit=crop"
            alt="Cricket Watermark"
            className="w-full h-full object-cover opacity-10 grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-blue-900/5 mix-blend-overlay"></div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-slate-100 w-full flex relative z-10">
          <div
            id="progressBar"
            className={`h-full bg-blue-600 transition-all duration-500 ease-in-out ${step === 1 ? "w-1/2" : "w-full"}`}
          ></div>
        </div>

        <div className="p-8 md:p-10 relative z-10">
          {step === 1 ? (
            <Step1Personal
              formData={formData}
              setFormData={setFormData}
              onContinue={handleContinue}
              onBack={handleBack}
              showPolicy={() => setShowPolicy(true)}
              showInfo={() => setShowInfo(true)}
            />
          ) : (
            <Step2Payment
              formData={formData}
              setFormData={setFormData}
              onBack={handleBack}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      {showPolicy && <PolicyModal onClose={() => setShowPolicy(false)} />}
      {showInfo && <InfoModal onClose={() => setShowInfo(false)} />}

      {/* Footer */}
      <div className="mt-8 pb-8 px-4 flex flex-col md:flex-row items-center justify-between text-blue-200 text-sm">
        <div className="text-center md:text-left">&copy; 2026 Triple L (Season-2). All rights reserved.</div>
        <div className="mt-2 md:mt-0 font-medium tracking-wide flex items-center justify-center md:justify-end">
          Created by <span className="text-yellow-400 font-bold ml-1">JAMIL</span>
          <div className="ml-3 relative w-8 h-8 flex items-center justify-center group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-600 via-yellow-400 to-yellow-100 rotate-45 rounded-lg shadow-lg border-2 border-yellow-200 group-hover:rotate-[225deg] transition-all duration-700 ease-in-out"></div>
            <div className="absolute inset-1 bg-yellow-500 rotate-45 rounded opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <span
              className="relative z-10 text-blue-900 font-black text-xs font-serif tracking-tighter scale-110"
              style={{ textShadow: "0 1px 0 rgba(255,255,255,0.4)" }}
            >
              JA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
