"use client";

import React from "react";
import { useLanguage } from "./providers/LanguageProvider";

export const InfoModal = ({ onClose }: { onClose: () => void }) => {
  const { t, toggleLanguage, currentLang } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="glass-effect rounded-2xl shadow-2xl p-8 md:p-10 relative border border-slate-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 border-b-2 border-slate-200 pb-4 mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <i className="fa-solid fa-trophy mr-3 text-yellow-500"></i>
            <span>{t("infoPageTitle")}</span>
          </div>
          <button
            onClick={toggleLanguage}
            className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full border border-blue-200 transition flex items-center gap-2 shadow-sm"
          >
            <i className="fa-solid fa-language text-lg"></i>
            <span className="font-bold">{t("langBtnText")}</span>
          </button>
        </h2>

        <div className="text-sm text-slate-700 bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-4">
          {currentLang === "en" ? (
            <>
              <p><strong>🏏 Match Format</strong><br />All matches will be played in a limited-overs format. Standard ICC rules apply unless otherwise stated.</p>
              <p><strong>🏆 Champions</strong><br />Grand Trophy and Cash Prize.</p>
              <p><strong>🥈 Runners-Up</strong><br />Runners-Up Trophy and Cash Prize.</p>
              <p><strong>🏅 Individual Awards</strong><br />Man of the Series, Best Batsman, and Best Bowler.</p>
            </>
          ) : (
            <>
              <p><strong>🏏 ম্যাচ ফরম্যাট</strong><br />সব ম্যাচ লিমিটেড ওভারের হবে। অন্য কোনো নিয়ম না থাকলে স্ট্যান্ডার্ড আইসিসি (ICC) নিয়ম প্রযোজ্য হবে।</p>
              <p><strong>🏆 চ্যাম্পিয়ন</strong><br />গ্র্যান্ড ট্রফি এবং নগদ পুরস্কার।</p>
              <p><strong>🥈 রানার্স আপ</strong><br />রানার্স আপ ট্রফি এবং নগদ পুরস্কার।</p>
              <p><strong>🏅 ব্যক্তিগত পুরস্কার</strong><br />ম্যান অফ দ্য সিরিজ, সেরা ব্যাটসম্যান এবং সেরা বোলার।</p>
            </>
          )}
        </div>

        <div className="border-t border-slate-200 pt-6 flex justify-start">
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 font-bold py-3 px-6 rounded-xl transition flex items-center gap-2"
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span>{t("btnBackToRegFromInfo")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
