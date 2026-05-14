"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./providers/LanguageProvider";
import { RegistrationData } from "@/lib/types";
import Image from "next/image";

type Props = {
  formData: RegistrationData;
  setFormData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  onContinue: () => void;
  onBack: () => void;
};

export const Step2Kit = ({ formData, setFormData, onContinue, onBack }: Props) => {
  const { t } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: RegistrationData) => ({ ...prev, [name]: value }));
  };

  const handleRoleToggle = (roleValue: string) => {
    setFormData((prev: RegistrationData) => {
      let currentRoles = prev.role ? prev.role.split(", ").filter(r => r) : [];
      if (roleValue === "Wicket Keeper") {
        if (currentRoles.includes("Wicket Keeper")) {
          currentRoles = currentRoles.filter(r => r !== "Wicket Keeper");
        } else {
          currentRoles.push("Wicket Keeper");
        }
      } else {
        currentRoles = currentRoles.filter(r => r === "Wicket Keeper");
        currentRoles.unshift(roleValue);
      }
      return { ...prev, role: currentRoles.join(", ") };
    });
  };

  const handleSizeSelect = (size: string) => {
    setFormData((prev: RegistrationData) => ({ ...prev, jerseySize: size }));
  };

  const jerseyName = formData.fullName.trim().split(" ")[0].toUpperCase().substring(0, 10);

  return (
    <div id="step2" className="space-y-12">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/20">
            <i className="fa-solid fa-shirt text-white text-xl"></i>
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t("kitSelectionTitle")}</h2>
            <p className="text-sm text-slate-500 font-medium">{t("step2Label")}</p>
          </div>
        </div>
      </div>

      {/* Player Stats Section */}
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-black text-slate-700 uppercase tracking-widest mb-4 ml-1">
            {t("labelPrimaryRole")}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "Batsman", label: t("roleBatsman"), image: "/assets/svgs/cricket-helmet.svg" },
              { value: "Bowler", label: t("roleBowler"), image: "/assets/svgs/cricket-ball.svg" },
              { value: "All-Rounder", label: t("roleAllRounder"), image: "/assets/svgs/badge.svg" },
              { value: "Wicket Keeper", label: t("roleKeeper"), image: "/assets/svgs/cricket-wicket.svg" },
            ].map((role) => (
              <motion.div
                key={role.value}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRoleToggle(role.value)}
                className={`cursor-pointer group relative overflow-hidden rounded-3xl p-3 sm:p-6 flex flex-col items-center gap-4 text-center transition-all duration-500 border-2 ${
                  formData.role.includes(role.value)
                    ? "border-brand-accent bg-brand-primary/5 shadow-xl shadow-brand-primary/10"
                    : "border-slate-100 bg-slate-50/50 hover:border-brand-primary"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 overflow-hidden ${
                  formData.role.includes(role.value) ? "bg-brand-primary text-white scale-110 shadow-lg" : "bg-white text-brand-primary group-hover:text-brand-primary"
                }`}>
                  <Image 
                    src={role.image} 
                    alt={role.label} 
                    width={40}
                    height={40}
                    className={`w-10 h-10 object-contain transition-all duration-500 ${
                      formData.role.includes(role.value) ? "brightness-0 invert" : "brightness-0 saturate-100 invert-[0.3] sepia-[1] hue-rotate-[70deg] brightness-[0.8]"
                    }`} 
                  />
                </div>
                <span className={`text-sm font-black uppercase tracking-tight ${
                  formData.role.includes(role.value) ? "text-brand-primary" : "text-slate-600"
                }`}>{role.label}</span>
                {formData.role.includes(role.value) && (
                  <div className="absolute top-3 right-3">
                    <i className="fa-solid fa-circle-check text-brand-primary text-sm"></i>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(formData.role.includes("Batsman") || formData.role.includes("All-Rounder")) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">{t("labelBattingStyle")}</label>
                <select
                  name="battingStyle"
                  value={formData.battingStyle}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-brand-accent bg-white focus:border-brand-primary outline-none font-bold text-slate-800 shadow-sm appearance-none cursor-pointer transition-colors"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23468432\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1.25em' }}
                >
                  <option value="Right Hand">{t("batRight")}</option>
                  <option value="Left Hand">{t("batLeft")}</option>
                </select>
              </motion.div>
            )}

            {(formData.role.includes("Bowler") || formData.role.includes("All-Rounder")) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">{t("labelBowlingStyle")}</label>
                <select
                  name="bowlingStyle"
                  value={formData.bowlingStyle}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-brand-accent bg-white focus:border-brand-primary outline-none font-bold text-slate-800 shadow-sm appearance-none cursor-pointer transition-colors"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23468432\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1.25em' }}
                >
                  <option value="Right Arm Pace">{t("bowlRightPace")}</option>
                  <option value="Right Arm Spin">{t("bowlRightSpin")}</option>
                  <option value="Left Arm Pace">{t("bowlLeftPace")}</option>
                  <option value="Left Arm Spin">{t("bowlLeftSpin")}</option>
                </select>
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </div>

      {/* Jersey Selection Section */}
      <div className="relative group">
        <div className="absolute inset-0 bg-slate-900 rounded-[3rem] transform rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
        <div className="relative bg-slate-900 rounded-[3rem] p-4 sm:p-8 md:p-10 border border-slate-800 overflow-hidden shadow-2xl">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-primary/20 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-brand-secondary/10 rounded-full blur-[80px]"></div>

          <div className="relative z-10 flex flex-col lg:flex-row gap-12">
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-8">
                <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em]">{t("jerseySeason")}</span>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <i className="fa-solid fa-crown text-brand-secondary text-xs"></i>
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Official Kit</span>
                </div>
              </div>

              <motion.div 
                whileHover={{ rotateY: 15, rotateX: -5 }}
                className="relative w-48 h-48 flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-brand-primary/10 rounded-full blur-3xl"></div>
                <i className="fa-solid fa-shirt text-[12rem] text-[#0078BC] drop-shadow-[0_20px_50px_rgba(0,120,188,0.5)]"></i>
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-4 pointer-events-none">
                  <span className="text-white font-black text-[11px] uppercase tracking-widest drop-shadow-md">{jerseyName || "PLAYER"}</span>
                  <span className="text-yellow-400 font-black text-5xl mt-1 tracking-tighter drop-shadow-lg">
                    {formData.jerseyNumber || "10"}
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                  Preferred Jersey Number
                </label>
                <input
                  type="number"
                  name="jerseyNumber"
                  min="0"
                  max="999"
                  value={formData.jerseyNumber}
                  onChange={handleChange}
                  className="w-full bg-white/5 border-2 border-brand-accent text-white rounded-2xl px-6 py-5 focus:border-brand-primary focus:bg-white/10 outline-none font-black text-2xl tracking-widest transition-all duration-300 shadow-inner"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                  Select Your Size
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => handleSizeSelect(size)}
                      className={`h-12 rounded-xl text-xs font-black transition-all duration-300 border-2 ${
                        formData.jerseySize === size
                          ? "bg-brand-primary border-brand-secondary text-white shadow-lg shadow-brand-primary/40"
                          : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-row items-center justify-between pt-10 border-t border-slate-100 gap-2">
        <button
          type="button"
          onClick={onBack}
          className="group flex items-center gap-2 px-4 sm:px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] sm:text-xs text-slate-400 hover:text-brand-primary transition-all duration-300"
        >
          <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-brand-primary/10 transition-colors shrink-0">
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <span className="truncate">{t("btnBack1")}</span>
        </button>
        
        <motion.button
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onContinue}
          className="flex items-center justify-center gap-3 px-6 sm:px-10 py-4 sm:py-5 rounded-[2rem] bg-brand-primary text-white font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs shadow-xl shadow-brand-primary/20 border-2 border-brand-secondary hover:brightness-110 transition-all duration-300 group shrink-0"
        >
          <span>{t("btnContinue")}</span>
          <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
        </motion.button>
      </div>
    </div>
  );
};
