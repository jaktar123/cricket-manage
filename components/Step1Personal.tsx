"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./providers/LanguageProvider";
import { RegistrationData } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import imageCompression from 'browser-image-compression';
import Image from 'next/image';

type Props = {
  formData: RegistrationData;
  setFormData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  onContinue: () => void;
  onBack: () => void;
};

export const Step1Personal = ({ formData, setFormData, onContinue, onBack }: Props) => {
  const { t, toggleLanguage } = useLanguage();
  const [isUploading, setIsUploading] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: RegistrationData) => ({ ...prev, [name]: value }));
  };



  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        alert("File is too big! Please upload an image smaller than 20MB.");
        return;
      }
      setIsUploading(true);
      try {
        const options = {
          maxSizeMB: 0.1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;
        const { error: uploadError } = await supabase.storage.from('player-photos').upload(filePath, compressedFile);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage.from('player-photos').getPublicUrl(filePath);
        setFormData((prev: RegistrationData) => ({ ...prev, photoUrl: publicUrl }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        alert("Error uploading image: " + errorMessage);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const inputClasses = "w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-brand-accent bg-white text-slate-900 placeholder-slate-400 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all duration-300 font-semibold shadow-sm";
  const labelHeaderClasses = "block text-sm font-black text-slate-700 uppercase tracking-widest mb-3 ml-1";


  const isStep1Valid = !!(
    formData.fullName && 
    formData.age && 
    formData.mobile && 
    formData.photoUrl && 
    formData.rulesAccepted
  );

  return (
    <div id="step1" className="space-y-12">
      {/* Personal Details Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/20">
            <i className="fa-regular fa-id-card text-white text-xl"></i>
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t("personalDetailsTitle")}</h2>
            <p className="text-sm text-slate-500 font-medium">{t("step1Label")}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleLanguage}
          className="self-start sm:self-center px-4 py-2 rounded-xl bg-white border-2 border-brand-accent text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 flex items-center gap-2 text-sm font-black uppercase tracking-widest shadow-sm"
        >
          <i className="fa-solid fa-language text-lg"></i>
          <span>{t("langBtnText")}</span>
        </button>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { name: "fullName", icon: "fa-user", label: t("labelFullName"), placeholder: t("placeholderFullName"), type: "text" },
          { name: "age", icon: "fa-cake-candles", label: t("labelAge"), placeholder: "e.g. 24", type: "number", min: 10, max: 99 },
          { name: "mobile", icon: "fa-mobile-screen", label: t("labelMobile"), placeholder: t("placeholderMobile"), type: "tel", pattern: "[0-9]{10}" },
          { name: "email", icon: "fa-envelope", label: `${t("labelEmailMain")} (Optional)`, placeholder: t("placeholderEmail"), type: "email" },
        ].map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className={labelHeaderClasses}>{field.label}</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <i className={`fa-regular ${field.icon} text-brand-primary transition-colors text-lg`}></i>
              </div>
              <input
                {...field}
                required={field.name !== "email"}
                value={formData[field.name as keyof RegistrationData] as string}
                onChange={handleChange}
                className={inputClasses}
                placeholder={field.placeholder}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Photo Upload Section */}
      <div className="space-y-8 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/20">
            <i className="fa-solid fa-camera text-white text-lg"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-900">{t("photoTitle")}</h3>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 bg-white p-8 rounded-[2.5rem] border-2 border-brand-accent">
          <div className="relative group">
            <div className={`w-48 h-48 rounded-[3rem] border-4 ${formData.photoUrl ? 'border-brand-primary' : 'border-slate-100'} shadow-2xl bg-slate-50 flex items-center justify-center overflow-hidden relative transition-all duration-500 group-hover:scale-105`}>
              {formData.photoUrl ? (
                <Image src={formData.photoUrl} alt="Preview" width={192} height={192} className="w-full h-full object-cover" unoptimized />
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-300">
                  <i className="fa-solid fa-user text-6xl text-brand-primary/20"></i>
                  <span className="text-[10px] font-black uppercase tracking-widest">No Image</span>
                </div>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                  <div className="spinner !border-brand-primary !w-8 !h-8"></div>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 w-full space-y-4">
            <div>
              <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-3">{t("photoLabel")}</label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  required={!formData.photoUrl}
                  onChange={handlePhotoChange}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="flex items-center justify-center gap-3 w-full px-8 py-5 rounded-2xl bg-white border-2 border-brand-accent text-brand-primary font-black uppercase tracking-widest text-xs hover:bg-brand-primary hover:text-white transition-all duration-300 cursor-pointer shadow-sm group"
                >
                  <i className="fa-solid fa-cloud-arrow-up text-lg"></i>
                  <span>{formData.photoUrl ? "Change Photo" : "Select Photo"}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tournament Rules Section */}
      <div className="p-8 rounded-[2rem] bg-[#FFF9F0] border-2 border-[#F3E5AB] shadow-[inset_0_2px_4px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/20">
            <i className="fa-solid fa-gavel text-white text-lg"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">{t("rulesTitle")}</h3>
        </div>
        
        <ul className="space-y-1">
          {[t("rule1"), t("rule2"), t("rule3"), t("rule4"), t("rule5"), t("rule6"), t("rule7"), t("rule8")].map((rule, i) => (
            <motion.li 
              key={i} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 p-1 rounded-xl hover:bg-white/60 transition-colors"
            >
              <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(var(--brand-primary-rgb),0.5)]"></div>
              <span dangerouslySetInnerHTML={{ __html: rule }} className="text-sm font-medium text-slate-700 leading-tight"></span>
            </motion.li>
          ))}
        </ul>
        
        <div className="mt-8 pt-6 border-t border-[#EADBC8]/40">
          <label className="flex items-center gap-4 cursor-pointer group p-2">
            <div className="relative">
              <input
                type="checkbox"
                required
                id="rulesConsent"
                className="peer sr-only"
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  e.target.setCustomValidity(isChecked ? "" : "Please accept the rules to continue");
                  // Trigger a re-render to ensure peer classes work or use state
                  setFormData(prev => ({ ...prev, rulesAccepted: isChecked }));
                }}
              />
                <div className={`w-7 h-7 rounded-xl border-2 transition-all duration-300 flex items-center justify-center shadow-sm ${
                formData.rulesAccepted 
                  ? "bg-brand-primary border-brand-primary shadow-brand-primary/20" 
                  : "bg-white border-[#EADBC8]"
              }`}>
                <i className={`fa-solid fa-check text-white text-xs transition-all duration-300 ${
                  formData.rulesAccepted ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}></i>
              </div>
            </div>
            <span className="font-bold text-slate-900 group-hover:text-brand-primary transition-colors uppercase tracking-widest text-xs">
              {t("consentLabel")}
            </span>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-10 border-t border-slate-100">
        <button
          type="button"
          onClick={onBack}
          className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs text-slate-400 hover:text-brand-primary transition-all duration-300"
        >
          <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-brand-primary/10 transition-colors">
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <span>{t("btnBack1")}</span>
        </button>
        
        <motion.button
          whileHover={isStep1Valid ? { scale: 1.05, x: 5 } : {}}
          whileTap={isStep1Valid ? { scale: 0.95 } : {}}
          type="button"
          disabled={!isStep1Valid}
          onClick={onContinue}
          className={`flex items-center gap-4 px-10 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 group ${
            isStep1Valid 
              ? "bg-brand-primary text-white shadow-xl shadow-brand-primary/20 border-2 border-brand-secondary hover:brightness-110" 
              : "bg-slate-200 text-slate-400 border-2 border-slate-300 cursor-not-allowed opacity-70"
          }`}
        >
          <span>{t("btnContinue")}</span>
          <i className={`fa-solid fa-arrow-right ${isStep1Valid ? "group-hover:translate-x-1" : ""} transition-transform`}></i>
        </motion.button>
      </div>
    </div>
  );
};
