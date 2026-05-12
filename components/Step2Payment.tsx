"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./providers/LanguageProvider";
import { RegistrationData } from "@/lib/types";
import Image from "next/image";

type Props = {
  formData: RegistrationData;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
};

export const Step2Payment = ({ formData, onBack, onSubmit, isSubmitting }: Props) => {
  const { t, currentLang } = useLanguage();



  return (
    <div id="step2" className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center gap-4 border-b border-slate-100 pb-8">
        <div className="w-16 h-16 rounded-[2rem] bg-brand-primary flex items-center justify-center shadow-xl shadow-brand-primary/20 mb-2">
          <i className="fa-solid fa-file-invoice-dollar text-white text-2xl"></i>
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">{t("step2Title")}</h2>
          <p className="text-slate-500 font-medium max-w-sm mx-auto">{t("step2Desc")}</p>
        </div>
      </div>

      {/* Ticket Style Player Summary */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-white rounded-[2.5rem] p-8 border border-slate-100 flex flex-col md:flex-row items-center gap-8 overflow-hidden">
          {/* Holographic Pattern Background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-bl-[5rem] pointer-events-none"></div>
          
          <div className="relative shrink-0">
            <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl relative group/img">
              <Image
                src={formData.photoUrl || "https://via.placeholder.com/150?text=No+Img"}
                width={128}
                height={128}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                alt="Player Photo"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-brand-secondary flex items-center justify-center border-4 border-white shadow-lg">
              <i className="fa-solid fa-star text-white text-xs"></i>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left min-w-0">
            <div className="inline-block px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-widest mb-3 border border-brand-primary/10">
              Season 2 Player
            </div>
            <h3 className="text-3xl font-black text-slate-900 leading-none truncate mb-2">{formData.fullName || "Player Name"}</h3>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <p className="text-sm font-bold text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
                {t("sumAgeLabel")}: <span className="text-slate-900">{formData.age || "-"} {currentLang === "en" ? "Yrs" : "বছর"}</span>
              </p>
              <p className="text-sm font-bold text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-secondary"></span>
                {formData.role || "Role Not Set"}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-dashed border-slate-200 flex items-center justify-center md:justify-start gap-6">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t("sumBatDetailsLabel")}</p>
                <div className="text-sm font-black text-slate-800">
                  {formData.battingStyle} / {formData.bowlingStyle}
                </div>
              </div>
              <div className="hidden sm:block h-8 w-[1px] bg-slate-100"></div>
              <div className="hidden sm:block">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Mobile</p>
                <div className="text-sm font-black text-slate-800">{formData.mobile || "-"}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Payment Information Section */}

      {/* Payment Information Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border-2 border-brand-accent">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center shadow-md border border-slate-100 text-brand-primary">
            <i className="fa-solid fa-receipt text-xl"></i>
          </div>
          <div>
            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t("feeLabel")}</span>
            <span className="text-3xl font-black text-slate-900 tracking-tight">₹100<span className="text-sm font-bold text-slate-400">.00</span></span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
          <i className="fa-solid fa-shield-check text-sm"></i>
          <span className="text-[10px] font-black uppercase tracking-widest">Safe & Secure Payment</span>
        </div>
      </div>

      {/* Final Action Buttons */}
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-1/3 px-8 py-5 rounded-[2rem] bg-white border-2 border-brand-secondary text-slate-500 font-black uppercase tracking-widest text-xs hover:text-brand-primary transition-all duration-300 flex items-center justify-center gap-3"
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span>{t("btnBack2")}</span>
          </button>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-2/3 px-10 py-5 rounded-[2rem] bg-brand-primary text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-brand-primary/20 border-2 border-brand-secondary hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-4 relative overflow-hidden group"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-3">
                <div className="spinner !border-white !w-5 !h-5"></div>
                <span>Processing...</span>
              </div>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                <span>{t("btnPay")}</span>
                <i className="fa-solid fa-lock text-[10px]"></i>
              </>
            )}
          </motion.button>
        </div>

        <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
          <i className="fa-solid fa-shield-halved text-brand-primary/50"></i>
          {t("securePayText")}
        </p>
      </form>

      {/* Refined WhatsApp Support Section */}
      <div className="pt-10 border-t border-slate-100 flex flex-col items-center gap-4">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
          {t("helpTitle")}
        </p>
        <motion.a
          whileHover={{ scale: 1.05 }}
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
  );
};
