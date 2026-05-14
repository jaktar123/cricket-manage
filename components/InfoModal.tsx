"use client";

import React from "react";
import { useLanguage } from "./providers/LanguageProvider";

export const InfoModal = ({ onClose }: { onClose: () => void }) => {
  const { t, toggleLanguage, currentLang } = useLanguage();

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-effect rounded-2xl shadow-2xl p-8 md:p-10 relative border border-slate-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto cursor-default"
      >
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 border-b-2 border-slate-100 pb-4 mb-6 flex items-center justify-between uppercase italic tracking-tight">
          <div className="flex items-center">
            <i className="fa-solid fa-list-check mr-3 text-brand-primary"></i>
            <span>{t("infoPageTitle")}</span>
          </div>
          <button
            onClick={toggleLanguage}
            className="text-[10px] bg-white text-brand-primary px-4 py-2 rounded-xl border-2 border-brand-accent transition flex items-center gap-2 shadow-sm font-black uppercase tracking-widest hover:bg-brand-primary hover:text-white group"
          >
            <i className="fa-solid fa-language text-lg group-hover:text-white transition-colors"></i>
            <span className="group-hover:text-white transition-colors">{t("langBtnText")}</span>
          </button>
        </h2>

        <div className="text-sm text-slate-700 bg-white p-8 rounded-[2rem] border-2 border-brand-accent/20 space-y-6 shadow-inner">
          {currentLang === "en" ? (
            <>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-user-check text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">Correct Information</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">Every player must provide their correct name, address, and mobile number. Providing false information may lead to registration cancellation.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-credit-card text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">Registration Fee: ₹100 Only</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">Every player must submit ₹100 during form fill-up. Registration fee is non-refundable. Registration is confirmed only after payment.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-camera text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">Photo Requirement</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">Upload a recent clear passport size photo. Blurred photos are not acceptable.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-clock text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">Form Submission Deadline</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">Form must be submitted within the designated time. Forms submitted after the deadline will not be accepted.</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-user-check text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">সঠিক তথ্য প্রদান</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">প্রত্যেক Player কে নিজের সঠিক নাম, ঠিকানা ও মোবাইল নম্বর দিতে হবে। ভুল তথ্য দিলে Registration বাতিল হতে পারে।</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-credit-card text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">রেজিস্ট্রেশন ফি: ₹১০০ মাত্র</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">প্রত্যেক Player কে Form Fill-Up এর সময় ₹১০০ Registration Fee জমা দিতে হবে। Registration Fee অফেরতযোগ্য। পেমেন্টের পরই রেজিস্ট্রেশন নিশ্চিত হবে।</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-camera text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">ছবির প্রয়োজনীয়তা</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">সম্প্রতি তোলা পরিষ্কার পাসপোর্ট সাইজ ছবি আপলোড করুন। অস্পষ্ট ছবি গ্রহণযোগ্য নয়।</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-clock text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">ফর্ম জমা দেওয়ার সময়সীমা</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">নির্ধারিত সময়ের মধ্যে ফর্ম জমা দিতে হবে। সময়সীমা শেষ হওয়ার পর জমা দেওয়া ফর্ম গ্রহণ করা হবে না।</p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            className="group flex items-center gap-3 px-10 py-4 rounded-2xl bg-brand-primary text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-brand-primary/20 border-2 border-brand-secondary hover:brightness-110 transition-all duration-300"
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span>{t("btnBackToRegFromInfo")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
