"use client";

import React, { useState } from "react";
import { useLanguage } from "./providers/LanguageProvider";
import { RegistrationData } from "@/lib/types";

type Props = {
  formData: RegistrationData;
  setFormData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
};

export const Step2Payment = ({ formData, setFormData, onBack, onSubmit, isSubmitting }: Props) => {
  const { t, currentLang } = useLanguage();

  const handleSizeSelect = (size: string) => {
    setFormData((prev: RegistrationData) => ({ ...prev, jerseySize: size }));
  };

  const handleJerseyNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: RegistrationData) => ({ ...prev, jerseyNumber: e.target.value }));
  };

  const jerseyName = formData.fullName.trim().split(" ")[0].toUpperCase().substring(0, 10);

  return (
    <div id="step2" className="animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
          <i className="fa-solid fa-file-invoice-dollar text-3xl text-blue-600"></i>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{t("step2Title")}</h2>
        <p className="text-slate-500">{t("step2Desc")}</p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-slate-200 mb-8 shadow-sm flex items-start gap-5">
        <div className="shrink-0">
          <img
            src={formData.photoUrl || "https://via.placeholder.com/150?text=No+Img"}
            className="w-24 h-24 rounded-lg object-cover bg-slate-100 border border-slate-200 shadow-sm"
            alt="Player Photo"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-slate-900 leading-tight truncate">{formData.fullName || "Player Name"}</h3>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            <span>{t("sumAgeLabel")}</span>: <span className="text-slate-700">{formData.age || "-"} {currentLang === "en" ? "Years" : "বছর"}</span>
          </p>

          <div className="mt-2 pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500 uppercase tracking-wide font-bold">{t("sumBatDetailsLabel")}</p>
            <div className="text-sm text-slate-800 font-medium">
              <span>{formData.role || "-"}</span> • <span className="text-xs text-slate-600">{formData.battingStyle} / {formData.bowlingStyle}</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-2 flex items-center">
            <i className="fa-solid fa-phone mr-1.5 text-slate-300"></i> <span>{formData.mobile || "-"}</span>
          </p>
        </div>
      </div>

      {/* Premium Kit Section */}
      <div className="bg-slate-900 rounded-2xl p-6 mb-8 relative overflow-hidden shadow-2xl border border-slate-700">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-20"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-yellow-500 rounded-full blur-[80px] opacity-10"></div>

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-900 text-xs px-2 py-1 rounded font-bold mr-3">
              {t("jerseyTitle")}
            </span>
          </h3>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-slate-800/50 rounded-xl border border-slate-700 p-4 flex flex-col items-center justify-center relative group">
              <div className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mb-2">{t("jerseySeason")}</div>
              <div className="relative w-32 h-32 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                <i className="fa-solid fa-shirt text-[8rem] text-[#0078BC] drop-shadow-2xl"></i>
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                  <span className="text-[#FF9933] font-bold text-[10px] uppercase tracking-wider">{jerseyName || "PLAYER"}</span>
                  <span className="text-[#FF9933] font-black text-3xl -mt-1" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
                    {formData.jerseyNumber || "10"}
                  </span>
                </div>
                <div className="absolute top-8 left-8 text-yellow-400 text-xs">
                  <i className="fa-solid fa-crown"></i>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t("jerseyNumLabel")}</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="999"
                    value={formData.jerseyNumber}
                    onChange={handleJerseyNumberChange}
                    className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-bold tracking-wider"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t("jerseySizeLabel")}</label>
                <div className="grid grid-cols-5 gap-2">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeSelect(size)}
                      className={`p-2 rounded-lg text-xs font-bold transition-all transform ${
                        formData.jerseySize === size
                          ? "bg-[#0078BC] border border-[#0078BC] text-white shadow-lg shadow-[#0078BC]/50 scale-105"
                          : "bg-slate-800 border border-slate-600 text-slate-400 hover:border-slate-500"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="flex items-center justify-between text-sm text-slate-600 bg-blue-50 p-5 rounded-lg border border-blue-100 mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded shadow-sm">
            <i className="fa-solid fa-tag text-blue-600"></i>
          </div>
          <span className="font-medium">{t("feeLabel")}</span>
        </div>
        <span className="text-2xl font-bold text-blue-700">₹100.00</span>
      </div>

      {/* Actions */}
      <form onSubmit={onSubmit}>
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="w-1/3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-4 rounded-xl shadow-sm transition"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i> <span>{t("btnBack2")}</span>
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="spinner mr-2"></div> Processing...
              </>
            ) : (
              <>
                <span>{t("btnPay")}</span>
                <i className="fa-solid fa-lock ml-1 text-xs opacity-75"></i>
              </>
            )}
          </button>
        </div>
      </form>

      <p className="text-center text-xs text-slate-400 mt-4">
        <i className="fa-solid fa-shield-halved mr-1"></i> <span>{t("securePayText")}</span>
      </p>

      {/* WhatsApp Support Section */}
      <div className="mt-8 border-t border-slate-100 pt-6 text-center">
        <p className="text-slate-500 text-sm font-medium mb-3">
          {t("helpTitle")} <span className="font-normal text-slate-400">(রেজিস্ট্রেশনে সাহায্য লাগবে?)</span>
        </p>
        <a
          href="https://wa.me/919907434605"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 px-5 py-2.5 rounded-full transition-colors font-bold text-sm border border-[#25D366]/20 group"
        >
          <i className="fa-brands fa-whatsapp text-xl group-hover:scale-110 transition-transform"></i>
          <span>{t("btnChat")}</span>
        </a>
      </div>
    </div>
  );
};
