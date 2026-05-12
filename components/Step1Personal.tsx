"use client";

import React, { useEffect, useRef } from "react";
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
  showPolicy: () => void;
  showInfo: () => void;
};

export const Step1Personal = ({ formData, setFormData, onContinue, onBack, showPolicy, showInfo }: Props) => {
  const { t, toggleLanguage } = useLanguage();
  const [isUploading, setIsUploading] = React.useState(false);
  const roleRefs = useRef<(HTMLLabelElement | null)[]>([]);

  useEffect(() => {
    // No observer needed, animation class added directly
  }, []);

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
        // For Batsman, Bowler, All-Rounder - they are mutually exclusive in the "Main Role" group
        // First remove any existing main role (anything that isn't Wicket Keeper)
        currentRoles = currentRoles.filter(r => r === "Wicket Keeper");
        // Add the new main role
        currentRoles.unshift(roleValue);
      }
      
      return { ...prev, role: currentRoles.join(", ") };
    });
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Allow up to 20MB for initial upload, but compress it below 100kb
      if (file.size > 20 * 1024 * 1024) {
        alert("File is too big! Please upload an image smaller than 20MB.");
        return;
      }

      setIsUploading(true);
      try {
        // Compression options
        const options = {
          maxSizeMB: 0.1, // Target size 100kb
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('player-photos')
          .upload(filePath, compressedFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('player-photos')
          .getPublicUrl(filePath);

        setFormData((prev: RegistrationData) => ({ ...prev, photoUrl: publicUrl }));
      } catch (error: any) {
        alert("Error uploading image: " + error.message);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div id="step1" className="space-y-8">
      {/* Personal Details */}
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 border-b-2 border-slate-200 pb-3 mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <i className="fa-regular fa-id-card mr-2 text-blue-600"></i>
            <span>{t("personalDetailsTitle")}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLanguage}
              className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full border border-blue-200 transition flex items-center gap-2 shadow-sm"
            >
              <i className="fa-solid fa-language text-lg"></i>
              <span className="font-bold">{t("langBtnText")}</span>
            </button>
            <span className="text-xs font-sans font-normal bg-blue-100 text-blue-800 px-2 py-1 rounded align-middle hidden sm:inline-block">
              {t("step1Label")}
            </span>
          </div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">{t("labelFullName")}</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className="fa-regular fa-user text-slate-400 group-focus-within:text-blue-600 transition-colors text-lg"></i>
              </div>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder={t("placeholderFullName")}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:ring-0 outline-none transition-all duration-300 font-medium shadow-sm hover:border-blue-200"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">{t("labelAge")}</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className="fa-solid fa-cake-candles text-slate-400 group-focus-within:text-blue-600 transition-colors text-lg"></i>
              </div>
              <input
                type="number"
                name="age"
                required
                min="10"
                max="99"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g. 24"
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:ring-0 outline-none transition-all duration-300 font-medium shadow-sm hover:border-blue-200"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">{t("labelMobile")}</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className="fa-solid fa-mobile-screen text-slate-400 group-focus-within:text-blue-600 transition-colors text-lg"></i>
              </div>
              <input
                type="tel"
                name="mobile"
                required
                minLength={10}
                maxLength={10}
                pattern="[0-9]{10}"
                value={formData.mobile}
                onChange={handleChange}
                placeholder={t("placeholderMobile")}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:ring-0 outline-none transition-all duration-300 font-medium shadow-sm hover:border-blue-200"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
              <span>{t("labelEmailMain")}</span> <span className="text-slate-400 font-normal text-xs">{t("labelEmailOpt")}</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className="fa-regular fa-envelope text-slate-400 group-focus-within:text-blue-600 transition-colors text-lg"></i>
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("placeholderEmail")}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:ring-0 outline-none transition-all duration-300 font-medium shadow-sm hover:border-blue-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Player Stats */}
      <div className="mt-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 border-b-2 border-slate-200 pb-3 mb-6 flex items-center">
          <i className="fa-solid fa-trophy mr-2 text-blue-600"></i> <span className="ml-2">{t("playerStatsTitle")}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-3">{t("labelPrimaryRole")}</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "Batsman", label: t("roleBatsman"), icon: "fa-person-running" },
                { value: "Bowler", label: t("roleBowler"), icon: "fa-baseball" },
                { value: "All-Rounder", label: t("roleAllRounder"), icon: "fa-medal" },
                { value: "Wicket Keeper", label: t("roleKeeper"), icon: "fa-hands" },
              ].map((role, index) => (
                <div
                  key={role.value}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleRoleToggle(role.value)}
                  className={`cursor-pointer group animate-fall-in border rounded-xl p-5 flex flex-col items-center justify-center gap-3 text-center hover:bg-slate-50 transition-all transform hover:-translate-y-1 hover:shadow-lg ${
                    formData.role.includes(role.value) ? "border-blue-600 bg-blue-50 text-blue-600 shadow-md shadow-blue-100" : "border-slate-200"
                  }`}
                >
                  <i className={`fa-solid ${role.icon} text-2xl ${formData.role.includes(role.value) ? "text-blue-600" : "text-slate-500"}`}></i>
                  <span className="text-sm font-bold tracking-tight">{role.label}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Batting Style - Show if Batsman or All-Rounder */}
          {(formData.role.includes("Batsman") || formData.role.includes("All-Rounder")) && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">{t("labelBattingStyle")}</label>
              <select
                name="battingStyle"
                value={formData.battingStyle}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:border-blue-500 outline-none"
              >
                <option value="Right Hand">{t("batRight")}</option>
                <option value="Left Hand">{t("batLeft")}</option>
              </select>
            </div>
          )}

          {/* Bowling Style - Show if Bowler or All-Rounder */}
          {(formData.role.includes("Bowler") || formData.role.includes("All-Rounder")) && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">{t("labelBowlingStyle")}</label>
              <select
                name="bowlingStyle"
                value={formData.bowlingStyle}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:border-blue-500 outline-none"
              >
                <option value="Right Arm Pace">{t("bowlRightPace")}</option>
                <option value="Right Arm Spin">{t("bowlRightSpin")}</option>
                <option value="Left Arm Pace">{t("bowlLeftPace")}</option>
                <option value="Left Arm Spin">{t("bowlLeftSpin")}</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Basic Rules */}
      <div className="mt-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 border-b-2 border-slate-200 pb-3 mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <i className="fa-solid fa-gavel mr-2 text-blue-600"></i>
            <span className="ml-2">{t("rulesTitle")}</span>
          </div>
          <button
            type="button"
            onClick={toggleLanguage}
            className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full border border-blue-200 transition flex items-center gap-2 shadow-sm"
          >
            <i className="fa-solid fa-language text-lg"></i>
            <span className="font-bold">{t("langBtnText")}</span>
          </button>
        </h2>

        <div className="bg-red-50 border border-red-100 rounded-xl p-6 text-sm text-slate-800 space-y-4">
          <ul className="list-none space-y-3">
            {[t("rule1"), t("rule2"), t("rule3"), t("rule4"), t("rule5")].map((rule, i) => (
              <li key={i} className="flex items-start gap-2">
                <i className="fa-solid fa-circle-exclamation text-red-500 text-lg mt-0.5"></i>
                <span dangerouslySetInnerHTML={{ __html: rule }} className="leading-relaxed"></span>
              </li>
            ))}
          </ul>
          <div className="pt-2 border-t border-red-100 flex items-center gap-3 mt-2">
            <input
              type="checkbox"
              required
              id="rulesConsent"
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="rulesConsent" className="font-bold text-slate-900 cursor-pointer select-none">
              {t("consentLabel")}
            </label>
          </div>
        </div>
      </div>

      {/* Info & Policy Links */}
      <div className="space-y-4 mt-8">
        <div
          onClick={showInfo}
          className="bg-purple-50/50 border border-purple-100 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:bg-purple-50 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg shadow-sm border border-purple-100">
              <i className="fa-solid fa-list-check text-purple-600 text-xl"></i>
            </div>
            <div>
              <h3 className="font-bold text-slate-800">{t("infoLinkText")}</h3>
              <p className="text-xs text-slate-500">{t("infoLinkDesc")}</p>
            </div>
          </div>
          <button type="button" className="w-full sm:w-auto text-sm bg-white border-2 border-purple-200 text-purple-600 hover:bg-purple-600 hover:text-white px-5 py-2.5 rounded-xl transition-colors font-bold shadow-sm">
            {t("infoBtnView")}
          </button>
        </div>

        <div
          onClick={showPolicy}
          className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:bg-blue-50 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg shadow-sm border border-blue-100">
              <i className="fa-solid fa-gavel text-blue-600 text-xl"></i>
            </div>
            <div>
              <h3 className="font-bold text-slate-800">{t("policyLinkText")}</h3>
              <p className="text-xs text-slate-500">{t("policyLinkDesc")}</p>
            </div>
          </div>
          <button type="button" className="w-full sm:w-auto text-sm bg-white border-2 border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white px-5 py-2.5 rounded-xl transition-colors font-bold shadow-sm">
            {t("policyBtnView")}
          </button>
        </div>
      </div>

      {/* Photo Upload */}
      <div className="mt-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 border-b-2 border-slate-200 pb-3 mb-6 flex items-center">
          <i className="fa-solid fa-camera mr-2 text-blue-600"></i> <span className="ml-2">{t("photoTitle")}</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-48 h-48 rounded-full border-4 border-slate-100 shadow-inner bg-slate-50 flex items-center justify-center overflow-hidden relative group shrink-0">
            {formData.photoUrl ? (
                <Image 
                  src={formData.photoUrl} 
                  alt="Preview" 
                  width={192} 
                  height={192} 
                  className="w-full h-full object-cover" 
                  unoptimized
                />
            ) : (
              <div className="text-slate-300 text-6xl">
                <i className="fa-solid fa-user"></i>
              </div>
            )}
          </div>

          <div className="flex-1 w-full">
            <label className="block text-sm font-semibold text-slate-700 mb-2">{t("photoLabel")}</label>
            <input
              type="file"
              accept="image/*"
              required={!formData.photoUrl}
              onChange={handlePhotoChange}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition cursor-pointer border border-slate-200 rounded-lg"
            />
            <p className="text-xs text-slate-400 mt-2">{t("photoHelp")}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-slate-100 mt-8 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-slate-500 hover:text-slate-800 font-bold py-3 px-6 rounded-xl transition flex items-center gap-2"
        >
          <i className="fa-solid fa-arrow-left"></i> <span>{t("btnBack1")}</span>
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 flex items-center gap-2"
        >
          <span>{t("btnContinue")}</span>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};
