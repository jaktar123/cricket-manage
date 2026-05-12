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
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 border-b-2 border-slate-200 pb-4 mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <i className="fa-solid fa-list-check mr-3 text-purple-600"></i>
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
              <p><strong><i className="fa-solid fa-user-check mr-3 text-purple-600"></i> Correct Information</strong><br />Every player must provide their correct name, address, and mobile number. Providing false information may lead to registration cancellation.</p>
              <p><strong><i className="fa-solid fa-credit-card mr-3 text-purple-600"></i> Registration Fee: ₹100 Only</strong><br />Every player must submit ₹100 during form fill-up. Registration fee is non-refundable. Registration is confirmed only after payment.</p>
              <p><strong><i className="fa-solid fa-camera mr-3 text-purple-600"></i> Photo Requirement</strong><br />Upload a recent clear passport size photo. Blurred photos are not acceptable.</p>
              <p><strong><i className="fa-solid fa-clock mr-3 text-purple-600"></i> Form Submission Deadline</strong><br />Form must be submitted within the designated time. Forms submitted after the deadline will not be accepted.</p>
              <p><strong><i className="fa-solid fa-user-tag mr-3 text-purple-600"></i> Player Category</strong><br />Every player must mention their playing role (Batsman / Bowler / All-Rounder / Wicket Keeper).</p>
              <p><strong><i className="fa-solid fa-gavel mr-3 text-purple-600"></i> Auction Availability</strong><br />Filling the form doesn&apos;t guarantee a team. Players will be bought through an auction.</p>
              <p><strong><i className="fa-solid fa-handshake-angle mr-3 text-purple-600"></i> Discipline & Behaviour</strong><br />Players can be suspended for misbehavior, trouble-making, or rudeness during the tournament.</p>
              <p><strong><i className="fa-solid fa-user-shield mr-3 text-purple-600"></i> Organizer Decision</strong><br />The organizer&apos;s decision is final regarding player selection and auction matters.</p>
            </>
          ) : (
            <>
              <p><strong><i className="fa-solid fa-user-check mr-3 text-purple-600"></i> সঠিক তথ্য প্রদান</strong><br />প্রত্যেক Player কে নিজের সঠিক নাম, ঠিকানা ও মোবাইল নম্বর দিতে হবে। ভুল তথ্য দিলে Registration বাতিল হতে পারে।</p>
              <p><strong><i className="fa-solid fa-credit-card mr-3 text-purple-600"></i> Registration Fee: ₹100 Only</strong><br />প্রত্যেক Player কে Form Fill-Up এর সময় ₹100 Registration Fee জমা দিতে হবে। Registration Fee কোনো অবস্থাতেই Refundable নয়। Fee জমা দেওয়ার পরেই Player এর Registration Confirm বলে গণ্য হবে।</p>
              <p><strong><i className="fa-solid fa-camera mr-3 text-purple-600"></i> Photo Requirement</strong><br />সাম্প্রতিক পরিষ্কার Passport Size Photo আপলোড দিতে হবে। অস্পষ্ট Photo গ্রহণযোগ্য নয়।</p>
              <p><strong><i className="fa-solid fa-clock mr-3 text-purple-600"></i> Form Submission Deadline</strong><br />নির্ধারিত সময়ের মধ্যে Form জমা দিতে হবে। Deadline এর পরে জমা দেওয়া Form গ্রহণ করা হবে না।</p>
              <p><strong><i className="fa-solid fa-user-tag mr-3 text-purple-600"></i> Player Category</strong><br />প্রত্যেক Player কে নিজের Playing Role উল্লেখ করতে হবে (Batsman / Bowler / All-Rounder / Wicket Keeper)।</p>
              <p><strong><i className="fa-solid fa-gavel mr-3 text-purple-600"></i> Auction Availability</strong><br />Form Fill-Up করলেই Team নিশ্চিত হবে না। Player কে Auction এর মাধ্যমে Team কিনবে।</p>
              <p><strong><i className="fa-solid fa-handshake-angle mr-3 text-purple-600"></i> Discipline & Behaviour</strong><br />Tournament চলাকালীন খারাপ আচরণ, ঝামেলা বা অসভ্যতা করলে Player Suspend হতে পারে।</p>
              <p><strong><i className="fa-solid fa-user-shield mr-3 text-purple-600"></i> Organizer Decision</strong><br />Player Selection ও Auction সংক্রান্ত সকল বিষয়ে Organizer এর সিদ্ধান্তই চূড়ান্ত।</p>
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
